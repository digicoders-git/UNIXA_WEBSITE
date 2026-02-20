import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Send } from 'lucide-react';
import api from '../../services/api';
import Footer from '../../components/layout/Footer';
import Swal from 'sweetalert2';

// Add CSS for sliding animation
const slideStyles = `
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-scroll {
    animation: scroll 30s linear infinite;
  }
  .animate-scroll:hover {
    animation-play-state: paused;
  }
`;

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ user: '', role: '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sliderReviews, setSliderReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
    fetchSliderReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await api.get('/reviews/all');
      setReviews(data.reviews);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSliderReviews = async () => {
    try {
      const { data } = await api.get('/reviews/slider');
      if (data.success) {
        setSliderReviews(data.reviews);
      }
    } catch (error) {
      console.error('Failed to fetch slider reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/reviews/add', { ...form, isTestimonial: true });
      Swal.fire('Success!', 'Your review has been submitted for approval', 'success');
      setForm({ user: '', role: '', rating: 5, comment: '' });
    } catch (error) {
      Swal.fire('Error', 'Failed to submit review', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <style>{slideStyles}</style>
      <section className="py-16 px-6 md:px-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-secondary)] tracking-tighter uppercase mb-4">
              Customer <span className="text-[var(--color-primary)]">Testimonials</span>
            </h1>
            <div className="w-12 h-1 bg-[var(--color-primary)] mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Read what our satisfied customers have to say about their experience with UNIXA water purifiers
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {sliderReviews.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-center mb-6 text-[var(--color-primary)]">Featured Reviews</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sliderReviews.map((review, i) => (
                      <motion.div
                        key={review._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl border-2 border-[var(--color-primary)] shadow-lg hover:shadow-2xl transition-all"
                      >
                        <Quote className="text-[var(--color-primary)]/20 mb-4" size={40} />
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} size={14} className={idx < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                          ))}
                        </div>
                        <p className="text-slate-600 font-medium italic mb-6 leading-relaxed">
                          "{review.comment}"
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-lg uppercase">
                            {review.user[0]}
                          </div>
                          <div>
                            <h4 className="font-bold text-[var(--color-secondary)] text-sm">{review.user}</h4>
                            <p className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider">{review.role || "Verified Buyer"}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {reviews.filter(review => !sliderReviews.some(slider => slider._id === review._id)).map((review, i) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                >
                  <Quote className="text-[var(--color-primary)]/10 mb-4" size={40} />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={14} className={idx < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                    ))}
                  </div>
                  <p className="text-slate-600 font-medium italic mb-6 leading-relaxed">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-lg uppercase">
                      {review.user[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-secondary)] text-sm">{review.user}</h4>
                      <p className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider">{review.role || "Verified Buyer"}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            </>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto bg-slate-50 p-8 rounded-3xl border border-slate-200"
          >
            <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-6 text-center">Share Your Experience</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={form.user}
                  onChange={(e) => setForm({ ...form, user: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Your Role (e.g., Customer)"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star size={24} className={star <= form.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                placeholder="Write your review *"
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                rows="4"
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-secondary)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : <><Send size={18} /> Submit Review</>}
              </button>
              <p className="text-xs text-center text-slate-500">Your review will be published after admin approval</p>
            </form>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Testimonials;
