import { StarIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

const Hero = ({ searchQuery, theme }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = 6;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            searchQuery
          )}&maxResults=35&key=AIzaSyBcBkknfRtn_-j7uSaq-yhCe21C1a51GyU`
        );

        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        const mappedBooks =
          data.items?.map((item) => ({
            id: item.id,
            title: item.volumeInfo.title || "Untitled",
            authors: item.volumeInfo.authors?.join(", ") || "Unknown Author",
            categories: item.volumeInfo.categories?.join(", ") || "General",
            rating: item.volumeInfo.averageRating || 0,
            pageCount: item.volumeInfo.pageCount || "N/A",
            printType: item.volumeInfo.printType || "Unknown",
            ratingsCount: item.volumeInfo.ratingsCount || 0,
            imageUrl: item.volumeInfo.imageLinks?.thumbnail || "",
            description: item.volumeInfo.description || "",
            infoLink: item.volumeInfo.infoLink || "#",
          })) || [];

        let limitedBooks = mappedBooks.slice(0, 35);
        if (limitedBooks.length < 35) {
          const missingCount = 35 - limitedBooks.length;
          const dummyBooks = Array.from({ length: missingCount }, (_, i) => ({
            dummy: true,
            id: `dummy-${i}`,
          }));
          limitedBooks = [...limitedBooks, ...dummyBooks];
        }
        setBooks(limitedBooks);
      } catch (error) {
        console.log("Error fetching books ", error);
        const dummyBooks = Array.from({ length: 35 }, (_, i) => ({
          dummy: true,
          id: `dummy-${i}`,
        }));
        setBooks(dummyBooks);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchQuery]);

  const paginatedBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPlaceholder = (title) => {
    const initials = title
      .split(" ")
      .slice(0, 3)
      .map((word) => word[0]?.toUpperCase() || "")
      .join("");
    const bgColor = theme === "dark" ? "#2D3748" : "#E5E7EB";
    const textColor = theme === "dark" ? "#4A5568" : "#6B7280";

    return `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
        <rect width="100%" height="100%" fill="${bgColor}"/>
        <text x="50%" y="50%" fill="${textColor}" font-family="monospace" font-size="80"
              text-anchor="middle" dominant-baseline="middle">${initials}</text>
      </svg>`
    )}`;
  };

  const generatePageNumber = () => [1, 2, 3, 4, 5, 6];

  // Loading state
  if (loading) {
    return (
      <div
        className={`animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-6 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`h-64 md:h-96 rounded-xl md:rounded-2xl ${
              theme === "dark" ? "bg-gray-800/50" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    );
  }

  const allDummy = books.every((book) => book.dummy);
  if (allDummy) {
    return (
      <div
        className={`min-h-screen p-8 flex justify-center items-center ${
          theme === "dark"
            ? "bg-gradient-to-b from-gray-900 to-gray-800 text-cyan-300"
            : "bg-gradient-to-b from-gray-100 to-gray-50 text-cyan-600"
        }`}
      >
        <p className="text-lg md:text-xl text-center">
          No books found matching your search.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-16 md:pt-20 p-4 sm:p-6 md:p-8 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-b from-gray-100 to-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Book Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {paginatedBooks.map((book, index) => {
            if (book.dummy) {
              return (
                <div
                  key={book.id || index}
                  className={`group relative rounded-xl md:rounded-2xl flex items-center justify-center h-96 md:h-96 border-dashed ${
                    theme === "dark"
                      ? "bg-gray-800/30 border-gray-700/50"
                      : "bg-gray-200/50 border-gray-300/50"
                  }`}
                >
                  <p
                    className={`text-sm md:text-base ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    No book
                  </p>
                </div>
              );
            }
            return (
              <div
                key={book.id}
                className={`group relative rounded-xl md:rounded-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 shadow-lg ${
                  theme === "dark"
                    ? "bg-gray-800/30 border border-white/10 hover:border-cyan-400/30 hover:shadow-cyan-400/10"
                    : "bg-white border border-gray-200 hover:border-cyan-300/30 hover:shadow-cyan-300/10"
                }`}
              >
                <a
                  href={book.infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 cursor-pointer"
                  aria-label={`View ${book.title}`}
                ></a>
                <div className="p-4 md:p-6">
                  {/* Image */}
                  <div className="relative aspect-[4/5] w-full rounded-xl md:rounded-2xl overflow-hidden">
                    <img
                      src={book.imageUrl || getPlaceholder(book.title)}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) =>
                        (e.target.src = getPlaceholder(book.title))
                      }
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        theme === "dark"
                          ? "from-gray-900/80"
                          : "from-white/80 via-transparent to-transparent"
                      }`}
                    />
                    <div
                      className={`absolute bottom-0 left-0 right-0 p-2 md:p-4 bg-gradient-to-t ${
                        theme === "dark"
                          ? "from-gray-900/90"
                          : "from-white/90 to-transparent"
                      }`}
                    >
                      <span
                        className={`text-xs md:text-sm font-medium ${
                          theme === "dark"
                            ? "text-cyan-300"
                            : "text-cyan-600"
                        }`}
                      >
                        {book.printType}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-4 md:mt-6">
                    <h3
                      className={`text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${
                        theme === "dark"
                          ? "from-cyan-400 to-blue-400"
                          : "from-cyan-600 to-blue-500"
                      }`}
                    >
                      {book.title}
                    </h3>
                    <p
                      className={`mt-1 md:mt-2 text-sm md:text-base ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {book.authors}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mt-2 md:mt-3">
                      <div className="flex text-amber-400">
                        {[...Array.from({ length: 5 })].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 md:h-5 md:w-5 ${
                              i < Math.floor(book.rating)
                                ? "fill-current"
                                : "fill-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span
                        className={`ml-2 text-sm md:text-base ${
                          theme === "dark" ? "text-cyan-300" : "text-cyan-600"
                        }`}
                      >
                        {book.rating}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-2 md:gap-4 md:mt-4 text-xs md:text-sm">
                      <div className="flex items-center space-x-2">
                        <span
                          className={
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }
                        >
                          Pages:
                        </span>
                        <span
                          className={
                            theme === "dark"
                              ? "text-cyan-300"
                              : "text-cyan-600"
                          }
                        >
                          {book.pageCount}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }
                        >
                          Format:
                        </span>
                        <span
                          className={
                            theme === "dark"
                              ? "text-purple-300"
                              : "text-purple-600"
                          }
                        >
                          {book.printType}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }
                        >
                          Ratings:
                        </span>
                        <span
                          className={
                            theme === "dark"
                              ? "text-blue-300"
                              : "text-blue-600"
                          }
                        >
                          {book.ratingsCount}
                        </span>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="mt-2 md:mt-4 flex flex-wrap gap-1 md:gap-2">
                      {book.categories
                        .split(",")
                        .slice(0, 3)
                        .map((category, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs backdrop-blur-sm ${
                              theme === "dark"
                                ? "bg-gray-700/50 text-cyan-300"
                                : "bg-gray-200 text-cyan-700"
                            }`}
                          >
                            {category.trim()}
                            {index === 2 &&
                              book.categories.split(",").length > 3 && (
                                <span
                                  className={
                                    theme === "dark"
                                      ? "ml-1 text-gray-400"
                                      : "ml-1 text-gray-600"
                                  }
                                >
                                  +
                                  {book.categories.split(",").length - 3}
                                </span>
                              )}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-6 md:mt-8 flex justify-center items-center gap-3 flex-wrap">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm border transition-colors disabled:opacity-50 ${
              theme === "dark"
                ? "bg-gray-900/80 border-gray-700/50 text-cyan-300 hover:bg-gray-900/60"
                : "bg-gray-100 border-gray-300 text-cyan-700 hover:bg-gray-200"
            }`}
          >
            Previous
          </button>

          {generatePageNumber().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm ${
                page === currentPage
                  ? theme === "dark"
                    ? "bg-cyan-400/30 text-cyan-300"
                    : "bg-cyan-100 text-cyan-700"
                  : theme === "dark"
                  ? "bg-gray-900/80 text-cyan-300 hover:bg-gray-900/60"
                  : "bg-gray-100 text-cyan-700 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm border transition-colors disabled:opacity-50 ${
              theme === "dark"
                ? "bg-gray-900/80 border-gray-700/50 text-cyan-300 hover:bg-gray-900/60"
                : "bg-gray-100 border-gray-300 text-cyan-700 hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
