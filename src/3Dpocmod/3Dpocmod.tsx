import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group, Mesh, MeshStandardMaterial } from 'three';

interface ModelProps extends React.ComponentPropsWithoutRef<'group'> {
  customColor: {
    mesh: string;
    cloth: string;
  };
}

// // convert models CODE // //
// npx gltfjsx scene.gltf -t


export default function Model({ customColor, ...props }: ModelProps) {
  const ref = useRef<Group>(null);
  const { nodes, materials } = useGLTF('/dragon/DragonAttenuation.gltf');

  useEffect(() => {
    if (ref.current) {
      // Update the material colors based on props
      const clothMaterial = materials['Cloth Backdrop'] as MeshStandardMaterial;
      const dragonMaterial = materials['Dragon with Attenuation'] as MeshStandardMaterial;

      if (clothMaterial) {
        clothMaterial.color.set(customColor.cloth);
      }
      if (dragonMaterial) {
        dragonMaterial.color.set(customColor.mesh);
      }
    }
  }, [customColor, materials]);

  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh
        name="Cloth_Backdrop"
        geometry={(nodes.Cloth_Backdrop as Mesh).geometry}
        material={materials['Cloth Backdrop']}
        position={[-0.155, -0.842, -0.17]}
        scale={3.5}
      />
      <mesh
        name="Dragon"
        geometry={(nodes.Dragon as Mesh).geometry}
        material={materials['Dragon with Attenuation']}
        position={[0, -0.731, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.25}
      />
    </group>
  );
}

useGLTF.preload('/dragon/DragonAttenuation.gltf');
