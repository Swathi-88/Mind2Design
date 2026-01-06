/**
 * OpenAI Image Generation Service
 */

export const generateImage = async (prompt, apiKey) => {
    if (!apiKey) throw new Error("API Key is missing");

    const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "dall-e-3", // Latest high-quality model
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: "url",
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Generation failed");
    }

    const data = await response.json();
    return data.data[0].url;
};
