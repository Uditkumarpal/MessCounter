# Messy Meal Manager

A comprehensive meal management system for university mess halls and dining facilities.

## Project Overview

This is a React-based web application for managing mess operations, including meal planning, ordering, billing, and analytics.

## Features

- Student meal ordering system
- Menu management for mess administrators
- Bill generation and payment tracking
- Feedback and analytics system
- Multi-mess support
- Role-based access control (Students, Mess Admins, Super Admins)
- Student enrollment tracking with automatic billing delays
- Admin-specific student management with enrollment dates
- Isolated billing data per mess

## Development Setup

To run this project locally, you'll need Node.js and npm installed.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd messy-meal-manager

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technology Stack

This project is built with modern web technologies:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React
- **Charts**: Recharts
- **PDF Generation**: jsPDF

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── pages/          # Page components
├── providers/      # Provider components
├── services/       # API and data services
└── types/          # TypeScript type definitions
```

## New Features Documentation

### Student Enrollment Tracking

The system now includes enhanced student enrollment tracking with the following features:

1. **Automatic Enrollment Date Setting**: When a student registers, the system automatically sets their enrollment date to the current date.

2. **Delayed Billing**: Student billing starts automatically from the next month after enrollment, not immediately upon registration.

3. **Admin-Specific Views**: Each admin can only see students and billing information for their own mess, ensuring data isolation.

4. **Enhanced Student Management**: Admins can view detailed enrollment information including:
   - Enrollment date
   - Billing start date
   - Current billing status (Active/Waiting)
   - Bill history and statistics

5. **Search and Filter**: Admins can search and filter students by name, email, student ID, or billing status.

### Implementation Details

- Added `enrollmentDate` field to the User interface
- Modified bill generation service to respect enrollment dates
- Created new Student Enrollment Tracking page for admins
- Enhanced existing Dashboard with enrollment information
- Added navigation menu item for the new feature

## Deployment

To deploy this project:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Ensure your server is configured to serve the `index.html` file for all routes (SPA routing)

## Contributing

When contributing to this project:

1. Follow the existing code style
2. Add proper TypeScript types
3. Update relevant documentation
4. Test your changes thoroughly
