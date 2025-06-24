'use client';
import React, { useState } from "react";
import Accordion from "../../libs/Assets/Accordion";

interface FAQItemType {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  Title: string;
  TitleHighlight: string;
  Faq: FAQItemType[];
}

const FAQSection: React.FC<FAQSectionProps> = ({
  Title,
  TitleHighlight,
  Faq,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default to first accordion open

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close state
  };

  return (
    <section className="pt-60 pb-120 px-6 xl:px-0">
      <div className="md:container mx-auto space-y-12">
        {/* Title Section */}
        <h2 className="TitleHeading text-center px-4">
          {Title} <span className="text-primary">{TitleHighlight}</span>
        </h2>

        {/* FAQ Section */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
          <div className="w-full space-y-6">
            {Faq.map((item, index) => (
              <Accordion
                key={index}
                item={item}
                isOpen={openIndex === index} // Keep the first one open by default
                onToggle={() => handleToggle(index)} // Handle click event
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
