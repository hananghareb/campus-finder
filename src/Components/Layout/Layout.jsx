import React from 'react';
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

export default function Layout() {
  const location = useLocation();

  // نشوف إذا كنا في صفحة الشات
  const isChatPage = location.pathname === '/chat';

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      {!isChatPage && <Footer />}
    </>
  );
}
