
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  link: string;
}

const ServiceCard = ({ icon, title, description, delay = 0, link }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative rounded-xl overflow-hidden bg-card subtle-shadow hover:shadow-lg transition-all duration-300"
    >
      <Link to={link} className="block p-6">
        <div className="flex flex-col space-y-4">
          <div className="p-3 rounded-lg bg-primary/10 w-fit">
            {icon}
          </div>
          
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm">
            {description}
          </p>
          
          <div className="flex items-center space-x-1 text-primary mt-2">
            <span className="text-sm font-medium">Learn more</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
      
      <div className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-primary/20 pointer-events-none transition-colors" />
    </motion.div>
  );
};

export default ServiceCard;
