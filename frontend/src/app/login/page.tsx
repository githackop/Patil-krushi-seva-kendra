"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Step = "phone" | "otp";

export default function LoginPage() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  // Handle phone submission
  const handleContinue = () => {
    if (phone.length !== 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1000);
  };

  // Handle OTP input — auto-focus next box
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  // Backspace moves to previous box
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.join("").length !== 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // redirect or show success
      window.location.href = "/";
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex flex-col items-center justify-center px-4 py-12">

      {/* Icon */}
      <div className="mb-5 bg-green-100 rounded-full p-4">
        <User className="w-8 h-8 text-green-600" />
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        Welcome to Patil Krushi Seva Kendra
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Sign in to access your account and start shopping
      </p>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-7">

        {step === "phone" ? (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>

            {/* Phone input with +91 prefix */}
            <div className="flex rounded-lg border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition mb-4">
              <span className="flex items-center px-4 text-sm font-medium text-gray-600 bg-gray-50 border-r border-gray-200 select-none">
                +91
              </span>
              <Input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/, ""))}
                onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                placeholder="Enter your mobile number"
                className="border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 h-11 text-sm"
              />
            </div>

            <Button
              onClick={handleContinue}
              disabled={phone.length !== 10 || loading}
              className="w-full h-11 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending OTP...
                </span>
              ) : (
                "Continue"
              )}
            </Button>
          </>
        ) : (
          <>
            {/* OTP Step */}
            <button
              onClick={() => { setStep("phone"); setOtp(["", "", "", "", "", ""]); }}
              className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 mb-5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Change number
            </button>

            <p className="text-sm font-medium text-gray-700 mb-1">Enter OTP</p>
            <p className="text-xs text-gray-400 mb-5">
              A 6-digit code has been sent to <span className="font-semibold text-gray-600">+91 {phone}</span>
            </p>

            {/* OTP Boxes */}
            <div className="flex gap-2 justify-between mb-5">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="tel"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
                />
              ))}
            </div>

            <Button
              onClick={handleVerify}
              disabled={otp.join("").length !== 6 || loading}
              className="w-full h-11 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify & Login"
              )}
            </Button>

            {/* Resend */}
            <p className="text-center text-xs text-gray-400 mt-4">
              Didn&apos;t receive the code?{" "}
              <button
                onClick={() => setOtp(["", "", "", "", "", ""])}
                className="text-green-600 font-medium hover:underline"
              >
                Resend OTP
              </button>
            </p>
          </>
        )}
      </div>

      {/* Terms */}
      <p className="text-xs text-gray-400 text-center mt-5 max-w-sm leading-relaxed">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="text-green-600 hover:underline">
          Terms and Conditions
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="text-green-600 hover:underline">
          Privacy Policy
        </Link>
      </p>

      {/* Need Help */}
      <div className="mt-4 bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4 text-center w-full max-w-md">
        <p className="text-sm text-gray-500 mb-1">Need help?</p>
        <p className="text-xs text-gray-400">
          Call us:{" "}
          <a href="tel:+919209061629" className="text-green-600 font-medium hover:underline">
            92090 61629
          </a>{" "}
          or{" "}
          <a href="tel:+917030081617" className="text-green-600 font-medium hover:underline">
            70300 81617
          </a>
        </p>
      </div>
    </main>
  );
}