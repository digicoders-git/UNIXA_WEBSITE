import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { 
  CheckCircle2, 
  Droplets, 
  Shield, 
  Wrench, 
  Phone, 
  ArrowRight, 
  CreditCard, 
  Calendar, 
  Clock,
  Zap,
  Star,
  RefreshCw,
  Search,
  User,
  MapPin
} from 'lucide-react';
import UnixaBrand from '../../components/common/UnixaBrand';
import Footer from '../../components/layout/Footer';
import Loader from '../../components/common/Loader';
import Swal from 'sweetalert2';

// Assets (reusing existing if possible or placeholders)
import water2 from '../../assets/images/water2.webp'; 

const RentOnRO = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('rental'); // 'rental' | 'amc' | 'renew'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); // Plan details for modal
  const [loading, setLoading] = useState(false);

  // Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    message: ''
  });

  // Rental Plans Data (Dynamic)
  const [rentalPlans, setRentalPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await api.get(`/rental-plans`);
        if (data && data.plans) {
           // Map DB structure to Frontend structure
           const mappedPlans = data.plans.filter(p => p.isActive).map(plan => ({
              id: plan._id,
              name: plan.planName,
              price: plan.price,
              billing: plan.billingCycle || 'Monthly',
              features: plan.features,
              recommended: !!plan.tag,
              tagLabel: plan.tag,
              image: plan.image?.url,
              color: plan.tag ? 'border-indigo-500 ring-4 ring-indigo-500/10' : 'border-slate-100'
           }));
           setRentalPlans(mappedPlans);
        }
      } catch (error) {
        console.error("Failed to fetch rental plans", error);
        // Fallback or empty
      }
    };
    fetchPlans();
  }, []);

  // AMC Plans Data
  const amcPlans = [
    {
      id: 'silver-amc',
      name: 'Silver AMC',
      price: '2499',
      billing: 'Yearly',
      features: ['2 Free Services', 'Filter Cleaning', 'Priority Support', 'Parts Not Included'],
      recommended: false,
      color: 'bg-slate-50 text-slate-700 border-slate-200'
    },
    {
      id: 'gold-amc',
      name: 'Gold AMC',
      price: '4499',
      billing: 'Yearly',
      features: ['3 Free Services', 'All Filters Changed Once', 'Membrane Replacement (1x)', 'Electrical Parts Covered'],
      recommended: true,
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200'
    },
    {
      id: 'platinum-amc',
      name: 'Platinum AMC',
      price: '6999',
      billing: 'Yearly',
      features: ['Unlimited Services', 'All Filters & Membrane Covered', 'All Electrical Parts Covered', '24h Breakdown Support'],
      recommended: false,
      color: 'bg-slate-900 text-slate-200 border-slate-700'
    }
  ];

  const handleBookClick = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate inputs
    if(!formData.name || !formData.phone) {
       Swal.fire('Error', 'Name and Phone are required!', 'error');
       setLoading(false);
       return;
    }

    try {
      const subject = selectedPlan ? `Booking: ${selectedPlan.name}` : 'Booking Request';
      const messageBody = `Plan: ${selectedPlan?.name}\nPrice: ${selectedPlan?.price}\nAddress: ${formData.address}\nMessage: ${formData.message}`;

      // Use existing Enquiry API to save the request
      await api.post(`/enquiry`, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: subject,
        message: messageBody
      });

      Swal.fire({
        title: 'Request Received!',
        text: 'Our team will contact you shortly to confirm your booking.',
        icon: 'success',
        confirmButtonColor: 'var(--color-primary)'
      });

      setIsModalOpen(false);
      setFormData({ name: '', phone: '', email: '', address: '', message: '' });
      setSelectedPlan(null);
    } catch (error) {
      console.error('Submission failed:', error);
      Swal.fire('Error', 'Failed to submit request. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-['Outfit',sans-serif]">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 bg-white overflow-hidden rounded-b-[60px] shadow-sm">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-blue-50/50 skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-blue-600 font-bold text-[10px] uppercase tracking-widest">Rental & AMC Services</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-tight tracking-tight">
              Smart Water <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Solutions</span>
            </h1>
            
            <p className="text-slate-500 text-lg font-medium max-w-lg leading-relaxed">
              Whether you need to <span className='text-slate-900 font-bold'>Rent a Machine</span> or <span className='text-slate-900 font-bold'>Renew AMC</span>, 
              UNIXA has you covered with flexible plans and premium service.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => { setActiveTab('rental'); document.getElementById('plans-section').scrollIntoView({ behavior: 'smooth' }); }}
                className="px-8 py-4 bg-slate-900 text-white font-bold uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-xs"
              >
                View Rental Plans
              </button>
              <button 
                onClick={() => { setActiveTab('amc'); document.getElementById('plans-section').scrollIntoView({ behavior: 'smooth' }); }}
                className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all text-xs flex items-center gap-2"
              >
                <Shield size={16} /> Explore AMC
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
               <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> 0% Maintenance</span>
               <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> Free Installation</span>
               <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> 24h Support</span>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl transform scale-90"></div>
            <img 
               src={water2} 
               alt="Smart RO" 
               className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-700"
            />
             {/* Floating Badge */}
             <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-bounce-slow">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <Shield size={20} fill="currentColor" className="opacity-20"/>
                      <Shield size={20} className="absolute"/>
                   </div>
                   <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Trusted By</p>
                      <p className="text-lg font-black text-slate-900">10k+ Families</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section id="plans-section" className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
           
           {/* Custom Tabs */}
           <div className="flex justify-center mb-16">
              <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 inline-flex">
                 {[
                    { id: 'rental', label: 'Rent a Machine', icon: Droplets },
                    { id: 'amc', label: 'Buy AMC Plan', icon: Shield },
                    { id: 'renew', label: 'Renew/Service', icon: RefreshCw }
                 ].map(tab => (
                    <button
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id)}
                       className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${
                          activeTab === tab.id 
                             ? 'bg-slate-900 text-white shadow-md' 
                             : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                       }`}
                    >
                       <tab.icon size={14} />
                       {tab.label}
                    </button>
                 ))}
              </div>
           </div>

           {/* Content for Tabs */}
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* RENTAL PLANS */}
              {activeTab === 'rental' && (
                 <div className="space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                       <h2 className="text-3xl font-black text-slate-900">Flexible Rental Plans</h2>
                       <p className="text-slate-500 font-medium">Why buy when you can rent? innovative RO purifiers with zero maintenance cost.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                       {rentalPlans.map(plan => (
                           <div key={plan.id} className={`group relative p-8 bg-white rounded-[2.5rem] border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${plan.color || 'border-slate-100'} overflow-hidden`}>
                             
                             {/* Plan Image if available */}
                             {plan.image ? (
                                <div className="mb-6 -mx-8 -mt-8 h-56 bg-slate-50 overflow-hidden relative">
                                   <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent z-10"/>
                                   <img src={plan.image} alt={plan.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                   
                                   {/* Badge over Image */}
                                   {(plan.recommended || plan.tagLabel) && (
                                      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur-md text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                         {plan.tagLabel || 'Most Popular'}
                                      </div>
                                   )}
                                </div>
                             ) : (
                                /* Existing Badge Logic if no image */
                                plan.recommended && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md z-20">
                                       {plan.tagLabel || 'Most Popular'}
                                    </div>
                                )
                             )}
                             <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider mb-2">{plan.name}</h3>
                             <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-black text-slate-900">₹{plan.price}</span>
                                <span className="text-slate-400 text-sm font-bold">/mo</span>
                             </div>
                             
                             <ul className="space-y-4 mb-8">
                                {plan.features.map((feat, i) => (
                                   <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                                      <CheckCircle2 size={16} className="shrink-0 text-green-500 mt-0.5" />
                                      {feat}
                                   </li>
                                ))}
                             </ul>

                             <button 
                                onClick={() => handleBookClick(plan)}
                                className="w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs transition-all bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-lg"
                             >
                                Rent Now <ArrowRight size={14} />
                             </button>
                          </div>
                       ))}
                    </div>
                 </div>
              )}

              {/* AMC PLANS */}
              {activeTab === 'amc' && (
                  <div className="space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                       <h2 className="text-3xl font-black text-slate-900">Annual Maintenance Contracts</h2>
                       <p className="text-slate-500 font-medium">Keep your RO running like new. Genuine parts and expert service guaranteed.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                       {amcPlans.map(plan => (
                          <div key={plan.id} className={`group relative p-8 bg-white rounded-[2.5rem] border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${plan.recommended ? 'border-yellow-500 ring-4 ring-yellow-500/10' : 'border-slate-100'}`}>
                             {plan.recommended && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
                                   Best Value
                                </div>
                             )}
                             <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider mb-2">{plan.name}</h3>
                             <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-black text-slate-900">₹{plan.price}</span>
                                <span className="text-slate-400 text-sm font-bold">/yr</span>
                             </div>
                             
                             <ul className="space-y-4 mb-8">
                                {plan.features.map((feat, i) => (
                                   <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                                      <Star size={16} className={`shrink-0 mt-0.5 ${plan.id === 'platinum-amc' ? 'text-slate-900 fill-slate-900' : 'text-yellow-500 fill-yellow-500'}`} />
                                      {feat}
                                   </li>
                                ))}
                             </ul>

                             <button 
                                onClick={() => handleBookClick(plan)}
                                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs transition-all ${
                                   plan.id === 'platinum-amc' 
                                      ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20' 
                                      : 'bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'
                                }`}
                             >
                                Choose Plan <ArrowRight size={14} />
                             </button>
                          </div>
                       ))}
                    </div>
                 </div>
              )}

              {/* RENEW / SERVICE */}
              {activeTab === 'renew' && (
                 <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                    <div className="bg-slate-900 p-8 text-center">
                       <h2 className="text-2xl font-black text-white mb-2">Renew Existing Plan</h2>
                       <p className="text-slate-400 text-sm">Enter your registered details to request a renewal or service visit.</p>
                    </div>
                    
                    <div className="p-8 md:p-12 space-y-8">
                       <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                             <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">AMC ID / Mobile Number *</label>
                                <div className="relative">
                                   <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                   <input 
                                      type="text" 
                                      placeholder="Ex: AMC-2024-001" 
                                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                                      onChange={(e) => setFormData({...formData, message: e.target.value})} // Using message field for ID temporarily
                                   />
                                </div>
                             </div>
                             <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                <h4 className="font-bold text-blue-800 text-sm mb-2 flex items-center gap-2"><Zap size={16}/> Instant Renewal</h4>
                                <p className="text-xs text-blue-600/80 leading-relaxed">
                                   Our system will verify your ID and sending a payment link to your registered mobile number within 5 minutes.
                                </p>
                             </div>
                          </div>
                          
                          <div className="flex flex-col justify-center space-y-4 border-l border-slate-100 pl-0 md:pl-8">
                             <button 
                                onClick={() => handleBookClick({ name: 'AMC Renewal Check', price: 'TBD' })}
                                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                             >
                                Verify & Renew <ArrowRight size={16}/>
                             </button>
                             <button 
                                onClick={() => navigate('/contact')}
                                className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all"
                             >
                                Contact Support
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>
              )}

           </div>
        </div>
      </section>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide">Confirm Request</h3>
                    <p className="text-xs text-slate-500 font-bold mt-1">
                       {selectedPlan?.name} {selectedPlan?.price !== 'TBD' && `• ₹${selectedPlan?.price}`}
                    </p>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900">
                    <span className="text-xl font-bold">×</span>
                 </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                 <div className="space-y-4">
                    <div>
                       <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
                       <div className="relative">
                          <User className="absolute left-4 top-3 text-slate-400" size={16} />
                          <input 
                             name="name" type="text" required 
                             value={formData.name} onChange={handleInputChange}
                             className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-700 text-sm"
                             placeholder="John Doe" 
                          />
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Phone</label>
                          <div className="relative">
                             <Phone className="absolute left-4 top-3 text-slate-400" size={16} />
                             <input 
                                name="phone" type="tel" required 
                                value={formData.phone} onChange={handleInputChange}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-700 text-sm"
                                placeholder="9876543210" 
                             />
                          </div>
                       </div>
                       <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">State/City</label>
                          <div className="relative">
                             <MapPin className="absolute left-4 top-3 text-slate-400" size={16} />
                             <input 
                                name="address" type="text"
                                value={formData.address} onChange={handleInputChange}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-700 text-sm"
                                placeholder="Mumbai" 
                             />
                          </div>
                       </div>
                    </div>

                    <div>
                       <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Message (Optional)</label>
                       <textarea 
                          name="message" rows="2"
                          value={formData.message} onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-700 text-sm resize-none"
                          placeholder="Any specific requirements..." 
                       />
                    </div>
                 </div>

                 <button 
                    type="submit" disabled={loading}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all flex justify-center items-center gap-2 shadow-xl shadow-slate-900/10"
                 >
                    {loading ? <Loader size="sm" color="white" /> : 'Submit Request'}
                 </button>
              </form>
           </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default RentOnRO;
