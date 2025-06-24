import React, { useState } from "react";

interface SliderProps {
  slides: string[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setCurrentSlide(index);
    }
  };

  return (
    <div className="relative overflow-hidden space-y-4">
      <div
        className="relative w-full flex transition-transform duration-700 ease-in-out "
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            style={{ minWidth: "100%" }}
          />
        ))}
      </div>

      <div className="grid grid-cols-5 gap-4">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`rounded-md overflow-hidden cursor-pointer hover:opacity-100 transition-opacity duration-300 border-2 ${
              index === currentSlide ? "border-primary " : "border-[#E5E5E5]"
            }`}
            onClick={() => goToSlide(index)}>
            <img
              src={slide}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
