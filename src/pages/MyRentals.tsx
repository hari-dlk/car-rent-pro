import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Rental {
  id: string;
  car_id: string;
  rent_date: string;
  return_date: string | null;
  total_amount: number | null;
  status: string;
  cars: {
    brand: string;
    model: string;
    year: number;
    image_url: string;
    price_per_day: number;
  };
}

const MyRentals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      fetchRentals();
    };

    checkAuth();
  }, [navigate]);

  const fetchRentals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("rentals")
        .select(`
          *,
          cars (brand, model, year, image_url, price_per_day)
        `)
        .eq("user_id", user.id)
        .eq("status", "Active")
        .order("rent_date", { ascending: false });

      if (error) throw error;
      setRentals(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch rentals",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (rentalId: string, carId: string) => {
    setReturningId(rentalId);
    try {
      // Update rental status
      const { error: rentalError } = await supabase
        .from("rentals")
        .update({ 
          status: "Completed",
          return_date: new Date().toISOString()
        })
        .eq("id", rentalId);

      if (rentalError) throw rentalError;

      // Update car status
      const { error: carError } = await supabase
        .from("cars")
        .update({ status: "Available" })
        .eq("id", carId);

      if (carError) throw carError;

      toast({
        title: "Success!",
        description: "Car returned successfully.",
      });

      fetchRentals();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setReturningId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading rentals...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero text-primary-foreground py-8 px-4">
        <div className="container mx-auto">
          <Button
            variant="secondary"
            onClick={() => navigate("/dashboard")}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold">My Rentals</h1>
          <p className="text-primary-foreground/80 mt-1">
            Manage your currently rented vehicles
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {rentals.length === 0 ? (
          <Card className="max-w-2xl mx-auto text-center py-12">
            <CardHeader>
              <CardTitle>No Active Rentals</CardTitle>
              <CardDescription>
                You don't have any active car rentals at the moment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/cars")}>Browse Available Cars</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentals.map((rental) => (
              <Card key={rental.id} className="overflow-hidden hover:shadow-premium transition-shadow">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={rental.cars.image_url}
                    alt={`${rental.cars.brand} ${rental.cars.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">
                        {rental.cars.brand} {rental.cars.model}
                      </CardTitle>
                      <CardDescription>{rental.cars.year}</CardDescription>
                    </div>
                    <Badge>{rental.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Rented: {new Date(rental.rent_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-semibold">
                      ${rental.cars.price_per_day}/day
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={returningId === rental.id}
                    onClick={() => handleReturn(rental.id, rental.car_id)}
                  >
                    {returningId === rental.id ? "Returning..." : "Return Car"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRentals;
