
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { BannerEditor } from './BannerEditor';
import { supabase } from '@/integrations/supabase/client';

interface BannerSlide {
  id: string;
  title: string;
  subtitle?: string;
  image_url: string;
  link_url?: string;
  order_index: number;
  is_active: boolean;
}

export const AdBanner = () => {
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Check if user is admin (you can adjust this logic based on your admin system)
  const isAdmin = user?.email === 'jeremymarch@hotmail.com'; // Replace with your admin email

  const fetchSlides = async () => {
    try {
      const { data, error } = await supabase
        .from('banner_slides')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error fetching slides:', error);
      } else {
        setSlides(data || []);
      }
    } catch (error) {
      console.error('Error fetching slides:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (slides.length === 0 && !isAdmin) {
    return null; // Don't show anything if no slides and not admin
  }

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 py-8 relative">
      <div className="container mx-auto px-4">
        {isAdmin && (
          <div className="absolute top-4 right-4 z-10">
            <Button
              onClick={() => setShowEditor(true)}
              variant="outline"
              size="sm"
              className="bg-white/80 hover:bg-white"
            >
              <Settings className="w-4 h-4 mr-2" />
              Edit Banners
            </Button>
          </div>
        )}

        {slides.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No banner slides configured</p>
            {isAdmin && (
              <Button
                onClick={() => setShowEditor(true)}
                className="mt-4"
              >
                Add First Banner
              </Button>
            )}
          </div>
        ) : (
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {slides.map((slide) => (
                <CarouselItem key={slide.id}>
                  <Card className="overflow-hidden">
                    <div className="relative h-48 md:h-64">
                      <img
                        src={slide.image_url}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white p-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-center mb-2">
                          {slide.title}
                        </h3>
                        {slide.subtitle && (
                          <p className="text-lg text-center mb-4">
                            {slide.subtitle}
                          </p>
                        )}
                        {slide.link_url && (
                          <Button
                            asChild
                            className="bg-white text-black hover:bg-gray-100"
                          >
                            <a href={slide.link_url} target="_blank" rel="noopener noreferrer">
                              Learn More
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {slides.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        )}
      </div>

      {showEditor && (
        <BannerEditor
          isOpen={showEditor}
          onClose={() => setShowEditor(false)}
          onSlidesUpdated={fetchSlides}
        />
      )}
    </div>
  );
};
