import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `You are an expert agricultural plant pathologist and entomologist. Analyze crop images to detect pests and diseases.

ALWAYS respond with a JSON array of detected issues. Each item must have:
- "name": string (pest or disease name)
- "confidence": number (0-100, your confidence percentage)
- "severity": "low" | "medium" | "high"
- "description": string (what it is and how it affects the crop, 1-2 sentences)
- "remedy": string (actionable treatment steps, 2-3 sentences)

If the image shows a healthy plant with no issues, return:
[{"name":"Healthy Plant","confidence":95,"severity":"low","description":"No visible signs of pests or diseases detected. The plant appears healthy.","remedy":"Continue regular care. Monitor regularly for any changes."}]

If the image is not a plant/crop, return:
[{"name":"Not a Plant Image","confidence":100,"severity":"low","description":"The uploaded image does not appear to be a plant or crop.","remedy":"Please upload a clear photo of a plant leaf or crop for analysis."}]

Return ONLY the JSON array, no markdown or extra text.`,
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Analyze this crop image for pests and diseases. Return the JSON array.",
                },
                {
                  type: "image_url",
                  image_url: { url: imageBase64 },
                },
              ],
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "report_pest_detection",
                description: "Report detected pests and diseases from crop image analysis",
                parameters: {
                  type: "object",
                  properties: {
                    detections: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          confidence: { type: "number" },
                          severity: { type: "string", enum: ["low", "medium", "high"] },
                          description: { type: "string" },
                          remedy: { type: "string" },
                        },
                        required: ["name", "confidence", "severity", "description", "remedy"],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: ["detections"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "report_pest_detection" } },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits in Settings." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error("AI analysis failed");
    }

    const data = await response.json();

    // Extract from tool call
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    let detections: any[] = [];

    if (toolCall?.function?.arguments) {
      const parsed = JSON.parse(toolCall.function.arguments);
      detections = parsed.detections || [];
    } else {
      // Fallback: try parsing content directly
      const content = data.choices?.[0]?.message?.content || "[]";
      const cleaned = content.replace(/```json\n?|\n?```/g, "").trim();
      detections = JSON.parse(cleaned);
    }

    return new Response(JSON.stringify({ detections }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("pest-detection error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
