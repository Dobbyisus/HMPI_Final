import React, { useState } from "react";
import MapChart from "../components/MapChart";
import RegionModal from "../components/RegionModal";
import { hmpiData } from "../data/hmpiData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Map, AlertTriangle, Info } from "lucide-react";

const Index = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStateClick = (stateName) => {
    setSelectedState(stateName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedState(null);
  };

  // Calculate statistics
  const hmpiValues = Object.values(hmpiData);
  const totalStates = Object.keys(hmpiData).length;
  const criticalStates = hmpiValues.filter(state => state.hmpi >= 80).length;
  const averageHMPI = (hmpiValues.reduce((sum, state) => sum + state.hmpi, 0) / totalStates).toFixed(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">HMPI Dashboard</h1>
                <p className="text-sm text-muted-foreground">Heavy Metal Pollution Index - India</p>
              </div>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              Environmental Monitoring System
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Regions</CardTitle>
              <Map className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStates}</div>
              <p className="text-xs text-muted-foreground">
                States and Union Territories monitored
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Zones</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{criticalStates}</div>
              <p className="text-xs text-muted-foreground">
                Regions with HMPI ≥ 80
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average HMPI</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageHMPI}</div>
              <p className="text-xs text-muted-foreground">
                National pollution index average
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Map Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              Interactive India Map
            </CardTitle>
            <CardDescription>
              Click on any state to view detailed HMPI information and heavy metal breakdown
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <MapChart 
              onStateClick={handleStateClick}
              selectedState={selectedState}
            />
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5" />
              How to Use
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Hover:</strong> View state name and HMPI score</p>
                <p><strong>Click:</strong> Open detailed analysis modal</p>
              </div>
              <div>
                <p><strong>Color Legend:</strong> Visual representation of pollution levels</p>
                <p><strong>Interactive Charts:</strong> Detailed metal breakdown in modal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Modal */}
      <RegionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        stateName={selectedState}
        stateData={selectedState ? hmpiData[selectedState] : null}
      />
    </div>
  );
};

export default Index;
