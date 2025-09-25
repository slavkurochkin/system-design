import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts'
import { ArrowUp, ArrowRight, Server, Globe, Zap, Clock, TrendingUp, Activity, Shield, AlertTriangle, CheckCircle, XCircle, Wifi, Database, CloudDrizzle, Play, Pause, Layers, HardDriveIcon, Trash2, Timer, BarChart3, RefreshCw, Network, MessageSquare, Search, BarChart4, Gauge, Code2, Monitor, Hash } from 'lucide-react'
import { Slider } from './ui/slider'
import { Switch } from './ui/switch'
import { motion } from 'motion/react'
import { GlobalWarning } from './GlobalWarning'

export function ScalabilityPerformance() {
  const [activeTab, setActiveTab] = useState('overview')
  const [loadBalancerType, setLoadBalancerType] = useState('round-robin')
  const [serverCount, setServerCount] = useState([3])
  const [isSimulating, setIsSimulating] = useState(false)
  const [animationCounter, setAnimationCounter] = useState(0)
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true)
  const [currentRPS, setCurrentRPS] = useState(100)
  const [cacheEvictionPolicy, setCacheEvictionPolicy] = useState('lru')
  const [cacheSize, setCacheSize] = useState([8])
  const [coherenceProtocol, setCoherenceProtocol] = useState('write-through')
  const [cdnRegion, setCdnRegion] = useState('us-east')
  const [scalingType, setScalingType] = useState('horizontal')

  // Only run animation when simulating
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isSimulating) {
      interval = setInterval(() => {
        setAnimationCounter(prev => prev + 1)
      }, 2000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isSimulating])

  // Overview Content
  const OverviewContent = () => (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
        <h2 className="mb-4">Scalability & Performance Overview</h2>
        <p className="text-muted-foreground mb-4">
          Learn how to design systems that can handle growing user bases and increasing data volumes 
          while maintaining optimal performance. This section covers essential patterns and techniques 
          used by major tech companies to scale their applications.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Load Balancing</span>
            </div>
            <p className="text-sm text-muted-foreground">Distribute traffic across multiple servers efficiently</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-5 h-5 text-green-500" />
              <span className="font-medium">Caching</span>
            </div>
            <p className="text-sm text-muted-foreground">Store frequently accessed data for faster retrieval</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-purple-500" />
              <span className="font-medium">CDNs</span>
            </div>
            <p className="text-sm text-muted-foreground">Serve content from locations closer to users</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              <span className="font-medium">Auto Scaling</span>
            </div>
            <p className="text-sm text-muted-foreground">Automatically adjust resources based on demand</p>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Why Scalability Matters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">User Growth</p>
                  <p className="text-sm text-muted-foreground">Handle increasing user bases without degrading performance</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Data Volume</p>
                  <p className="text-sm text-muted-foreground">Manage growing amounts of data efficiently</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Geographic Distribution</p>
                  <p className="text-sm text-muted-foreground">Serve users across different regions with low latency</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Cost Optimization</p>
                  <p className="text-sm text-muted-foreground">Optimize resource usage and reduce operational costs</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Latency</span>
                  <Badge variant="outline">Response Time</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">Time taken to process a request</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Throughput</span>
                  <Badge variant="outline">Requests/sec</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">Number of requests processed per unit time</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Availability</span>
                  <Badge variant="outline">Uptime %</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '99%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">System uptime and reliability</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Load Balancing Content
  const LoadBalancingContent = () => {
    const algorithms = [
      {
        name: 'Round Robin',
        description: 'Distributes requests sequentially across servers',
        whatFor: 'Even distribution of load when all servers have equal capacity',
        howImplemented: 'Simple counter that cycles through server list',
        complexity: 'O(1)',
        pros: ['Simple to implement', 'Even distribution', 'No server state required'],
        cons: ['Ignores server health', 'No capacity consideration', 'Can overload slower servers'],
        useCase: 'Homogeneous servers with similar processing power',
        code: `class RoundRobinBalancer {
  constructor(servers) {
    this.servers = servers;
    this.current = 0;
  }
  
  getServer() {
    const server = this.servers[this.current];
    this.current = (this.current + 1) % this.servers.length;
    return server;
  }
}`
      },
      {
        name: 'Weighted Round Robin',
        description: 'Assigns requests based on server weights/capacity',
        whatFor: 'Heterogeneous servers with different processing capabilities',
        howImplemented: 'Each server gets a weight, requests distributed proportionally',
        complexity: 'O(1)',
        pros: ['Capacity-aware', 'Flexible weight assignment', 'Better resource utilization'],
        cons: ['Manual weight management', 'Static weights', 'Complex configuration'],
        useCase: 'Mixed server configurations with different specs',
        code: `class WeightedRoundRobinBalancer {
  constructor(servers) {
    this.servers = servers; // [{server, weight}]
    this.currentWeights = servers.map(s => s.weight);
  }
  
  getServer() {
    const totalWeight = this.currentWeights.reduce((a, b) => a + b);
    const maxIndex = this.currentWeights.indexOf(Math.max(...this.currentWeights));
    
    this.currentWeights[maxIndex] -= totalWeight;
    return this.servers[maxIndex].server;
  }
}`
      },
      {
        name: 'Least Connections',
        description: 'Routes to server with fewest active connections',
        whatFor: 'Long-lived connections or varying request processing times',
        howImplemented: 'Track active connections per server, route to least loaded',
        complexity: 'O(n)',
        pros: ['Dynamic load awareness', 'Good for persistent connections', 'Adapts to server performance'],
        cons: ['Higher overhead', 'Requires connection tracking', 'More complex implementation'],
        useCase: 'WebSocket connections, database proxies, long-running requests',
        code: `class LeastConnectionsBalancer {
  constructor(servers) {
    this.servers = servers.map(s => ({server: s, connections: 0}));
  }
  
  getServer() {
    const leastLoaded = this.servers.reduce((min, current) => 
      current.connections < min.connections ? current : min
    );
    
    leastLoaded.connections++;
    return leastLoaded.server;
  }
  
  releaseConnection(server) {
    const serverEntry = this.servers.find(s => s.server === server);
    if (serverEntry) serverEntry.connections--;
  }
}`
      },
      {
        name: 'IP Hash',
        description: 'Uses client IP hash to determine server',
        whatFor: 'Session persistence without sticky sessions',
        howImplemented: 'Hash client IP, use modulo to select server',
        complexity: 'O(1)',
        pros: ['Session persistence', 'No session storage needed', 'Consistent routing'],
        cons: ['Uneven distribution', 'No failover handling', 'IP changes break sessions'],
        useCase: 'Applications requiring session affinity',
        code: `class IPHashBalancer {
  constructor(servers) {
    this.servers = servers;
  }
  
  getServer(clientIP) {
    const hash = this.hashIP(clientIP);
    const index = hash % this.servers.length;
    return this.servers[index];
  }
  
  hashIP(ip) {
    let hash = 0;
    for (let i = 0; i < ip.length; i++) {
      hash = ((hash << 5) - hash + ip.charCodeAt(i)) & 0xffffffff;
    }
    return Math.abs(hash);
  }
}`
      },
      {
        name: 'Least Response Time',
        description: 'Routes to server with fastest average response time',
        whatFor: 'Performance-critical applications requiring optimal response times',
        howImplemented: 'Monitor response times, route to fastest responding server',
        complexity: 'O(n)',
        pros: ['Performance optimized', 'Adapts to server load', 'Accounts for server health'],
        cons: ['Complex monitoring', 'Higher computational cost', 'Requires time tracking'],
        useCase: 'Real-time applications, API gateways, time-sensitive services',
        code: `class LeastResponseTimeBalancer {
  constructor(servers) {
    this.servers = servers.map(s => ({
      server: s, 
      avgResponseTime: 0,
      totalTime: 0,
      requestCount: 0
    }));
  }
  
  getServer() {
    return this.servers.reduce((fastest, current) => 
      current.avgResponseTime < fastest.avgResponseTime ? current : fastest
    ).server;
  }
  
  recordResponse(server, responseTime) {
    const serverEntry = this.servers.find(s => s.server === server);
    if (serverEntry) {
      serverEntry.totalTime += responseTime;
      serverEntry.requestCount++;
      serverEntry.avgResponseTime = serverEntry.totalTime / serverEntry.requestCount;
    }
  }
}`
      }
    ]

    const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0])

    return (
      <div className="space-y-6">
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <h3 className="mb-2">What is Load Balancing?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Load balancing distributes incoming network traffic across multiple servers to ensure no single server becomes overwhelmed. 
            It's essential for achieving high availability, reliability, and optimal performance in distributed systems.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm">High Availability</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">Better Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Scalability</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Load Balancing Algorithms</CardTitle>
              <CardDescription>Choose an algorithm to see implementation details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {algorithms.map((algorithm, index) => (
                  <Button
                    key={index}
                    variant={selectedAlgorithm.name === algorithm.name ? 'default' : 'outline'}
                    onClick={() => setSelectedAlgorithm(algorithm)}
                    className="w-full justify-start text-left h-auto p-3"
                  >
                    <div>
                      <div className="font-medium">{algorithm.name}</div>
                      <div className="text-xs text-muted-foreground">{algorithm.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{selectedAlgorithm.name}</CardTitle>
              <CardDescription>{selectedAlgorithm.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">What it's for:</h5>
                <p className="text-sm text-muted-foreground">{selectedAlgorithm.whatFor}</p>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">How it's implemented:</h5>
                <p className="text-sm text-muted-foreground mb-2">{selectedAlgorithm.howImplemented}</p>
                <Badge variant="outline">Complexity: {selectedAlgorithm.complexity}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h6 className="text-sm font-medium text-green-600 mb-2">Pros:</h6>
                  <ul className="text-xs space-y-1">
                    {selectedAlgorithm.pros.map((pro, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h6 className="text-sm font-medium text-red-600 mb-2">Cons:</h6>
                  <ul className="text-xs space-y-1">
                    {selectedAlgorithm.cons.map((con, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <XCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h6 className="text-sm font-medium mb-2">Best Use Case:</h6>
                <p className="text-xs text-muted-foreground">{selectedAlgorithm.useCase}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Implementation Example: {selectedAlgorithm.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100">
                <code>{selectedAlgorithm.code}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <LoadBalancerVisualization />
      </div>
    )
  }

  const LoadBalancerVisualization = () => {
    const servers = Array.from({ length: serverCount[0] }, (_, i) => ({ 
      id: i + 1, 
      load: Math.floor(Math.random() * 80) + 20,
      connections: Math.floor(Math.random() * 50) + 10,
      responseTime: Math.floor(Math.random() * 100) + 50,
      isActive: Math.random() > 0.1
    }))
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>Interactive Load Balancer</CardTitle>
          <CardDescription>See how different algorithms distribute traffic</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="space-y-2">
                <label className="text-sm font-medium">Algorithm:</label>
                <select 
                  value={loadBalancerType} 
                  onChange={(e) => setLoadBalancerType(e.target.value)}
                  className="px-3 py-1 border rounded text-sm"
                >
                  <option value="round-robin">Round Robin</option>
                  <option value="weighted">Weighted</option>
                  <option value="least-connections">Least Connections</option>
                  <option value="ip-hash">IP Hash</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Servers: {serverCount[0]}</label>
                <Slider
                  value={serverCount}
                  onValueChange={setServerCount}
                  max={8}
                  min={2}
                  step={1}
                  className="w-32"
                />
              </div>

              <Button
                onClick={() => setIsSimulating(!isSimulating)}
                variant={isSimulating ? 'destructive' : 'default'}
                size="sm"
              >
                {isSimulating ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                {isSimulating ? 'Stop' : 'Start'} Simulation
              </Button>
            </div>

            <div className="flex justify-center">
              <div className="space-y-8">
                {/* Client */}
                <div className="flex justify-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm">Clients</span>
                    <Badge variant="outline">1000 req/s</Badge>
                  </div>
                </div>

                {/* Load Balancer */}
                <div className="flex justify-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-16 h-12 bg-purple-500 rounded-lg flex items-center justify-center border-2 ${
                      loadBalancerType === 'round-robin' ? 'border-green-500' : 
                      loadBalancerType === 'weighted' ? 'border-yellow-500' :
                      loadBalancerType === 'least-connections' ? 'border-blue-500' : 'border-red-500'
                    }`}>
                      <Activity className="w-6 h-6 text-white" />
                      {isSimulating && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <span className="text-sm">Load Balancer</span>
                    <Badge variant="outline" className="capitalize">{loadBalancerType.replace('-', ' ')}</Badge>
                  </div>
                </div>

                {/* Servers */}
                <div className="flex justify-center space-x-4">
                  {servers.map((server, i) => (
                    <motion.div 
                      key={i} 
                      className="flex flex-col items-center space-y-2"
                      animate={isSimulating ? { y: [0, -2, 0] } : {}}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center relative ${
                        server.isActive ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        <Server className="w-6 h-6 text-white" />
                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                          !server.isActive ? 'bg-red-500 text-white' :
                          server.load > 60 ? 'bg-red-500 text-white' : 
                          server.load > 40 ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'
                        }`}>
                          {server.isActive ? server.load : '!'}
                        </div>
                      </div>
                      <span className="text-xs">Server {server.id}</span>
                      <div className="text-center space-y-1">
                        <div className="text-xs text-muted-foreground">
                          {server.isActive ? `Load: ${server.load}%` : 'Offline'}
                        </div>
                        {server.isActive && loadBalancerType === 'least-connections' && (
                          <div className="text-xs text-blue-600">
                            Connections: {server.connections}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Caching Content
  const CachingContent = () => {
    const cacheTypes = [
      {
        name: 'Browser Cache',
        description: 'Stored locally in user\'s browser',
        whatFor: 'Static assets like CSS, JS, images to reduce load times',
        howImplemented: 'HTTP headers (Cache-Control, ETag, Last-Modified)',
        location: 'Client-side',
        scope: 'Single user',
        examples: ['Static files', 'API responses', 'Images', 'Stylesheets']
      },
      {
        name: 'CDN Cache',
        description: 'Distributed globally across edge servers',
        whatFor: 'Serve content from locations closest to users',
        howImplemented: 'Geographic distribution with origin pull/push',
        location: 'Edge locations',
        scope: 'Global',
        examples: ['Static content', 'Video streams', 'Downloads', 'Web assets']
      },
      {
        name: 'Application Cache',
        description: 'In-memory cache within application',
        whatFor: 'Frequently accessed data and expensive computations',
        howImplemented: 'In-memory data structures (Redis, Memcached)',
        location: 'Application server',
        scope: 'Application instance',
        examples: ['Database queries', 'Session data', 'Computed results', 'User preferences']
      },
      {
        name: 'Database Cache',
        description: 'Query result caching at database level',
        whatFor: 'Expensive queries and frequently accessed data',
        howImplemented: 'Query result sets stored in memory',
        location: 'Database server',
        scope: 'Database instance',
        examples: ['Query results', 'Index data', 'Metadata', 'Statistics']
      }
    ]

    return (
      <div className="space-y-6">
        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
          <h3 className="mb-2">What is Caching?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Caching stores frequently accessed data in fast storage to reduce latency and system load. 
            It's one of the most effective ways to improve application performance and user experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Faster Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-green-500" />
              <span className="text-sm">Reduced DB Load</span>
            </div>
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-purple-500" />
              <span className="text-sm">Lower Bandwidth</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-orange-500" />
              <span className="text-sm">Better Performance</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cacheTypes.map((cacheType, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  {cacheType.name}
                </CardTitle>
                <CardDescription>{cacheType.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2">What it's for:</h5>
                  <p className="text-sm text-muted-foreground">{cacheType.whatFor}</p>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">How it's implemented:</h5>
                  <p className="text-sm text-muted-foreground">{cacheType.howImplemented}</p>
                </div>

                <div className="flex gap-4">
                  <div>
                    <Badge variant="outline">Location: {cacheType.location}</Badge>
                  </div>
                  <div>
                    <Badge variant="secondary">Scope: {cacheType.scope}</Badge>
                  </div>
                </div>

                <div>
                  <h6 className="text-sm font-medium mb-2">Common Examples:</h6>
                  <div className="flex flex-wrap gap-1">
                    {cacheType.examples.map((example, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <CacheEvictionVisualization />
        <CacheCoherenceVisualization />
      </div>
    )
  }

  const CacheEvictionVisualization = () => {
    const cacheItems = Array.from({ length: cacheSize[0] }, (_, i) => ({
      id: i,
      key: String.fromCharCode(65 + i),
      lastAccessed: Date.now() - Math.random() * 10000,
      accessCount: Math.floor(Math.random() * 50) + 1,
      ttl: Math.floor(Math.random() * 300) + 60,
      created: Date.now() - Math.random() * 30000,
    })).sort((a, b) => {
      switch (cacheEvictionPolicy) {
        case 'lru': return b.lastAccessed - a.lastAccessed
        case 'lfu': return b.accessCount - a.accessCount
        case 'fifo': return a.created - b.created
        case 'ttl': return a.ttl - b.ttl
        default: return 0
      }
    })

    const evictionPolicies = [
      { 
        id: 'lru', 
        name: 'Least Recently Used (LRU)', 
        description: 'Evicts items that haven\'t been accessed recently',
        icon: Clock,
        complexity: 'O(1)',
        implementation: 'Doubly linked list + Hash map',
        bestFor: 'Temporal locality patterns'
      },
      { 
        id: 'lfu', 
        name: 'Least Frequently Used (LFU)', 
        description: 'Evicts items with the lowest access frequency',
        icon: BarChart3,
        complexity: 'O(log n)',
        implementation: 'Min heap + Hash map',
        bestFor: 'Frequency-based access patterns'
      },
      { 
        id: 'fifo', 
        name: 'First In, First Out (FIFO)', 
        description: 'Evicts the oldest items first',
        icon: ArrowRight,
        complexity: 'O(1)',
        implementation: 'Queue data structure',
        bestFor: 'Sequential access patterns'
      },
      { 
        id: 'ttl', 
        name: 'Time To Live (TTL)', 
        description: 'Evicts items based on expiration time',
        icon: Timer,
        complexity: 'O(1)',
        implementation: 'Priority queue or timer-based',
        bestFor: 'Time-sensitive data'
      }
    ]

    const currentPolicy = evictionPolicies.find(p => p.id === cacheEvictionPolicy)

    return (
      <Card>
        <CardHeader>
          <CardTitle>Cache Eviction Policies</CardTitle>
          <CardDescription>Understanding when and how cached data is removed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Cache Size: {cacheSize[0]} items</label>
                <Slider
                  value={cacheSize}
                  onValueChange={setCacheSize}
                  max={12}
                  min={4}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Eviction Policy:</label>
                <div className="grid grid-cols-2 gap-2">
                  {evictionPolicies.map((policy) => (
                    <Button
                      key={policy.id}
                      variant={cacheEvictionPolicy === policy.id ? 'default' : 'outline'}
                      onClick={() => setCacheEvictionPolicy(policy.id)}
                      size="sm"
                      className="text-xs justify-start"
                    >
                      <policy.icon className="w-3 h-3 mr-1" />
                      {policy.id.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-muted rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <currentPolicy.icon className="w-4 h-4" />
                  <span className="font-medium">{currentPolicy.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{currentPolicy.description}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Complexity:</span>
                    <Badge variant="outline">{currentPolicy.complexity}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Implementation:</span>
                    <span className="text-muted-foreground">{currentPolicy.implementation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best for:</span>
                    <span className="text-muted-foreground">{currentPolicy.bestFor}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-medium">Cache Contents</h5>
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900 max-h-80 overflow-y-auto">
                <div className="grid gap-2">
                  {cacheItems.slice(0, cacheSize[0]).map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-2 rounded border flex items-center justify-between ${
                        index === cacheItems.length - 1 ? 'bg-red-100 dark:bg-red-900 border-red-300' : 
                        index < 2 ? 'bg-yellow-100 dark:bg-yellow-900 border-yellow-300' :
                        'bg-green-100 dark:bg-green-900 border-green-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                          {item.key}
                        </div>
                        <div className="text-xs">
                          <div className="font-medium">{item.key}</div>
                          <div className="text-muted-foreground">
                            {cacheEvictionPolicy === 'lru' && `Last: ${Math.floor((Date.now() - item.lastAccessed) / 1000)}s ago`}
                            {cacheEvictionPolicy === 'lfu' && `Count: ${item.accessCount}`}
                            {cacheEvictionPolicy === 'fifo' && `Age: ${Math.floor((Date.now() - item.created) / 1000)}s`}
                            {cacheEvictionPolicy === 'ttl' && `TTL: ${item.ttl}s`}
                          </div>
                        </div>
                      </div>
                      {index === cacheItems.length - 1 && (
                        <div className="flex items-center gap-1 text-red-600">
                          <Trash2 className="w-3 h-3" />
                          <span className="text-xs">Next to evict</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const CacheCoherenceVisualization = () => {
    const coherenceProtocols = [
      {
        id: 'write-through',
        name: 'Write-Through',
        description: 'Writes go to cache and database simultaneously',
        consistency: 'Strong',
        performance: 'Slower writes, fast reads',
        complexity: 'Low',
        implementation: 'Synchronous write to both cache and DB',
        useCase: 'Applications requiring strong consistency'
      },
      {
        id: 'write-back',
        name: 'Write-Back (Write-Behind)',
        description: 'Writes go to cache first, database updated later',
        consistency: 'Eventual',
        performance: 'Fast writes, fast reads',
        complexity: 'Medium',
        implementation: 'Asynchronous batch writes to DB',
        useCase: 'High-write applications with eventual consistency'
      },
      {
        id: 'write-around',
        name: 'Write-Around',
        description: 'Writes bypass cache and go directly to database',
        consistency: 'Strong',
        performance: 'Normal writes, slower first reads',
        complexity: 'Low',
        implementation: 'Direct DB writes, cache on read miss',
        useCase: 'Write-heavy workloads with infrequent re-reads'
      }
    ]

    const currentProtocol = coherenceProtocols.find(p => p.id === coherenceProtocol)

    return (
      <Card>
        <CardHeader>
          <CardTitle>Cache Coherence Strategies</CardTitle>
          <CardDescription>How to keep cache and database synchronized</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Write Strategy:</label>
                <div className="space-y-2">
                  {coherenceProtocols.map((protocol) => (
                    <Button
                      key={protocol.id}
                      variant={coherenceProtocol === protocol.id ? 'default' : 'outline'}
                      onClick={() => setCoherenceProtocol(protocol.id)}
                      size="sm"
                      className="w-full justify-start text-xs"
                    >
                      {protocol.name}
                    </Button>
                  ))}
                </div>
              </div>

              {currentProtocol && (
                <div className="p-3 bg-muted rounded-lg space-y-3">
                  <h5 className="font-medium">{currentProtocol.name}</h5>
                  <p className="text-sm text-muted-foreground">{currentProtocol.description}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Consistency:</span>
                      <Badge variant={currentProtocol.consistency === 'Strong' ? 'default' : 'secondary'}>
                        {currentProtocol.consistency}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Performance:</span>
                      <span className="text-muted-foreground">{currentProtocol.performance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Complexity:</span>
                      <Badge variant="outline">{currentProtocol.complexity}</Badge>
                    </div>
                    <div>
                      <span>Implementation:</span>
                      <p className="text-muted-foreground mt-1">{currentProtocol.implementation}</p>
                    </div>
                    <div>
                      <span>Best Use Case:</span>
                      <p className="text-muted-foreground mt-1">{currentProtocol.useCase}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h5 className="font-medium">Write Flow Visualization</h5>
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <div className="flex justify-center">
                  <div className="space-y-6">
                    {/* Application */}
                    <div className="flex justify-center">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Globe className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm">Application</span>
                      </div>
                    </div>

                    {/* Write flow arrows */}
                    <div className="flex justify-center space-x-12">
                      <div className="flex flex-col items-center">
                        <div className={`w-0.5 h-8 ${
                          coherenceProtocol === 'write-around' ? 'bg-gray-300' : 'bg-purple-500'
                        }`}></div>
                        <span className="text-xs">
                          {coherenceProtocol === 'write-around' ? 'Read only' : 'Write'}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-8 bg-purple-500"></div>
                        <span className="text-xs">Write</span>
                      </div>
                    </div>

                    {/* Cache and Database */}
                    <div className="flex justify-center space-x-12">
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`w-16 h-12 rounded-lg flex items-center justify-center ${
                          coherenceProtocol === 'write-around' ? 'bg-gray-400' : 'bg-green-500'
                        }`}>
                          <Layers className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm">Cache</span>
                        <Badge variant={coherenceProtocol === 'write-around' ? 'secondary' : 'default'} className="text-xs">
                          {coherenceProtocol === 'write-around' ? 'Bypassed' : 'Active'}
                        </Badge>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-16 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                          <Database className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm">Database</span>
                        <Badge variant="default" className="text-xs">Primary</Badge>
                      </div>
                    </div>

                    {/* Sync indicator for write-back */}
                    {coherenceProtocol === 'write-back' && (
                      <div className="flex justify-center">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <RefreshCw className="w-3 h-3" />
                          <span>Async sync to database</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // CDN Content
  const CDNContent = () => (
    <div className="space-y-6">
      <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
        <h3 className="mb-2">What is a CDN (Content Delivery Network)?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          A CDN is a geographically distributed network of servers that deliver web content and services to users 
          based on their location. It reduces latency, improves load times, and reduces bandwidth costs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-500" />
            <span className="text-sm">Global Reach</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm">Faster Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-sm">DDoS Protection</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            <span className="text-sm">Scalability</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>How CDNs Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{'1'}</div>
                <div>
                  <p className="font-medium">User Request</p>
                  <p className="text-sm text-muted-foreground">User requests content from your website</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{'2'}</div>
                <div>
                  <p className="font-medium">Edge Server Selection</p>
                  <p className="text-sm text-muted-foreground">CDN routes to nearest edge server</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{'3'}</div>
                <div>
                  <p className="font-medium">Cache Check</p>
                  <p className="text-sm text-muted-foreground">Edge server checks if content is cached</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{'4'}</div>
                <div>
                  <p className="font-medium">Content Delivery</p>
                  <p className="text-sm text-muted-foreground">Serve from cache or fetch from origin</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CDN Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">Reduced Latency</p>
                  <p className="text-sm text-muted-foreground">Content served from nearby locations</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">Lower Bandwidth Costs</p>
                  <p className="text-sm text-muted-foreground">Reduced origin server load</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">High Availability</p>
                  <p className="text-sm text-muted-foreground">Redundancy across multiple servers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">DDoS Mitigation</p>
                  <p className="text-sm text-muted-foreground">Traffic filtering and rate limiting</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <CDNVisualization />
    </div>
  )

  const CDNVisualization = () => {
    const regions = [
      { name: 'US East', latency: 20, hit_rate: 85, users: 45 },
      { name: 'US West', latency: 25, hit_rate: 78, users: 38 },
      { name: 'Europe', latency: 35, hit_rate: 82, users: 42 },
      { name: 'Asia', latency: 45, hit_rate: 75, users: 35 },
      { name: 'Australia', latency: 55, hit_rate: 70, users: 28 }
    ]

    return (
      <Card>
        <CardHeader>
          <CardTitle>CDN Performance Dashboard</CardTitle>
          <CardDescription>Monitor CDN performance across different regions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Global Hit Rate</span>
                </div>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">Cache hits across all regions</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">Avg Latency</span>
                </div>
                <div className="text-2xl font-bold">32ms</div>
                <p className="text-xs text-muted-foreground">Average response time</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Total Requests</span>
                </div>
                <div className="text-2xl font-bold">1.2M</div>
                <p className="text-xs text-muted-foreground">Requests per hour</p>
              </Card>
            </div>

            <div>
              <h4 className="mb-4">Regional Performance</h4>
              <div className="space-y-3">
                {regions.map((region, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{region.name}</span>
                      <Badge variant="outline">{region.users}% users</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Latency:</span>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${Math.max(10, 100 - region.latency)}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{region.latency}ms</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Hit Rate:</span>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${region.hit_rate}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{region.hit_rate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Message Queues Content
  const MessageQueuesContent = () => (
    <div className="space-y-6">
      <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
        <h3 className="mb-2">What are Message Queues?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Message queues enable asynchronous communication between services by storing messages in a queue 
          until they can be processed. They help decouple systems and improve reliability and scalability.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span className="text-sm">Async Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-sm">Reliability</span>
          </div>
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-purple-500" />
            <span className="text-sm">Decoupling</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span className="text-sm">Scalability</span>
          </div>
        </div>
      </div>

      <MessageQueueVisualization />
    </div>
  )

  const MessageQueueVisualization = () => {
    const queueData = [
      { name: 'Direct', messages: 0, latency: 5, reliability: 60 },
      { name: 'With Queue', messages: 150, latency: 25, reliability: 95 }
    ]

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Without Message Queue</CardTitle>
            <CardDescription>Direct synchronous communication</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="space-y-4">
                  <div className="flex items-center justify-between w-64">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs mt-1">Producer</span>
                    </div>
                    <ArrowRight className="w-8 h-8 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <Server className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs mt-1">Consumer</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Reliability:</span>
                  <Badge variant="destructive">60%</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Coupling:</span>
                  <Badge variant="destructive">Tight</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Failure Impact:</span>
                  <Badge variant="destructive">High</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>With Message Queue</CardTitle>
            <CardDescription>Asynchronous decoupled communication</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="space-y-4">
                  <div className="flex items-center justify-between w-80">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs mt-1">Producer</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs mt-1">Queue</span>
                      <Badge variant="outline" className="text-xs mt-1">150 msgs</Badge>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <Server className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs mt-1">Consumer</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Reliability:</span>
                  <Badge variant="default">95%</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Coupling:</span>
                  <Badge variant="default">Loose</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Failure Impact:</span>
                  <Badge variant="default">Low</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Auto Scaling Content  
  const AutoScalingContent = () => (
    <div className="space-y-6">
      <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
        <h3 className="mb-2">What is Auto Scaling?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Auto scaling automatically adjusts computing resources based on demand, ensuring optimal performance 
          while minimizing costs. It can scale both horizontally (adding instances) and vertically (increasing resources).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span className="text-sm">Dynamic Scaling</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-green-500" />
            <span className="text-sm">Cost Optimization</span>
          </div>
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-purple-500" />
            <span className="text-sm">Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-500" />
            <span className="text-sm">Reliability</span>
          </div>
        </div>
      </div>

      <AutoScalingVisualization />
    </div>
  )

  const AutoScalingVisualization = () => {
    const scalingData = [
      { time: '00:00', instances: 2, cpu: 30, requests: 100 },
      { time: '02:00', instances: 2, cpu: 25, requests: 80 },
      { time: '04:00', instances: 2, cpu: 20, requests: 60 },
      { time: '06:00', instances: 3, cpu: 45, requests: 200 },
      { time: '08:00', instances: 5, cpu: 65, requests: 400 },
      { time: '10:00', instances: 8, cpu: 75, requests: 600 },
      { time: '12:00', instances: 10, cpu: 80, requests: 800 },
      { time: '14:00', instances: 8, cpu: 70, requests: 650 },
      { time: '16:00', instances: 6, cpu: 55, requests: 450 },
      { time: '18:00', instances: 7, cpu: 60, requests: 500 },
      { time: '20:00', instances: 9, cpu: 75, requests: 700 },
      { time: '22:00', instances: 6, cpu: 50, requests: 350 }
    ]

    return (
      <Card>
        <CardHeader>
          <CardTitle>Auto Scaling in Action</CardTitle>
          <CardDescription>See how resources adjust to demand over 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Server className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Current Instances</span>
                </div>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">Auto-adjusted based on load</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Avg CPU Usage</span>
                </div>
                <div className="text-2xl font-bold">58%</div>
                <p className="text-xs text-muted-foreground">Within target range</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Requests/min</span>
                </div>
                <div className="text-2xl font-bold">420</div>
                <p className="text-xs text-muted-foreground">Current load</p>
              </Card>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scalingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="instances" stroke="#8884d8" strokeWidth={2} name="Instances" />
                  <Line yAxisId="right" type="monotone" dataKey="cpu" stroke="#82ca9d" strokeWidth={2} name="CPU %" />
                  <Line yAxisId="right" type="monotone" dataKey="requests" stroke="#ffc658" strokeWidth={2} name="Requests" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h4 className="mb-3">Scaling Triggers</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <ArrowUp className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-sm">Scale Up</span>
                    </div>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• CPU usage &gt; 70% for 5 minutes</li>
                      <li>• Memory usage &gt; 80%</li>
                      <li>• Request queue &gt; 100 requests</li>
                      <li>• Response time &gt; 500ms</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <ArrowRight className="w-4 h-4 text-blue-500 rotate-90" />
                      <span className="font-medium text-sm">Scale Down</span>
                    </div>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• CPU usage &lt; 30% for 15 minutes</li>
                      <li>• Memory usage &lt; 50%</li>
                      <li>• Request queue empty</li>
                      <li>• Low traffic period detected</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <GlobalWarning />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="load-balancing">Load Balancing</TabsTrigger>
          <TabsTrigger value="caching">Caching</TabsTrigger>
          <TabsTrigger value="cdn">CDNs</TabsTrigger>
          <TabsTrigger value="queues">Message Queues</TabsTrigger>
          <TabsTrigger value="scaling">Auto Scaling</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewContent />
        </TabsContent>

        <TabsContent value="load-balancing">
          <LoadBalancingContent />
        </TabsContent>

        <TabsContent value="caching">
          <CachingContent />
        </TabsContent>

        <TabsContent value="cdn">
          <CDNContent />
        </TabsContent>

        <TabsContent value="queues">
          <MessageQueuesContent />
        </TabsContent>

        <TabsContent value="scaling">
          <AutoScalingContent />
        </TabsContent>

        <TabsContent value="comparison">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scalability Techniques Comparison</CardTitle>
                <CardDescription>Choose the right technique for your use case</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Technique</TableHead>
                      <TableHead>What it solves</TableHead>
                      <TableHead>Best for</TableHead>
                      <TableHead>Complexity</TableHead>
                      <TableHead>Cost Impact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Load Balancing</TableCell>
                      <TableCell>Traffic distribution</TableCell>
                      <TableCell>High traffic applications</TableCell>
                      <TableCell><Badge variant="outline">Medium</Badge></TableCell>
                      <TableCell><Badge variant="default">Low</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Caching</TableCell>
                      <TableCell>Data access latency</TableCell>
                      <TableCell>Read-heavy workloads</TableCell>
                      <TableCell><Badge variant="outline">Low</Badge></TableCell>
                      <TableCell><Badge variant="default">Low</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CDN</TableCell>
                      <TableCell>Geographic latency</TableCell>
                      <TableCell>Global applications</TableCell>
                      <TableCell><Badge variant="outline">Low</Badge></TableCell>
                      <TableCell><Badge variant="secondary">Medium</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Message Queues</TableCell>
                      <TableCell>Service coupling</TableCell>
                      <TableCell>Microservices</TableCell>
                      <TableCell><Badge variant="secondary">Medium</Badge></TableCell>
                      <TableCell><Badge variant="default">Low</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Auto Scaling</TableCell>
                      <TableCell>Variable demand</TableCell>
                      <TableCell>Unpredictable load</TableCell>
                      <TableCell><Badge variant="secondary">High</Badge></TableCell>
                      <TableCell><Badge variant="default">Variable</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}