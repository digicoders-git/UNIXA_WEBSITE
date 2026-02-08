import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import { Star, Send, User, Calendar, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const ReviewSection = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [loading, setLoading] = useState(true);
    
    // Form state
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [userName, setUserName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchReviews = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get(`/reviews/${productId}`);
            if (response.data.success) {
                setReviews(response.data.reviews || []);
                setAverageRating(response.data.averageRating || 0);
                setTotalReviews(response.data.totalReviews || 0);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
            // Fallback to empty state if backend is not reachable
            setReviews([]);
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!userName.trim()) {
            toast.error("Please enter your name");
            return;
        }
        
        if (!comment.trim()) {
            toast.error("Please enter a review comment");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await api.post(`/reviews/add`, {
                productId,
                user: userName,
                rating,
                comment
            });

            if (response.data.success) {
                toast.success("Review submitted successfully!");
                setUserName('');
                setComment('');
                setRating(5);
                fetchReviews(); // Refresh reviews
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            const msg = error.response?.data?.message || "Failed to submit review. Make sure the backend is running.";
            toast.error(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="reviews-section" className="mt-20 border-t border-slate-100 pt-16 font-(--font-body)">
            <div className="flex flex-col md:flex-row gap-12">
                
                {/* Summary Section */}
                <div className="w-full md:w-1/3">
                    <h3 className="text-2xl font-black text-(--color-secondary) mb-6 flex items-center gap-2">
                        Customer Reviews
                    </h3>
                    
                    <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-xl shadow-slate-100/50">
                        <div className="text-center mb-6">
                            <div className="text-6xl font-black text-(--color-primary) mb-2">
                                {averageRating > 0 ? averageRating : '0.0'}
                            </div>
                            <div className="flex justify-center text-yellow-400 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={20} 
                                        fill={i < Math.round(averageRating) ? "currentColor" : "none"} 
                                        className={i < Math.round(averageRating) ? "text-yellow-400" : "text-slate-300"}
                                    />
                                ))}
                            </div>
                            <p className="text-slate-500 font-bold text-sm">Based on {totalReviews} reviews</p>
                        </div>
                        
                        {/* Rating Bars */}
                        <div className="space-y-3">
                            {[5, 4, 3, 2, 1].map((num) => {
                                const count = reviews.filter(r => r.rating === num).length;
                                const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                                return (
                                    <div key={num} className="flex items-center gap-3">
                                        <span className="text-xs font-black text-slate-500 w-4">{num}</span>
                                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-(--color-primary) rounded-full transition-all duration-1000"
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 w-8">{Math.round(percent)}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Add Review & List Section */}
                <div className="w-full md:w-2/3">
                    
                    {/* Form */}
                    <div className="bg-white rounded-4xl p-8 border-2 border-slate-50 shadow-xl mb-12">
                        <h4 className="text-xl font-black text-(--color-secondary) mb-6 flex items-center gap-2 uppercase tracking-wider">
                            Share Your Experience
                        </h4>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Your Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input 
                                            type="text" 
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            placeholder="Enter your name"
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-(--color-primary)/20 outline-none transition-all font-bold text-slate-700"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Rating</label>
                                    <div className="flex gap-2 py-3">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <button
                                                key={num}
                                                type="button"
                                                onClick={() => setRating(num)}
                                                onMouseEnter={() => setHoverRating(num)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="transition-transform active:scale-90"
                                            >
                                                <Star 
                                                    size={32} 
                                                    fill={(hoverRating || rating) >= num ? "#EAB308" : "none"} 
                                                    className={(hoverRating || rating) >= num ? "text-yellow-500" : "text-slate-300"}
                                                />
                                            </button>
                                        ))}
                                        <span className="ml-3 font-black text-(--color-primary) self-center">{rating}/5</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Your Review</label>
                                <textarea 
                                    rows="4"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Tell us what you like or dislike about this product..."
                                    className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-(--color-primary)/20 outline-none transition-all font-medium text-slate-600 leading-relaxed"
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 bg-(--color-secondary) text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-(--color-primary) transition-all shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 disabled:opacity-70 active:scale-95"
                            >
                                {isSubmitting ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Send size={18} />
                                )}
                                {isSubmitting ? 'Submitting...' : 'Post My Review'}
                            </button>
                        </form>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="text-xl font-black text-(--color-secondary) uppercase tracking-wider">
                                Filtered Reviews ({reviews.length})
                            </h4>
                            <div className="text-xs font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                                Most Recent First
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="w-8 h-8 border-4 border-(--color-primary) border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="text-center py-16 bg-slate-50 rounded-4xl border-2 border-dashed border-slate-200">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-slate-300 text-3xl">💬</div>
                                <p className="text-slate-400 font-bold italic">No reviews yet. Be the first to share your thoughts!</p>
                            </div>
                        ) : (
                            reviews.map((review, index) => (
                                <div key={review._id || index} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-linear-to-br from-(--color-primary) to-cyan-400 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:rotate-6 transition-transform">
                                                {review.user?.[0]?.toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h5 className="font-black text-(--color-secondary)">{review.user}</h5>
                                                    <CheckCircle size={14} className="text-green-500" />
                                                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">Verified Buyer</span>
                                                </div>
                                                <div className="flex text-yellow-400 scale-75 -ml-4">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={12}
                                                            className={`${
                                                                i < review.rating
                                                                    ? 'text-yellow-400 fill-yellow-400'
                                                                    : 'text-slate-200'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Calendar size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                                {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 font-medium leading-relaxed bg-slate-50 p-6 rounded-2xl italic">
                                        "{review.comment}"
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewSection;
