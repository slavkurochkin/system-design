import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter } from 'recharts'
import { GitBranch, Clock, Hash, Network, Zap, Users, CheckCircle, AlertCircle } from 'lucide-react'
import { RaftVisualization } from './visualizations/RaftVisualization'
import { ConsistentHashingVisualization } from './visualizations/ConsistentHashingVisualization'
import { GlobalWarning } from './GlobalWarning'
import { 
  consensusComparison, 
  hashingPerformance, 
  crdtTypes, 
  vectorClockExample, 
  distributedPatterns,
  capTheoremExamples 
} from './data/advancedTopicsData'

export function AdvancedTopics() {
  const [consensusAlgorithm, setConsensusAlgorithm] = useState('raft')
  const [clusterSize, setClusterSize] = useState([5])
  const [hashingEnabled, setHashingEnabled] = useState(true)

  return (
    <div className="space-y-6">
      <GlobalWarning />
      <div className="mb-8">
        <h1 className="mb-4">Advanced Topics</h1>
        <p className="text-muted-foreground">
          Explore advanced distributed systems concepts including consensus algorithms, consistent hashing, CRDTs, and cutting-edge patterns.
        </p>
      </div>

      <Tabs defaultValue="consensus" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="consensus">Consensus</TabsTrigger>
          <TabsTrigger value="hashing">Consistent Hashing</TabsTrigger>
          <TabsTrigger value="crdts">CRDTs</TabsTrigger>
          <TabsTrigger value="clocks">Vector Clocks</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="theory">Theory</TabsTrigger>
        </TabsList>

        <TabsContent value="consensus" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Distributed Consensus Algorithms</CardTitle>
              <CardDescription>
                Interactive comparison of consensus algorithms in distributed systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-2 flex-wrap">
                  {['raft', 'pbft', 'paxos'].map((algorithm) => (
                    <Button
                      key={algorithm}
                      variant={consensusAlgorithm === algorithm ? 'default' : 'outline'}
                      onClick={() => setConsensusAlgorithm(algorithm)}
                      className="capitalize"
                    >
                      {algorithm.toUpperCase()}
                    </Button>
                  ))}
                </div>
                
                {consensusAlgorithm === 'raft' && (
                  <RaftVisualization 
                    clusterSize={clusterSize} 
                    onClusterSizeChange={setClusterSize} 
                  />
                )}
                
                <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={consensusComparison} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="algorithm" 
                        angle={-45}
                        textAnchor="end"
                        height={60}
                        interval={0}
                      />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Bar dataKey="consistency" fill="#8884d8" name="Consistency" />
                      <Bar dataKey="availability" fill="#82ca9d" name="Availability" />
                      <Bar dataKey="partition_tolerance" fill="#ffc658" name="Partition Tolerance" />
                      <Bar dataKey="complexity" fill="#ff7300" name="Implementation Complexity" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Consensus Algorithm Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Raft
                    </h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Understandable algorithm</li>
                      <li>• Strong leader model</li>
                      <li>• Log-based replication</li>
                      <li>• Good for consistent systems</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      PBFT (Practical Byzantine Fault Tolerance)
                    </h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Tolerates malicious nodes</li>
                      <li>• 3f+1 nodes for f failures</li>
                      <li>• High message complexity</li>
                      <li>• Blockchain applications</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium flex items-center gap-2">
                      <Network className="w-4 h-4 text-blue-500" />
                      Paxos
                    </h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Theoretical foundation</li>
                      <li>• Complex to implement</li>
                      <li>• Multi-Paxos optimization</li>
                      <li>• Google Chubby, Spanner</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>When to Use Each Algorithm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h5 className="font-medium text-green-800 dark:text-green-200">Raft - Choose When:</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Need understandable consensus</li>
                      <li>• Trust network participants</li>
                      <li>• Strong consistency required</li>
                      <li>• Building distributed databases</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                    <h5 className="font-medium text-yellow-800 dark:text-yellow-200">PBFT - Choose When:</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Untrusted network environment</li>
                      <li>• Blockchain/cryptocurrency</li>
                      <li>• Byzantine failures possible</li>
                      <li>• Security is paramount</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h5 className="font-medium text-blue-800 dark:text-blue-200">Paxos - Choose When:</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Academic correctness needed</li>
                      <li>• Building from scratch</li>
                      <li>• Custom optimizations required</li>
                      <li>• Long-term research project</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hashing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Consistent Hashing</CardTitle>
              <CardDescription>
                Visualize how consistent hashing distributes data across nodes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ConsistentHashingVisualization 
                hashingEnabled={hashingEnabled}
                onHashingToggle={setHashingEnabled}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Consistent Hashing Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hashingPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nodes" label={{ value: 'Number of Nodes', position: 'insideBottom', offset: -10 }} />
                    <YAxis label={{ value: 'Performance %', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="rebalancing" stroke="#8884d8" name="Rebalancing Efficiency" strokeWidth={2} />
                    <Line type="monotone" dataKey="lookups" stroke="#82ca9d" name="Lookup Performance" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traditional vs Consistent Hashing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                    <h5 className="font-medium text-red-800 dark:text-red-200">Traditional Hashing</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• hash(key) % N</li>
                      <li>• Adding/removing nodes reshuffles all data</li>
                      <li>• O(N) rebalancing cost</li>
                      <li>• Simple but not scalable</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h5 className="font-medium text-green-800 dark:text-green-200">Consistent Hashing</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Hash ring with virtual nodes</li>
                      <li>• Only affected keys need rebalancing</li>
                      <li>• O(K/N) rebalancing cost</li>
                      <li>• Scalable and fault-tolerant</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Distributed Caches</h5>
                    <p className="text-sm text-muted-foreground">Memcached, Redis clusters</p>
                    <Badge variant="outline" className="mt-1">Data Distribution</Badge>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">NoSQL Databases</h5>
                    <p className="text-sm text-muted-foreground">Cassandra, DynamoDB</p>
                    <Badge variant="outline" className="mt-1">Partitioning</Badge>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Content Delivery</h5>
                    <p className="text-sm text-muted-foreground">CDN edge server selection</p>
                    <Badge variant="outline" className="mt-1">Load Balancing</Badge>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Peer-to-Peer Systems</h5>
                    <p className="text-sm text-muted-foreground">BitTorrent, Chord DHT</p>
                    <Badge variant="outline" className="mt-1">Resource Location</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="crdts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conflict-Free Replicated Data Types (CRDTs)</CardTitle>
              <CardDescription>
                Data structures that automatically resolve conflicts in distributed systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>CRDT Type</TableHead>
                    <TableHead>Convergence</TableHead>
                    <TableHead>Operations</TableHead>
                    <TableHead>Use Case</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {crdtTypes.map((crdt, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{crdt.type}</TableCell>
                      <TableCell>
                        <Badge variant={crdt.convergence === 'Strong' ? 'default' : 'outline'}>
                          {crdt.convergence}
                        </Badge>
                      </TableCell>
                      <TableCell>{crdt.operations.join(', ')}</TableCell>
                      <TableCell>{crdt.use_case}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>State-based vs Operation-based CRDTs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h5 className="font-medium text-blue-800 dark:text-blue-200">State-based (CvRDT)</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Merge entire states</li>
                      <li>• Commutative, associative, idempotent</li>
                      <li>• Higher bandwidth requirements</li>
                      <li>• Simpler implementation</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h5 className="font-medium text-green-800 dark:text-green-200">Operation-based (CmRDT)</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Propagate operations</li>
                      <li>• Commutative operations</li>
                      <li>• Lower bandwidth</li>
                      <li>• Requires reliable broadcast</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CRDT Examples in Practice</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Google Docs</h5>
                    <p className="text-sm text-muted-foreground">Operational Transform (similar to CRDTs)</p>
                    <Badge variant="outline" className="mt-1">Collaborative Editing</Badge>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Redis</h5>
                    <p className="text-sm text-muted-foreground">HyperLogLog for cardinality estimation</p>
                    <Badge variant="outline" className="mt-1">Approximate Counting</Badge>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Riak</h5>
                    <p className="text-sm text-muted-foreground">Various CRDTs for distributed data</p>
                    <Badge variant="outline" className="mt-1">Distributed Database</Badge>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Figma</h5>
                    <p className="text-sm text-muted-foreground">Real-time collaborative design</p>
                    <Badge variant="outline" className="mt-1">Design Tools</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clocks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vector Clocks</CardTitle>
              <CardDescription>
                Logical clocks for ordering events in distributed systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h5 className="font-medium mb-3">Vector Clock Example</h5>
                  <div className="space-y-4">
                    {vectorClockExample.map((nodeData, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <h6 className="font-medium mb-2">Node {nodeData.node}</h6>
                        <div className="space-y-2">
                          {nodeData.events.map((event, eventIndex) => (
                            <div key={eventIndex} className="flex justify-between items-center text-sm">
                              <span>{event.event}</span>
                              <Badge variant="outline">{event.clock}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Vector Clock Properties</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Each process maintains a vector of logical clocks</li>
                      <li>• Increment own clock on local events</li>
                      <li>• Update vector on message receive</li>
                      <li>• Enables partial ordering of events</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Use Cases</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Distributed version control (Git)</li>
                      <li>• Conflict detection in replicated data</li>
                      <li>• Causal consistency protocols</li>
                      <li>• Distributed debugging</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Distributed Patterns</CardTitle>
              <CardDescription>
                Compare complexity, scalability, and consistency of different patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={distributedPatterns} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="complexity" name="Complexity" label={{ value: 'Complexity', position: 'insideBottom', offset: -10 }} />
                    <YAxis dataKey="scalability" name="Scalability" label={{ value: 'Scalability', angle: -90, position: 'insideLeft' }} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} 
                      formatter={(value, name) => [value, name]}
                      labelFormatter={(label) => `Pattern: ${distributedPatterns.find(p => p.complexity === label)?.pattern || ''}`}
                    />
                    <Scatter dataKey="scalability" fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Sourcing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Store events instead of current state, replay to reconstruct state
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm"><strong>Benefits:</strong> Complete audit trail, temporal queries, replay capability</div>
                    <div className="text-sm"><strong>Drawbacks:</strong> Event schema evolution, storage growth, complexity</div>
                    <div className="text-sm"><strong>Use cases:</strong> Financial systems, audit requirements, CQRS</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Saga Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Manage distributed transactions through compensating actions
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm"><strong>Types:</strong> Choreography vs Orchestration</div>
                    <div className="text-sm"><strong>Benefits:</strong> No distributed locks, loosely coupled</div>
                    <div className="text-sm"><strong>Drawbacks:</strong> Complex error handling, eventual consistency</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="theory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CAP Theorem in Practice</CardTitle>
              <CardDescription>
                Real-world systems and their CAP theorem trade-offs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>System</TableHead>
                    <TableHead>Consistency</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Partition Tolerance</TableHead>
                    <TableHead>Trade-off</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {capTheoremExamples.map((system, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{system.system}</TableCell>
                      <TableCell>{system.consistency}</TableCell>
                      <TableCell>{system.availability}</TableCell>
                      <TableCell>{system.partition_tolerance}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{system.trade_off}</Badge>
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
                <CardTitle>Distributed Systems Fallacies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                    <h5 className="font-medium text-red-800 dark:text-red-200">Common Misconceptions</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• The network is reliable</li>
                      <li>• Latency is zero</li>
                      <li>• Bandwidth is infinite</li>
                      <li>• The network is secure</li>
                      <li>• Topology doesn't change</li>
                      <li>• There is one administrator</li>
                      <li>• Transport cost is zero</li>
                      <li>• The network is homogeneous</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ACID vs BASE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h5 className="font-medium text-blue-800 dark:text-blue-200">ACID Properties</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• <strong>Atomicity:</strong> All or nothing</li>
                      <li>• <strong>Consistency:</strong> Valid state transitions</li>
                      <li>• <strong>Isolation:</strong> Concurrent execution appears sequential</li>
                      <li>• <strong>Durability:</strong> Committed changes persist</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h5 className="font-medium text-green-800 dark:text-green-200">BASE Properties</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• <strong>Basically Available:</strong> System remains operational</li>
                      <li>• <strong>Soft state:</strong> State may change over time</li>
                      <li>• <strong>Eventual consistency:</strong> System becomes consistent eventually</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}