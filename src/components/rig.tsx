import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
// import { CameraControls } from '@react-three/drei';
import { useRoute } from 'wouter';

interface RigProps {
  position?: THREE.Vector3;
  focus?: THREE.Vector3;
}

function CameraRig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    const t = state.clock.elapsedTime
    state.camera.position.lerp(v.set(Math.sin(t / 5), 0, 12 + Math.cos(t / 5) / 2), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
}

export const Rig: React.FC<RigProps> = ({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}) => {
  const { scene } = useThree();
  const [, params] = useRoute('/item/:id');

  useEffect(() => {
    const active = scene.getObjectByName(params?.id || '');
    if (active) {
      active.parent?.localToWorld(position.set(0, 0.5, 0.25));
      active.parent?.localToWorld(focus.set(0, 0, -2));
    }
  }, [params?.id, scene, position, focus]);

  return (
    <CameraRig />
    // <CameraControls
    //   makeDefault
    //   minPolarAngle={0}
    //   maxPolarAngle={Math.PI / 2}
    // />
  );
};
