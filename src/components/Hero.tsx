
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const services = ['Plumbing', 'Electrical', 'Carpentry', 'Cleaning', 'Painting'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background z-0" />
      
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col space-y-4"
            >
              <span className="inline-block text-sm font-medium px-4 py-1.5 rounded-full bg-primary/10 text-primary w-fit">
                Professional Services On Demand
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Find Skilled
                <div className="relative inline-block ml-3 text-primary">
                  <span
                    className="absolute transition-all duration-300"
                    style={{
                      opacity: currentImageIndex === 0 ? 1 : 0,
                      transform: `translateY(${currentImageIndex === 0 ? 0 : '20px'})`,
                    }}
                  >
                    Plumbers
                  </span>
                  <span
                    className="absolute transition-all duration-300"
                    style={{
                      opacity: currentImageIndex === 1 ? 1 : 0,
                      transform: `translateY(${currentImageIndex === 1 ? 0 : '20px'})`,
                    }}
                  >
                    Electricians
                  </span>
                  <span
                    className="absolute transition-all duration-300"
                    style={{
                      opacity: currentImageIndex === 2 ? 1 : 0,
                      transform: `translateY(${currentImageIndex === 2 ? 0 : '20px'})`,
                    }}
                  >
                    Carpenters
                  </span>
                  <span
                    className="absolute transition-all duration-300"
                    style={{
                      opacity: currentImageIndex === 3 ? 1 : 0,
                      transform: `translateY(${currentImageIndex === 3 ? 0 : '20px'})`,
                    }}
                  >
                    Cleaners
                  </span>
                  <span
                    className="absolute transition-all duration-300"
                    style={{
                      opacity: currentImageIndex === 4 ? 1 : 0,
                      transform: `translateY(${currentImageIndex === 4 ? 0 : '20px'})`,
                    }}
                  >
                    Painters
                  </span>
                  <span className="opacity-0">Professionals</span>
                </div>
                <br />
                Near You
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-md md:max-w-lg">
                Book trusted professionals for all your home service needs with our seamless platform.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="What service do you need?"
                />
              </div>
              <Button size="lg" className="px-8">
                Search
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-center space-x-4 text-sm text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span>
                Trusted by <span className="font-medium text-foreground">10,000+</span> customers
              </span>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative aspect-square max-w-md mx-auto lg:ml-auto"
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden glass subtle-shadow">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>
            
            <div className="absolute top-6 left-6 right-6 bottom-6 rounded-2xl overflow-hidden bg-white/80 backdrop-blur">
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1469&auto=format&fit=crop')] bg-cover bg-center" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-4 right-4 glass rounded-lg p-3 animate-float">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm font-medium">Available Now</span>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 glass rounded-lg p-3 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-sm font-medium">4.9 Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
