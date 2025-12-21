import { Resend } from "resend";
import { env } from "@/env";
import { getBaseUrl } from "@/lib/utils";

const resend = new Resend(env.RESEND_API_KEY);

// Get the logo URL - use the API route for better email client compatibility
const getLogoUrl = () => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/api/logo`;
};

export async function sendWaitlistConfirmation(email: string, name: string = "") {
  try {
    const { data, error } = await resend.emails.send({
      from: "Gruby <noreply@gruby.app>",
      to: [email],
      subject: "Welcome to Gruby, we are glad you are here ✨",
      html: `
        <!DOCTYPE html>
      <html lang="en">
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

          <style>
            body {
              margin: 0;
              padding: 0;
            background-color: #f8f9fa;
            }

            .container {
            width: 100percent !important;
              max-width: 600px;
              margin: 0 auto;
            border-radius: 12px;
            }

          @media only screen and (max-width: 600px) {
            .container {
              border-radius: 0 !important;
            }

            .wrapper {
              padding: 0 !important;
            }

            .content {
              padding: 32px 24px !important;
            }

            .feature-block {
              padding: 28px 24px !important;
            }

            .mobile-center {
              text-align: center !important;
            }

            .btn {
              display: block !important;
              width: 100percent !important;
            }

            /* Hide checkmark icons on mobile */
            .icon-col {
              display: none !important;
              width: 0 !important;
              height: 0 !important;
              overflow: hidden !important;
            }
            }
          </style>
        </head>

      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table role="presentation" width="100percent" cellspacing="0" cellpadding="0" class="wrapper" style="background-color: #f8f9fa; padding: 40px 20px;">
          <tr>
            <td align="center">

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="container" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                  <td style="padding: 48px 48px 40px; text-align: center; border-bottom: 1px solid #e9ecef;">
                    <img src="${getLogoUrl()}" alt="Gruby" width="160" height="40" border="0" style="display: block; margin: 0 auto; max-width: 160px; height: auto; width: 160px;" />
                  </td>
                </tr>

                <!-- Main Content -->
                <tr>
                  <td class="content" style="padding: 56px 48px 0;">
                    <h1 style="margin: 0 0 20px; font-size: 34px; font-weight: 700; line-height: 1.25; color: #1a1a1a; text-align: center;">
                      You are officially on the list 🎉
                    </h1>
                    <p style="margin: 0 0 40px; font-size: 17px; color: #4a5568; line-height: 1.7; text-align: center;">
                      ${name ? `Hi ${name}, ` : ""}Thank you for joining the Gruby waitlist. We are building something we always wished existed, a simple and thoughtful way to cook more, spend less, and feel inspired in your own kitchen. We are really glad you are here.
                    </p>
                  </td>
                </tr>

                <!-- Features Section -->
                <tr>
                  <td style="padding: 0 48px 40px;">
                    <table role="presentation" width="100percent" class="feature-block" style="background-color: #f8f9fa; border-radius: 16px; padding: 40px 36px;">

                      <!-- Feature 1 -->
                      <tr>
                        <td style="padding-bottom: 24px;">
                          <table role="presentation" width="100percent">
                            <tr>
                              <td class="icon-col" width="36" valign="top">
                                <div style="width: 32px; height: 32px; background-color: #222222; border-radius: 50percent; color: #ffffff; text-align: center; line-height: 32px; font-weight: bold; font-size: 18px;">
                                  ✓
            </div>
                              </td>
                              <td style="padding-left: 20px;">
                                <p style="margin: 0; font-size: 17px; font-weight: 600; color: #1a1a1a;">
                                  Save more without trying
                                </p>
                                <p style="margin: 6px 0 0; font-size: 15px; color: #4a5568;">
                                  Smart price insights help you spend less on groceries while keeping the meals you love.
              </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Feature 2 -->
                      <tr>
                        <td style="padding-bottom: 24px;">
                          <table role="presentation" width="100percent">
                            <tr>
                              <td class="icon-col" width="36" valign="top">
                                <div style="width: 32px; height: 32px; background-color: #222222; border-radius: 50percent; color: #ffffff; text-align: center; line-height: 32px; font-weight: bold; font-size: 18px;">
                                  ✓
                </div>
                              </td>
                              <td style="padding-left: 20px;">
                                <p style="margin: 0; font-size: 17px; font-weight: 600; color: #1a1a1a;">
                                  Recipes from real people
                                </p>
                                <p style="margin: 6px 0 0; font-size: 15px; color: #4a5568;">
                                  Discover dishes made by real home cooks in your community, not curated or staged, just real.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Feature 3 -->
                      <tr>
                        <td>
                          <table role="presentation" width="100percent">
                            <tr>
                              <td class="icon-col" width="36" valign="top">
                                <div style="width: 32px; height: 32px; background-color: #222222; border-radius: 50percent; color: #ffffff; text-align: center; line-height: 32px; font-weight: bold; font-size: 18px;">
                                  ✓
                </div>
                              </td>
                              <td style="padding-left: 20px;">
                                <p style="margin: 0; font-size: 17px; font-weight: 600; color: #1a1a1a;">
                                  Your pantry but smarter
                                </p>
                                <p style="margin: 6px 0 0; font-size: 15px; color: #4a5568;">
                                  Gruby learns what you have on hand and suggests meals you can make right now with no extra trips.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>
              
                <!-- CTA -->
                <tr>
                  <td style="padding: 0 48px 40px; text-align: center;">
                    <a href="https://gruby.app"
                      class="btn"
                      style="display: inline-block; padding: 18px 48px; background-color: #222222; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 17px; box-shadow: 0 4px 12px rgba(255, 30, 0, 0.3);">
                      Learn more about Gruby
                    </a>
                  </td>
                </tr>

                <!-- Closing -->
                <tr>
                  <td class="content" style="padding: 0 48px 56px;">
                    <p style="margin: 0; font-size: 16px; color: #4a5568; text-align: center; line-height: 1.7;">
                      We will keep you updated as we get closer to launch. Until then, you can follow along for cooking ideas, early previews, and the small moments behind building Gruby.
              </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 40px 48px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e9ecef;">
                    <a href="https://twitter.com/gruby" style="margin: 0 16px; color: #4a5568; font-size: 15px; text-decoration: none;">Twitter</a>
                    <a href="https://instagram.com/gruby" style="margin: 0 16px; color: #4a5568; font-size: 15px; text-decoration: none;">Instagram</a>
                    <a href="https://linkedin.com/company/gruby" style="margin: 0 16px; color: #4a5568; font-size: 15px; text-decoration: none;">LinkedIn</a>
                    <p style="margin: 24px 0 12px; font-size: 14px; color: #718096;">
                      <a href="${getBaseUrl()}/api/unsubscribe?email=${encodeURIComponent(email)}" style="color: #718096; text-decoration: underline;">Unsubscribe</a>
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #718096;">
                      © ${new Date().getFullYear()} Gruby. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
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

export async function sendAdminNotification(email: string, name: string = "") {
  try {
    const { data, error } = await resend.emails.send({
      from: "Gruby <noreply@gruby.app>",
      to: ["itskennedy.dev@gmail.com"],
      subject: "A new person just joined the waitlist 🚀",
      html: `
        <!DOCTYPE html>
      <html lang="en">
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
          .container {
            width: 100percent !important;
            max-width: 600px;
            margin: 0 auto;
            border-radius: 12px;
          }
          @media only screen and (max-width: 600px) {
            .container {
              border-radius: 0 !important;
            }
            .content {
              padding: 32px 24px !important;
            }
            }
          </style>
        </head>

      <body style="background-color: #f8f9fa; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

        <table role="presentation" width="100percent" cellspacing="0" cellpadding="0" style="padding: 40px 20px;">
          <tr>
            <td align="center">

              <table role="presentation" width="600" class="container" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

                <tr>
                  <td style="padding: 40px 48px 32px; text-align: center; border-bottom: 1px solid #e9ecef;">
                    <img src="${getLogoUrl()}" alt="Gruby" width="140" height="35" border="0" style="display: block; margin: 0 auto 24px; max-width: 140px; height: auto; width: 140px;" />
                    <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #1a1a1a;">
                      A new person just joined the waitlist 🚀
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td class="content" style="padding: 56px 48px 0;">
                    <p style="margin: 0 0 36px; font-size: 18px; color: #1a1a1a; line-height: 1.7;">
                      Someone just signed up for the Gruby waitlist. Here are their details:
              </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 48px 40px;">
                    <table role="presentation" width="100percent" style="background-color: #fff5f5; border: 2px solid #222222; border-radius: 16px;">
                      <tr>
                        <td style="padding: 28px 32px;">
                          ${name ? `
                          <p style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #1a1a1a;">
                            Name:
                          </p>
                          <p style="margin: 0 0 24px; font-size: 22px; font-weight: 600; color: #222222;">
                            ${name}
                          </p>
                          ` : ""}
                          <p style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #1a1a1a;">
                            Email:
                          </p>
                          <p style="margin: 0; font-size: 22px; font-weight: 600; color: #222222; word-break: break-all;">
                            ${email}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td class="content" style="padding: 0 48px 56px;">
                    <p style="margin: 0; font-size: 16px; color: #4a5568; text-align: center; line-height: 1.7;">
                      Gruby is growing one person at a time. Let us keep building something people are excited about.
              </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 40px 48px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e9ecef; border-radius: 0 0 12px 12px;">
                    <p style="margin: 0; font-size: 14px; color: #718096;">
                      © ${new Date().getFullYear()} Gruby. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

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
