import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendContactMessage = async (
  email: string,
  message: string
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,

    subject: "📩 رسالة جديدة من موقع SmileCare",

    html: `
      <div style="font-family: Arial, sans-serif; direction: ltr;">

        <h2 style="color:#1d4ed8;">
          🦷 SmileCare - New Contact Message
        </h2>

        <hr />

        <h3>📧 Visitor Email:</h3>
        <p style="font-size:16px;">
          ${email}
        </p>

        <h3>💬 Message:</h3>

        <div style="
          background:#f1f5f9;
          padding:15px;
          border-radius:10px;
          font-size:16px;
          line-height:1.6;
        ">
          ${message}
        </div>

        <hr />

        <p style="color:#64748b;">
          This message was sent from the SmileCare website.
        </p>

      </div>
    `,
  });
};