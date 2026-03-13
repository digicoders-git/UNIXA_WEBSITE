import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, User, MessageCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Please fill required fields');
      return;
    }
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Thank you! We will contact you soon.');
      onClose();
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              <X size={20} className="text-gray-600" />
            </button>

            {/* Modal Content - Landscape Optimized */}
            <div className="flex flex-col lg:flex-row min-h-[500px]">
              {/* Left Side - Info */}
              <div className="lg:w-2/5 bg-gradient-to-br from-blue-600 to-blue-800 p-8 lg:p-12 text-white flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl lg:text-4xl font-bold mb-3">Get Pure Water Today!</h2>
                    <p className="text-blue-100 text-sm lg:text-base leading-relaxed">
                      Join thousands of satisfied customers who trust UNIXA for clean, safe drinking water.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Phone size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Free Installation</p>
                        <p className="text-blue-200 text-xs">Professional setup included</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">5 Year Warranty</p>
                        <p className="text-blue-200 text-xs">Complete peace of mind</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="lg:w-3/5 p-8 lg:p-12">
                <div className="max-w-md mx-auto lg:max-w-none">
                  <div className="mb-8">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Request Free Demo</h3>
                    <p className="text-gray-600 text-sm lg:text-base">Fill the form below and our expert will contact you within 24 hours.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                        <div className="relative">
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full pl-12 pr-4 py-3 lg:py-4 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Phone Number *</label>
                        <div className="relative">
                          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full pl-12 pr-4 py-3 lg:py-4 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Email Address</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter email address"
                          className="w-full pl-12 pr-4 py-3 lg:py-4 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Message</label>
                      <div className="relative">
                        <MessageCircle size={18} className="absolute left-4 top-4 text-gray-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your requirements..."
                          rows="3"
                          className="w-full pl-12 pr-4 py-3 lg:py-4 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 lg:py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm lg:text-base"
                    >
                      {loading ? 'Submitting...' : 'Get Free Demo'}
                    </button>
                  </form>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting, you agree to our terms and privacy policy.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;