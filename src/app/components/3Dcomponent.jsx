import React, { useRef } from 'react'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Mushrooms() {
  const group = useRef()

  // Load the gltf model Here
  const PATH = 'path/to/your/file.glb'

  const { nodes, materials } = useGLTF(PATH)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
        // Animations go here
        // Example: group.current.rotation.y = t * 0.25
    }
  })

  return (
    <>
        < OrbitControls />
        <group>
            {/* Use GLTFJSX code here */}
        </group>
    </>
  )
}

useGLTF.preload(PATH)