import { useRef, useEffect } from 'react'
import * as THREE from 'three'

function Globe() {
  const meshRef = useRef()

  useEffect(() => {
    // Create a better Earth texture using canvas
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 1024

    const ctx = canvas.getContext('2d')
    
    // Ocean blue background
    ctx.fillStyle = '#0d47a1'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Land color - multiple shades of green
    ctx.fillStyle = '#1b5e20'

    // Paint continents more visible
    // North America
    ctx.fillRect(50, 150, 250, 300)
    
    // Central America
    ctx.fillRect(280, 300, 80, 150)
    
    // South America
    ctx.fillRect(250, 420, 150, 250)
    
    // Europe
    ctx.fillRect(650, 100, 200, 200)
    
    // Africa
    ctx.fillRect(750, 300, 250, 400)
    
    // Asia
    ctx.fillRect(1050, 100, 600, 400)
    
    // Australia
    ctx.fillRect(1400, 500, 150, 150)
    
    // Antarctica
    ctx.fillRect(0, 850, canvas.width, 174)
    
    // Add lighter green for variation
    ctx.fillStyle = '#2e7d32'
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const w = Math.random() * 100 + 20
      const h = Math.random() * 100 + 20
      if (Math.random() > 0.3) { // 70% chance to draw
        ctx.fillRect(x, y, w, h)
      }
    }
    
    // Add subtle grid
    ctx.strokeStyle = 'rgba(100, 150, 200, 0.2)'
    ctx.lineWidth = 1
    
    // Latitude lines
    for (let lat = -90; lat <= 90; lat += 15) {
      const y = ((lat + 90) / 180) * canvas.height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
    
    // Longitude lines
    for (let lon = -180; lon <= 180; lon += 15) {
      const x = ((lon + 180) / 360) * canvas.width
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.magFilter = THREE.LinearFilter
    texture.minFilter = THREE.LinearFilter
    
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 5
    })

    if (meshRef.current) {
      meshRef.current.material = material
    }
  }, [])

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial />
    </mesh>
  )
}

export default Globe
