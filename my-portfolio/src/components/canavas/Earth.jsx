import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  Html,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

// 🩷 Utility: fix bad positions
const sanitizeGeometry = (geometry, meshName) => {
  const position = geometry.attributes?.position;
  if (!position || !position.array) {
    console.error(`❌ Mesh "${meshName}" has no valid position attribute.`);
    return;
  }

  let fixed = false;
  const arr = position.array;

  for (let i = 0; i < arr.length; i++) {
    if (!Number.isFinite(arr[i]) || isNaN(arr[i])) {
      console.warn(`🚨 Invalid value in "${meshName}" at index ${i}: ${arr[i]} → replaced with 0`);
      arr[i] = 0;
      fixed = true;
    }
  }

  if (fixed) {
    position.needsUpdate = true;
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    console.info(`✅ Fixed invalid positions in mesh "${meshName}".`);
  }
};

const Earth = () => {
  const { scene } = useGLTF("/planet/scene.gltf");

  console.log("✅ Loaded Scene:", scene);

  scene.traverse((child) => {
    if (child.isMesh) {
      const geom = child.geometry;

      if (!geom || !geom.attributes?.position) {
        console.error(`❌ Mesh "${child.name}" has no geometry or position attribute.`);
        return;
      }

      sanitizeGeometry(geom, child.name);

      if (!child.material) {
        console.warn(`⚠️ Mesh "${child.name}" has no material. Assigning fallback.`);
        child.material = new THREE.MeshStandardMaterial({ color: "blue" });
      }

      geom.computeBoundingBox();
      geom.computeBoundingSphere();
    }
  });

  return (
    <primitive
      object={scene}
      scale={3}
      position-y={0}
      rotation-y={0}
      dispose={null} // clean-up
    />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<Html center>Loading...</Html>}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Environment preset="sunset" />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;

export const EarthCanvasWrapper = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <EarthCanvas />
    </div>
  );
};
