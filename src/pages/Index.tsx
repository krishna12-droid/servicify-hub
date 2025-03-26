
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import FeaturedProfessionals from '@/components/FeaturedProfessionals';
import Footer from '@/components/Footer';
import { Check, Clock, Shield, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const features = [
    {
      icon: <Check className="h-6 w-6" />,
      title: 'Verified Professionals',
      description: 'All service providers are thoroughly vetted and verified for your security and peace of mind.'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'On-Time Service',
      description: 'Our professionals are committed to punctuality and respect for your schedule.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Satisfaction Guarantee',
      description: 'We stand behind our service quality with a 100% satisfaction guarantee.'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Top-Rated Experts',
      description: 'Access to the highest-rated professionals in your area for quality service.'
    }
  ];

  const howItWorks = [
    {
      number: '01',
      title: 'Choose a Service',
      description: 'Browse through our range of professional services and select the one you need.'
    },
    {
      number: '02',
      title: 'Select a Professional',
      description: 'View profiles, ratings, and availability to select the right professional for your job.'
    },
    {
      number: '03',
      title: 'Schedule & Pay',
      description: 'Book your appointment at a convenient time and pay securely through our platform.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 subtle-shadow flex flex-col items-center text-center"
                >
                  <div className="p-3 bg-primary/10 rounded-lg text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <CategorySection />
        
        {/* How It Works */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center mb-16 space-y-4"
            >
              <span className="inline-block text-sm font-medium px-4 py-1.5 rounded-full bg-primary/10 text-primary">
                Simple Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                How ServiceHub Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform makes it easy to find and book reliable professionals in just a few simple steps.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative bg-card rounded-xl p-8 subtle-shadow"
                >
                  <div className="absolute -top-5 -left-5 w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-semibold text-lg subtle-shadow">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <FeaturedProfessionals />
        
        {/* CTA Section */}
        <section className="py-24 bg-accent/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 md:p-12 subtle-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full -ml-20 -mb-20 blur-3xl" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="max-w-xl"
                >
                  <h2 className="text-3xl font-bold tracking-tight mb-4">
                    Ready to Get Started With ServiceHub?
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Join thousands of satisfied customers who have found reliable professionals for their service needs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="px-8">
                      Book a Service
                    </Button>
                    <Button variant="outline" size="lg" className="group">
                      Become a Provider
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-start space-x-2"
                >
                  <div className="flex flex-col space-y-1 items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">Trusted by 10,000+ customers</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
