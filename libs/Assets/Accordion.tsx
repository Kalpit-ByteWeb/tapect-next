import React from "react";

interface AccordionItemProps {
  item: { ImageUrl?: string; question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
  layout?: "WithIcon" | "";
}

const Accordion: React.FC<AccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
  layout,
}) => {
  return (
    <div
      className={`border-b border-[#E5E5E5]  last:border-b-0 ${
        layout == "WithIcon" ? "pb-2" : "py-6"
      }`}>
      <button
        className="flex items-center justify-between w-full text-left"
        onClick={onToggle}>
        <div className="flex items-center gap-4">
          {item.ImageUrl && <img src={item.ImageUrl} alt="Question Icon" />}
          <span
            className={` text-secondary ${
              layout == "WithIcon" ? "Title-16" : "Heading-20"
            } `}>
            {item.question}
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className={` Description-dark ${
            layout == "WithIcon" ? "mt-2" : "mt-4"
          } `}>
          {item.answer}
        </div>
      )}
    </div>
  );
};

export default Accordion;
