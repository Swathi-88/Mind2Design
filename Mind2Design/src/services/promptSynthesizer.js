/**
 * PromptSynthesizer.js
 * Uses an LLM to "synthesize" a high-quality, culturally accurate image generation prompt.
 * This acts as the "ML algorithm" requested by the user to optimize prompts based on specific niches.
 */

export const synthesizePrompt = async (jobType, intent, apiKey) => {
    if (!apiKey) throw new Error("API Key is missing for prompt synthesis");

    const systemPrompt = `You are an expert South Indian graphic designer specializing in local shop boards, festival posters, and obituary designs. 
Your task is to translate user preferences into a highly detailed and effective image generation prompt for DALL-E 3. 
The prompts should capture the "local shop" aesthetic—vibrant, clear, and culturally accurate for South India (Tamil Nadu, Kerala, Karnataka, Andhra). 
Use specific design keywords like "Flex Banner style", "Offset printing aesthetics", "South Indian typography", "vibrant color palettes", and "cultural motifs".
Avoid corporate minimalism. Focus on "natural designs" that look like they were made by a local professional graphic designer for printing.
The prompt should be in English.`;

    const userContext = `
Job Type: ${jobType?.id} (${jobType?.title_en})
Occasion/Business Name: ${intent.customOccasion || intent.occasion || intent.businessType || 'General'}
Style: ${intent.style}
Design Mode: ${intent.designMode === 'ai' ? 'Artistic AI' : 'Photorealistic/Professional'}
Theme Color: ${intent.themeColor || 'Default vibrant'}
Include People: ${intent.includePeople ? 'Yes' : 'No'}
Specific Text: ${intent.specificText || 'None'}
Category Specific Answer: ${intent.categoryAnswer || 'N/A'}
Reference Image Logic: ${intent.useReferenceImage ? 'ON' : 'OFF'}
Extra Notes: ${intent.extraNote || 'None'}
Technical Words: ${intent.techWords || '300 DPI, High Resolution'}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-4o", // Using a powerful model to synthesize the prompt
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Generate a detailed DALL-E 3 prompt based on this user intent: ${userContext}. Return ONLY the prompt text.` }
            ],
            temperature: 0.7,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Prompt synthesis failed");
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
};
