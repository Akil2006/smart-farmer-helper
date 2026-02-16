import { useState, useRef, useCallback } from "react";
import {
  Bug,
  Upload,
  Camera,
  X,
  Loader2,
  AlertTriangle,
  ShieldCheck,
  ImageIcon,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface DetectionResult {
  name: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  description: string;
  remedy: string;
}

const severityConfig = {
  low: { color: "text-leaf", bg: "bg-leaf-light", label: "Low Risk" },
  medium: { color: "text-sun", bg: "bg-sun-light", label: "Medium Risk" },
  high: { color: "text-destructive", bg: "bg-destructive/10", label: "High Risk" },
};

const PestDetection = () => {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<DetectionResult[] | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please upload an image under 10MB.", variant: "destructive" });
      return;
    }
    setFileName(file.name);
    setResults(null);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const analyze = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("pest-detection", {
        body: { imageBase64: image },
      });

      if (error) {
        throw new Error(error.message || "Analysis failed");
      }

      if (data?.error) {
        toast({ title: "Analysis Error", description: data.error, variant: "destructive" });
        setIsAnalyzing(false);
        return;
      }

      setResults(data.detections || []);
    } catch (err: any) {
      console.error("Pest detection error:", err);
      toast({
        title: "Analysis Failed",
        description: err.message || "Could not analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setFileName("");
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-20 h-20 bg-destructive/10 rounded-full mb-4">
            <Bug className="w-10 h-10 text-destructive" />
            <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-sun animate-pulse" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
            Pest & Disease Detection
          </h2>
          <p className="text-lg text-muted-foreground">
            Upload a photo of your crop leaf — our AI will identify problems instantly
          </p>
        </div>

        {/* Upload Area */}
        {!image ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => fileRef.current?.click()}
            className={`relative cursor-pointer rounded-3xl border-3 border-dashed p-10 md:p-16 text-center transition-all duration-300 ${
              isDragging
                ? "border-leaf bg-leaf-light/50 scale-[1.02]"
                : "border-border bg-card hover:border-leaf/50 hover:bg-leaf-light/20"
            }`}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />

            <div className="space-y-5">
              <div className="mx-auto w-20 h-20 rounded-full bg-leaf-light flex items-center justify-center">
                <Upload className="w-10 h-10 text-leaf" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">
                  Drop your crop photo here
                </p>
                <p className="text-muted-foreground mt-1">
                  or click to browse — JPG, PNG up to 10MB
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button variant="farmer" size="sm" type="button">
                  <ImageIcon className="w-4 h-4" />
                  Choose File
                </Button>
                <Button variant="farmerOutline" size="sm" type="button">
                  <Camera className="w-4 h-4" />
                  Take Photo
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-border shadow-lg">
              <img
                src={image}
                alt="Uploaded crop"
                className="w-full max-h-[400px] object-cover"
              />
              <button
                onClick={reset}
                className="absolute top-3 right-3 w-10 h-10 bg-foreground/70 backdrop-blur-sm rounded-full flex items-center justify-center text-background hover:bg-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/60 to-transparent p-4">
                <p className="text-background text-sm font-medium truncate">
                  📎 {fileName}
                </p>
              </div>
            </div>

            {/* Analyze Button */}
            {!results && (
              <Button
                variant="farmer"
                size="xl"
                className="w-full"
                onClick={analyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Analyzing your crop…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    Detect Pests & Diseases
                  </>
                )}
              </Button>
            )}

            {/* Results */}
            {results && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-7 h-7 text-leaf" />
                  <h3 className="text-xl font-bold text-foreground">
                    Detection Results
                  </h3>
                </div>

                {results.length === 0 && (
                  <div className="farmer-card text-center py-8">
                    <ShieldCheck className="w-12 h-12 text-leaf mx-auto mb-3" />
                    <p className="text-lg font-bold text-foreground">No issues detected!</p>
                    <p className="text-muted-foreground">Your crop looks healthy.</p>
                  </div>
                )}

                {results.map((r, i) => {
                  const sev = severityConfig[r.severity];
                  return (
                    <div
                      key={i}
                      className="farmer-card border-l-8 overflow-hidden"
                      style={{
                        borderLeftColor:
                          r.severity === "high"
                            ? "hsl(var(--danger-red))"
                            : r.severity === "medium"
                            ? "hsl(var(--sun-gold))"
                            : "hsl(var(--leaf-green))",
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className={`w-6 h-6 ${sev.color}`} />
                          <h4 className="text-lg font-bold text-foreground">
                            {r.name}
                          </h4>
                        </div>
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${sev.bg} ${sev.color}`}
                        >
                          {sev.label}
                        </span>
                      </div>

                      {/* Confidence Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Confidence</span>
                          <span className="font-bold text-foreground">{r.confidence}%</span>
                        </div>
                        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-leaf transition-all duration-1000"
                            style={{ width: `${r.confidence}%` }}
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm mb-4">{r.description}</p>

                      {/* Remedy */}
                      <div className="bg-leaf-light/50 rounded-2xl p-4">
                        <p className="text-sm font-bold text-leaf mb-1">
                          💊 Recommended Treatment
                        </p>
                        <p className="text-sm text-foreground">{r.remedy}</p>
                      </div>
                    </div>
                  );
                })}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="farmerSecondary"
                    size="lg"
                    className="flex-1"
                    onClick={reset}
                  >
                    <Camera className="w-5 h-5" />
                    Scan Another
                  </Button>
                  <Button
                    variant="farmerOutline"
                    size="lg"
                    className="flex-1"
                    onClick={() => window.history.back()}
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default PestDetection;
