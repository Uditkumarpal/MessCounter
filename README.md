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
