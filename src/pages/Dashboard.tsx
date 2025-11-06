import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, ListChecks, Phone, User, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({ totalCars: 0, activeRentals: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Fetch stats
      const { data: cars } = await supabase.from("cars").select("id", { count: "exact" });
      const { data: rentals } = await supabase
        .from("rentals")
        .select("id", { count: "exact" })
        .eq("user_id", user?.id)
        .eq("status", "Active");

      setStats({
        totalCars: cars?.length || 0,
        activeRentals: rentals?.length || 0,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero text-primary-foreground py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-6">
            <Car className="h-12 w-12" />
            <div>
              <h1 className="text-4xl font-bold">Welcome to DriveHub</h1>
              <p className="text-primary-foreground/80 mt-1">India's Premier Car Rental Service</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-lg bg-primary-foreground/10 px-4 py-2 rounded-lg w-fit">
            <User className="h-5 w-5" />
            <span>{user?.email}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-premium transition-shadow">
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-lg w-fit mb-2">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-lg">Total Cars</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">{stats.totalCars}</p>
              <p className="text-sm text-muted-foreground mt-1">Available for rent</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-premium transition-shadow">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Active Rentals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats.activeRentals}</p>
              <p className="text-sm text-muted-foreground mt-1">Currently rented</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-premium transition-shadow">
            <CardHeader>
              <div className="p-3 bg-secondary/50 rounded-lg w-fit mb-2">
                <Phone className="h-6 w-6 text-secondary-foreground" />
              </div>
              <CardTitle className="text-lg">24/7 Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">+91-9876543210</p>
              <p className="text-sm text-muted-foreground mt-1">Always available</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-premium transition-shadow cursor-pointer" onClick={() => navigate("/cars")}>
            <CardHeader>
              <div className="p-3 bg-gradient-primary rounded-lg w-fit mb-2">
                <Car className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Rent a Car</CardTitle>
              <CardDescription>
                Browse our collection of 20 premium vehicles with Indian and international brands
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Starting from <span className="text-lg font-bold text-primary">₹1,500/day</span>
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-premium transition-shadow cursor-pointer" onClick={() => navigate("/my-rentals")}>
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-lg w-fit mb-2">
                <ListChecks className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">My Rentals</CardTitle>
              <CardDescription>
                View and manage your currently rented vehicles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {stats.activeRentals > 0
                  ? `You have ${stats.activeRentals} active rental${stats.activeRentals > 1 ? "s" : ""}`
                  : "No active rentals"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
