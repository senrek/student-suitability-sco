
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import type { Question } from '../../utils/mockData';

interface AptitudeQuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer?: number;
  onAnswer: (optionIndex: number) => void;
  onNext: () => void;
}

const AptitudeQuestionCard: React.FC<AptitudeQuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  onNext,
}) => {
  const [selected, setSelected] = useState<number | undefined>(selectedAnswer);

  const handleSelect = (value: string) => {
    const index = parseInt(value);
    setSelected(index);
  };

  const handleSubmit = () => {
    if (selected !== undefined) {
      onAnswer(selected);
    } else {
      onNext();
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-medium">
              Question {currentIndex + 1} of {totalQuestions}
            </h3>
            <p className="text-muted-foreground text-sm">
              Select the correct answer below
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="text-lg mb-6">{question.text}</p>
              
              {question.imageUrl && (
                <div className="mb-6 flex justify-center">
                  <img 
                    src={question.imageUrl} 
                    alt="Question visual" 
                    className="max-w-full h-auto max-h-64 object-contain rounded-md"
                  />
                </div>
              )}

              <RadioGroup 
                value={selected?.toString()} 
                onValueChange={handleSelect}
                className="space-y-3"
              >
                {question.options.map((option, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-2 p-3 rounded-md border 
                      ${selected === index ? 'border-primary bg-primary/5' : 'border-border'}`}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer font-normal"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 border-t flex justify-end">
        <Button onClick={handleSubmit} className="w-full sm:w-auto space-x-1">
          <span>{selected !== undefined ? 'Submit Answer' : 'Skip Question'}</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AptitudeQuestionCard;
