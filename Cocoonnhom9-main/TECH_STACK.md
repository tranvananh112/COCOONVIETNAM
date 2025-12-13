# 🛠️ Tech Stack - Công Nghệ Sử Dụng

## 📋 Tổng quan

Website Cocoon Vietnam được xây dựng với các công nghệ hiện đại, tập trung vào hiệu suất, trải nghiệm người dùng và khả năng mở rộng.

---

## 🎯 Core Technologies (Công nghệ chính)

### 1. **Next.js 16.0.7** 
- **Loại:** React Framework
- **Vai trò:** Framework chính cho website
- **Tính năng:**
  - Server-Side Rendering (SSR)
  - Static Site Generation (SSG)
  - App Router (Next.js 13+)
  - API Routes
  - Image Optimization
  - File-based Routing

### 2. **React 19.2.0**
- **Loại:** JavaScript Library
- **Vai trò:** Thư viện UI chính
- **Tính năng:**
  - Component-based architecture
  - Virtual DOM
  - Hooks (useState, useEffect, useContext...)
  - Client-side rendering

### 3. **TypeScript 5.x**
- **Loại:** Programming Language
- **Vai trò:** Ngôn ngữ lập trình chính
- **Lợi ích:**
  - Type safety
  - Better IDE support
  - Fewer runtime errors
  - Better code documentation

---

## 🎨 Styling & UI (Giao diện)

### 1. **Tailwind CSS 4.1.9**
- **Loại:** CSS Framework
- **Vai trò:** Utility-first CSS framework
- **Tính năng:**
  - Responsive design
  - Dark mode support
  - Custom themes
  - JIT (Just-In-Time) compilation

### 2. **Radix UI**
- **Loại:** Headless UI Components
- **Components sử dụng:**
  - Dialog, Dropdown, Popover
  - Accordion, Tabs, Toast
  - Select, Checkbox, Radio
  - Slider, Switch, Progress
  - Navigation Menu, Context Menu
  - Và nhiều component khác...
- **Lợi ích:**
  - Accessible (WCAG compliant)
  - Unstyled (dễ customize)
  - Keyboard navigation

### 3. **Lucide React**
- **Loại:** Icon Library
- **Vai trò:** Icon system
- **Số lượng:** 1000+ icons
- **Tính năng:** Tree-shakeable, customizable

### 4. **next-themes**
- **Loại:** Theme Management
- **Vai trò:** Dark/Light mode switching
- **Tính năng:** System preference detection

---

## 🗄️ Backend & Database

### 1. **Supabase**
- **Loại:** Backend as a Service (BaaS)
- **Vai trò:** Database, Authentication, Real-time
- **Tính năng sử dụng:**
  - PostgreSQL Database
  - Real-time subscriptions (WebSocket)
  - Row Level Security (RLS)
  - RESTful API
  - Storage (images)

### 2. **@supabase/supabase-js**
- **Loại:** JavaScript Client
- **Vai trò:** Kết nối với Supabase
- **Tính năng:**
  - CRUD operations
  - Real-time listeners
  - Authentication
  - File upload

### 3. **@supabase/ssr**
- **Loại:** Server-Side Rendering Support
- **Vai trò:** Supabase cho Next.js SSR
- **Tính năng:**
  - Server components support
  - Cookie-based auth

---

## 📊 State Management (Quản lý trạng thái)

### 1. **Zustand**
- **Loại:** State Management Library
- **Vai trò:** Global state management
- **Sử dụng cho:**
  - Cart store (giỏ hàng)
  - Order store (đơn hàng)
  - User preferences
- **Lợi ích:**
  - Lightweight (< 1KB)
  - Simple API
  - No boilerplate
  - TypeScript support

### 2. **SWR (Stale-While-Revalidate)**
- **Loại:** Data Fetching Library
- **Vai trò:** Remote data fetching & caching
- **Tính năng:**
  - Auto revalidation
  - Cache management
  - Optimistic UI
  - Real-time updates

### 3. **Immer**
- **Loại:** Immutable State Helper
- **Vai trò:** Simplify immutable updates
- **Sử dụng với:** Zustand middleware

---

## 📝 Form Management (Quản lý form)

### 1. **React Hook Form**
- **Loại:** Form Library
- **Vai trò:** Form validation & handling
- **Tính năng:**
  - Performance optimization
  - Easy validation
  - TypeScript support
  - Less re-renders

### 2. **Zod**
- **Loại:** Schema Validation
- **Vai trò:** Type-safe validation
- **Sử dụng cho:**
  - Form validation
  - API validation
  - Data parsing

### 3. **@hookform/resolvers**
- **Loại:** Validation Resolver
- **Vai trò:** Connect Zod with React Hook Form

---

## 🎭 UI Utilities

### 1. **class-variance-authority (CVA)**
- **Loại:** CSS Utility
- **Vai trò:** Variant-based styling
- **Sử dụng cho:** Button variants, component variants

### 2. **clsx**
- **Loại:** Classname Utility
- **Vai trò:** Conditional classnames

### 3. **tailwind-merge**
- **Loại:** Tailwind Utility
- **Vai trò:** Merge Tailwind classes without conflicts

### 4. **tailwindcss-animate**
- **Loại:** Animation Plugin
- **Vai trò:** Pre-built animations for Tailwind

---

## 📅 Date & Time

### 1. **date-fns**
- **Loại:** Date Utility Library
- **Vai trò:** Date formatting & manipulation
- **Tính năng:**
  - Lightweight
  - Modular
  - i18n support

### 2. **react-day-picker**
- **Loại:** Date Picker Component
- **Vai trò:** Calendar/date selection UI

---

## 🎨 UI Components & Features

### 1. **Sonner**
- **Loại:** Toast Notification
- **Vai trò:** User notifications
- **Tính năng:**
  - Beautiful design
  - Stacking
  - Promise-based

### 2. **embla-carousel-react**
- **Loại:** Carousel Library
- **Vai trò:** Image/content carousel
- **Tính năng:**
  - Touch-friendly
  - Responsive
  - Customizable

### 3. **cmdk**
- **Loại:** Command Menu
- **Vai trò:** Command palette (Ctrl+K)
- **Tính năng:**
  - Keyboard shortcuts
  - Search
  - Fuzzy matching

### 4. **vaul**
- **Loại:** Drawer Component
- **Vai trò:** Mobile drawer/bottom sheet

### 5. **react-resizable-panels**
- **Loại:** Resizable Layout
- **Vai trò:** Split panels, resizable sections

### 6. **input-otp**
- **Loại:** OTP Input
- **Vai trò:** One-time password input

---

## 📈 Analytics & Monitoring

### 1. **@vercel/analytics**
- **Loại:** Analytics Service
- **Vai trò:** Track user behavior
- **Tính năng:**
  - Page views
  - User sessions
  - Performance metrics
  - Privacy-friendly

---

## 📊 Charts & Visualization

### 1. **Recharts**
- **Loại:** Chart Library
- **Vai trò:** Data visualization
- **Sử dụng cho:**
  - Admin dashboard
  - Analytics charts
  - Sales reports

---

## 🔧 Development Tools

### 1. **PostCSS**
- **Loại:** CSS Processor
- **Vai trò:** Transform CSS with plugins

### 2. **Autoprefixer**
- **Loại:** PostCSS Plugin
- **Vai trò:** Add vendor prefixes automatically

### 3. **ESLint**
- **Loại:** Linter
- **Vai trò:** Code quality & consistency

---

## 🌐 Deployment & Hosting

### **Vercel**
- **Loại:** Hosting Platform
- **Vai trò:** Deploy & host website
- **Tính năng:**
  - Auto deployment from Git
  - Edge Network (CDN)
  - Serverless Functions
  - Preview deployments
  - Analytics

---

## 📦 Package Manager

### **npm / pnpm**
- **Loại:** Package Manager
- **Vai trò:** Manage dependencies
- **File:** `package.json`, `pnpm-lock.yaml`

---

## 🏗️ Architecture Pattern

### **App Router (Next.js 13+)**
- File-based routing
- Server Components
- Client Components
- API Routes
- Middleware

### **Component Structure**
```
app/                    # Pages & routes
components/             # Reusable components
  ui/                   # UI primitives
lib/                    # Utilities & helpers
  supabase/            # Supabase clients
public/                # Static assets
```

---

## 🔐 Security Features

1. **Row Level Security (RLS)** - Supabase
2. **Environment Variables** - `.env.local`
3. **HTTPS** - Vercel automatic
4. **CORS** - Configured in Supabase
5. **Input Validation** - Zod schemas

---

## 🌍 SEO & Performance

### **SEO**
- Next.js Metadata API
- JSON-LD Schema
- Sitemap generation
- robots.txt
- Open Graph tags

### **Performance**
- Image optimization (next/image)
- Code splitting
- Lazy loading
- Edge caching
- Static generation

---

## 📱 Progressive Web App (PWA)

- Responsive design
- Mobile-first approach
- Touch-friendly UI
- Fast loading

---

## 🎯 Key Features Implementation

### **Real-time Order Tracking**
- Supabase Realtime
- WebSocket connections
- SWR for data fetching

### **Shopping Cart**
- Zustand for state
- LocalStorage persistence
- Optimistic updates

### **Product Management**
- Supabase PostgreSQL
- Image storage
- CRUD operations

### **Analytics Dashboard**
- Recharts for visualization
- Real-time metrics
- Visitor tracking

---

## 📊 Summary Statistics

| Category | Count |
|----------|-------|
| **Total Dependencies** | 50+ packages |
| **UI Components** | 25+ Radix UI components |
| **Icons** | 1000+ Lucide icons |
| **Languages** | TypeScript, JavaScript, CSS |
| **Framework** | Next.js 16 (React 19) |
| **Database** | PostgreSQL (Supabase) |
| **Hosting** | Vercel Edge Network |

---

## 🚀 Why These Technologies?

### **Performance**
- Next.js SSR/SSG for fast loading
- Edge caching via Vercel
- Optimized images
- Code splitting

### **Developer Experience**
- TypeScript for type safety
- Hot reload
- Great tooling
- Active communities

### **User Experience**
- Real-time updates
- Smooth animations
- Responsive design
- Accessible components

### **Scalability**
- Serverless architecture
- Edge functions
- Database scaling (Supabase)
- CDN distribution

### **Cost-Effective**
- Free tier available (Vercel, Supabase)
- Pay-as-you-grow
- No server management

---

## 🔄 Version Control

- **Git** - Version control
- **GitHub** - Repository hosting
- **Branches:** main, development

---

## 📚 Documentation

- TypeScript types for all components
- JSDoc comments
- README files
- Setup guides
- API documentation

---

## 🎓 Learning Resources

### **Next.js**
- https://nextjs.org/docs

### **React**
- https://react.dev

### **Tailwind CSS**
- https://tailwindcss.com/docs

### **Supabase**
- https://supabase.com/docs

### **TypeScript**
- https://www.typescriptlang.org/docs

---

## 🔮 Future Enhancements

- [ ] PWA support (offline mode)
- [ ] Multi-language (i18n)
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] Advanced analytics
- [ ] AI chatbot support
- [ ] Social media integration

---

**Last Updated:** December 2024  
**Version:** 1.0.0  
**Maintained by:** Nhóm 9 - Cocoon Vietnam
