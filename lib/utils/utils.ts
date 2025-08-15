export function mapFirebaseAuthError(rawMsg: string | undefined): string {
  if (!rawMsg) return "Đăng nhập thất bại. Vui lòng thử lại.";
  const m = rawMsg.toLowerCase();
  if (m.includes("auth/user-not-found") || m.includes("user-not-found"))
    return "Không tìm thấy tài khoản với email này.";
  if (m.includes("auth/wrong-password") || m.includes("wrong-password"))
    return "Mật khẩu không đúng.";
  if (m.includes("auth/invalid-email") || m.includes("invalid-email"))
    return "Email không hợp lệ.";
  if (m.includes("auth/user-disabled") || m.includes("user-disabled"))
    return "Tài khoản đã bị vô hiệu hóa.";
  if (m.includes("auth/too-many-requests") || m.includes("too-many-requests"))
    return "Tài khoản tạm khóa do nhập sai nhiều lần. Vui lòng thử lại sau.";
  if (m.includes("network-request-failed") || m.includes("network"))
    return "Lỗi mạng. Vui lòng kiểm tra kết nối của bạn.";
  if (m.includes("email-already-in-use") || m.includes("email-already-exists"))
    return "Email này đã được sử dụng.";
  // fallback
  return "Đăng nhập thất bại. Vui lòng kiểm tra thông tin và thử lại.";
}
