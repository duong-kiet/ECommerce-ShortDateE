"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase.config";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/spinner";

type Props = {
  children: React.ReactNode;
  redirectIfAuth?: boolean;
  fallback?: React.ReactNode;
};

export default function ProtectedRoute({
  children,
  redirectIfAuth = false,
  fallback,
}: Props) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    const unsub = onAuthStateChanged(auth, (user: User | null) => {
      if (!mounted) return;

      if (user) {
        if (redirectIfAuth) {
          router.replace("/");
        } else {
          setChecking(false);
        }
      } else {
        if (redirectIfAuth) {
          setChecking(false);
        } else {
          router.replace("/login");
        }
      }
    });

    return () => {
      mounted = false;
      unsub();
    };
  }, [router, redirectIfAuth]);

  return (
    <>
      {children}
      {checking && (
        <>
          {fallback ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
              {fallback}
            </div>
          ) : (
            <LoadingSpinner
              overlay
              overlayClassName="bg-black/20 backdrop-blur-sm pointer-events-none"
            />
          )}
        </>
      )}
    </>
  );
}
