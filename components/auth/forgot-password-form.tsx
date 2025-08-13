"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email là bắt buộc");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email không hợp lệ");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle successful password reset request
      console.log("Password reset requested for:", email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Password reset failed:", error);
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-600">Nest Mart</h1>
                <span className="text-sm text-gray-600">& Grocery</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Kiểm tra email của bạn
            </CardTitle>
            <CardDescription>
              Chúng tôi đã gửi link đặt lại mật khẩu đến email của bạn.
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Email đã được gửi đến: <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500">
                Vui lòng kiểm tra hộp thư và spam folder của bạn.
              </p>
            </div>

            <div className="space-y-3">
              <Link href="/login">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Quay lại đăng nhập
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
              >
                Gửi lại email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-3">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-600">Nest Mart</h1>
              <span className="text-sm text-gray-600">& Grocery</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Quên mật khẩu
          </CardTitle>
          <CardDescription>
            Nhập email của bạn để nhận link đặt lại mật khẩu.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className={`pl-10 ${error ? "border-red-500" : ""}`}
                  disabled={isLoading}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Đang gửi..." : "Gửi link đặt lại mật khẩu"}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-green-600 hover:text-green-700"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
