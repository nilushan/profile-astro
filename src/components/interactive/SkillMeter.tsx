import { useEffect, useRef, useState } from 'react';

interface SkillMeterProps {
  skill: string;
  level: number; // 0-100
  color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning';
  showPercentage?: boolean;
}

export default function SkillMeter({
  skill,
  level,
  color = 'primary',
  showPercentage = true
}: SkillMeterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const meterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (meterRef.current) {
      observer.observe(meterRef.current);
    }

    return () => {
      if (meterRef.current) {
        observer.unobserve(meterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate the progress bar
      let start = 0;
      const duration = 1500; // 1.5 seconds
      const increment = level / (duration / 16); // 60fps

      const animate = () => {
        start += increment;
        if (start < level) {
          setCurrentLevel(Math.floor(start));
          requestAnimationFrame(animate);
        } else {
          setCurrentLevel(level);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, level]);

  const getLevelLabel = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    if (level >= 30) return 'Basic';
    return 'Beginner';
  };

  return (
    <div ref={meterRef} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-base-content/90">{skill}</span>
        <div className="flex items-center gap-2">
          {showPercentage && (
            <span className="text-sm font-mono text-base-content/60">
              {currentLevel}%
            </span>
          )}
          <span className={`badge badge-${color} badge-xs`}>
            {getLevelLabel(level)}
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="w-full bg-base-200 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-full bg-${color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
            style={{ width: `${currentLevel}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
