import { useGLTF } from "@react-three/drei";
import { applyProps } from "@react-three/fiber";
import { useEffect, useLayoutEffect } from "react";

interface CarProps {
  carColor: string;
  [key: string]: any;
}

const Car: React.FC<CarProps> = ({ carColor, ...props }) => {
  const { scene, nodes, materials } = useGLTF("/911-transformed.glb");

  useLayoutEffect(() => {
    Object.values(nodes).forEach((node: any) => {
      if (node.isMesh) {
        node.receiveShadow = true;
        node.castShadow = true;
      }
    });

    applyProps(materials.rubber, {
      color: "#222",
      roughness: 0.6,
      roughnessMap: null,
      normalScale: [4, 4],
    });

    applyProps(materials.window, {
      color: "black",
      roughness: 0,
      clearcoat: 0.1,
    });

    applyProps(materials.coat, {
      envMapIntensity: 4,
      roughness: 0.5,
      metalness: 1,
    });
  }, [nodes, materials]); 

  useEffect(() => {
    if (materials.paint) {
      applyProps(materials.paint, {
        envMapIntensity: 2,
        roughness: 0.45,
        metalness: 0.8,
        color: carColor, 
     });
    }
  }, [carColor, materials.paint]); 

  return <primitive object={scene} {...props} />;
};

export default Car;
