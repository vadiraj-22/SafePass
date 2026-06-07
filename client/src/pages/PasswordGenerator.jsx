import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SLIDER_MIN = 8;
const SLIDER_MAX = 100;

// ─── Custom drag slider ────────────────────────────────────────────────────
// Fully hand-rolled — no <input type="range">, no CSS specificity fights.
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

  // Keyboard support on the thumb
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
      <div className="absolute inset-x-0 h-[6px] rounded-full" style={{ background: 'var(--surface-3)' }} />

      {/* Filled portion */}
      <div
        className="absolute left-0 h-[6px] rounded-full"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(to right, #f59e0b, var(--clr-amber))',
          boxShadow: '0 0 8px rgba(251,191,36,0.4)',
        }}
      />

      {/* Thumb */}
      <div
        role="slider"
        aria-valuemin={SLIDER_MIN}
        aria-valuemax={SLIDER_MAX}
        aria-valuenow={value}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="absolute w-5 h-5 rounded-full border-2 border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clr-amber)] transition-transform duration-75"
        style={{
          left: `calc(${pct}% - 10px)`,
          background: 'linear-gradient(135deg, #a855f7, #8b5cf6)',
          boxShadow: '0 0 0 3px rgba(168,85,247,0.25), 0 2px 8px rgba(0,0,0,0.4)',
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
    if (!max || max <= 0) return 0;
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
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
      "Weak": { color: "var(--clr-rose)", segments: 1, label: "Weak" },
      "Medium": { color: "var(--clr-amber)", segments: 2, label: "Fair" },
      "Strong": { color: "var(--clr-cyan)", segments: 3, label: "Strong" },
      "Military Grade": { color: "var(--clr-emerald)", segments: 4, label: "Military Grade" },
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
    const validLength = Math.max(8, Math.min(100, length));
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*(){}:<>.,?|";
    for (let i = 0; i < validLength; i++) {
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
    <div className='relative bg-black text-white min-h-screen pt-24 pb-16 px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Editorial header */}
        <div className='my-5'>
          <motion.p
            className='text-[var(--text-muted)] text-xs uppercase tracking-[0.2em] mb-3'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Security tool
          </motion.p>
          <motion.h1
            className='font-display text-3xl md:text-5xl text-white leading-tight mb-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Password<br/>
            <span className="text-[var(--text-secondary)]">Generator</span>
          </motion.h1>
          <motion.div
            className="w-16 h-[2px] bg-[var(--clr-amber)]"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </div>

        {/* Main card */}
        <motion.div
          className='relative rounded-2xl p-[1px] overflow-hidden'
          style={{
            background: 'linear-gradient(135deg, rgba(251,191,36,0.15), transparent, rgba(139,92,246,0.1))'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className='bg-[var(--surface-1)] rounded-[15px] p-6 md:p-8 noise-overlay'>
            <div className="relative z-10">
              {/* Password display — dramatic monospace */}
              <div className='mb-8'>
                <div className='relative rounded-xl p-[1px]' style={{ background: 'linear-gradient(135deg, var(--border-hover), transparent, var(--border-hover))' }}>
                  <div className='bg-[var(--surface-0)] rounded-[11px] p-4 md:p-5 flex flex-col sm:flex-row gap-3'>
                    <input
                      type="text"
                      className='flex-1 min-w-0 bg-transparent text-white font-mono text-sm md:text-base overflow-x-auto focus:outline-none tracking-wide'
                      readOnly
                      ref={generatedPasswordRef}
                      value={generatedPassword}
                    />
                    <motion.button
                      className={`shrink-0 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        copied
                          ? 'bg-[var(--clr-emerald)]/15 text-[var(--clr-emerald)] border border-[var(--clr-emerald)]/30'
                          : 'bg-white/[0.06] text-white border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-white/[0.1]'
                      }`}
                      onClick={copyToClipboard}
                      whileTap={{ scale: 0.96 }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={copied ? 'copied' : 'copy'}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-1.5"
                        >
                          {copied ? (
                            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>Copied</>
                          ) : (
                            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy</>
                          )}
                        </motion.span>
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>

                {/* Regenerate */}
                <div className="mt-3 flex justify-start">
                  <motion.button
                    onClick={PasswordGenerater}
                    className='flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] border border-[var(--border-subtle)] bg-[var(--surface-2)] hover:text-white hover:border-[var(--border-hover)] hover:bg-[var(--surface-3)] transition-all duration-200'
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
                    Regenerate
                  </motion.button>
                </div>
              </div>

              {/* Controls */}
              <div className='mb-8 space-y-5'>
                <div>
                  <div className='flex justify-between items-center mb-3'>
                    <label className='text-sm text-[var(--text-secondary)]'>Length</label>
                    <div className='flex items-center gap-2'>
                      <input
                        type="number"
                        min={8}
                        max={100}
                        value={inputValue}
                        onChange={(e) => {
                          const value = e.target.value;
                          setInputValue(value);
                          if (value !== '') {
                            const numValue = parseInt(value, 10);
                            if (!isNaN(numValue)) {
                              setLength(numValue);
                            }
                          }
                        }}
                        onFocus={(e) => e.target.select()}
                        onBlur={(e) => {
                          const value = e.target.value;
                          if (value === '' || value === null || value === undefined) {
                            setLength(8); setInputValue("8"); return;
                          }
                          const numValue = parseInt(value, 10);
                          if (isNaN(numValue) || numValue < 8) { setLength(8); setInputValue("8"); }
                          else if (numValue > 100) { setLength(100); setInputValue("100"); }
                          else { setLength(numValue); setInputValue(numValue.toString()); }
                        }}
                        className='w-14 bg-[var(--surface-3)] text-white text-center py-1.5 px-2 rounded-lg border border-[var(--border-subtle)] focus:border-[var(--clr-violet)] focus:outline-none text-sm font-mono'
                      />
                      <span className='text-xs text-[var(--text-muted)]'>chars</span>
                    </div>
                  </div>
                  <LengthSlider value={Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, length))} onChange={handleSliderChange} />
                  <div className='flex justify-between text-[10px] text-[var(--text-muted)] mt-1.5'>
                    <span>{SLIDER_MIN}</span>
                    <span>{SLIDER_MAX}</span>
                  </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-3'>
                  <label className='flex items-center gap-3 cursor-pointer bg-[var(--surface-2)] px-4 py-3 rounded-xl flex-1 border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-colors'>
                    <input
                      type="checkbox"
                      checked={numAllowed}
                      onChange={() => setNumAllowed(!numAllowed)}
                      className='w-4 h-4 accent-[var(--clr-amber)] rounded'
                    />
                    <span className='text-sm text-[var(--text-secondary)]'>Numbers <span className="text-[var(--text-muted)]">0-9</span></span>
                  </label>
                  <label className='flex items-center gap-3 cursor-pointer bg-[var(--surface-2)] px-4 py-3 rounded-xl flex-1 border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-colors'>
                    <input
                      type="checkbox"
                      checked={charAllowed}
                      onChange={() => setCharAllowed(!charAllowed)}
                      className='w-4 h-4 accent-[var(--clr-amber)] rounded'
                    />
                    <span className='text-sm text-[var(--text-secondary)]'>Symbols <span className="text-[var(--text-muted)]">!@#$...</span></span>
                  </label>
                </div>
              </div>

              {/* Strength & Metrics */}
              {generatedPassword && (
                <div className="space-y-4">
                  {/* Segmented strength bar */}
                  <div>
                    <div className='flex justify-between items-center mb-2.5'>
                      <span className='text-xs text-[var(--text-muted)] uppercase tracking-widest'>Strength</span>
                      <span className='text-xs font-medium' style={{ color: strengthConfig.color }}>{strengthConfig.label}</span>
                    </div>
                    <div className="strength-segments">
                      {[1, 2, 3, 4].map(i => (
                        <motion.div
                          key={i}
                          className="strength-segment"
                          animate={{
                            background: i <= strengthConfig.segments ? strengthConfig.color : 'var(--surface-3)'
                          }}
                          transition={{ duration: 0.4, delay: i * 0.08 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Metrics row */}
                  <div className='grid grid-cols-3 gap-3'>
                    {[
                      { label: "Length", value: Math.max(8, Math.min(100, length)), color: "var(--clr-amber)" },
                      { label: "Unique", value: new Set(generatedPassword).size, color: "var(--clr-cyan)" },
                      { label: "Entropy", value: genEntropy, suffix: " bits", color: "var(--clr-violet)" },
                    ].map(metric => (
                      <div key={metric.label} className='bg-[var(--surface-2)] rounded-xl p-3.5 text-center border border-[var(--border-subtle)]'>
                        <p className='text-[var(--text-muted)] text-[10px] uppercase tracking-widest mb-1'>{metric.label}</p>
                        <p className='text-lg font-display' style={{ color: metric.color }}>
                          {metric.value}{metric.suffix || ''}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Breach status */}
                  <div className={`rounded-xl p-4 text-center text-sm border ${
                    genIsChecking ? 'bg-[var(--surface-2)] border-[var(--border-subtle)]' :
                    genLeakedStatus?.leaked ? 'bg-[var(--clr-rose)]/5 border-[var(--clr-rose)]/20' :
                    genLeakedStatus && !genLeakedStatus.error ? 'bg-[var(--clr-emerald)]/5 border-[var(--clr-emerald)]/20' :
                    'bg-[var(--surface-2)] border-[var(--border-subtle)]'
                  }`}>
                    {genIsChecking && (
                      <p className='text-[var(--text-secondary)] flex items-center justify-center gap-2'>
                        <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                        Checking breach database...
                      </p>
                    )}
                    {!genIsChecking && genLeakedStatus && (
                      <>
                        {genLeakedStatus.error ? (
                          <p className='text-[var(--text-muted)]'>{genLeakedStatus.error}</p>
                        ) : genLeakedStatus.leaked ? (
                          <p className='text-[var(--clr-rose)] font-medium'>
                            Found in {genLeakedStatus.count.toLocaleString()} breaches — regenerate recommended
                          </p>
                        ) : (
                          <p className='text-[var(--clr-emerald)] font-medium'>
                            Not found in any known breaches
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  {/* Tip — placed after all metrics so it doesn't overwhelm */}
                  {length < 12 && (
                    <div className='flex items-start gap-2.5 rounded-xl px-4 py-3 bg-[var(--clr-amber)]/5 border border-[var(--clr-amber)]/20'>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--clr-amber)" strokeWidth="2" className="shrink-0 mt-0.5"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      <p className='text-[11px] text-[var(--clr-amber)]/80'>Use at least 12 characters for a secure password.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
