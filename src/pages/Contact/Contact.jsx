import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import Footer from '../../components/layout/Footer';
import { createEnquiryApi } from '../../api/enquiry';
import { toast } from 'react-toastify';

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
            await createEnquiryApi(formData);
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
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: `var(--color-surface)`, color: `var(--color-text)`, fontFamily: `var(--font-body)` }} className="min-h-screen -mt-12">
            {/* Contact Hero with Bubbles */}
            <section className="relative py-8 md:py-12 px-4 md:px-8 lg:px-24 text-center overflow-hidden rounded-b-[40px] md:rounded-b-[100px]" style={{ background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)` }}>
                {/* Animated Background Bubbles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="contact-bubble contact-bubble-1"></div>
                    <div className="contact-bubble contact-bubble-2"></div>
                    <div className="contact-bubble contact-bubble-3"></div>
                    <div className="contact-bubble contact-bubble-4"></div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                        .contact-bubble {
                            position: absolute;
                            background: rgba(248, 250, 252, 0.15);
                            border-radius: 50%;
                            animation: float-contact-bubble 21s infinite ease-in-out;
                        }
                        .contact-bubble-1 {
                            width: 115px;
                            height: 115px;
                            left: 12%;
                            top: 22%;
                            animation-delay: 0s;
                        }
                        .contact-bubble-2 {
                            width: 145px;
                            height: 145px;
                            right: 18%;
                            top: 28%;
                            animation-delay: 3.5s;
                        }
                        .contact-bubble-3 {
                            width: 98px;
                            height: 98px;
                            left: 65%;
                            bottom: 22%;
                            animation-delay: 5s;
                        }
                        .contact-bubble-4 {
                            width: 125px;
                            height: 125px;
                            right: 55%;
                            bottom: 28%;
                            animation-delay: 1.5s;
                        }
                        @keyframes float-contact-bubble {
                            0%, 100% {
                                transform: translate(0, 0) scale(1);
                                opacity: 0.4;
                            }
                            50% {
                                transform: translate(28px, -38px) scale(1.09);
                                opacity: 0.6;
                            }
                        }
                    `
                }} />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4" style={{ color: `var(--color-surface)`, fontFamily: `var(--font-heading)` }}>Get In Touch</h1>
                    <p className="text-base md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed font-medium" style={{ color: `var(--color-surface)` }}>
                        Have questions about UNIXA water purifiers? We're here to help!
                    </p>
                </div>
            </section>

            <section className="py-12 md:py-20 px-4 md:px-8 lg:px-24 -mt-6 md:-mt-12 z-20 relative">
                <div className="flex flex-col lg:flex-row gap-8 md:gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div ref={addToRefs} className="scroll-section flex-1 p-6 md:p-12 rounded-[40px] shadow-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 lg:mb-10" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>Contact Information</h2>

                        <div className="space-y-6 md:space-y-8">
                            <div className="flex items-start gap-3 md:gap-6">
                                <div className="p-2 md:p-4 rounded-2xl flex-shrink-0" style={{ backgroundColor: `var(--color-primary)`, color: `var(--color-surface)` }}>
                                    <Mail size={18} className="md:w-6 md:h-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-bold text-sm md:text-base" style={{ color: `var(--color-primary)` }}>Email Us</h4>
                                    <a href="mailto:info@unixa.com" className="text-xs md:text-sm break-all transition-colors" style={{ color: `var(--color-text-muted)` }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>info@unixa.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 md:gap-6">
                                <div className="p-2 md:p-4 rounded-2xl flex-shrink-0" style={{ backgroundColor: `var(--color-primary)`, color: `var(--color-surface)` }}>
                                    <Phone size={18} className="md:w-6 md:h-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-bold text-sm md:text-base" style={{ color: `var(--color-primary)` }}>Call Us</h4>
                                    <div className="text-xs md:text-sm">
                                        <a href="tel:+911800123456" className="transition-colors inline-block" style={{ color: `var(--color-text-muted)` }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>+91 1800-123-456</a>
                                        <span style={{ color: `var(--color-text-muted)`, opacity: 0.5 }}>, </span>
                                        <a href="tel:+919876543210" className="transition-colors inline-block" style={{ color: `var(--color-text-muted)` }} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>+91 9876543210</a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 md:gap-6">
                                <div className="p-2 md:p-4 rounded-2xl flex-shrink-0" style={{ backgroundColor: `var(--color-primary)`, color: `var(--color-surface)` }}>
                                    <MapPin size={18} className="md:w-6 md:h-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-bold text-sm md:text-base" style={{ color: `var(--color-primary)` }}>Visit Us</h4>
                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=UNIXA+Water+Purifiers"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline decoration-dotted underline-offset-4 text-xs md:text-sm break-words transition-colors"
                                        style={{ color: `var(--color-text-muted)` }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
                                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
                                    >
                                        UNIXA Head Office, Industrial Area, New Delhi, India
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 md:mt-12 pt-8 md:pt-12 text-xs md:text-sm italic" style={{ borderTop: `1px solid var(--color-border)`, color: `var(--color-text-muted)` }}>
                            "Pure water, pure life - UNIXA's commitment to your health."
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div ref={addToRefs} className="scroll-section flex-[1.5] p-6 md:p-12 rounded-[40px] shadow-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-10" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>Send a Message</h2>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider" style={{ color: `var(--color-text-muted)` }}>Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        className="w-full px-6 py-4 rounded-xl outline-none border transition-all placeholder-gray-400"
                                        style={{
                                            backgroundColor: `var(--color-surface)`,
                                            color: `var(--color-text)`,
                                            borderColor: errors.name ? '#ef4444' : `var(--color-border)`,
                                            ...(errors.name ? {} : { ':focus': { borderColor: `var(--color-primary)` } })
                                        }}
                                        onFocus={(e) => !errors.name && (e.target.style.borderColor = 'var(--color-primary)')}
                                        onBlur={(e) => !errors.name && (e.target.style.borderColor = 'var(--color-border)')}
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider" style={{ color: `var(--color-text-muted)` }}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Your Email"
                                        className="w-full px-6 py-4 rounded-xl outline-none border transition-all placeholder-gray-400"
                                        style={{
                                            backgroundColor: `var(--color-surface)`,
                                            color: `var(--color-text)`,
                                            borderColor: errors.email ? '#ef4444' : `var(--color-border)`
                                        }}
                                        onFocus={(e) => !errors.email && (e.target.style.borderColor = 'var(--color-primary)')}
                                        onBlur={(e) => !errors.email && (e.target.style.borderColor = 'var(--color-border)')}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider" style={{ color: `var(--color-text-muted)` }}>Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Your Phone Number"
                                        className="w-full px-6 py-4 rounded-xl outline-none border transition-all placeholder-gray-400"
                                        style={{
                                            backgroundColor: `var(--color-surface)`,
                                            color: `var(--color-text)`,
                                            borderColor: errors.phone ? '#ef4444' : `var(--color-border)`
                                        }}
                                        onFocus={(e) => !errors.phone && (e.target.style.borderColor = 'var(--color-primary)')}
                                        onBlur={(e) => !errors.phone && (e.target.style.borderColor = 'var(--color-border)')}
                                        required
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider" style={{ color: `var(--color-text-muted)` }}>Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Product Inquiry / Support"
                                        className="w-full px-6 py-4 rounded-xl outline-none border transition-all placeholder-gray-400"
                                        style={{
                                            backgroundColor: `var(--color-surface)`,
                                            color: `var(--color-text)`,
                                            borderColor: `var(--color-border)`
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider" style={{ color: `var(--color-text-muted)` }}>Your Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your water purification needs..."
                                    rows="5"
                                    className="w-full px-6 py-4 rounded-xl outline-none border transition-all resize-none placeholder-gray-400"
                                    style={{
                                        backgroundColor: `var(--color-surface)`,
                                        color: `var(--color-text)`,
                                        borderColor: errors.message ? '#ef4444' : `var(--color-border)`
                                    }}
                                    onFocus={(e) => !errors.message && (e.target.style.borderColor = 'var(--color-primary)')}
                                    onBlur={(e) => !errors.message && (e.target.style.borderColor = 'var(--color-border)')}
                                    required
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                style={{
                                    backgroundColor: `var(--color-accent)`,
                                    color: `var(--color-surface)`,
                                    boxShadow: `0 4px 15px rgba(132, 204, 22, 0.3)`
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading) {
                                        e.target.style.boxShadow = '0 6px 20px rgba(132, 204, 22, 0.4)';
                                        e.target.style.backgroundColor = '#65a30d';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!loading) {
                                        e.target.style.boxShadow = '0 4px 15px rgba(132, 204, 22, 0.3)';
                                        e.target.style.backgroundColor = 'var(--color-accent)';
                                    }
                                }}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Sending...
                                    </>
                                ) : "Send Message"}
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
