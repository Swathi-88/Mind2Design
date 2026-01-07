/**
 * PromptSynthesizer.js
 * Local "Expert System" Algorithm for synthesizing high-quality design prompts.
 * This simulates an ML-like reasoning process using a structured knowledge base 
 * of South Indian design tokens, layout patterns, and aesthetic rules.
 */

const EXPERT_KNOWLEDGE = {
    layouts: {
        obituary: "centered portrait composition within a gold-bordered oval frame, respected title at top",
        business_board: "bold horizontal shop frontage style, prominent brand name in large decorative typography",
        festival_poster: "vibrant celebratory collage with traditional motifs at corners, central focus on the deity or celebration",
        cracker_wrapper: "long rectangular landscape packaging layout, symmetrical fireworks art, side safety text blocks"
    },
    aesthetics: {
        south_indian_local: "South Indian local shop aesthetic, high-saturation colors, vibrant flex banner texture, glossy offset print finish, hand-painted sign influences, regional cultural motifs",
        traditional_tamil: "traditional Tamil cultural aesthetic, intricate temple-inspired borders, oil lamps (diyas), marigold flower garlands, silk fabric textures",
        modern_retail: "modern Indian retail look, sharp product photography style, bright commercial lighting, bold catchy call-to-actions, high contrast"
    },
    motifs: {
        pongal: "fresh sugarcane stalks leaning, traditional painted clay pot overflowing with rice, turmeric leaves, sun symbol, rural Tamil village background",
        diwali: "grand display of colorful firecrackers, multiple glowing clay lamps (diyas), festive sparkles, marigold decorations",
        hotel: "steaming hot food platters, traditional stainless steel service, authentic South Indian meal arrangement, warm inviting dining atmosphere",
        juice: "beaded water droplets on fresh glass, vibrant tropical fruits, splash of juice, refreshing and chilled aesthetic",
        funeral: "respectful floral wreaths, white lilies and jasmine, soft serene lighting, peaceful sacred atmosphere, muted elegant background"
    },
    religion: {
        hindu: "sacred Hindu symbols like Om and Swastika, divine presence of Lord Ganesha or Lakshmi in the background, traditional temple oil lamps, auspicious saffron and turmeric accents",
        muslim: "elegant Islamic motifs, crescent moon and star symbol, mosque silhouette in far background, intricate geometric patterns, green and gold decorative elements",
        christian: "sacred Christian symbols like the Holy Cross, soft divine light from above, presence of Jesus Christ figure in a serene artistic style, white doves, elegant church architecture motifs"
    }
};

/**
 * The "Synthesis Algorithm"
 * Composites user intent into a descriptive DALL-E 3 prompt.
 */
export const synthesizePrompt = async (jobType, intent) => {
    // Artificial delay to simulate "optimization" processing (UX)
    await new Promise(resolve => setTimeout(resolve, 800));

    const parts = [];

    // 1. Determine Core Layout & Aesthetic
    let layout = EXPERT_KNOWLEDGE.layouts.business_board;
    let aesthetic = EXPERT_KNOWLEDGE.aesthetics.south_indian_local;

    if (jobType?.id === 'funeral') {
        layout = EXPERT_KNOWLEDGE.layouts.obituary;
        aesthetic = EXPERT_KNOWLEDGE.aesthetics.traditional_tamil;
    } else if (jobType?.id === 'festival') {
        layout = EXPERT_KNOWLEDGE.layouts.festival_poster;
        aesthetic = EXPERT_KNOWLEDGE.aesthetics.traditional_tamil;
    } else if (jobType?.id === 'crackers') {
        layout = EXPERT_KNOWLEDGE.layouts.cracker_wrapper;
    }

    parts.push(`A professional ${layout}`);
    parts.push(aesthetic);

    // 2. Inject Subject & Niche
    const subject = intent.customOccasion || intent.occasion || intent.businessType || 'General';
    parts.push(`specifically for: ${subject}`);

    // 2.5 Inject Religious Context
    if (intent.religion && intent.religion !== 'secular') {
        parts.push(EXPERT_KNOWLEDGE.religion[intent.religion]);
    }

    // 3. Dynamic Motif Injection based on niche/category
    const niche = (subject + (intent.categoryAnswer || '')).toLowerCase();

    if (niche.includes('pongal')) parts.push(EXPERT_KNOWLEDGE.motifs.pongal);
    else if (niche.includes('diwali') || jobType?.id === 'crackers') parts.push(EXPERT_KNOWLEDGE.motifs.diwali);
    else if (niche.includes('hotel') || niche.includes('food')) parts.push(EXPERT_KNOWLEDGE.motifs.hotel);
    else if (niche.includes('juice') || niche.includes('shake')) parts.push(EXPERT_KNOWLEDGE.motifs.juice);
    else if (jobType?.id === 'funeral') parts.push(EXPERT_KNOWLEDGE.motifs.funeral);

    // 4. Style Modifiers
    if (intent.style === 'traditional') parts.push("deeply traditional elements, heritage motifs");
    else if (intent.style === 'luxury_brand') parts.push("premium gold foil accents, elegant serif typography, elite branding");
    else if (intent.style === 'festive_pop') parts.push("bright neon highlights, explosive energy, celebratory atmosphere");
    else if (intent.style === 'local_shop') parts.push("authentic local street shop board style, vibrant and inviting");

    // 5. User Specific Controls
    if (intent.themeColor) parts.push(`dominant theme color: ${intent.themeColor}`);
    if (intent.specificText) {
        const isTamilText = /[\u0B80-\u0BFF]/.test(intent.specificText);
        const scriptInstruction = isTamilText ? "exactly in Tamil script" : "using elegant typography";
        parts.push(`prominently feature the text "${intent.specificText}" ${scriptInstruction} in a culturally appropriate decorative South Indian font style`);
    }
    if (intent.includePeople) parts.push("featuring people in traditional South Indian attire with authentic expressions");
    else parts.push("graphic-only composition, no human faces, focus on objects and typography");

    // 6. Technical Quality & Format
    parts.push("8k resolution, cinematic lighting, sharp details, commercial graphic design quality, print-ready 300 DPI composition, high resolution digital art");

    return parts.join(", ");
};
