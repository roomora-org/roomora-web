import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Spotlight } from "@/components/ui/Spotlight";
import Home from "@/pages/Home";
import About from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";



/** New page -> scroll to top. Link with #hash (e.g. /#pricing) -> scroll to that section. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const t = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      {/* One spotlight for every page */}
      <Spotlight />
      <Header />
      {/* pt-20 = fixed header height. Pages should NOT add their own top offset beyond ~pt-12. */}
      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
