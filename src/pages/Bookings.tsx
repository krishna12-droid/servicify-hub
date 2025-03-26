
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Clock4, 
  Loader2 
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Bookings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to view your bookings",
          variant: "destructive",
        });
        localStorage.setItem('redirectAfterLogin', '/bookings');
        navigate('/auth');
        return;
      }
      
      setUser(data.session.user);
      fetchBookings(data.session.user.id);
    };
    
    const fetchBookings = async (userId) => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          professional:professionals(
            *,
            profile:profiles(*)
          )
        `)
        .eq('client_id', userId)
        .order('service_date', { ascending: false });
      
      setLoading(false);
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to load your bookings",
          variant: "destructive",
        });
        return;
      }
      
      setBookings(data || []);
    };
    
    checkAuth();
    
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      }
    });
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-50';
      case 'cancelled':
        return 'text-red-500 bg-red-50';
      case 'pending':
        return 'text-amber-500 bg-amber-50';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock4 className="h-4 w-4" />;
      default:
        return <Clock4 className="h-4 w-4" />;
    }
  };
  
  const isPast = (date) => {
    return new Date(date) < new Date();
  };
  
  const pendingBookings = bookings.filter(b => b.status === 'pending' && !isPast(b.service_date));
  const completedBookings = bookings.filter(b => b.status === 'completed' || isPast(b.service_date));
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');
  
  return (
    <div className="min-h-screen py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-3 text-center">Your Bookings</h1>
          <p className="text-muted-foreground text-center mb-8">
            Manage and track all your service appointments
          </p>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span>Loading your bookings...</span>
              </div>
            </div>
          ) : bookings.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <h3 className="text-xl font-medium mb-3">No bookings found</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't made any service bookings yet.
                </p>
                <Button onClick={() => navigate('/services')}>
                  Explore Services
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="upcoming">
                  Upcoming ({pendingBookings.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({completedBookings.length})
                </TabsTrigger>
                <TabsTrigger value="cancelled">
                  Cancelled ({cancelledBookings.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="space-y-4">
                {pendingBookings.length === 0 ? (
                  <Card className="text-center py-8">
                    <CardContent>
                      <p className="text-muted-foreground">
                        You don't have any upcoming bookings.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  pendingBookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-4">
                {completedBookings.length === 0 ? (
                  <Card className="text-center py-8">
                    <CardContent>
                      <p className="text-muted-foreground">
                        You don't have any completed bookings.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  completedBookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="cancelled" className="space-y-4">
                {cancelledBookings.length === 0 ? (
                  <Card className="text-center py-8">
                    <CardContent>
                      <p className="text-muted-foreground">
                        You don't have any cancelled bookings.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  cancelledBookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                )}
              </TabsContent>
            </Tabs>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const BookingCard = ({ booking }) => {
  const statusColor = getStatusColor(booking.status);
  const statusIcon = getStatusIcon(booking.status);
  const serviceDateObj = new Date(booking.service_date);
  const isPastBooking = serviceDateObj < new Date();
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                {booking.professional?.profile?.avatar_url ? (
                  <img 
                    src={booking.professional.profile.avatar_url} 
                    alt="Professional"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-lg font-bold text-primary">
                    {(booking.professional?.profile?.first_name?.[0] || '') + 
                    (booking.professional?.profile?.last_name?.[0] || '').toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium">
                  {`${booking.professional?.profile?.first_name || ''} ${booking.professional?.profile?.last_name || ''}`.trim() 
                    || 'Professional'}
                </h3>
                <div className="flex items-center text-sm space-x-2">
                  <span className={`px-2 py-0.5 rounded-full flex items-center gap-1 text-xs ${statusColor}`}>
                    {statusIcon}
                    <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                  </span>
                  {isPastBooking && booking.status === 'pending' && (
                    <span className="text-muted-foreground">(Service date passed)</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{format(serviceDateObj, 'PPP')}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span>{format(serviceDateObj, 'p')} • {booking.duration} hours</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-1.5 text-sm mb-4">
            <MapPin className="h-4 w-4 text-primary mt-0.5" />
            <span>{booking.address}</span>
          </div>
          
          {booking.description && (
            <div className="bg-muted/30 p-3 rounded-md text-sm">
              <p className="text-muted-foreground">{booking.description}</p>
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <div>
              <span className="font-medium">Total:</span> <span>${booking.total_amount}</span>
            </div>
            
            {booking.status === 'pending' && !isPastBooking && (
              <Button variant="outline" size="sm">
                Cancel Booking
              </Button>
            )}
            
            {booking.status === 'completed' && (
              <Button variant="outline" size="sm">
                Leave Review
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Bookings;
