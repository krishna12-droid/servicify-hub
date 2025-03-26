import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { MapPin, Filter, Loader2 } from 'lucide-react';
import LocationSearch from '@/components/LocationSearch';
import { useCategories, useProfessionalsByLocation } from '@/hooks/use-supabase';
import { calculateDistance, formatDistance } from '@/utils/location';
import { ProfessionalWithCategory } from '@/types';

const FindProfessionals = () => {
  const [location, setLocation] = useState<{ lat: number | null, lng: number | null, address: string }>({
    lat: null,
    lng: null,
    address: ''
  });
  const [radiusKm, setRadiusKm] = useState<number>(10);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { 
    data: professionals, 
    isLoading: isLoadingProfessionals 
  } = useProfessionalsByLocation(location.lat, location.lng, radiusKm);

  const handleLocationSelected = (lat: number, lng: number, address: string) => {
    setLocation({ lat, lng, address });
  };

  const filteredProfessionals = professionals?.filter(pro => 
    !selectedCategory || pro.category_id === selectedCategory
  );

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold">Find Professionals Near You</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Search for verified professionals based on your location and specific needs
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm">
          <div className="space-y-6">
            <LocationSearch onLocationSelected={handleLocationSelected} />
            
            {location.lat && location.lng && (
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium mb-2">Search radius: {radiusKm} km</p>
                  <Slider 
                    value={[radiusKm]} 
                    onValueChange={(values) => setRadiusKm(values[0])} 
                    min={1} 
                    max={50} 
                    step={1}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Filter by category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All categories</SelectItem>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>

        {location.lat && location.lng ? (
          isLoadingProfessionals ? (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              <p className="mt-4 text-muted-foreground">Searching for professionals...</p>
            </div>
          ) : filteredProfessionals && filteredProfessionals.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">
                {filteredProfessionals.length} Professional{filteredProfessionals.length !== 1 ? 's' : ''} Found
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProfessionals.map((professional) => (
                  <ProfessionalCard key={professional.id} professional={professional} userLat={location.lat!} userLng={location.lng!} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-xl">
              <p className="text-xl font-medium">No professionals found in this area</p>
              <p className="mt-2 text-muted-foreground">Try increasing your search radius or try a different location</p>
            </div>
          )
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-xl">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium">Enter your location to start</h2>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              We need your location to find professionals in your area
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

interface ProfessionalCardProps {
  professional: ProfessionalWithCategory;
  userLat: number;
  userLng: number;
}

const ProfessionalCard = ({ professional, userLat, userLng }: ProfessionalCardProps) => {
  const distance = professional.location_lat && professional.location_lng ? 
    formatDistance(calculateDistance(
      userLat, 
      userLng, 
      professional.location_lat, 
      professional.location_lng
    )) : 'Unknown';
  
  const profileData = professional.profile;
  const fullName = `${profileData?.first_name || ''} ${profileData?.last_name || ''}`.trim() || 'Unnamed Professional';
  const avatarUrl = profileData?.avatar_url || '/placeholder.svg';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-muted">
            <img 
              src={avatarUrl} 
              alt={fullName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold truncate">{fullName}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{distance} away</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium">{professional.headline || 'Professional Service Provider'}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {professional.bio || 'No bio available'}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-primary font-semibold">
            ${professional.hourly_rate || '0'}/hr
          </div>
          <Button size="sm">Book Now</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FindProfessionals;
