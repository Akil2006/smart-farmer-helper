import { LucideIcon } from "lucide-react";

interface ProblemCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "leaf" | "sun" | "water" | "warning";
}

const colorClasses = {
  leaf: "bg-leaf-light text-leaf",
  sun: "bg-sun-light text-sun",
  water: "bg-water-light text-water",
  warning: "bg-sun-light text-warning",
};

const ProblemCard = ({ icon: Icon, title, description, color }: ProblemCardProps) => {
  return (
    <div className="farmer-card flex flex-col items-center text-center space-y-4 p-6">
      <div className={`icon-circle ${colorClasses[color]}`}>
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-farmer-lg text-foreground">{title}</h3>
      <p className="text-farmer-base text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ProblemCard;
