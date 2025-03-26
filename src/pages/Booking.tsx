
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Clock, MapPin, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useCreateBooking } from '@/hooks/use-supabase';

const Booking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const professionalId = searchParams.get('professionalId');
  const serviceId = searchParams.get('service');
  
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('09:00');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(2);
  const [submitting, setSubmitting] = useState(false);
  
  const { mutate: createBooking } = useCreateBooking();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to book a service",
          variant: "destructive",
        });
        localStorage.setItem('redirectAfterLogin', `/booking?professionalId=${professionalId}&service=${serviceId}`);
        navigate('/auth');
        return;
      }
      
      setUser(data.session.user);
    };
    
    const fetchProfessional = async () => {
      if (!professionalId) {
        navigate('/services');
        return;
      }
      
      setLoading(true);
      
      const { data, error } = await supabase
        .from('professionals')
        .select(`
          *,
          profile:profiles(*),
          categories:categories(*)
        `)
        .eq('id', professionalId)
        .single();
      
      setLoading(false);
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to load professional details",
          variant: "destructive",
        });
        navigate('/services');
        return;
      }
      
      setProfessional(data);
    };
    
    checkAuth();
    fetchProfessional();
  }, [professionalId, serviceId, navigate]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user || !professional || !date || !time || !address) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const serviceDate = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    serviceDate.setHours(hours, minutes);
    
    const bookingData = {
      professional_id: professional.id,
      client_id: user.id,
      service_date: serviceDate.toISOString(),
      duration: duration,
      address: address,
      description: description,
      status: 'pending',
      total_amount: (professional.hourly_rate || 75) * duration
    };
    
    setSubmitting(true);
    createBooking(bookingData, {
      onSuccess: () => {
        navigate('/bookings');
      },
      onError: (error) => {
        setSubmitting(false);
        toast({
          title: "Booking failed",
          description: error.message || "There was an error creating your booking",
          variant: "destructive",
        });
      }
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8 text-center">Book a Service</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Service Details</h2>
                  
                  <div className="space-y-2">
                    <Label>Service Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Select a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      max="8"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Service Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter the address where service is needed"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description of Work Needed</Label>
                    <Textarea
                      id="description"
                      placeholder="Please describe what you need help with..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={submitting || !date || !time || !address}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : 'Confirm Booking'}
                </Button>
              </form>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {professional && (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          {professional.profile?.avatar_url ? (
                            <img 
                              src={professional.profile.avatar_url} 
                              alt={`${professional.profile.first_name || ''} ${professional.profile.last_name || ''}`}
                              className="h-full w-full object-cover rounded-full"
                            />
                          ) : (
                            <div className="text-lg font-bold text-primary">
                              {(professional.profile?.first_name?.[0] || '') + (professional.profile?.last_name?.[0] || '').toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {`${professional.profile?.first_name || ''} ${professional.profile?.last_name || ''}`.trim() || 'Professional'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {professional.categories?.name || 'Service Professional'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Hourly Rate</p>
                            <p className="text-muted-foreground">${professional.hourly_rate || 75}/hour</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Service Area</p>
                            <p className="text-muted-foreground">
                              {[professional.city, professional.state].filter(Boolean).join(', ') || 'Location available upon booking'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Rate</span>
                          <span>${professional.hourly_rate || 75}/hr</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Duration</span>
                          <span>{duration} hours</span>
                        </div>
                        <div className="flex justify-between font-medium text-lg border-t pt-2 mt-2">
                          <span>Total</span>
                          <span>${(professional.hourly_rate || 75) * duration}</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;
