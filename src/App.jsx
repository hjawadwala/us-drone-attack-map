import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Globe from './components/Globe'
import AttackPoints from './components/AttackPoints'
import { Suspense } from 'react'

function App() {
  const [attackData, setAttackData] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    totalDeaths: 0,
    countries: 0
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json')
        const data = await response.json()

        // Filter data to only include records with valid coordinates and deaths data
        const validData = data.filter(
          record => record.lat && record.lon && record.deaths_max
        )

        setAttackData(validData)

        // Calculate statistics
        const uniqueCountries = new Set(validData.map(record => record.country))
        const totalDeaths = validData.reduce((sum, record) => sum + record.deaths_max, 0)

        setStats({
          total: validData.length,
          totalDeaths: totalDeaths,
          countries: uniqueCountries.size
        })

        setLoading(false)
      } catch (error) {
        console.error('Error fetching drone attack data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container">
      {loading && (
        <div className="loading">
          <h2>Loading drone attack data...</h2>
          <div className="spinner"></div>
        </div>
      )}

      <div className="stats-panel">
        <h2>Drone Attack Statistics</h2>
        <p><strong>Total Attacks:</strong> {stats.total}</p>
        <p><strong>Total Deaths:</strong> {stats.totalDeaths}</p>
        <p><strong>Countries Affected:</strong> {stats.countries}</p>
        <p style={{ marginTop: '15px', fontSize: '12px', opacity: 0.8 }}>
          Use your mouse to rotate the globe
        </p>
      </div>

      <div className="legend">
        <div className="legend-title">Height = Deaths | Color = Date</div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'rgb(139, 69, 19)' }}></div>
          <span>Older Attacks</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'rgb(255, 69, 0)' }}></div>
          <span>Newer Attacks</span>
        </div>
      </div>

      <Canvas className="canvas-container" camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Globe />
          <AttackPoints data={attackData} />
          <OrbitControls 
            enableDamping
            dampingFactor={0.05}
            enablePan={true}
            enableZoom={true}
            autoRotate={true}
            autoRotateSpeed={1}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
