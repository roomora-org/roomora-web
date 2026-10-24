import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

// No bg-* on this wrapper: the body's dotted background must stay visible.
// No <Spotlight />: it is mounted once in App.tsx.
export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
