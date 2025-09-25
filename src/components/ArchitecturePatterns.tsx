import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Layers, GitBranch, Zap, Globe, MessageSquare, Database, Server, ArrowRight, Building, CheckCircle, XCircle, Code, Users, TrendingUp, AlertTriangle } from 'lucide-react'
import { Switch } from './ui/switch'
import { GlobalWarning } from './GlobalWarning'
import { 
  architectureComparison, 
  cqrsMetrics, 
  eventPatterns, 
  monolithicPatterns, 
  serviceMeshFeatures,
  architecturalDecisions,
  eventDrivenPatterns,
  serviceMeshComparison,
  migrationStrategies,
  designPatterns
} from './data/architecturePatternsData'

export function ArchitecturePatterns() {
  const [selectedPattern, setSelectedPattern] = useState('microservices')
  const [serviceMeshEnabled, setServiceMeshEnabled] = useState(false)
  const [migrationStep, setMigrationStep] = useState(0)

  const migrationTimeline = [
    { phase: 'Assessment', duration: 2, effort: 20, description: 'Analyze current architecture' },
    { phase: 'Planning', duration: 3, effort: 40, description: 'Design target architecture' },
    { phase: 'Foundation', duration: 6, effort: 60, description: 'Build infrastructure and tooling' },
    { phase: 'Migration', duration: 12, effort: 80, description: 'Migrate services incrementally' },
    { phase: 'Optimization', duration: 6, effort: 40, description: 'Optimize and stabilize' }
  ]

  const MonolithVisualization = () => (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="space-y-6">
          {/* Single Application Box */}
          <div className="border-2 border-blue-500 rounded-lg p-6 bg-blue-50 dark:bg-blue-950">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-medium">Monolithic Application</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded border">
                <h5 className="font-medium text-purple-600 mb-2">Presentation Layer</h5>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• Web UI</li>
                  <li>• Controllers</li>
                  <li>• API Endpoints</li>
                </ul>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded border">
                <h5 className="font-medium text-green-600 mb-2">Business Layer</h5>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• Business Logic</li>
                  <li>• Domain Models</li>
                  <li>• Services</li>
                </ul>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded border">
                <h5 className="font-medium text-orange-600 mb-2">Data Layer</h5>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• Data Access</li>
                  <li>• ORM/Repositories</li>
                  <li>• Database</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Database */}
          <div className="flex justify-center">
            <div className="text-center">
              <div className="w-20 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                <Database className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm">Shared Database</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const MicroservicesVisualization = () => (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-8 items-center">
          {/* API Gateway */}
          <div className="col-span-3 flex justify-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm mt-2">API Gateway</span>
            </div>
          </div>
          
          {/* Services */}
          {['User Service', 'Order Service', 'Payment Service'].map((service, index) => (
            <div key={service} className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                <Server className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm text-center">{service}</span>
              
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-muted-foreground">Database</span>
            </div>
          ))}
        </div>
      </div>
      
      {serviceMeshEnabled && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Service Mesh Active</span>
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400">
            All service-to-service communication is secured and monitored through the mesh
          </p>
        </div>
      )}
    </div>
  )

  const EventDrivenVisualization = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-center space-x-6">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <span className="text-sm mt-2">Producer</span>
        </div>
        
        <ArrowRight className="w-6 h-6 text-muted-foreground" />
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <span className="text-sm mt-2">Event Bus</span>
        </div>
        
        <ArrowRight className="w-6 h-6 text-muted-foreground" />
        
        <div className="flex flex-col items-center space-y-2">
          {['Consumer A', 'Consumer B'].map((consumer, index) => (
            <div key={consumer} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Server className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs">{consumer}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div className="p-3 border rounded-lg">
          <h5 className="font-medium">Loose Coupling</h5>
          <p className="text-xs text-muted-foreground">Services don't know about each other</p>
        </div>
        <div className="p-3 border rounded-lg">
          <h5 className="font-medium">Async Processing</h5>
          <p className="text-xs text-muted-foreground">Non-blocking operations</p>
        </div>
        <div className="p-3 border rounded-lg">
          <h5 className="font-medium">Scalability</h5>
          <p className="text-xs text-muted-foreground">Independent scaling</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <GlobalWarning />
      <div className="mb-8">
        <h1 className="mb-4">Architecture Patterns</h1>
        <p className="text-muted-foreground">
          Explore modern architectural patterns including monoliths, microservices, event-driven architecture, CQRS, and service mesh technologies.
        </p>
      </div>

      <Tabs defaultValue="monolithic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="monolithic">Monolithic</TabsTrigger>
          <TabsTrigger value="microservices">Microservices</TabsTrigger>
          <TabsTrigger value="event-driven">Event-Driven</TabsTrigger>
          <TabsTrigger value="cqrs">CQRS</TabsTrigger>
          <TabsTrigger value="service-mesh">Service Mesh</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="monolithic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monolithic Architecture</CardTitle>
              <CardDescription>
                Single deployable unit containing all application functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MonolithVisualization />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What is Monolithic Architecture?</CardTitle>
              <CardDescription>
                Understanding the traditional approach to application architecture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="mb-3">Core Characteristics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2 text-green-600">Single Deployment Unit</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• All features in one application</li>
                        <li>• Shared runtime and memory space</li>
                        <li>• Single technology stack</li>
                        <li>• Unified development and deployment</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-blue-600">Shared Resources</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Common database schema</li>
                        <li>• Shared libraries and dependencies</li>
                        <li>• Centralized configuration</li>
                        <li>• Single point of scaling</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3 text-green-600">Advantages</h4>
                    <div className="space-y-2">
                      {[
                        'Simple development and testing',
                        'Easy deployment and monitoring',
                        'Better performance (no network calls)',
                        'ACID transactions across modules',
                        'Easier debugging and profiling',
                        'Lower operational complexity'
                      ].map((advantage, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{advantage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-3 text-red-600">Challenges</h4>
                    <div className="space-y-2">
                      {[
                        'Difficult to scale specific features',
                        'Technology lock-in',
                        'Large codebase becomes unwieldy',
                        'Longer build and deployment times',
                        'Team coordination bottlenecks',
                        'Risk of complete system failure'
                      ].map((challenge, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <span>{challenge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monolithic Architecture Patterns</CardTitle>
              <CardDescription>
                Different approaches to structuring monolithic applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {monolithicPatterns.map((pattern, index) => (
                  <Card key={index} className="p-4">
                    <h4 className="font-medium mb-2">{pattern.pattern}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{pattern.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-green-600 mb-1">Pros:</h5>
                        <ul className="space-y-1">
                          {pattern.pros.map((pro, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                              <span className="text-muted-foreground">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-red-600 mb-1">Cons:</h5>
                        <ul className="space-y-1">
                          {pattern.cons.map((con, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <XCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                              <span className="text-muted-foreground">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-600 mb-1">Best For:</h5>
                        <p className="text-muted-foreground">{pattern.useCase}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>When to Choose Monolithic Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-3 text-green-600">Ideal Scenarios</h4>
                  <div className="space-y-3">
                    <Card className="p-3">
                      <h5 className="font-medium mb-1">Small Teams</h5>
                      <p className="text-sm text-muted-foreground">Teams with 2-8 developers can effectively manage a monolith</p>
                    </Card>
                    <Card className="p-3">
                      <h5 className="font-medium mb-1">Simple Domain</h5>
                      <p className="text-sm text-muted-foreground">Well-understood business domain without complex boundaries</p>
                    </Card>
                    <Card className="p-3">
                      <h5 className="font-medium mb-1">Rapid Prototyping</h5>
                      <p className="text-sm text-muted-foreground">Quick validation of business ideas and concepts</p>
                    </Card>
                    <Card className="p-3">
                      <h5 className="font-medium mb-1">Predictable Load</h5>
                      <p className="text-sm text-muted-foreground">Uniform scaling requirements across features</p>
                    </Card>
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 text-orange-600">Evolution Path</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-12 text-center">Step 1</Badge>
                      <span className="text-sm">Start with well-structured monolith</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-12 text-center">Step 2</Badge>
                      <span className="text-sm">Implement clear module boundaries</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-12 text-center">Step 3</Badge>
                      <span className="text-sm">Extract services when needed</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-12 text-center">Step 4</Badge>
                      <span className="text-sm">Gradually migrate to microservices</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="microservices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Microservices Architecture</CardTitle>
              <CardDescription>
                Interactive visualization of a microservices system with optional service mesh
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={serviceMeshEnabled}
                      onCheckedChange={setServiceMeshEnabled}
                    />
                    <label>Enable Service Mesh</label>
                  </div>
                  <Badge variant={serviceMeshEnabled ? 'default' : 'outline'}>
                    {serviceMeshEnabled ? 'Istio Active' : 'Direct Communication'}
                  </Badge>
                </div>
                
                <MicroservicesVisualization />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Microservices Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-sm font-medium">Independent Deployment</h4>
                      <p className="text-xs text-muted-foreground">Deploy services independently without affecting others</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-sm font-medium">Technology Diversity</h4>
                      <p className="text-xs text-muted-foreground">Use different technologies per service as needed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-sm font-medium">Team Autonomy</h4>
                      <p className="text-xs text-muted-foreground">Teams own their services end-to-end</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-sm font-medium">Fault Isolation</h4>
                      <p className="text-xs text-muted-foreground">Failures contained to single service</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-sm font-medium">Scalability</h4>
                      <p className="text-xs text-muted-foreground">Scale individual services based on demand</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Microservices Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-sm font-medium">Distributed Complexity</h4>
                      <p className="text-xs text-muted-foreground">Network calls, latency, failures</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-sm font-medium">Data Consistency</h4>
                      <p className="text-xs text-muted-foreground">No ACID transactions across services</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-sm font-medium">Testing Complexity</h4>
                      <p className="text-xs text-muted-foreground">Integration testing is harder</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-sm font-medium">Operational Overhead</h4>
                      <p className="text-xs text-muted-foreground">More services to monitor and deploy</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-sm font-medium">Service Communication</h4>
                      <p className="text-xs text-muted-foreground">Managing inter-service communication patterns</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Microservices Design Principles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="mb-2">Single Responsibility</h4>
                  <p className="text-sm text-muted-foreground">Each service should have one business responsibility</p>
                  <Badge variant="outline" className="mt-2">Domain Driven</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="mb-2">Database per Service</h4>
                  <p className="text-sm text-muted-foreground">Each service owns its data and database</p>
                  <Badge variant="outline" className="mt-2">Data Isolation</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="mb-2">API First</h4>
                  <p className="text-sm text-muted-foreground">Design APIs before implementation</p>
                  <Badge variant="outline" className="mt-2">Contract Driven</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Migration Strategies</CardTitle>
              <CardDescription>
                Common patterns for migrating from monolith to microservices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {migrationStrategies.map((strategy, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{strategy.strategy}</h4>
                      <div className="flex gap-2">
                        <Badge variant={
                          strategy.risk === 'Low' ? 'secondary' :
                          strategy.risk === 'Medium' ? 'default' : 'destructive'
                        }>
                          {strategy.risk} Risk
                        </Badge>
                        <Badge variant="outline">{strategy.timeframe}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Effort: {strategy.effort}</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            strategy.effort === 'Medium' ? 'bg-yellow-500' :
                            strategy.effort === 'High' ? 'bg-orange-500' :
                            strategy.effort === 'Very High' ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ 
                            width: strategy.effort === 'Medium' ? '50%' :
                                   strategy.effort === 'High' ? '75%' :
                                   strategy.effort === 'Very High' ? '100%' : '25%'
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="event-driven" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event-Driven Architecture</CardTitle>
              <CardDescription>
                Loosely coupled architecture using events for communication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EventDrivenVisualization />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event-Driven Patterns Detailed</CardTitle>
              <CardDescription>
                Different approaches to implementing event-driven architecture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventDrivenPatterns.map((pattern, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{pattern.pattern}</h4>
                      <div className="flex gap-2">
                        <Badge variant={
                          pattern.complexity === 'Low' ? 'secondary' :
                          pattern.complexity === 'Medium' ? 'default' : 'destructive'
                        }>
                          {pattern.complexity} Complexity
                        </Badge>
                        <Badge variant="outline">{pattern.coupling} Coupling</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{pattern.description}</p>
                    <div className="text-xs text-blue-600">
                      <strong>Use Case:</strong> {pattern.useCase}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Pattern Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={eventPatterns}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="usage"
                        label={({ pattern, usage }) => `${pattern}: ${usage}%`}
                      >
                        {eventPatterns.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Event Types & Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="mb-1">Domain Events</h4>
                    <p className="text-sm text-muted-foreground mb-2">Business domain changes (OrderCreated, UserRegistered)</p>
                    <div className="flex gap-1 flex-wrap">
                      <Badge variant="default" className="text-xs">Business Logic</Badge>
                      <Badge variant="outline" className="text-xs">Core Domain</Badge>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h4 className="mb-1">Integration Events</h4>
                    <p className="text-sm text-muted-foreground mb-2">Cross-boundary communication between services</p>
                    <div className="flex gap-1 flex-wrap">
                      <Badge variant="outline" className="text-xs">Service Integration</Badge>
                      <Badge variant="outline" className="text-xs">Pub/Sub</Badge>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h4 className="mb-1">System Events</h4>
                    <p className="text-sm text-muted-foreground mb-2">Infrastructure changes (ServerDown, DeploymentComplete)</p>
                    <div className="flex gap-1 flex-wrap">
                      <Badge variant="secondary" className="text-xs">Operations</Badge>
                      <Badge variant="outline" className="text-xs">Infrastructure</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Event Streaming vs Message Queues</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aspect</TableHead>
                    <TableHead>Event Streaming</TableHead>
                    <TableHead>Message Queues</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Durability</TableCell>
                    <TableCell>Long-term storage (days/months)</TableCell>
                    <TableCell>Short-term (until consumed)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Consumption</TableCell>
                    <TableCell>Multiple consumers, replay possible</TableCell>
                    <TableCell>Single consumer per message</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ordering</TableCell>
                    <TableCell>Global ordering within partitions</TableCell>
                    <TableCell>FIFO per queue</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Use Case</TableCell>
                    <TableCell>Event sourcing, analytics, logs</TableCell>
                    <TableCell>Task processing, notifications</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Examples</TableCell>
                    <TableCell>Apache Kafka, Amazon Kinesis</TableCell>
                    <TableCell>RabbitMQ, Amazon SQS</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cqrs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CQRS Pattern Performance</CardTitle>
              <CardDescription>
                Command Query Responsibility Segregation optimizes read and write operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: '400px', minHeight: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cqrsMetrics} margin={{ top: 40, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="operation" 
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      interval={0}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="performance" fill="#8884d8" name="Performance %" />
                    <Bar dataKey="consistency" fill="#82ca9d" name="Consistency %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Command Side (Write)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="space-y-4 text-center">
                      <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-sm">Commands</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    <li>• Optimized for writes</li>
                    <li>• Business logic validation</li>
                    <li>• ACID transactions</li>
                    <li>• Normalized data model</li>
                    <li>• Strong consistency</li>
                  </ul>
                  
                  <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                    <h5 className="text-sm font-medium">Use Cases</h5>
                    <p className="text-xs text-muted-foreground">User registration, order processing, payments</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Query Side (Read)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="space-y-4 text-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Database className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-sm">Queries</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    <li>• Optimized for reads</li>
                    <li>• Denormalized views</li>
                    <li>• Multiple projections</li>
                    <li>• Read-only models</li>
                    <li>• Eventual consistency</li>
                  </ul>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h5 className="text-sm font-medium">Use Cases</h5>
                    <p className="text-xs text-muted-foreground">Dashboards, reports, search results</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>CQRS Implementation Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="mb-2">Simple CQRS</h4>
                  <p className="text-sm text-muted-foreground mb-3">Separate read/write models, same database</p>
                  <Badge variant="secondary">Low Complexity</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="mb-2">CQRS with ES</h4>
                  <p className="text-sm text-muted-foreground mb-3">Event sourcing for writes, projections for reads</p>
                  <Badge variant="default">Medium Complexity</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="mb-2">Full CQRS</h4>
                  <p className="text-sm text-muted-foreground mb-3">Separate databases, async synchronization</p>
                  <Badge variant="destructive">High Complexity</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CQRS Benefits & Trade-offs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-3 text-green-600">Benefits</h4>
                  <div className="space-y-2">
                    {[
                      'Independent scaling of reads and writes',
                      'Optimized data models for different operations',
                      'Better performance for complex queries',
                      'Flexibility in data storage choices',
                      'Clear separation of concerns'
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 text-orange-600">Trade-offs</h4>
                  <div className="space-y-2">
                    {[
                      'Increased complexity in system design',
                      'Eventual consistency challenges',
                      'Code duplication between models',
                      'More complex deployment and testing',
                      'Additional infrastructure overhead'
                    ].map((tradeoff, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        <span>{tradeoff}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="service-mesh" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Mesh Features</CardTitle>
              <CardDescription>
                Infrastructure layer for service-to-service communication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceMeshFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${serviceMeshEnabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <div>
                        <h4 className="font-medium">{feature.feature}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                    <Badge variant={serviceMeshEnabled ? 'default' : 'outline'}>
                      {serviceMeshEnabled ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Mesh Comparison</CardTitle>
              <CardDescription>
                Compare popular service mesh solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Mesh</TableHead>
                    <TableHead>Complexity</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Adoption</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceMeshComparison.map((mesh, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{mesh.mesh}</TableCell>
                      <TableCell>
                        <Badge variant={
                          mesh.complexity === 'Low' ? 'secondary' :
                          mesh.complexity === 'Medium' ? 'default' : 'destructive'
                        }>
                          {mesh.complexity}
                        </Badge>
                      </TableCell>
                      <TableCell>{mesh.features}</TableCell>
                      <TableCell>{mesh.performance}</TableCell>
                      <TableCell>{mesh.adoption}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {mesh.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Mesh Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="mb-1">Security</h4>
                    <p className="text-sm text-muted-foreground">Automatic mTLS encryption between services</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h4 className="mb-1">Observability</h4>
                    <p className="text-sm text-muted-foreground">Built-in metrics, logging, and tracing</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h4 className="mb-1">Traffic Management</h4>
                    <p className="text-sm text-muted-foreground">Load balancing, routing, and failover</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h4 className="mb-1">Policy Enforcement</h4>
                    <p className="text-sm text-muted-foreground">Rate limiting, access control, circuit breaking</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Implementation Considerations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-green-600">When to Use</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Many microservices (10+)</li>
                      <li>• Complex service interactions</li>
                      <li>• Security requirements (mTLS)</li>
                      <li>• Need for traffic management</li>
                      <li>• Observability challenges</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 text-orange-600">Challenges</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Additional infrastructure complexity</li>
                      <li>• Performance overhead (proxy layer)</li>
                      <li>• Learning curve for teams</li>
                      <li>• Debugging difficulty</li>
                      <li>• Vendor lock-in considerations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Design Patterns for Distributed Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {designPatterns.map((pattern, index) => (
                  <Card key={index} className="p-4">
                    <h4 className="font-medium mb-2">{pattern.pattern}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{pattern.purpose}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-green-600 mb-1">Benefits:</h5>
                        <ul className="space-y-1">
                          {pattern.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                              <span className="text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-red-600 mb-1">Challenges:</h5>
                        <ul className="space-y-1">
                          {pattern.challenges.map((challenge, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <XCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                              <span className="text-muted-foreground">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Architecture Pattern Comparison</CardTitle>
              <CardDescription>
                Comprehensive comparison across different architectural approaches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: '400px', minHeight: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={architectureComparison}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="aspect" />
                    <PolarRadiusAxis angle={90} domain={[0, 10]} />
                    <Radar name="Monolith" dataKey="monolith" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    <Radar name="Microservices" dataKey="microservices" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                    <Radar name="Serverless" dataKey="serverless" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Architectural Decision Framework</CardTitle>
              <CardDescription>
                Factors to consider when choosing an architecture pattern
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Factor</TableHead>
                    <TableHead>Monolithic</TableHead>
                    <TableHead>Microservices</TableHead>
                    <TableHead>Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {architecturalDecisions.map((decision, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{decision.factor}</TableCell>
                      <TableCell className="text-sm">{decision.monolith}</TableCell>
                      <TableCell className="text-sm">{decision.microservices}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {decision.recommendation}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Migration Timeline</CardTitle>
              <CardDescription>
                Typical phases in migrating from monolith to microservices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div style={{ width: '100%', height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={migrationTimeline}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="phase" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="effort" stroke="#8884d8" name="Effort Level" />
                      <Line type="monotone" dataKey="duration" stroke="#82ca9d" name="Duration (months)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {migrationTimeline.map((phase, index) => (
                    <Card key={index} className="p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{phase.phase}</h4>
                        <Badge variant="outline">{phase.duration}mo</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${phase.effort}%` }}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}