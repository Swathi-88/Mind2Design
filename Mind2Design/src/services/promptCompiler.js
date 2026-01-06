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

const SYMBOL_MAPPINGS = {
    hindu: "featuring Hindu symbols like Om and Swastik, traditional vedic motifs",
    muslim: "featuring Islamic patterns, crescent and star motifs, arabesque geometry",
    christian: "featuring Christian cross symbol, elegant sacred design elements",
    none: "secular design, no religious symbols, neutral cultural patterns"
};

/**
 * Compiles the user's intent selections into a professional English prompt.
 */
export const compilePrompt = (jobType, intent, modifiers = []) => {
    const parts = [];

    // 1. Design Mode (AI vs Real)
    if (intent.designMode === 'ai') {
        parts.push("AI generated artistic illustration, imaginative and creative digital art, vibrant surreal elements");
    } else {
        parts.push("photorealistic commercial graphic design, sharp focus, clean professional layout, 8k resolution, cinematic lighting");
    }

    // 2. Core Subject & Custom Name
    const occasion = intent.customOccasion || intent.occasion || 'celebration';

    if (jobType?.id === 'festival') {
        parts.push(`High-quality Indian festival poster design for ${occasion}`);
    } else if (jobType?.id === 'crackers') {
        parts.push(`Indian crackers box wrapper design, long rectangular packaging design for ${occasion}, NO human faces, secular commercial design`);
    } else if (jobType?.id === 'funeral') {
        parts.push(`Respectful and solemn Indian funeral memorial poster design`);
    } else {
        parts.push(`Professional ${jobType?.title || 'graphic design'}`);
    }

    // 3. Religious/Cultural Symbols
    // Only apply if selected OR if it's the 'festival' category (where symbols are often inherent)
    if (intent.symbol && intent.symbol !== 'none') {
        parts.push(SYMBOL_MAPPINGS[intent.symbol]);
    } else if (jobType?.id !== 'festival') {
        parts.push("strictly secular, no religious symbols, clean commercial backdrop");
    }

    // 4. Specific Line of Text
    if (intent.specificText) {
        parts.push(`include the specific text: "${intent.specificText}" prominently in the design using elegant typography`);
    }

    // 5. People
    if (intent.includePeople) {
        parts.push("featuring happy Indian people in traditional attire, cultural authenticity");
    } else {
        parts.push("no human faces, focus on objects, patterns, and typography");
    }

    // 6. Style & Modifiers
    let styleStr = STYLE_MAPPINGS[intent.style] || STYLE_MAPPINGS.traditional;
    if (modifiers.includes('more_traditional')) styleStr += ", extremely traditional, ancient motifs, historical accuracy";
    if (modifiers.includes('more_festive')) styleStr += ", highly celebratory, extra sparkles, maximum vibrant colors";
    parts.push(styleStr);

    // 7. Mood/Color
    if (intent.themeColor) {
        parts.push(`dominant theme color: ${intent.themeColor}`);
    } else {
        let mood = MOOD_MAPPINGS[intent.colors] || MOOD_MAPPINGS.festive;
        if (modifiers.includes('change_colors')) mood = "re-imagined color palette, fresh and unique color harmony";
        parts.push(mood);
    }

    // 8. Category Specific Logic
    if (jobType?.id === 'crackers') {
        parts.push(`Safety text placement: ${intent.categoryAnswer || 'bottom and sides'}. Symmetrical design, high gloss finish, offset print ready.`);
    } else if (jobType?.id === 'funeral') {
        parts.push(`Decoration style: ${intent.categoryAnswer || 'minimal flowers'}. Muted tones, centered portrait space, respectful framing.`);
    } else if (jobType?.id === 'festival') {
        parts.push(`Lighting density: ${intent.categoryAnswer || 'high density of diyas'}. Traditional festive motifs, marigold decor.`);
    }

    // 9. Technical Words & Extra Notes
    if (intent.techWords) parts.push(`technical parameters: ${intent.techWords}`);
    if (intent.extraNote) parts.push(`special instruction: ${intent.extraNote}`);

    // 10. Refinement Logic (Extra Features)
    if (modifiers.includes('lock_layout')) parts.push("preserve current composition and object placements, strictly keep layout structure");
    if (modifiers.includes('less_decoration')) parts.push("extremely minimal decoration, focus on negative space, simple and clean");

    // 11. Quality Standards
    parts.push("Indian cultural accuracy, 300 DPI, sharp details, professional graphic design composition, print-ready, high resolution");

    return parts.join(", ");
};

/**
 * Provides a rough Tamil translation/description of what the prompt represents.
 */
export const describePromptInTamil = (jobType, intent) => {
    const occasion = intent.customOccasion || intent.occasion || 'கொண்டாட்டம்';
    let desc = `இது ${occasion} குறித்த ஒரு உயர்தர வடிவமைப்பு. `;

    if (intent.designMode === 'ai') desc += `இது ஒரு கற்பனை கலைநயமிக்க தோற்றத்தில் இருக்கும். `;
    else desc += `இது ஒரு புகைப்படத்தைப் போன்ற தத்ரூபமான தோற்றத்தில் இருக்கும். `;

    if (intent.symbol !== 'none') {
        const symbolMapTa = { hindu: 'இந்து', muslim: 'முஸ்லீம்', christian: 'கிறிஸ்தவ' };
        desc += `இதில் ${symbolMapTa[intent.symbol]} மதச் சின்னங்கள் சேர்க்கப்பட்டுள்ளன. `;
    } else if (jobType?.id !== 'festival') {
        desc += `இதில் எந்த மதச் சின்னங்களும் இல்லை, இது ஒரு பொதுவான டிசைன். `;
    }

    if (intent.includePeople) desc += `இதில் மக்கள் பாரம்பரிய உடையில் இருப்பார்கள். `;
    else desc += `இதில் மனித உருவங்கள் இருக்காது. `;

    if (intent.specificText) desc += `இதில் "${intent.specificText}" என்ற சொற்கள் முக்கியமாக இடம்பெறும். `;

    if (intent.themeColor) desc += `டிசைனின் முக்கிய நிறம் ${intent.themeColor} ஆக இருக்கும். `;

    desc += `இந்தக் கட்டளை அச்சுக்கு ஏற்ற வகையில் (300 DPI) துல்லியமாக வடிவமைக்கப்பட்டுள்ளது.`;

    return desc;
};
