# FinTrack - Personal Finance Dashboard

A modern, secure financial tracking application built with Next.js, TypeScript, and TanStack Table. Features comprehensive transaction management, real-time search, filtering capabilities, and robust security measures.

## 🚀 Features Implemented

### Core Dashboard
- **Header Navigation**: FinTrack logo, search functionality, profile dropdown with logout
- **Sidebar Navigation**: Responsive sidebar with active states and brand color theming
- **Wallet Ledger**: Main dashboard with active status indicator and user avatars
- **Tab Navigation**: Functional Overview and Transactions tabs

### Summary Cards
- **Financial Overview**: Total Balance ($12,345), Credits ($7,890), Debits ($4,455), Transactions (150)
- **Dynamic Indicators**: Color-coded change percentages with proper positive/negative styling
- **Reusable Components**: Consistent StatCard component used across all sections

### Transaction Management
- **Sortable Table**: Full-featured table with sorting, pagination, and filtering
- **Advanced Search**: Global search across transaction remarks, amounts, and types
- **Type Filtering**: Filter by Credit/Debit with visual dot indicators
- **Transaction List View**: Card-based layout with summary statistics
- **Add Transaction Modal**: Secure form for creating new transactions

### Security Implementation
**Security Utils (`src/utils/security.ts`)**:
- **Input Sanitization**: Prevents XSS attacks by removing dangerous characters (`<>`, `script`, `javascript:`)
- **SQL Injection Protection**: Strips SQL injection patterns (`--`, `;`, quotes)
- **Number Validation**: Safely converts user input to numbers, handling invalid data
- **Real-time Protection**: Applied to all form inputs as users type

```typescript
// Example: How security works
sanitizeInput("<script>alert('xss')</script>Hello") // Returns: "Hello"
sanitizeNumber("$1,234.56abc") // Returns: 1234.56
```

### Error Handling
- **Empty States**: Graceful handling when no data is available
- **Loading States**: Spinner components during data operations
- **Data Validation**: Type checking and invalid data filtering
- **404 Page**: Custom not-found page maintaining layout consistency

### Technical Architecture
- **TypeScript**: Fully typed with proper interfaces (`Transaction`, `DashboardSummary`)
- **Component Architecture**: Reusable, modular components
- **State Management**: Context API for search, local state for modals
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Proper cursor states, keyboard navigation, ARIA labels

## 🛡️ Security Features

The application implements comprehensive security measures:

1. **Input Sanitization**: All user inputs are sanitized against XSS and injection attacks
2. **Type Safety**: TypeScript ensures data integrity throughout the application
3. **Validation**: Form validation prevents invalid data submission
4. **Secure Defaults**: Safe fallbacks for all data operations

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js app router
├── components/          # Reusable UI components
├── context/            # React context providers
├── data/               # Sample data and types
├── types/              # TypeScript interfaces
└── utils/              # Security and utility functions
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Features Walkthrough

1. **Dashboard Overview**: View financial summary with interactive cards
2. **Search & Filter**: Use header search or table filters to find transactions
3. **Add Transactions**: Click "Add Transaction" to open secure modal form
4. **Tab Navigation**: Switch between Overview and detailed Transactions view
5. **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🔒 Security Implementation Details

The `sanitizeInput` function provides multi-layer protection:
- Removes HTML tags that could execute scripts
- Strips JavaScript protocol handlers
- Eliminates SQL injection patterns
- Cleans dangerous characters while preserving legitimate content

This ensures all user input is safe before processing or storage, protecting against common web vulnerabilities.
