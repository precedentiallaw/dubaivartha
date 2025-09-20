import { useState, useEffect, useRef } from 'react';
import { Progress } from '@/components/ui/progress';

interface ReadingProgressProps {
  content?: string;
  className?: string;
}

const ReadingProgress = ({ content = "", className = "" }: ReadingProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.pageYOffset;
      const scrollPercentage = Math.min((scrollTop / documentHeight) * 100, 100);
      
      setProgress(scrollPercentage);
      setIsVisible(scrollPercentage > 5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate estimated reading time
  const estimateReadingTime = (text: string): number => {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = text.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const readingTime = content ? estimateReadingTime(content) : 0;

  if (!isVisible) return null;

  return (
    <div className={`fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur border-b transition-all duration-300 ${className}`}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Reading progress</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress 
          value={progress} 
          className="h-1"
        />
        {readingTime > 0 && (
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
            <span>{readingTime} min read</span>
            <span>{Math.round((progress / 100) * readingTime)} min read</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingProgress;