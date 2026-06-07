import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const BreachAndStrengthChecker = () => {
  const [inputPassword, setInputPassword] = useState("");
  const [inputEntropy, setInputEntropy] = useState(0);
  const [inputStrength, setInputStrength] = useState("Weak");
  const [inputLeakedStatus, setInputLeakedStatus] = useState(null);
  const [inputIsChecking, setInputIsChecking] = useState(false);
  const [showTips, setShowTips] = useState(false);

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
    if (!pwd || pwd.length === 0) { setInputLeakedStatus(null); return; }
    setInputIsChecking(true);
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
          setInputLeakedStatus({ leaked: true, count: parseInt(count) });
          break;
        }
      }
      if (!isLeaked) setInputLeakedStatus({ leaked: false, count: 0 });
    } catch (error) {
      console.error("Error checking breach:", error);
      setInputLeakedStatus({ error: "Could not check breach database" });
    } finally {
      setInputIsChecking(false);
    }
  };

  const handleInputPasswordChange = (e) => {
    const pwd = e.target.value;
    setInputPassword(pwd);
    const entropyValue = calculateEntropy(pwd);
    setInputEntropy(entropyValue);
    setInputStrength(getStrengthLevel(entropyValue));
    const timer = setTimeout(() => { checkPasswordBreach(pwd); }, 500);
    return () => clearTimeout(timer);
  };

  const strengthConfig = getStrengthConfig(inputStrength);

  return (
    <div className='relative bg-black text-white pt-24 pb-16 px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Editorial header */}
        <div className='mb-10'>
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
            Breach &<br/>
            <span className="text-[var(--text-secondary)]">Strength Checker</span>
          </motion.h1>
          <motion.div
            className="w-16 h-[2px] bg-[var(--clr-cyan)]"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </div>

        {/* Main card */}
        <motion.div
          className='relative rounded-2xl p-[1px] overflow-hidden'
          style={{
            background: 'linear-gradient(135deg, rgba(34,211,238,0.15), transparent, rgba(139,92,246,0.1))'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className='bg-[var(--surface-1)] rounded-[15px] p-6 md:p-8 noise-overlay'>
            <div className="relative z-10">
              {/* Input */}
              <div className='mb-6'>
                <label className='block text-[var(--text-muted)] text-xs uppercase tracking-widest mb-2.5'>Enter your password</label>
                <div className='relative rounded-xl p-[1px]' style={{ background: 'linear-gradient(135deg, var(--border-hover), transparent, var(--border-hover))' }}>
                  <input
                    type="password"
                    placeholder='Type a password to analyze...'
                    value={inputPassword}
                    onChange={handleInputPasswordChange}
                    className='w-full bg-[var(--surface-0)] text-white py-4 rounded-[11px] px-4 focus:outline-none transition text-base placeholder:text-[var(--text-muted)] font-mono'
                  />
                </div>
                <p className="text-[var(--text-muted)] text-[10px] mt-2 flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Your password never leaves your browser
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!inputPassword && (
                  <motion.div
                    key="empty-state"
                    className="space-y-3 mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--clr-cyan)" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label: "k-Anonymity", desc: "Only a 5-char hash prefix is sent — your password never leaves your browser", color: "var(--clr-cyan)" },
                        { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--clr-violet)" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, label: "HIBP Database", desc: "Checks against 10+ billion leaked passwords via Have I Been Pwned", color: "var(--clr-violet)" },
                        { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--clr-emerald)" strokeWidth="1.5"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>, label: "Entropy Analysis", desc: "Real-time scoring based on character pool size and password length", color: "var(--clr-emerald)" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="bg-[var(--surface-2)] rounded-xl p-4 border border-[var(--border-subtle)] flex flex-col gap-2"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {item.icon}
                            <span className="text-xs font-medium text-white">{item.label}</span>
                          </div>
                          <p className="text-[var(--text-muted)] text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-2)] p-5">
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-3 flex items-center gap-2">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--clr-amber)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                        What makes a strong password?
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          "At least 12 characters long",
                          "Mix of uppercase and lowercase letters",
                          "Include numbers and symbols",
                          "No dictionary words or personal info",
                          "Unique for every account",
                          "Aim for 80+ bits of entropy",
                        ].map((tip, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="w-1 h-1 rounded-full bg-[var(--clr-amber)] shrink-0" />
                            {tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {inputPassword && (
                  <motion.div
                    key="results"
                    className="space-y-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
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

                    {/* Metrics */}
                    <div className='grid grid-cols-3 gap-3'>
                      {[
                        { label: "Length", value: inputPassword.length, color: "var(--clr-cyan)" },
                        { label: "Unique", value: new Set(inputPassword).size, color: "var(--clr-amber)" },
                        { label: "Entropy", value: inputEntropy, suffix: " bits", color: "var(--clr-violet)" },
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
                    <div className={`rounded-xl p-5 text-center border transition-all duration-500 ${
                      inputIsChecking ? 'bg-[var(--surface-2)] border-[var(--border-subtle)]' :
                      inputLeakedStatus?.leaked ? 'bg-[var(--clr-rose)]/5 border-[var(--clr-rose)]/20' :
                      inputLeakedStatus && !inputLeakedStatus.error ? 'bg-[var(--clr-emerald)]/5 border-[var(--clr-emerald)]/20' :
                      'bg-[var(--surface-2)] border-[var(--border-subtle)]'
                    }`}>
                      {inputIsChecking && (
                        <p className='text-[var(--text-secondary)] flex items-center justify-center gap-2'>
                          <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                          Checking breach database...
                        </p>
                      )}
                      {!inputIsChecking && inputLeakedStatus && (
                        <>
                          {inputLeakedStatus.error ? (
                            <p className='text-[var(--text-muted)]'>{inputLeakedStatus.error}</p>
                          ) : inputLeakedStatus.leaked ? (
                            <div>
                              <p className='text-[var(--clr-rose)] font-medium text-base mb-1'>
                                Found in {inputLeakedStatus.count.toLocaleString()} data breaches
                              </p>
                              <p className='text-[var(--text-muted)] text-xs'>This password has been compromised — change it immediately</p>
                            </div>
                          ) : (
                            <div>
                              <p className='text-[var(--clr-emerald)] font-medium text-base mb-1'>
                                Not found in any known breaches
                              </p>
                              <p className='text-[var(--text-muted)] text-xs'>No matches in the Have I Been Pwned database</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Security tips — collapsible */}
                    <div className='border border-[var(--border-subtle)] rounded-xl overflow-hidden'>
                      <button
                        onClick={() => setShowTips(!showTips)}
                        className='w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors'
                      >
                        <span className='text-sm text-[var(--text-secondary)] flex items-center gap-2'>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--clr-amber)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                          Security Tips
                        </span>
                        <motion.svg
                          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"
                          animate={{ rotate: showTips ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path d="m6 9 6 6 6-6"/>
                        </motion.svg>
                      </button>

                      <AnimatePresence>
                        {showTips && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className='px-4 pb-4 space-y-2'>
                              {[
                                "Use at least 12 characters for strong passwords",
                                "Mix uppercase, lowercase, numbers, and symbols",
                                "Avoid common words and personal information",
                                "Use unique passwords for each account"
                              ].map((tip, i) => (
                                <div key={i} className='flex items-start gap-2 text-sm text-[var(--text-secondary)]'>
                                  <span className="w-1 h-1 rounded-full bg-[var(--clr-amber)] mt-2 shrink-0" />
                                  {tip}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BreachAndStrengthChecker;
