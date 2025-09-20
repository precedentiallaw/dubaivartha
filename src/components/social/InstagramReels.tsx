import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Play } from 'lucide-react';

interface InstagramReelsProps {
  reelUrl?: string;
  className?: string;
}

interface InstagramEmbed {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  media_type: string;
}

const InstagramReels = ({ reelUrl, className = "" }: InstagramReelsProps) => {
  const [embedData, setEmbedData] = useState<InstagramEmbed | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default Dubai Vartha Instagram content for demo
  const defaultReels = [
    {
      id: '1',
      caption: 'Dubai News Update - Today\'s Headlines',
      media_url: '/placeholder.svg',
      permalink: 'https://instagram.com/dubaivartha',
      timestamp: new Date().toISOString(),
      media_type: 'VIDEO'
    },
    {
      id: '2', 
      caption: 'UAE Business News - Economic Updates',
      media_url: '/placeholder.svg',
      permalink: 'https://instagram.com/dubaivartha',
      timestamp: new Date().toISOString(),
      media_type: 'VIDEO'
    }
  ];

  const fetchInstagramEmbed = async (url: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // For now, using demo data
      // In production, this would call Instagram's oEmbed API
      // const response = await fetch(`https://graph.facebook.com/v12.0/instagram_oembed?url=${encodeURIComponent(url)}&access_token=${accessToken}`);
      
      setTimeout(() => {
        setEmbedData(defaultReels[0]);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('Error fetching Instagram embed:', err);
      setError('Failed to load Instagram content');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reelUrl) {
      fetchInstagramEmbed(reelUrl);
    } else {
      // Show default content when no URL provided
      setEmbedData(defaultReels[0]);
    }
  }, [reelUrl]);

  if (loading) {
    return (
      <Card className={`${className} animate-pulse`}>
        <CardContent className="p-4">
          <div className="aspect-[9/16] bg-muted rounded-lg mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !embedData) {
    return (
      <Card className={`${className} border-destructive/20`}>
        <CardContent className="p-4 text-center">
          <div className="text-destructive text-sm mb-2">
            {error || 'Instagram content unavailable'}
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="https://instagram.com/dubaivartha" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Instagram
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className} overflow-hidden hover-lift`}>
      <CardContent className="p-0">
        {/* Instagram Reel Video Preview */}
        <div className="relative aspect-[9/16] bg-gradient-to-br from-brand-pink/10 to-brand-blue/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center shadow-brand">
                <Play className="h-8 w-8 text-white ml-1" fill="white" />
              </div>
              <div className="px-4">
                <p className="text-sm font-medium mb-1">Dubai Vartha</p>
                <p className="text-xs text-muted-foreground">@dubaivartha</p>
              </div>
            </div>
          </div>
          
          {/* Instagram branding */}
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 backdrop-blur rounded-full p-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
                <path d="m16 11.37-4-2.7v5.4l4-2.7z" stroke="currentColor" strokeWidth="1.5" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Caption and metadata */}
        <div className="p-4">
          <p className="text-sm font-medium mb-2 line-clamp-2">
            {embedData.caption}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Instagram Reel</span>
            <Button variant="ghost" size="sm" asChild className="h-auto p-0 text-xs">
              <a href={embedData.permalink} target="_blank" rel="noopener noreferrer">
                View on Instagram
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstagramReels;