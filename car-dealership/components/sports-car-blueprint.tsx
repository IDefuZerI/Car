export function SportsCarBlueprint() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-20"
    >
      {/* Grid lines */}
      <g stroke="rgba(66, 153, 225, 0.3)" strokeWidth="1">
        {/* Horizontal grid lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 30} x2="800" y2={i * 30} />
        ))}

        {/* Vertical grid lines */}
        {Array.from({ length: 27 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 30} y1="0" x2={i * 30} y2="600" />
        ))}
      </g>

      {/* Car outline */}
      <path
        d="M600,300 C600,280 580,260 550,250 L450,240 C420,235 400,230 350,220 C300,210 250,210 200,220 C150,230 120,250 100,270 C80,290 70,310 70,330 C70,350 80,370 100,390 C120,410 150,420 200,430 C250,440 300,440 350,430 C400,420 420,415 450,410 L550,400 C580,390 600,370 600,350 Z"
        stroke="rgba(66, 153, 225, 0.8)"
        strokeWidth="2"
        fill="none"
      />

      {/* Wheels */}
      <circle cx="180" cy="350" r="50" stroke="rgba(66, 153, 225, 0.8)" strokeWidth="2" fill="none" />
      <circle cx="180" cy="350" r="30" stroke="rgba(66, 153, 225, 0.8)" strokeWidth="2" fill="none" />
      <circle cx="180" cy="350" r="5" stroke="rgba(66, 153, 225, 0.8)" strokeWidth="2" fill="none" />

      <circle cx="500" cy="350" r="50" stroke="rgba(66, 153, 225, 0.8)" strokeWidth="2" fill="none" />
      <circle cx="500" cy="350" r="30" stroke="rgba(66, 153, 225, 0.8)" strokeWidth="2" fill="none" />
      <circle cx="500" cy="350" r="5" stroke="rgba(66, 153, 225, 0.8)" strokeWidth="2" fill="none" />

      {/* Windows */}
      <path
        d="M250,240 L300,230 L400,240 L420,260 L400,280 L300,290 L250,280 Z"
        stroke="rgba(66, 153, 225, 0.8)"
        strokeWidth="2"
        fill="none"
      />

      {/* Details */}
      <line x1="100" y1="300" x2="150" y2="300" stroke="rgba(66, 153, 225, 0.8)" strokeWidth="2" />
      <line x1="550" y1="300" x2="600" y2="300" stroke="rgba(66, 153, 225, 0.8)" strokeWidth="2" />

      {/* Measurements */}
      <line x1="100" y1="450" x2="600" y2="450" stroke="rgba(66, 153, 225, 0.8)" strokeWidth="1" />
      <line x1="100" y1="445" x2="100" y2="455" stroke="rgba(66, 153, 225, 0.8)" strokeWidth="1" />
      <line x1="600" y1="445" x2="600" y2="455" stroke="rgba(66, 153, 225, 0.8)" strokeWidth="1" />

      {/* Technical labels */}
      <text x="330" y="460" fill="rgba(66, 153, 225, 0.8)" fontSize="12" textAnchor="middle">
        4700 mm
      </text>
      <text x="180" y="410" fill="rgba(66, 153, 225, 0.8)" fontSize="10" textAnchor="middle">
        R18
      </text>
      <text x="500" y="410" fill="rgba(66, 153, 225, 0.8)" fontSize="10" textAnchor="middle">
        R18
      </text>
      <text x="350" y="260" fill="rgba(66, 153, 225, 0.8)" fontSize="10" textAnchor="middle">
        Cabin
      </text>
      <text x="150" y="320" fill="rgba(66, 153, 225, 0.8)" fontSize="10" textAnchor="middle">
        Front
      </text>
      <text x="550" y="320" fill="rgba(66, 153, 225, 0.8)" fontSize="10" textAnchor="middle">
        Rear
      </text>
    </svg>
  )
}
