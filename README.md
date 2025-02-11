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

