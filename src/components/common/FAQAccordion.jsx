import { useState } from "react";
import { Icon } from "@iconify/react";

const FAQAccordion = ({ data, initialCount = 6 }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const visibleData = showAll ? data : data.slice(0, initialCount);

  return (
    <div className="max-w-2xl mx-auto">
      {visibleData.map((item, idx) => (
        <div key={idx} className="mb-4 border-b border-[var(--color-accent-200)]">
          <button
            className="w-full flex justify-between items-center py-4 text-left text-lg font-medium text-[var(--color-accent-700)] focus:outline-none"
            onClick={() => toggle(idx)}
            aria-expanded={openIndex === idx}
          >
            {item.question}
            <Icon
              icon="mdi:chevron-down"
              className={`transition-transform duration-200 w-6 h-6 ${openIndex === idx ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="pb-4 text-[var(--color-accent-600)]">{item.answer}</p>
          </div>
        </div>
      ))}
      {data.length > initialCount && (
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 rounded-full bg-[var(--color-primary-500)] text-[var(--color-accent-200)] font-semibold shadow hover:bg-[var(--color-primary-600)] transition"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : "More FAQ"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FAQAccordion;
