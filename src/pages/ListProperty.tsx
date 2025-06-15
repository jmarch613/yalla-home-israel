import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import type { TablesInsert } from '@/integrations/supabase/types';

const propertySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive').optional(),
  property_type: z.enum(['apartment', 'house', 'villa', 'penthouse', 'studio', 'commercial', 'land']),
  listing_type: z.enum(['sale', 'rent']),
  address: z.string().min(1, 'Address is required'),
  neighborhood: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  bedrooms: z.number().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  area: z.number().min(1, 'Area must be greater than 0').optional(),
  floor_number: z.number().optional(),
  total_floors: z.number().optional(),
  year_built: z.number().min(1800).max(new Date().getFullYear()).optional(),
  parking_spots: z.number().min(0).default(0),
  contact_name: z.string().min(1, 'Contact name is required'),
  contact_phone: z.string().min(1, 'Contact phone is required'),
  contact_email: z.string().email().optional(),
  balcony: z.boolean().default(false),
  elevator: z.boolean().default(false),
  garden: z.boolean().default(false),
  air_conditioning: z.boolean().default(false),
  heating: z.boolean().default(false),
  furnished: z.boolean().default(false),
  pets_allowed: z.boolean().default(false),
});

type PropertyFormData = z.infer<typeof propertySchema>;

const ListProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      listing_type: 'sale',
      property_type: 'apartment',
      parking_spots: 0,
      balcony: false,
      elevator: false,
      garden: false,
      air_conditioning: false,
      heating: false,
      furnished: false,
      pets_allowed: false,
    },
  });

  const onSubmit = async (data: PropertyFormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to list a property.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create properly typed insert data
      const insertData: TablesInsert<'property_listings'> = {
        user_id: user.id,
        title: data.title,
        description: data.description || null,
        price: data.price || null,
        property_type: data.property_type,
        listing_type: data.listing_type,
        address: data.address,
        neighborhood: data.neighborhood || null,
        city: data.city,
        bedrooms: data.bedrooms || null,
        bathrooms: data.bathrooms || null,
        area: data.area || null,
        floor_number: data.floor_number || null,
        total_floors: data.total_floors || null,
        year_built: data.year_built || null,
        parking_spots: data.parking_spots || 0,
        contact_name: data.contact_name,
        contact_phone: data.contact_phone,
        contact_email: data.contact_email || null,
        balcony: data.balcony || false,
        elevator: data.elevator || false,
        garden: data.garden || false,
        air_conditioning: data.air_conditioning || false,
        heating: data.heating || false,
        furnished: data.furnished || false,
        pets_allowed: data.pets_allowed || false,
      };

      const { error } = await supabase
        .from('property_listings')
        .insert(insertData);

      if (error) throw error;

      toast({
        title: "Property listed successfully!",
        description: "Your property has been submitted for review.",
      });

      navigate('/');
    } catch (error) {
      console.error('Error submitting property:', error);
      toast({
        title: "Error",
        description: "Failed to submit property listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Sign In Required</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                You need to sign in to list a property.
              </p>
              <Button onClick={() => navigate('/auth')} className="w-full">
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">List Your Property</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Beautiful apartment in the city center" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="listing_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listing Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="sale" id="sale" />
                              <Label htmlFor="sale">For Sale</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="rent" id="rent" />
                              <Label htmlFor="rent">For Rent</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="property_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="penthouse">Penthouse</SelectItem>
                            <SelectItem value="studio">Studio</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="land">Land</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price (₪)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area (m²)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your property..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="neighborhood"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Neighborhood</FormLabel>
                          <FormControl>
                            <Input placeholder="City Center" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Jerusalem" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bedrooms</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bathrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bathrooms</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="floor_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Floor</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="1"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="total_floors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Floors</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="5"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year_built"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year Built</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="2020"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="parking_spots"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parking Spots</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'balcony', label: 'Balcony' },
                      { name: 'elevator', label: 'Elevator' },
                      { name: 'garden', label: 'Garden' },
                      { name: 'air_conditioning', label: 'Air Conditioning' },
                      { name: 'heating', label: 'Heating' },
                      { name: 'furnished', label: 'Furnished' },
                      { name: 'pets_allowed', label: 'Pets Allowed' },
                    ].map((feature) => (
                      <FormField
                        key={feature.name}
                        control={form.control}
                        name={feature.name as keyof PropertyFormData}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value as boolean}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {feature.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="contact_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contact_phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+972-50-123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contact_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? 'Submitting...' : 'Submit Property Listing'}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/')}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;
