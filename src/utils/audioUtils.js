
/**
 * Simple translation caching to avoid repeated API calls
 */
const translationCache = {};

// Keep a reference to the current utterance to prevent garbage collection issues in some browsers
let currentUtterance = null;

/**
 * Translates text using a free Google Translate API endpoint
 */
export const translateText = async (text, targetLang) => {
  if (!text || targetLang === 'en') return text;

  const cacheKey = `${targetLang}:${text.substring(0, 50)}`;
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data[0]) throw new Error("Invalid translation response");

    // Google Translate returns an array of segments
    const translatedText = data[0].map(segment => segment[0]).join('');
    translationCache[cacheKey] = translatedText;
    return translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Fallback to original text
  }
};

/**
 * Finds the most suitable voice for a given language code
 */
const getVoice = (langCode) => {
  let voices = window.speechSynthesis.getVoices();

  if (voices.length === 0) {
    return null;
  }

  // Normalized target language for comparison
  const targetLang = langCode.toLowerCase().replace('_', '-');
  const targetPrimary = targetLang.split('-')[0];

  // Priority 1: Exact match (lang and region)
  let voice = voices.find(v => v.lang.toLowerCase().replace('_', '-') === targetLang);

  // Priority 2: Primary language match (e.g., 'hi' matches 'hi-IN')
  if (!voice) {
    voice = voices.find(v => v.lang.toLowerCase().startsWith(targetPrimary));
  }

  // Priority 3: Case-insensitive search in name or lang
  if (!voice) {
    voice = voices.find(v =>
      v.name.toLowerCase().includes(targetPrimary) ||
      v.lang.toLowerCase().includes(targetPrimary)
    );
  }

  return voice;
};

/**
 * Speaks the text using browser's SpeechSynthesis API
 */
export const speakText = (text, lang, onEnd, onError) => {
  if (!('speechSynthesis' in window)) {
    if (onError) onError('Speech synthesis not supported');
    return;
  }

  // Pre-emptively resume in case it's stuck in paused state (common Chrome issue)
  window.speechSynthesis.resume();
  window.speechSynthesis.cancel();

  // Short delay to ensure cancel finished and system is ready
  setTimeout(() => {
    try {
      currentUtterance = new SpeechSynthesisUtterance(text);
      currentUtterance.lang = lang;
      currentUtterance.rate = 0.95;
      currentUtterance.volume = 1.0;
      currentUtterance.pitch = 1.0;

      const voice = getVoice(lang);
      if (voice) {
        console.log(`Found voice for ${lang}: ${voice.name}`);
        currentUtterance.voice = voice;
      } else {
        console.warn(`No specific voice found for ${lang}, using browser default for this lang.`);
        // Note: setting utterance.lang is often enough for browsers to find their own default
      }

      currentUtterance.onstart = () => console.log(`Started speaking in ${lang}`);

      currentUtterance.onend = (event) => {
        currentUtterance = null;
        if (onEnd) onEnd(event);
      };

      currentUtterance.onerror = (event) => {
        console.error("SpeechSynthesisUtterance error", event);
        currentUtterance = null;
        if (onError) onError(event);
      };

      // Force resume again right before speaking
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(currentUtterance);
    } catch (e) {
      console.error("Critical error in speakText:", e);
      if (onError) onError(e);
    }
  }, 100);
};

/**
 * Main audio handler orchestrating translation and TTS
 */
export const handleAudio = async (text, lang, setIsTranslating, setIsPlaying) => {
  const targetSpeechLang = lang === 'hindi' ? 'hi-IN' : (lang === 'marathi' ? 'mr-IN' : 'en-US');
  const targetTransLang = lang === 'hindi' ? 'hi' : (lang === 'marathi' ? 'mr' : 'en');

  setIsPlaying(true);

  if (lang !== 'english') {
    setIsTranslating(true);
    try {
      const translatedText = await translateText(text, targetTransLang);
      setIsTranslating(false);

      // Small pause between translation and speaking can help browser clear its state
      setTimeout(() => {
        speakText(translatedText, targetSpeechLang, () => setIsPlaying(false), (err) => {
          console.error("Speech failed:", err);
          setIsPlaying(false);
        });
      }, 200);

    } catch (err) {
      console.error("Handle audio error:", err);
      setIsTranslating(false);
      speakText(text, 'en-US', () => setIsPlaying(false), () => setIsPlaying(false));
    }
  } else {
    speakText(text, 'en-US', () => setIsPlaying(false), () => setIsPlaying(false));
  }
};
