import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

import { Link } from 'react-router-dom'; // 1. Import Link
import { getSlides } from '../../api/services';

const FlexSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const interval = 8000;

  // --- Fetching and State Logic (No changes needed) ---
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        const data = await getSlides();
        const slidesData = Array.isArray(data) ? data : (data.results || []);
        setSlides(slidesData);
        setError(null);
      } catch (err) {
        console.error('Error fetching slides:', err);
        setError('Failed to load slides');
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const nextSlide = useCallback(() => {
    if (isAnimating || slides.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 750);
  }, [isAnimating, slides.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating || slides.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 750);
  }, [isAnimating, slides.length]);

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 750);
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const autoPlay = setInterval(nextSlide, interval);
    return () => clearInterval(autoPlay);
  }, [nextSlide, slides.length]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide]);

  // --- Render Logic ---

  // Loading state
  if (loading) {
    // ... (loading JSX remains the same)
      return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 lg:mt-10">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[450px] bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
          <p className="text-gray-500">Loading slides...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    // ... (error JSX remains the same)
     return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 lg:mt-10">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[450px] bg-red-50 rounded-lg flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  // No slides
  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 lg:mt-10">
      <div className="relative w-full overflow-hidden bg-gray-900 rounded-lg shadow-xl group">
        {/* Slides */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[450px]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                  {/* Subtitle */}
                  <div
                    className={`transform transition-all duration-700 ${
                      index === currentSlide ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-12'
                    }`}
                  >
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold uppercase tracking-wider mb-3 md:mb-4 lg:mb-6 text-blue-200">
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* Title */}
                  <div
                    className={`transform transition-all duration-700 ${
                      index === currentSlide ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-12'
                    }`}
                  >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight mb-4 md:mb-6 lg:mb-8">
                      {slide.title}
                      {slide.title_span && <span className="block text-white">{slide.title_span}</span>}
                    </h1>
                  </div>

                  {/* Button */}
                  <div
                    className={`transform transition-all duration-700 ${
                      index === currentSlide ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {/* --- CHANGE HERE --- */}
                    {/* 2. Replace <a> with <Link> */}
                    <Link
                      to="/products" // 3. Set the 'to' prop to the all products page
                      className="inline-block bg-[#1228e1] text-white hover:bg-white hover:text-[#1228e1] px-6 md:px-8 py-3 md:py-4 font-semibold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl rounded-sm"
                    >
                      {slide.button_text} {/* Keep dynamic button text */}
                    </Link>
                    {/* --- END CHANGE --- */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Navigation Arrows, Dots, Counter (No changes needed) --- */}
        <div className="absolute inset-y-0 left-0 flex items-center z-30">
          <button onClick={prevSlide} disabled={isAnimating} className="ml-4 w-12 h-12 bg-white bg-opacity-90 hover:bg-opacity-100 border border-gray-200 rounded-full flex items-center justify-center text-gray-800 hover:text-[#1228e1] transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl opacity-80 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center z-30">
          <button onClick={nextSlide} disabled={isAnimating} className="mr-4 w-12 h-12 bg-white bg-opacity-90 hover:bg-opacity-100 border border-gray-200 rounded-full flex items-center justify-center text-gray-800 hover:text-[#1228e1] transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl opacity-80 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button key={index} onClick={() => goToSlide(index)} disabled={isAnimating} className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-500 border-2 ${ index === currentSlide ? 'bg-[#1228e1] border-[#1228e1] scale-110' : 'bg-white bg-opacity-60 border-white hover:bg-opacity-80' } disabled:opacity-50 shadow-sm`} />
          ))}
        </div>
        <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1.5 text-sm font-medium shadow-lg rounded-sm">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
};

export default FlexSlider;