import { LucideIcon } from "lucide-react";

interface RecommendationCardProps {
  icon: LucideIcon;
  title: string;
  mainText: string;
  details?: string;
  color: "leaf" | "sun" | "water" | "warning";
  isAlert?: boolean;
}

const colorClasses = {
  leaf: "bg-leaf-light border-leaf",
  sun: "bg-sun-light border-sun",
  water: "bg-water-light border-water",
  warning: "bg-sun-light border-warning",
};

const iconColorClasses = {
  leaf: "bg-leaf text-primary-foreground",
  sun: "bg-sun text-foreground",
  water: "bg-water text-primary-foreground",
  warning: "bg-warning text-primary-foreground",
};

const RecommendationCard = ({
  icon: Icon,
  title,
  mainText,
  details,
  color,
  isAlert = false,
}: RecommendationCardProps) => {
  return (
    <div
      className={`farmer-card border-l-8 ${colorClasses[color]} ${
        isAlert ? "animate-pulse" : ""
      }`}
    >
      <div className="flex items-start gap-5">
        <div className={`icon-circle shrink-0 ${iconColorClasses[color]}`}>
          <Icon className="w-10 h-10" />
        </div>
        <div className="space-y-2 flex-1">
          <h3 className="text-farmer-lg text-foreground">{title}</h3>
          <p className="text-farmer-xl text-foreground">{mainText}</p>
          {details && (
            <p className="text-farmer-base text-muted-foreground mt-2">
              {details}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
