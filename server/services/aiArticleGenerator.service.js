const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateFullArticle = async ({ title, description, category }) => {
  const prompt = `
Write a professional news article of minimum 1000 words.

Title: ${title}
Category: ${category}

Instructions:
- Start with a strong introduction
- Use proper journalism tone
- Add multiple sections with headings
- Use H2 and H3 style headings
- Expand facts naturally
- End with a conclusion

Return result in MARKDOWN format.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

  return response.choices[0].message.content;
};

module.exports = { generateFullArticle };
