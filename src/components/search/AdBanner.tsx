
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { BannerEditor } from './BannerEditor';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type BannerSlide = Tables<'banner_slides'>;

export const AdBanner = () => {
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
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

  // Auto-scroll functionality
  useEffect(() => {
    if (!api || slides.length <= 1) return;

    // Get the auto-scroll interval from the first slide (assuming all slides use the same interval)
    const autoScrollInterval = slides[0]?.auto_scroll_interval || 0;
    
    if (autoScrollInterval === 0) return; // No auto-scroll if interval is 0

    const interval = setInterval(() => {
      api.scrollNext();
    }, autoScrollInterval * 1000);

    return () => clearInterval(interval);
  }, [api, slides]);

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
          <Carousel 
            className="max-w-4xl mx-auto"
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {slides.map((slide) => (
                <CarouselItem key={slide.id}>
                  <Card className="overflow-hidden">
                    <div 
                      className="relative h-48 md:h-64"
                      style={{
                        backgroundColor: '#f9fafb',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.4'%3E%3Cpath d='M30 10L35 20H25L30 10ZM20 25H40V35H35V30H25V35H20V25ZM22 37H38V45H35V40H25V45H22V37Z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px',
                        backgroundRepeat: 'repeat',
                        backgroundPosition: 'center'
                      }}
                    >
                      <img
                        src={slide.image_url}
                        alt={slide.title}
                        className="absolute inset-0 w-full h-full object-contain z-10"
                      />
                      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-6 z-20">
                        <h3 className="text-2xl md:text-3xl font-bold text-center mb-2 drop-shadow-lg">
                          {slide.title}
                        </h3>
                        {slide.subtitle && (
                          <p className="text-lg text-center mb-4 drop-shadow-md">
                            {slide.subtitle}
                          </p>
                        )}
                        {slide.link_url && (
                          <Button
                            asChild
                            className="bg-white text-black hover:bg-gray-100 drop-shadow-md"
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
