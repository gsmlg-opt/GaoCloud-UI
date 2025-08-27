# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
GaoCloud-UI is an enterprise-grade Kubernetes management system built as a React monorepo with 4 packages: main UI application, custom UI components, shared utilities, and performance benchmarks.

## Quick Start Commands

### Development
```bash
npm start          # Start development server with hot reload
npm run build      # Production build
npm run test       # Run all tests
npm run lint       # Run ESLint
npm run generate   # Generate new components via plop
```

### Package-Specific Commands
```bash
cd packages/ui && make build    # Build only UI package
cd packages/ui && make test     # Test only UI package
cd packages/utils && bun build:cjs  # Build utils in CJS format
```

### Docker & Deployment
```bash
make build-image    # Build Docker image
make docker         # Push to registry
make deploy-docs    # Deploy documentation to GitHub Pages
```

## Architecture & Structure

### Monorepo Layout
- **packages/ui/**: Main React application (GaoCloud management system)
- **packages/com/**: Custom UI components (charts, graphs, tables)
- **packages/utils/**: Shared utility functions
- **packages/benchmark/**: Performance testing utilities

### Core Directories
- `packages/ui/app/`: Main application source (containers, components, ducks)
- `packages/ui/server/`: Express development server
- `packages/ui/internals/`: Build tools, webpack configs, generators
- `packages/ui/tests/`: Test files
- `generators/`: Plop-based code scaffolding
- `docs/`: mdBook documentation

## Technology Stack

### Frontend
- React 16.12.0 + React Router 5.1.2
- Redux 4.0.4 + Redux-Observable 2.0.0 (RxJS 7.8.2)
- Material-UI 4.12.4 + styled-components 6.1.19

### Build System
- Webpack 5.101.3 with custom configs in `internals/webpack/`
- Babel 7.28.3 with environment-specific presets
- Bun package manager (npm/yarn compatible)
- TypeScript configured but mostly JS codebase

### Testing
- Jest 30.0.5 + Enzyme 3.11.0 + React Testing Library
- Coverage thresholds: 10% statements, 3% functions, 1% branches
- Test files co-located with source or in `tests/` directory

## Key Development Patterns

### Redux Architecture
- **Ducks pattern**: Redux modules in `app/containers/[name]/ducks/`
- **Epics**: Async operations via redux-observable middleware
- **Reselect**: Memoized selectors for performance optimization

### Component Organization
- **Containers/**: Smart components with Redux connection
- **Components/**: Reusable presentational components
- **Loadable**: Code-splitting via React Loadable

### Styling
- Material-UI JSS for theming
- styled-components for custom components
- Custom theme configuration available

### Code Generation
- Plop-based generators in `generators/index.js`
- Scaffold components, Redux ducks, and tests consistently

## Development Workflow

### Adding New Features
1. Use generators: `npm run generate`
2. Follow ducks pattern for Redux state
3. Add tests alongside implementation
4. Run `npm run lint` before committing

### Internationalization
- Uses react-intl 3.9.1
- Translation files in `app/translations/[lang].json`
- English and Chinese supported by default

### Testing Commands
```bash
npm run test                    # Run all tests
npm run test:watch              # Watch mode
npm run test:coverage           # Generate coverage report
```

## Build Targets
- **CJS**: CommonJS build for Node.js
- **ESM**: ES modules build for bundlers
- **ES**: Latest ES features build

## Environment Configuration
- Development server: Express with hot reload via webpack dev middleware
- Proxy support: Configurable via Express middleware
- Environment variables: Use `.env` files for local configuration

## Documentation
- **mdBook**: Comprehensive docs in `docs/` directory
- **GitHub Pages**: Auto-deployed via `make deploy-docs`
- **Design decisions**: Documented in mdBook format