import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Shield, Clock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to dashboard if already logged in
    const checkAuth = async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero text-primary-foreground min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary-foreground/10 backdrop-blur rounded-full">
                <Car className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Premium Car Rentals
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Experience luxury on the road. Choose from 20 premium vehicles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/auth")}
                className="text-lg px-8"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth")}
                className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                Sign In
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="p-6 bg-primary-foreground/10 backdrop-blur rounded-lg">
                <Shield className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure & Safe</h3>
                <p className="text-primary-foreground/80">
                  All vehicles are insured and regularly maintained
                </p>
              </div>
              <div className="p-6 bg-primary-foreground/10 backdrop-blur rounded-lg">
                <Clock className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">24/7 Available</h3>
                <p className="text-primary-foreground/80">
                  Rent and return at your convenience
                </p>
              </div>
              <div className="p-6 bg-primary-foreground/10 backdrop-blur rounded-lg">
                <Car className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Premium Fleet</h3>
                <p className="text-primary-foreground/80">
                  Tesla, BMW, Mercedes and more luxury brands
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
