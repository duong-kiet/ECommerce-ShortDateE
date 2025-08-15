import { RegisterForm } from "@/components/auth/register-form";
import ProtectedRoute from "@/components/ui/protected-route";

export default function RegisterPage() {
  return (
    <ProtectedRoute redirectIfAuth>
      <RegisterForm />
    </ProtectedRoute>
  );
}
