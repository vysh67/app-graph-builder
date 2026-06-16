# App Graph Builder

Interactive application dependency graph built with ReactFlow, Zustand, TanStack Query and shadcn/ui.

## Live Demo

https://app-graph-builder-seven.vercel.app/

## Features

* Application graph visualization using ReactFlow
* Multiple application selection
* Interactive node inspection
* Node editing
* Node deletion
* CPU allocation controls
* Zustand state management
* TanStack Query data fetching
* Responsive layout
* Mobile drawer
* Dark dashboard UI
* Custom service nodes
* Fit View functionality

## Tech Stack

* React
* TypeScript
* Vite
* ReactFlow (@xyflow/react)
* Zustand
* TanStack Query
* Tailwind CSS
* shadcn/ui

## Installation

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Project Structure

src/
├── api/
├── components/
├── hooks/
├── store/
├── lib/

## Architecture

* Zustand manages client-side UI state.
* TanStack Query manages server state and caching.
* ReactFlow handles graph rendering and interactions.
* Mock APIs simulate backend services.

## Known Limitations

* Uses mock API data.
* Changes are not persisted after page refresh.
* No backend integration.
