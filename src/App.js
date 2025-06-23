import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
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
} from 'recharts';
import { areaData, barData, scrollData, todayIndex } from './mockData'; // Importing mock data

function CustomAxisTick({ x, y, payload }, activeLabel) {
  const isActive = payload.value === activeLabel;
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
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeLabel, setActiveLabel] = useState('');

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Balance Summary</Card.Title>
              <AreaChart
                width={1100}
                height={400}
                data={areaData}
                onMouseMove={(e) => {
                  if (e && e.activeLabel && e.activeTooltipIndex) {
                    setActiveIndex(e.activeTooltipIndex);
                    setActiveLabel(e.activeLabel);
                  }
                }}
                onMouseLeave={() => {
                  setActiveIndex(-1);
                  setActiveLabel('');
                }}
              >
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={(props) => CustomAxisTick(props, activeLabel)}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                />
                <YAxis />
                <Tooltip
                  cursor={{ stroke: '#2ecc71', strokeWidth: 3 }}
                  active={activeIndex != null}
                />
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
            <Card.Body>
              <Card.Title>Transaction Summary</Card.Title>
              <BarChart
                width={1100}
                height={400}
                data={barData}
                onMouseMove={(e) => {
                  if (e && e.activeLabel && e.activeTooltipIndex) {
                    setActiveIndex(e.activeTooltipIndex);
                    setActiveLabel(e.activeLabel);
                  }
                }}
                onMouseLeave={() => {
                  setActiveIndex(-1);
                  setActiveLabel('');
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={(props) => CustomAxisTick(props, activeLabel)}
                />
                <YAxis />
                <Tooltip active={activeIndex >= 0} />
                <Legend />
                <Bar
                  dataKey="total_cash_in"
                  fill="#a8dcc7"
                  activeBar={{ fill: '#3eb88c' }}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="total_cash_out"
                  fill="#a5c0db"
                  activeBar={{ fill: '#397eb8' }}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Automated forecast</Card.Title>
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
                    data={scrollData}
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
                    data={scrollData}
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
                      padding={{ left: 30, right: 30 }}
                    />
                    <Tooltip cursor={{ stroke: '#2ecc71', strokeWidth: 3 }} />
                    <ReferenceLine
                      x={scrollData[todayIndex].day}
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
                      activeDot={false}
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
  );
}

export default App;
