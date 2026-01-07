import { MockMark, MockMarkProvider } from 'mockmark'
import './App.css'

// Sample mock data for demonstration
const mockAdvisors = [
  { id: 1, name: 'Sarah Chen', specialty: 'Tarot', rating: 4.9 },
  { id: 2, name: 'Marcus Webb', specialty: 'Astrology', rating: 4.7 },
  { id: 3, name: 'Luna Star', specialty: 'Psychic', rating: 4.8 },
]

const mockStats = {
  totalUsers: 12450,
  activeNow: 342,
  revenue: '$45,230',
}

function App() {
  return (
    <MockMarkProvider tooltipTrigger="hover">
      <div className="app">
        <header className="header">
          <h1>MockMark Demo</h1>
          <p>Development-only visual indicators for mock data</p>
        </header>

        <main className="main">
          {/* Border Variant (Default) */}
          <section className="section">
            <h2>Border Variant <span className="variant-tag">default</span></h2>
            <p className="description">Wraps content with a dashed border and floating label.</p>

            <MockMark label="Advisors" reason="Hardcoded mock data - not connected to API">
              <div className="card-grid">
                {mockAdvisors.map(advisor => (
                  <div key={advisor.id} className="card">
                    <h3>{advisor.name}</h3>
                    <p>{advisor.specialty}</p>
                    <div className="rating">★ {advisor.rating}</div>
                  </div>
                ))}
              </div>
            </MockMark>
          </section>

          {/* Badge Variant */}
          <section className="section">
            <h2>Badge Variant</h2>
            <p className="description">Just the label badge, positioned absolutely.</p>

            <MockMark variant="badge" label="Stats" reason="Static placeholder values">
              <div className="stats-panel">
                <div className="stat">
                  <span className="stat-value">{mockStats.totalUsers.toLocaleString()}</span>
                  <span className="stat-label">Total Users</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{mockStats.activeNow}</span>
                  <span className="stat-label">Active Now</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{mockStats.revenue}</span>
                  <span className="stat-label">Revenue</span>
                </div>
              </div>
            </MockMark>
          </section>

          {/* Minimal Variant */}
          <section className="section">
            <h2>Minimal Variant</h2>
            <p className="description">Thin outline with corner label - less intrusive.</p>

            <MockMark variant="minimal" label="Chart" description="Placeholder chart data">
              <div className="chart-placeholder">
                <div className="chart-bar" style={{ height: '60%' }} />
                <div className="chart-bar" style={{ height: '80%' }} />
                <div className="chart-bar" style={{ height: '45%' }} />
                <div className="chart-bar" style={{ height: '90%' }} />
                <div className="chart-bar" style={{ height: '70%' }} />
              </div>
            </MockMark>
          </section>

          {/* Click Trigger Example */}
          <section className="section">
            <h2>Click Trigger Mode</h2>
            <p className="description">Use tooltipTrigger="click" on the provider. Click the label to toggle tooltip.</p>

            <MockMarkProvider tooltipTrigger="click">
              <MockMark label="Clickable" reason="Click the label to see this tooltip! Click mode allows clicking through to content.">
                <div className="card">
                  <h3>Click-to-Reveal Tooltip</h3>
                  <p>The tooltip only appears when the label is clicked.</p>
                </div>
              </MockMark>
            </MockMarkProvider>
          </section>

          {/* Disabled Example */}
          <section className="section">
            <h2>Disabled Indicator</h2>
            <p className="description">Use the disabled prop to hide indicators for specific instances.</p>

            <MockMark disabled label="Hidden" reason="This won't show">
              <div className="card">
                <h3>Real Data Component</h3>
                <p>This component uses real data, so the indicator is disabled.</p>
              </div>
            </MockMark>
          </section>

          {/* Nested Example */}
          <section className="section">
            <h2>Nested Indicators</h2>
            <p className="description">MockMark works correctly when nested.</p>

            <MockMark label="Outer" reason="Outer container mock">
              <div className="nested-container">
                <p>Outer mock container</p>
                <MockMark variant="minimal" label="Inner" reason="Inner component mock">
                  <div className="card">
                    <h3>Nested Content</h3>
                    <p>This has its own indicator.</p>
                  </div>
                </MockMark>
              </div>
            </MockMark>
          </section>
        </main>

        <footer className="footer">
          <p>Hover or click labels to see detailed mock reasons</p>
        </footer>
      </div>
    </MockMarkProvider>
  )
}

export default App

