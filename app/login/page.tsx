import { LoginForm } from "@/components/auth/login-form";
import ProtectedRoute from "@/components/ui/protected-route";
export default function LoginPage() {
  return (
    <ProtectedRoute redirectIfAuth>
      <LoginForm />
    </ProtectedRoute>
  );
}
