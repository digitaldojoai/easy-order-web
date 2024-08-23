import React, {useState,useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Helmet, HelmetProvider } from "react-helmet-async";
function DefaultLayout({ title, children }) {
    const [mobile, setMobile] = useState(false);
    const [sidebarVisibility, setSidebarVisibility] = useState(false);
    useEffect(() => {
        const handleMobile = () => {
            if (window.innerWidth < 1280) {
                setMobile(true);
            } else {
                setMobile(false);
                setSidebarVisibility(false);
            }
        }
    
        handleMobile();
        window.addEventListener('resize', handleMobile);
        return () => {
            window.removeEventListener('resize', handleMobile);
        };
    }, []);
    return (
        <HelmetProvider>
            <Helmet>
                <title>{`${title ? title + " - " : '' }Scribbler.AI - AI Content Generator Dashboard and User App React Template`}</title>
            </Helmet>
            <div className="flex 2xl:ps-64">
                <Sidebar mobile={mobile} visibility={sidebarVisibility} setVisibility={setSidebarVisibility} />
                <div className="flex flex-col min-h-screen flex-grow overflow-x-hidden max-w-full pt-16">
                    <Header sidebarVisibility={sidebarVisibility} setSidebarVisibility={setSidebarVisibility} />
                    {children}
                    <Footer />
                </div>
            </div>
        </HelmetProvider>
    );
}

export default DefaultLayout;
