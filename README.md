# Nextfix
A Netflix-inspired web streaming platform built with React, Vite, and Python Flask, featuring movie discovery, profile-based browsing, demo authentication, and local video streaming.

## Overview

NEXTFLIX is a web development prototype that demonstrates a modern streaming-platform interface with a React frontend and a Flask backend.

The application provides movie browsing, responsive layouts, demo user profiles, and local video playback through HTTP Range requests.

**Project status:** Development prototype. The application is not connected to a production streaming database or commercial streaming service. Not every displayed movie has a playable video.

## Features

- **Cinematic Interface** — Netflix-inspired movie browsing experience.
- **Responsive Layout** — Designed for mobile, tablet, and desktop screens.
- **Movie Discovery** — Browse movie posters and titles.
- **Session-Based Shuffle** — Varying movie order during a browsing session.
- **Demo Profiles** — Local accounts for testing.
- **Demo Authentication** — Flask backend with JSON-based user data.
- **Local Video Streaming** — Video playback and seeking using HTTP Range requests.
- **Tamil Movie Collection** — Selected Tamil movie posters and configured playable titles.
- **Poster-Only Movies** — Unavailable video titles display a database-not-connected page.
- **Backend Tests** — Test script for supported backend endpoints.

## Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React 18, Vite 5, React Router 6 |
| UI | HTML5, CSS3, JavaScript |
| Backend | Python 3.10+, Flask 3 |
| User data | Local JSON file |
| Media | Local video files and HTTP Range requests |

The prototype does not require a SQL or MongoDB database.

 ## Project Structure

```text
Netfilx/
├── backend/
│   ├── ... Flask backend files
│   └── ... backend configuration and data
│
├── public/
│   └── ... public assets
│
├── screenshots/
│   └── ... project screenshots
│
├── src/
│   └── ... React application source
│
├── .gitignore
├── .node-version
├── .nvmrc
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

This structure reflects the files and folders uploaded to the GitHub repository. The exact contents of `backend/`, `public/`, and `src/` may vary as development continues.
## Requirements

Install the following tools:

- Node.js and npm
- Python 3.10 or later
- Git, if cloning the repository

## Installation and Setup

### 1. Get the Project

Clone the repository:

```bash
git clone https://github.com/varun05122006/Netfilx
cd nextflix-main
```

Alternatively, download and extract the project ZIP.

### 2. Start the Backend

From the project root, run:

```powershell
python -m venv backend/venv
.\backend\venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
python backend/app.py
```

Keep this terminal running.

If PowerShell blocks virtual-environment activation, use a terminal with the appropriate execution policy or run the virtual environment's Python executable directly.

### 3. Start the Frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the URL displayed by Vite.

The frontend and backend ports depend on their current configuration. Check `frontend/vite.config.js` and `backend/app.py` if the displayed ports differ from the expected development setup.

## Demo Accounts

The following credentials are intended for local testing. Use them only if they match the current `backend/users.json` file.

| Username | Password |
|---|---|
| `varun` | `demo@1234` |
| `issac` | `demo@1234` |
| `navven` | `demo@1234` |
| `prajeen` | `demo@1234` |
| `admin` | `admin@1234` |

These are demonstration credentials, not production accounts. Avoid publishing real credentials or using passwords reused elsewhere.

## Local Video Streaming

The current development setup uses local video files stored at:

```text
D:\Videos\movies
```
Playback requires the corresponding video files to exist and be correctly mapped in the backend.

### Media Limitations

- The local video directory is specific to the development machine.
- Movie video files are not included in the repository.
- A deployed frontend cannot directly access files on the developer's computer.
- Some displayed titles have posters only and do not have configured playable videos.
- Poster-only titles display the database-not-connected page in the current prototype.

Only use media you have permission to host or distribute.

## Backend Testing

The backend test script is located at:

```text
backend/test_backend.py
```

Run it from the project root using:

```powershell
python backend/test_backend.py
```

If the script requires the Flask server to be running, start the backend in a separate terminal first.

Depending on the implemented tests, validation may cover:

- Health-check responses
- Account and login endpoints
- Video streaming responses
- HTTP `206 Partial Content` for supported Range requests
- Expected error responses for unavailable or unsupported content

Test results depend on the current implementation and configuration. Run the tests locally before relying on these results.

## Production Build

From the frontend directory:

```powershell
npm run build
```

Vite normally writes production assets to:

```text
frontend/dist/
```

The generated `dist` folder is build output; it is not the frontend source code.

## Deployment

### Frontend

The Vite frontend can be deployed to a compatible static hosting platform, such as Vercel, after confirming the correct build command and output directory.

### Backend

The Flask backend must be deployed separately to a Python-compatible hosting environment unless the architecture is changed.

Before deploying, review:

- Frontend API base URLs
- Backend CORS configuration
- Environment variables and secrets
- Authentication and authorization
- JSON file persistence and write permissions
- Video storage and streaming paths
- Production server configuration

**Important:** Deploying the frontend alone does not deploy the Flask backend or make local movie files available online. A production deployment needs accessible media storage and correctly configured API endpoints.

## Security Considerations

NEXTFLIX is a development prototype, not a production-ready streaming service.

Before public use:

- Replace demo authentication with an appropriate secure authentication system.
- Never commit API keys, access tokens, or private credentials.
- Validate user input and enforce access controls.
- Review the security of JSON-based user data storage.
- Configure CORS appropriately for production.
- Use secure transport and production server settings.
- Ensure all hosted media is authorized for use.

## Future Improvements

Potential enhancements include:

- Database integration
- Production-grade authentication
- Cloud-based media storage
- Deployment-ready video streaming
- Improved logging and error handling
- Automated testing and CI/CD
- Environment-based configuration
- Stronger authorization and administration controls

## License

No open-source license has been specified for this project. All rights remain with their respective owners. No permission to reuse, modify, or redistribute this project is granted by this README alone.

  
