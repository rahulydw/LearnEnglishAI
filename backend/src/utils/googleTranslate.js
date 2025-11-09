import axios from "axios";
import { decode } from "html-entities";

export const translateText = async (text, targetLang = "en", sourceLang = "") => {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  const url = `https://translation.googleapis.com/language/translate/v2`;

  try {
    const res = await axios.post(`${url}?key=${apiKey}`, {
      q: text,
      target: targetLang,
      source: sourceLang || undefined,
    });

    const rawTranslation = res.data.data.translations[0].translatedText;

    // ✅ Decode special characters
    const cleanTranslation = decode(rawTranslation);

    return cleanTranslation;
  } catch (err) {
    console.error("Translation error:", err.response?.data || err);
    return null;
  }
};
