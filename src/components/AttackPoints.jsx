import { useMemo } from 'react'
import * as THREE from 'three'

function AttackPoints({ data }) {
  // Convert lat/lon to 3D position on sphere
  const latLonToXYZ = (lat, lon, radius = 1) => {
    const phi = (lat * Math.PI) / 180
    const theta = (lon * Math.PI) / 180

    const x = radius * Math.cos(phi) * Math.cos(theta)
    const z = radius * Math.cos(phi) * Math.sin(theta)
    const y = radius * Math.sin(phi)

    return { x, y, z }
  }

  // Calculate color based on date (older = brown, newer = red)
  const getColorForDate = (date) => {
    if (data.length === 0) return new THREE.Color(0.5, 0.3, 0.1)
    
    const dates = data.map(d => d.date)
    const minDate = Math.min(...dates)
    const maxDate = Math.max(...dates)
    const range = maxDate - minDate || 1

    // Normalize date to 0-1 range
    const normalized = (date - minDate) / range

    // Brown (older): rgb(139, 69, 19)
    // Red (newer): rgb(255, 69, 0)
    const r = (139 + (255 - 139) * normalized) / 255
    const g = (69 - 69 * normalized) / 255
    const b = (19 - 19 * normalized) / 255

    return new THREE.Color(r, g, b)
  }

  const maxDeaths = useMemo(() => {
    if (data.length === 0) return 1
    return Math.max(...data.map(d => d.deaths_max || 0), 1)
  }, [data])

  // Create lines and spheres as an array of JSX elements
  const elements = useMemo(() => {
    return data.map((attack, index) => {
      const pos = latLonToXYZ(attack.lat, attack.lon)
      
      // Calculate line height based on deaths_max
      const heightScale = 0.2 + ((attack.deaths_max / maxDeaths) * 0.4)
      const lineHeight = heightScale * 0.5

      // Start point on globe surface
      const startX = pos.x
      const startY = pos.y
      const startZ = pos.z

      // End point (extended outward)
      const endX = pos.x * (1 + lineHeight)
      const endY = pos.y * (1 + lineHeight)
      const endZ = pos.z * (1 + lineHeight)

      const color = getColorForDate(attack.date)
      const key = `attack-${index}`

      return (
        <group key={key}>
          {/* Vertical line */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([startX, startY, startZ, endX, endY, endZ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={color} linewidth={3} />
          </line>
          
          {/* Sphere at base */}
          <mesh position={[startX, startY, startZ]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color={color} />
          </mesh>
        </group>
      )
    })
  }, [data, maxDeaths])

  return (
    <group>
      {elements}
    </group>
  )
}

export default AttackPoints
