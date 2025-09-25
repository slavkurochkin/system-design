import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { Shield, AlertTriangle, Zap, Clock, TrendingUp, RefreshCw, Activity, X, CheckCircle, XCircle, Timer, Database, Server, ArrowRight } from 'lucide-react'
import { Switch } from './ui/switch'
import { CircuitBreakerVisualization } from './visualizations/CircuitBreakerVisualization'
import { GlobalWarning } from './GlobalWarning'
import { 
  reliabilityMetrics, 
  failoverPatterns, 
  chaosExperiments, 
  availabilityData, 
  slaData, 
  redundancyLevels,
  circuitBreakerBenefits,
  circuitBreakerImplementation,
  failoverStrategies
} from './data/reliabilityData'

export function ReliabilityFaultTolerance() {
  const [circuitBreakerState, setCircuitBreakerState] = useState('closed')
  const [failureRate, setFailureRate] = useState([10])
  const [chaosEnabled, setChaosEnabled] = useState(false)
  const [chaosMetrics, setChaosMetrics] = useState({
    experimentsRun: 0,
    failuresInjected: 0,
    systemResilience: 85,
    mttr: 120, // Mean Time To Recovery in seconds
    incidentCount: 0
  })

  // Enhanced chaos engineering with meaningful data changes
  useEffect(() => {
    if (chaosEnabled) {
      const interval = setInterval(() => {
        setChaosMetrics(prev => ({
          experimentsRun: prev.experimentsRun + 1,
          failuresInjected: prev.failuresInjected + Math.floor(Math.random() * 3) + 1,
          systemResilience: Math.max(70, Math.min(95, prev.systemResilience + (Math.random() - 0.5) * 10)),
          mttr: Math.max(60, Math.min(300, prev.mttr + (Math.random() - 0.5) * 40)),
          incidentCount: prev.incidentCount + (Math.random() > 0.7 ? 1 : 0)
        }))
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [chaosEnabled])

  // Reset chaos metrics when disabled
  useEffect(() => {
    if (!chaosEnabled) {
      setChaosMetrics({
        experimentsRun: 0,
        failuresInjected: 0,
        systemResilience: 85,
        mttr: 120,
        incidentCount: 0
      })
    }
  }, [chaosEnabled])

  const chaosExperimentData = [
    { name: 'CPU Spike', impact: chaosEnabled ? 65 : 0, recovered: chaosEnabled ? 90 : 0, color: '#ef4444' },
    { name: 'Memory Leak', impact: chaosEnabled ? 45 : 0, recovered: chaosEnabled ? 85 : 0, color: '#f59e0b' },
    { name: 'Network Partition', impact: chaosEnabled ? 80 : 0, recovered: chaosEnabled ? 95 : 0, color: '#8b5cf6' },
    { name: 'Database Timeout', impact: chaosEnabled ? 70 : 0, recovered: chaosEnabled ? 88 : 0, color: '#3b82f6' },
    { name: 'Service Unavailable', impact: chaosEnabled ? 90 : 0, recovered: chaosEnabled ? 92 : 0, color: '#10b981' }
  ]

  return (
    <div className="space-y-6">
      <GlobalWarning />
      <div className="mb-8">
        <h1 className="mb-4">Reliability & Fault Tolerance</h1>
        <p className="text-muted-foreground">
          Learn about building resilient systems that can handle failures gracefully through redundancy, failover strategies, and chaos engineering.
        </p>
      </div>

      <Tabs defaultValue="circuit-breakers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="circuit-breakers">Circuit Breakers</TabsTrigger>
          <TabsTrigger value="failover">Failover Patterns</TabsTrigger>
          <TabsTrigger value="redundancy">Redundancy</TabsTrigger>
          <TabsTrigger value="chaos">Chaos Engineering</TabsTrigger>
          <TabsTrigger value="metrics">Reliability Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="circuit-breakers" className="space-y-6">
          {/* Move Interactive Circuit Breaker to the top */}
          <Card>
            <CardHeader>
              <CardTitle>Interactive Circuit Breaker</CardTitle>
              <CardDescription>
                Visualize how circuit breakers protect services from cascading failures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CircuitBreakerVisualization 
                circuitBreakerState={circuitBreakerState}
                failureRate={failureRate}
                setFailureRate={setFailureRate}
                setCircuitBreakerState={setCircuitBreakerState}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What is a Circuit Breaker?</CardTitle>
              <CardDescription>
                A circuit breaker is a design pattern that prevents cascading failures by monitoring service calls and failing fast when a threshold is reached
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="mb-3">The Problem Circuit Breakers Solve</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2 text-red-600">Without Circuit Breaker:</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Services keep calling failed dependencies</li>
                        <li>• Resources tied up waiting for timeouts</li>
                        <li>• Failures cascade through the system</li>
                        <li>• Users experience long wait times</li>
                        <li>• System becomes completely unavailable</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-green-600">With Circuit Breaker:</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Fast failure prevents resource exhaustion</li>
                        <li>• System remains partially functional</li>
                        <li>• Failed services get time to recover</li>
                        <li>• Fallback responses maintain UX</li>
                        <li>• Automatic recovery testing</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3">Key Benefits</h4>
                    <div className="space-y-3">
                      {circuitBreakerBenefits.map((benefit, index) => (
                        <Card key={index} className="p-3">
                          <h5 className="font-medium mb-1">{benefit.benefit}</h5>
                          <p className="text-sm text-muted-foreground mb-2">{benefit.description}</p>
                          <div className="text-xs">
                            <span className="font-medium">Impact: </span>
                            <span className="text-muted-foreground">{benefit.impact}</span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-3">Implementation Steps</h4>
                    <div className="space-y-3">
                      {circuitBreakerImplementation.map((step, index) => (
                        <Card key={index} className="p-3">
                          <h5 className="font-medium mb-1 text-blue-600">{step.step}</h5>
                          <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                          <div className="text-xs bg-muted p-2 rounded font-mono">
                            {step.example}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Circuit Breaker States Detailed</CardTitle>
              <CardDescription>
                Understanding the three states and their transitions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <h4 className="font-medium">Closed State</h4>
                  </div>
                  <ul className="text-sm space-y-2 text-muted-foreground mb-4">
                    <li>• All requests pass through normally</li>
                    <li>• Continuously monitors failure rate</li>
                    <li>• Maintains success/failure counters</li>
                    <li>• Transitions to Open when threshold exceeded</li>
                  </ul>
                  <div className="text-xs bg-green-50 dark:bg-green-950 p-2 rounded">
                    <strong>Trigger:</strong> Failure rate &gt; 50% in last 10 requests
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <h4 className="font-medium">Open State</h4>
                  </div>
                  <ul className="text-sm space-y-2 text-muted-foreground mb-4">
                    <li>• All requests fail immediately</li>
                    <li>• No calls made to downstream service</li>
                    <li>• Returns fallback response or error</li>
                    <li>• Waits for timeout period to elapse</li>
                  </ul>
                  <div className="text-xs bg-red-50 dark:bg-red-950 p-2 rounded">
                    <strong>Duration:</strong> Configurable timeout (e.g., 60 seconds)
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <h4 className="font-medium">Half-Open State</h4>
                  </div>
                  <ul className="text-sm space-y-2 text-muted-foreground mb-4">
                    <li>• Limited number of test requests allowed</li>
                    <li>• Monitors these requests closely</li>
                    <li>• Success → transitions back to Closed</li>
                    <li>• Failure → returns to Open state</li>
                  </ul>
                  <div className="text-xs bg-yellow-50 dark:bg-yellow-950 p-2 rounded">
                    <strong>Test Requests:</strong> Usually 1-5 requests for evaluation
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Circuit Breaker Patterns & Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-3 text-green-600">Best Practices</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Set appropriate failure thresholds based on SLA requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Implement meaningful fallback responses or cached data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Monitor circuit breaker state and trigger alerts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Use different thresholds for different service criticalities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Test circuit breaker behavior in staging environments</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 text-red-600">Common Pitfalls</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Setting thresholds too low causing false positives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Not implementing proper fallback mechanisms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Ignoring circuit breaker state in monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Using same configuration for all services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Not testing recovery scenarios regularly</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="failover" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What are Failover Patterns?</CardTitle>
              <CardDescription>
                Failover patterns define how systems switch from a failed primary component to a backup component to maintain service availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <h4 className="mb-3">Key Concepts</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2">RTO (Recovery Time Objective)</h5>
                      <p className="text-muted-foreground">Maximum acceptable downtime after a failure occurs</p>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">RPO (Recovery Point Objective)</h5>
                      <p className="text-muted-foreground">Maximum acceptable data loss measured in time</p>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Failover Trigger</h5>
                      <p className="text-muted-foreground">Event or condition that initiates the failover process</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3">Types of Failures</h4>
                    <div className="space-y-3">
                      <Card className="p-3">
                        <h5 className="font-medium mb-1 text-red-600">Hardware Failures</h5>
                        <p className="text-sm text-muted-foreground">Server crashes, disk failures, network outages</p>
                      </Card>
                      <Card className="p-3">
                        <h5 className="font-medium mb-1 text-orange-600">Software Failures</h5>
                        <p className="text-sm text-muted-foreground">Application crashes, memory leaks, deadlocks</p>
                      </Card>
                      <Card className="p-3">
                        <h5 className="font-medium mb-1 text-yellow-600">Network Failures</h5>
                        <p className="text-sm text-muted-foreground">Connectivity loss, high latency, packet loss</p>
                      </Card>
                      <Card className="p-3">
                        <h5 className="font-medium mb-1 text-purple-600">Regional Failures</h5>
                        <p className="text-sm text-muted-foreground">Data center outages, natural disasters</p>
                      </Card>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-3">Failover Strategies</h4>
                    <div className="space-y-3">
                      {failoverStrategies.map((strategy, index) => (
                        <Card key={index} className="p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium">{strategy.strategy}</h5>
                            <Badge variant="outline" className="text-xs">
                              RTO: {strategy.rto}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{strategy.description}</p>
                          <div className="text-xs text-blue-600">
                            <strong>Use Case:</strong> {strategy.useCase}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Failover Strategy Comparison</CardTitle>
              <CardDescription>
                Compare different disaster recovery and failover approaches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pattern</TableHead>
                    <TableHead>RTO</TableHead>
                    <TableHead>RPO</TableHead>
                    <TableHead>Complexity</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {failoverPatterns.map((pattern, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{pattern.name}</TableCell>
                      <TableCell>{pattern.rto}</TableCell>
                      <TableCell>{pattern.rpo}</TableCell>
                      <TableCell>
                        <Badge variant={
                          pattern.complexity === 'High' ? 'destructive' : 
                          pattern.complexity === 'Medium' ? 'default' : 'secondary'
                        }>
                          {pattern.complexity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          pattern.cost === 'Very High' ? 'destructive' :
                          pattern.cost === 'High' ? 'destructive' : 
                          pattern.cost === 'Medium' ? 'default' : 'secondary'
                        }>
                          {pattern.cost}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {pattern.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="redundancy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What is Redundancy?</CardTitle>
              <CardDescription>
                Redundancy is the duplication of critical components or functions of a system to increase reliability and availability through backup or fail-safe mechanisms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="mb-3">Core Concept</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Redundancy eliminates single points of failure by ensuring that if one component fails, 
                    another can seamlessly take over its responsibilities. This is fundamental to building 
                    resilient distributed systems that can withstand various types of failures.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-white dark:bg-gray-900 rounded border">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-2">
                        <X className="w-6 h-6 text-red-600" />
                      </div>
                      <h5 className="font-medium mb-1">Single Point of Failure</h5>
                      <p className="text-xs text-muted-foreground">One failure brings down entire system</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-900 rounded border">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Shield className="w-6 h-6 text-green-600" />
                      </div>
                      <h5 className="font-medium mb-1">Redundant System</h5>
                      <p className="text-xs text-muted-foreground">Multiple components provide backup</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3">Types of Redundancy</h4>
                    <div className="space-y-3">
                      <Card className="p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Server className="w-4 h-4 text-blue-600" />
                          <h5 className="font-medium">Hardware Redundancy</h5>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Multiple physical servers, storage devices, network links
                        </p>
                        <div className="text-xs text-blue-600">
                          Example: RAID arrays, redundant power supplies, multiple data centers
                        </div>
                      </Card>
                      <Card className="p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-4 h-4 text-green-600" />
                          <h5 className="font-medium">Software Redundancy</h5>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Multiple application instances, microservices, processes
                        </p>
                        <div className="text-xs text-green-600">
                          Example: Load-balanced app servers, containerized services
                        </div>
                      </Card>
                      <Card className="p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Database className="w-4 h-4 text-purple-600" />
                          <h5 className="font-medium">Data Redundancy</h5>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Database replicas, backup copies, distributed storage
                        </p>
                        <div className="text-xs text-purple-600">
                          Example: Master-slave DB replication, distributed file systems
                        </div>
                      </Card>
                      <Card className="p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-orange-600" />
                          <h5 className="font-medium">Network Redundancy</h5>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Multiple network paths, internet connections, CDN nodes
                        </p>
                        <div className="text-xs text-orange-600">
                          Example: Multi-homed networks, BGP routing, edge locations
                        </div>
                      </Card>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-3">Implementation Strategies</h4>
                    <div className="space-y-3">
                      <Card className="p-3">
                        <h5 className="font-medium mb-1 text-blue-600">N+1 Redundancy</h5>
                        <p className="text-sm text-muted-foreground mb-2">
                          One extra component beyond minimum requirements
                        </p>
                        <div className="text-xs bg-blue-50 dark:bg-blue-950 p-2 rounded">
                          If you need 3 servers for capacity, deploy 4 servers
                        </div>
                      </Card>
                      <Card className="p-3">
                        <h5 className="font-medium mb-1 text-green-600">N+N Redundancy</h5>
                        <p className="text-sm text-muted-foreground mb-2">
                          Complete duplicate of the entire system
                        </p>
                        <div className="text-xs bg-green-50 dark:bg-green-950 p-2 rounded">
                          Two identical data centers with full capacity each
                        </div>
                      </Card>
                      <Card className="p-3">
                        <h5 className="font-medium mb-1 text-purple-600">Geographic Distribution</h5>
                        <p className="text-sm text-muted-foreground mb-2">
                          Spread components across multiple locations
                        </p>
                        <div className="text-xs bg-purple-50 dark:bg-purple-950 p-2 rounded">
                          Services deployed in multiple regions worldwide
                        </div>
                      </Card>
                      <Card className="p-3">
                        <h5 className="font-medium mb-1 text-orange-600">Layered Redundancy</h5>
                        <p className="text-sm text-muted-foreground mb-2">
                          Multiple levels of backup at different system layers
                        </p>
                        <div className="text-xs bg-orange-50 dark:bg-orange-950 p-2 rounded">
                          Hardware + Software + Data + Network redundancy
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Redundancy Levels & Availability Impact</CardTitle>
              <CardDescription>
                How different redundancy approaches affect system availability and costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {redundancyLevels.map((level, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium">{level.type}</h4>
                      <Badge variant={
                        level.availability >= 99.99 ? 'default' :
                        level.availability >= 99.9 ? 'secondary' : 'destructive'
                      }>
                        {level.availability}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{level.description}</p>
                    <div className="text-xs mb-3">
                      <strong>Cost Factor:</strong> {level.costFactor}x
                    </div>
                    <div className="space-y-2">
                      <div>
                        <h6 className="text-xs font-medium text-green-600 mb-1">Benefits:</h6>
                        <ul className="text-xs text-muted-foreground">
                          {level.benefits.map((benefit, i) => (
                            <li key={i}>• {benefit}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-xs font-medium text-red-600 mb-1">Trade-offs:</h6>
                        <ul className="text-xs text-muted-foreground">
                          {level.tradeoffs.map((tradeoff, i) => (
                            <li key={i}>• {tradeoff}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Real-World Redundancy Examples</CardTitle>
              <CardDescription>
                How major tech companies implement redundancy at scale
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-3">Infrastructure Examples</h4>
                  <div className="space-y-4">
                    <Card className="p-4">
                      <h5 className="font-medium mb-2 text-blue-600">Netflix</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Multiple AWS regions for global availability</li>
                        <li>• Microservices with independent scaling</li>
                        <li>• Chaos Monkey for failure testing</li>
                        <li>• CDN with thousands of edge locations</li>
                      </ul>
                    </Card>
                    <Card className="p-4">
                      <h5 className="font-medium mb-2 text-green-600">Google</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Global load balancing across data centers</li>
                        <li>• Spanner database spans multiple continents</li>
                        <li>• Multiple fiber optic cable routes</li>
                        <li>• Auto-failover within milliseconds</li>
                      </ul>
                    </Card>
                    <Card className="p-4">
                      <h5 className="font-medium mb-2 text-purple-600">Amazon</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Multiple availability zones per region</li>
                        <li>• Cross-region replication for data</li>
                        <li>• Auto-scaling groups for capacity</li>
                        <li>• Route 53 for DNS failover</li>
                      </ul>
                    </Card>
                  </div>
                </div>
                <div>
                  <h4 className="mb-3">Architecture Patterns</h4>
                  <div className="space-y-4">
                    <Card className="p-4">
                      <h5 className="font-medium mb-2">Database Redundancy</h5>
                      <div className="space-y-2 text-sm">
                        <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded">
                          <strong>Master-Slave:</strong> One write node, multiple read replicas
                        </div>
                        <div className="p-2 bg-green-50 dark:bg-green-950 rounded">
                          <strong>Master-Master:</strong> Multiple write nodes with conflict resolution
                        </div>
                        <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded">
                          <strong>Sharded:</strong> Data split across multiple database instances
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h5 className="font-medium mb-2">Service Redundancy</h5>
                      <div className="space-y-2 text-sm">
                        <div className="p-2 bg-orange-50 dark:bg-orange-950 rounded">
                          <strong>Load Balancing:</strong> Multiple service instances behind LB
                        </div>
                        <div className="p-2 bg-red-50 dark:bg-red-950 rounded">
                          <strong>Service Mesh:</strong> Sidecar proxies for resilience
                        </div>
                        <div className="p-2 bg-yellow-50 dark:bg-yellow-950 rounded">
                          <strong>Circuit Breakers:</strong> Fail-fast to prevent cascading failures
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h5 className="font-medium mb-2">Storage Redundancy</h5>
                      <div className="space-y-2 text-sm">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-950 rounded">
                          <strong>RAID:</strong> Hardware-level disk redundancy
                        </div>
                        <div className="p-2 bg-teal-50 dark:bg-teal-950 rounded">
                          <strong>Object Storage:</strong> Multiple copies across zones
                        </div>
                        <div className="p-2 bg-pink-50 dark:bg-pink-950 rounded">
                          <strong>Backup Strategy:</strong> 3-2-1 rule (3 copies, 2 media, 1 offsite)
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Redundancy Design Principles</CardTitle>
              <CardDescription>
                Key principles for implementing effective redundancy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-3 text-green-600">Best Practices</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Diversity:</strong> Use different vendors, technologies, or approaches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Independence:</strong> Ensure redundant components don't share failure modes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Testing:</strong> Regularly test failover mechanisms and recovery procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Monitoring:</strong> Continuously monitor health of all redundant components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Automation:</strong> Automate failover and recovery processes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Documentation:</strong> Maintain runbooks for manual recovery procedures</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 text-red-600">Common Mistakes</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Shared Dependencies:</strong> Redundant systems sharing common failure points</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Untested Failover:</strong> Backup systems that fail when actually needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Split-brain:</strong> Multiple components believing they're the primary</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Resource Waste:</strong> Over-provisioning without clear benefit analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Complexity Burden:</strong> Adding redundancy without considering maintenance cost</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span><strong>False Security:</strong> Assuming redundancy eliminates all failure modes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chaos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enhanced Chaos Engineering Dashboard</CardTitle>
              <CardDescription>
                Interactive chaos engineering simulation showing real system impact and recovery metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${chaosEnabled ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                    <div>
                      <h4 className="font-medium">Chaos Engineering Status</h4>
                      <p className="text-sm text-muted-foreground">
                        {chaosEnabled ? 'Active - Running fault injection experiments' : 'Inactive - System running normally'}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={chaosEnabled}
                    onCheckedChange={setChaosEnabled}
                  />
                </div>

                {chaosEnabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{chaosMetrics.experimentsRun}</div>
                      <div className="text-sm text-muted-foreground">Experiments Run</div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">{chaosMetrics.failuresInjected}</div>
                      <div className="text-sm text-muted-foreground">Failures Injected</div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{chaosMetrics.systemResilience.toFixed(1)}%</div>
                      <div className="text-sm text-muted-foreground">System Resilience</div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">{chaosMetrics.mttr}s</div>
                      <div className="text-sm text-muted-foreground">Mean Time to Recovery</div>
                    </Card>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Chaos Experiment Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chaosExperimentData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                            <YAxis />
                            <Tooltip formatter={(value, name) => [`${value}%`, name === 'impact' ? 'Impact Severity' : 'Recovery Rate']} />
                            <Bar dataKey="impact" fill="#ef4444" name="Impact" radius={[2, 2, 0, 0]} />
                            <Bar dataKey="recovered" fill="#22c55e" name="Recovered" radius={[2, 2, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Health Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>System Resilience</span>
                            <span>{chaosMetrics.systemResilience.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${chaosMetrics.systemResilience}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Recovery Time (seconds)</span>
                            <span>{chaosMetrics.mttr}s</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, (chaosMetrics.mttr / 300) * 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Incident Count</span>
                            <span>{chaosMetrics.incidentCount}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-red-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, (chaosMetrics.incidentCount / 10) * 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        {chaosEnabled && (
                          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                            <h5 className="font-medium mb-2">Real-time Impact Analysis</h5>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div>• Monitoring {chaosMetrics.experimentsRun} active experiments</div>
                              <div>• System adapting to {chaosMetrics.failuresInjected} failure scenarios</div>
                              <div>• Recovery mechanisms performing at {chaosMetrics.systemResilience.toFixed(1)}% efficiency</div>
                              <div>• Average recovery time: {chaosMetrics.mttr} seconds</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Chaos Engineering Principles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <AlertTriangle className="w-8 h-8 text-white" />
                        </div>
                        <h5 className="font-medium mb-2">Hypothesis</h5>
                        <p className="text-sm text-muted-foreground">Define what normal behavior looks like</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h5 className="font-medium mb-2">Experiment</h5>
                        <p className="text-sm text-muted-foreground">Inject controlled failures into the system</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Activity className="w-8 h-8 text-white" />
                        </div>
                        <h5 className="font-medium mb-2">Observe</h5>
                        <p className="text-sm text-muted-foreground">Monitor system behavior and metrics</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <h5 className="font-medium mb-2">Learn</h5>
                        <p className="text-sm text-muted-foreground">Improve system resilience based on findings</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chaos Engineering Experiments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {chaosExperiments.map((experiment, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium">{experiment.name}</h4>
                      <Badge variant={
                        experiment.severity === 'High' ? 'destructive' :
                        experiment.severity === 'Medium' ? 'default' : 'secondary'
                      }>
                        {experiment.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{experiment.description}</p>
                    <div className="space-y-2">
                      <div>
                        <h6 className="text-xs font-medium mb-1">Expected Impact:</h6>
                        <p className="text-xs text-muted-foreground">{experiment.expectedImpact}</p>
                      </div>
                      <div>
                        <h6 className="text-xs font-medium mb-1">Mitigation:</h6>
                        <p className="text-xs text-muted-foreground">{experiment.mitigation}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reliability Metrics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {reliabilityMetrics.map((metric, index) => (
                  <Card key={index} className="p-4 text-center">
                    <div className="text-3xl font-bold mb-2" style={{ color: metric.color }}>
                      {metric.value}
                    </div>
                    <h4 className="font-medium mb-2">{metric.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{metric.description}</p>
                    <div className="text-xs">
                      <strong>Target:</strong> {metric.target}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={availabilityData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[99, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Availability']} />
                      <Line 
                        type="monotone" 
                        dataKey="availability" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SLA Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={slaData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
                      <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}