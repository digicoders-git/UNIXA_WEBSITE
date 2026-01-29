import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ScrollToTop from "../../utils/ScrollToTop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <div className="min-h-screen bg-[var(--color-surface)] font-[var(--font-body)] pt-[68px] md:pt-[74px]">
            <ScrollToTop />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Layout;
