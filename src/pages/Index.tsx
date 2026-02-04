import { useNavigate } from "react-router-dom";
import { Sprout, Droplets, Coins, CloudSun, ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProblemCard from "@/components/ProblemCard";
import Header from "@/components/Header";

const problems = [
  {
    icon: Sprout,
    title: "Low Crop Yield",
    description: "Not getting enough harvest from your land? Get expert advice on the right crop.",
    color: "leaf" as const,
  },
  {
    icon: Droplets,
    title: "Water Wastage",
    description: "Using too much or too little water? Learn the perfect irrigation schedule.",
    color: "water" as const,
  },
  {
    icon: Coins,
    title: "High Fertilizer Cost",
    description: "Spending too much on fertilizers? Know exactly what your soil needs.",
    color: "sun" as const,
  },
  {
    icon: CloudSun,
    title: "Weather Uncertainty",
    description: "Worried about rain or drought? Get early weather alerts for your area.",
    color: "warning" as const,
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="hero-gradient px-4 py-12 md:py-16">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-leaf rounded-full mb-6 shadow-lg">
            <Leaf className="w-14 h-14 text-primary-foreground" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Smart Farming Advice for Every Farmer
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Tell us about your soil and get personalized crop, water, and fertilizer guidance — all in simple language.
          </p>
        </div>
      </section>

      {/* Problems Section */}
      <section className="px-4 py-10 md:py-14">
        <div className="container mx-auto max-w-5xl">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
            Common Farmer Problems
          </h3>
          <p className="text-lg text-muted-foreground text-center mb-10">
            We understand your challenges. Our system helps you solve these:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, index) => (
              <ProblemCard
                key={index}
                icon={problem.icon}
                title={problem.title}
                description={problem.description}
                color={problem.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-2xl">
          <div className="farmer-card problem-gradient text-center p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Improve Your Farming?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Just answer a few simple questions about your soil and we'll give you expert advice.
            </p>
            <Button
              variant="farmer"
              size="xl"
              onClick={() => navigate("/input")}
              className="w-full sm:w-auto"
            >
              Get Smart Farming Advice
              <ArrowRight className="w-7 h-7" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-leaf/10 border-t border-border px-4 py-8">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf className="w-6 h-6 text-leaf" />
            <span className="text-lg font-semibold text-foreground">
              Smart Farm Advisor
            </span>
          </div>
          <p className="text-muted-foreground">
            Helping farmers make data-driven decisions for better yields.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
