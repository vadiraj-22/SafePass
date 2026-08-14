/**
 * Validates whether a password meets strong security standards:
 * - Minimum 8 characters
 * - At least 1 uppercase letter (A-Z)
 * - At least 1 lowercase letter (a-z)
 * - At least 1 numeric digit (0-9)
 * - At least 1 special character (!@#$%^&*...)
 */
export const isStrongPassword = (password) => {
  if (!password || typeof password !== 'string') return false;

  const minLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
};

export const PASSWORD_REQUIREMENTS_MSG =
  'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.';
