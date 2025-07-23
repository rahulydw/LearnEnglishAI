import getGeminiModel from '../../config/getGeminiModel.js'

const model = getGeminiModel("gemini-2.5-flash"); //1.5 gemini-1.5-flash

export const translateHinglishController = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ success: false, message: "Text is required" });

    const prompt = `
You are a translator who converts Hinglish (Hindi written in English letters) into clean English.

Rules:
- Only return the English version of the sentence.
- No extra explanation.
- Return 1 or 2 variants if appropriate:
  1. Informal English
  2. Formal English

Hinglish: "${text}"
English:
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    const english = await response.text();

    res.status(200).json({ success: true, translated: english.trim() });
  } catch (err) {
    console.error("Translation Error:", err.message);
    res.status(500).json({ success: false, message: "Translation failed", error: err.message });
  }
};
