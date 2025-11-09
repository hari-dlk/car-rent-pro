import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Car as CarIcon, Users, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price_per_day: number;
  status: string;
  image_url: string;
  description: string;
  category: string;
  transmission: string;
  seats: number;
}

const Cars = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      fetchCars();
    };

    checkAuth();
  }, [navigate]);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .order("brand", { ascending: true });

      if (error) throw error;
      setCars(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch cars",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRent = (car: Car) => {
    navigate("/payment", { state: { car } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading cars...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero text-primary-foreground py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <CarIcon className="h-10 w-10" />
            <div>
              <h1 className="text-4xl font-bold">Available Cars</h1>
              <p className="text-primary-foreground/80 mt-1">
                Choose from our premium collection - Indian & International brands
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <Card key={car.id} className="overflow-hidden hover:shadow-premium transition-shadow">
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={car.image_url}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {car.brand} {car.model}
                    </CardTitle>
                    <CardDescription>{car.year}</CardDescription>
                  </div>
                  <Badge variant={car.status === "Available" ? "default" : "secondary"}>
                    {car.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{car.description}</p>
                <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {car.seats} seats
                  </div>
                  <div className="flex items-center gap-1">
                    <Settings className="h-4 w-4" />
                    {car.transmission}
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">
                  ₹{car.price_per_day.toLocaleString('en-IN')}
                  <span className="text-sm font-normal text-muted-foreground">/day</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={car.status !== "Available"}
                  onClick={() => handleRent(car)}
                >
                  {car.status === "Available" ? "Rent Now" : "Not Available"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
