'use client';
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import Lenis from '@studio-freight/lenis';

function CurvedPlane({ width, height, radius, segments, texturePath }) {
  const texture = useTexture(texturePath);

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];
    const uvs = [];
    const segmentsX = segments * 4;
    const segmentsY = Math.floor(height * 12);
    const theta = width / radius;

    for (let y = 0; y <= segmentsY; y++) {
      const yPos = (y / segmentsY - 0.5) * height;
      for (let x = 0; x <= segmentsX; x++) {
        const xAngle = (x / segmentsX - 0.5) * theta;
        const xPos = Math.sin(xAngle) * radius;
        const zPos = Math.cos(xAngle) * radius;
        vertices.push(xPos, yPos, zPos);
        uvs.push((x / segmentsX) * 0.8 + 0.1, y / segmentsY);
      }
    }

    for (let y = 0; y < segmentsY; y++) {
      for (let x = 0; x < segmentsX; x++) {
        const a = (segmentsX + 1) * y + x;
        const b = (segmentsX + 1) * (y + 1) + x;
        const c = (segmentsX + 1) * (y + 1) + (x + 1);
        const d = (segmentsX + 1) * y + (x + 1);

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }, [width, height, radius, segments]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        map={texture}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

function GalleryBlocks({ images, numVerticalSections, blocksPerSection, verticalSpacing, height }) {
  const galleryGroup = useRef();
  const radius = 10;
  const sectionAngle = (Math.PI * 2) / blocksPerSection;
  const maxRandomAngle = sectionAngle * 0.3;

  const blocks = useMemo(() => {
    const blockList = [];
    const totalBlockHeight = numVerticalSections * verticalSpacing;
    const heightBuffer = (height - totalBlockHeight) / 2;
    const startY = -height / 2 + heightBuffer + verticalSpacing;

    let imageIndex = 0; // Track image index for cycling

    for (let section = 0; section < numVerticalSections; section++) {
      const baseY = startY + section * verticalSpacing;
      for (let i = 0; i < blocksPerSection; i++) {
        const yOffset = Math.random() * 0.2 - 0.1;
        const texturePath = images[imageIndex]; // Use the current image
        imageIndex = (imageIndex + 1) % images.length; // Cycle through images

        const baseAngle = section * sectionAngle;
        const randomAngleOffset = (Math.random() * 2 - 1) * maxRandomAngle;
        const finalAngle = baseAngle + randomAngleOffset;

        blockList.push({
          baseY,
          yOffset,
          finalAngle,
          texturePath,
        });
      }
    }
    return blockList;
  }, [numVerticalSections, blocksPerSection, verticalSpacing, height, radius, images]);

  useFrame(() => {
    if (galleryGroup.current) {
      galleryGroup.current.rotation.y += 0.0025; // Base rotation speed
    }
  });

  return (
    <group ref={galleryGroup}>
      {blocks.map(({ baseY, yOffset, finalAngle, texturePath }, index) => (
        <group
          key={index}
          position={[0, baseY + yOffset, 0]}
          rotation={[0, finalAngle, 0]}
        >
          <CurvedPlane
            width={5}
            height={3}
            radius={radius}
            segments={10}
            texturePath={texturePath}
          />
        </group>
      ))}
    </group>
  );
}

function PaperGallery() {
  const lenis = useRef(new Lenis({ autoRaf: true }));

  const images = useMemo(() => {
    // Define all image paths here
    return Array.from({ length: 50 }, (_, i) => `/images/papers/${i + 1}.jpg`);
  }, []);

  useEffect(() => {
    lenis.current.start();
    const handleScroll = () => {
      lenis.current.raf();
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Canvas
      className="absolute top-0 left-0 w-full h-full"
      camera={{
        fov: 75,
        position: [0, 0, 12],
        near: 0.1,
        far: 1000,
      }}
    >
      <ambientLight intensity={1} />
      <GalleryBlocks
        images={images}
        numVerticalSections={12}
        blocksPerSection={4}
        verticalSpacing={3.25}
        height={30}
      />
    </Canvas>
  );
}

export default PaperGallery;
