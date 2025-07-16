import { useState } from "react";
import { FiActivity } from "react-icons/fi";

const MORSE_CODE = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..", 1: ".----", 2: "..---", 3: "...--",
  4: "....-", 5: ".....", 6: "-....", 7: "--...", 8: "---..",
  9: "----.", 0: "-----", " ": "/"
};

function beep(context, time, duration) {
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = "sine";
  osc.frequency.value = 600;
  osc.connect(gain);
  gain.connect(context.destination);
  osc.start(time);
  osc.stop(time + duration / 1000);
}

function playMorseCode(morse, wpm) {
  const unit = 1200 / wpm;
  const context = new (window.AudioContext || window.webkitAudioContext)();
  let time = context.currentTime;

  for (const symbol of morse) {
    if (symbol === ".") {
      beep(context, time, unit);
      time += unit / 1000 + 0.05;
    } else if (symbol === "-") {
      beep(context, time, unit * 3);
      time += (unit * 3) / 1000 + 0.05;
    } else if (symbol === " ") {
      time += (unit * 3) / 1000;
    } else if (symbol === "/") {
      time += (unit * 7) / 1000;
    }
  }
}

export default function MorseCodePracticeWidget() {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");
  const [wpm, setWpm] = useState(20);
  const [wordLength, setWordLength] = useState(1);
  const [practice, setPractice] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, "");
    setText(value);
    const morseText = value
      .split("")
      .map((char) => MORSE_CODE[char] || "")
      .join(" ");
    setMorse(morseText);
  };

  const generatePractice = async () => {
    setError("");
    setRevealed(false);
    let word = "";

    if (wordLength === 1) {
      const letters = Object.keys(MORSE_CODE).filter(c => c.length === 1 && c !== " ");
      word = letters[Math.floor(Math.random() * letters.length)];
    } else {
      const pattern = "?".repeat(wordLength);
      setLoading(true);
      try {
        const res = await fetch(`https://api.datamuse.com/words?sp=${pattern}&max=15`);
        const data = await res.json();
        const candidates = data
          .map(item => item.word.toUpperCase())
          .filter(w => /^[A-Z]+$/.test(w));
        if (candidates.length) {
          word = candidates[Math.floor(Math.random() * candidates.length)];
        } else {
          setError("No matching words found.");
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("API error:", err);
        setError("Failed to fetch word from API.");
        setLoading(false);
        return;
      }
      setLoading(false);
    }

    setPractice(word);
    const morseText = word
      .split("")
      .map((char) => MORSE_CODE[char] || "")
      .join(" ");
    setMorse(morseText);
  };

  return (
    <div className="sidebar-widget text-center">
      <h3 className="sidebar-heading flex flex-col items-center gap-1 text-lg font-bold">
        <FiActivity className="text-2xl text-coffee" />
        Morse Code Practice
      </h3>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Convert Text</label>
        <input
          type="text"
          value={text}
          onChange={handleInput}
          placeholder="Type letters or numbers"
          className="w-full p-2 border-persian-orange rounded bg-tan placeholder-coffee"
        />
      </div>

      <div className="font-mono text-sm bg-gunmetal text-tan p-2 rounded min-h-[2rem]">
        {morse}
      </div>

      <div className="my-3 flex flex-col gap-2">
        <label className="text-sm font-semibold">
          Speed: {wpm} WPM
        </label>
       <input
        type="range"
        min={5}
        max={40}
        value={wpm}
        onChange={(e) => setWpm(Number(e.target.value))}
        className="w-full accent-coffee"
       />
      </div>

      <button
        onClick={() => playMorseCode(morse, wpm)}
        className="w-full sidebar-button"
      >
        Play Morse
      </button>

      <hr className="my-4" />
      <div className="mb-2">
        <label className="block text-sm font-semibold mb-1">
          Practice: Choose Your Word Length
        </label>
        <input
          type="number"
          min={1}
          value={wordLength}
          onChange={(e) => setWordLength(Number(e.target.value))}
          className="w-full p-2 border-persian-orange rounded bg-tan"
        />
      </div>

      {loading ? (
        <div className="text-sm text-persian-orange italic mb-2">Fetching word...</div>
      ) : (
        <div className="font-mono text-sm bg-tan p-2 rounded min-h-[2rem]">
          {practice ? practice.split("").map(() => "•").join("") : "— — —"}
        </div>
      )}

      {error && (
        <div className="text-persian-orange text-sm mt-1 mb-2">{error}</div>
     )}

      <div className="flex gap-2 mt-2">
        <button
          onClick={generatePractice}
          disabled={loading}
          className="flex-1 sidebar-button "
        >
          Generate
        </button> 
      </div>

      {practice && !loading && (
        <>
          <button
            onClick={() => playMorseCode(morse, wpm)}
            className="w-full sidebar-button"
          >
            Play
          </button>
          <div className="text-sm text-gunmetal mt-2">
            Press the button below to reveal the word.
          </div>
          <button
            onClick={() => setRevealed(true)}
            disabled={!practice}
            className="w-full sidebar-button"
          >
            Reveal
          </button>
        </>
      )}

      {revealed && practice && (
        <div className="mt-3 text-center text-lg font-bold text-gunmetal">
          {practice}
        </div>
      )}
    </div>  
  );
}
