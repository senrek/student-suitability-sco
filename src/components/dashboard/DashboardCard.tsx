
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  children: ReactNode;
  footer?: ReactNode;
  onCardClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  children,
  footer,
  onCardClick
}) => {
  return (
    <Card 
      className={cn("overflow-hidden transition-all card-hover", 
        onCardClick && "cursor-pointer",
        className
      )}
      onClick={onCardClick}
    >
      <CardHeader className={cn("pb-3", headerClassName)}>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={cn("", contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn("pt-1 border-t", footerClassName)}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default DashboardCard;
