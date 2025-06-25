'use client'
import { useState } from "react";

interface TabDataType {
  TabTitle: string;
  TabDescription: string;
  imageUrl: string;
  altText: string;
}

interface TabSectionProps {
  tabs: TabDataType[];
}

function TabSection({ tabs }: TabSectionProps) {
  const [activeTab, setActiveTab] = useState(1); // Start with the first tab active

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="md:px-6">
      <div className="flex-container w-auto bg-[#F5F8FE] border-[#E2E5EF] shadow-tabsection rounded-20 mt-60 md:mt-120 mb-60 p-6 lg:p-20 flex flex-col md:flex-row gap-6 lg:gap-[52px]">
        {/* Tabs Section */}
        <div className="w-full md:w-[40%] lg:w-[45%]">
          <ul className="space-y-4 sm:space-y-6">
            {tabs.map((tab, index) => (
              <li
                key={index}
                className={`cursor-pointer space-y-3 text-secondary rounded-10 transition-all duration-300 ${
                  activeTab === index ? "bg-primary text-white p-6" : "p-6"
                }`}
                onClick={() => handleTabClick(index)}
              >
                <h3 className="Title-24">{tab.TabTitle}</h3>
                <p className="Tab-Description">{tab.TabDescription}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-[55%] flex justify-center">
          {tabs[activeTab] && (
            <img
              src={tabs[activeTab].imageUrl}
              alt={tabs[activeTab].altText}
              className="rounded-20 w-full max-w-[600px] object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TabSection;
