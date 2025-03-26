
import { motion } from 'framer-motion';
import { Star, Briefcase, CheckCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedProfessionals = () => {
  const professionals = [
    {
      name: 'Michael Johnson',
      profession: 'Electrician',
      rating: 4.9,
      reviews: 142,
      verified: true,
      location: 'San Francisco',
      experience: '8 years',
      imgUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
    },
    {
      name: 'Sarah Williams',
      profession: 'Plumber',
      rating: 4.8,
      reviews: 98,
      verified: true,
      location: 'Los Angeles',
      experience: '6 years',
      imgUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
    },
    {
      name: 'David Chen',
      profession: 'Carpenter',
      rating: 4.7,
      reviews: 87,
      verified: true,
      location: 'New York',
      experience: '10 years',
      imgUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="space-y-4 max-w-xl">
            <span className="inline-block text-sm font-medium px-4 py-1.5 rounded-full bg-primary/10 text-primary">
              Top Professionals
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Meet Our Verified Experts
            </h2>
            <p className="text-muted-foreground">
              Our platform connects you with the highest-rated and most reliable professionals in your area.
            </p>
          </div>
          <Button variant="outline" className="self-start md:self-auto">
            View All Professionals
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {professionals.map((professional, index) => (
            <motion.div
              key={professional.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden bg-card rounded-xl subtle-shadow hover:shadow-lg transition-all duration-300">
                <div className="aspect-[3/2] relative overflow-hidden">
                  <img
                    src={professional.imgUrl}
                    alt={professional.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 glass rounded-lg px-3 py-1.5">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{professional.rating}</span>
                      <span className="text-xs text-muted-foreground">({professional.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{professional.name}</h3>
                      <p className="text-primary font-medium">{professional.profession}</p>
                    </div>
                    {professional.verified && (
                      <div className="rounded-full p-1 bg-primary/10">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4 mr-1.5" />
                      {professional.experience}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1.5" />
                      {professional.location}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border flex justify-between items-center">
                    <span className="text-sm font-medium">Available Today</span>
                    <Button size="sm">Book Now</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfessionals;
