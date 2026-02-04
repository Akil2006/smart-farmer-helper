import { useLocation, useNavigate } from "react-router-dom";
import {
  Leaf,
  Droplets,
  Beaker,
  CloudRain,
  AlertTriangle,
  CheckCircle,
  Home,
  RotateCcw,
} from "lucide-react";
import Header from "@/components/Header";
import RecommendationCard from "@/components/RecommendationCard";
import { Button } from "@/components/ui/button";

interface FormData {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  ph: string;
  location: string;
  season: string;
}

// Mock recommendation logic based on inputs
const getRecommendations = (data: FormData) => {
  const n = parseFloat(data.nitrogen) || 0;
  const p = parseFloat(data.phosphorus) || 0;
  const k = parseFloat(data.potassium) || 0;
  const ph = parseFloat(data.ph) || 6.5;

  // Crop recommendation based on NPK and pH
  let crop = "Rice";
  let cropDetails = "Ideal for monsoon season with high nitrogen soil.";

  if (data.season === "rabi") {
    if (n > 40 && p > 30) {
      crop = "Wheat";
      cropDetails = "Perfect match for your soil and winter season. Expected yield: 4-5 tonnes/hectare.";
    } else if (p > 40) {
      crop = "Chickpea (Chana)";
      cropDetails = "Good for phosphorus-rich soil. Nitrogen-fixing crop that improves soil health.";
    } else {
      crop = "Mustard";
      cropDetails = "Suitable for moderate nutrient levels. Good oil crop for winter.";
    }
  } else if (data.season === "kharif") {
    if (n > 50 && k > 40) {
      crop = "Sugarcane";
      cropDetails = "High nutrient soil perfect for sugarcane. Long-term profitable crop.";
    } else if (n > 35) {
      crop = "Rice";
      cropDetails = "Monsoon season and nitrogen-rich soil ideal for paddy cultivation.";
    } else {
      crop = "Soybean";
      cropDetails = "Good for moderate nitrogen soil. Improves soil fertility.";
    }
  } else {
    if (k > 50) {
      crop = "Watermelon";
      cropDetails = "Summer fruit with high market demand. Needs good potassium.";
    } else {
      crop = "Cucumber";
      cropDetails = "Quick growing summer vegetable with good returns.";
    }
  }

  // Irrigation guidance
  let irrigation = "Moderate watering";
  let irrigationDetails = "Water every 3-4 days during active growth.";

  if (data.season === "kharif") {
    irrigation = "Reduce artificial irrigation";
    irrigationDetails = "Monsoon provides natural water. Ensure proper drainage to prevent waterlogging.";
  } else if (data.season === "zaid") {
    irrigation = "Daily light watering";
    irrigationDetails = "Summer heat requires frequent watering. Best time: early morning or evening.";
  }

  // Fertilizer advice based on current NPK levels
  let fertilizer = "Balanced NPK fertilizer";
  let fertilizerDetails = "";

  if (n < 30) {
    fertilizer = "Apply Urea fertilizer";
    fertilizerDetails = `Soil nitrogen is low (${n} kg/ha). Apply 50-60 kg Urea per hectare.`;
  } else if (p < 25) {
    fertilizer = "Apply DAP fertilizer";
    fertilizerDetails = `Phosphorus is low (${p} kg/ha). Apply 40-50 kg DAP per hectare.`;
  } else if (k < 30) {
    fertilizer = "Apply Potash (MOP)";
    fertilizerDetails = `Potassium is low (${k} kg/ha). Apply 30-40 kg MOP per hectare.`;
  } else {
    fertilizer = "Maintain current levels";
    fertilizerDetails = "Your soil nutrients are balanced. Apply light organic manure for maintenance.";
  }

  // pH adjustment
  if (ph < 5.5) {
    fertilizerDetails += " Note: Soil is acidic - apply lime to raise pH.";
  } else if (ph > 8.0) {
    fertilizerDetails += " Note: Soil is alkaline - apply gypsum to lower pH.";
  }

  // Weather alerts (mock data)
  const alerts = [];
  if (data.season === "kharif") {
    alerts.push({
      type: "rain",
      message: "Heavy Rain Expected",
      details: "Prepare drainage channels. Avoid fertilizer application for next 3 days.",
    });
  }
  if (data.season === "zaid") {
    alerts.push({
      type: "heat",
      message: "Heat Wave Warning",
      details: "Increase watering frequency. Consider mulching to retain soil moisture.",
    });
  }

  return {
    crop,
    cropDetails,
    irrigation,
    irrigationDetails,
    fertilizer,
    fertilizerDetails,
    alerts,
  };
};

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state as FormData;

  // Redirect to input page if no data
  if (!formData) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-6">
            <AlertTriangle className="w-20 h-20 text-warning mx-auto" />
            <h2 className="text-2xl font-bold text-foreground">
              No Data Found
            </h2>
            <p className="text-lg text-muted-foreground">
              Please fill in your soil details first.
            </p>
            <Button
              variant="farmer"
              size="lg"
              onClick={() => navigate("/input")}
            >
              Go to Input Form
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const recommendations = getRecommendations(formData);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-leaf-light rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-leaf" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Your Farming Advice is Ready!
          </h2>
          <p className="text-lg text-muted-foreground">
            Based on your soil and season, here's what we recommend
          </p>
        </div>

        {/* Recommendations */}
        <div className="space-y-6">
          {/* Crop Recommendation */}
          <RecommendationCard
            icon={Leaf}
            title="Best Crop for You"
            mainText={recommendations.crop}
            details={recommendations.cropDetails}
            color="leaf"
          />

          {/* Irrigation Guidance */}
          <RecommendationCard
            icon={Droplets}
            title="Water Management"
            mainText={recommendations.irrigation}
            details={recommendations.irrigationDetails}
            color="water"
          />

          {/* Fertilizer Advice */}
          <RecommendationCard
            icon={Beaker}
            title="Fertilizer Advice"
            mainText={recommendations.fertilizer}
            details={recommendations.fertilizerDetails}
            color="sun"
          />

          {/* Weather Alerts */}
          {recommendations.alerts.map((alert, index) => (
            <RecommendationCard
              key={index}
              icon={CloudRain}
              title="Weather Alert"
              mainText={alert.message}
              details={alert.details}
              color="warning"
              isAlert
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-10 space-y-4">
          <Button
            variant="farmerSecondary"
            size="xl"
            className="w-full"
            onClick={() => navigate("/input")}
          >
            <RotateCcw className="w-6 h-6" />
            Try Different Values
          </Button>

          <Button
            variant="farmerOutline"
            size="lg"
            className="w-full"
            onClick={() => navigate("/")}
          >
            <Home className="w-6 h-6" />
            Back to Home
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;
