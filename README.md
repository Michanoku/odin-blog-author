# Michanoku Blog Author Frontend

Author frontend application for The Odin Project  Blog project, built with **React** and **Vite**.

## Overview

The author frontend provides an authenticated interface for managing blog content and user information.

It includes:

* Author login with JWT authentication
* Author-only access through author status check
* Viewing all posts belonging to the authenticated author
* Creating, editing, publishing, and deleting posts
* Viewing and managing comments on the author's posts
* Editing and deleting comments from other users (on the authors post)
* User profile and password management
* Light and dark themes
* Responsive layout

## Technology

* React
* React Router
* Vite
* JavaScript
* CSS
* Lucide React

## Project Structure

```text
├── src/
│   ├── api/            # API communication
│   ├── components/     # React components
│   ├── styles/         # Application and component stylesheets
│   ├── App.jsx         # Root application component
│   └── main.jsx        # Application entry point
└── index.html          # HTML entry point
```

## Authentication

The application uses JWTs provided by the backend API for authenticated requests.

Author routes require both a valid JWT and author status. Post management is additionally restricted to posts owned by the authenticated author.

Authors can also manage comments on their own posts, including comments made by other users.

## Development

Start the Vite development server with:

```bash
npm run dev
```

The backend API URL and other environment-specific settings are configured through Vite environment variables.
