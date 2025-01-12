# DevelopsToday Frontend

DevelopsToday Frontend is a React-based frontend application designed to interact with the DevelopsToday backend. It provides a user interface for managing and displaying country data, game modes, and more. The project is built with Next.js and styled-components for fast and modern web development.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/download/) (version >=14.x)
- [npm](https://www.npmjs.com/get-npm)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/renanbianchi/developstoday-frontend.git
   cd developstoday-frontend

    Install dependencies:

npm install

Create a .env.local file in the root directory and set up environment variables. See the Configuration section for details.

Run the development server:

    npm run dev

    Open the app in your browser at http://localhost:3000.

Configuration

The .env.local file should contain the following environment variables:

NEXT_PUBLIC_API_BASE_URL=http://localhost:3002

    NEXT_PUBLIC_API_BASE_URL: The base URL for the backend API. This is used to make API requests from the frontend.

Usage

Once the development server is running, you can interact with the application at http://localhost:3000.

Example workflows:

    View a list of countries by accessing the main page.
    Navigate to a specific country’s details using its code and name in the URL (e.g., /country/US/United-States).

Available Scripts

Here are the most common scripts you can run in this project:

    Start the development server:

npm run dev

Build the project for production:

npm run build

Start the production server:

npm start
