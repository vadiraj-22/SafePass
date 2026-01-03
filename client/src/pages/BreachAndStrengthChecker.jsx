import { useState } from 'react';

const BreachAndStrengthChecker = () => {
  const [inputPassword, setInputPassword] = useState("");
  const [inputEntropy, setInputEntropy] = useState(0);
  const [inputStrength, setInputStrength] = useState("Weak");
  const [inputLeakedStatus, setInputLeakedStatus] = useState(null);
  const [inputIsChecking, setInputIsChecking] = useState(false);

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
      setInputLeakedStatus(null);
      return;
    }

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

      if (!isLeaked) {
        setInputLeakedStatus({ leaked: false, count: 0 });
      }
    } catch (error) {
      console.error("Error checking breach:", error);
      setInputLeakedStatus({ error: "Could not check breach database" });
    } finally {
      setInputIsChecking(false);
    }
  };

  // Handle input change
  const handleInputPasswordChange = (e) => {
    const pwd = e.target.value;
    setInputPassword(pwd);
    
    const entropyValue = calculateEntropy(pwd);
    setInputEntropy(entropyValue);
    const strengthLevel = getStrengthLevel(entropyValue);
    setInputStrength(strengthLevel);
    
    const timer = setTimeout(() => {
      checkPasswordBreach(pwd);
    }, 500);

    return () => clearTimeout(timer);
  };

  return (
    <div className='relative bg-black text-white min-h-screen pt-24 pb-16 px-6'>

      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-18'>
          <h1 className='md:text-5xl text-4xl font-bold my-4 cybersec-title'>
            <span className='bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent'>
              Password Strength & Breach Checker
            </span>
          </h1>
          <p className='text-gray-400 text-lg'>
            Analyze your password strength and check if it's been compromised in data breaches
          </p>
        </div>

        <div className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8'>
          <div className='mb-6'>
            <label className='block text-sm font-semibold mb-2'>Enter Your Password</label>
            <input 
              type="password"
              placeholder='Type password to analyze...'
              value={inputPassword}
              onChange={handleInputPasswordChange}
              className='w-full bg-gray-900 text-white py-4 rounded-lg px-4 border border-gray-700 focus:border-purple-500 focus:outline-none transition text-lg'
            />
          </div>

          {inputPassword && (
            <>
              {/* Strength Meter */}
              <div className='bg-gray-900 p-6 rounded-lg mb-6'>
                <div className='flex justify-between mb-3'>
                  <span className='text-sm font-semibold'>Password Strength</span>
                  <span className={`text-sm font-bold ${
                    inputStrength === "Weak" ? "text-red-500" :
                    inputStrength === "Medium" ? "text-yellow-500" :
                    inputStrength === "Strong" ? "text-blue-500" :
                    "text-green-500"
                  }`}>{inputStrength}</span>
                </div>
                <div className='w-full bg-gray-700 rounded-full h-4 overflow-hidden'>
                  <div className={`h-full transition-all ${getStrengthColor(inputStrength)}`}
                    style={{width: `${Math.min((inputEntropy / 100) * 100, 100)}%`}}></div>
                </div>
              </div>

              {/* Metrics */}
              <div className='grid grid-cols-3 gap-4 mb-6'>
                <div className='bg-gray-900 p-4 rounded-lg text-center'>
                  <p className='text-gray-400 text-sm mb-1'>Length</p>
                  <p className='text-2xl font-bold'>{inputPassword.length}</p>
                </div>
                <div className='bg-gray-900 p-4 rounded-lg text-center'>
                  <p className='text-gray-400 text-sm mb-1'>Unique Chars</p>
                  <p className='text-2xl font-bold'>{new Set(inputPassword).size}</p>
                </div>
                <div className='bg-gray-900 p-4 rounded-lg text-center'>
                  <p className='text-gray-400 text-sm mb-1'>Entropy (bits)</p>
                  <p className='text-2xl font-bold'>{inputEntropy}</p>
                </div>
              </div>

              {/* Breach Status */}
              <div className='bg-gray-900 p-4 rounded-lg'>
                {inputIsChecking && <p className='text-yellow-400 text-center'>🔍 Checking breach database...</p>}
                {!inputIsChecking && inputLeakedStatus && (
                  <>
                    {inputLeakedStatus.error ? (
                      <p className='text-gray-400 text-center'>{inputLeakedStatus.error}</p>
                    ) : inputLeakedStatus.leaked ? (
                      <p className='text-red-500 font-semibold text-center text-lg'>
                        ⚠️ WARNING: Found in {inputLeakedStatus.count.toLocaleString()} data breaches!
                      </p>
                    ) : (
                      <p className='text-green-500 font-semibold text-center text-lg'>
                        ✅ Safe - No breaches found in database
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Security Tips */}
              <div className='mt-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg'>
                <h3 className='font-semibold mb-2 text-purple-400'>💡 Security Tips:</h3>
                <ul className='text-sm text-gray-300 space-y-1'>
                  <li>• Use at least 12 characters for strong passwords</li>
                  <li>• Mix uppercase, lowercase, numbers, and symbols</li>
                  <li>• Avoid common words and personal information</li>
                  <li>• Use unique passwords for each account</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreachAndStrengthChecker;
