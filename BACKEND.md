# AGMK Corporate Portal — Backend API

Node.js + Express + MongoDB (Mongoose) backend.  
Auth: JWT (access + refresh tokens).

---

## Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **Validation**: express-validator
- **Env**: dotenv
- **CORS**: cors

---

## Folder Structure

```
agmk-backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js
│   │   ├── Employee.js
│   │   ├── SanatoriumApplication.js
│   │   ├── KindergartenApplication.js
│   │   ├── IhpRequest.js
│   │   ├── FoodVoucher.js
│   │   ├── SupportTicket.js
│   │   └── Announcement.js
│   ├── middleware/
│   │   ├── auth.js            # JWT verify middleware
│   │   └── validate.js        # express-validator error handler
│   ├── routes/
│   │   ├── auth.js            # /api/auth
│   │   ├── users.js           # /api/users
│   │   ├── employees.js       # /api/employees
│   │   ├── sanatoriums.js     # /api/sanatoriums
│   │   ├── kindergartens.js   # /api/kindergartens
│   │   ├── ihp.js             # /api/ihp
│   │   ├── foodVouchers.js    # /api/food-vouchers
│   │   ├── support.js         # /api/support
│   │   └── announcements.js   # /api/announcements
│   └── app.js
├── .env
├── package.json
└── server.js
```

---

## Environment Variables (.env)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/agmk
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

---

## Models

### User.js
```js
{
  employeeId: { type: ObjectId, ref: 'Employee', required: true, unique: true },
  email:      { type: String, required: true, unique: true, lowercase: true },
  password:   { type: String, required: true },           // bcrypt hash
  role:       { type: String, enum: ['employee', 'hr', 'manager', 'admin'], default: 'employee' },
  refreshToken: String,
  isActive:   { type: Boolean, default: true },
  createdAt, updatedAt                                    // timestamps: true
}
```

### Employee.js
```js
{
  tabNumber:  { type: String, required: true, unique: true }, // табельный номер
  firstName:  String,
  lastName:   String,
  middleName: String,
  position:   String,
  department: String,
  phone:      String,
  mobile:     String,
  email:      String,
  birthday:   Date,
  isLeader:   { type: Boolean, default: false },
  hireDate:   Date,
  salary:     Number,
  createdAt, updatedAt
}
```

### SanatoriumApplication.js
```js
{
  user:        { type: ObjectId, ref: 'User', required: true },
  sanatorium:  { type: String, required: true },
  checkIn:     { type: Date, required: true },
  checkOut:    { type: Date, required: true },
  roomType:    String,
  treatment:   String,
  companions:  [{ name: String, relation: String }],
  medicalNotes: String,
  specialRequests: String,
  status:      { type: String, enum: ['pending', 'approved', 'rejected', 'completed'], default: 'pending' },
  queuePosition: Number,
  totalCost:   Number,
  createdAt, updatedAt
}
```

### KindergartenApplication.js
```js
{
  user:          { type: ObjectId, ref: 'User', required: true },
  childFirstName: { type: String, required: true },
  childLastName:  { type: String, required: true },
  childBirthDate: { type: Date, required: true },
  preferredGarden: String,
  parentInfo:    String,
  contacts:      String,
  additionalInfo: String,
  status:        { type: String, enum: ['pending', 'queue', 'enrolled', 'rejected'], default: 'pending' },
  queuePosition: Number,
  enrollmentDate: Date,
  createdAt, updatedAt
}
```

### IhpRequest.js
```js
{
  user:      { type: ObjectId, ref: 'User', required: true },
  category:  { type: String, required: true },
  itemName:  { type: String, required: true },
  quantity:  { type: Number, default: 1 },
  urgency:   { type: String, enum: ['low', 'normal', 'high'], default: 'normal' },
  purpose:   String,
  justification: String,
  status:    { type: String, enum: ['pending', 'approved', 'rejected', 'issued'], default: 'pending' },
  createdAt, updatedAt
}
```

### FoodVoucher.js
```js
{
  user:        { type: ObjectId, ref: 'User', required: true },
  type:        { type: String, enum: ['LPP', 'BP'], required: true }, // ЛПП / БП
  month:       { type: Number, required: true },  // 1-12
  year:        { type: Number, required: true },
  allocated:   { type: Number, required: true },  // сум
  used:        { type: Number, default: 0 },
  transactions: [{
    date:     Date,
    amount:   Number,
    location: String,
    description: String
  }],
  createdAt, updatedAt
}
```

### SupportTicket.js
```js
{
  ticketNumber: { type: String, unique: true },  // TS-2025-XXXX (auto-generated)
  user:         { type: ObjectId, ref: 'User', required: true },
  category:     { type: String, required: true },
  priority:     { type: String, enum: ['low', 'medium', 'high'], required: true },
  title:        { type: String, required: true },
  description:  { type: String, required: true },
  location:     String,
  contactPhone: String,
  status:       { type: String, enum: ['open', 'in_progress', 'resolved', 'closed'], default: 'open' },
  executor:     { type: ObjectId, ref: 'User' },
  solution:     String,
  comments:     [{ user: ObjectId, text: String, createdAt: Date }],
  createdAt, updatedAt
}
```

### Announcement.js
```js
{
  title:     { type: String, required: true },
  content:   { type: String, required: true },
  author:    { type: ObjectId, ref: 'User', required: true },
  category:  String,
  isPublished: { type: Boolean, default: true },
  readBy:    [{ type: ObjectId, ref: 'User' }],
  createdAt, updatedAt
}
```

---

## API Endpoints

### Auth — `/api/auth`

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/register` | Yangi foydalanuvchi ro'yxatdan o'tkazish | — |
| POST | `/login` | Login, JWT qaytaradi | — |
| POST | `/refresh` | Access token yangilash | — |
| POST | `/logout` | Refresh token o'chirish | ✓ |
| GET | `/me` | Joriy foydalanuvchi ma'lumoti | ✓ |

#### POST /api/auth/register
```json
// Request
{
  "email": "i.ivanov@agmk.uz",
  "password": "Password123!",
  "tabNumber": "2015",
  "role": "employee"
}

// Response 201
{
  "message": "Ro'yxatdan o'tish muvaffaqiyatli",
  "user": { "id": "...", "email": "...", "role": "employee" },
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

#### POST /api/auth/login
```json
// Request
{
  "email": "i.ivanov@agmk.uz",
  "password": "Password123!"
}

// Response 200
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ...",
  "user": {
    "id": "...",
    "email": "i.ivanov@agmk.uz",
    "role": "employee",
    "employee": { "firstName": "Иван", "lastName": "Иванов", "position": "...", "department": "..." }
  }
}
```

#### POST /api/auth/refresh
```json
// Request
{ "refreshToken": "eyJ..." }

// Response 200
{ "accessToken": "eyJ..." }
```

---

### Employees — `/api/employees`

| Method | Path | Description | Auth | Role |
|--------|------|-------------|------|------|
| GET | `/` | Barcha xodimlar (search, filter) | ✓ | any |
| GET | `/:id` | Bitta xodim | ✓ | any |
| POST | `/` | Yangi xodim qo'shish | ✓ | admin/hr |
| PUT | `/:id` | Xodimni yangilash | ✓ | admin/hr |
| DELETE | `/:id` | Xodimni o'chirish | ✓ | admin |

Query params for GET `/`: `?search=Иванов&department=IT&page=1&limit=20`

---

### Sanatorium Applications — `/api/sanatoriums`

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/` | Mening arizalarim | ✓ |
| GET | `/all` | Barcha arizalar (HR/admin) | ✓ (hr+) |
| POST | `/` | Yangi ariza | ✓ |
| GET | `/:id` | Ariza tafsiloti | ✓ |
| PUT | `/:id/status` | Status o'zgartirish | ✓ (hr+) |
| DELETE | `/:id` | Arizani bekor qilish | ✓ |

---

### Kindergarten Applications — `/api/kindergartens`

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/` | Mening arizalarim | ✓ |
| POST | `/` | Yangi ariza | ✓ |
| GET | `/:id` | Ariza tafsiloti | ✓ |
| PUT | `/:id/status` | Status o'zgartirish | ✓ (hr+) |
| DELETE | `/:id` | Arizani bekor qilish | ✓ |

---

### IHP Requests — `/api/ihp`

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/` | Mening so'rovlarim | ✓ |
| POST | `/` | Yangi so'rov | ✓ |
| GET | `/:id` | So'rov tafsiloti | ✓ |
| PUT | `/:id/status` | Status o'zgartirish | ✓ (hr+) |

---

### Food Vouchers — `/api/food-vouchers`

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/` | Joriy oy talonlari | ✓ |
| GET | `/history` | Tarix | ✓ |
| POST | `/transaction` | Tranzaksiya qo'shish | ✓ (admin) |

---

### Support Tickets — `/api/support`

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/` | Mening ticketlarim | ✓ |
| GET | `/all` | Barcha ticketlar (IT/admin) | ✓ (admin+) |
| POST | `/` | Yangi ticket | ✓ |
| GET | `/:id` | Ticket tafsiloti | ✓ |
| PUT | `/:id/status` | Status yangilash | ✓ (admin+) |
| POST | `/:id/comment` | Izoh qo'shish | ✓ |

---

### Announcements — `/api/announcements`

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/` | Barcha e'lonlar | ✓ |
| POST | `/` | Yangi e'lon | ✓ (hr+) |
| PUT | `/:id/read` | O'qilgan deb belgilash | ✓ |

---

## Auth Middleware

```js
// src/middleware/auth.js
// Authorization: Bearer <accessToken>
// req.user = { id, role, employeeId }
```

Role hierarchy: `employee < hr < manager < admin`

---

## Error Response Format

```json
{
  "success": false,
  "message": "Xato xabari",
  "errors": []   // validation xatolari (ixtiyoriy)
}
```

## Success Response Format

```json
{
  "success": true,
  "data": { ... },
  "pagination": {           // ro'yxat so'rovlari uchun
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

## Next.js Integration

Frontend tomonida `Authorization: Bearer <token>` header ishlatiladi.  
Token `localStorage` yoki `httpOnly cookie`da saqlanadi.  
`/api/auth/refresh` endpoint orqali token avtomatik yangilanadi.

Login/Register sahifalari: `/login`, `/register` — dashboard layout tashqarisida.

---

## Quick Start

```bash
# Backend
cd agmk-backend
npm install
cp .env.example .env   # .env ni to'ldiring
npm run dev

# Kerakli paketlar
npm install express mongoose jsonwebtoken bcryptjs cors dotenv express-validator
npm install -D nodemon
```
