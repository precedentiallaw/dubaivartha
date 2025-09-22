import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PushNotificationRequest {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  url?: string;
  isBreaking?: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, body, icon, badge, tag, url, isBreaking }: PushNotificationRequest = await req.json();

    console.log('Push notification request:', { title, body, tag, isBreaking });

    // Default notification config
    const notificationData = {
      title: title,
      body: body,
      icon: icon || '/icons/icon-192x192.png',
      badge: badge || '/icons/icon-72x72.png',
      tag: tag || 'dubai-vartha-news',
      url: url || '/',
      timestamp: Date.now(),
      requireInteraction: isBreaking || false,
      vibrate: isBreaking ? [200, 100, 200] : [100]
    };

    // In a real implementation, you would:
    // 1. Store subscription endpoints in database
    // 2. Use Web Push library to send notifications to all subscribers
    // 3. Handle VAPID keys for authentication
    
    // For now, return success with notification data for client-side handling
    return new Response(JSON.stringify({
      success: true,
      message: 'Push notification prepared',
      notification: notificationData
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in send-push-notification function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});