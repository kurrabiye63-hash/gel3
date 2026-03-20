import { fal } from "./falClient";

export interface VideoGenerationParams {
  imageUrl: string;
  duration?: number;
}

// PREMIUM FASHION FILM SYSTEM — VIDEO VERSION
// Locked master prompt for all video generations
export const VIDEO_LOCKED_PROMPT = `Use the provided input image as the visual reference for the outfit, styling, and studio mood.

Create a premium high-end fashion film in a clean seamless infinity studio. Keep the outfit design, garment structure, silhouette, styling logic, fabric appearance, surface character, drape behavior, and overall visual integrity consistent with the reference image. Do not redesign the outfit. Do not add or remove design elements. Do not alter the garment's cut, length, proportions, color family, texture impression, or styling details.

Keep the studio environment minimal and elegant, matching the same clean infinity backdrop feeling. No props, no additional objects, no environmental transformation, no extra wardrobe items.

The model should remain visually consistent with the reference image in overall presentation, styling continuity, and fashion pose logic, while preserving a natural editorial fashion-film look. Maintain a refined, realistic, professional luxury campaign aesthetic.

The framing must work in both vertical and horizontal output formats. Adapt composition intelligently to the chosen format while preserving full garment readability, elegant proportions, and premium fashion presentation.

Style: luxury fashion campaign film, premium editorial, hyper-real, cinematic, clean, modern, controlled, sophisticated.
Lighting: soft professional studio lighting, flattering and balanced, subtle highlights on the garment, realistic skin tones, refined contrast, high-end fashion photography quality.
Motion: graceful, minimal, editorial model movement only. No exaggerated acting. No distortion. No unrealistic garment motion. No sudden pose jumps. Preserve natural fabric behavior and polished fashion presence.

Duration: 8 seconds total

SHOT 1 | 0.0s to 2.6s
Wide establishing fashion shot.
Camera performs a slow, elegant dolly-in.
The model makes a subtle weight shift and a minimal pose transition suitable for a luxury editorial fashion film.
Keep the garment clearly visible and visually consistent.

SHOT 2 | 2.6s to 5.2s
Medium fashion shot.
Camera performs a gentle orbit move around the model, approximately 15 to 20 degrees, with refined and stable motion.
The model adds a soft shoulder turn and delicate hand movement.
Preserve the garment's silhouette, drape, styling, and overall visual continuity.

SHOT 3 | 5.2s to 8.0s
Closer hero fashion shot.
Camera slowly pushes in with subtle floating elegance, ending on a premium campaign-style final frame.
The model holds a calm, confident, editorial expression with a refined final micro-pose.
Keep the outfit readable and visually faithful to the reference.

Constraints:
- Keep the outfit visually faithful to the reference
- Preserve the same garment design language and styling continuity
- Do not change the fabric impression, color family, structure, or silhouette
- No extra accessories
- No background changes
- No flicker
- No warping
- No anatomy distortion
- No random garment mutation
- No dramatic effects that distract from the product
- Keep the fashion presentation elegant, minimal, realistic, and premium

Overall result:
A polished, globally acceptable luxury fashion film with industry-standard camera language, designed to present the referenced outfit in a clean professional infinity studio with maximum product clarity and premium editorial impact.`;

export const generateVideoFromImage = async (
  params: VideoGenerationParams,
  onUpdate?: (msg: string) => void
): Promise<string> => {
  const { imageUrl, duration = 8 } = params;

  // Using Veo 3.1 (Standard) for higher reliability with complex prompts
  const result = await fal.subscribe("fal-ai/veo3.1/image-to-video", {
    input: {
      prompt: VIDEO_LOCKED_PROMPT,
      image_url: imageUrl,
      duration: duration, // Use number instead of "8s"
      aspect_ratio: "9:16",
      resolution: "720p",
      auto_fix: true // Automatically fix prompt issues
    } as any,
    logs: true,
    onQueueUpdate: (update: any) => {
      if (update.status === "IN_PROGRESS" && onUpdate) {
        const lastLog = update.logs?.[update.logs.length - 1]?.message;
        if (lastLog) {
          if (lastLog.includes("Initializing")) onUpdate("Motor Başlatılıyor...");
          else if (lastLog.includes("Processing")) onUpdate("Video Sentezleniyor...");
          else if (lastLog.includes("Uploading")) onUpdate("Video Hazırlanıyor...");
          else onUpdate(lastLog);
        }
      }
    },
  });

  // Comprehensive response parsing for various fal.ai formats
  const data = (result as any).data || result;
  
  if (data?.video?.url) return data.video.url;
  if (data?.video_url) return data.video_url;
  if (data?.url) return data.url;
  
  // Some models return in a different structure
  if (Array.isArray(data?.videos) && data.videos[0]?.url) return data.videos[0].url;
  if (Array.isArray(data?.images) && data.images[0]?.url) return data.images[0].url;

  throw new Error("Video URL bulunamadı. API yanıtını kontrol edin.");
};
