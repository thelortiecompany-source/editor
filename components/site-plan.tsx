"use client";

export function SitePlan() {
  // Lot dimensions (2.36 acres = 102,802 SF)
  // Approximating as 320ft x 321ft for visualization
  const lotWidth = 320;
  const lotHeight = 321;
  const scale = 2; // 1ft = 2px

  // Setbacks
  const frontSetback = 25;
  const sideSetback = 15;
  const rearSetback = 20;

  // Building (30,000 SF - 150ft x 200ft)
  const buildingWidth = 150;
  const buildingHeight = 200;

  // Position building toward rear of lot
  const buildingX = sideSetback + 30;
  const buildingY = frontSetback + 20;

  // Parking calculations
  // 150 spaces required for retail (1 per 200 SF)
  // Standard space: 9ft x 18ft
  const parkingSpaceWidth = 9;
  const parkingSpaceHeight = 18;
  const aisleWidth = 24;

  return (
    <div className="rounded-xl bg-white p-4 shadow-lg md:p-6">
      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-blue-600" />
          <span>Building (30,000 SF)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-gray-400" />
          <span>Parking (154 spaces)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-green-500" />
          <span>Landscaping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-dashed border-red-500 bg-transparent" />
          <span>Setback Lines</span>
        </div>
      </div>

      {/* SVG Site Plan */}
      <div className="overflow-auto">
        <svg
          viewBox={`0 0 ${lotWidth * scale + 100} ${lotHeight * scale + 120}`}
          className="mx-auto h-auto w-full max-w-4xl"
          style={{ minWidth: "600px" }}
        >
          {/* Background/Lot */}
          <rect
            x={50}
            y={50}
            width={lotWidth * scale}
            height={lotHeight * scale}
            fill="#e8f5e9"
            stroke="#2e7d32"
            strokeWidth={3}
          />

          {/* Setback lines */}
          <rect
            x={50 + frontSetback * scale}
            y={50 + sideSetback * scale}
            width={(lotWidth - frontSetback * 2) * scale}
            height={(lotHeight - sideSetback - rearSetback) * scale}
            fill="none"
            stroke="#ef4444"
            strokeWidth={2}
            strokeDasharray="8 4"
          />

          {/* Building */}
          <rect
            x={50 + buildingX * scale}
            y={50 + buildingY * scale}
            width={buildingWidth * scale}
            height={buildingHeight * scale}
            fill="#2563eb"
            stroke="#1e40af"
            strokeWidth={2}
          />
          <text
            x={50 + buildingX * scale + (buildingWidth * scale) / 2}
            y={50 + buildingY * scale + (buildingHeight * scale) / 2 - 15}
            textAnchor="middle"
            fill="white"
            fontSize={14}
            fontWeight="bold"
          >
            RETAIL BUILDING
          </text>
          <text
            x={50 + buildingX * scale + (buildingWidth * scale) / 2}
            y={50 + buildingY * scale + (buildingHeight * scale) / 2 + 5}
            textAnchor="middle"
            fill="white"
            fontSize={12}
          >
            30,000 SF
          </text>
          <text
            x={50 + buildingX * scale + (buildingWidth * scale) / 2}
            y={50 + buildingY * scale + (buildingHeight * scale) / 2 + 22}
            textAnchor="middle"
            fill="white"
            fontSize={11}
          >
            (150&apos; x 200&apos;)
          </text>

          {/* Main Drive Aisle - runs along front of building */}
          <rect
            x={50 + buildingX * scale}
            y={50 + (buildingY + buildingHeight + 5) * scale}
            width={buildingWidth * scale}
            height={aisleWidth * scale}
            fill="#9ca3af"
          />

          {/* Parking Area - Front (South) of building */}
          {Array.from({ length: 15 }).map((_, i) => (
            <g key={`front-row-${i}`}>
              {/* Row 1 */}
              <rect
                x={50 + (buildingX + i * 10) * scale}
                y={50 + (buildingY + buildingHeight + aisleWidth + 8) * scale}
                width={parkingSpaceWidth * scale}
                height={parkingSpaceHeight * scale}
                fill="#d1d5db"
                stroke="#6b7280"
                strokeWidth={1}
              />
              {/* Row 2 */}
              <rect
                x={50 + (buildingX + i * 10) * scale}
                y={50 + (buildingY + buildingHeight + aisleWidth + parkingSpaceHeight + 10) * scale}
                width={parkingSpaceWidth * scale}
                height={parkingSpaceHeight * scale}
                fill="#d1d5db"
                stroke="#6b7280"
                strokeWidth={1}
              />
            </g>
          ))}

          {/* East Parking Area */}
          <rect
            x={50 + (buildingX + buildingWidth + 5) * scale}
            y={50 + buildingY * scale}
            width={aisleWidth * scale}
            height={buildingHeight * scale}
            fill="#9ca3af"
          />
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={`east-row-${i}`}>
              <rect
                x={50 + (buildingX + buildingWidth + aisleWidth + 8) * scale}
                y={50 + (buildingY + i * 20) * scale}
                width={parkingSpaceHeight * scale}
                height={parkingSpaceWidth * scale}
                fill="#d1d5db"
                stroke="#6b7280"
                strokeWidth={1}
              />
              <rect
                x={50 + (buildingX + buildingWidth + aisleWidth + parkingSpaceHeight + 10) * scale}
                y={50 + (buildingY + i * 20) * scale}
                width={parkingSpaceHeight * scale}
                height={parkingSpaceWidth * scale}
                fill="#d1d5db"
                stroke="#6b7280"
                strokeWidth={1}
              />
            </g>
          ))}

          {/* West Parking Area */}
          {Array.from({ length: 10 }).map((_, i) => (
            <rect
              key={`west-${i}`}
              x={50 + sideSetback * scale}
              y={50 + (buildingY + i * 20) * scale}
              width={parkingSpaceHeight * scale}
              height={parkingSpaceWidth * scale}
              fill="#d1d5db"
              stroke="#6b7280"
              strokeWidth={1}
            />
          ))}

          {/* Loading Dock - Rear */}
          <rect
            x={50 + buildingX * scale}
            y={50 + (buildingY - 25) * scale}
            width={60 * scale}
            height={20 * scale}
            fill="#fbbf24"
            stroke="#d97706"
            strokeWidth={2}
          />
          <text
            x={50 + buildingX * scale + 30 * scale}
            y={50 + (buildingY - 12) * scale}
            textAnchor="middle"
            fill="#78350f"
            fontSize={10}
            fontWeight="bold"
          >
            LOADING DOCK
          </text>

          {/* Entry/Exit points */}
          <rect
            x={50 + 100 * scale}
            y={50 + lotHeight * scale - 5}
            width={30 * scale}
            height={10}
            fill="#4ade80"
          />
          <text
            x={50 + 115 * scale}
            y={50 + lotHeight * scale + 18}
            textAnchor="middle"
            fill="#166534"
            fontSize={10}
            fontWeight="bold"
          >
            ENTRY/EXIT
          </text>

          <rect
            x={50 + 200 * scale}
            y={50 + lotHeight * scale - 5}
            width={30 * scale}
            height={10}
            fill="#4ade80"
          />
          <text
            x={50 + 215 * scale}
            y={50 + lotHeight * scale + 18}
            textAnchor="middle"
            fill="#166534"
            fontSize={10}
            fontWeight="bold"
          >
            ENTRY/EXIT
          </text>

          {/* Street Label */}
          <text
            x={50 + (lotWidth * scale) / 2}
            y={50 + lotHeight * scale + 40}
            textAnchor="middle"
            fill="#1f2937"
            fontSize={14}
            fontWeight="bold"
          >
            S DELAWARE DRIVE
          </text>

          {/* Dimensions */}
          {/* Lot width */}
          <line
            x1={50}
            y1={35}
            x2={50 + lotWidth * scale}
            y2={35}
            stroke="#374151"
            strokeWidth={1}
          />
          <line x1={50} y1={30} x2={50} y2={40} stroke="#374151" strokeWidth={1} />
          <line
            x1={50 + lotWidth * scale}
            y1={30}
            x2={50 + lotWidth * scale}
            y2={40}
            stroke="#374151"
            strokeWidth={1}
          />
          <text
            x={50 + (lotWidth * scale) / 2}
            y={28}
            textAnchor="middle"
            fill="#374151"
            fontSize={11}
          >
            320&apos;
          </text>

          {/* Lot height */}
          <line
            x1={50 + lotWidth * scale + 20}
            y1={50}
            x2={50 + lotWidth * scale + 20}
            y2={50 + lotHeight * scale}
            stroke="#374151"
            strokeWidth={1}
          />
          <line
            x1={50 + lotWidth * scale + 15}
            y1={50}
            x2={50 + lotWidth * scale + 25}
            y2={50}
            stroke="#374151"
            strokeWidth={1}
          />
          <line
            x1={50 + lotWidth * scale + 15}
            y1={50 + lotHeight * scale}
            x2={50 + lotWidth * scale + 25}
            y2={50 + lotHeight * scale}
            stroke="#374151"
            strokeWidth={1}
          />
          <text
            x={50 + lotWidth * scale + 35}
            y={50 + (lotHeight * scale) / 2}
            textAnchor="middle"
            fill="#374151"
            fontSize={11}
            transform={`rotate(90 ${50 + lotWidth * scale + 35} ${50 + (lotHeight * scale) / 2})`}
          >
            321&apos;
          </text>

          {/* North Arrow */}
          <g transform={`translate(${50 + lotWidth * scale + 60}, 80)`}>
            <polygon points="0,-25 -8,0 0,-5 8,0" fill="#374151" />
            <text y={15} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#374151">
              N
            </text>
          </g>
        </svg>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-4 md:grid-cols-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">30,000</div>
          <div className="text-sm text-gray-600">Building SF</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">154</div>
          <div className="text-sm text-gray-600">Parking Spaces</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">2.36</div>
          <div className="text-sm text-gray-600">Acres</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-600">29%</div>
          <div className="text-sm text-gray-600">Lot Coverage</div>
        </div>
      </div>

      {/* Setback Info */}
      <div className="mt-4 rounded-lg bg-gray-50 p-4">
        <h3 className="mb-2 font-semibold text-gray-900">Setback Requirements</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Front:</span> <span className="font-medium">25 ft</span>
          </div>
          <div>
            <span className="text-gray-600">Side:</span> <span className="font-medium">15 ft</span>
          </div>
          <div>
            <span className="text-gray-600">Rear:</span> <span className="font-medium">20 ft</span>
          </div>
        </div>
      </div>
    </div>
  );
}
