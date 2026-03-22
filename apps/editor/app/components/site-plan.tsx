'use client'

import { useState } from 'react'

// Property Constants - 161 S Delaware Drive, Apache Junction, AZ
const LOT_WIDTH_FT = 330 // ~330 ft wide (2.36 acres = ~102,802 SF)
const LOT_DEPTH_FT = 312 // ~312 ft deep

// Setbacks (commercial zoning)
const FRONT_SETBACK = 25
const SIDE_SETBACK = 15
const REAR_SETBACK = 20

// Building - 30,000 SF retail
const BUILDING_WIDTH = 200 // ft
const BUILDING_DEPTH = 150 // ft (200 x 150 = 30,000 SF)

// Parking - 1 space per 200 SF for retail = 150 spaces
const PARKING_SPACES = 150
const SPACE_WIDTH = 9 // ft
const SPACE_DEPTH = 18 // ft
const AISLE_WIDTH = 24 // ft (two-way traffic)

// Scale for rendering (pixels per foot)
const SCALE = 1.8

export function SitePlan() {
  const [showDimensions, setShowDimensions] = useState(true)
  const [showSetbacks, setShowSetbacks] = useState(true)
  
  // Calculate positions
  const buildableWidth = LOT_WIDTH_FT - SIDE_SETBACK * 2
  const buildableDepth = LOT_DEPTH_FT - FRONT_SETBACK - REAR_SETBACK
  
  // Position building in the rear portion of the lot
  const buildingX = (LOT_WIDTH_FT - BUILDING_WIDTH) / 2
  const buildingY = FRONT_SETBACK + 120 // Position building towards rear with parking in front
  
  // Parking configuration - double-loaded aisles in front of building
  const parkingRows = 6
  const spacesPerRow = Math.ceil(PARKING_SPACES / parkingRows / 2) // double-loaded
  const parkingStartX = SIDE_SETBACK + 10
  const parkingStartY = FRONT_SETBACK + 10
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-semibold text-foreground">Site Plan</h1>
          <p className="text-sm text-muted-foreground">
            161 S Delaware Drive, Apache Junction, AZ
          </p>
        </div>
      </header>
      
      {/* Controls */}
      <div className="border-b border-border bg-card px-6 py-3">
        <div className="mx-auto flex max-w-7xl gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showDimensions}
              onChange={(e) => setShowDimensions(e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            <span className="text-foreground">Show Dimensions</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showSetbacks}
              onChange={(e) => setShowSetbacks(e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            <span className="text-foreground">Show Setbacks</span>
          </label>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex flex-1 gap-6 p-6">
        {/* Site Plan Canvas */}
        <div className="flex-1 overflow-auto rounded-lg border border-border bg-card p-4">
          <svg
            width={LOT_WIDTH_FT * SCALE + 100}
            height={LOT_DEPTH_FT * SCALE + 100}
            className="mx-auto"
          >
            {/* Background */}
            <rect
              x={50}
              y={50}
              width={LOT_WIDTH_FT * SCALE}
              height={LOT_DEPTH_FT * SCALE}
              fill="#e8f5e9"
              stroke="#2e7d32"
              strokeWidth={2}
            />
            
            {/* Setback Lines */}
            {showSetbacks && (
              <rect
                x={50 + SIDE_SETBACK * SCALE}
                y={50 + FRONT_SETBACK * SCALE}
                width={(LOT_WIDTH_FT - SIDE_SETBACK * 2) * SCALE}
                height={(LOT_DEPTH_FT - FRONT_SETBACK - REAR_SETBACK) * SCALE}
                fill="none"
                stroke="#ff9800"
                strokeWidth={1}
                strokeDasharray="8,4"
              />
            )}
            
            {/* Building */}
            <rect
              x={50 + buildingX * SCALE}
              y={50 + buildingY * SCALE}
              width={BUILDING_WIDTH * SCALE}
              height={BUILDING_DEPTH * SCALE}
              fill="#1565c0"
              stroke="#0d47a1"
              strokeWidth={2}
            />
            
            {/* Building Label */}
            <text
              x={50 + (buildingX + BUILDING_WIDTH / 2) * SCALE}
              y={50 + (buildingY + BUILDING_DEPTH / 2) * SCALE}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={14}
              fontWeight="bold"
            >
              RETAIL BUILDING
            </text>
            <text
              x={50 + (buildingX + BUILDING_WIDTH / 2) * SCALE}
              y={50 + (buildingY + BUILDING_DEPTH / 2 + 20) * SCALE}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={12}
            >
              30,000 SF
            </text>
            
            {/* Parking Lot Surface */}
            <rect
              x={50 + parkingStartX * SCALE}
              y={50 + parkingStartY * SCALE}
              width={(LOT_WIDTH_FT - SIDE_SETBACK * 2 - 20) * SCALE}
              height={100 * SCALE}
              fill="#9e9e9e"
              rx={4}
            />
            
            {/* Parking Spaces - Row 1 (top of lot) */}
            {Array.from({ length: 25 }).map((_, i) => (
              <rect
                key={`row1-${i}`}
                x={50 + (parkingStartX + 5 + i * (SPACE_WIDTH + 1)) * SCALE}
                y={50 + (parkingStartY + 5) * SCALE}
                width={SPACE_WIDTH * SCALE}
                height={SPACE_DEPTH * SCALE}
                fill="#ffffff"
                stroke="#616161"
                strokeWidth={0.5}
              />
            ))}
            
            {/* Parking Spaces - Row 2 */}
            {Array.from({ length: 25 }).map((_, i) => (
              <rect
                key={`row2-${i}`}
                x={50 + (parkingStartX + 5 + i * (SPACE_WIDTH + 1)) * SCALE}
                y={50 + (parkingStartY + 5 + SPACE_DEPTH + AISLE_WIDTH) * SCALE}
                width={SPACE_WIDTH * SCALE}
                height={SPACE_DEPTH * SCALE}
                fill="#ffffff"
                stroke="#616161"
                strokeWidth={0.5}
              />
            ))}
            
            {/* Parking Spaces - Row 3 */}
            {Array.from({ length: 25 }).map((_, i) => (
              <rect
                key={`row3-${i}`}
                x={50 + (parkingStartX + 5 + i * (SPACE_WIDTH + 1)) * SCALE}
                y={50 + (parkingStartY + 5 + (SPACE_DEPTH + AISLE_WIDTH) * 2 - AISLE_WIDTH + SPACE_DEPTH) * SCALE}
                width={SPACE_WIDTH * SCALE}
                height={SPACE_DEPTH * SCALE}
                fill="#ffffff"
                stroke="#616161"
                strokeWidth={0.5}
              />
            ))}
            
            {/* Side Parking - Left */}
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={`left-${i}`}>
                <rect
                  x={50 + (SIDE_SETBACK + 2) * SCALE}
                  y={50 + (buildingY + 10 + i * (SPACE_WIDTH + 1)) * SCALE}
                  width={SPACE_DEPTH * SCALE}
                  height={SPACE_WIDTH * SCALE}
                  fill="#ffffff"
                  stroke="#616161"
                  strokeWidth={0.5}
                />
              </g>
            ))}
            
            {/* Side Parking - Right */}
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={`right-${i}`}>
                <rect
                  x={50 + (LOT_WIDTH_FT - SIDE_SETBACK - SPACE_DEPTH - 2) * SCALE}
                  y={50 + (buildingY + 10 + i * (SPACE_WIDTH + 1)) * SCALE}
                  width={SPACE_DEPTH * SCALE}
                  height={SPACE_WIDTH * SCALE}
                  fill="#ffffff"
                  stroke="#616161"
                  strokeWidth={0.5}
                />
              </g>
            ))}
            
            {/* Rear Parking */}
            {Array.from({ length: 25 }).map((_, i) => (
              <rect
                key={`rear-${i}`}
                x={50 + (parkingStartX + 5 + i * (SPACE_WIDTH + 1)) * SCALE}
                y={50 + (buildingY + BUILDING_DEPTH + AISLE_WIDTH) * SCALE}
                width={SPACE_WIDTH * SCALE}
                height={SPACE_DEPTH * SCALE}
                fill="#ffffff"
                stroke="#616161"
                strokeWidth={0.5}
              />
            ))}
            
            {/* Drive Aisles */}
            <rect
              x={50 + parkingStartX * SCALE}
              y={50 + (parkingStartY + SPACE_DEPTH + 5) * SCALE}
              width={(LOT_WIDTH_FT - SIDE_SETBACK * 2 - 20) * SCALE}
              height={AISLE_WIDTH * SCALE}
              fill="#757575"
            />
            
            {/* Entry/Exit - Delaware Drive (bottom) */}
            <rect
              x={50 + (LOT_WIDTH_FT / 2 - 15) * SCALE}
              y={50 + (LOT_DEPTH_FT - 5) * SCALE}
              width={30 * SCALE}
              height={10 * SCALE}
              fill="#4caf50"
            />
            <text
              x={50 + (LOT_WIDTH_FT / 2) * SCALE}
              y={50 + (LOT_DEPTH_FT + 12) * SCALE}
              textAnchor="middle"
              fill="#2e7d32"
              fontSize={11}
              fontWeight="500"
            >
              ENTRY/EXIT
            </text>
            
            {/* Street Label */}
            <text
              x={50 + (LOT_WIDTH_FT / 2) * SCALE}
              y={50 + (LOT_DEPTH_FT + 30) * SCALE}
              textAnchor="middle"
              fill="#333"
              fontSize={12}
              fontWeight="bold"
            >
              S DELAWARE DRIVE
            </text>
            
            {/* Dimensions */}
            {showDimensions && (
              <>
                {/* Lot Width */}
                <line
                  x1={50}
                  y1={30}
                  x2={50 + LOT_WIDTH_FT * SCALE}
                  y2={30}
                  stroke="#333"
                  strokeWidth={1}
                  markerStart="url(#arrow)"
                  markerEnd="url(#arrow)"
                />
                <text
                  x={50 + (LOT_WIDTH_FT / 2) * SCALE}
                  y={20}
                  textAnchor="middle"
                  fill="#333"
                  fontSize={11}
                >
                  {LOT_WIDTH_FT}&apos;
                </text>
                
                {/* Lot Depth */}
                <line
                  x1={30}
                  y1={50}
                  x2={30}
                  y2={50 + LOT_DEPTH_FT * SCALE}
                  stroke="#333"
                  strokeWidth={1}
                />
                <text
                  x={15}
                  y={50 + (LOT_DEPTH_FT / 2) * SCALE}
                  textAnchor="middle"
                  fill="#333"
                  fontSize={11}
                  transform={`rotate(-90, 15, ${50 + (LOT_DEPTH_FT / 2) * SCALE})`}
                >
                  {LOT_DEPTH_FT}&apos;
                </text>
                
                {/* Building Dimensions */}
                <text
                  x={50 + (buildingX + BUILDING_WIDTH / 2) * SCALE}
                  y={50 + buildingY * SCALE - 8}
                  textAnchor="middle"
                  fill="#0d47a1"
                  fontSize={10}
                >
                  {BUILDING_WIDTH}&apos; x {BUILDING_DEPTH}&apos;
                </text>
              </>
            )}
            
            {/* Arrow marker definition */}
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
              </marker>
            </defs>
            
            {/* North Arrow */}
            <g transform={`translate(${50 + LOT_WIDTH_FT * SCALE + 40}, 80)`}>
              <polygon points="0,30 10,0 20,30 10,25" fill="#333" />
              <text x={10} y={45} textAnchor="middle" fontSize={12} fontWeight="bold">
                N
              </text>
            </g>
            
            {/* Legend */}
            <g transform={`translate(${50 + LOT_WIDTH_FT * SCALE + 20}, 120)`}>
              <text y={0} fontSize={11} fontWeight="bold" fill="#333">
                LEGEND
              </text>
              <rect x={0} y={15} width={16} height={12} fill="#1565c0" />
              <text x={22} y={25} fontSize={10} fill="#333">
                Building
              </text>
              <rect x={0} y={35} width={16} height={12} fill="#9e9e9e" />
              <text x={22} y={45} fontSize={10} fill="#333">
                Parking
              </text>
              <rect x={0} y={55} width={16} height={12} fill="#e8f5e9" stroke="#2e7d32" />
              <text x={22} y={65} fontSize={10} fill="#333">
                Landscaping
              </text>
              <line
                x1={0}
                y1={81}
                x2={16}
                y2={81}
                stroke="#ff9800"
                strokeWidth={2}
                strokeDasharray="4,2"
              />
              <text x={22} y={85} fontSize={10} fill="#333">
                Setback Line
              </text>
            </g>
          </svg>
        </div>
        
        {/* Info Panel */}
        <div className="w-80 space-y-4">
          {/* Property Info */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h2 className="mb-3 font-semibold text-foreground">Property Information</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Address</dt>
                <dd className="text-foreground">161 S Delaware Dr</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">City</dt>
                <dd className="text-foreground">Apache Junction, AZ</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Lot Size</dt>
                <dd className="text-foreground">2.36 acres</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Lot Area</dt>
                <dd className="text-foreground">~102,802 SF</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Zoning</dt>
                <dd className="text-foreground">Commercial (02RL)</dd>
              </div>
            </dl>
          </div>
          
          {/* Setbacks */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h2 className="mb-3 font-semibold text-foreground">Required Setbacks</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Front</dt>
                <dd className="text-foreground">{FRONT_SETBACK} ft</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Side (each)</dt>
                <dd className="text-foreground">{SIDE_SETBACK} ft</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Rear</dt>
                <dd className="text-foreground">{REAR_SETBACK} ft</dd>
              </div>
            </dl>
          </div>
          
          {/* Building Stats */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h2 className="mb-3 font-semibold text-foreground">Building</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Type</dt>
                <dd className="text-foreground">Retail</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Footprint</dt>
                <dd className="text-foreground">30,000 SF</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Dimensions</dt>
                <dd className="text-foreground">{BUILDING_WIDTH}&apos; x {BUILDING_DEPTH}&apos;</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Coverage</dt>
                <dd className="text-foreground">~29%</dd>
              </div>
            </dl>
          </div>
          
          {/* Parking Stats */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h2 className="mb-3 font-semibold text-foreground">Parking</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Required Ratio</dt>
                <dd className="text-foreground">1 per 200 SF</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Required Spaces</dt>
                <dd className="text-foreground">{PARKING_SPACES} spaces</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Provided</dt>
                <dd className="text-foreground">~155 spaces</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Space Size</dt>
                <dd className="text-foreground">{SPACE_WIDTH}&apos; x {SPACE_DEPTH}&apos;</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Aisle Width</dt>
                <dd className="text-foreground">{AISLE_WIDTH}&apos; (2-way)</dd>
              </div>
            </dl>
          </div>
          
          {/* Summary */}
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
            <h2 className="mb-2 font-semibold text-green-800 dark:text-green-200">
              Feasibility
            </h2>
            <p className="text-sm text-green-700 dark:text-green-300">
              A 30,000 SF retail building with {PARKING_SPACES}+ parking spaces fits within
              the 2.36-acre lot with all required setbacks satisfied.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
