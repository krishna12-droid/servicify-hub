
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Clock, CheckCircle, Check, X, HelpCircle } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Booking } from '@/types';
import { Skeleton } from "@/components/ui/skeleton";

const statusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const statusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4" />;
    case 'confirmed':
      return <CheckCircle className="h-4 w-4" />;
    case 'completed':
      return <Check className="h-4 w-4" />;
    case 'cancelled':
      return <X className="h-4 w-4" />;
    default:
      return <HelpCircle className="h-4 w-4" />;
  }
};

// Define a simplified booking type just for this component
interface BookingItem {
  id: string;
  description?: string;
  date: string;
  duration: number;
  status: string;
}

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('client_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          setError(error.message);
        } else {
          // Transform the data to match our simplified BookingItem interface
          const formattedBookings = data.map(booking => ({
            id: booking.id,
            description: booking.description || 'Unnamed Service',
            date: booking.service_date,
            duration: booking.duration,
            status: booking.status
          }));
          setBookings(formattedBookings);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>;
  }

  if (!user) {
    return <div className="container mx-auto p-4">Please sign in to view your bookings.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="text-gray-500">No bookings found.</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {booking.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-gray-900 whitespace-no-wrap">
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-gray-900 whitespace-no-wrap">
                      {booking.duration} min
                    </p>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full flex items-center gap-1 ${statusColor(booking.status)}`}>
                      {statusIcon(booking.status)}
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button className="text-indigo-600 hover:text-indigo-900">
                      View Details
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Bookings;
