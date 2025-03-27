
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface GradeLevelSelectorProps {
  selectedGrade: string;
  onSelectGrade: (grade: string) => void;
  includeHighSchool?: boolean;
}

const GradeLevelSelector: React.FC<GradeLevelSelectorProps> = ({ 
  selectedGrade, 
  onSelectGrade,
  includeHighSchool = true
}) => {
  return (
    <div className="w-full">
      <Label className="mb-2 block">Select your grade level:</Label>
      <RadioGroup value={selectedGrade} onValueChange={onSelectGrade} className="flex flex-col space-y-2">
        {includeHighSchool && (
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="11-12" id="11-12" />
            <Label htmlFor="11-12" className="font-normal cursor-pointer">Grade 11-12 (Higher Secondary)</Label>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="8" id="option-8" />
          <Label htmlFor="option-8" className="font-normal cursor-pointer">Grade 8</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="9" id="option-9" />
          <Label htmlFor="option-9" className="font-normal cursor-pointer">Grade 9</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="10" id="option-10" />
          <Label htmlFor="option-10" className="font-normal cursor-pointer">Grade 10</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default GradeLevelSelector;
