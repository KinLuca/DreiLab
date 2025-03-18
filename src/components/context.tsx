import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AccumulativeShadows,
  Environment,
  MeshPortalMaterial,
  PerformanceMonitor,
  RandomizedLight,
  RoundedBox,
  Stage,
} from "@react-three/drei";
import Car from "./car";
import Lightformers from "./lightformers";

const Context: React.FC<{ carColor: string }> = ({ carColor }) => {
  const portalRef = useRef<any>(null);
  const [degraded, degrade] = useState(false);

  useFrame((state, delta) => {
    if (portalRef.current) {
      // Example dynamic effect for blending
      portalRef.current.blend = Math.abs(Math.sin(state.clock.elapsedTime));
    }
  });

  return (
    <>
      <RoundedBox
        args={[2.5, 1.4, 0.1]}
        radius={0.05}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <MeshPortalMaterial>
          <spotLight
            position={[0, 15, 0]}
            angle={0.3}
            penumbra={1}
            castShadow
            intensity={2}
            shadow-bias={-0.0001}
          />
          <ambientLight intensity={0.5} />
          <Stage
            intensity={0.5}
            environment="city"
            shadows={{ type: "accumulative", bias: -0.001, intensity: Math.PI }}
            adjustCamera={true}
          >
        <Car position={[0, 0, 0]} scale={0.3} carColor={carColor} />
        </Stage>

          <AccumulativeShadows
            position={[10, -1.16, 10]}
            frames={100}
            alphaTest={0.9}
            scale={10}
          >
            <RandomizedLight
              amount={8}
              radius={10}
              ambient={0.5}
              position={[1, 5, -1]}
            />
          </AccumulativeShadows>
          <PerformanceMonitor onDecline={() => degrade(true)} />
          <Environment
            frames={degraded ? 1 : Infinity}
            resolution={420}
            background
            preset="studio"
            blur={20}
          >
            <Lightformers />
          </Environment>
        </MeshPortalMaterial>
      </RoundedBox>
    </>
  );
};

export default Context;
