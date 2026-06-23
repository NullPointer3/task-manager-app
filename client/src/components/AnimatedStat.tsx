import { useEffect, useRef, useState } from "react";

interface AnimatedStatProps {
  target: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export function AnimatedStat({ target, suffix = "", decimals = 0, duration = 1500 }: AnimatedStatProps) {
  const [value, setValue] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const element = spanRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasEntered) return;

    let frame: number;

    const step = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [hasEntered, target, duration]);

  const formatted = value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={spanRef}>
      {formatted}
      {suffix}
    </span>
  );
}
