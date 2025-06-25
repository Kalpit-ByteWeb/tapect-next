'use client'
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL_ENV = process.env.NEXT_PUBLIC_API_URL;

const UsersContact = ({
  onEmailVerified,
}: {
  onEmailVerified: (verified: boolean, userId: number) => void;
}) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [topMessage, setTopMessage] = useState("");
  const [showTopMessage, setShowTopMessage] = useState(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("verifiedEmail");
    const storedUserId = sessionStorage.getItem("verifiedUserId");

    if (storedEmail && storedUserId) {
      setEmail(storedEmail);
      setOtpVerified(true);
      onEmailVerified(true, Number(storedUserId)); // Notify parent component
    }
  }, [onEmailVerified]);

  const showPopupMessage = (message: string) => {
    setTopMessage(message);
    setShowTopMessage(true);

    setTimeout(() => {
      setShowTopMessage(false);
      setTopMessage("");
    }, 3000);
  };

  const sendOtp = async () => {
    if (!email.trim()) {
      setEmailError("Email is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");

    try {
      await axios.post(`${API_URL_ENV}send-otp`, { email });
      setOtpSent(true);
      showPopupMessage("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(`${API_URL_ENV}verify-otp`, {
        email,
        otp,
      });

      if (response.data.message === "OTP verified successfully!") {
        setOtpVerified(true);

        sessionStorage.setItem("verifiedEmail", email);
        sessionStorage.setItem("verifiedUserId", response.data.user.id);

        onEmailVerified(true, response.data.user.id);
        showPopupMessage("OTP verified successfully!");
      } else {
        alert("Invalid OTP.");
        showPopupMessage("Invalid OTP!");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      showPopupMessage("Failed to verify OTP!");
    }
  };

  return (
    <>
      {showTopMessage && (
        <div
          className={`w-fit fixed top-28 right-5 shadow-AdvanceFeature bg-white border-l-2 border-primary text-secondary py-3 px-4 rounded mb-4 text-center z-50 transition-all duration-1000 transform ${
            showTopMessage ? "translate-x-0" : "translate-x-full"
          }`}>
          {topMessage}
        </div>
      )}

      <div className="shadow-checkout p-6 rounded-24 space-y-6">
        <h2 className="text-lg font-semibold mb-4">Contact Information:</h2>
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-3 border rounded-[4px]"
            disabled={otpVerified}
          />
          {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
        </div>
        {!otpSent && !otpVerified && (
          <button
            onClick={sendOtp}
            className="bg-primary py-4 px-8 rounded-[8px] text-white"
            disabled={!email || otpVerified}>
            Send OTP
          </button>
        )}

        {otpSent && !otpVerified && (
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-6 py-3 border rounded-[4px]"
            />
            <button
              onClick={verifyOtp}
              className="bg-primary py-4 px-8 rounded-[8px] text-white mt-4">
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersContact;
