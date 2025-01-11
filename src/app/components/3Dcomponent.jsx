'use client'
import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)

const Papers = (props) => {
  const group = useRef()
  const spingroup = useRef()
  const { nodes, materials } = useGLTF('/papers.glb')

  const initialposition = [0, 0, 0]
  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        // markers: true
      }
    })

    timeline
      .to(group.current.position, { x: 0.5, y: 0, z: 0, duration: 1 })
      .to(group.current.position, { x: 0, y: 0, z: 0, duration: 1, ease: 'power2.out' })
      .to(group.current.rotation, { y: Math.PI, duration: 2}, 0)
      .to(spingroup.current.rotation, { x: Math.PI/2, duration: 2 },0)
      .to(spingroup.current.position, { z: -Math.PI*2-2, y: 1, duration: 2 })
  }, [])

  return (
    <group ref={group} {...props} position={initialposition} dispose={null}>
      <group ref={spingroup}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_30.geometry}
          material={materials['M_Papers.001']}
          scale={[15.15, 15.15, 15.15]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/papers.glb')

export { Papers }