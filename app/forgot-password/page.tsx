import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import ProtectedRoute from "@/components/ui/protected-route";

export default function ForgotPasswordPage() {
  return (
    <ProtectedRoute redirectIfAuth>
      <ForgotPasswordForm />
    </ProtectedRoute>
  );
}
