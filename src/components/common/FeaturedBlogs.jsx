import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { getFeaturedBlogs } from '../../services/blogApi';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/800x400?text=No+Image';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

export default function FeaturedBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  const fetchFeaturedBlogs = async () => {
    try {
      const data = await getFeaturedBlogs();
      setBlogs(data.blogs?.slice(0, 3) || []);
    } catch (error) {
      console.error('Failed to fetch featured blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading || blogs.length === 0) return null;

  return (
    <section className="py-16 px-8 md:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="flex justify-center mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-600">Latest Updates</span>
          </div>
          <h2 className="text-2xl md:text-5xl font-bold tracking-tighter uppercase text-[var(--color-secondary)]">
            From Our <span className="text-[var(--color-primary)]">Blog</span>
          </h2>
          <div className="w-12 h-1 bg-[var(--color-primary)] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${blog.slug || blog._id}`}>
                <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl hover:bg-white transition-all duration-500">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getImageUrl(blog.thumbnailImage || blog.coverImage)}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {blog.category && (
                      <span className="absolute bottom-3 left-3 px-3 py-1 bg-[var(--color-primary)] text-white rounded-full text-[10px] font-bold uppercase">
                        {blog.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <Calendar size={12} />
                      {formatDate(blog.publishedAt || blog.createdAt)}
                    </div>
                    <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    {blog.shortDescription && (
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        {blog.shortDescription}
                      </p>
                    )}
                    <div className="flex items-center text-[var(--color-primary)] font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                      <BookOpen size={16} />
                      Read Article
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-secondary)] text-white rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[var(--color-primary)] transition-all shadow-lg hover:shadow-xl"
          >
            View All Articles
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
