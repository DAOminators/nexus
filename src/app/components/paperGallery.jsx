'use client';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

// Create a separate papers.json file with this structure:
/*
{
  "papers": [
    {
      "path": "/images/papers/1.jpg",
      "link": "https://example1.com",
      "name": "Deep Learning Advances",
      "description": "A comprehensive study of recent advances in deep learning architectures",
      "authors": "John Doe, Jane Smith",
      "year": "2024"
    },
    // ... more papers
  ]
}
*/

// Tooltip component with enhanced styling
function Tooltip({ paperInfo, position }) {
  if (!paperInfo || !position) return null;
  
  return (
    <div 
      className="fixed z-50 p-4 bg-black/90 text-white rounded-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
      style={{ 
        left: position.x, 
        top: position.y - 20,
        maxWidth: '400px',
        backdropFilter: 'blur(5px)'
      }}
    >
      <h3 className="font-bold text-base mb-1">{paperInfo.name}</h3>
      <p className="text-sm text-gray-300 mb-1">{paperInfo.authors} ({paperInfo.year})</p>
      <p className="text-sm text-gray-400">{paperInfo.description}</p>
    </div>
  );
}

function CurvedPlane({ width, height, radius, segments, imageInfo, onClick, onHover }) {
  const texture = useTexture(imageInfo.path);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const meshRef = useRef();

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

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }, [width, height, radius, segments]);

  const handlePointerMove = (event) => {
    if (hovered) {
      event.stopPropagation();
      onHover({
        show: true,
        paperInfo: imageInfo,
        position: { x: event.clientX, y: event.clientY }
      });
    }
  };

  return (
    <mesh 
      ref={meshRef}
      geometry={geometry}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
        handlePointerMove(e);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'default';
        onHover({ show: false });
      }}
      onPointerMove={handlePointerMove}
      onClick={(e) => {
        e.stopPropagation();
        onClick(imageInfo.link);
      }}
    >
      <meshStandardMaterial 
        map={texture} 
        side={THREE.DoubleSide} 
        toneMapped={false}
        emissive="#ffffff"
        emissiveIntensity={hovered ? 0.2 : 0}
      />
    </mesh>
  );
}

function GalleryBlocks({ papers, numVerticalSections, blocksPerSection, verticalSpacing, height, scrollProgress, onHover }) {
  const galleryGroup = useRef();
  const radius = 10;
  const sectionAngle = (Math.PI * 2) / blocksPerSection;
  const maxRandomAngle = sectionAngle * 0.3;

  const handleImageClick = (link) => {
    window.open(link, '_blank');
  };

  const blocks = useMemo(() => {
    const blockList = [];
    const totalBlockHeight = numVerticalSections * verticalSpacing;
    const heightBuffer = (height - totalBlockHeight) / 2;
    const startY = -height / 2 + heightBuffer + verticalSpacing;

    let paperIndex = 0;

    for (let section = 0; section < numVerticalSections; section++) {
      const baseY = startY + section * verticalSpacing;
      for (let i = 0; i < blocksPerSection; i++) {
        const yOffset = Math.random() * 10 - 0.1;
        const currentPaper = papers[paperIndex % papers.length];
        paperIndex++;

        const baseAngle = section * sectionAngle;
        const randomAngleOffset = (Math.random() * 2 - 1) * maxRandomAngle;
        const finalAngle = baseAngle + randomAngleOffset;

        blockList.push({
          baseY,
          yOffset,
          finalAngle,
          imageInfo: currentPaper,
        });
      }
    }
    return blockList;
  }, [numVerticalSections, blocksPerSection, verticalSpacing, height, papers]);

  useFrame(() => {
    if (galleryGroup.current) {
      galleryGroup.current.rotation.y = 0.0025 + scrollProgress * Math.PI * 2;
      galleryGroup.current.position.y = scrollProgress * 15;
    }
  });

  return (
    <group ref={galleryGroup}>
      {blocks.map(({ baseY, yOffset, finalAngle, imageInfo }, index) => (
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
            imageInfo={imageInfo}
            onClick={handleImageClick}
            onHover={onHover}
          />
        </group>
      ))}
    </group>
  );
}

function PaperGallery() {
  const scrollContainer = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tooltip, setTooltip] = useState({ show: false, paperInfo: null, position: null });
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    // Fetch papers data from JSON file
    fetch('/data/papers.json')
      .then(response => response.json())
      .then(data => setPapers(data.papers))
      .catch(error => console.error('Error loading papers:', error));

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const updateScroll = () => {
      if (scrollContainer.current) {
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        const current = window.scrollY;
        setScrollProgress(current / scrollMax);
      }
    };

    window.addEventListener('scroll', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
      lenis.destroy();
    };
  }, []);

  if (papers.length === 0) {
    return <div className="h-screen flex items-center justify-center">Loading papers...</div>;
  }

  return (
    <div ref={scrollContainer} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen w-full">
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
            papers={papers}
            numVerticalSections={12}
            blocksPerSection={4}
            verticalSpacing={3.25}
            height={30}
            scrollProgress={scrollProgress}
            onHover={setTooltip}
          />
        </Canvas>
        {tooltip.show && <Tooltip paperInfo={tooltip.paperInfo} position={tooltip.position} />}
      </div>
    </div>
  );
}

export default PaperGallery;