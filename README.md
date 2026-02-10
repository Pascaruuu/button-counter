# Button Counter

A retro arcade-themed button counter application built with SvelteKit. Click the button (or press SPACE) to increment a persistent counter with a nostalgic 8-bit aesthetic.

## Live Demo

Try the app live at: **[https://button-counter-self.vercel.app/](https://button-counter-self.vercel.app/)**

## Features

- **Arcade Aesthetic**: Retro pixel-art styling with the "Press Start 2P" font
- **Persistent Storage**: Counter data is stored in a LibSQL database
- **Keyboard Support**: Press SPACEBAR to increment the counter
- **Real-time UI Updates**: Reactive Svelte components that instantly reflect counter changes
- **Type-Safe**: Built with TypeScript for better code reliability
- **Tested**: Includes unit tests for database operations and server logic

## Tech Stack

- **Frontend**: [Svelte](https://svelte.dev/) 5.x with TypeScript
- **Framework**: [SvelteKit](https://kit.svelte.dev/) 2.x
- **Build Tool**: [Vite](https://vitejs.dev/) 7.x
- **Database**: [LibSQL](https://github.com/tursodatabase/libsql) (compatible with SQLite)
- **Testing**: [Vitest](https://vitest.dev/) 4.x
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
│   ├── +layout.svelte      # Main layout component
│   ├── +page.svelte        # Home page
│   └── +page.server.ts     # Server-side logic & actions
├── lib/
│   ├── components/
│   │   ├── ArcadeFrame.svelte    # Arcade frame container
│   │   ├── CounterDisplay.svelte # Displays counter value
│   │   └── IncrementButton.svelte # Click/Space-activated button
│   ├── server/
│   │   ├── db.ts           # Database initialization
│   │   ├── db_controllers.ts # Counter CRUD operations
│   │   └── db_dev.ts       # Development database setup
│   ├── assets/             # Static assets (arcade frame image)
│   └── index.ts            # Library exports
tests/
└── unit_tests/             # Unit tests for server logic
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | Run type checking and SVG linting |
| `npm run check:watch` | Watch mode for type checking |
| `npm run unit-test` | Run unit tests with Vitest |
| `npm run reset-db` | Reset the development database |

## Database

The application uses LibSQL (SQLite-compatible) to persist the counter value.

### Reset the Database

To reset the counter and recreate the database:

```bash
npm run reset-db
```

## Testing

Run the test suite:

```bash
npm run unit-test
```

Tests cover:
- Database initialization and operations
- Counter increment logic
- Server-side API actions

## How It Works

1. **Page Load**: The server fetches the current counter value from the database using `getDataFromDB()`
2. **User Interaction**: Click the button or press SPACEBAR to trigger the increment action
3. **Server Action**: The `default` action in `+page.server.ts` calls `incrementCounter()` to update the database
4. **UI Update**: Svelte reactivity automatically updates the display with the new counter value

## Browser Support

Works on modern browsers that support:
- ES2020+
- CSS Grid & Flexbox
- LocalStorage (for session data if needed)

## License

Open source - feel free to use and modify for your own projects.
