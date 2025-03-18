import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Rig } from "./components/rig";
import Context from "./components/context";
import ZPanel from "./layout/ZPanel";

function App() {
  const [carColor, setCarColor] = useState("#FAFAFA"); // Default color

  return (
    <>
        <div style={{ height: "85vh" }}>
        <ZPanel meshColor={carColor} setMeshColor={setCarColor} /> {/* Pass it here */}
        <Canvas
          shadows
          camera={{ fov: 10, position: [0, 0, 20] }}
          eventPrefix="client"
        >
          <Rig />
          <Context carColor={carColor} />

          <Preload all />
        </Canvas>
      </div>
    </>
  );
}

export default App;
