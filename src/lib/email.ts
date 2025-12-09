import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWaitlistConfirmation(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Gruby <noreply@gruby.app>",
      to: [email],
      subject: "Welcome to the Gruby Waitlist! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Gruby</title>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f7;
              color: #222222;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              padding: 40px 0;
              background: white;
              border-radius: 16px 16px 0 0;
            }
            .logo {
              width: 120px;
              height: auto;
              margin-bottom: 20px;
            }
            .content {
              background: white;
              padding: 0 40px 40px;
              border-radius: 0 0 16px 16px;
            }
            .title {
              font-size: 28px;
              font-weight: 700;
              margin-bottom: 16px;
              color: #222222;
            }
            .subtitle {
              font-size: 18px;
              color: #717171;
              margin-bottom: 32px;
              line-height: 1.5;
            }
            .feature-list {
              background: #f5f5f7;
              border-radius: 12px;
              padding: 24px;
              margin: 32px 0;
            }
            .feature-item {
              display: flex;
              align-items: center;
              margin-bottom: 16px;
            }
            .feature-item:last-child {
              margin-bottom: 0;
            }
            .checkmark {
              width: 24px;
              height: 24px;
              background: #FF1E00;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 16px;
              flex-shrink: 0;
            }
            .checkmark::after {
              content: '✓';
              color: white;
              font-weight: bold;
            }
            .feature-text {
              font-size: 16px;
              color: #222222;
            }
            .cta-button {
              display: inline-block;
              background: #FF1E00;
              color: white;
              text-decoration: none;
              padding: 16px 32px;
              border-radius: 50px;
              font-weight: 600;
              font-size: 16px;
              text-align: center;
              margin: 32px 0;
              transition: background-color 0.2s;
            }
            .cta-button:hover {
              background: #E01A00;
            }
            .footer {
              text-align: center;
              padding: 32px 0;
              color: #717171;
              font-size: 14px;
            }
            .social-links {
              margin-top: 16px;
            }
            .social-link {
              color: #717171;
              text-decoration: none;
              margin: 0 8px;
            }
            .social-link:hover {
              color: #FF1E00;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://gruby.app/GrubyLogo.svg" alt="Gruby Logo" class="logo">
            </div>
            <div class="content">
              <h1 class="title">You're on the list! 🎉</h1>
              <p class="subtitle">
                Thanks for joining the Gruby waitlist. We're building something special to help you cook smarter and save more.
              </p>
              
              <div class="feature-list">
                <div class="feature-item">
                  <div class="checkmark"></div>
                  <div class="feature-text">Save $300+ per month on food</div>
                </div>
                <div class="feature-item">
                  <div class="checkmark"></div>
                  <div class="feature-text">Connect with local home cooks</div>
                </div>
                <div class="feature-item">
                  <div class="checkmark"></div>
                  <div class="feature-text">Track your savings in real-time</div>
                </div>
              </div>
              
              <div style="text-align: center;">
                <a href="https://gruby.app" class="cta-button">Learn More About Gruby</a>
              </div>
              
              <p style="font-size: 16px; color: #717171; line-height: 1.5; margin-top: 32px;">
                We'll send you updates as we get closer to launch. In the meantime, follow us on social media for cooking tips and behind-the-scenes content!
              </p>
            </div>
            <div class="footer">
              <p>© 2024 Gruby. All rights reserved.</p>
              <div class="social-links">
                <a href="#" class="social-link">Twitter</a>
                <a href="#" class="social-link">Instagram</a>
                <a href="#" class="social-link">LinkedIn</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email service error:", error);
    return { success: false, error };
  }
}

export async function sendAdminNotification(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Gruby <noreply@gruby.app>",
      to: ["itskennedy.dev@gmail.com"],
      subject: "New Waitlist Signup! 🚀",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Waitlist Signup</title>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f7;
              color: #222222;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: #FF1E00;
              color: white;
              padding: 32px;
              border-radius: 16px 16px 0 0;
              text-align: center;
            }
            .logo {
              width: 80px;
              height: auto;
              margin-bottom: 16px;
            }
            .title {
              font-size: 24px;
              font-weight: 700;
              margin: 0;
            }
            .content {
              background: white;
              padding: 32px;
              border-radius: 0 0 16px 16px;
            }
            .email-box {
              background: #f5f5f7;
              border: 2px solid #FF1E00;
              border-radius: 12px;
              padding: 20px;
              text-align: center;
              margin: 24px 0;
            }
            .email {
              font-size: 20px;
              font-weight: 600;
              color: #FF1E00;
              margin: 0;
            }
            .stats {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
              margin: 32px 0;
            }
            .stat {
              background: #f5f5f7;
              padding: 20px;
              border-radius: 12px;
              text-align: center;
            }
            .stat-number {
              font-size: 24px;
              font-weight: 700;
              color: #FF1E00;
              margin-bottom: 8px;
            }
            .stat-label {
              font-size: 14px;
              color: #717171;
            }
            .footer {
              text-align: center;
              padding: 24px 0;
              color: #717171;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://gruby.app/GrubyLogo.svg" alt="Gruby Logo" class="logo">
              <h1 class="title">New Waitlist Signup! 🚀</h1>
            </div>
            <div class="content">
              <p style="font-size: 18px; margin-bottom: 24px;">
                Someone just joined the Gruby waitlist! Here are the details:
              </p>
              
              <div class="email-box">
                <p class="email">${email}</p>
              </div>
              
              <div class="stats">
                <div class="stat">
                  <div class="stat-number">1</div>
                  <div class="stat-label">New signup today</div>
                </div>
                <div class="stat">
                  <div class="stat-number">Growing</div>
                  <div class="stat-label">Total waitlist</div>
                </div>
              </div>
              
              <p style="font-size: 16px; color: #717171; line-height: 1.5;">
                Keep up the great work! The community is excited about Gruby.
              </p>
            </div>
            <div class="footer">
              <p>© 2024 Gruby. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Admin email send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Admin email service error:", error);
    return { success: false, error };
  }
}
