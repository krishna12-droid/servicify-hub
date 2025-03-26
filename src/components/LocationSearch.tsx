
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getCurrentLocation } from '@/utils/location';

interface LocationSearchProps {
  onLocationSelected: (lat: number, lng: number, address: string) => void;
}

const LocationSearch = ({ onLocationSelected }: LocationSearchProps) => {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!address.trim()) {
      toast({
        title: "Please enter an address",
        description: "Address field cannot be empty",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Using the free Nominatim geocoding service
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        onLocationSelected(parseFloat(lat), parseFloat(lon), display_name);
      } else {
        toast({
          title: "Location not found",
          description: "Could not find the location. Please try a different address.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error searching location",
        description: "An error occurred while searching for the location.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    setIsLoading(true);
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      
      // Reverse geocoding to get address
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      
      if (data && data.display_name) {
        setAddress(data.display_name);
        onLocationSelected(latitude, longitude, data.display_name);
      }
    } catch (error: any) {
      toast({
        title: "Location error",
        description: error.message || "Could not get your current location.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter location or address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          <span className="ml-2 hidden sm:inline">Search</span>
        </Button>
      </div>
      <Button 
        variant="outline" 
        onClick={handleUseCurrentLocation} 
        disabled={isLoading}
        className="flex items-center w-full sm:w-auto"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <MapPin className="h-4 w-4 mr-2" />
        )}
        Use my current location
      </Button>
    </div>
  );
};

export default LocationSearch;
