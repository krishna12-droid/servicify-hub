
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import { Wrench, Zap, Construction, Home, Settings, Car } from 'lucide-react';
import { useCategories } from '@/hooks/use-supabase';

const CategorySection = () => {
  const { data: dbCategories } = useCategories();
  
  // Default services in case the database categories aren't loaded
  const defaultServices = [
    {
      icon: <Wrench className="h-6 w-6 text-primary" />,
      title: 'Plumbing',
      description: 'Expert plumbers for repairs, installations, and maintenance of all your plumbing systems.',
      slug: 'plumbing'
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: 'Electrical',
      description: 'Licensed electricians for all your electrical repairs, installations, and upgrades.',
      slug: 'electrical'
    },
    {
      icon: <Construction className="h-6 w-6 text-primary" />,
      title: 'Carpentry',
      description: 'Skilled carpenters for furniture assembly, repairs, and custom woodworking projects.',
      slug: 'carpentry'
    },
    {
      icon: <Home className="h-6 w-6 text-primary" />,
      title: 'Cleaning',
      description: 'Professional cleaning services for residential and commercial properties.',
      slug: 'cleaning'
    },
    {
      icon: <Settings className="h-6 w-6 text-primary" />,
      title: 'Appliance Repair',
      description: 'Expert technicians to repair and maintain all your home appliances.',
      slug: 'appliance-repair'
    },
    {
      icon: <Car className="h-6 w-6 text-primary" />,
      title: 'Moving Services',
      description: 'Reliable moving services to help you relocate with ease and efficiency.',
      slug: 'moving'
    }
  ];
  
  // Map database categories to our UI if available
  const services = dbCategories && dbCategories.length > 0
    ? dbCategories.map(cat => {
        const iconMap = {
          'Plumbing': <Wrench className="h-6 w-6 text-primary" />,
          'Electrical': <Zap className="h-6 w-6 text-primary" />,
          'Carpentry': <Construction className="h-6 w-6 text-primary" />,
          'Cleaning': <Home className="h-6 w-6 text-primary" />,
          'Appliance Repair': <Settings className="h-6 w-6 text-primary" />,
          'Moving Services': <Car className="h-6 w-6 text-primary" />
        };
        
        return {
          icon: cat.icon ? iconMap[cat.name] || <Settings className="h-6 w-6 text-primary" /> : <Settings className="h-6 w-6 text-primary" />,
          title: cat.name,
          description: cat.description || `Professional ${cat.name} services for your home or business.`,
          slug: cat.name.toLowerCase().replace(/\s+/g, '-'),
          id: cat.id
        };
      })
    : defaultServices;

  return (
    <section className="py-24 bg-accent/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16 space-y-4"
        >
          <span className="inline-block text-sm font-medium px-4 py-1.5 rounded-full bg-primary/10 text-primary">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Expert Services for Every Need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through our wide range of professional services designed to meet all your home and property maintenance needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 0.1}
              link={`/services/${service.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
