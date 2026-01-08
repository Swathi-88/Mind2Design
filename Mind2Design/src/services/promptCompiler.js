/**
 * PromptCompiler.js
 * Converts UI-based design intent into a structured English prompt for AI.
 */

const STYLE_MAPPINGS = {
    // General
    traditional: "traditional Indian art style, intricate details, cultural motifs",
    modern: "clean modern look, sleek typography, minimalist aesthetic",
    cartoon: "playful cartoon illustration, bright colors, friendly characters",
    luxury: "premium high-end feel, gold accents, elegant gradients",

    // Festival Specific
    festive_pop: "vibrant festive pop art, neon highlights, high energy, celebratory",
    realistic: "photorealistic Indian festival scene, cinematic depth of field, 8k",

    // Crackers Specific
    explosive: "dynamic explosive graphics, high-impact visual, bright flashes, action-oriented",
    shiny_foil: "metallic foil texture, glossy finish, iridescent highlights, packaging-ready",
    vintage: "restored vintage Indian firework art, lithographic style, aged paper texture",
    minimal_box: "clean minimal packaging, focus on branding, geometric simplicity",

    // Business Specific
    corporate: "professional corporate identity, clean lines, trustworthy blue and white tones",
    ecommerce: "bold e-commerce design, bright call-to-action buttons, high conversion layout",
    luxury_brand: "sophisticated luxury branding, serif typography, minimalist gold leaf",
    local_shop: "friendly local shop aesthetic, colorful and inviting, hand-painted sign style",

    // Funeral Specific
    serene: "serene and pure white aesthetic, holy light, peaceful calm",
    classic_black: "classic memorial black and gold, gold foil accents, formal and respectful",
    floral_ethereal: "ethereal floral background, soft focus, blooming marigolds and lilies",
    peaceful: "peaceful landscape background, sunset horizon, eternal peace atmosphere"
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

    // 1. Image Reference Logic (Requested by user)
    if (intent.useReferenceImage) {
        parts.push("IMPORTANT: use the attached image as a close visual reference for layout and style");
    }

    // 2. Design Mode (AI vs Real)
    if (intent.designMode === 'ai') {
        parts.push("AI generated artistic illustration, imaginative and creative digital art, vibrant surreal elements");
    } else {
        parts.push("photorealistic commercial graphic design, sharp focus, clean professional layout, 8k resolution, cinematic lighting");
    }

    // 3. Core Subject & Custom Name
    const occasion = intent.customOccasion || intent.occasion || 'celebration';
    const businessName = intent.businessType || 'business';

    if (jobType?.id === 'festival') {
        parts.push(`High-quality Indian festival poster design for ${occasion}`);
    } else if (jobType?.id === 'crackers') {
        parts.push(`Indian crackers flat unfolded wrapper design, strictly flat 2D rectangular graphic design for ${occasion}, NO 3D box shape, NO human faces, secular commercial design`);
    } else if (jobType?.id === 'funeral') {
        parts.push(`Respectful and solemn Indian funeral memorial poster design`);
    } else if (jobType?.id === 'business') {
        parts.push(`Professional business advertisement design for a ${businessName}`);
    } else {
        parts.push(`Professional ${jobType?.title || 'graphic design'}`);
    }

    // 4. Religious/Cultural Symbols
    if (intent.symbol && intent.symbol !== 'none') {
        parts.push(SYMBOL_MAPPINGS[intent.symbol]);
    } else if (jobType?.id !== 'festival') {
        parts.push("strictly secular, no religious symbols, clean commercial backdrop");
    }

    // 5. Specific Line of Text
    if (intent.specificText) {
        const isTamilText = /[\u0B80-\u0BFF]/.test(intent.specificText);
        const scriptNote = isTamilText ? "exactly in Tamil script" : "using elegant typography";
        parts.push(`include the specific text: "${intent.specificText}" prominently in the design ${scriptNote}`);
    }

    // 6. People
    if (intent.includePeople) {
        parts.push("featuring happy Indian people in traditional attire, cultural authenticity");
    } else {
        parts.push("no human faces, focus on objects, patterns, and typography");
    }

    // 7. Style & Modifiers (Now context-aware)
    let styleStr = STYLE_MAPPINGS[intent.style] || STYLE_MAPPINGS.traditional;
    if (modifiers.includes('more_traditional')) styleStr += ", extremely traditional, ancient motifs, historical accuracy";
    if (modifiers.includes('more_festive')) styleStr += ", highly celebratory, extra sparkles, maximum vibrant colors";
    parts.push(styleStr);

    // 8. Mood/Color
    if (intent.themeColor) {
        parts.push(`dominant theme color: ${intent.themeColor}`);
    } else {
        let mood = MOOD_MAPPINGS[intent.colors] || MOOD_MAPPINGS.festive;
        if (modifiers.includes('change_colors')) mood = "re-imagined color palette, fresh and unique color harmony";
        parts.push(mood);
    }

    // 9. Category Specific Logic (Updated for niche business)
    if (jobType?.id === 'crackers') {
        parts.push(`Safety text placement: ${intent.categoryAnswer || 'bottom and sides'}. Symmetrical design, high gloss finish, offset print ready.`);
    } else if (jobType?.id === 'funeral') {
        parts.push(`Decoration style: ${intent.categoryAnswer || 'minimal flowers'}. Muted tones, centered portrait space, respectful framing.`);
    } else if (jobType?.id === 'festival') {
        parts.push(`Lighting density: ${intent.categoryAnswer || 'high density of diyas'}. Traditional festive motifs, marigold decor.`);
    } else if (jobType?.id === 'business') {
        parts.push(`Niche specific detail: ${intent.categoryAnswer || 'professional branding'}. Commercial appeal, clear service offering.`);
    }

    // 10. Technical Words & Extra Notes
    if (intent.techWords) parts.push(`technical parameters: ${intent.techWords}`);
    if (intent.extraNote) parts.push(`CRITICAL DESIGN INSTRUCTION: ${intent.extraNote}`);

    // 11. Refinement Logic
    if (modifiers.includes('lock_layout')) parts.push("preserve current composition and object placements, strictly keep layout structure");
    if (modifiers.includes('less_decoration')) parts.push("extremely minimal decoration, focus on negative space, simple and clean");

    // 12. Quality Standards
    parts.push("Indian cultural accuracy, 300 DPI, sharp details, professional graphic design composition, print-ready, high resolution");

    return parts.join(", ");
};

/**
 * Provides an elaborated Tamil description of the synthesized design intent.
 */
export const describePromptInTamil = (jobType, intent) => {
    const occasion = (intent.customOccasion || intent.occasion || 'கொண்டாட்டம்').toUpperCase();
    const businessName = (intent.businessType || 'நிறுவனம்').toUpperCase();
    const type = jobType?.id || 'festival';

    let sections = [];

    // 1. அடிப்படை நோக்கம்
    if (type === 'business') {
        sections.push(`வடிவமைப்பு வகை: இது ${businessName} நிறுவனத்திற்கான அதிநவீன விளம்பர வடிவமைப்பாகும். இது நீண்ட செவ்வக அமைப்பைக் கொண்டிருக்கும்.`);
    } else if (type === 'crackers') {
        sections.push(`வடிவமைப்பு வகை: இது ${occasion} பட்டாசு பெட்டிக்கான பிரத்யேக உறை வடிவமைப்பாகும். இது நீண்ட செவ்வக மற்றும் சமச்சீர் அமைப்பைக் கொண்டிருக்கும்.`);
    } else {
        sections.push(`வடிவமைப்பு வகை: இது ${occasion} குறித்த உயர்தர சுவரொட்டி வடிவமைப்பாகும்.`);
    }

    // 2. கலைநய பாணி
    const styleMap = { ai: 'கற்பனைத்திறன் மிக்க கலைநய பாணி', real: 'தத்ரூபமான தொழில்முறை பாணி' };
    sections.push(`கலைநய பாணி: ${styleMap[intent.designMode] || styleMap.real}. தென்னிந்திய உள்ளூர் கடை அழகியல், துடிப்பான வண்ணங்கள் மற்றும் அச்சுத் தரம் கொண்டது.`);

    // 3. முக்கிய கவனம்
    if (type === 'crackers') {
        sections.push(`முக்கிய கவனம்: ${occasion} பட்டாசு - இதில் திரிகள், தீப்பொறிகள் மற்றும் வெடிக்கும் ஒளி விளைவுகள் தத்ரூபமாக இருக்கும்.`);
    } else if (type === 'festival') {
        sections.push(`முக்கிய கவனம்: ${occasion} கலாச்சார கூறுகள் - பாரம்பரிய சின்னங்கள் மற்றும் கொண்டாட்ட உணர்வுகளுக்கு முக்கியத்துவம் அளிக்கப்படுகிறது.`);
    }

    // 4. குறியீடுகள் மற்றும் பின்னணி
    if (intent.religion && intent.religion !== 'secular') {
        const relMap = { hindu: 'இந்து (ஓம், சுவாஸ்திக்)', muslim: 'இஸ்லாமிய (பிறை, நட்சத்திரம்)', christian: 'கிறிஸ்தவ (சிலுவை)' };
        sections.push(`கலாச்சார பின்னணி: இதில் ${relMap[intent.religion]} மதச் சின்னங்கள் மற்றும் பாரம்பரிய கூறுகள் சேர்க்கப்பட்டுள்ளன.`);
    } else {
        sections.push(`கலாச்சார பின்னணி: இது ஒரு பொதுவான வணிக வடிவமைப்பாகும், எந்த மத அடையாளங்களும் இதில் இல்லை.`);
    }

    // 5. பிராண்டிங் மற்றும் எழுத்துக்கள்
    if (intent.specificText) {
        sections.push(`பிராண்டிங்: இதில் "${intent.specificText}" என்ற வாசகம் மையப்பகுதியில் தடிமனான தென்னிந்திய எழுத்து பாணியில் முக்கியமாக இடம்பெற்றுள்ளது.`);
    }

    // 6. கூடுதல் விவரங்கள்
    let decor = "அலங்கார கூறுகள்: சாமந்தி பூ மாலைகள், பட்டுத் துணி அமைப்பு மற்றும் கோயில் பார்டர் வடிவமைப்புகள்.";
    if (intent.includePeople) decor += " இதில் பாரம்பரிய உடையில் மனிதர்கள் இடம்பெறுவார்கள்.";
    else decor += " இதில் மனித முகங்கள் இருக்காது, பொருட்களுக்கு முக்கியத்துவம் அளிக்கப்படும்.";
    sections.push(decor);

    // 7. தொழில்நுட்ப தரம்
    sections.push("தொழில்நுட்ப தரம்: இது 8K தெளிவுத்திறன், 300 DPI அச்சுத் தரம் மற்றும் சினிமா தர ஒளியமைப்புடன் உருவாக்கப்பட்டுள்ளது.");

    return sections.join("\n\n");
};
