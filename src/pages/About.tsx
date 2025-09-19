import { ArrowLeft, Users, Calendar, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import dubaiVarthaLogo from "@/assets/dubai-vartha-logo-official.png";

interface AboutProps {
  onBack: () => void;
}

const About = ({ onBack }: AboutProps) => {
  const milestones = [
    {
      icon: Calendar,
      title: "9 Years of Excellence",
      description: "Trusted Malayalam news source since 2015",
      highlight: "9th Anniversary"
    },
    {
      icon: Users,
      title: "1.27M+ Followers",
      description: "Combined reach across Facebook, Instagram & YouTube",
      highlight: "Growing Community"
    },
    {
      icon: Globe,
      title: "GCC Leadership",
      description: "#1 Malayalam news agency across UAE, Oman, Qatar & beyond",
      highlight: "Regional Leader"
    },
    {
      icon: Award,
      title: "Trusted Authority",
      description: "Delivering accurate, timely news to the Malayalam diaspora",
      highlight: "Excellence in Journalism"
    }
  ];

  const socialStats = [
    { platform: "Facebook", followers: "800K+", engagement: "High" },
    { platform: "Instagram", followers: "300K+", engagement: "Growing" },
    { platform: "YouTube", followers: "170K+", engagement: "Active" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center px-4">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">About Dubai Vartha</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src={dubaiVarthaLogo} 
              alt="Dubai Vartha" 
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-4">Dubai Vartha</h1>
          <p className="text-xl text-muted-foreground mb-2">ദുബായ് വാർത്ത</p>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            The leading Malayalam-language news agency in the GCC region, 
            connecting the diaspora with authentic, timely news for 9 years.
          </p>
        </section>

        {/* Milestones Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Our Journey & Achievements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-brand-gradient p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full mb-2">
                          {milestone.highlight}
                        </span>
                        <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Social Media Presence */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Social Media Presence</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {socialStats.map((stat, index) => (
              <Card key={index} className="text-center hover-lift">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl gradient-text mb-2">{stat.platform}</h3>
                  <p className="text-3xl font-bold text-primary mb-2">{stat.followers}</p>
                  <p className="text-sm text-muted-foreground">{stat.engagement} Engagement</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <section className="mb-12">
          <Card className="bg-brand-gradient-soft border-accent/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg leading-relaxed max-w-3xl mx-auto">
                To serve the Malayalam-speaking community across the GCC with 
                authentic, unbiased news coverage while preserving our cultural 
                connections and promoting informed dialogue within our diaspora.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Coverage Areas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Our Coverage</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Dubai & UAE', 'Kerala', 'GCC Region', 'Global Malayalam'].map((area, index) => (
              <div key={index} className="text-center p-4 bg-muted rounded-lg hover-lift">
                <h3 className="font-semibold text-primary mb-2">{area}</h3>
                <p className="text-sm text-muted-foreground">Comprehensive Coverage</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact & Connect */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-[#1877F2]">
              Facebook
            </Button>
            <Button variant="outline" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white border-purple-600">
              Instagram
            </Button>
            <Button variant="outline" className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white border-[#FF0000]">
              YouTube
            </Button>
          </div>
          <p className="text-muted-foreground mt-4">
            Follow us for the latest updates and breaking news
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;