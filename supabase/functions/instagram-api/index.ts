import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InstagramMediaResponse {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  media_type: string;
  thumbnail_url?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, mediaId } = await req.json();

    console.log('Instagram API request:', { action, mediaId });

    // Note: This requires Instagram API credentials to be set up
    // For now, return demo data until real API integration is configured
    
    if (action === 'getRecentMedia') {
      // Mock response - in production, this would call:
      // GET https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp,media_type&access_token={access_token}
      
      const mockData: InstagramMediaResponse[] = [
        {
          id: '17841400008460056',
          caption: 'Dubai News Update - Latest headlines from UAE 📰 #DubaiNews #UAE',
          media_url: '/placeholder.svg',
          permalink: 'https://www.instagram.com/p/sample1/',
          timestamp: new Date().toISOString(),
          media_type: 'VIDEO'
        },
        {
          id: '17841400008460057',
          caption: 'Breaking: Major development in Dubai business sector 🏢 #Dubai #Business',
          media_url: '/placeholder.svg',
          permalink: 'https://www.instagram.com/p/sample2/',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          media_type: 'IMAGE'
        }
      ];

      return new Response(JSON.stringify({
        success: true,
        data: mockData,
        message: 'Instagram media fetched successfully (demo data)'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'getMedia' && mediaId) {
      // Mock single media response
      const mockMedia: InstagramMediaResponse = {
        id: mediaId,
        caption: 'Dubai Vartha - Your trusted news source for UAE updates 📱',
        media_url: '/placeholder.svg',
        permalink: `https://www.instagram.com/p/${mediaId}/`,
        timestamp: new Date().toISOString(),
        media_type: 'VIDEO'
      };

      return new Response(JSON.stringify({
        success: true,
        data: mockMedia,
        message: 'Instagram media fetched successfully (demo data)'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid action or missing parameters'
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in instagram-api function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false,
      message: 'To enable real Instagram integration, please configure Instagram API credentials'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});