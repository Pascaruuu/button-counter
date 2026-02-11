# Button Counter

A retro arcade-themed button counter application built with SvelteKit. Click the button (or press SPACE) to increment a persistent counter with a nostalgic 8-bit aesthetic.

## Live Demo

Try the app live at: **[https://button-counter-self.vercel.app/](https://button-counter-self.vercel.app/)**

## Features

- **Arcade Aesthetic**: Retro pixel-art styling with the "Press Start 2P" font
- **Persistent Storage**: Counter data is stored in a LibSQL database
- **Keyboard Support**: Press SPACEBAR to increment the counter
- **Real-time UI Updates**: Reactive Svelte components that instantly reflect counter changes
- **Tested**: Includes unit and integration tests for database operations and server logic

- **Deployment**: This project was deployed on "Digital Ocean" after tests.

## Tech Stack

- **Frontend**: [Svelte](https://svelte.dev/) 5.x with TypeScript
- **Framework**: [SvelteKit](https://kit.svelte.dev/) 2.x
- **Build Tool**: [Vite](https://vitejs.dev/) 7.x
- **Database**: [LibSQL](https://github.com/tursodatabase/libsql) (compatible with SQLite)
- **Testing**: [Vitest](https://vitest.dev/) 4.x, [Playwright](https://playwright.dev/) 1.x
- **Styling**: Custom CSS with retro arcade theme

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone or download the project
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

To automatically open the app in your browser:

```bash
npm run dev -- --open
```

### Building for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
src/
├── routes/
│   ├── +layout.svelte      
│   ├── +page.svelte        
│   └── +page.server.ts     
├── lib/
│   ├── components/
│   │   ├── ArcadeFrame.svelte    
│   │   ├── CounterDisplay.svelte 
│   │   ├── IncrementButton.svelte
│   │   └── schema.sql 
│   ├── server/
│   │   ├── db.ts           
│   │   ├── db_controllers.ts 
│   │   └── db_dev.ts       
│   ├── assets/             
│   └── index.ts            
tests/
├── integration_tests/      
└── unit_tests/             
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test:unit` | Run unit tests with Vitest |
| `npm run test:unit:watch` | Run unit tests with Vitest on watch mode |
| `npm run test:integration` | Run integration tests with playwright |
| `npm run test:integration:watch` | Run integration tests with playwright on watch mode |
| `npm run reset-db` | Reset the development database |

## Database

The application uses LibSQL (SQLite-compatible) to persist the counter value.

### Table

This project has one single table named "button_counters"
| Column | Type | Description | 
|---------|-------------|-----------|
| **id** | INTEGER | Primary key with auto-increment. |
| **counter** | BIGINT | The current count value (default: 0). |
| **last_clicked** | TIMESTAMP | Record of when the last increment occurred. |

### Reset the Database

To reset the counter and recreate the database (for developers):

```bash
npm run reset-db
```

## License

Open source - feel free to use and modify for your own projects.
