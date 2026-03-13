import { Phone, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../../services/api';

const FloatingContact = () => {
  const [showForm, setShowForm] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    
    checkOrientation();
    
    // Show form after 2 seconds on page load if landscape
    const timer = setTimeout(() => {
      if (window.innerWidth > window.innerHeight) {
        setShowForm(true);
      }
    }, 2000);
    
    window.addEventListener('resize', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      clearTimeout(timer);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: numbersOnly });
    } else if (name === 'name') {
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData({ ...formData, [name]: lettersOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setLoading(true);
    try {
      await api.post(`/enquiry`, formData);
      toast.success("Thank you! Your message has been sent.");
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
      setShowForm(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed left-0 bottom-0 -translate-y-1/2 z-[999] flex flex-col gap-5">
        <a
          href="tel:+919278176662"
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all hover:scale-110 animate-pulse"
          title="Call us: +91 9278176662"
        >
          <Phone size={22} />
        </a>
        
        <a
          href="https://wa.me/919278176663"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all hover:scale-110 animate-bounce"
          title="WhatsApp: +91 9278176663"
        >
          <FaWhatsapp size={22} />
        </a>
      </div>

      <AnimatePresence>
        {showForm && isLandscape && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 w-full max-w-md relative shadow-2xl border border-slate-200"
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all"
              >
                <X size={16} />
              </button>
              
              <div className="space-y-2 mb-6">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Quick <span className="text-blue-600">Contact</span></h3>
                <p className="text-slate-500 text-sm font-medium">We'll get back to you as soon as possible.</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 ml-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl outline-none border border-slate-200 bg-white focus:border-blue-600 transition-all"
                    required
                  />
                  {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 ml-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="w-full px-4 py-3 rounded-xl outline-none border border-slate-200 bg-white focus:border-blue-600 transition-all"
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-xs ml-1">{errors.phone}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 ml-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl outline-none border border-slate-200 bg-white focus:border-blue-600 transition-all"
                    />
                    {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 ml-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Inquiry Topic"
                    className="w-full px-4 py-3 rounded-xl outline-none border border-slate-200 bg-white focus:border-blue-600 transition-all"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 ml-1">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl outline-none border border-slate-200 bg-white focus:border-blue-600 transition-all resize-none"
                    required
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs ml-1">{errors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all bg-blue-600 text-white hover:bg-slate-900 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingContact;