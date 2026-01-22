import React, { useState } from "react"
import logo from "../assets/logo.jpeg"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"

export function Headers() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-white/80 backdrop-blur-lg border-b border-cyan-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <img
                  src={logo}
                  alt="CampyTech Gist Logo"
                  className="h-28 w-auto "
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-cyan-600 font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-cyan-600 font-medium transition-colors"
              >
                Blog
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-cyan-600 font-medium transition-colors"
              >
                Scholarships
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-cyan-600 font-medium transition-colors"
              >
                About
              </a>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all transform hover:scale-105">
                Book Consultation
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-3 px-4">
              <a
                href="#"
                className="text-gray-700 hover:text-cyan-600 font-medium py-2"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-cyan-600 font-medium py-2"
              >
                Blog
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-cyan-600 font-medium py-2"
              >
                Scholarships
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-cyan-600 font-medium py-2"
              >
                About
              </a>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-medium mt-2">
                Book Consultation
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
