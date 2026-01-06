/**
 * PromptCompiler.js
 * Converts UI-based design intent into a structured English prompt for AI.
 */

const STYLE_MAPPINGS = {
    traditional: "traditional Indian art style, intricate details, cultural motifs",
    modern: "clean modern look, sleek typography, minimalist aesthetic",
    cartoon: "playful cartoon illustration, bright colors, friendly characters",
    luxury: "premium high-end feel, gold accents, elegant gradients",
    minimal: "minimalist design, lots of whitespace, simple geometric shapes",
    rural: "folk art style, rustic textures, village life elements"
};

const MOOD_MAPPINGS = {
    bright: "high saturation, vivid colors, high contrast",
    warm: "warm color palette, red and gold tones, welcoming glow",
    calm: "muted soft colors, peaceful atmosphere, respectful tones",
    festive: "vibrant festive colors, sparkling elements, celebratory mood"
};

/**
 * Compiles the user's intent selections into a professional English prompt.
 */
export const compilePrompt = (jobType, intent) => {
    const parts = [];

    // 1. Core Subject & Custom Name
    const occasion = intent.customOccasion || intent.occasion || 'celebration';

    if (jobType?.id === 'festival') {
        parts.push(`High-quality Indian festival poster design for ${occasion}`);
    } else if (jobType?.id === 'crackers') {
        parts.push(`Indian Diwali crackers box wrapper design, long rectangular packaging design for ${occasion}`);
    } else if (jobType?.id === 'funeral') {
        parts.push(`Respectful and solemn Indian funeral memorial poster design`);
    } else {
        parts.push(`Professional ${jobType?.title || 'graphic design'}`);
    }

    // 2. Specific Line of Text (Requested by user)
    if (intent.specificText) {
        parts.push(`include the specific text: "${intent.specificText}" prominently in the design`);
    }

    // 3. People
    if (intent.includePeople) {
        parts.push("featuring happy Indian people in traditional attire, cultural authenticity");
    } else {
        parts.push("no human faces, focus on objects, patterns, and typography");
    }

    // 4. Style
    parts.push(STYLE_MAPPINGS[intent.style] || STYLE_MAPPINGS.traditional);

    // 5. Mood/Color
    if (intent.themeColor) {
        parts.push(`dominant theme color: ${intent.themeColor}`);
    } else {
        parts.push(MOOD_MAPPINGS[intent.colors] || MOOD_MAPPINGS.festive);
    }

    // 6. Category Specific Logic
    if (jobType?.id === 'crackers') {
        parts.push(`Safety text placement: ${intent.categoryAnswer || 'bottom and sides'}. Symmetrical design, high gloss finish, offset print ready.`);
    } else if (jobType?.id === 'funeral') {
        parts.push(`Decoration style: ${intent.categoryAnswer || 'minimal flowers'}. Muted tones, centered portrait space, respectful framing.`);
    } else if (jobType?.id === 'festival') {
        parts.push(`Lighting density: ${intent.categoryAnswer || 'high density of diyas'}. Traditional festive motifs, marigold decor.`);
    }

    // 7. Technical Words
    if (intent.techWords) {
        parts.push(`technical parameters: ${intent.techWords}`);
    }

    // 8. Quality Standards
    parts.push("Indian cultural accuracy, 300 DPI, sharp details, professional graphic design composition, print-ready, high resolution");

    return parts.join(", ");
};

/**
 * Provides a rough Tamil translation/description of what the prompt represents.
 */
export const describePromptInTamil = (jobType, intent) => {
    const occasion = intent.customOccasion || intent.occasion || 'கொண்டாட்டம்';
    let desc = `இது ${occasion} குறித்த ஒரு உயர்தர வடிவமைப்பு. `;

    if (intent.includePeople) desc += `இதில் மக்கள் பாரம்பரிய உடையில் இருப்பார்கள். `;
    else desc += `இதில் மனித உருவங்கள் இருக்காது, மாறாக ஓவியங்கள் மற்றும் அலங்காரங்கள் இருக்கும். `;

    if (intent.specificText) desc += `இதில் "${intent.specificText}" என்ற சொற்கள் முக்கியமாக இடம்பெறும். `;

    if (intent.techWords) desc += `டிசைனர் குறிப்பிட்ட "${intent.techWords}" போன்ற தொழில்முறை நுணுக்கங்கள் இதில் சேர்க்கப்பட்டுள்ளன. `;

    desc += `இந்தக் கட்டளை அச்சுக்கு ஏற்ற வகையில் (300 DPI) துல்லியமாக வடிவமைக்கப்பட்டுள்ளது.`;

    return desc;
};
