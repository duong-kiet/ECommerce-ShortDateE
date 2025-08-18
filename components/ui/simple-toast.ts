"use client";

// Tiện ích toast đơn giản, không cần Provider
// Dùng: showToast("Đã thêm vào giỏ hàng", { variant: "success" })

export type ToastVariant = "success" | "error" | "info";

interface ToastOptions {
  variant?: ToastVariant;
  duration?: number; // ms
}

const CONTAINER_ID = "__simple_toast_container__";

function ensureContainer() {
  let container = document.getElementById(CONTAINER_ID);
  if (!container) {
    container = document.createElement("div");
    container.id = CONTAINER_ID;
    container.className = [
      "fixed",
      "z-[9999]",
      // vị trí: góc trên bên phải
      "top-4",
      "right-4",
      "flex",
      "flex-col",
      "gap-2",
      "pointer-events-none",
    ].join(" ");
    document.body.appendChild(container);
  }
  return container;
}

export function showToast(message: string, opts: ToastOptions = {}) {
  if (typeof window === "undefined") return; // chỉ chạy client

  const { variant = "success", duration = 2500 } = opts;
  const container = ensureContainer();

  const el = document.createElement("div");
  const base = [
    "pointer-events-auto",
    "rounded-lg",
    // Kích thước lớn, dễ quan sát
    "px-4",
    "py-3",
    "shadow-xl",
    "text-base",
    "sm:text-lg",
    "font-medium",
    "text-white",
    // giới hạn chiều rộng để đẹp mắt
    "min-w-[280px]",
    "max-w-[420px]",
  ];

  const color =
    variant === "error"
      ? "bg-red-600"
      : variant === "info"
      ? "bg-slate-800"
      : "bg-green-600"; // success

  el.className = [...base, color].join(" ");
  el.textContent = message;

  // Hiệu ứng trượt từ phải vào bằng transition inline để không phụ thuộc plugin
  el.style.transform = "translateX(120%)"; // bắt đầu ngoài màn hình ở bên phải
  el.style.opacity = "0";
  el.style.transition = "transform 250ms ease, opacity 250ms ease";

  container.appendChild(el);

  // kích hoạt animation ở frame tiếp theo
  requestAnimationFrame(() => {
    el.style.transform = "translateX(0)";
    el.style.opacity = "1";
  });

  // Tự ẩn sau duration với hiệu ứng trượt ra phải
  const hide = () => {
    el.style.transform = "translateX(120%)";
    el.style.opacity = "0";
    setTimeout(() => {
      el.remove();
      if (container.childElementCount === 0) {
        container.remove();
      }
    }, 250);
  };

  const timer = setTimeout(hide, duration);

  // Cho phép click để tắt ngay
  el.addEventListener("click", () => {
    clearTimeout(timer);
    hide();
  });
}
