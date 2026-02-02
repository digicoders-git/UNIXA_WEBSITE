import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Loader2, Droplets, ArrowRight } from 'lucide-react';
import Footer from '../../components/layout/Footer';
// Removed API import for local system
// import { createEnquiryApi } from '../../api/enquiry';
import { toast } from 'react-toastify';
import UnixaBrand from '../../components/common/UnixaBrand';

const Contact = () => {
    const sectionRefs = useRef([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const addToRefs = (el) => {
        if (el && !sectionRefs.current.includes(el)) {
            sectionRefs.current.push(el);
        }
    };

    const [errors, setErrors] = useState({});

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
            // Only allow numbers and limit to 10 digits
            const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 10);
            setFormData({ ...formData, [name]: numbersOnly });
        } else if (name === 'name') {
            // Only allow letters and spaces in name field
            const lettersOnly = value.replace(/[^a-zA-Z\s]/g, '');
            setFormData({ ...formData, [name]: lettersOnly });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        // Clear error when user starts typing
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
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            await axios.post(`${apiUrl}/enquiry`, formData);

            toast.success("Thank you! Your message has been sent.");
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setErrors({});
        } catch (error) {
            console.error("Enquiry submission failed:", error);
            const errorMsg = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-body)] overflow-x-hidden">

            {/* Hero Section - Professional with Bubbles */}
            <section className="relative pt-20 pb-12 md:pt-28 md:pb-16 px-6 text-center bg-slate-50 border-b border-slate-200 rounded-b-[40px] md:rounded-b-[80px] overflow-hidden">
                {/* High Visibility Water Bubbles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-blue-300/40 border border-white/40 blur-[0.5px] animate-float-bubble"
                            style={{
                                width: `${Math.random() * 40 + 10}px`,
                                height: `${Math.random() * 40 + 10}px`,
                                left: `${Math.random() * 100}%`,
                                bottom: `-${Math.random() * 20 + 10}%`,
                                animationDuration: `${Math.random() * 4 + 5}s`,
                                animationDelay: `${Math.random() * 5}s`
                            }}
                        />
                    ))}
                </div>

                <style>{`
                    @keyframes float-bubble {
                        0% { transform: translateY(0) scale(1); opacity: 0; }
                        20% { opacity: 0.4; }
                        80% { opacity: 0.4; }
                        100% { transform: translateY(-120vh) scale(1.5); opacity: 0; }
                    }
                    .animate-float-bubble {
                        animation: float-bubble linear infinite;
                    }
                `}</style>

                <div className="relative z-10 max-w-4xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full mx-auto shadow-sm">
                        <Phone size={16} className="text-[var(--color-primary)]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            Support Desk
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
                        Contact <span className="text-[var(--color-primary)]">Us</span>
                    </h1>

                    <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                        Have questions about our water purifiers? Reach out to our team of experts for professional assistance.
                    </p>
                </div>
            </section>

            <section className="py-12 md:py-16 px-4 md:px-8 lg:px-24 bg-white">
                <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
                    {/* Contact Info */}
                    <div ref={addToRefs} className="flex-1 space-y-6">
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Reach <span className="text-[var(--color-primary)]">Us</span></h2>
                                <p className="text-slate-500 text-sm font-medium">Use any of the following channels to connect with us.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[var(--color-primary)]">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm">Email</h4>
                                        <a href="mailto:info@unixa.com" className="text-slate-500 text-sm font-medium hover:text-[var(--color-primary)] transition-colors">info@unixa.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[var(--color-primary)]">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm">Phone</h4>
                                        <div className="flex flex-col text-slate-500 text-sm font-medium">
                                            <a href="tel:+911800123456" className="hover:text-[var(--color-primary)] transition-colors">+91 1800-123-456</a>
                                            <a href="tel:+919876543210" className="hover:text-[var(--color-primary)] transition-colors">+91 9876543210</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[var(--color-primary)]">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm">Location</h4>
                                        <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="text-slate-500 text-sm font-medium hover:text-[var(--color-primary)] leading-relaxed block">
                                            UNIXA Head Office, Industrial Area, <br />New Delhi, India
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Contact Form */}
                    <div ref={addToRefs} className="flex-[1.5] p-8 md:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm">
                        <div className="space-y-2 mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Send a <span className="text-[var(--color-primary)]">Message</span></h2>
                            <p className="text-slate-500 text-sm font-medium">We'll get back to you as soon as possible.</p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-600 ml-1">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Ricky Singh"
                                        className="w-full px-5 py-3 rounded-xl outline-none border border-slate-200 bg-white focus:border-[var(--color-primary)] transition-all"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.name}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-600 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="ricky@example.com"
                                        className="w-full px-5 py-3 rounded-xl outline-none border border-slate-200 bg-white focus:border-[var(--color-primary)] transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-600 ml-1">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="9876543210"
                                        className="w-full px-5 py-3 rounded-xl outline-none border border-slate-200 bg-white focus:border-[var(--color-primary)] transition-all"
                                        required
                                    />
                                    {errors.phone && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.phone}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-600 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Inquiry Topic"
                                        className="w-full px-5 py-3 rounded-xl outline-none border border-slate-200 bg-white focus:border-[var(--color-primary)] transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-600 ml-1">Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us how we can help..."
                                    rows="4"
                                    className="w-full px-5 py-3 rounded-xl outline-none border border-slate-200 bg-white focus:border-[var(--color-primary)] transition-all resize-none"
                                    required
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.message}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all bg-[var(--color-primary)] text-white hover:bg-slate-900 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
