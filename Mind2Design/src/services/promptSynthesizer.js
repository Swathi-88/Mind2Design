/**
 * PromptSynthesizer.js
 * Local "Expert System" Algorithm for synthesizing high-quality, structured design prompts.
 * Uses a deep knowledge base of South Indian design aesthetics for all categories.
 */

const CATEGORY_KNOWLEDGE = {
    festival: {
        layout: "A professional vibrant celebratory collage, symmetrical composition with traditional motifs at corners, central focus on the celebration.",
        aesthetic: "traditional Tamil cultural aesthetic, high-saturation colors, intricate temple-inspired borders, oil lamps (diyas), marigold flower garlands, silk fabric textures.",
        motifs: {
            pongal: "fresh sugarcane stalks leaning, traditional painted clay pot overflowing with rice, turmeric leaves, sun symbol, rural Tamil village background.",
            diwali: "grand display of colorful firecrackers, multiple glowing clay lamps (diyas), festive sparkles, marigold decorations.",
            vishu: "Vishu Kani arrangement with yellow flowers (Kanikkonna), traditional brass lamp (Nilavilakku), mirror, and fruits.",
            onam: "Pookalam (floral carpet) in the foreground, palm trees, houseboat in the background, festive atmosphere."
        }
    },
    crackers: {
        layout: "A professional flat unfolded rectangular landscape wrapper design, strictly flat 2D graphic layout, symmetrical composition, bold and explosive visual energy.",
        aesthetic: "South Indian local shop aesthetic, high-saturation colors, vibrant flex banner texture, glossy offset print finish, hand-painted signboard influences.",
        product_focus: "powerful visual emphasis on the specific firework type, thick fuse details, dramatic ignition sparks, explosive glow effects, fiery light bursts.",
        layout_details: "FLAT UNFOLDED WRAPPER: Long rectangular flat graphic, no 3D box shape, no 3D mockup, strictly flat design view, clear side safety blocks."
    },
    funeral: {
        layout: "A respectful and solemn centered portrait composition within a gold-bordered oval frame, respected title at top.",
        aesthetic: "traditional Tamil cultural aesthetic, muted elegant backdrop, white lilies and jasmine garlands, soft serene lighting.",
        motifs: "respectful floral wreaths, peaceful sacred atmosphere, eternal peace vibes."
    },
    business: {
        layout: "A bold horizontal shop frontage style or professional advertisement board, prominent brand center-focus.",
        aesthetic: "modern Indian retail look or friendly local shop aesthetic, sharp product photography style, bright commercial lighting, high contrast.",
        niche: {
            hotel: "steaming hot authentic South Indian food platters, traditional stainless steel service, warm inviting dining atmosphere.",
            juice: "beaded water droplets on fresh glass, vibrant tropical fruits, splash of juice, refreshing and chilled aesthetic.",
            printing: "showcase of flex banners, visiting cards, and offset prints, professional design studio vibe.",
            retail: "organized product shelves, bright store lighting, commercial sales banners and price tags."
        }
    }
};

const RELIGION_DESC = {
    hindu: "sacred Hindu symbols like Om and Swastika, divine presence of Lord Ganesha or Lakshmi in the background, traditional temple oil lamps, auspicious saffron and turmeric accents.",
    muslim: "elegant Islamic motifs, crescent moon and star symbol, mosque silhouette in far background, intricate geometric patterns, green and gold decorative elements.",
    christian: "sacred Christian symbols like the Holy Cross, soft divine light from above, presence of Jesus Christ figure in a serene artistic style, white doves, elegant church architecture motifs."
};

/**
 * The "Synthesis Algorithm"
 * Composites user intent into a highly detailed DALL-E 3 prompt structure.
 */
export const synthesizePrompt = async (jobType, intent) => {
    // Artificial delay to simulate "optimization" processing (UX)
    await new Promise(resolve => setTimeout(resolve, 800));

    const parts = [];
    const type = jobType?.id || 'festival';
    const config = CATEGORY_KNOWLEDGE[type] || CATEGORY_KNOWLEDGE.festival;
    const subject = (intent.customOccasion || intent.occasion || intent.businessType || 'General').toLowerCase();

    // SECTION 1: CORE THEME & AESTHETIC
    parts.push(`TITLE SECTION: ${config.layout}`);
    parts.push(`AESTHETIC STYLE: ${config.aesthetic}`);

    // SECTION 2: PRODUCT/SUBJECT FOCUS
    let subjectFocus = `Subject focus: ${subject.toUpperCase()}`;
    if (type === 'crackers') {
        subjectFocus += ` -- powerful visual emphasis on traditional ${subject}, thick fuse details, dramatic ignition sparks, explosive glow effects (visual only), fiery light bursts, intense celebratory atmosphere.`;
    } else if (type === 'festival') {
        const motif = config.motifs[subject] || "traditional festive elements, cultural celebration motifs.";
        subjectFocus += ` -- ${motif} Vibrant colors and deep cultural authenticity.`;
    } else if (type === 'business') {
        const nicheKey = Object.keys(config.niche).find(k => subject.includes(k)) || 'retail';
        subjectFocus += ` -- ${config.niche[nicheKey]}`;
    } else if (type === 'funeral') {
        subjectFocus += ` -- ${config.motifs}`;
    }
    parts.push(subjectFocus);

    // SECTION 3: RELIGION & SYMBOLS
    if (intent.religion && intent.religion !== 'secular' && RELIGION_DESC[intent.religion]) {
        parts.push(`CULTURAL CONTEXT: ${RELIGION_DESC[intent.religion]}`);
    } else {
        parts.push(`CULTURAL CONTEXT: Secular commercial design, no religious iconography, inclusive cultural patterns.`);
    }

    // SECTION 4: BRANDING & TYPOGRAPHY
    if (intent.specificText) {
        const isTamilText = /[\u0B80-\u0BFF]/.test(intent.specificText);
        const scriptInstruction = isTamilText ? "exactly in Tamil script" : "in English using bold decorative South Indian typography";
        parts.push(`BRANDING: Prominently feature the text "${intent.specificText}" at the center ${scriptInstruction}, culturally appropriate font style, red and yellow color dominance (or matched to theme), thick outlines, slight 3D emboss effect.`);
    } else {
        parts.push("BRANDING: Generic placeholders for text, focus on layout and visual balance.");
    }

    // SECTION 5: DECOR & LAYOUT DETAILS
    let decor = "DECOR ELEMENTS: Marigold flower garlands framing the borders, festive sparkles, traditional patterns inspired by temple borders, silk textures.";
    if (type === 'crackers') {
        decor += " Symmetrical fireworks bursts in the background.";
    } else if (type === 'funeral') {
        decor = "DECOR ELEMENTS: Respectful white floral borders, jasmine garlands, soft candlelight glow.";
    }
    parts.push(decor);

    parts.push(`LAYOUT DETAILS: ${type === 'crackers' ? config.layout_details : 'Centered composition, balanced symmetry, professional graphic hierarchy.'}`);

    // SECTION 6: CONSTRAINTS & USER NOTES
    const styleMods = intent.modifiers || [];
    let constraints = `STYLE CONSTRAINTS: Graphic-only composition, ${intent.includePeople ? 'featuring people in traditional attire' : 'no human faces'}, ${intent.style === 'luxury_brand' ? 'premium gold foil' : 'vibrant colors'}.`;
    parts.push(constraints);

    if (intent.extraNote && intent.extraNote.trim() !== '') {
        parts.push(`USER-DIRECTED ARTISTIC INSTRUCTION: ${intent.extraNote}`);
    }

    // SECTION 7: TECHNICAL SPECS
    parts.push("TECHNICAL SPECS: 8K resolution, cinematic lighting, ultra-sharp details, commercial-grade graphic design, print-ready offset design, 300 DPI, high-resolution digital art, realistic print texture.");

    return parts.join("\n\n");
};
