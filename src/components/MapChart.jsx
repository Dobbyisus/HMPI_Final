import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { hmpiData, getPollutionColor } from "../data/hmpiData";
import { Tooltip } from "@/components/ui/tooltip";

const geoUrl = "/india_states.geojson";

const MapChart = ({ onStateClick, selectedState }) => {
  const [hoveredState, setHoveredState] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <div className="relative w-full h-[600px] bg-gradient-map rounded-xl overflow-visible shadow-lg">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1000,
          center: [78.9629, 20.5937], // Center on India
        }}
        width={800}
        height={600}
        className="w-full h-full overflow-visible"
        style={{ overflow: "visible" }}
      >
        <ZoomableGroup center={[78.9629, 20.5937]} zoom={1} style={{ overflow: "visible" }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.st_nm;
                const isHovered = hoveredState === stateName;
                const isSelected = selectedState === stateName;
                const stateData = hmpiData[stateName];
                
                if (!stateData) {
                  console.warn(`No HMPI data found for state: ${stateName}`);
                }

                const fillColor = stateData 
                  ? getPollutionColor(stateData.hmpi)
                  : "hsl(var(--map-state-default))";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setHoveredState(stateName);
                      setTooltipContent(`${stateName}${stateData ? ` - HMPI: ${stateData.hmpi}` : ''}`);
                    }}
                    onMouseLeave={() => {
                      setHoveredState(null);
                      setTooltipContent("");
                    }}
                    onClick={() => {
                      if (stateData) {
                        onStateClick(stateName);
                      }
                    }}
                    style={{
                      default: {
                        fill: fillColor,
                        stroke: "hsl(var(--border))",
                        strokeWidth: 0.5,
                        outline: "none",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        transform: "translateY(0px) scale(1)",
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                      },
                      hover: {
                        fill: isSelected 
                          ? "hsl(var(--map-state-selected))"
                          : "hsl(var(--map-state-hover))",
                        stroke: "hsl(var(--primary))",
                        strokeWidth: 2,
                        outline: "none",
                        transform: "translateY(-8px) scale(1.05)",
                        filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.3)) brightness(1.1)",
                        cursor: stateData ? "pointer" : "default",
                        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      },
                      pressed: {
                        fill: "hsl(var(--map-state-selected))",
                        stroke: "hsl(var(--primary))",
                        strokeWidth: 2.5,
                        outline: "none",
                        transform: "translateY(-4px) scale(1.02)",
                        filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.25))",
                      },
                    }}
                    className={`
                      transition-all duration-300 ease-out
                      ${isSelected ? 'animate-state-lift shadow-state-lift z-10' : ''}
                      ${isHovered ? 'animate-glow z-20' : ''}
                      ${stateData ? 'hover:shadow-glow-hover' : ''}
                    `}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      
      {/* Tooltip */}
      {tooltipContent && (
        <div className="absolute top-4 left-4 bg-card border border-border rounded-lg px-3 py-2 shadow-lg animate-fade-in">
          <p className="text-sm font-medium text-card-foreground">
            {tooltipContent}
          </p>
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg">
        <h3 className="text-sm font-semibold text-card-foreground mb-2">HMPI Levels</h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-pollution-low"></div>
            <span className="text-xs text-muted-foreground">Low (&lt; 45)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-pollution-medium"></div>
            <span className="text-xs text-muted-foreground">Medium (45-64)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-pollution-high"></div>
            <span className="text-xs text-muted-foreground">High (65-79)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-pollution-critical"></div>
            <span className="text-xs text-muted-foreground">Critical (≥ 80)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapChart;