import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Loader from '../components/common/Loader';

// Lazy loaded pages
const Home = lazy(() => import('../pages/Home/Home'));
const Purifiers = lazy(() => import('../pages/Purifiers/Purifiers'));
const About = lazy(() => import('../pages/About/About'));
const Testimonials = lazy(() => import('../pages/Testimonials/Testimonials'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const ProductDetail = lazy(() => import('../pages/ProductDetail/ProductDetail'));
const Shop = lazy(() => import('../pages/Shop/Shop'));
const Profile = lazy(() => import('../pages/auth/Profile'));
const Orders = lazy(() => import('../pages/Orders/Orders'));
const AmcRenewals = lazy(() => import('../pages/AmcRenewals/AmcRenewals'));
const TransactionHistory = lazy(() => import('../pages/Transactions/TransactionHistory'));
const Login = lazy(() => import('../pages/auth/Login'));
const Registration = lazy(() => import('../pages/auth/Registration'));
const ReturnPolicy = lazy(() => import('../pages/Policies/ReturnPolicy'));
const ShippingPolicy = lazy(() => import('../pages/Policies/ShippingPolicy'));
const TermsOfService = lazy(() => import('../pages/Policies/TermsOfService'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

function App() {
    return (
        <Router>
            <Suspense fallback={
                <div className="h-screen w-screen flex items-center justify-center bg-white">
                    <Loader text="Loading Experience..." />
                </div>
            }>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="purifiers" element={<Purifiers />} />
                        <Route path="about" element={<About />} />
                        <Route path="testimonials" element={<Testimonials />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="product/:id" element={<ProductDetail />} />
                        <Route path="shop" element={<Shop />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="amc-renewals" element={<AmcRenewals />} />
                        <Route path="transactions" element={<TransactionHistory />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Registration />} />
                        <Route path="return-policy" element={<ReturnPolicy />} />
                        <Route path="shipping-policy" element={<ShippingPolicy />} />
                        <Route path="terms-of-service" element={<TermsOfService />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
