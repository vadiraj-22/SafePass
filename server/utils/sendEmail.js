import nodemailer from 'nodemailer';

/**
 * Send email using Nodemailer with SMTP config or fallback to console logging in development.
 * @param {Object} options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.otp - 6-digit OTP code
 * @param {string} options.type - 'login_verification' | 'password_reset'
 */
export const sendEmail = async ({ to, subject, otp, type = 'login_verification' }) => {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    EMAIL_FROM
  } = process.env;

  const isPasswordReset = type === 'password_reset';
  const actionTitle = isPasswordReset ? 'Password Reset Code' : '2-Step Verification Code';
  const actionDesc = isPasswordReset
    ? 'You requested a password reset for your SafePass vault. Enter the verification code below to authorize setting a new password:'
    : 'A sign-in request to your SafePass account requires 2-Step Email Verification. Enter the code below to complete sign-in:';

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${actionTitle}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #050508; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #f4f4f5; -webkit-font-smoothing: antialiased;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #050508;">
        <tr>
          <td align="center" style="padding: 40px 16px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: #0f1017; border: 1px solid #1e202e; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);">
              
              <!-- Brand Header -->
              <tr>
                <td style="padding: 36px 36px 28px 36px; text-align: center; border-bottom: 1px solid #1a1c29; background: linear-gradient(180deg, #131522 0%, #0f1017 100%);">
                  <div style="display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 16px; margin-bottom: 16px; box-shadow: 0 0 20px rgba(16, 185, 129, 0.15);">
                    <span style="font-size: 28px; line-height: 1;">🛡️</span>
                  </div>
                  <h1 style="margin: 0; font-size: 26px; font-weight: 800; tracking: -0.5px; color: #ffffff; letter-spacing: -0.5px;">SafePass</h1>
                  <p style="margin: 6px 0 0 0; font-size: 11px; font-weight: 700; color: #34d399; text-transform: uppercase; letter-spacing: 2px;">Security Verification</p>
                </td>
              </tr>

              <!-- Body Content -->
              <tr>
                <td style="padding: 32px 36px;">
                  <h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 700; color: #ffffff;">${actionTitle}</h2>
                  <p style="margin: 0 0 28px 0; font-size: 14px; line-height: 1.6; color: #94a3b8;">
                    ${actionDesc}
                  </p>

                  <!-- Modern OTP Container -->
                  <div style="background-color: #090a0f; border: 1px solid #1e293b; border-radius: 14px; padding: 24px 20px; text-align: center; margin-bottom: 28px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);">
                    <span style="display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748b; margin-bottom: 10px;">One-Time Security Code</span>
                    <span style="font-family: 'SF Mono', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 38px; font-weight: 800; letter-spacing: 10px; color: #10b981; text-shadow: 0 0 12px rgba(16, 185, 129, 0.3);">${otp}</span>
                  </div>

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 10px; padding: 12px 14px; margin-bottom: 8px;">
                    <tr>
                      <td style="font-size: 12px; color: #fbbf24; line-height: 1.5;">
                        ⏱️ This code will expire in <strong>10 minutes</strong>. Never share this OTP with anyone, including SafePass support.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Professional Footer -->
              <tr>
                <td style="padding: 24px 36px; background-color: #090a0f; border-top: 1px solid #1a1c29; text-align: center;">
                  <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5;">
                    If you did not initiate this request, please log in to your SafePass account immediately and update your password.
                  </p>
                  <p style="margin: 12px 0 0 0; font-size: 11px; color: #475569;">
                    &copy; ${new Date().getFullYear()} SafePass Vault &bull; End-to-End Encrypted Security
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  // Log OTP to server console in development environment only for debugging
  if (process.env.NODE_ENV !== 'production') {
    console.log('\n==================================================');
    console.log(`[DEV OTP LOG] 📧 Sent to: ${to}`);
    console.log(`[DEV OTP LOG] 📌 Type: ${type}`);
    console.log(`[DEV OTP LOG] 🔐 OTP Code: ${otp}`);
    console.log('==================================================\n');
  } else {
    console.log(`[sendEmail] Preparing OTP email for: ${to} (Type: ${type})`);
  }

  // Check if SMTP is configured
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log('[sendEmail] SMTP environment variables not configured. Used dev console fallback.');
    return { success: true, mode: 'console' };
  }

  try {
    const port = Number(SMTP_PORT) || 587;
    const isSecure = port === 465;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: isSecure,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 10000
    });

    // Explicitly set sender display name as "SafePass Security"
    const fromSender = EMAIL_FROM || {
      name: 'SafePass Security',
      address: SMTP_USER
    };

    await transporter.sendMail({
      from: fromSender,
      to,
      subject: `SafePass Security: ${subject}`,
      html: htmlContent,
      text: `Your ${actionTitle} is: ${otp}. Valid for 10 minutes.`
    });

    return { success: true, mode: 'smtp' };
  } catch (error) {
    console.error('[sendEmail] Error sending email via SMTP:', error.message);
    return { success: false, mode: 'console_fallback', error: error.message };
  }
};
