3D Model Viewer

This is a Next.js-based frontend application designed to display and interact with 3D models. It fetches model metadata from a FastAPI backend and renders the 3D models with textures.

Features

Built with Next.js and React Three Fiber

Displays 3D models with textures

Fetches metadata from a FastAPI backend

Supports dynamic loading of models

Responsive UI for seamless experience

Installation

1. Clone the Repository

https://github.com/bisher-muhammed/3d-viewer.git

2. Install Dependencies

"@react-three/drei": "^10.0.4",

    "@react-three/fiber": "^9.1.0",

    "axios": "^1.8.4",

    "next": "15.2.3",

    "react": "^19.0.0",

    "react-dom": "^19.0.0",

    "three": "^0.174.0"



3. Start the Development Server

npm run dev

Backend Integration

This frontend interacts with a FastAPI backend for fetching 3D model metadata. Make sure the backend is running before testing the app.

FastAPI Backend Repository: fastApi-backend

Running the Backend

Follow the instructions in the backend repository to set up and start the FastAPI server.

API Endpoints Used

Fetch Model MetadataURL: http://127.0.0.1:5000/python-model-infoMethod: GETResponse:

Image & Model Endpoints

User Interface: http://localhost:3001/

Model File: http://localhost:3001/models/capsule.obj

Model Image: http://localhost:3001/models/capsule0.jpeg

Model Metadata: http://localhost:3001/api/model-info


