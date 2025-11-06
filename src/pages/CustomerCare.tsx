import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

const CustomerCare = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero text-primary-foreground py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="h-10 w-10" />
            <div>
              <h1 className="text-4xl font-bold">Customer Care</h1>
              <p className="text-primary-foreground/80 mt-1">
                We're here to help you 24/7
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-premium transition-shadow">
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-lg w-fit mb-2">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Phone Support</CardTitle>
              <CardDescription>Call us anytime</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-accent">+91-9876543210</p>
              <p className="text-sm text-muted-foreground mt-2">
                Available 24 hours a day, 7 days a week
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-premium transition-shadow">
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-lg w-fit mb-2">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Email Support</CardTitle>
              <CardDescription>Write to us</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-accent">support@drivehub.in</p>
              <p className="text-sm text-muted-foreground mt-2">
                We'll respond within 24 hours
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="p-3 bg-accent/10 rounded-lg w-fit mb-2">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <CardTitle>Operating Hours</CardTitle>
            <CardDescription>Our office timings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Monday - Friday:</span>
              <span className="text-muted-foreground">9:00 AM - 8:00 PM IST</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Saturday:</span>
              <span className="text-muted-foreground">10:00 AM - 6:00 PM IST</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Sunday:</span>
              <span className="text-muted-foreground">10:00 AM - 4:00 PM IST</span>
            </div>
            <p className="text-sm text-accent mt-4">
              * Emergency support available 24/7 via phone
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="p-3 bg-accent/10 rounded-lg w-fit mb-2">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
            <CardTitle>Head Office</CardTitle>
            <CardDescription>Visit us</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">DriveHub Car Rentals Pvt. Ltd.</p>
            <p className="text-muted-foreground mt-2">
              123, MG Road, Connaught Place<br />
              New Delhi - 110001<br />
              India
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="text-accent">Emergency Roadside Assistance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold mb-2">Toll-Free: 1800-123-4567</p>
            <p className="text-sm text-muted-foreground">
              Available 24/7 for breakdowns, accidents, or any roadside emergencies
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerCare;
