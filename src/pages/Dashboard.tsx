import { useNavigate } from "react-router-dom";
import {
  Bug,
  Leaf,
  CloudSun,
  Droplets,
  BarChart3,
  Sprout,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import Header from "@/components/Header";

const dashboardItems = [
  {
    icon: Bug,
    title: "Pest & Disease Detection",
    description: "Upload a photo of your crop to identify pests and diseases instantly.",
    color: "from-red-500/20 to-orange-500/20",
    iconBg: "bg-destructive",
    border: "border-destructive/30",
    link: "/pest-detection",
    badge: "AI Powered",
  },
  {
    icon: Leaf,
    title: "Crop Advisor",
    description: "Get personalized crop recommendations based on your soil data.",
    color: "from-emerald-500/20 to-green-500/20",
    iconBg: "bg-leaf",
    border: "border-leaf/30",
    link: "/input",
    badge: null,
  },
  {
    icon: CloudSun,
    title: "Weather Alerts",
    description: "Real-time weather updates and forecasts for your farm location.",
    color: "from-amber-500/20 to-yellow-500/20",
    iconBg: "bg-sun",
    border: "border-sun/30",
    link: "/input",
    badge: "Coming Soon",
  },
  {
    icon: Droplets,
    title: "Irrigation Planner",
    description: "Smart watering schedules based on crop type and weather patterns.",
    color: "from-blue-500/20 to-cyan-500/20",
    iconBg: "bg-water",
    border: "border-water/30",
    link: "/input",
    badge: null,
  },
];

const stats = [
  { label: "Crops Analyzed", value: "1,240+", icon: Sprout, trend: "+12%" },
  { label: "Pests Identified", value: "350+", icon: Bug, trend: "+8%" },
  { label: "Yield Improvement", value: "24%", icon: TrendingUp, trend: "+3%" },
  { label: "Active Farms", value: "580", icon: BarChart3, trend: "+15%" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
            Farm Dashboard
          </h2>
          <p className="text-lg text-muted-foreground">
            Your smart farming command center — manage crops, detect threats, and grow smarter.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="farmer-card flex items-center gap-4 p-5 hover:shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-leaf-light flex items-center justify-center shrink-0">
                <stat.icon className="w-6 h-6 text-leaf" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-foreground leading-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
              <span className="ml-auto text-xs font-bold text-leaf bg-leaf-light px-2 py-1 rounded-full hidden sm:inline">
                {stat.trend}
              </span>
            </div>
          ))}
        </div>

        {/* Feature Cards Grid */}
        <h3 className="text-xl font-bold text-foreground mb-5">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboardItems.map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.link)}
              className={`group relative overflow-hidden rounded-3xl border-2 ${item.border} bg-gradient-to-br ${item.color} p-6 md:p-8 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]`}
            >
              {/* Badge */}
              {item.badge && (
                <span className="absolute top-4 right-4 text-xs font-bold uppercase tracking-wider bg-foreground/10 text-foreground px-3 py-1 rounded-full backdrop-blur-sm">
                  {item.badge}
                </span>
              )}

              <div className="flex items-start gap-5">
                <div
                  className={`${item.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shrink-0 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
                >
                  <item.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xl font-bold text-foreground mb-1">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Arrow indicator */}
              <div className="flex justify-end mt-4">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center transition-all duration-300 group-hover:bg-foreground/10 group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5 text-foreground/60" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
