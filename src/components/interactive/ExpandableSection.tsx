import { useId, useState } from 'react';

interface ExpandableSectionProps {
  title: string;
  items: Array<{
    title: string;
    description: string;
  }>;
  defaultExpanded?: boolean;
}

export default function ExpandableSection({
  title,
  items,
  defaultExpanded = false,
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const contentId = useId();

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        className="w-full flex items-center justify-between gap-2 font-semibold text-base-content mb-3 hover:text-primary transition-colors group"
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-primary"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          <span>{title}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`w-5 h-5 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      <div
        id={contentId}
        aria-hidden={!isExpanded}
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid sm:grid-cols-2 gap-4 pb-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-base-200/50 rounded-lg hover:bg-base-200 transition-colors"
              >
                <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-base text-base-content">
                    {item.title}
                  </p>
                  <p className="text-base text-base-content/70 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
