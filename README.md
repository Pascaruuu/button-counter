# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

```sh
# create a new project
npx sv create my-app
```

To recreate the project with same configuration:

```sh
# recreate this project
npx sv create --template minimal --types ts --install npm .
```

## Developing

After you've created the project and installed dependencies (use `npm install`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of the app:

```sh
npm run build
```

We can preview with `npm run preview`.
