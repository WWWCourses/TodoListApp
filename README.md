# Todo App

A simple Todo List app that allows users to add, complete, and delete tasks. It uses a local server (`json-server`) to manage data and `Live Server` to serve the frontend.

## Features

- Add new tasks
- Mark tasks as complete or incomplete
- Delete tasks
- Data is persisted using JSON Server

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** JSON Server (for simulating a backend with `db.json`)

## Dependencies

- `json-server`: Used to create a mock REST API server.
- `live-server`: Used to serve the frontend.
- `concurrently`: Used to run both `json-server` and `live-server` in parallel.


## Project Structure
```
my-todo-app/
│
├── dist/                        # Compiled JavaScript (generated after `tsc`)
├── db/                          # JSON data for mock API
│   └── db.json                  # Mock data file
├── src/                         # Source files (TypeScript)
│   ├── components/              # Components (like TodoList, TodoItem)
│   │   └── TodoList.ts          # Todo list component logic
│   │   └── TodoItem.ts          # Todo item component logic
│   ├── models/                  # TypeScript interfaces/types
│   │   └── Todo.ts              # Interface for Todo item
│   ├── services/                # API interaction logic
│   │   └── apiService.ts        # API functions (get, post, etc.)
│   ├── utils/                   # Utility functions
│   │   └── domUtils.ts          # DOM manipulation functions
│   ├── app.ts                   # Main app logic and entry point
│   └── index.ts                 # Entry point for bundling TypeScript files
├── .gitignore                   # Files to ignore by Git
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

## Setup

1. Clone the repository:

   ```bash
   git clone <repo_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd TodoListApp
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the application:

   ```bash
   npm start
   ```

   This will start both the JSON Server and the Live Server.

## Usage

1. Open your browser and navigate to `http://localhost:8080`.

2. You can now add, complete, and delete tasks using the interface.

