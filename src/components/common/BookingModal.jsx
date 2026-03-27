import React, { useState, useEffect, useRef } from 'react';
import { X, User, Phone, MapPin, ArrowRight, Package, CheckCircle2, Loader } from 'lucide-react';
import api from '../../services/api';
import Swal from 'sweetalert2';

const BookingModal = ({ isOpen, onClose, item, type = 'product' }) => {
  const [form, setForm] = useState({ name: '', phone: '', address: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [fetchingOrders, setFetchingOrders] = useState(false);
  const phoneTimer = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setForm({ name: '', phone: '', address: '', message: '' });
      setOrders([]);
      setSelectedProduct(null);
    }
  }, [isOpen]);

  // Fetch delivered orders when phone is 10 digits
  const handlePhoneChange = (val) => {
    setForm(p => ({ ...p, phone: val }));
    clearTimeout(phoneTimer.current);
    const digits = val.replace(/\D/g, '');
    if (digits.length === 10 && type === 'amc') {
      phoneTimer.current = setTimeout(async () => {
        setFetchingOrders(true);
        try {
          const { data } = await api.get(`/amc-enquiries/orders-by-phone/${digits}`);
          setOrders(data.orders || []);
          // Auto-fill name from first order
          if (data.orders?.[0]?.shippingAddress?.name && !form.name) {
            setForm(p => ({ ...p, name: data.orders[0].shippingAddress.name, address: data.orders[0].shippingAddress.city || '' }));
          }
        } catch {
          setOrders([]);
        } finally {
          setFetchingOrders(false);
        }
      }, 600);
    } else {
      setOrders([]);
      setSelectedProduct(null);
    }
  };

  if (!isOpen || !item) return null;

  const typeLabel = { product: 'Product', part: 'RO Part', rent: 'Rental', amc: 'AMC Plan' }[type] || 'Item';

  // Flatten all products from all orders
  const allProducts = orders.flatMap(order =>
    order.items.map(item => ({
      productId: item.product,
      productName: item.productName,
      orderId: order._id,
      orderDate: order.createdAt,
      deliveredAt: order.deliveredAt,
      address: order.shippingAddress,
      status: order.status,
    }))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      Swal.fire('Error', 'Name and Phone are required!', 'error');
      return;
    }
    setLoading(true);
    try {
      if (type === 'amc') {
        await api.post('/amc-enquiries/guest', {
          name: form.name,
          phone: form.phone,
          address: form.address,
          amcPlanName: item.name || 'AMC Plan',
          amcPlanId: item.id || item._id || null,
          price: Number(item.price) || 0,
          productName: selectedProduct?.productName || '',
          productId: selectedProduct?.productId || null,
          notes: `${form.message}${selectedProduct ? `\nProduct: ${selectedProduct.productName}\nOrder Date: ${new Date(selectedProduct.orderDate).toLocaleDateString('en-IN')}\nDelivered: ${selectedProduct.deliveredAt ? new Date(selectedProduct.deliveredAt).toLocaleDateString('en-IN') : 'N/A'}\nAddress: ${selectedProduct.address?.addressLine1}, ${selectedProduct.address?.city}, ${selectedProduct.address?.state} - ${selectedProduct.address?.pincode}` : ''}`,
          source: 'website',
        });
      } else {
        await api.post('/enquiry', {
          name: form.name,
          phone: form.phone,
          subject: `Book Now: ${item.name}`,
          message: `Type: ${typeLabel}\nItem: ${item.name}\nPrice: ₹${item.price || item.finalPrice || ''}\nAddress: ${form.address}\nNote: ${form.message}`,
        });
      }
      Swal.fire({ title: 'Request Sent!', text: 'Our team will contact you shortly.', icon: 'success', confirmButtonColor: 'var(--color-primary)' });
      onClose();
    } catch {
      Swal.fire('Error', 'Failed to submit. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{typeLabel} Booking</p>
            <h2 className="text-lg font-black text-slate-900 leading-tight line-clamp-1">{item.name}</h2>
            {(item.finalPrice || item.price) > 0 && (
              <p className="text-sm font-black text-[var(--color-primary)] mt-0.5">₹{(item.finalPrice || item.price)?.toLocaleString()}</p>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Phone first for AMC */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="tel" required placeholder="Phone Number"
              value={form.phone} onChange={e => handlePhoneChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
            {fetchingOrders && <Loader size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 animate-spin" />}
          </div>

          {/* Delivered Orders / Product Selection for AMC */}
          {type === 'amc' && (
            <div>
              {fetchingOrders ? (
                <div className="text-xs text-slate-400 font-bold text-center py-2">Fetching your orders...</div>
              ) : allProducts.length > 0 ? (
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Select Product for AMC</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {allProducts.map((p, i) => (
                      <button key={i} type="button"
                        onClick={() => setSelectedProduct(selectedProduct?.productId === p.productId ? null : p)}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${selectedProduct?.productId === p.productId ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-slate-300'}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Package size={14} className="text-slate-400 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-black text-sm text-slate-800">{p.productName}</p>
                              <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                                Ordered: {new Date(p.orderDate).toLocaleDateString('en-IN')}
                                {p.deliveredAt && ` · Delivered: ${new Date(p.deliveredAt).toLocaleDateString('en-IN')}`}
                              </p>
                              <p className="text-[10px] text-slate-400 font-bold">{p.address?.city}, {p.address?.state}</p>
                            </div>
                          </div>
                          {selectedProduct?.productId === p.productId && <CheckCircle2 size={16} className="text-blue-500 shrink-0" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : form.phone.replace(/\D/g, '').length === 10 ? (
                <div className="text-xs text-slate-400 font-bold text-center py-2 bg-slate-50 rounded-xl border border-slate-100">
                  No delivered orders found for this number
                </div>
              ) : null}
            </div>
          )}

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text" required placeholder="Full Name"
              value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text" placeholder="City / Locality"
              value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>

          <textarea
            rows={2} placeholder="Any specific requirement or timing..."
            value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none"
          />

          {/* Selected product summary */}
          {selectedProduct && (
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 text-xs font-bold text-blue-700">
              ✅ {selectedProduct.productName} selected for AMC
            </div>
          )}

          <button
            type="submit" disabled={loading}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[var(--color-primary)] transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60"
          >
            {loading ? 'Submitting...' : <><span>Confirm Booking</span><ArrowRight size={14} /></>}
          </button>
          <p className="text-center text-[10px] text-slate-400 font-bold">Our team will call you within 30 minutes</p>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
