import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Box, Cloud, Layers, Globe, Zap, Settings, Monitor, Shield, Server } from 'lucide-react'
import { Switch } from './ui/switch'
import { Slider } from './ui/slider'
import { GlobalWarning } from './GlobalWarning'

export function CloudInfrastructure() {
  const [kubernetesEnabled, setKubernetesEnabled] = useState(true)
  const [autoScalingEnabled, setAutoScalingEnabled] = useState(true)
  const [deploymentType, setDeploymentType] = useState('rolling')
  const [replicas, setReplicas] = useState([3])
  const [cpuLoad, setCpuLoad] = useState(45)
  const [targetReplicas, setTargetReplicas] = useState(3)
  const [autoscaleMetrics, setAutoscaleMetrics] = useState({
    currentCpu: 45,
    targetCpu: 70,
    minReplicas: 2,
    maxReplicas: 10,
    scalingEvents: 0
  })

  const containerVsVm = [
    { aspect: 'Startup Time', containers: 9, vms: 3 },
    { aspect: 'Resource Usage', containers: 8, vms: 4 },
    { aspect: 'Isolation', containers: 6, vms: 9 },
    { aspect: 'Portability', containers: 9, vms: 5 },
    { aspect: 'Security', containers: 6, vms: 8 },
    { aspect: 'Management', containers: 7, vms: 6 }
  ]

  const cloudProviders = [
    { provider: 'AWS', market_share: 32, color: '#ff9900' },
    { provider: 'Microsoft Azure', market_share: 23, color: '#0078d4' },
    { provider: 'Google Cloud', market_share: 10, color: '#4285f4' },
    { provider: 'Alibaba Cloud', market_share: 6, color: '#ff6a00' },
    { provider: 'Others', market_share: 29, color: '#6b7280' }
  ]

  const infrastructureMetrics = [
    { month: 'Jan', cpuUsage: 65, memoryUsage: 70, networkIO: 80, storageUsage: 45 },
    { month: 'Feb', cpuUsage: 72, memoryUsage: 75, networkIO: 85, storageUsage: 50 },
    { month: 'Mar', cpuUsage: 68, memoryUsage: 78, networkIO: 90, storageUsage: 55 },
    { month: 'Apr', cpuUsage: 75, memoryUsage: 80, networkIO: 95, storageUsage: 60 },
    { month: 'May', cpuUsage: 70, memoryUsage: 82, networkIO: 88, storageUsage: 65 },
    { month: 'Jun', cpuUsage: 73, memoryUsage: 85, networkIO: 92, storageUsage: 70 }
  ]

  const kubernetesComponents = [
    { component: 'API Server', status: 'healthy', replicas: 3, version: '1.28.2' },
    { component: 'etcd', status: 'healthy', replicas: 3, version: '3.5.9' },
    { component: 'Controller Manager', status: 'healthy', replicas: 2, version: '1.28.2' },
    { component: 'Scheduler', status: 'healthy', replicas: 2, version: '1.28.2' },
    { component: 'kubelet', status: 'healthy', replicas: 12, version: '1.28.2' },
    { component: 'kube-proxy', status: 'healthy', replicas: 12, version: '1.28.2' }
  ]

  const edgeLocations = [
    { region: 'North America', locations: 45, latency: 15, traffic: 35 },
    { region: 'Europe', locations: 38, latency: 12, traffic: 28 },
    { region: 'Asia Pacific', locations: 42, latency: 18, traffic: 25 },
    { region: 'South America', locations: 15, latency: 25, traffic: 8 },
    { region: 'Africa', locations: 12, latency: 30, traffic: 4 }
  ]

  const iacTools = [
    { tool: 'Terraform', usage: 65, maturity: 'High', provider: 'HashiCorp' },
    { tool: 'AWS CloudFormation', usage: 45, maturity: 'High', provider: 'AWS' },
    { tool: 'Pulumi', usage: 25, maturity: 'Medium', provider: 'Pulumi' },
    { tool: 'Azure ARM', usage: 35, maturity: 'High', provider: 'Microsoft' },
    { tool: 'Google Cloud Deployment Manager', usage: 20, maturity: 'Medium', provider: 'Google' }
  ]

  // Auto-scaling simulation
  useEffect(() => {
    if (autoScalingEnabled && kubernetesEnabled) {
      const interval = setInterval(() => {
        // Simulate CPU load fluctuations
        setCpuLoad(prev => {
          const fluctuation = (Math.random() - 0.5) * 20
          return Math.max(20, Math.min(100, prev + fluctuation))
        })

        // Calculate target replicas based on CPU load
        setTargetReplicas(prev => {
          const currentCpu = cpuLoad
          let newTarget = prev
          
          if (currentCpu > autoscaleMetrics.targetCpu && prev < autoscaleMetrics.maxReplicas) {
            newTarget = Math.min(autoscaleMetrics.maxReplicas, prev + 1)
            setAutoscaleMetrics(m => ({ ...m, scalingEvents: m.scalingEvents + 1 }))
          } else if (currentCpu < autoscaleMetrics.targetCpu * 0.6 && prev > autoscaleMetrics.minReplicas) {
            newTarget = Math.max(autoscaleMetrics.minReplicas, prev - 1)
            setAutoscaleMetrics(m => ({ ...m, scalingEvents: m.scalingEvents + 1 }))
          }
          
          return newTarget
        })

        // Update autoscale metrics
        setAutoscaleMetrics(prev => ({
          ...prev,
          currentCpu: cpuLoad
        }))
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [autoScalingEnabled, kubernetesEnabled, cpuLoad, autoscaleMetrics.targetCpu, autoscaleMetrics.maxReplicas, autoscaleMetrics.minReplicas])

  // Update replicas when auto-scaling is enabled
  useEffect(() => {
    if (autoScalingEnabled) {
      setReplicas([targetReplicas])
    }
  }, [targetReplicas, autoScalingEnabled])

  const KubernetesClusterVisualization = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch
            checked={kubernetesEnabled}
            onCheckedChange={setKubernetesEnabled}
          />
          <label>Kubernetes Cluster Active</label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={autoScalingEnabled}
            onCheckedChange={setAutoScalingEnabled}
          />
          <label>Auto-scaling (HPA)</label>
        </div>
      </div>

      {kubernetesEnabled && (
        <div className="space-y-6">
          {/* Auto-scaling Status */}
          {autoScalingEnabled && (
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <h4 className="mb-3">Horizontal Pod Autoscaler Status</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{cpuLoad.toFixed(0)}%</div>
                  <div className="text-sm text-muted-foreground">Current CPU</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{autoscaleMetrics.targetCpu}%</div>
                  <div className="text-sm text-muted-foreground">Target CPU</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{targetReplicas}</div>
                  <div className="text-sm text-muted-foreground">Target Replicas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{autoscaleMetrics.scalingEvents}</div>
                  <div className="text-sm text-muted-foreground">Scaling Events</div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>CPU Utilization</span>
                  <span>{cpuLoad.toFixed(0)}% / {autoscaleMetrics.targetCpu}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      cpuLoad > autoscaleMetrics.targetCpu ? 'bg-red-600' : 
                      cpuLoad > autoscaleMetrics.targetCpu * 0.8 ? 'bg-yellow-600' : 'bg-green-600'
                    }`}
                    style={{ width: `${Math.min(100, cpuLoad)}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-3 text-sm text-muted-foreground">
                <div>• Min Replicas: {autoscaleMetrics.minReplicas} | Max Replicas: {autoscaleMetrics.maxReplicas}</div>
                <div>• Scale Up: CPU &gt; {autoscaleMetrics.targetCpu}% | Scale Down: CPU &lt; {(autoscaleMetrics.targetCpu * 0.6).toFixed(0)}%</div>
                {cpuLoad > autoscaleMetrics.targetCpu && targetReplicas < autoscaleMetrics.maxReplicas && (
                  <div className="text-orange-600 mt-1">🔼 Scaling up due to high CPU usage</div>
                )}
                {cpuLoad < autoscaleMetrics.targetCpu * 0.6 && targetReplicas > autoscaleMetrics.minReplicas && (
                  <div className="text-blue-600 mt-1">🔽 Scaling down due to low CPU usage</div>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Master Nodes */}
            <div className="p-4 border rounded-lg">
              <h4 className="mb-3 text-center">Control Plane</h4>
              <div className="space-y-2">
                {['API Server', 'etcd', 'Scheduler'].map((component, index) => (
                  <div key={component} className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-950 rounded">
                    <span className="text-sm">{component}</span>
                    <Badge variant="secondary">Running</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Worker Nodes */}
            <div className="p-4 border rounded-lg">
              <h4 className="mb-3 text-center">Worker Nodes</h4>
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="p-2 bg-green-50 dark:bg-green-950 rounded text-center">
                    <Server className="w-4 h-4 mx-auto mb-1" />
                    <span className="text-xs">Node {i + 1}</span>
                    <div className="text-xs text-muted-foreground mt-1">
                      {Math.floor(cpuLoad + (Math.random() - 0.5) * 20).toFixed(0)}% CPU
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pods */}
            <div className="p-4 border rounded-lg">
              <h4 className="mb-3 text-center">Pods</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm">
                    {autoScalingEnabled ? `Auto-scaling: ${replicas[0]} pods` : `Manual: ${replicas[0]} pods`}
                  </label>
                  {!autoScalingEnabled && (
                    <Slider
                      value={replicas}
                      onValueChange={setReplicas}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full mt-1"
                    />
                  )}
                  {autoScalingEnabled && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      Managed by HPA ({autoscaleMetrics.minReplicas}-{autoscaleMetrics.maxReplicas} range)
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {Array.from({ length: replicas[0] }, (_, i) => (
                    <div 
                      key={i} 
                      className={`p-1 rounded text-center transition-all duration-300 ${
                        i < targetReplicas ? 'bg-purple-50 dark:bg-purple-950' : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                    >
                      <Box className="w-3 h-3 mx-auto" />
                      <span className="text-xs">Pod {i + 1}</span>
                      {autoScalingEnabled && (
                        <div className="text-xs text-muted-foreground">
                          {(cpuLoad + (Math.random() - 0.5) * 15).toFixed(0)}%
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {['rolling', 'blue-green', 'canary'].map((type) => (
              <Button
                key={type}
                variant={deploymentType === type ? 'default' : 'outline'}
                onClick={() => setDeploymentType(type)}
                className="capitalize"
              >
                {type.replace('-', ' ')} Deployment
              </Button>
            ))}
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <h5 className="font-medium mb-2">Current Deployment Strategy: {deploymentType.replace('-', ' ')}</h5>
            <p className="text-sm text-muted-foreground">
              {deploymentType === 'rolling' && 'Gradually replace old pods with new ones with zero downtime'}
              {deploymentType === 'blue-green' && 'Switch traffic between two identical environments'}
              {deploymentType === 'canary' && 'Route small percentage of traffic to new version first'}
            </p>
          </div>
        </div>
      )}
    </div>
  )

  const ContainerArchitecture = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h4 className="mb-4 text-center">Container Architecture</h4>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Box className="w-4 h-4" />
                <span className="text-sm font-medium">Application Layer</span>
              </div>
              <div className="text-xs text-muted-foreground">Your application code and dependencies</div>
            </div>
            
            <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4" />
                <span className="text-sm font-medium">Container Runtime</span>
              </div>
              <div className="text-xs text-muted-foreground">Docker, containerd, CRI-O</div>
            </div>
            
            <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-4 h-4" />
                <span className="text-sm font-medium">Host OS Kernel</span>
              </div>
              <div className="text-xs text-muted-foreground">Shared kernel with isolation</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="mb-4 text-center">Virtual Machine Architecture</h4>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Box className="w-4 h-4" />
                <span className="text-sm font-medium">Application Layer</span>
              </div>
              <div className="text-xs text-muted-foreground">Your application code and dependencies</div>
            </div>
            
            <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-4 h-4" />
                <span className="text-sm font-medium">Guest OS</span>
              </div>
              <div className="text-xs text-muted-foreground">Full operating system per VM</div>
            </div>
            
            <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4" />
                <span className="text-sm font-medium">Hypervisor</span>
              </div>
              <div className="text-xs text-muted-foreground">VMware, Hyper-V, KVM</div>
            </div>
            
            <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-4 h-4" />
                <span className="text-sm font-medium">Host OS</span>
              </div>
              <div className="text-xs text-muted-foreground">Physical machine operating system</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <GlobalWarning />
      <div className="mb-8">
        <h1 className="mb-4">Cloud & Infrastructure</h1>
        <p className="text-muted-foreground">
          Learn about containers, orchestration, Infrastructure as Code, edge computing, and modern cloud deployment patterns.
        </p>
      </div>

      <Tabs defaultValue="containers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="containers">Containers</TabsTrigger>
          <TabsTrigger value="kubernetes">Kubernetes</TabsTrigger>
          <TabsTrigger value="iac">Infrastructure as Code</TabsTrigger>
          <TabsTrigger value="edge">Edge Computing</TabsTrigger>
          <TabsTrigger value="cloud">Cloud Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="containers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Containers vs Virtual Machines</CardTitle>
              <CardDescription>
                Compare containerization and virtualization approaches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={containerVsVm}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="aspect" />
                      <PolarRadiusAxis angle={30} domain={[0, 10]} />
                      <Radar name="Containers" dataKey="containers" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                      <Radar name="Virtual Machines" dataKey="vms" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                
                <ContainerArchitecture />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Container Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="text-sm font-medium">Lightweight</h5>
                      <p className="text-xs text-muted-foreground">Share host OS kernel, minimal overhead</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="text-sm font-medium">Fast Startup</h5>
                      <p className="text-xs text-muted-foreground">Start in seconds vs minutes for VMs</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="text-sm font-medium">Portable</h5>
                      <p className="text-xs text-muted-foreground">Run anywhere Docker is supported</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="text-sm font-medium">Scalable</h5>
                      <p className="text-xs text-muted-foreground">Easy horizontal scaling</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Container Ecosystem</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Container Runtimes</h5>
                    <div className="text-sm text-muted-foreground mt-1">
                      Docker, containerd, CRI-O, runc
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Image Registries</h5>
                    <div className="text-sm text-muted-foreground mt-1">
                      Docker Hub, ECR, GCR, ACR, Harbor
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Orchestration</h5>
                    <div className="text-sm text-muted-foreground mt-1">
                      Kubernetes, Docker Swarm, Nomad
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Security Scanning</h5>
                    <div className="text-sm text-muted-foreground mt-1">
                      Clair, Trivy, Anchore, Snyk
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Container Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-3 text-green-600 dark:text-green-400">Do</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Use multi-stage builds</li>
                    <li>• Keep images small and minimal</li>
                    <li>• Run as non-root user</li>
                    <li>• Use specific version tags</li>
                    <li>• Scan for vulnerabilities</li>
                    <li>• Use .dockerignore file</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="mb-3 text-red-600 dark:text-red-400">Don't</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Store secrets in images</li>
                    <li>• Use 'latest' tag in production</li>
                    <li>• Install unnecessary packages</li>
                    <li>• Run multiple processes per container</li>
                    <li>• Ignore image layer caching</li>
                    <li>• Hardcode configuration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kubernetes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kubernetes Cluster Management</CardTitle>
              <CardDescription>
                Interactive Kubernetes cluster with auto-scaling and deployment strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <KubernetesClusterVisualization />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kubernetes Components Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Replicas</TableHead>
                    <TableHead>Version</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kubernetesComponents.map((component, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{component.component}</TableCell>
                      <TableCell>
                        <Badge variant={component.status === 'healthy' ? 'secondary' : 'destructive'}>
                          {component.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{component.replicas}</TableCell>
                      <TableCell>{component.version}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Kubernetes Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h5 className="font-medium text-blue-800 dark:text-blue-200">Control Plane</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• API Server: Central management</li>
                      <li>• etcd: Cluster state storage</li>
                      <li>• Scheduler: Pod placement</li>
                      <li>• Controller Manager: Desired state</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h5 className="font-medium text-green-800 dark:text-green-200">Worker Nodes</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• kubelet: Node agent</li>
                      <li>• kube-proxy: Network proxy</li>
                      <li>• Container Runtime: Run containers</li>
                      <li>• Pods: Smallest deployable units</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kubernetes Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Workloads</h5>
                    <div className="text-sm text-muted-foreground mt-1">
                      Deployment, StatefulSet, DaemonSet, Job, CronJob
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Networking</h5>
                    <div className="text-sm text-muted-foreground mt-1">
                      Service, Ingress, NetworkPolicy, EndpointSlice
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Storage</h5>
                    <div className="text-sm text-muted-foreground mt-1">
                      PersistentVolume, PersistentVolumeClaim, StorageClass
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Configuration</h5>
                    <div className="text-sm text-muted-foreground mt-1">
                      ConfigMap, Secret, ServiceAccount
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Deployment Strategies Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Strategy</TableHead>
                    <TableHead>Downtime</TableHead>
                    <TableHead>Resource Usage</TableHead>
                    <TableHead>Rollback Speed</TableHead>
                    <TableHead>Risk Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Rolling Update</TableCell>
                    <TableCell><Badge variant="secondary">Zero</Badge></TableCell>
                    <TableCell><Badge variant="outline">Low</Badge></TableCell>
                    <TableCell><Badge variant="outline">Medium</Badge></TableCell>
                    <TableCell><Badge variant="outline">Medium</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Blue-Green</TableCell>
                    <TableCell><Badge variant="secondary">Zero</Badge></TableCell>
                    <TableCell><Badge variant="destructive">High</Badge></TableCell>
                    <TableCell><Badge variant="default">Fast</Badge></TableCell>
                    <TableCell><Badge variant="outline">Low</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Canary</TableCell>
                    <TableCell><Badge variant="secondary">Zero</Badge></TableCell>
                    <TableCell><Badge variant="outline">Medium</Badge></TableCell>
                    <TableCell><Badge variant="default">Fast</Badge></TableCell>
                    <TableCell><Badge variant="secondary">Very Low</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Recreate</TableCell>
                    <TableCell><Badge variant="destructive">High</Badge></TableCell>
                    <TableCell><Badge variant="secondary">Low</Badge></TableCell>
                    <TableCell><Badge variant="outline">Medium</Badge></TableCell>
                    <TableCell><Badge variant="destructive">High</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="iac" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Infrastructure as Code Tools</CardTitle>
              <CardDescription>
                Popular IaC tools and their usage in the industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {iacTools.map((tool, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{tool.tool}</h4>
                      <div className="flex gap-2">
                        <Badge variant="outline">{tool.provider}</Badge>
                        <Badge variant={
                          tool.maturity === 'High' ? 'default' : 
                          tool.maturity === 'Medium' ? 'outline' : 'secondary'
                        }>
                          {tool.maturity} Maturity
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${tool.usage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-muted-foreground">{tool.usage}% industry adoption</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>IaC Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="text-sm font-medium">Version Control</h5>
                      <p className="text-xs text-muted-foreground">Track infrastructure changes over time</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="text-sm font-medium">Repeatability</h5>
                      <p className="text-xs text-muted-foreground">Consistent deployments across environments</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="text-sm font-medium">Automation</h5>
                      <p className="text-xs text-muted-foreground">Reduce manual configuration errors</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="text-sm font-medium">Cost Management</h5>
                      <p className="text-xs text-muted-foreground">Better resource allocation and cleanup</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>IaC Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Modular Design</h5>
                    <p className="text-sm text-muted-foreground">Break infrastructure into reusable modules</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">State Management</h5>
                    <p className="text-sm text-muted-foreground">Use remote state with locking</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Environment Separation</h5>
                    <p className="text-sm text-muted-foreground">Isolate dev, staging, and production</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Testing</h5>
                    <p className="text-sm text-muted-foreground">Validate infrastructure before deployment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Terraform Example Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h5 className="font-medium mb-2">Provider Configuration</h5>
                  <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket = "my-terraform-state"
    key    = "infrastructure/terraform.tfstate"
    region = "us-west-2"
  }
}`}
                  </pre>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h5 className="font-medium mb-2">Resource Definition</h5>
                  <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`resource "aws_instance" "web" {
  ami           = var.ami_id
  instance_type = var.instance_type
  
  vpc_security_group_ids = [aws_security_group.web.id]
  subnet_id              = aws_subnet.public.id
  
  tags = {
    Name        = "web-server"
    Environment = var.environment
  }
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Edge Network</CardTitle>
              <CardDescription>
                Edge computing locations and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={edgeLocations} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="region" 
                        angle={-45}
                        textAnchor="end"
                        height={60}
                        interval={0}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="locations" fill="#8884d8" name="Edge Locations" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">152</div>
                    <div className="text-sm text-muted-foreground">Total Edge Locations</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">18ms</div>
                    <div className="text-sm text-muted-foreground">Average Latency</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">95%</div>
                    <div className="text-sm text-muted-foreground">Cache Hit Rate</div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Edge Computing Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Content Delivery
                    </h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Static assets, images, videos closer to users
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      IoT Processing
                    </h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Real-time data processing for connected devices
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      Gaming & AR/VR
                    </h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Low-latency interactive applications
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Security & DDoS Protection
                    </h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Filter malicious traffic at the edge
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Edge vs Cloud vs On-Premise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h5 className="font-medium text-blue-800 dark:text-blue-200">Edge Computing</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Ultra-low latency (&lt; 10ms)</li>
                      <li>• Limited compute resources</li>
                      <li>• Geographic distribution</li>
                      <li>• Real-time processing</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h5 className="font-medium text-green-800 dark:text-green-200">Cloud Computing</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Scalable resources</li>
                      <li>• Cost-effective</li>
                      <li>• Global reach</li>
                      <li>• Managed services</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <h5 className="font-medium text-purple-800 dark:text-purple-200">On-Premise</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Full control</li>
                      <li>• Data sovereignty</li>
                      <li>• Compliance requirements</li>
                      <li>• High initial costs</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Edge Computing Metrics by Region</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region</TableHead>
                    <TableHead>Edge Locations</TableHead>
                    <TableHead>Avg Latency (ms)</TableHead>
                    <TableHead>Traffic Share (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {edgeLocations.map((location, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{location.region}</TableCell>
                      <TableCell>{location.locations}</TableCell>
                      <TableCell>{location.latency}</TableCell>
                      <TableCell>{location.traffic}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cloud" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cloud Provider Market Share</CardTitle>
              <CardDescription>
                Global cloud infrastructure market distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={cloudProviders}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="market_share"
                        label={({ provider, market_share }) => `${provider}: ${market_share}%`}
                      >
                        {cloudProviders.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-3">
                  {cloudProviders.map((provider, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{provider.provider}</h4>
                        <span className="text-sm font-medium">{provider.market_share}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${provider.market_share}%`,
                            backgroundColor: provider.color
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Infrastructure Utilization Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={infrastructureMetrics} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                    <Line type="monotone" dataKey="cpuUsage" stroke="#8884d8" name="CPU Usage" strokeWidth={2} />
                    <Line type="monotone" dataKey="memoryUsage" stroke="#82ca9d" name="Memory Usage" strokeWidth={2} />
                    <Line type="monotone" dataKey="networkIO" stroke="#ffc658" name="Network I/O" strokeWidth={2} />
                    <Line type="monotone" dataKey="storageUsage" stroke="#ff7300" name="Storage Usage" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Multi-Cloud Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h5 className="font-medium text-green-800 dark:text-green-200">Benefits</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Avoid vendor lock-in</li>
                      <li>• Best-of-breed services</li>
                      <li>• Geographic coverage</li>
                      <li>• Risk distribution</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                    <h5 className="font-medium text-red-800 dark:text-red-200">Challenges</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Increased complexity</li>
                      <li>• Data transfer costs</li>
                      <li>• Skill requirements</li>
                      <li>• Management overhead</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cloud Deployment Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Public Cloud</h5>
                    <p className="text-sm text-muted-foreground">
                      Shared infrastructure, pay-as-you-go, managed by provider
                    </p>
                    <Badge variant="outline" className="mt-1">AWS, Azure, GCP</Badge>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Private Cloud</h5>
                    <p className="text-sm text-muted-foreground">
                      Dedicated infrastructure, on-premise or hosted
                    </p>
                    <Badge variant="outline" className="mt-1">VMware, OpenStack</Badge>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Hybrid Cloud</h5>
                    <p className="text-sm text-muted-foreground">
                      Combination of public and private clouds
                    </p>
                    <Badge variant="outline" className="mt-1">Best of both worlds</Badge>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Multi-Cloud</h5>
                    <p className="text-sm text-muted-foreground">
                      Multiple public cloud providers
                    </p>
                    <Badge variant="outline" className="mt-1">Avoid vendor lock-in</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cloud Service Models</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <Cloud className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                  <h4 className="mb-2">IaaS</h4>
                  <p className="text-sm text-muted-foreground mb-3">Infrastructure as a Service</p>
                  <ul className="text-xs space-y-1">
                    <li>Virtual machines</li>
                    <li>Storage</li>
                    <li>Networking</li>
                  </ul>
                  <Badge variant="outline" className="mt-2">EC2, Compute Engine</Badge>
                </div>
                
                <div className="p-4 border rounded-lg text-center">
                  <Layers className="w-8 h-8 mx-auto mb-3 text-green-500" />
                  <h4 className="mb-2">PaaS</h4>
                  <p className="text-sm text-muted-foreground mb-3">Platform as a Service</p>
                  <ul className="text-xs space-y-1">
                    <li>Runtime environment</li>
                    <li>Development tools</li>
                    <li>Database services</li>
                  </ul>
                  <Badge variant="outline" className="mt-2">Heroku, App Engine</Badge>
                </div>
                
                <div className="p-4 border rounded-lg text-center">
                  <Settings className="w-8 h-8 mx-auto mb-3 text-purple-500" />
                  <h4 className="mb-2">SaaS</h4>
                  <p className="text-sm text-muted-foreground mb-3">Software as a Service</p>
                  <ul className="text-xs space-y-1">
                    <li>Complete applications</li>
                    <li>No infrastructure management</li>
                    <li>Pay per user/usage</li>
                  </ul>
                  <Badge variant="outline" className="mt-2">Gmail, Salesforce</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}