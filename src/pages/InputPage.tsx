import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Send } from "lucide-react";
import Header from "@/components/Header";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import { Button } from "@/components/ui/button";

const seasonOptions = [
  { value: "kharif", label: "Kharif (Monsoon - June to Oct)" },
  { value: "rabi", label: "Rabi (Winter - Nov to March)" },
  { value: "zaid", label: "Zaid (Summer - March to June)" },
];

const districtOptions = [
  { value: "pune", label: "Pune" },
  { value: "nashik", label: "Nashik" },
  { value: "nagpur", label: "Nagpur" },
  { value: "kolhapur", label: "Kolhapur" },
  { value: "aurangabad", label: "Aurangabad" },
  { value: "solapur", label: "Solapur" },
  { value: "other", label: "Other District" },
];

const InputPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    location: "",
    season: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass form data to results page
    navigate("/results", { state: formData });
  };

  const updateField = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    formData.nitrogen &&
    formData.phosphorus &&
    formData.potassium &&
    formData.ph &&
    formData.location &&
    formData.season;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-leaf-light rounded-full mb-4">
            <Leaf className="w-10 h-10 text-leaf" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Tell Us About Your Soil
          </h2>
          <p className="text-lg text-muted-foreground">
            Enter your soil details to get personalized advice
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Soil Nutrients Section */}
          <div className="farmer-card space-y-6">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="w-8 h-8 bg-leaf text-primary-foreground rounded-full flex items-center justify-center text-sm">
                1
              </span>
              Soil Nutrients
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput
                id="nitrogen"
                label="Nitrogen (N)"
                helperText="Amount of nitrogen in your soil (0-150 kg/ha)"
                placeholder="e.g., 45"
                type="number"
                value={formData.nitrogen}
                onChange={updateField("nitrogen")}
                min={0}
                max={150}
              />

              <FormInput
                id="phosphorus"
                label="Phosphorus (P)"
                helperText="Amount of phosphorus in soil (0-150 kg/ha)"
                placeholder="e.g., 35"
                type="number"
                value={formData.phosphorus}
                onChange={updateField("phosphorus")}
                min={0}
                max={150}
              />

              <FormInput
                id="potassium"
                label="Potassium (K)"
                helperText="Amount of potassium in soil (0-200 kg/ha)"
                placeholder="e.g., 60"
                type="number"
                value={formData.potassium}
                onChange={updateField("potassium")}
                min={0}
                max={200}
              />
            </div>

            <FormInput
              id="ph"
              label="Soil pH Value"
              helperText="pH level of your soil (4.5 to 9.0)"
              placeholder="e.g., 6.5"
              type="number"
              value={formData.ph}
              onChange={updateField("ph")}
              min={4.5}
              max={9}
              step={0.1}
            />
          </div>

          {/* Location Section */}
          <div className="farmer-card space-y-6">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="w-8 h-8 bg-sun text-foreground rounded-full flex items-center justify-center text-sm">
                2
              </span>
              Location & Season
            </h3>

            <FormSelect
              id="location"
              label="Your District"
              helperText="Select the district where your farm is located"
              placeholder="Choose your district"
              options={districtOptions}
              value={formData.location}
              onChange={updateField("location")}
            />

            <FormSelect
              id="season"
              label="Current Season"
              helperText="Which crop season are you planning for?"
              placeholder="Choose the season"
              options={seasonOptions}
              value={formData.season}
              onChange={updateField("season")}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="farmer"
            size="xl"
            className="w-full"
            disabled={!isFormValid}
          >
            <Send className="w-7 h-7" />
            Get My Farming Advice
          </Button>
        </form>
      </main>
    </div>
  );
};

export default InputPage;
