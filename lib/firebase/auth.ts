import { auth } from "./firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  sendPasswordResetEmail,
  User,
} from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";

export async function registerWithEmail(
  email: string,
  password: string,
  profile?: { firstName?: string; lastName?: string; phone?: string }
) {
  try {
    const cred: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const db = getFirestore();
    await setDoc(doc(db, "users", cred.user.uid), {
      email,
      firstName: profile?.firstName ?? "",
      lastName: profile?.lastName ?? "",
      phone: profile?.phone ?? "",
      createdAt: serverTimestamp(),
      uid: cred.user.uid,
    });

    return cred.user;
  } catch (err: unknown) {
    const message =
      err && typeof err === "object" && "message" in err
        ? (err as { message: string }).message
        : "Đăng ký thất bại";
    throw new Error(message);
  }
}

export async function loginWithEmail(email: string, password: string) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (err: unknown) {
    const message =
      err && typeof err === "object" && "message" in err
        ? (err as { message: string }).message
        : "Đăng nhập thất bại";
    throw new Error(message);
  }
}

export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    return cred.user;
  } catch (err: unknown) {
    const message =
      err && typeof err === "object" && "message" in err
        ? (err as { message: string }).message
        : "Đăng nhập Google thất bại";
    throw new Error(message);
  }
}

export async function logout() {
  return signOut(auth);
}

async function getUserFullNameByUid(
  uid: string
): Promise<string | null> {
  try {
    const db = getFirestore();
    const snap = await getDoc(doc(db, "users", uid));
    if (!snap.exists()) return null;
    type UserData = {
      firstName?: string;
      lastName?: string;
      [key: string]: unknown;
    };
    const data = snap.data() as UserData;
    const first = (data.firstName ?? "").toString().trim();
    const last = (data.lastName ?? "").toString().trim();
    const full = `${first} ${last}`.trim();
    return full || null;
  } catch (err) {
    console.error("getUserFullNameByUid error:", err);
    return null;
  }
}

export async function getUserDisplayName(user: User | null): Promise<string> {
  if (!user) return "";
  const isGoogle = user.providerData?.some(
    (p) => p.providerId === "google.com"
  );
  if (isGoogle) return user.displayName ?? user.email ?? "";

  const full = await getUserFullNameByUid(user.uid);
  if (full) return full;
  return user.displayName ?? user.email ?? "";
}

export async function sendPasswordReset(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err: unknown) {
    const message =
      err && typeof err === "object" && "message" in err
        ? (err as { message: string }).message
        : "Không thể gửi email đặt lại mật khẩu";
    throw new Error(message);
  }
}