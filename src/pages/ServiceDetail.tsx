
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, MapPin, Clock, Star, Calendar } from 'lucide-react';
import { useCategories, useProfessionalsByCategory } from '@/hooks/use-supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  
  // Find the category based on the slug
  const category = categories?.find(cat => 
    cat.name.toLowerCase().replace(/\s+/g, '-') === slug
  );
  
  const { data: professionals, isLoading: professionalsLoading } = 
    useProfessionalsByCategory(category?.id || null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check authentication status
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };
    
    checkUser();
    
    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  
  // Format the service name for display
  const serviceName = category?.name || 
    (slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Service');
  
  const handleBooking = (professionalId) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to book a service",
        variant: "destructive",
      });
      // Remember where the user wanted to go
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      navigate('/auth');
      return;
    }
    
    // Navigate to booking page with professional ID
    navigate(`/booking?professionalId=${professionalId}&service=${category?.id || ''}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 page-transition">
        {/* Header */}
        <section className="bg-accent/30 pt-32 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold tracking-tight"
              >
                {serviceName}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-muted-foreground text-lg"
              >
                {category?.description || `Professional ${serviceName} services for your home or business`}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center text-sm text-muted-foreground space-x-1"
              >
                <span>Services</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">{serviceName}</span>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Service Professionals */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-3">Available Professionals</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose from our vetted professionals for your {serviceName.toLowerCase()} needs
              </p>
            </motion.div>
            
            {(categoriesLoading || professionalsLoading) ? (
              <div className="flex justify-center py-20">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="h-5 w-5 text-primary" />
                  </motion.div>
                  <span>Loading professionals...</span>
                </div>
              </div>
            ) : professionals && professionals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionals.map((professional, index) => (
                  <motion.div 
                    key={professional.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-xl overflow-hidden subtle-shadow hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                          {professional.profile?.avatar_url ? (
                            <img 
                              src={professional.profile.avatar_url} 
                              alt={`${professional.profile.first_name || ''} ${professional.profile.last_name || ''}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="text-2xl font-bold text-primary">
                              {(professional.profile?.first_name?.[0] || '') + (professional.profile?.last_name?.[0] || '').toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">
                            {`${professional.profile?.first_name || ''} ${professional.profile?.last_name || ''}`.trim() || 'Professional'}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>{professional.rating || '4.8'} • {professional.experience_years || '5'} years experience</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-primary mt-0.5" />
                          <span>
                            {[professional.city, professional.state].filter(Boolean).join(', ') || 'Location available upon booking'}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 text-primary mt-0.5" />
                          <span>${professional.hourly_rate || '75'}/hour</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground line-clamp-2">
                        {professional.bio || `Experienced ${serviceName.toLowerCase()} professional ready to help with your needs.`}
                      </p>
                      
                      <Button 
                        className="w-full mt-2"
                        onClick={() => handleBooking(professional.id)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-muted/30 rounded-xl">
                <h3 className="text-xl font-medium mb-2">No professionals available</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any professionals for this service category at the moment.
                </p>
                <Button onClick={() => navigate('/services')}>
                  View Other Services
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
