import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Zap, ArrowLeft, ArrowRight } from 'lucide-react';

interface QuestionCardProps {
  question: {
    text: string;
    options: { text: string }[];
  };
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer?: number;
  onAnswer: (optionIndex: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onAuto?: () => void;
  progress: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrevious,
  onSkip,
  onAuto,
  progress
}) => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="pt-6">
        {/* Progress bar */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <div className="text-sm text-muted-foreground text-center mt-2">
            {Math.round(progress)}% Complete
          </div>
        </div>

        {/* Question header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-lg font-semibold text-primary">
              Career Interest
            </div>
          </div>
          <div className="text-sm text-muted-foreground mb-2">
            Question {currentIndex + 1} of {totalQuestions}
          </div>
        </div>

        {/* Question text */}
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-6">{question.text}</h3>
        </div>

        {/* Options */}
        <RadioGroup 
          value={selectedAnswer?.toString()} 
          onValueChange={(value) => onAnswer(parseInt(value))}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 bg-background p-4 rounded-md border hover:bg-accent/50 transition-colors">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label 
                htmlFor={`option-${index}`} 
                className="flex-grow cursor-pointer font-medium"
              >
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>

      <CardFooter className="flex justify-between pt-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
        </div>
        <div className="flex gap-2">
          {onAuto && (
            <Button
              variant="outline"
              onClick={onAuto}
              className="gap-2"
            >
              <Zap className="h-4 w-4" />
              Auto
            </Button>
          )}
          <Button
            variant="outline"
            onClick={onSkip}
          >
            Skip
          </Button>
          <Button
            onClick={onNext}
            disabled={selectedAnswer === undefined}
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
