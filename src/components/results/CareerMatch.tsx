
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import type { CareerMatch as CareerMatchType } from '../../hooks/useAssessment';

interface CareerMatchCardProps {
  careerMatch: CareerMatchType;
  index: number;
}

const CareerMatchCard: React.FC<CareerMatchCardProps> = ({ careerMatch, index }) => {
  const isTopMatch = index === 0;
  
  return (
    <Card 
      className={`
        overflow-hidden transition-all card-hover
        ${isTopMatch ? 'border-primary/50 bg-primary/5' : ''}
      `}
    >
      {isTopMatch && (
        <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 text-center">
          Top Match
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{careerMatch.clusterName}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <span className="font-medium text-foreground">{careerMatch.score}% Match</span>
            </CardDescription>
          </div>
        </div>
        <Progress value={careerMatch.score} className="h-1.5 mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{careerMatch.description}</p>
        
        <div>
          <h4 className="text-sm font-medium mb-1.5">Potential Careers</h4>
          <div className="flex flex-wrap gap-1.5">
            {careerMatch.careers.map((career) => (
              <div 
                key={career} 
                className="text-xs bg-secondary text-secondary-foreground rounded-full px-2.5 py-1"
              >
                {career}
              </div>
            ))}
          </div>
        </div>
        
        {careerMatch.resources.length > 0 && (
          <>
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-2">Resources</h4>
              <div className="space-y-1.5">
                {careerMatch.resources.map((resource) => (
                  <Button 
                    key={resource.title} 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-sm font-normal"
                    asChild
                  >
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <span className="mr-auto">{resource.title}</span>
                      <ExternalLink className="h-3 w-3 ml-2 flex-shrink-0" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CareerMatchCard;
