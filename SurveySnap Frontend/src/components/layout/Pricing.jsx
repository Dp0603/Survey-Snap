import React from "react";
import "../styles/Pricing.css";
import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const backendBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const handlePayment = async (amount, plan) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      showToast("Please login to continue with payment.", "info");
      navigate("/login?redirect=/pricing");
      return;
    }

    try {
      const res = await fetch(`${backendBaseUrl}/payment/create_order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt: `receipt_order_${Math.random().toString(36).substring(7)}`,
        }),
      });

      const order = await res.json();

      const options = {
        key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "SurveySnap",
        description: `SurveySnap ${plan} Plan`,
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyRes = await fetch(
              `${backendBaseUrl}/payment/verify_order`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...response,
                  customer_email: "pateldevam100@gmail.com",
                  amount: order.amount,
                }),
              }
            );

            const result = await verifyRes.json();

            if (result.status === "success") {
              showToast(
                "🎉 Payment Successful! Confirmation sent via email.",
                "success"
              );
            } else {
              showToast("⚠️ Payment verification failed.", "error");
            }
          } catch (err) {
            showToast("⚠️ Could not verify payment.", "error");
          }
        },
        prefill: {
          name: "Dp",
          email: "pateldevam100@gmail.com",
          contact: "9999999999",
        },
        theme: { color: "#1976d2" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment Error:", error);
      showToast("❌ Payment failed. Please try again.", "error");
    }
  };

  return (
    <section id="pricing" className="pricing-section">
      <h2 className="pricing-title">Choose Your Plan</h2>
      <p className="pricing-subtitle">
        Flexible pricing for every stage of your business.
      </p>
      <div className="pricing-cards-grid">
        <div className="pricing-card enhanced">
          <h3>Basic</h3>
          <p>Perfect for individuals and small teams.</p>
          <p className="pricing-price">₹199/month</p>
          <button
            className="pricing-cta"
            onClick={() => handlePayment(199, "Basic")}
          >
            Get Started
          </button>
        </div>

        <div className="pricing-card enhanced highlight">
          <h3>Pro</h3>
          <p>For growing businesses and advanced features.</p>
          <p className="pricing-price">₹499/month</p>
          <button
            className="pricing-cta primary"
            onClick={() => handlePayment(499, "Pro")}
          >
            Get Started
          </button>
          <div className="popular-badge">Most Popular</div>
        </div>

        <div className="pricing-card enhanced">
          <h3>Enterprise</h3>
          <p>Custom solutions for large organizations.</p>
          <p className="pricing-price">Contact Us</p>
          <button
            className="pricing-cta"
            onClick={() => navigate("/contactus")}
          >
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
