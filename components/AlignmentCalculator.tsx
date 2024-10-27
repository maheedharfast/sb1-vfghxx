"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';

const AlignmentCalculator = () => {
  const [inputs, setInputs] = useState({
    diameter: 675,
    length: 1464,
    pgbValues: ['0', '0', '0', '0', '0', '0', '0', '0'],
    ugbValues: ['0', '0', '0', '0', '0', '0', '0', '0']
  });

  const [results, setResults] = useState({
    resultantR: 0,
    runout: 0,
    angle: 0,
    shimThickness: 0
  });

  const calculateResults = () => {
    const differences = inputs.pgbValues.map((pgb, index) => 
      Number(inputs.ugbValues[index]) - Number(pgb)
    );

    let sumX = 0;
    let sumY = 0;
    
    differences.forEach((diff, index) => {
      const angle = (index * 45) * (Math.PI / 180);
      sumX += diff * Math.cos(angle);
      sumY += diff * Math.sin(angle);
    });

    const resultantR = Math.sqrt(Math.pow(sumX, 2) + Math.pow(sumY, 2));
    const runout = resultantR / 2;
    const angle = Math.atan2(sumY, sumX) * (180 / Math.PI);
    const normalizedAngle = angle < 0 ? angle + 360 : angle;
    const shimThickness = (inputs.diameter * runout * 0.01) / inputs.length;

    setResults({
      resultantR: resultantR.toFixed(3),
      runout: runout.toFixed(3),
      angle: normalizedAngle.toFixed(2),
      shimThickness: shimThickness.toFixed(4)
    });
  };

  const handlePGBChange = (index: number, value: string) => {
    const newValues = [...inputs.pgbValues];
    newValues[index] = value;
    setInputs({ ...inputs, pgbValues: newValues });
  };

  const handleUGBChange = (index: number, value: string) => {
    const newValues = [...inputs.ugbValues];
    newValues[index] = value;
    setInputs({ ...inputs, ugbValues: newValues });
  };

  return (
    <Card className="w-full shadow-xl bg-white/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-slate-50/50">
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Calculator className="w-6 h-6" />
          Combined Alignment Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Diameter (mm)</Label>
              <Input
                type="number"
                value={inputs.diameter}
                onChange={(e) => setInputs({ ...inputs, diameter: Number(e.target.value) })}
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Length (mm)</Label>
              <Input
                type="number"
                value={inputs.length}
                onChange={(e) => setInputs({ ...inputs, length: Number(e.target.value) })}
                className="bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label className="block text-sm font-semibold text-slate-800">PGB Values</Label>
              <div className="grid grid-cols-2 gap-4">
                {inputs.pgbValues.map((value, index) => (
                  <div key={`pgb-${index}`} className="space-y-1">
                    <Label className="text-xs text-slate-600">{`${index * 45}°`}</Label>
                    <Input
                      type="number"
                      value={value}
                      onChange={(e) => handlePGBChange(index, e.target.value)}
                      className="bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <Label className="block text-sm font-semibold text-slate-800">UGB Values</Label>
              <div className="grid grid-cols-2 gap-4">
                {inputs.ugbValues.map((value, index) => (
                  <div key={`ugb-${index}`} className="space-y-1">
                    <Label className="text-xs text-slate-600">{`${index * 45}°`}</Label>
                    <Input
                      type="number"
                      value={value}
                      onChange={(e) => handleUGBChange(index, e.target.value)}
                      className="bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-slate-800 hover:bg-slate-700 text-white"
            onClick={calculateResults}
          >
            Calculate Results
          </Button>

          <div className="mt-6 space-y-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
            <h3 className="font-bold text-lg text-slate-800">Calculation Results</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label className="text-sm text-slate-600">Resultant (R)</Label>
                <div className="text-lg font-semibold text-slate-800">{results.resultantR} mm</div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm text-slate-600">Runout</Label>
                <div className="text-lg font-semibold text-slate-800">{results.runout} mm</div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm text-slate-600">Angle</Label>
                <div className="text-lg font-semibold text-slate-800">{results.angle}°</div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm text-slate-600">Shim Thickness</Label>
                <div className="text-lg font-semibold text-slate-800">{results.shimThickness} mm</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlignmentCalculator;