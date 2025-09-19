import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AdBannerProps {
  type?: 'banner' | 'featured' | 'sidebar';
  title?: string;
  className?: string;
}

const AdBanner = ({ type = 'banner', title, className = '' }: AdBannerProps) => {
  const getAdContent = () => {
    switch (type) {
      case 'featured':
        return (
          <div className="text-center py-8">
            <Badge variant="secondary" className="mb-3">Featured Partner</Badge>
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
              <h3 className="font-bold text-lg gradient-text mb-2">Premium Business Setup</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Dubai & Sharjah License Processing - Special rates for Dubai Vartha readers
              </p>
              <div className="text-xs text-muted-foreground">
                Contact: +971-XX-XXXXXXX
              </div>
            </div>
          </div>
        );
      
      case 'sidebar':
        return (
          <div className="text-center py-4">
            <Badge variant="outline" className="mb-2 text-xs">Sponsored</Badge>
            <div className="bg-muted/50 rounded p-4">
              <h4 className="font-semibold text-sm mb-1">Travel Packages</h4>
              <p className="text-xs text-muted-foreground">
                Georgia • Azerbaijan • Turkey
              </p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-3">
            <Badge variant="outline" className="mb-2">Advertisement</Badge>
            <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded p-4">
              <p className="text-sm text-muted-foreground">
                {title || "Your ad could be here • Contact Dubai Vartha"}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className={`border-dashed border-muted-foreground/20 ${className}`}>
      <CardContent className="p-3">
        {getAdContent()}
      </CardContent>
    </Card>
  );
};

export default AdBanner;