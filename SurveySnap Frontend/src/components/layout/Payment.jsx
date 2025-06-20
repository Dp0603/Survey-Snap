import React from "react";
import "../styles/Pricing.css";
import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaRocket, FaBuilding } from "react-icons/fa";

const plans = [
  {
    name: "Basic",
    price: 199,
    description: "Perfect for individuals and small teams.",
    icon: <FaUser size={32} color="#1976d2" />,
    button: "Get Started",
    onClick: (handlePayment, navigate) => handlePayment(199, "Basic"),
    highlight: false,
  },
  {
    name: "Pro",
    price: 499,
    description: "For growing businesses and advanced features.",
    icon: <FaRocket size={32} color="#1976d2" />,
    button: "Get Started",
    onClick: (handlePayment, navigate) => handlePayment(499, "Pro"),
    highlight: true,
  },
  {
    name: "Enterprise",
    price: null,
    description: "Custom solutions for large organizations.",
    icon: <FaBuilding size={32} color="#1976d2" />,
    button: "Contact Sales",
    onClick: (handlePayment, navigate) => navigate("/contactus"),
    highlight: false,
  },
];

const Payment = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const backendBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const handlePayment = async (amount, plan) => {
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
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`pricing-card enhanced ${plan.highlight ? "highlight" : ""}`}
          >
            <div className="pricing-icon">{plan.icon}</div>
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <p className="pricing-price">
              {plan.price ? `₹${plan.price}/month` : "Contact Us"}
            </p>
            <button
              className={`pricing-cta ${plan.highlight ? "primary" : ""}`}
              onClick={() => plan.onClick(handlePayment, navigate)}
            >
              {plan.button}
            </button>
            {plan.highlight && (
              <div className="popular-badge">Most Popular</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Payment;
