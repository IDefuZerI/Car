export function GridBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 blueprint-grid-dark"></div>

      {/* Horizontal lines */}
      <div className="absolute left-0 right-0 top-1/4 h-px bg-blue-500/10"></div>
      <div className="absolute left-0 right-0 top-2/4 h-px bg-blue-500/10"></div>
      <div className="absolute left-0 right-0 top-3/4 h-px bg-blue-500/10"></div>

      {/* Vertical lines */}
      <div className="absolute top-0 bottom-0 left-1/4 w-px bg-blue-500/10"></div>
      <div className="absolute top-0 bottom-0 left-2/4 w-px bg-blue-500/10"></div>
      <div className="absolute top-0 bottom-0 left-3/4 w-px bg-blue-500/10"></div>

      {/* Corner elements */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-blue-500/20"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-blue-500/20"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-blue-500/20"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-blue-500/20"></div>
    </div>
  )
}
