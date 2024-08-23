import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

function DefaultLayout({ title, children, className }) {
  const [mobile, setMobile] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState(false);

  useEffect(() => {
    const handleMobile = () => {
      if (window.innerWidth < 1140) {
        setTimeout(setMobile(true), 3000);
      } else {
        setMobile(false);
        setMenuVisibility(false);
      }
    };

    handleMobile();
    window.addEventListener("resize", handleMobile);
    return () => {
      window.removeEventListener("resize", handleMobile);
    };
  }, []);
  return (
    <HelmetProvider>
      <Helmet>
        <title>{`${
          title ? title + " - " : ""
        }Scribbler.AI - AI Content Generator Dashboard and User App React Template`}</title>
      </Helmet>
      <div
        className={`flex min-h-screen max-w-full flex-col overflow-x-hidden pt-16 ${className}`}
      >
        <Header
          mobile={mobile}
          visibility={menuVisibility}
          setVisibility={setMenuVisibility}
        />
        {children}
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default DefaultLayout;
