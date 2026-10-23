import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Spotlight } from "@/components/ui/Spotlight";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Spotlight />
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}