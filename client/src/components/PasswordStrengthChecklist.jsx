import { Check, X } from 'lucide-react';

/**
 * Password Strength Checklist Component
 * Evaluates password strength and displays visual rules + progress bar.
 */
export const checkPasswordRequirements = (password = '') => {
  return {
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };
};

export const PasswordStrengthChecklist = ({ password = '' }) => {
  if (!password) return null;

  const reqs = checkPasswordRequirements(password);
  const metCount = Object.values(reqs).filter(Boolean).length;

  let strengthLabel = 'Weak';
  let strengthColor = 'bg-rose-500 text-rose-400';
  let barWidth = '20%';

  if (metCount === 5) {
    strengthLabel = 'Strong';
    strengthColor = 'bg-emerald-500 text-emerald-400';
    barWidth = '100%';
  } else if (metCount >= 3) {
    strengthLabel = 'Moderate';
    strengthColor = 'bg-amber-500 text-amber-400';
    barWidth = '60%';
  } else if (metCount >= 2) {
    strengthLabel = 'Fair';
    strengthColor = 'bg-yellow-500 text-yellow-400';
    barWidth = '40%';
  }

  const items = [
    { key: 'minLength', label: '8+ Characters' },
    { key: 'hasUpper', label: 'Uppercase Letter (A-Z)' },
    { key: 'hasLower', label: 'Lowercase Letter (a-z)' },
    { key: 'hasNumber', label: 'Number (0-9)' },
    { key: 'hasSpecial', label: 'Special Character (!@#$)' },
  ];

  return (
    <div className="mt-3 p-3 rounded-lg bg-[#0d0e15] border border-white/10 text-xs space-y-2.5">
      {/* Strength Bar */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-[11px] font-mono uppercase tracking-wider">Password Strength</span>
        <span className={`font-mono font-bold text-[11px] ${strengthColor.split(' ')[1]}`}>
          {strengthLabel} ({metCount}/5)
        </span>
      </div>

      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${strengthColor.split(' ')[0]}`}
          style={{ width: barWidth }}
        />
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-2 gap-1.5 pt-1">
        {items.map((item) => {
          const isMet = reqs[item.key];
          return (
            <div
              key={item.key}
              className={`flex items-center gap-1.5 text-[11px] font-mono transition-colors ${
                isMet ? 'text-emerald-400 font-medium' : 'text-gray-400'
              }`}
            >
              {isMet ? (
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0 mx-0.5" />
              )}
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
