# Tài liệu dự án Ecommerce Next.js Fullstack

## Giới thiệu

Dự án này là một ứng dụng thương mại điện tử được xây dựng bằng Next.js, một framework React full-stack. Nó sử dụng hệ thống tệp để định tuyến (file-system based routing) và kết hợp cả các API Routes truyền thống của Next.js với Server Actions để xử lý logic phía máy chủ. Dự án cũng tích hợp hoặc có ý định tích hợp với Firebase/Firestore để quản lý dữ liệu và xác thực người dùng. Giao diện người dùng được xây dựng bằng React và Tailwind CSS (dựa trên các file cấu hình và thư mục `components/ui`).

## Cấu trúc dự án chính

- `app/`: Chứa các trang, API Routes và Server Actions của Next.js.
  - `app/api/`: Định nghĩa các API endpoint HTTP truyền thống.
  - `app/checkout/`: Chứa logic liên quan đến quá trình thanh toán, bao gồm Server Actions.
  - `app/categories/[category]/`: Trang hiển thị sản phẩm theo danh mục.
  - `app/products/detail/[id]/`: Trang chi tiết sản phẩm.
  - `app/auth/`: Chứa các trang liên quan đến xác thực (đăng nhập, đăng ký, quên mật khẩu).
- `components/`: Các component React dùng chung.
  - `components/ui/`: Các component UI cơ bản (ví dụ: Button, Input, Card).
- `lib/`: Chứa các hàm tiện ích, cấu hình và logic backend.
  - `lib/data.ts`: Có thể chứa các hàm để tương tác với cơ sở dữ liệu hoặc nguồn dữ liệu khác.
  - `lib/firebase/`: Chứa cấu hình và các hàm tương tác với Firebase (Auth, Firestore).
- `store/`: Chứa các store (ví dụ: `cart-store.ts`) để quản lý trạng thái client-side.

## Các Page Routes (Trang)

Dự án định nghĩa các trang sau:

### 1. / (Home Page)

- **Mô tả:** Trang chủ của ứng dụng. Đây thường là nơi hiển thị các sản phẩm nổi bật, ưu đãi đặc biệt hoặc các danh mục chính.
- **Vị trí file:** `app/page.tsx`

### 2. /about

- **Mô tả:** Trang "Về chúng tôi", cung cấp thông tin về cửa hàng, lịch sử, sứ mệnh hoặc thông tin liên hệ.
- **Vị trí file:** `app/about/page.tsx`

### 3. /cart

- **Mô tả:** Trang giỏ hàng, nơi người dùng có thể xem lại các sản phẩm đã thêm vào giỏ, cập nhật số lượng hoặc xóa sản phẩm.
- **Vị trí file:** `app/cart/page.tsx`

### 4. /categories/[category]

- **Mô tả:** Trang hiển thị danh sách sản phẩm thuộc một danh mục cụ thể. `[category]` là một tham số động sẽ được thay thế bằng tên danh mục (ví dụ: `/categories/electronics`).
- **Vị trí file:** `app/categories/[category]/page.tsx`

### 5. /checkout

- **Mô tả:** Trang thanh toán, nơi người dùng nhập thông tin giao hàng và thanh toán để hoàn tất đơn hàng. Trang này có thể tương tác với `checkoutAction`.
- **Vị trí file:** `app/checkout/page.tsx`

### 6. /filter-result

- **Mô tả:** Trang hiển thị kết quả lọc sản phẩm, có thể dựa trên các tiêu chí tìm kiếm hoặc bộ lọc được áp dụng từ trang khác.
- **Vị trí file:** `app/filter-result/page.tsx`

### 7. /forgot-password

- **Mô tả:** Trang cho phép người dùng yêu cầu đặt lại mật khẩu của họ.
- **Vị trí file:** `app/forgot-password/page.tsx`

### 8. /login

- **Mô tả:** Trang đăng nhập, nơi người dùng có thể đăng nhập vào tài khoản của họ.
- **Vị trí file:** `app/login/page.tsx`

### 9. /products/detail/[id]

- **Mô tả:** Trang chi tiết sản phẩm. `[id]` là một tham số động sẽ được thay thế bằng ID của sản phẩm (ví dụ: `/products/detail/123`). Trang này hiển thị thông tin chi tiết về một sản phẩm cụ thể.
- **Vị trí file:** `app/products/detail/[id]/page.tsx`

### 10. /register

- **Mô tả:** Trang đăng ký, nơi người dùng mới có thể tạo tài khoản.
- **Vị trí file:** `app/register/page.tsx`

### 11. /success

- **Mô tả:** Trang thông báo thành công, thường hiển thị sau khi hoàn tất một hành động nào đó (ví dụ: đặt hàng thành công, đăng ký thành công).
- **Vị trí file:** `app/success/page.tsx`

## Các API Endpoint và Server Actions

Dự án hiện tại định nghĩa các endpoint và server action sau:

### 1. GET /api/hello

- **Mô tả:** Endpoint này là một ví dụ đơn giản về API Route trong Next.js. Khi được truy cập bằng phương thức GET, nó sẽ trả về một đối tượng JSON chứa thông điệp chào mừng.
- **Phương thức:** GET
- **URL:** `/api/hello`
- **Phản hồi thành công (200 OK):**
  ```json
  {
    "message": "Xin chào từ API route!"
  }
  ```
- **Vị trí file:** `app/api/hello/route.ts`

### 2. Server Action: checkoutAction

- **Mô tả:** `checkoutAction` là một Next.js Server Action xử lý logic khi người dùng tiến hành thanh toán. Nó nhận dữ liệu form (hiện tại là một chuỗi JSON của các mặt hàng trong giỏ hàng) và xử lý chúng. Hiện tại, chức năng thanh toán qua Stripe bị vô hiệu hóa và thay vào đó, action này sẽ chuyển hướng người dùng đến một trang thành công với thông báo.
- **Phương thức:** Được gọi trực tiếp từ frontend (thường thông qua `<form action={checkoutAction}>` hoặc `startTransition`).
- **Tham số (FormData):**
  - `items` (string): Một chuỗi JSON chứa thông tin về các mặt hàng trong giỏ hàng.
- **Hành vi:**
  - Phân tích cú pháp chuỗi JSON `items`.
  - Ghi log các mặt hàng đã checkout vào console (chỉ trên server).
  - **Tạm thời:** Chuyển hướng người dùng đến `/success?message=Order placed successfully (Stripe disabled)`.
  - **Dự kiến:** Tích hợp với dịch vụ thanh toán như Stripe để xử lý giao dịch thực tế.
- **Vị trí file:** `app/checkout/checkout-action.ts`

## Tích hợp Firebase

Dự án sử dụng Firebase cho các dịch vụ như:

- **Firebase Authentication:** Để quản lý người dùng (đăng ký, đăng nhập, quên mật khẩu). Các form xác thực được định nghĩa trong `components/auth/`.
- **Firestore:** Có thể được sử dụng để lưu trữ dữ liệu sản phẩm, danh mục, giỏ hàng hoặc thông tin đơn hàng. Các hàm tương tác với Firestore có thể được tìm thấy trong `lib/firebase/firestore-app-data.ts`.

## Lưu trữ trạng thái (Client-side)

- **Cart Store:** `store/cart-store.ts` có thể chứa logic để quản lý trạng thái giỏ hàng của người dùng trên client-side (thêm, xóa, cập nhật số lượng sản phẩm).

## Thuật toán tính chi phí động (Dynamic Pricing Algorithm)

Dự án này sử dụng một thuật toán tính toán giá tự động cho sản phẩm dựa trên ngày sản xuất và ngày hết hạn, nhằm mục đích giảm giá sản phẩm khi chúng gần hết hạn. Thuật toán này được triển khai trong hàm `calculateAutoPrice` trong `lib/data.ts`.

### Chức năng: `calculateAutoPrice`

- **Mô tả:** Tính toán giá bán tự động của sản phẩm dựa trên giá gốc, ngày hết hạn, ngày sản xuất và giá giới hạn (giá thấp nhất).
- **Tham số:**
  - `originalPrice` (number): Giá gốc ban đầu của sản phẩm.
  - `expiryDate` (string): Ngày hết hạn của sản phẩm (chuỗi định dạng).
  - `factoryDate` (string): Ngày sản xuất của sản phẩm (chuỗi định dạng).
  - `limitPrice` (number): Giá sàn (giá thấp nhất) mà sản phẩm có thể được bán.
- **Giá trị trả về:** (number) Giá tự động đã tính toán.
- **Vị trí file:** `lib/data.ts`

### Cơ chế hoạt động của thuật toán:

1.  **Phân tích ngày:**
    - Hàm `formatTimeProduct` được sử dụng để chuyển đổi các chuỗi `expiryDate` và `factoryDate` thành các đối tượng `Date`. Hàm này hỗ trợ cả định dạng ISO và định dạng tùy chỉnh `HH:MM - DD/MM/YYYY`.
2.  **Tính toán thời gian tồn tại của sản phẩm:**
    - `ExpiryFactoryLeft`: Tính toán tổng thời gian tồn tại của sản phẩm (thời hạn sử dụng) theo giây, từ ngày sản xuất đến ngày hết hạn, bằng cách sử dụng hàm `calculateExpiryFactoryLeft`. Nếu ngày hết hạn trước ngày sản xuất, giá trị là 0.
    - `NowFactoryLeft`: Tính toán thời gian đã trôi qua kể từ ngày sản xuất của sản phẩm đến thời điểm hiện tại theo giây, bằng cách sử dụng hàm `calculateNowFactoryLeft`. Nếu thời điểm hiện tại trước ngày sản xuất, giá trị là 0.
3.  **Tính toán giá giảm dần:**
    - Giá của sản phẩm sẽ giảm tuyến tính từ `originalPrice` đến `limitPrice` khi thời gian trôi qua từ `factoryDate` đến `expiryDate`.
    - Công thức tính giá là: `originalPrice - (originalPrice - limitPrice) * (NowFactoryLeft / ExpiryFactoryLeft)`
    - Tỷ lệ `(NowFactoryLeft / ExpiryFactoryLeft)` đại diện cho phần thời gian đã trôi qua so với tổng thời gian tồn tại của sản phẩm. Khi sản phẩm càng gần ngày hết hạn, tỷ lệ này càng gần 1, và giá sẽ càng gần `limitPrice`.
4.  **Đảm bảo giá sàn:**
    - Thuật toán bao gồm một điều kiện kiểm tra để đảm bảo rằng giá tính toán không bao giờ thấp hơn `limitPrice`. Nếu giá tính toán nhỏ hơn `limitPrice`, hàm sẽ trả về `limitPrice` để giữ giá sản phẩm không xuống quá thấp.

Thuật toán này giúp tự động điều chỉnh giá sản phẩm để khuyến khích bán hàng khi sản phẩm gần hết hạn, đồng thời đảm bảo lợi nhuận tối thiểu bằng cách không giảm giá dưới `limitPrice`.
