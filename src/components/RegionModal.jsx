import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, User, BarChart3 } from "lucide-react";
import HMPIChart from "./HMPIChart";
import { getPollutionLevel } from "../data/hmpiData";

const RegionModal = ({ isOpen, onClose, stateName, stateData }) => {
  if (!stateData) return null;

  const pollutionLevel = getPollutionLevel(stateData.hmpi);
  const pollutionBadgeVariant = {
    low: "default",
    medium: "secondary", 
    high: "outline",
    critical: "destructive"
  }[pollutionLevel];

  const pollutionDescription = {
    low: "Environmental conditions are within acceptable limits",
    medium: "Moderate pollution levels require monitoring",
    high: "Significant pollution levels need immediate attention", 
    critical: "Critical pollution levels require urgent intervention"
  }[pollutionLevel];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-primary">
              {stateName}
            </DialogTitle>
            <Badge variant={pollutionBadgeVariant} className="text-sm px-3 py-1">
              {pollutionLevel.toUpperCase()}
            </Badge>
          </div>
          <DialogDescription className="text-base">
            Heavy Metal Pollution Index Report and Analysis
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* HMPI Score Card */}
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                HMPI Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">{stateData.hmpi}</div>
              <p className="text-primary-foreground/90 text-sm">
                {pollutionDescription}
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Regional Contact</CardTitle>
                <CardDescription>
                  Environmental monitoring representative
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{stateData.representative}</p>
                    <p className="text-sm text-muted-foreground">Regional Representative</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{stateData.office}</p>
                    <p className="text-sm text-muted-foreground">Office Location</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{stateData.contact}</p>
                    <p className="text-sm text-muted-foreground">Contact Number</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metal Composition Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pollution Summary</CardTitle>
                <CardDescription>
                  Key heavy metal contributors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stateData.metals)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 4)
                    .map(([metal, value]) => (
                      <div key={metal} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{metal}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${(value / 40) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">
                            {value}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Metal Breakdown Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Heavy Metal Breakdown</CardTitle>
              <CardDescription>
                Detailed analysis of heavy metal pollution levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HMPIChart metals={stateData.metals} />
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Note:</strong> The Heavy Metal Pollution Index (HMPI) is calculated based on 
                  the concentration levels of six major heavy metals in environmental samples.
                </p>
                <p>
                  Values above 80 indicate critical pollution levels requiring immediate intervention, 
                  while values below 45 represent acceptable environmental conditions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegionModal;