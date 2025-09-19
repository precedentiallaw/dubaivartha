import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  image_url: string | null
  published_at: string
  updated_at: string
  created_at: string
  author: string | null
  category: string | null
  source_url: string | null
  is_breaking: boolean | null
  read_time: number | null
  views: number | null
  cached_at: string | null
}

export interface UseArticlesResult {
  articles: Article[]
  loading: boolean
  error: string | null
  refreshArticles: () => Promise<void>
  fetchRSSFeed: () => Promise<void>
}

export function useArticles(category?: string): UseArticlesResult {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchArticles = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('articles')
        .select('*')
        .order('published_at', { ascending: false })

      if (category && category !== 'home') {
        query = query.ilike('category', `%${category}%`)
      }

      const { data, error: fetchError } = await query

      if (fetchError) {
        throw fetchError
      }

      setArticles(data || [])
    } catch (err) {
      console.error('Error fetching articles:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch articles')
    } finally {
      setLoading(false)
    }
  }

  const fetchRSSFeed = async () => {
    try {
      console.log('Triggering RSS feed fetch...')
      
      const { data, error: rssError } = await supabase.functions.invoke('fetch-rss', {
        body: {}
      })

      if (rssError) {
        throw rssError
      }

      console.log('RSS feed fetch completed:', data)
      
      // Refresh articles after RSS fetch
      await fetchArticles()
      
    } catch (err) {
      console.error('Error fetching RSS feed:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch RSS feed')
    }
  }

  const refreshArticles = async () => {
    await fetchArticles()
  }

  useEffect(() => {
    fetchArticles()
  }, [category])

  return {
    articles,
    loading,
    error,
    refreshArticles,
    fetchRSSFeed
  }
}