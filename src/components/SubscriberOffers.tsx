import { Star, Plane, Building, Hotel, Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SubscriberOffers = () => {
  const offers = [
    {
      icon: Plane,
      category: "Travel Packages",
      title: "Georgia & Azerbaijan Tours",
      description: "Exclusive packages starting from AED 2,499",
      discount: "20% Off",
      color: "bg-blue-500",
      features: ["Visa assistance", "4-star hotels", "Group tours", "Dubai Vartha guide"]
    },
    {
      icon: Hotel,
      category: "Accommodation", 
      title: "Hotel Booking Deals",
      description: "Special rates across UAE & GCC",
      discount: "15% Off",
      color: "bg-green-500",
      features: ["Best price guarantee", "Free cancellation", "Instant confirmation", "24/7 support"]
    },
    {
      icon: Building,
      category: "Business Services",
      title: "UAE License & Setup",
      description: "Complete business setup assistance",
      discount: "Premium Service",
      color: "bg-purple-500",
      features: ["Dubai & Sharjah licenses", "Free consultation", "Document assistance", "Fast processing"]
    },
    {
      icon: Gift,
      category: "Exclusive Deals",
      title: "Member Perks",
      description: "Special discounts from partner businesses",
      discount: "VIP Access",
      color: "bg-pink-500",
      features: ["Restaurant discounts", "Shopping deals", "Event tickets", "Priority booking"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Star className="h-5 w-5 text-accent fill-accent" />
          <h2 className="text-2xl font-bold gradient-text">Exclusive Dubai Vartha Subscriber Offers</h2>
          <Star className="h-5 w-5 text-accent fill-accent" />
        </div>
        <p className="text-muted-foreground">
          Premium benefits for our valued subscribers and community members
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {offers.map((offer, index) => {
          const Icon = offer.icon;
          return (
            <Card key={index} className="hover-lift border-accent/20 bg-gradient-to-br from-background to-accent/5">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${offer.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs mb-1">
                        {offer.category}
                      </Badge>
                      <CardTitle className="text-lg">{offer.title}</CardTitle>
                    </div>
                  </div>
                  <Badge className="bg-accent text-accent-foreground">
                    {offer.discount}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{offer.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Included benefits:</h4>
                  <ul className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
                    {offer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <span className="h-1 w-1 bg-accent rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    Learn More
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Call to Action */}
      <Card className="bg-brand-gradient text-white border-0">
        <CardContent className="text-center py-8">
          <h3 className="text-xl font-bold mb-2">Become a Premium Subscriber</h3>
          <p className="mb-4 opacity-90">
            Unlock exclusive deals, early access to offers, and premium content
          </p>
          <Button variant="secondary" size="lg">
            Subscribe Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriberOffers;