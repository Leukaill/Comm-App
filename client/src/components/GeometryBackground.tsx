interface GeometryBackgroundProps {
  className?: string;
}

export default function GeometryBackground({ className = "" }: GeometryBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* SVG Dot Grid Pattern */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 1 }}
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle 
              cx="16" 
              cy="16" 
              r="1" 
              fill="hsl(var(--geometric-neutral-300))" 
              fillOpacity="0.6"
              className="dark:fill-[hsl(var(--geometric-neutral-700))] dark:fill-opacity-30"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Large Geometric Circles - Solid Outlines */}
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-[hsl(var(--geometric-neutral-200))] border-opacity-40 dark:border-[hsl(var(--geometric-neutral-700))] dark:border-opacity-30 geometric-orbit"
        style={{ zIndex: 2 }}
      />
      <div 
        className="absolute top-1/3 -left-24 w-64 h-64 rounded-full border-2 border-[hsl(var(--geometric-primary))] border-opacity-15 dark:border-opacity-20 geometric-orbit-reverse"
        style={{ zIndex: 2 }}
      />
      <div 
        className="absolute -bottom-24 right-1/4 w-48 h-48 rounded-full border border-[hsl(var(--geometric-neutral-300))] border-opacity-30 dark:border-[hsl(var(--geometric-neutral-600))] dark:border-opacity-25 geometric-float"
        style={{ zIndex: 2 }}
      />

      {/* Rotated Square Outlines */}
      <div 
        className="absolute top-1/4 right-1/3 w-32 h-32 border border-[hsl(var(--geometric-neutral-300))] border-opacity-25 dark:border-[hsl(var(--geometric-neutral-600))] dark:border-opacity-20 geometric-rotate"
        style={{ 
          transform: "rotate(45deg)",
          zIndex: 2
        }}
      />
      <div 
        className="absolute bottom-1/4 left-1/4 w-20 h-20 border border-[hsl(var(--geometric-primary))] border-opacity-20 dark:border-opacity-25 geometric-rotate-reverse"
        style={{ 
          transform: "rotate(30deg)",
          zIndex: 2
        }}
      />

      {/* Small Floating Circles */}
      <div 
        className="absolute top-20 left-1/3 w-6 h-6 rounded-full bg-[hsl(var(--geometric-primary))] opacity-10 dark:opacity-15 geometric-float"
        style={{ zIndex: 2 }}
      />
      <div 
        className="absolute bottom-20 right-20 w-4 h-4 rounded-full bg-[hsl(var(--geometric-neutral-400))] opacity-20 dark:bg-[hsl(var(--geometric-neutral-600))] dark:opacity-15 geometric-float-delay"
        style={{ zIndex: 2 }}
      />

    </div>
  );
}