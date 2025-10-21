-- Create cars table
CREATE TABLE public.cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL DEFAULT 2024,
  price_per_day DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Rented')),
  image_url TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'Sedan',
  transmission TEXT NOT NULL DEFAULT 'Automatic',
  seats INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- Cars policies (all users can view cars)
CREATE POLICY "Anyone can view cars" 
ON public.cars 
FOR SELECT 
USING (true);

-- Create rentals table
CREATE TABLE public.rentals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  rent_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  return_date TIMESTAMP WITH TIME ZONE,
  total_amount DECIMAL(10, 2),
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.rentals ENABLE ROW LEVEL SECURITY;

-- Rentals policies (users can only see their own rentals)
CREATE POLICY "Users can view own rentals" 
ON public.rentals 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own rentals" 
ON public.rentals 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own rentals" 
ON public.rentals 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Insert 20 sample cars with diverse brands
INSERT INTO public.cars (brand, model, year, price_per_day, image_url, description, category, transmission, seats) VALUES
('Tesla', 'Model 3', 2024, 89.99, 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800', 'Electric luxury sedan with autopilot', 'Sedan', 'Automatic', 5),
('BMW', 'X5', 2024, 129.99, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', 'Premium SUV with advanced features', 'SUV', 'Automatic', 7),
('Toyota', 'Camry', 2024, 59.99, 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800', 'Reliable and fuel-efficient sedan', 'Sedan', 'Automatic', 5),
('Honda', 'CR-V', 2024, 69.99, 'https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800', 'Spacious and practical SUV', 'SUV', 'Automatic', 5),
('Ford', 'Mustang', 2024, 99.99, 'https://images.unsplash.com/photo-1584345604476-8ec5f8e8e1e9?w=800', 'Iconic American muscle car', 'Sports', 'Manual', 4),
('Mercedes-Benz', 'C-Class', 2024, 119.99, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', 'Luxury sedan with premium comfort', 'Sedan', 'Automatic', 5),
('Audi', 'Q7', 2024, 139.99, 'https://images.unsplash.com/photo-1610768764270-790fbec18178?w=800', 'Sophisticated luxury SUV', 'SUV', 'Automatic', 7),
('Chevrolet', 'Tahoe', 2024, 109.99, 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800', 'Full-size SUV for families', 'SUV', 'Automatic', 8),
('Nissan', 'Altima', 2024, 54.99, 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800', 'Affordable and comfortable sedan', 'Sedan', 'Automatic', 5),
('Hyundai', 'Sonata', 2024, 49.99, 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800', 'Budget-friendly with great features', 'Sedan', 'Automatic', 5),
('Tesla', 'Model Y', 2024, 94.99, 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800', 'Electric crossover SUV', 'SUV', 'Automatic', 7),
('Porsche', '911', 2024, 249.99, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', 'Legendary sports car', 'Sports', 'Manual', 2),
('Lexus', 'RX 350', 2024, 124.99, 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800', 'Refined luxury SUV', 'SUV', 'Automatic', 5),
('Mazda', 'CX-5', 2024, 64.99, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', 'Stylish compact SUV', 'SUV', 'Automatic', 5),
('Volkswagen', 'Jetta', 2024, 52.99, 'https://images.unsplash.com/photo-1622353219448-46a2c7b7b3d3?w=800', 'Practical German engineering', 'Sedan', 'Automatic', 5),
('Jeep', 'Wrangler', 2024, 89.99, 'https://images.unsplash.com/photo-1519658451; 0539-4f03be4f5f6c?w=800', 'Off-road capable adventure vehicle', 'SUV', 'Manual', 5),
('Subaru', 'Outback', 2024, 74.99, 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800', 'All-wheel drive wagon', 'Wagon', 'Automatic', 5),
('Kia', 'Sportage', 2024, 59.99, 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800', 'Modern compact SUV', 'SUV', 'Automatic', 5),
('Range Rover', 'Evoque', 2024, 159.99, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 'Luxury compact SUV', 'SUV', 'Automatic', 5),
('Volvo', 'XC90', 2024, 144.99, 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800', 'Safe and elegant family SUV', 'SUV', 'Automatic', 7);