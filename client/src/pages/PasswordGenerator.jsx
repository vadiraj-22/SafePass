import { useState, useCallback, useEffect, useRef } from 'react';

const PasswordGenerator = () => {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [length, setLength] = useState(16);
  const [charAllowed, setCharAllowed] = useState(true);
  const [numAllowed, setNumAllowed] = useState(true);
  const [genEntropy, setGenEntropy] = useState(0);
  const [genStrength, setGenStrength] = useState("Weak");
  const [genLeakedStatus, setGenLeakedStatus] = useState(null);
  const [genIsChecking, setGenIsChecking] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatedPasswordRef = useRef(null);

  // Cryptographically secure random
  const getSecureRandom = (max) => {
    if (!max || max <= 0) return 0;
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  };

  // Calculate entropy
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

    const entropyValue = pwd.length * Math.log2(poolSize);
    return Number(entropyValue.toFixed(2));
  };

  // Get strength level
  const getStrengthLevel = (entropyValue) => {
    if (entropyValue < 40) return "Weak";
    if (entropyValue < 60) return "Medium";
    if (entropyValue < 80) return "Strong";
    return "Military Grade";
  };

  // Get strength color
  const getStrengthColor = (strengthLevel) => {
    switch (strengthLevel) {
      case "Weak":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Strong":
        return "bg-blue-500";
      case "Military Grade":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  // Check password breach
  const checkPasswordBreach = async (pwd) => {
    if (!pwd || pwd.length === 0) {
      setGenLeakedStatus(null);
      return;
    }

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

      if (!isLeaked) {
        setGenLeakedStatus({ leaked: false, count: 0 });
      }
    } catch (error) {
      console.error("Error checking breach:", error);
      setGenLeakedStatus({ error: "Could not check breach database" });
    } finally {
      setGenIsChecking(false);
    }
  };

  // Password generator
  const PasswordGenerater = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*(){}:<>.,?|";

    for (let i = 0; i < length; i++) {
      let char = getSecureRandom(str.length);
      pass += str.charAt(char);
    }
    setGeneratedPassword(pass);
    
    const entropyValue = calculateEntropy(pass);
    setGenEntropy(entropyValue);
    const strengthLevel = getStrengthLevel(entropyValue);
    setGenStrength(strengthLevel);

    checkPasswordBreach(pass);
  }, [length, charAllowed, numAllowed]);

  // Copy to clipboard
  const copyToClipboard = useCallback(() => {
    generatedPasswordRef.current?.select();
    window.navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generatedPassword]);

  useEffect(() => {
    PasswordGenerater();
  }, [length, numAllowed, charAllowed, PasswordGenerater]);

  return (
    <div className='relative bg-black text-white min-h-screen pt-24 pb-16 px-6'>
     
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold mb-4 bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent'>
            ⚡ Random Password Generator
          </h1>
          <p className='text-gray-400 text-lg'>
            Generate cryptographically secure passwords with customizable options
          </p>
        </div>

        <div className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8'>
          {/* Generated Password Display */}
          <div className='flex flex-col sm:flex-row gap-3 mb-8'>
            <input 
              type="text"
              className='flex-1 min-w-0 bg-gray-900 text-white py-3 sm:py-4 rounded-lg px-3 sm:px-4 border border-gray-700 font-mono text-base sm:text-lg overflow-x-auto'
              readOnly
              ref={generatedPasswordRef}
              value={generatedPassword}
            />
            <button 
              className={`${copied ? 'bg-green-500' : 'bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'} text-white font-semibold py-3 sm:py-4 px-4 sm:px-8 rounded-lg transition w-full sm:w-auto`}
              onClick={copyToClipboard}
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>

          {/* Controls */}
          <div className='mb-8 space-y-6'>
            <div>
              <div className='flex justify-between mb-3'>
                <label className='text-sm font-semibold'>Password Length</label>
                <span className='text-sm text-purple-400 font-semibold'>{length} characters</span>
              </div>
              <input 
                type="range"
                min={8}
                max={100}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500'
              />
              <div className='flex justify-between text-xs text-gray-500 mt-1'>
                <span>8</span>
                <span>100</span>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-6'>
              <label className='flex items-center gap-3 cursor-pointer bg-gray-900 px-4 py-3 rounded-lg flex-1'>
                <input 
                  type="checkbox"
                  checked={numAllowed}
                  onChange={() => setNumAllowed(!numAllowed)}
                  className='w-5 h-5 accent-purple-500'
                />
                <span className='text-sm font-medium'>Include Numbers (0-9)</span>
              </label>
              <label className='flex items-center gap-3 cursor-pointer bg-gray-900 px-4 py-3 rounded-lg flex-1'>
                <input 
                  type="checkbox"
                  checked={charAllowed}
                  onChange={() => setCharAllowed(!charAllowed)}
                  className='w-5 h-5 accent-purple-500'
                />
                <span className='text-sm font-medium'>Include Symbols (~!@#$...)</span>
              </label>
            </div>
          </div>

          {/* Strength Meter */}
          {generatedPassword && (
            <>
              <div className='bg-gray-900 p-6 rounded-lg mb-6'>
                <div className='flex justify-between mb-3'>
                  <span className='text-sm font-semibold'>Password Strength</span>
                  <span className={`text-sm font-bold ${
                    genStrength === "Weak" ? "text-red-500" :
                    genStrength === "Medium" ? "text-yellow-500" :
                    genStrength === "Strong" ? "text-blue-500" :
                    "text-green-500"
                  }`}>{genStrength}</span>
                </div>
                <div className='w-full bg-gray-700 rounded-full h-4 overflow-hidden'>
                  <div className={`h-full transition-all ${getStrengthColor(genStrength)}`}
                    style={{width: `${Math.min((genEntropy / 100) * 100, 100)}%`}}></div>
                </div>
              </div>

              {/* Metrics */}
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
                <div className='bg-gray-900 p-4 rounded-lg text-center'>
                  <p className='text-gray-400 text-sm mb-1'>Length</p>
                  <p className='text-2xl font-bold'>{length}</p>
                </div>
                <div className='bg-gray-900 p-4 rounded-lg text-center'>
                  <p className='text-gray-400 text-sm mb-1'>Unique Chars</p>
                  <p className='text-2xl font-bold'>{new Set(generatedPassword).size}</p>
                </div>
                <div className='bg-gray-900 p-4 rounded-lg text-center'>
                  <p className='text-gray-400 text-sm mb-1'>Entropy (bits)</p>
                  <p className='text-2xl font-bold'>{genEntropy}</p>
                </div>
              </div>

              {/* Breach Status */}
              <div className='bg-gray-900 p-4 rounded-lg'>
                {genIsChecking && <p className='text-yellow-400 text-center'>🔍 Checking breach database...</p>}
                {!genIsChecking && genLeakedStatus && (
                  <>
                    {genLeakedStatus.error ? (
                      <p className='text-gray-400 text-center'>{genLeakedStatus.error}</p>
                    ) : genLeakedStatus.leaked ? (
                      <p className='text-red-500 font-semibold text-center text-lg'>
                        ⚠️ Found in {genLeakedStatus.count.toLocaleString()} breaches
                      </p>
                    ) : (
                      <p className='text-green-500 font-semibold text-center text-lg'>
                        ✅ Safe - No breaches found
                      </p>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
