import React, { useEffect, useState } from "react";
import { BookOpenIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import FloatingParticle from "./FloatingParticle";

const Navbar = ({ handleSearch, theme, toggleTheme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  // Gradient follow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll(".dynamic-gradient");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-colors duration-500 backdrop-blur-2xl border-b shadow-[0_0_60px_-15px_rgba(96,165,250,0.3)]
      ${
        theme === "dark"
          ? "bg-gray-900/95 border-gray-800 text-gray-100"
          : "bg-gray-100/95 border-gray-300 text-gray-900"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="flex min-h-[4rem] md:min-h-[5rem] items-center justify-between flex-wrap
          gap-y-3 gap-x-4 py-2"
        >
          {/* LOGO SECTION */}
          <div
            className="dynamic-gradient relative overflow-hidden rounded-2xl p-1
            hover:scale-105 transition-transform duration-300 order-1 md:order-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              "--mouse-x": "0px",
              "--mouse-y": "0px",
              background: isHovered
                ? `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y),
                    rgba(59,130,246,0.4), transparent 40%)`
                : "transparent",
            }}
          >
            <div
              className={`backdrop-blur-sm rounded-xl p-2 transition-colors duration-500
              ${
                theme === "dark"
                  ? "bg-gray-900/80"
                  : "bg-gray-200/60"
              }`}
            >
              <h1
                className="text-lg md:text-2xl font-bold bg-gradient-to-r from-cyan-500
                via-blue-500 to-purple-500 bg-clip-text text-transparent animate-text-shine"
              >
                <BookOpenIcon
                  className="h-5 w-5 md:h-6 md:w-6 inline-block
                  animate-float text-cyan-500 dark:text-cyan-400 mr-1 md:mr-2 stroke-[2.5]"
                />
                <a
                  href="/"
                  className="ml-1 md:ml-2 text-shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                >
                  BOOK FINDER
                </a>
              </h1>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="w-full md:flex-1 md:max-w-2xl order-3 md:order-2 lg:ml-6 md:mx-4">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="relative group">
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500
                  rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500
                  animate-pulse-slow"
                />
                <div className="relative dynamic-gradient">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 md:pl-4">
                    <MagnifyingGlassIcon className="h-5 w-5 md:h-6 text-cyan-400 drop-shadow-glow z-10" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Discover your next read..."
                    className={`block w-full rounded-2xl border py-2 md:py-3 pl-10 md:pl-12 pr-4 md:pr-6
                    text-sm md:text-base backdrop-blur-xl shadow-xl transition-all duration-300
                    ${
                      theme === "dark"
                        ? "border-gray-700/50 bg-gray-900/60 text-gray-100 placeholder-gray-300 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-300/30"
                        : "border-gray-300 bg-gray-100/80 text-gray-800 placeholder-gray-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-300/30"
                    }`}
                  />
                </div>
              </div>
            </form>
          </div>

          {/* AVATAR + THEME TOGGLE */}
          <div className="flex items-center space-x-4 order-2 md:order-3 ml-auto md:ml-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`relative p-2 rounded-full border transition-transform duration-300 shadow-md hover:scale-105
              ${
                theme === "dark"
                  ? "border-gray-600/60 bg-gray-800/70"
                  : "border-gray-400/60 bg-gray-200/70"
              }`}
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <span className="text-yellow-300 text-lg">☀️</span>
              ) : (
                <span className="text-gray-700 text-lg">🌙</span>
              )}
            </button>

            {/* Avatar */}
            <button className="relative p-1 group hover:scale-105 transition-transform">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity" />
              <div
                className={`relative flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full border-2 backdrop-blur-sm overflow-hidden transition-colors
                ${
                  theme === "dark"
                    ? "bg-gray-900 border-cyan-300/20 group-hover:border-cyan-300/40"
                    : "bg-gray-200 border-cyan-300/30 group-hover:border-cyan-300/50"
                }`}
              >
                <span className="text-lg md:text-xl animate-holo">👾</span>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-blue-500/20" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <FloatingParticle />
    </nav>
  );
};

export default Navbar;
