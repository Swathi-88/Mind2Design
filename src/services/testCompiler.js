import { compilePrompt } from './promptCompiler.js';

const runTests = () => {
    console.log("--- Starting Logic Tests ---");

    // Test 1: Business + Hotel Niche
    const busIntent = {
        businessType: 'Grand Luxury Hotel',
        categoryAnswer: 'Luxury Interior',
        style: 'luxury_brand',
        designMode: 'real',
        useReferenceImage: true,
        symbol: 'none'
    };
    const busJob = { id: 'business', title: 'Business Poster' };
    const busPrompt = compilePrompt(busJob, busIntent);

    console.log("\nTest Case 1: Business Hotel");
    console.log("Includes Reference Image Text?", busPrompt.includes("use the attached image as a close visual reference"));
    console.log("Includes Business Name?", busPrompt.includes("Grand Luxury Hotel"));
    console.log("Includes Category Answer?", busPrompt.includes("Luxury Interior"));
    console.log("Includes Style Mapping?", busPrompt.includes("sophisticated luxury branding"));

    // Test 2: Crackers + Explosive Style
    const crackIntent = {
        occasion: 'Diwali',
        categoryAnswer: 'Bottom & Sides',
        style: 'explosive',
        designMode: 'ai',
        useReferenceImage: false,
        symbol: 'none'
    };
    const crackJob = { id: 'crackers', title: 'Crackers Box' };
    const crackPrompt = compilePrompt(crackJob, crackIntent);

    console.log("\nTest Case 2: Crackers Box");
    console.log("Is Secular?", crackPrompt.includes("strictly secular, no religious symbols"));
    console.log("Includes Style Mapping?", crackPrompt.includes("dynamic explosive graphics"));
    console.log("Includes Safety Text?", crackPrompt.includes("Safety text placement: Bottom & Sides"));

    // Test 3: Festival + Symbols
    const festIntent = {
        occasion: 'Diwali',
        categoryAnswer: 'High (Very bright)',
        style: 'festive_pop',
        designMode: 'ai',
        useReferenceImage: false,
        symbol: 'hindu'
    };
    const festJob = { id: 'festival', title: 'Festival Poster' };
    const festPrompt = compilePrompt(festJob, festIntent);

    console.log("\nTest Case 3: Festival Poster");
    console.log("Includes Hindu symbols?", festPrompt.includes("Hindu symbols like Om and Swastik"));
    console.log("Includes Festive Style?", festPrompt.includes("vibrant festive pop art"));

    console.log("\n--- Tests Completed ---");
};

runTests();
