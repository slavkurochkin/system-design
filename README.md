# System Design Learning Platform

A comprehensive React application for learning system design concepts through interactive visualizations, examples, and hands-on exercises.

## 🚀 Features

- **Interactive Learning Modules**: Core fundamentals, databases, scalability, reliability, and more
- **Visual Diagrams**: Circuit breakers, consistent hashing, Raft consensus, and other system design patterns
- **Real-world Examples**: Industry-standard practices and case studies
- **Interview Preparation**: Practice questions with evaluation criteria
- **Modern UI**: Built with Radix UI components and Tailwind CSS

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Node.js**: 20.19.5+ (required)

## 📋 Prerequisites

- Node.js 20.0.0 or higher
- npm 10.0.0 or higher

## 🚀 Getting Started

### Installation

1. **Install Node.js 20+** (if not already installed):

   ```bash
   # Using nvm (recommended)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   nvm install 20
   nvm use 20
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run start` - Start production server
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (Radix UI)
│   ├── visualizations/  # Interactive system design visualizations
│   └── data/            # Component data and configurations
├── styles/              # Global styles and CSS
├── guidelines/          # Development guidelines
└── main.tsx            # Application entry point
```

## 🎯 Learning Modules

1. **Core Fundamentals** - Client-server model, protocols, networking
2. **Databases & Storage** - SQL vs NoSQL, sharding, replication, CAP theorem
3. **Scalability & Performance** - Load balancing, CDNs, message queues
4. **Reliability & Fault Tolerance** - Failover, redundancy, circuit breakers
5. **Architecture Patterns** - Microservices, event-driven, CQRS
6. **Observability & Operations** - Logging, monitoring, tracing, SLAs
7. **Security** - Authentication, authorization, encryption, zero trust
8. **Cloud & Infrastructure** - Containers, orchestration, IaC
9. **Advanced Topics** - Distributed consensus, consistent hashing, CRDTs
10. **Interview Questions** - Practice with examples and evaluation criteria

## 🔧 Configuration

### TypeScript

- Configuration: `tsconfig.json`
- Strict mode disabled for compatibility with Figma-generated code
- Path mapping configured for `@/*` imports

### Vite

- Configuration: `vite.config.ts`
- Optimized for production builds with code splitting
- Development server with hot reload

### Tailwind CSS

- Configuration: `tailwind.config.js`
- Custom design system with CSS variables
- Dark mode support

## 🚀 Deployment

The application builds to static files in the `dist/` directory and can be deployed to any static hosting service:

- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder
- **AWS S3**: Upload the `dist/` folder contents
- **GitHub Pages**: Use the `dist/` folder as the source

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checking
5. Submit a pull request

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

The application automatically deploys to GitHub Pages when you push to the `main` branch:

1. **Push to main branch**: The GitHub Action will automatically build and deploy
2. **Access your site**: `https://[your-username].github.io/system-design/`

### Manual Deployment

To deploy manually or test the build locally:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# Preview the production build locally
npm run preview
```

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. The workflow will automatically deploy on push to main

### Deployment Configuration

- **Base URL**: `/system-design/` (for GitHub Pages subpath)
- **Build Output**: `dist/` directory
- **Assets**: Optimized with code splitting and minification
- **Source Maps**: Generated for debugging

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with modern React patterns and best practices
- UI components from Radix UI
- Icons from Lucide React
- Charts and visualizations with Recharts
- Styling with Tailwind CSS
- Deployed with GitHub Actions

---

**Note**: This application was converted from Figma-generated code to a production-ready React application with Node.js 20+ support and automated GitHub Pages deployment.
