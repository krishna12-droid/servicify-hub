
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Filter, Wrench, Zap, Construction, Home, Settings, Car } from 'lucide-react';
import { useCategories } from '@/hooks/use-supabase';

const Services = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: dbCategories } = useCategories();

  const defaultCategories = [
    {
      icon: <Wrench className="h-5 w-5" />,
      name: 'Plumbing',
      count: 42,
      slug: 'plumbing'
    },
    {
      icon: <Zap className="h-5 w-5" />,
      name: 'Electrical',
      count: 38,
      slug: 'electrical'
    },
    {
      icon: <Construction className="h-5 w-5" />,
      name: 'Carpentry',
      count: 29,
      slug: 'carpentry'
    },
    {
      icon: <Home className="h-5 w-5" />,
      name: 'Cleaning',
      count: 45,
      slug: 'cleaning'
    },
    {
      icon: <Settings className="h-5 w-5" />,
      name: 'Appliance Repair',
      count: 32,
      slug: 'appliance-repair'
    },
    {
      icon: <Car className="h-5 w-5" />,
      name: 'Moving Services',
      count: 27,
      slug: 'moving'
    }
  ];

  // Map database categories to our UI if available
  const categories = dbCategories && dbCategories.length > 0
    ? dbCategories.map(cat => {
        const iconMap = {
          'Plumbing': <Wrench className="h-5 w-5" />,
          'Electrical': <Zap className="h-5 w-5" />,
          'Carpentry': <Construction className="h-5 w-5" />,
          'Cleaning': <Home className="h-5 w-5" />,
          'Appliance Repair': <Settings className="h-5 w-5" />,
          'Moving Services': <Car className="h-5 w-5" />
        };
        
        return {
          icon: cat.icon ? iconMap[cat.name] || <Settings className="h-5 w-5" /> : <Settings className="h-5 w-5" />,
          name: cat.name,
          count: Math.floor(Math.random() * 50) + 10,
          slug: cat.name.toLowerCase().replace(/\s+/g, '-'),
          id: cat.id
        };
      })
    : defaultCategories;

  const defaultServices = [
    {
      id: 1,
      title: 'Pipe Repair & Installation',
      category: 'Plumbing',
      description: 'Professional pipe repair and installation services for your home or business.',
      price: 'From $85',
      imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1469&auto=format&fit=crop',
      slug: 'plumbing'
    },
    {
      id: 2,
      title: 'Electrical Wiring & Repairs',
      category: 'Electrical',
      description: 'Licensed electricians for all your electrical wiring and repair needs.',
      price: 'From $95',
      imageUrl: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?q=80&w=1470&auto=format&fit=crop',
      slug: 'electrical'
    },
    {
      id: 3,
      title: 'Furniture Assembly',
      category: 'Carpentry',
      description: 'Expert furniture assembly and installation for your home or office.',
      price: 'From $70',
      imageUrl: 'https://images.unsplash.com/photo-1594125674956-61a9b49c8ecc?q=80&w=1374&auto=format&fit=crop',
      slug: 'carpentry'
    },
    {
      id: 4,
      title: 'Deep House Cleaning',
      category: 'Cleaning',
      description: 'Thorough cleaning services to make your home spotless and fresh.',
      price: 'From $120',
      imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1470&auto=format&fit=crop',
      slug: 'cleaning'
    },
    {
      id: 5,
      title: 'Refrigerator Repair',
      category: 'Appliance Repair',
      description: 'Fast and reliable refrigerator repair services by certified technicians.',
      price: 'From $110',
      imageUrl: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?q=80&w=1470&auto=format&fit=crop',
      slug: 'appliance-repair'
    },
    {
      id: 6,
      title: 'Local Moving Services',
      category: 'Moving Services',
      description: 'Efficient and careful moving services for a stress-free relocation.',
      price: 'From $150',
      imageUrl: 'https://images.unsplash.com/photo-1600518464441-7a8421891f30?q=80&w=1470&auto=format&fit=crop',
      slug: 'moving'
    }
  ];

  // Map services with slug
  const services = defaultServices.map(service => {
    // Find if we have a matching database category
    const matchedCategory = dbCategories?.find(cat => 
      cat.name.toLowerCase() === service.category.toLowerCase()
    );
    
    return {
      ...service,
      categoryId: matchedCategory?.id || null
    };
  });

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
                Our Professional Services
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-muted-foreground text-lg"
              >
                Browse our wide range of professional services designed to meet all your maintenance needs
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center text-sm text-muted-foreground space-x-1"
              >
                <span>Home</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">Services</span>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Categories and Services */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
              {/* Sidebar */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-xl p-6 subtle-shadow"
                >
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <Link 
                          to={`/services/${category.slug}`}
                          className="flex items-center justify-between w-full py-2 text-left text-sm hover:text-primary transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                              {category.icon}
                            </div>
                            <span>{category.name}</span>
                          </div>
                          <span className="text-muted-foreground">({category.count})</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card rounded-xl p-6 subtle-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <Button variant="ghost" size="sm" className="text-muted-foreground text-xs">
                      Reset All
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-3">Price Range</h4>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1">
                          <input
                            type="range"
                            className="w-full accent-primary"
                            min="0"
                            max="500"
                            step="10"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>$0</span>
                        <span>$500+</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">Rating</h4>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`rating-${rating}`}
                              className="rounded border-border text-primary focus:ring-primary/20"
                            />
                            <label htmlFor={`rating-${rating}`} className="ml-2 text-sm">
                              {rating} Stars & Up
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <Filter className="h-4 w-4 mr-2" />
                      Apply Filters
                    </Button>
                  </div>
                </motion.div>
              </div>
              
              {/* Services Grid */}
              <div className="lg:col-span-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-semibold">All Services</h2>
                    <p className="text-muted-foreground text-sm">Showing all available services</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <select className="text-sm border border-input rounded-md py-1.5 px-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option>Recommended</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Highest Rated</option>
                    </select>
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="group"
                    >
                      <div className="bg-card rounded-xl overflow-hidden subtle-shadow hover:shadow-lg transition-all duration-300">
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <img
                            src={service.imageUrl}
                            alt={service.title}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-medium px-3 py-1 rounded-full">
                            {service.category}
                          </div>
                        </div>
                        
                        <div className="p-5 space-y-3">
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {service.description}
                          </p>
                          
                          <div className="flex justify-between items-center pt-3 border-t border-border">
                            <span className="font-medium">{service.price}</span>
                            <Link to={`/services/${service.slug}`}>
                              <Button size="sm">Book Now</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex justify-center mt-10"
                >
                  <Button variant="outline" size="lg">
                    Load More Services
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;
