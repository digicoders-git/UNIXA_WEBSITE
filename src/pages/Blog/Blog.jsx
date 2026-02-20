import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Heart, Tag, ArrowRight } from 'lucide-react';
import { getPublishedBlogs } from '../../services/blogApi';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/800x400?text=No+Image';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const fetchBlogs = async (page) => {
    try {
      setLoading(true);
      const data = await getPublishedBlogs(page, 9);
      setBlogs(data.blogs || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-cyan-600 py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Our <span className="text-yellow-300">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            Stay updated with the latest news, tips, and insights about water purification
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-slate-600">No blogs available yet.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    <Link to={`/blog/${blog.slug || blog._id}`}>
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={getImageUrl(blog.thumbnailImage || blog.coverImage)}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {blog.isFeatured && (
                          <span className="absolute top-4 left-4 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(blog.publishedAt || blog.createdAt)}
                          </span>
                          {blog.likes > 0 && (
                            <span className="flex items-center gap-1">
                              <Heart size={14} />
                              {blog.likes}
                            </span>
                          )}
                        </div>
                        {blog.category && (
                          <span className="inline-block px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-xs font-semibold mb-3">
                            {blog.category}
                          </span>
                        )}
                        <h3 className="text-xl font-bold text-[var(--color-secondary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                          {blog.title}
                        </h3>
                        {blog.shortDescription && (
                          <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                            {blog.shortDescription}
                          </p>
                        )}
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {blog.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="flex items-center gap-1 text-xs text-slate-500">
                                <Tag size={12} />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center text-[var(--color-primary)] font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                          Read More <ArrowRight size={16} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-6 py-2 bg-white border-2 border-slate-200 rounded-full font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>
                  <span className="text-slate-600 font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-full font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
