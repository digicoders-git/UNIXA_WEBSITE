import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Heart, Tag, ArrowLeft, Share2, MessageCircle, Send } from 'lucide-react';
import { getSingleBlog, likeBlog, unlikeBlog, addComment, getComments, deleteComment } from '../../services/blogApi';
import Swal from 'sweetalert2';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/800x400?text=No+Image';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({ name: '', email: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);

  useEffect(() => {
    fetchBlog();
    fetchComments();
    // Check if already liked
    const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
    if (likedBlogs.includes(slug)) {
      setLiked(true);
    }
    // Load saved user info
    const savedEmail = localStorage.getItem('blogUserEmail');
    const savedName = localStorage.getItem('blogUserName');
    if (savedEmail && savedName) {
      setCommentForm(prev => ({ ...prev, email: savedEmail, name: savedName }));
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const data = await getSingleBlog(slug);
      setBlog(data.blog);
    } catch (error) {
      console.error('Failed to fetch blog:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load blog. Please try again.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const data = await getComments(slug);
      setComments(data.comments || []);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleLike = async () => {
    try {
      const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
      
      if (liked) {
        // Unlike
        await unlikeBlog(slug);
        setBlog(prev => ({ ...prev, likes: Math.max(0, (prev.likes || 0) - 1) }));
        setLiked(false);
        // Remove from localStorage
        const updatedLikes = likedBlogs.filter(id => id !== slug);
        localStorage.setItem('likedBlogs', JSON.stringify(updatedLikes));
      } else {
        // Like
        await likeBlog(slug);
        setBlog(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));
        setLiked(true);
        // Add to localStorage
        likedBlogs.push(slug);
        localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));
      }
    } catch (error) {
      console.error('Failed to like/unlike blog:', error);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: blog.title, url });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(url);
      Swal.fire({
        icon: 'success',
        title: 'Link Copied!',
        text: 'Blog link copied to clipboard',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.email || !commentForm.comment) return;
    
    try {
      setSubmitting(true);
      const result = await addComment(slug, commentForm);
      
      // Save user info to localStorage
      localStorage.setItem('blogUserEmail', commentForm.email);
      localStorage.setItem('blogUserName', commentForm.name);
      
      Swal.fire({
        icon: 'success',
        title: 'Comment Posted!',
        text: 'Your comment has been posted successfully.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
      // Keep email and name, only clear comment
      setCommentForm(prev => ({ ...prev, comment: '' }));
      fetchComments();
    } catch (error) {
      console.error('Failed to submit comment:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit comment. Please try again.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId, commentEmail) => {
    const result = await Swal.fire({
      title: 'Delete Comment?',
      text: 'Are you sure you want to delete this comment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it'
    });

    if (!result.isConfirmed) return;

    try {
      await deleteComment(commentId, commentEmail);
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Comment deleted successfully.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
      fetchComments();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete comment.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Blog not found</h2>
          <Link to="/blog" className="text-[var(--color-primary)] hover:underline">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={getImageUrl(blog.coverImage || blog.thumbnailImage)}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Blogs
            </Link>
            {blog.category && (
              <span className="inline-block px-4 py-2 bg-[var(--color-primary)] text-white rounded-full text-sm font-semibold mb-4">
                {blog.category}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center gap-6 text-white/90 text-sm">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {formatDate(blog.publishedAt || blog.createdAt)}
              </span>
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 ${liked ? 'text-red-400' : 'hover:text-red-400'} transition-colors`}
              >
                <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
                {blog.likes || 0}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            {blog.shortDescription && (
              <div className="mb-8 pb-8 border-b border-slate-200">
                <p className="text-xl text-slate-600 italic leading-relaxed">
                  "{blog.shortDescription}"
                </p>
              </div>
            )}

            <div className="blog-content">
              <div
                className="prose prose-lg max-w-none prose-slate prose-headings:text-[var(--color-secondary)] prose-a:text-[var(--color-primary)] prose-strong:text-[var(--color-secondary)] prose-img:rounded-xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {blog.authorName && (
              <div className="mt-8 p-6 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-500 mb-1">Written by</p>
                <p className="text-lg font-bold text-[var(--color-secondary)]">{blog.authorName}</p>
                {blog.readTime && (
                  <p className="text-sm text-slate-600 mt-1">{blog.readTime}</p>
                )}
              </div>
            )}

            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-3">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors"
                    >
                      <Tag size={14} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                      liked
                        ? 'bg-red-100 text-red-600'
                        : 'bg-slate-100 text-slate-700 hover:bg-red-100 hover:text-red-600'
                    }`}
                  >
                    <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                    {blog.likes || 0}
                  </button>
                  <button
                    onClick={() => setShowCommentModal(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-600 transition-all"
                  >
                    <MessageCircle size={20} />
                    {comments.length}
                  </button>
                </div>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-semibold hover:opacity-90 transition-all"
                >
                  <Share2 size={20} />
                  Share
                </button>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:gap-3 transition-all font-semibold"
            >
              <ArrowLeft size={20} />
              Back to all blogs
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram-style Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowCommentModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <MessageCircle size={20} />
                Comments ({comments.length})
              </h3>
              <button
                onClick={() => setShowCommentModal(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-600">No comments yet.</p>
                  <p className="text-slate-500 text-sm">Be the first to comment!</p>
                </div>
              ) : (
                comments.map((comment) => {
                  const userEmail = localStorage.getItem('blogUserEmail');
                  const canDelete = userEmail === comment.email;
                  
                  return (
                    <div key={comment._id} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold flex-shrink-0">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 text-sm">{comment.name}</span>
                            <span className="text-xs text-slate-500">
                              {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          {canDelete && (
                            <button
                              onClick={() => handleDeleteComment(comment._id, comment.email)}
                              className="text-xs text-red-500 hover:text-red-700 transition-colors font-medium"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed">{comment.comment}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Comment Form */}
            <div className="border-t border-slate-200 p-4">
              <form onSubmit={handleCommentSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={commentForm.name}
                    onChange={(e) => setCommentForm({...commentForm, name: e.target.value})}
                    required
                    className="px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={commentForm.email}
                    onChange={(e) => setCommentForm({...commentForm, email: e.target.value})}
                    required
                    className="px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentForm.comment}
                    onChange={(e) => setCommentForm({...commentForm, comment: e.target.value})}
                    required
                    className="flex-1 px-4 py-2 rounded-full border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                  <button
                    type="submit"
                    disabled={submitting || !commentForm.comment.trim()}
                    className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-full font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
