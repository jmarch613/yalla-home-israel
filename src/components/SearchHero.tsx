
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export const SearchHero = () => {
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState('buy');
  const navigate = useNavigate();

  const popularAreas = [
    'Tel Aviv', 'Jerusalem', 'Haifa', 'Herzliya', 'Ramat Gan', 'Netanya'
  ];

  const handleSearch = () => {
    if (location.trim()) {
      navigate(`/search?location=${encodeURIComponent(location)}&type=${activeTab}`);
    }
  };

  const handlePopularAreaClick = (area: string) => {
    navigate(`/search?location=${encodeURIComponent(area)}&type=${activeTab}`);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Home in Israel
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Search thousands of properties for sale and rent across Israel
          </p>
          
          <Card className="bg-white p-6 shadow-2xl">
            <div className="flex mb-6">
              <Button
                variant={activeTab === 'buy' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('buy')}
                className="flex-1 mr-2"
              >
                Buy
              </Button>
              <Button
                variant={activeTab === 'rent' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('rent')}
                className="flex-1 ml-2"
              >
                Rent
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Enter location (e.g., Tel Aviv, Jerusalem)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90 px-8">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
            
            <div className="text-left">
              <p className="text-sm text-gray-600 mb-2">Popular areas:</p>
              <div className="flex flex-wrap gap-2">
                {popularAreas.map((area) => (
                  <Button
                    key={area}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePopularAreaClick(area)}
                    className="text-xs"
                  >
                    {area}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
