
import Footer from "./Footer";
import { Outlet } from "react-router";
import Navbar from "./navbar";
import ScrollToTop from "./ScrollToTop";




const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
{/* Scroll to top  */}
    <ScrollToTop/>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet/>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Layout;