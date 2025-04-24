import { Icon } from "@iconify/react";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-[var(--color-accent-50)]/80 backdrop-blur-sm z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <Icon 
              icon="mdi:loading" 
              className="w-12 h-12 animate-spin text-[var(--color-primary-500)]" 
            />
            <div className="absolute inset-0 rounded-full border-4 border-[var(--color-primary-500)]/20"></div>
          </div>
          <p className="text-lg font-medium text-[var(--color-accent-900)] animate-pulse">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 