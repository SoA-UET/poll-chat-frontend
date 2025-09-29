# Vite + React 18 + TypeScript Frontend Template

## Setup

```sh
cd <project_root>
yarn
```

Under project root, copy the file `.env.example`
into a new file named `.env`. Customize the
variables as necessary.

## Synchronize API contracts

[Run the poll-chat-backend.](https://github.com/SoA-UET/poll-chat-backend).
Make sure it runs on `http://localhost:3000`.

Then, re-generate the OpenAPI contracts in frontend:

```sh
yarn api:sync
```

## Development

```sh
yarn dev
```

## Production

```sh
yarn build
```

Run the build:

```sh
yarn preview
```
