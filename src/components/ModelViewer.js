"use client";
import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader } from "three";
import axios from "axios";

export default function ModelViewer() {
  const [modelData, setModelData] = useState(null);
  const [error, setError] = useState(null);
  const [obj, setObj] = useState(null);

  // Fetch metadata from both backends
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nextRes, pythonRes] = await Promise.all([
          axios.get("/api/model-info"), // Next.js API
          axios.get("http://localhost:5000/python-model-info"), // FastAPI
        ]);
        setModelData({
          nextjs: nextRes.data,
          python: pythonRes.data,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Load the model and texture inside `useEffect`
  useEffect(() => {
    const loadModel = async () => {
      try {
        const objLoader = new OBJLoader();
        const textureLoader = new TextureLoader();
        const loadedObj = await objLoader.loadAsync("/models/capsule.obj");
        const texture = await textureLoader.loadAsync("/models/capsule0.jpg");

        loadedObj.traverse((child) => {
          if (child.isMesh) {
            child.material.map = texture;
            child.material.needsUpdate = true;
          }
        });

        setObj(loadedObj);
      } catch (err) {
        console.error("Error loading model:", err);
        setError("Failed to load 3D model");
      }
    };

    loadModel();
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">3D Model Viewer</h1>

      {/* 3D Canvas */}
      <Canvas style={{ width: "1000px", height: "500px" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        {obj && <primitive object={obj} scale={1.5} />}
        <OrbitControls />
      </Canvas>

      {/* Display Metadata */}
      <div className="mt-6 p-4 border rounded shadow-md bg-blue-300 w-full max-w-2xl">
        <h2 className="text- lg text-black font-semibold">Model Metadata</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : modelData ? (
            <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-400">Python Backend:</h3>
              <pre className="bg-gray-900 p-3 rounded-lg text-sm">{JSON.stringify(modelData.python, null, 2)}</pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-400">Next.js Backend:</h3>
              <pre className="bg-gray-900 p-3 rounded-lg text-sm">{JSON.stringify(modelData.nextjs, null, 2)}</pre>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
