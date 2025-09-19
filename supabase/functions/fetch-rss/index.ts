import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ParsedArticle {
  title: string
  content: string
  excerpt: string
  image_url: string | null
  published_at: string
  author: string
  category: string
  source_url: string
  is_breaking: boolean
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    console.log('Fetching RSS feed from Dubai Vartha...')
    
    // Fetch RSS feed
    const rssResponse = await fetch('https://www.dubaivartha.com/feed/')
    if (!rssResponse.ok) {
      throw new Error(`RSS fetch failed: ${rssResponse.status}`)
    }
    
    const rssText = await rssResponse.text()
    console.log(`RSS feed fetched, length: ${rssText.length} characters`)
    
    // Parse RSS XML
    const articles = parseRSSFeed(rssText)
    console.log(`Parsed ${articles.length} articles from RSS feed`)
    
    // Insert or update articles in database
    const results = []
    for (const article of articles) {
      try {
        // Check if article already exists
        const { data: existingArticle } = await supabaseClient
          .from('articles')
          .select('id, updated_at')
          .eq('source_url', article.source_url)
          .single()
        
        if (existingArticle) {
          // Update existing article
          const { data, error } = await supabaseClient
            .from('articles')
            .update({
              ...article,
              cached_at: new Date().toISOString()
            })
            .eq('source_url', article.source_url)
            .select()
          
          if (error) {
            console.error('Error updating article:', error)
          } else {
            results.push({ action: 'updated', article: data?.[0] })
          }
        } else {
          // Insert new article
          const { data, error } = await supabaseClient
            .from('articles')
            .insert({
              ...article,
              cached_at: new Date().toISOString()
            })
            .select()
          
          if (error) {
            console.error('Error inserting article:', error)
          } else {
            results.push({ action: 'inserted', article: data?.[0] })
          }
        }
      } catch (articleError) {
        console.error('Error processing article:', article.title, articleError)
      }
    }

    console.log(`Processed ${results.length} articles successfully`)
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Processed ${results.length} articles`,
        results
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('RSS fetch error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

function parseRSSFeed(rssText: string): ParsedArticle[] {
  const articles: ParsedArticle[] = []
  
  try {
    // Extract items using regex (simple XML parsing for RSS)
    const itemMatches = rssText.match(/<item>(.*?)<\/item>/gs)
    
    if (!itemMatches) {
      console.log('No items found in RSS feed')
      return articles
    }

    for (const itemMatch of itemMatches) {
      try {
        const article = parseRSSItem(itemMatch)
        if (article) {
          articles.push(article)
        }
      } catch (itemError) {
        console.error('Error parsing RSS item:', itemError)
      }
    }
  } catch (parseError) {
    console.error('Error parsing RSS feed:', parseError)
  }
  
  return articles
}

function parseRSSItem(itemXML: string): ParsedArticle | null {
  try {
    // Extract title
    const titleMatch = itemXML.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)
    const title = titleMatch?.[1] || extractTextContent(itemXML, 'title')
    
    if (!title) {
      console.log('No title found, skipping item')
      return null
    }

    // Extract link/source URL
    const linkMatch = itemXML.match(/<link>(.*?)<\/link>/)
    const source_url = linkMatch?.[1]?.trim()
    
    if (!source_url) {
      console.log('No source URL found, skipping item')
      return null
    }

    // Extract content
    const contentMatch = itemXML.match(/<content:encoded><!\[CDATA\[(.*?)\]\]><\/content:encoded>/s)
    let content = contentMatch?.[1] || ''
    
    // If no content:encoded, try description
    if (!content) {
      const descMatch = itemXML.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/s)
      content = descMatch?.[1] || ''
    }

    // Clean HTML tags for excerpt
    const excerpt = content.replace(/<[^>]*>/g, '').slice(0, 200) + '...'

    // Extract image from content
    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/i)
    const image_url = imgMatch?.[1] || null

    // Extract published date
    const pubDateMatch = itemXML.match(/<pubDate>(.*?)<\/pubDate>/)
    const published_at = pubDateMatch?.[1] ? new Date(pubDateMatch[1]).toISOString() : new Date().toISOString()

    // Extract author
    const authorMatch = itemXML.match(/<dc:creator><!\[CDATA\[(.*?)\]\]><\/dc:creator>/)
    const author = authorMatch?.[1] || 'Dubai Vartha'

    // Extract categories
    const categoryMatches = itemXML.match(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g)
    const categories = categoryMatches?.map(match => {
      const categoryMatch = match.match(/<category><!\[CDATA\[(.*?)\]\]><\/category>/)
      return categoryMatch?.[1]
    }).filter(Boolean) || []
    
    const category = categories[0] || 'General'

    // Check if breaking news (simple heuristic)
    const is_breaking = title.toLowerCase().includes('breaking') || 
                       title.toLowerCase().includes('urgent') ||
                       categories.some(cat => cat?.toLowerCase().includes('breaking'))

    return {
      title,
      content,
      excerpt,
      image_url,
      published_at,
      author,
      category,
      source_url,
      is_breaking
    }
  } catch (error) {
    console.error('Error parsing RSS item:', error)
    return null
  }
}

function extractTextContent(xml: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}[^>]*>(.*?)<\/${tagName}>`, 'i')
  const match = xml.match(regex)
  return match?.[1]?.trim() || ''
}