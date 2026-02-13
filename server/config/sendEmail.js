import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

// ✅ Correct env check
if (!process.env.RESEND_API) {
  throw new Error("❌ RESEND_API missing in .env file");
}

if (!process.env.OWNER_EMAIL) {
  throw new Error("❌ OWNER_EMAIL missing in .env file");
}

const resend = new Resend(process.env.RESEND_API);

// ✅ FORCE sending only to your own email
const sendEmail = async ({ subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Blinkit <onboarding@resend.dev>",
      to: process.env.OWNER_EMAIL, // 🔒 locked email
      subject,
      html,
    });

    if (error) {
      console.error("Email error:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Send email failed:", err);
    return null;
  }
};

export default sendEmail;
