import React, { useState } from 'react'
import { Button, Container, Row, Col, Card, Navbar } from 'react-bootstrap'
import {
  AreaChart,
  Area,
  ReferenceLine,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { areaData, barData, scrollData, todayIndex } from './mockData' // Importing mock data

// when hovering over the chart, highlight the active label by making it bold.
function CustomAxisTick({ x, y, payload }, activeLabel) {
  const isActive = payload.value === activeLabel
  return (
    <text
      x={x}
      y={y + 10}
      textAnchor="middle"
      fontSize={12}
      fontWeight={isActive ? 'bold' : 'normal'}
    >
      {payload.value}
    </text>
  )
}

function App() {
  const [activeLabel, setActiveLabel] = useState('')
  const [areaDataState, setAreaDataState] = useState(areaData())
  const [barDataState, setBarDataState] = useState(barData())
  const [scrollDataState, setScrollDataState] = useState(scrollData())

  return (
    <>
      <Container className="my-4 pb-4">
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <span>Balance Summary</span>
                <Button
                  onClick={() => {
                    setAreaDataState(areaData())
                  }}
                >
                  Regenerate data
                </Button>
              </Card.Header>
              <Card.Body>
                <AreaChart
                  width={1100}
                  height={400}
                  data={areaDataState}
                  syncId="crossHighlight"
                  onMouseMove={(e) => {
                    if (e && e.activeLabel && e.activeTooltipIndex) {
                      setActiveLabel(e.activeLabel)
                    }
                  }}
                  onMouseLeave={() => {
                    setActiveLabel('')
                  }}
                >
                  <defs>
                    <linearGradient
                      id="colorBalance"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={(props) => CustomAxisTick(props, activeLabel)}
                    height={70}
                    padding={{ right: 30 }}
                  />
                  <YAxis />
                  <Tooltip cursor={{ stroke: '#2ecc71', strokeWidth: 3 }} />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#2ecc71" // a brighter green
                    strokeWidth={3} // thicker line
                    fillOpacity={1}
                    fill="url(#colorBalance)"
                    activeDot={{
                      r: 8,
                      stroke: '#2ecc71',
                      strokeWidth: 3,
                      fill: '#2ecc71',
                    }} // big green active dot
                  />
                </AreaChart>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <span>Transaction Summary</span>
                <Button
                  onClick={() => {
                    setBarDataState(barData())
                  }}
                >
                  Regenerate data
                </Button>
              </Card.Header>
              <Card.Body>
                <BarChart
                  width={1100}
                  height={400}
                  data={barDataState}
                  syncId="crossHighlight"
                  onMouseMove={(e) => {
                    if (e && e.activeLabel && e.activeTooltipIndex) {
                      setActiveLabel(e.activeLabel)
                    }
                  }}
                  onMouseLeave={() => {
                    setActiveLabel('')
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={(props) => CustomAxisTick(props, activeLabel)}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="total_cash_in"
                    name="Total cash in"
                    fill="#3eb88c"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="total_cash_out"
                    name="Total cash out"
                    fill="#397eb8"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <span>Automated forecast</span>
                <Button
                  onClick={() => {
                    setScrollDataState(scrollData())
                  }}
                >
                  Regenerate data
                </Button>
              </Card.Header>
              <Card.Body>
                <div style={{ display: 'flex', position: 'relative' }}>
                  {/* Fixed Y-axis */}
                  <div
                    style={{
                      width: '80px',
                    }}
                  >
                    <AreaChart
                      width={80}
                      height={400}
                      data={scrollDataState}
                      margin={{ left: 0 }}
                    >
                      <YAxis width={80} />
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="transparent" // Explicitly transparent
                        fill="transparent" // Explicitly transparent
                        strokeWidth={0} // No stroke
                        activeDot={null}
                      />
                    </AreaChart>
                  </div>
                  {/* Scrollable big chart */}
                  <div style={{ overflowX: 'auto' }}>
                    <AreaChart
                      width={2000} // Big chart
                      height={400}
                      data={scrollDataState}
                      margin={{ left: 0 }}
                    >
                      <defs>
                        {/* Gradient for actual data */}
                        <linearGradient
                          id="colorBalance"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#82ca9d"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#82ca9d"
                            stopOpacity={0}
                          />
                        </linearGradient>

                        {/* Gradient for forecast range */}
                        <linearGradient
                          id="forecastRange"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8884d8"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8884d8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="day"
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                        padding={{ left: 28, right: 30 }}
                      />
                      <Tooltip cursor={{ stroke: '#2ecc71', strokeWidth: 3 }} />
                      <ReferenceLine
                        x={scrollDataState[todayIndex]?.day}
                        stroke="#2ecc71"
                        strokeWidth={2}
                        label="Today"
                      />
                      {/* Actual data (before today) */}
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#2ecc71"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorBalance)"
                        activeDot={{
                          r: 8,
                          stroke: '#2ecc71',
                          strokeWidth: 3,
                          fill: '#2ecc71',
                        }}
                      />

                      {/* Forecast lines (after today) */}
                      {/* High line (dashed) */}
                      <Area
                        type="monotone"
                        dataKey="forecastHigh"
                        stroke="#2ecc71"
                        strokeWidth={2}
                        fill="url(#colorBalance)"
                        connectNulls
                        strokeDasharray="3 3"
                        activeDot={false}
                      />

                      {/* Middle line (solid) */}
                      <Area
                        type="monotone"
                        dataKey="forecastMid"
                        stroke="#2ecc71"
                        strokeWidth={2}
                        fill="transparent"
                        connectNulls
                        activeDot={{
                          r: 8,
                          stroke: '#2ecc71',
                          strokeWidth: 3,
                          fill: '#2ecc71',
                        }}
                      />

                      {/* Low line (dotted) */}
                      <Area
                        type="monotone"
                        dataKey="forecastLow"
                        stroke="#2ecc71"
                        strokeWidth={2}
                        fill="#fff"
                        connectNulls
                        strokeDasharray="3 3"
                        activeDot={false}
                      />
                    </AreaChart>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Navbar
        bg="dark"
        variant="dark"
        className="justify-content-center"
        fixed="bottom"
      >
        <Navbar.Text
          className="text-center w-100"
          style={{ color: '#b0b0b0', fontSize: 14 }}
        >
          Build by your friendly neighbourhood Steven Zhang.
        </Navbar.Text>
      </Navbar>
    </>
  )
}

export default App
