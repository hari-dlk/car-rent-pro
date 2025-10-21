import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, ListChecks, LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out", description: "See you next time!" });
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero text-primary-foreground py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Car className="h-10 w-10" />
              <h1 className="text-4xl font-bold">DriveHub</h1>
            </div>
            <Button variant="secondary" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
          <div className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5" />
            <span>{user?.email}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="hover:shadow-premium transition-shadow cursor-pointer" onClick={() => navigate("/cars")}>
            <CardHeader>
              <div className="p-3 bg-gradient-primary rounded-lg w-fit mb-2">
                <Car className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Browse Cars</CardTitle>
              <CardDescription>
                Explore our premium collection of 20 vehicles available for rent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View All Cars</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-premium transition-shadow cursor-pointer" onClick={() => navigate("/my-rentals")}>
            <CardHeader>
              <div className="p-3 bg-accent rounded-lg w-fit mb-2">
                <ListChecks className="h-8 w-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-2xl">My Rentals</CardTitle>
              <CardDescription>
                View and manage your currently rented vehicles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View My Rentals</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
