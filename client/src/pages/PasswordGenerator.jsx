import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SLIDER_MIN = 8;
const SLIDER_MAX = 100;

// ─── Custom drag slider ────────────────────────────────────────────────────
const LengthSlider = ({ value, onChange }) => {
  const trackRef = useRef(null);
  const isDragging = useRef(false);

  const pct = ((Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, value)) - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;

  const valueFromPointer = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(SLIDER_MIN + ratio * (SLIDER_MAX - SLIDER_MIN));
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    onChange(valueFromPointer(e.clientX));
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    onChange(valueFromPointer(e.clientX));
  };

  const onPointerUp = () => { isDragging.current = false; };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      onChange(Math.min(SLIDER_MAX, value + 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      onChange(Math.max(SLIDER_MIN, value - 1));
    }
  };

  return (
    <div
      ref={trackRef}
      className="relative w-full h-6 flex items-center cursor-pointer select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Track background */}
      <div className="absolute inset-x-0 h-[6px] rounded-full bg-gray-800" />

      {/* Filled portion */}
      <div
        className="absolute left-0 h-[6px] rounded-full bg-emerald-500"
        style={{ width: `${pct}%` }}
      />

      {/* Thumb */}
      <div
        role="slider"
        aria-valuemin={SLIDER_MIN}
        aria-valuemax={SLIDER_MAX}
        aria-valuenow={value}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="absolute w-5 h-5 rounded-full border-2 border-slate-950 bg-emerald-400 focus:outline-none transition-transform duration-75"
        style={{
          left: `calc(${pct}% - 10px)`,
          cursor: isDragging.current ? 'grabbing' : 'grab',
        }}
      />
    </div>
  );
};

const PasswordGenerator = () => {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [length, setLength] = useState(48);
  const [inputValue, setInputValue] = useState("48");
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [genEntropy, setGenEntropy] = useState(0);
  const [genStrength, setGenStrength] = useState("Weak");
  const [genLeakedStatus, setGenLeakedStatus] = useState(null);
  const [genIsChecking, setGenIsChecking] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatedPasswordRef = useRef(null);

  const getSecureRandom = (max) => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  };

  const calculateEntropy = (pwd) => {
    if (!pwd || pwd.length === 0) return 0;
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasDigit = /[0-9]/.test(pwd);
    const hasSymbol = /[^A-Za-z0-9]/.test(pwd);
    let poolSize = 0;
    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasDigit) poolSize += 10;
    if (hasSymbol) poolSize += 32;
    if (poolSize === 0) return 0;
    return Number((pwd.length * Math.log2(poolSize)).toFixed(2));
  };

  const getStrengthLevel = (entropyValue) => {
    if (entropyValue < 40) return "Weak";
    if (entropyValue < 60) return "Medium";
    if (entropyValue < 80) return "Strong";
    return "Military Grade";
  };

  const getStrengthConfig = (level) => {
    const configs = {
      "Weak": { color: "#f43f5e", segments: 1, label: "Weak" },
      "Medium": { color: "#eab308", segments: 2, label: "Fair" },
      "Strong": { color: "#38bdf8", segments: 3, label: "Strong" },
      "Military Grade": { color: "#34d399", segments: 4, label: "Military Grade" },
    };
    return configs[level] || configs["Weak"];
  };

  const checkPasswordBreach = async (pwd) => {
    if (!pwd || pwd.length === 0) { setGenLeakedStatus(null); return; }
    setGenIsChecking(true);
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(pwd);
      const hashBuffer = await crypto.subtle.digest("SHA-1", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      const firstFive = hashHex.substring(0, 5);
      const remaining = hashHex.substring(5);
      const response = await fetch(`https://api.pwnedpasswords.com/range/${firstFive}`);
      const text = await response.text();
      const lines = text.split('\r\n');
      let isLeaked = false;
      for (let line of lines) {
        const [hash, count] = line.split(':');
        if (hash === remaining) {
          isLeaked = true;
          setGenLeakedStatus({ leaked: true, count: parseInt(count) });
          break;
        }
      }
      if (!isLeaked) setGenLeakedStatus({ leaked: false, count: 0 });
    } catch (error) {
      console.error("Error checking breach:", error);
      setGenLeakedStatus({ error: "Could not check breach database" });
    } finally {
      setGenIsChecking(false);
    }
  };

  const PasswordGenerater = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    for (let i = 1; i <= length; i++) {
      let char = getSecureRandom(str.length);
      pass += str.charAt(char);
    }
    setGeneratedPassword(pass);
    const entropyValue = calculateEntropy(pass);
    setGenEntropy(entropyValue);
    setGenStrength(getStrengthLevel(entropyValue));
    checkPasswordBreach(pass);
  }, [length, charAllowed, numAllowed]);

  const handleSliderChange = (newValue) => {
    setLength(newValue);
    setInputValue(newValue.toString());
  };

  const copyToClipboard = useCallback(() => {
    generatedPasswordRef.current?.select();
    window.navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generatedPassword]);

  useEffect(() => {
    PasswordGenerater();
  }, [length, numAllowed, charAllowed, PasswordGenerater]);

  const strengthConfig = getStrengthConfig(genStrength);

  return (
    <div className='relative text-white pt-24 md:pt-28 pb-16 px-4 md:px-6 max-w-6xl mx-auto space-y-6'>
      {/* Editorial Header */}
      <div className="bg-black/65 backdrop-blur-md border border-gray-800/80 rounded-2xl md:rounded-3xl p-6 md:p-7 shadow-2xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          CRYPTOGRAPHIC PASSWORD GENERATOR
        </div>

        <motion.h1
          className='font-display text-2xl md:text-4xl text-white font-extrabold tracking-tight leading-tight'
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Password Generator & <span className="text-purple-400 font-extrabold">Entropy Analyzer</span>
        </motion.h1>

        <p className="text-slate-300 text-xs md:text-sm max-w-3xl leading-relaxed font-body">
          Generate secure, zero-predictability passwords with customizable character pools and real-time bit entropy scoring.
        </p>
      </div>

      {/* Main card */}
      <motion.div
        className='rounded-2xl md:rounded-3xl border border-gray-800/80 bg-black/65 backdrop-blur-md p-5 md:p-7 shadow-2xl space-y-5'
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Password display */}
        <div className='relative rounded-2xl border border-gray-800 bg-[#05050a] p-4 md:p-5 flex flex-col sm:flex-row gap-3 items-center justify-between'>
          <input
            type="text"
            value={generatedPassword}
            className='w-full bg-transparent text-white font-mono text-lg md:text-xl font-bold tracking-wider focus:outline-none select-all break-all'
            readOnly
            ref={generatedPasswordRef}
          />
          
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={PasswordGenerater}
              className="p-3.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-slate-200 font-bold transition-colors border border-gray-700 cursor-pointer"
              title="Regenerate"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M2.5 22v-6h6"/><path d="M2 11.5a10 10 0 0 1 18.8-4.3L21.5 8M22 12.5a10 10 0 0 1-18.8 4.2L2.5 16"/></svg>
            </button>

            <button
              onClick={copyToClipboard}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm font-mono transition-colors cursor-pointer"
            >
              {copied ? "COPIED!" : "COPY PASSWORD"}
            </button>
          </div>
        </div>

        {/* Length & Pool Controls */}
        <div className="space-y-5 bg-[#12131e] p-5 md:p-6 rounded-2xl border border-gray-800">
          <div className="flex justify-between items-center font-mono text-xs text-slate-300">
            <span className="uppercase tracking-widest font-semibold">Length: {length} Characters</span>
            <span className="font-bold text-emerald-400">{length} CHARS</span>
          </div>

          <LengthSlider value={length} onChange={handleSliderChange} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-gray-800/60 font-mono text-xs">
            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#05050a] border border-gray-800 cursor-pointer hover:border-gray-700">
              <input
                type="checkbox"
                checked={numAllowed}
                onChange={(e) => setNumAllowed(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
              <span className="text-white font-medium">Include Numbers (0-9)</span>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#05050a] border border-gray-800 cursor-pointer hover:border-gray-700">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={(e) => setCharAllowed(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
              <span className="text-white font-medium">Include Symbols (!@#$%)</span>
            </label>
          </div>
        </div>

        {/* Strength & Entropy Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          <div className="bg-[#12131e] p-5 rounded-2xl border border-gray-800 text-center space-y-1">
            <span className="text-xs uppercase text-slate-400 font-semibold">Entropy Score</span>
            <p className="text-xl font-bold text-slate-200">{genEntropy} bits</p>
          </div>

          <div className="bg-[#12131e] p-5 rounded-2xl border border-gray-800 text-center space-y-1">
            <span className="text-xs uppercase text-slate-400 font-semibold">Security Rating</span>
            <p className="text-xl font-bold" style={{ color: strengthConfig.color }}>{strengthConfig.label}</p>
          </div>

          <div className="bg-[#12131e] p-5 rounded-2xl border border-gray-800 text-center space-y-1">
            <span className="text-xs uppercase text-slate-400 font-semibold">Leak Status</span>
            <p className="text-lg font-bold text-emerald-400">
              {genIsChecking ? "Checking..." : genLeakedStatus?.leaked ? "⚠️ Compromised" : "Clean — Zero Leaks"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PasswordGenerator;
