import { translateText } from "../../utils/googleTranslate.js";

// Hinglish → English (auto detect)
export const translateHinglishToEnglish = async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Text is required" });

  const translated = await translateText(text, "en");
  res.json({ original: text, translated });
};

// English → Hindi (force source lang to en)
export const translateEnglishToHindi = async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Text is required" });

  const translated = await translateText(text, "hi", "en");
  res.json({ original: text, translated });
};
