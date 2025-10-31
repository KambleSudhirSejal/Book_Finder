import React from "react";

const Banner = ({ theme }) => {
  return (
    <section
      className={`relative w-full overflow-hidden py-10 md:py-16
      transition-colors duration-700
      ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-200"
      }`}
    >
      {/* Floating gradient glow */}
      <div
        className={`absolute -top-20 -left-20 w-60 h-60 rounded-full blur-3xl ${
          theme === "dark"
            ? "bg-cyan-500/20"
            : "bg-cyan-400/30"
        }`}
      ></div>
      <div
        className={`absolute top-40 right-10 w-72 h-72 rounded-full blur-3xl ${
          theme === "dark"
            ? "bg-blue-500/20"
            : "bg-purple-400/20"
        }`}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center text-center space-y-6">
        <h1
          className={`text-3xl md:text-5xl font-extrabold bg-gradient-to-r 
          ${
            theme === "dark"
              ? "from-cyan-400 via-blue-400 to-purple-400"
              : "from-cyan-600 via-blue-600 to-purple-600"
          } bg-clip-text text-transparent animate-text-shine`}
        >
          Discover Your Next Great Read 📚
        </h1>

        <p
          className={`max-w-2xl text-base md:text-lg leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Explore bestsellers, trending titles, and hidden gems — all in one
          place. Let curiosity be your guide to a world of stories.
        </p>

        <div className="mt-4 flex space-x-4">
          <a
            href="#explore"
            className="px-5 py-2.5 rounded-full font-semibold text-sm md:text-base
            text-white bg-gradient-to-r from-cyan-500 to-blue-600
            shadow-lg hover:shadow-cyan-500/30 hover:scale-105
            transition-all duration-300"
          >
            Explore Books
          </a>

          <a
            href="#trending"
            className={`px-5 py-2.5 rounded-full font-semibold text-sm md:text-base border transition-all duration-300 ${
              theme === "dark"
                ? "border-gray-600 text-gray-200 hover:bg-gray-800/60"
                : "border-gray-400 text-gray-800 hover:bg-gray-200/60"
            }`}
          >
            View Trending
          </a>
        </div>
      </div>

      {/* Bottom soft gradient overlay */}
      <div
        className={`absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t to-transparent ${
          theme === "dark" ? "from-gray-800" : "from-gray-200"
        }`}
      ></div>
    </section>
  );
};

export default Banner;
