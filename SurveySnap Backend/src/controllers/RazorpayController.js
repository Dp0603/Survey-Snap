const Razorpay = require("razorpay");
const crypto = require("crypto");
const { sendingMail } = require("../utils/MailUtil");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const create_order = async (req, res) => {
  const { amount, currency, receipt } = req.body;
  const options = {
    amount: amount * 100,
    currency,
    receipt,
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const verify_order = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    customer_email,
    customerName,
    amount,
    plan,
  } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;
  const hash = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (hash === razorpay_signature) {
    // Professional, compatible HTML email
    const receiptHTML = `
      <table width="100%" bgcolor="#f4f6fb" cellpadding="0" cellspacing="0" style="padding:40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="border-collapse:collapse;">
              <tr>
                <td bgcolor="#1976d2" align="center" style="padding:32px 0 16px 0;">
                  <img src="https://i.imgur.com/1Q9Z1Zm.png" alt="SurveySnap" width="48" style="display:block;margin-bottom:10px;">
                  <h1 style="color:#fff;font-size:2rem;margin:0;font-family:Arial,sans-serif;letter-spacing:1px;">SurveySnap</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:32px 32px 16px 32px;">
                  <h2 style="color:#1976d2;font-size:1.4rem;margin:0 0 12px 0;font-family:Arial,sans-serif;">Payment Successful 🎉</h2>
                  <p style="font-size:1.1em;color:#22223b;margin:0 0 8px 0;">Hi <b>${customerName || "there"}</b>,</p>
                  <p style="font-size:1.1em;color:#22223b;margin:0 0 18px 0;">Thank you for subscribing to the <b>${plan || "your selected"}</b> plan.</p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9fb;border:1px solid #e5e7eb;">
                    <tr>
                      <td style="padding:12px 0 8px 12px;color:#4a4e69;font-size:1em;"><b>Amount Paid:</b></td>
                      <td align="right" style="padding:12px 12px 8px 0;color:#1976d2;font-size:1em;"><b>₹${(amount/100).toFixed(2)}</b></td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 8px 12px;color:#4a4e69;font-size:1em;"><b>Order ID:</b></td>
                      <td align="right" style="padding:0 12px 8px 0;color:#22223b;font-size:1em;">${razorpay_order_id}</td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 8px 12px;color:#4a4e69;font-size:1em;"><b>Payment ID:</b></td>
                      <td align="right" style="padding:0 12px 8px 0;color:#22223b;font-size:1em;">${razorpay_payment_id}</td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 8px 12px;color:#4a4e69;font-size:1em;"><b>Date:</b></td>
                      <td align="right" style="padding:0 12px 8px 0;color:#22223b;font-size:1em;">${new Date().toLocaleDateString()}</td>
                    </tr>
                  </table>
                  <p style="font-size:1em;color:#22223b;margin:24px 0 0 0;">If you have any questions, just reply to this email—we’re always happy to help.</p>
                  <p style="margin-top:32px;color:#22223b;">Best regards,<br><b>The SurveySnap Team</b></p>
                </td>
              </tr>
              <tr>
                <td bgcolor="#f3f4f6" align="center" style="padding:18px 0 8px 0;border-top:1px solid #e5e7eb;">
                  <p style="margin:0;font-size:0.98em;color:#6b7280;">&copy; ${new Date().getFullYear()} <b>SurveySnap</b>. All rights reserved.</p>
                  <p style="margin:0;font-size:0.98em;color:#6b7280;">SurveySnap, 123 Business Rd, Mumbai, India</p>
                  <p style="margin:0;font-size:0.95em;color:#b0b3b8;">This is an automated message. Please do not reply.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `;

    await sendingMail(
      customer_email,
      "Your SurveySnap Payment Receipt 🎟️",
      receiptHTML
    );

    return res.json({ status: "success" });
  } else {
    return res.status(400).json({ status: "failure" });
  }
};

module.exports = {
  create_order,
  verify_order,
};
