/**
 * Professional HTML email template for portfolio contact form submissions.
 * Uses inline styles for maximum email client compatibility.
 */

interface EmailTemplateParams {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  requestId: string;
}

export function buildContactEmailHtml(params: EmailTemplateParams): string {
  const { name, email, subject, message, timestamp, requestId } = params;

  const formattedDate = new Date(timestamp).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>New Contact Message</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0; padding:0; background-color:#0f0d0b; font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0d0b; min-height:100vh;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Main card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; border-radius:16px; overflow:hidden; box-shadow:0 25px 60px rgba(0,0,0,0.5);">

          <!-- Header gradient bar -->
          <tr>
            <td style="height:6px; background:linear-gradient(90deg, #8B6914 0%, #C8A55C 35%, #E8D5A0 50%, #C8A55C 65%, #8B6914 100%);"></td>
          </tr>

          <!-- Logo & branding -->
          <tr>
            <td style="background-color:#1a1614; padding:32px 40px 24px 40px; text-align:center;">
              <!-- Text-based logo for maximum compatibility -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="background-color:#C8A55C; width:48px; height:48px; border-radius:12px; text-align:center; vertical-align:middle;">
                    <span style="font-size:24px; font-weight:800; color:#1a1614; line-height:48px; letter-spacing:1px;">K</span>
                  </td>
                  <td style="padding-left:14px;">
                    <span style="font-size:22px; font-weight:700; color:#f5f0e8; letter-spacing:4px; text-transform:uppercase;">KHOLIK</span>
                  </td>
                </tr>
              </table>
              <p style="margin:12px 0 0 0; font-size:12px; color:#9a8c7a; letter-spacing:2px; text-transform:uppercase;">Portfolio Contact Form</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="background-color:#1a1614; padding:0 40px;">
              <div style="height:1px; background:linear-gradient(90deg, transparent, #3d3529, transparent);"></div>
            </td>
          </tr>

          <!-- Alert badge -->
          <tr>
            <td style="background-color:#1a1614; padding:24px 40px 8px 40px; text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="background-color:#2a2318; border:1px solid #3d3529; border-radius:20px; padding:8px 20px;">
                    <span style="font-size:13px; color:#C8A55C; font-weight:600;">&#9993;&nbsp;&nbsp;New Message Received</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Subject line -->
          <tr>
            <td style="background-color:#1a1614; padding:16px 40px 28px 40px; text-align:center;">
              <h1 style="margin:0; font-size:24px; font-weight:700; color:#f5f0e8; line-height:1.3;">${escapeHtml(subject)}</h1>
            </td>
          </tr>

          <!-- Sender info card -->
          <tr>
            <td style="background-color:#1a1614; padding:0 40px 24px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#231f1a; border:1px solid #3d3529; border-radius:12px; overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <!-- Avatar circle -->
                        <td width="52" valign="top">
                          <div style="width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg, #C8A55C, #8B6914); text-align:center; line-height:48px;">
                            <span style="font-size:20px; font-weight:700; color:#1a1614;">${escapeHtml(name.charAt(0).toUpperCase())}</span>
                          </div>
                        </td>
                        <!-- Name & email -->
                        <td style="padding-left:16px; vertical-align:middle;">
                          <p style="margin:0 0 4px 0; font-size:16px; font-weight:600; color:#f5f0e8;">${escapeHtml(name)}</p>
                          <a href="mailto:${escapeHtml(email)}" style="font-size:13px; color:#C8A55C; text-decoration:none;">${escapeHtml(email)}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message body -->
          <tr>
            <td style="background-color:#1a1614; padding:0 40px 32px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#231f1a; border:1px solid #3d3529; border-radius:12px; overflow:hidden;">
                <!-- Message label -->
                <tr>
                  <td style="padding:16px 24px 8px 24px;">
                    <p style="margin:0; font-size:11px; font-weight:600; color:#9a8c7a; letter-spacing:1.5px; text-transform:uppercase;">Message</p>
                  </td>
                </tr>
                <!-- Message content -->
                <tr>
                  <td style="padding:4px 24px 20px 24px;">
                    <p style="margin:0; font-size:15px; color:#d4cabe; line-height:1.7; white-space:pre-wrap;">${escapeHtml(message)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="background-color:#1a1614; padding:0 40px 32px 40px; text-align:center;">
              <a href="mailto:${escapeHtml(email)}?subject=Re: ${encodeURIComponent(subject)}" style="display:inline-block; background:linear-gradient(135deg, #C8A55C, #A88B3C); color:#1a1614; font-size:14px; font-weight:700; text-decoration:none; padding:14px 36px; border-radius:10px; letter-spacing:0.5px;">
                &#8617;&nbsp;&nbsp;Reply to ${escapeHtml(name.split(" ")[0])}
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="background-color:#1a1614; padding:0 40px;">
              <div style="height:1px; background:linear-gradient(90deg, transparent, #3d3529, transparent);"></div>
            </td>
          </tr>

          <!-- Metadata footer -->
          <tr>
            <td style="background-color:#1a1614; padding:20px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:11px; color:#6b5f50;">
                    <span style="color:#9a8c7a;">Received:</span> ${formattedDate}
                  </td>
                </tr>
                <tr>
                  <td style="font-size:11px; color:#6b5f50; padding-top:4px;">
                    <span style="color:#9a8c7a;">ID:</span> ${requestId.slice(0, 8)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Bottom footer -->
          <tr>
            <td style="background-color:#13110f; padding:24px 40px; text-align:center;">
              <p style="margin:0 0 8px 0; font-size:12px; color:#6b5f50;">
                Sent from your portfolio at
                <a href="https://salahudinkholikprasetyono.netlify.app" style="color:#C8A55C; text-decoration:none;">salahudinkholikprasetyono.netlify.app</a>
              </p>
              <p style="margin:0; font-size:11px; color:#4a4038;">
                &copy; ${new Date().getFullYear()} Salahudin Kholik Prasetyono. All rights reserved.
              </p>
            </td>
          </tr>

          <!-- Bottom gradient bar -->
          <tr>
            <td style="height:4px; background:linear-gradient(90deg, #8B6914 0%, #C8A55C 35%, #E8D5A0 50%, #C8A55C 65%, #8B6914 100%);"></td>
          </tr>

        </table>
        <!-- End main card -->

      </td>
    </tr>
  </table>

</body>
</html>
`.trim();
}

/**
 * Plain-text fallback for email clients that don't support HTML.
 */
export function buildContactEmailText(params: EmailTemplateParams): string {
  const { name, email, subject, message, timestamp, requestId } = params;

  return [
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "   KHOLIK — Portfolio Contact",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    `Subject: ${subject}`,
    "",
    "── Sender ─────────────────────",
    `  Name:  ${name}`,
    `  Email: ${email}`,
    "",
    "── Message ────────────────────",
    "",
    message,
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    `Received: ${new Date(timestamp).toLocaleString()}`,
    `ID: ${requestId.slice(0, 8)}`,
    "",
    "— salahudinkholikprasetyono.netlify.app",
  ].join("\n");
}

/** Escape HTML entities to prevent XSS in email content */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
