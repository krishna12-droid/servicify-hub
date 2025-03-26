
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-accent/30 border-t border-border">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">ServiceHub</h3>
            <p className="text-muted-foreground text-sm">
              Connecting you with skilled professionals for all your service needs. Quality work, guaranteed satisfaction.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/professionals" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Professionals
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/plumbing" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link to="/services/electrical" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Electrical
                </Link>
              </li>
              <li>
                <Link to="/services/carpentry" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Carpentry
                </Link>
              </li>
              <li>
                <Link to="/services/cleaning" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/appliance-repair" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Appliance Repair
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Subscribe</h3>
            <p className="text-muted-foreground text-sm">
              Stay updated with our latest services and offers.
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Your email"
                className="rounded-lg"
              />
              <Button size="icon" className="rounded-lg">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} ServiceHub. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
