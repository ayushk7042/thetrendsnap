// const OpenAI = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// const generateFullArticle = async ({ title, description, category }) => {
//   const prompt = `
// Write a professional news article of minimum 1000 words.

// Title: ${title}
// Category: ${category}

// Instructions:
// - Start with a strong introduction
// - Use proper journalism tone
// - Add multiple sections with headings
// - Use H2 and H3 style headings
// - Expand facts naturally
// - End with a conclusion

// Return result in MARKDOWN format.
// `;

//   const response = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [{ role: "user", content: prompt }],
//     temperature: 0.7
//   });

//   return response.choices[0].message.content;
// };

// module.exports = { generateFullArticle };



const OpenAI = require("openai");

/* -------------------------------------------------
   OpenAI Init (safe)
------------------------------------------------- */
let openai = null;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

/* -------------------------------------------------
   FALLBACK MARKDOWN (STRING ONLY)
------------------------------------------------- */
const generateFallbackArticle = ({ title, description, category }) => {
  return `
${title}

INTRODUCTION
${description || `This article highlights recent developments in the field of ${category}.`}

BACKGROUND
The ${category} industry has seen steady growth and rapid transformation in recent times. Experts believe these changes are shaping future trends.

KEY DEVELOPMENTS
Several important factors are contributing to this situation, including innovation, public interest, and industry participation.

EXPERT INSIGHTS
According to analysts, these developments may have a long-term impact on businesses, consumers, and policymakers.

PUBLIC REACTION
The topic has generated significant discussion across social media platforms and digital news outlets.

WHAT HAPPENS NEXT
Authorities and organizations are closely monitoring the situation, and further updates are expected soon.

CONCLUSION
${title} marks an important moment in the ${category} sector. Readers are encouraged to stay informed as the story evolves.
`;
};

/* -------------------------------------------------
   MAIN GENERATOR
------------------------------------------------- */
const generateFullArticle = async ({ title, description, category }) => {
  // If OpenAI not available → fallback
  if (!openai) {
    console.warn("⚠️ OpenAI key missing, using fallback article");
    return generateFallbackArticle({ title, description, category });
  }

  try {
    const prompt = `
Write a professional news article (minimum 700 words).

Rules:
- Return PLAIN TEXT (not JSON)
- No markdown symbols like ## or ###
- Use simple section titles in CAPS
- Paragraph-based content

Title: ${title}
Category: ${category}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error(
      "⚠️ OpenAI failed, switching to fallback:",
      error.message
    );
    return generateFallbackArticle({ title, description, category });
  }
};

module.exports = { generateFullArticle };
