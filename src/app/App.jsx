import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PageLoader from '../components/common/PageLoader';

// Lazy loaded pages
const Home = lazy(() => import('../pages/Home/Home'));
const Purifiers = lazy(() => import('../pages/Purifiers/Purifiers'));
const About = lazy(() => import('../pages/About/About'));
const Testimonials = lazy(() => import('../pages/Testimonials/Testimonials'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const ProductDetail = lazy(() => import('../pages/ProductDetail/ProductDetail'));
const Shop = lazy(() => import('../pages/Shop/Shop'));
const RentOnRO = lazy(() => import('../pages/RentOnRO/RentOnRO'));
const ROParts = lazy(() => import('../pages/ROParts/ROParts'));
const Profile = lazy(() => import('../pages/auth/Profile'));


const Orders = lazy(() => import('../pages/Orders/Orders'));
const AmcRenewals = lazy(() => import('../pages/AmcRenewals/AmcRenewals'));
const TransactionHistory = lazy(() => import('../pages/Transactions/TransactionHistory'));
const Login = lazy(() => import('../pages/auth/Login'));
const Registration = lazy(() => import('../pages/auth/Registration'));
const ReturnPolicy = lazy(() => import('../pages/Policies/ReturnPolicy'));
const ShippingPolicy = lazy(() => import('../pages/Policies/ShippingPolicy'));
const TermsOfService = lazy(() => import('../pages/Policies/TermsOfService'));
const PrivacyPolicy = lazy(() => import('../pages/Policies/PrivacyPolicy'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

const AppContent = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && <PageLoader key="loader" />}
            </AnimatePresence>
            <Suspense fallback={<PageLoader />}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="purifiers" element={<Purifiers />} />
                        <Route path="about" element={<About />} />
                        <Route path="testimonials" element={<Testimonials />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="product/:id" element={<ProductDetail />} />
                        <Route path="shop" element={<Shop />} />
                        <Route path="rent-on-ro" element={<RentOnRO />} />
                        <Route path="ro-parts" element={<ROParts />} />


                        <Route path="profile" element={<Profile />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="amc-renewals" element={<AmcRenewals />} />
                        <Route path="transactions" element={<TransactionHistory />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Registration />} />
                        <Route path="return-policy" element={<ReturnPolicy />} />
                        <Route path="shipping-policy" element={<ShippingPolicy />} />
                        <Route path="terms-of-service" element={<TermsOfService />} />
                        <Route path="privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </>
    );
};

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
