import React from 'react'
import FloatingParticle from './FloatingParticle'
import { BookOpenIcon, CommandLineIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { Github, Instagram, MessageSquare, Twitter } from 'lucide-react';

const Footer = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <footer
      className={`relative transition-colors duration-500 border-t
      ${isDark
        ? 'bg-gradient-to-b from-gray-900 to-gray-900/95 border-gray-800 text-gray-300'
        : 'bg-gradient-to-b from-gray-100 to-gray-200 border-gray-300 text-gray-700'
      }`}
    >
      {/* FLOATING PARTICLE */}
      <FloatingParticle />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* LOGO SECTION */}
          <div className="space-y-6 text-center sm:text-left">
            <div className="flex justify-center sm:justify-start items-center space-x-2">
              <BookOpenIcon className={`h-8 w-8 ${isDark ? 'text-cyan-400' : 'text-blue-500'}`} />
              <span
                className={`text-2xl font-bold bg-gradient-to-r 
                  ${isDark ? 'from-cyan-400 to-blue-400' : 'from-blue-600 to-indigo-500'}
                  bg-clip-text text-transparent`}
              >
                BOOK FINDER
              </span>
            </div>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Your gateway to infinite worlds. Discover, read, and escape into stories that matter.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-4 text-center sm:text-left">
            <h3
              className={`text-lg font-semibold bg-gradient-to-r 
                ${isDark ? 'from-purple-400 to-blue-400' : 'from-indigo-600 to-blue-500'}
                bg-clip-text text-transparent`}
            >
              Explore
            </h3>
            <ul className="space-y-3">
              {["Trending", "New Release", "Genres", "Authors"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`text-sm flex items-center justify-center sm:justify-start group 
                      transition-colors 
                      ${isDark ? 'text-gray-400 hover:text-cyan-300' : 'text-gray-600 hover:text-blue-600'}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity
                        ${isDark ? 'bg-cyan-400' : 'bg-blue-500'}`}
                    />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* TECH STACK */}
          <div className="space-y-4 text-center sm:text-left">
            <h3
              className={`text-lg font-semibold bg-gradient-to-r 
                ${isDark ? 'from-purple-400 to-blue-400' : 'from-indigo-600 to-blue-500'}
                bg-clip-text text-transparent`}
            >
              Powered By
            </h3>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              {["React", "Tailwind", "Vite", "GoogleAPI"].map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1.5 rounded-full text-sm cursor-pointer backdrop-blur-sm transition-all
                    ${isDark
                      ? 'bg-gray-800/50 text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-300'
                      : 'bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-600'}`}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <div
                className={`flex items-center justify-center sm:justify-start space-x-2
                ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
              >
                <CommandLineIcon className="h-5 w-5" />
                <span className="text-sm">Developer Friendly API</span>
              </div>
              <div
                className={`flex items-center justify-center sm:justify-start space-x-2
                ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
              >
                <GlobeAltIcon className="h-5 w-5" />
                <span className="text-sm">Google Book Database</span>
              </div>
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div className="space-y-4 text-center sm:text-left">
            <h3
              className={`text-lg font-semibold bg-gradient-to-r 
                ${isDark ? 'from-purple-400 to-blue-400' : 'from-indigo-600 to-blue-500'}
                bg-clip-text text-transparent`}
            >
              Connect
            </h3>
            <div className="flex justify-center sm:justify-start space-x-4">
              {[
                ["Github", "hover:text-purple-400", Github],
                ["Twitter", "hover:text-cyan-400", Twitter],
                ["Discord", "hover:text-indigo-400", MessageSquare],
                ["Instagram", "hover:text-pink-400", Instagram],
              ].map(([platform, hoverColor, Icon]) => (
                <a
                  href="#"
                  key={platform}
                  className={`transition-colors hover:scale-110
                    ${isDark ? `text-gray-400 ${hoverColor}` : `text-gray-700 ${hoverColor}`}`}
                >
                  <span className="sr-only">{platform}</span>
                  <Icon className="h-6 w-6 md:h-8" stroke="currentColor" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className={`border-t mt-12 pt-8 text-center ${isDark ? 'border-gray-800' : 'border-gray-300'}`}>
          <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-sm`}>
            &copy; {new Date().getFullYear()} BOOK FINDER. All stories belong to their respective authors.
          </p>
          <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-sm mt-2`}>
            Powered By{" "}
            <a
              href="#"
              target="_blank"
              className={`bg-clip-text text-transparent
                ${isDark
                  ? 'bg-gradient-to-r from-purple-400 to-blue-400'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:text-indigo-600'}
                transition-colors`}
            >
              Sejal Kamble
            </a>
          </p>
          <div className="mt-2 flex-wrap justify-center space-x-4 text-sm">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                href="#"
                key={link}
                className={`transition-colors
                  ${isDark ? 'text-gray-500 hover:text-cyan-300' : 'text-gray-600 hover:text-blue-600'}`}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
