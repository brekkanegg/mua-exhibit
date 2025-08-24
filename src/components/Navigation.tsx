'use client'

import { useState } from 'react'

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('gallery')

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  return (
    <nav className="flex justify-center mb-8">
      <div className="flex space-x-4 bg-gray-100 rounded-lg p-2">
        <button
          onClick={() => scrollToSection('gallery')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeSection === 'gallery' 
              ? 'bg-white text-gray-800 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Gallery
        </button>
        <button
          onClick={() => scrollToSection('location')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeSection === 'location' 
              ? 'bg-white text-gray-800 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Location
        </button>
      </div>
    </nav>
  )
}

export default Navigation