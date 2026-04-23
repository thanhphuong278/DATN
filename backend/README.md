src/main/java/com/datn/backend/

├── common/                # chứa những thứ dùng chung toàn hệ thống
│   ├── config/            # config (security, jwt, cors...) -- cấu hình hệ thống
│   ├── exception/         # xử lý lỗi global
│   ├── util/              # helper (jwt, otp, email...) tool dùng lại
│   └── constant/          # nơi để hằng số

├── auth/                  # 🔥 module đăng nhập / đăng ký
│   ├── controller/         # xử lý request từ client liên quan đến auth (login, register, refresh token...)
│   ├── service/            # xử lý logic liên quan đến auth (xác thực, tạo token, quản lý session...)
│   ├── repository/         # tương tác với database liên quan đến auth (user, role, permission...)
│   ├── entity/             # định nghĩa các thực thể liên quan đến auth (User, Role, Permission...)
│   ├── dto/                # các lớp DTO (Data Transfer Object) để truyền dữ liệu giữa client và server qua API
│   ├── mapper/            # map entity ↔ dto
│   └── security/          # JWT, OAuth, filter

├── user/                  # thông tin user (profile)
│   ├── controller/         # xử lý request từ client liên quan đến user (xem profile, cập nhật thông tin...)
│   ├── service/            # xử lý logic liên quan đến user (quản lý profile, thay đổi mật khẩu...)
│   ├── repository/         # tương tác với database liên quan đến user (UserProfile...)
│   ├── entity/             # định nghĩa các thực thể liên quan đến user (UserProfile...)
│   └── dto/                # các lớp DTO để truyền dữ liệu giữa client và server qua API liên quan đến user



├── learning/              # bài học
│   ├── controller/        # xử lý request từ client liên quan đến bài học (xem bài học, làm bài tập...)
│   ├── service/           # xử lý logic liên quan đến bài học (quản lý bài học, tính điểm...)
│   ├── repository/        # tương tác với database liên quan đến bài học (Lesson, Exercise...)
│   ├── entity/            # định nghĩa các thực thể liên quan đến bài học (Lesson, Exercise...)
│   └── dto/                # các lớp DTO để truyền dữ liệu giữa client và server qua API liên quan đến bài học

├── exam/                  # đề thi TOPIK
│   ├── controller/         # xử lý request từ client liên quan đến đề thi (xem đề thi, làm đề thi...)
│   ├── service/            # xử lý logic liên quan đến đề thi (quản lý đề thi, tính điểm...)
│   ├── repository/         # tương tác với database liên quan đến đề thi (Exam, Question...)
│   ├── entity/             # định nghĩa các thực thể liên quan đến đề thi (Exam, Question...)
│   └── dto/                # các lớp DTO để truyền dữ liệu giữa client và server qua API liên quan đến đề thi

└── BackendAppApplication.java
