import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { Database, Layers, GitBranch, Shield, Clock, Zap, CheckCircle } from 'lucide-react'
import { Switch } from './ui/switch'
import { GlobalWarning } from './GlobalWarning'

export function DatabasesStorage() {
  const [capSelection, setCAPSelection] = useState({ consistency: false, availability: false, partitionTolerance: false })
  const [selectedModel, setSelectedModel] = useState('sql')

  const dbComparison = [
    {
      feature: 'Schema',
      SQL: 'Fixed, predefined',
      NoSQL: 'Flexible, dynamic',
      NewSQL: 'Hybrid approach'
    },
    {
      feature: 'ACID',
      SQL: 'Full ACID compliance',
      NoSQL: 'Eventually consistent',
      NewSQL: 'ACID + scalability'
    },
    {
      feature: 'Scalability',
      SQL: 'Vertical (scale up)',
      NoSQL: 'Horizontal (scale out)',
      NewSQL: 'Both horizontal & vertical'
    },
    {
      feature: 'Query Language',
      SQL: 'SQL standard',
      NoSQL: 'Varies by database',
      NewSQL: 'SQL + extensions'
    },
    {
      feature: 'Use Cases',
      SQL: 'Complex queries, transactions',
      NoSQL: 'Big data, rapid development',
      NewSQL: 'High-scale OLTP'
    }
  ]

  const performanceData = [
    { operation: 'Read', SQL: 1000, NoSQL: 10000, NewSQL: 5000 },
    { operation: 'Write', SQL: 800, NoSQL: 8000, NewSQL: 4000 },
    { operation: 'Complex Query', SQL: 2000, NoSQL: 500, NewSQL: 1500 }
  ]

  const consistencyModels = [
    { name: 'Strong Consistency', description: 'All reads receive the most recent write', latency: 'High', examples: 'Financial systems' },
    { name: 'Eventual Consistency', description: 'System will become consistent over time', latency: 'Low', examples: 'Social media feeds' },
    { name: 'Causal Consistency', description: 'Causally related operations are seen in order', latency: 'Medium', examples: 'Collaborative editing' },
    { name: 'Session Consistency', description: 'Consistent within a user session', latency: 'Medium', examples: 'Shopping carts' }
  ]

  const storageTypes = [
    { name: 'Block Storage', usage: 30, color: '#8884d8', description: 'Raw storage volumes' },
    { name: 'Object Storage', usage: 45, color: '#82ca9d', description: 'Scalable file storage' },
    { name: 'File Storage', usage: 25, color: '#ffc658', description: 'Network file systems' }
  ]

  const CAPTriangle = () => {
    const { consistency, availability, partitionTolerance } = capSelection
    const selectedCount = [consistency, availability, partitionTolerance].filter(Boolean).length

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center">
          <svg width="300" height="250" viewBox="0 0 300 250" className="border rounded-lg bg-muted/30">
            {/* Triangle */}
            <polygon
              points="150,30 50,200 250,200"
              fill="none"
              stroke="#666"
              strokeWidth="2"
            />
            
            {/* CAP Points */}
            <circle cx="150" cy="30" r="8" fill={consistency ? "#10b981" : "#6b7280"} />
            <circle cx="50" cy="200" r="8" fill={availability ? "#10b981" : "#6b7280"} />
            <circle cx="250" cy="200" r="8" fill={partitionTolerance ? "#10b981" : "#6b7280"} />
            
            {/* Labels */}
            <text x="150" y="20" textAnchor="middle" className="fill-current text-sm font-medium">Consistency</text>
            <text x="30" y="220" textAnchor="middle" className="fill-current text-sm font-medium">Availability</text>
            <text x="270" y="220" textAnchor="middle" className="fill-current text-sm font-medium">Partition Tolerance</text>
            
            {/* Selected region highlight */}
            {selectedCount === 2 && (
              <polygon
                points={
                  consistency && availability ? "150,30 50,200 150,115" :
                  consistency && partitionTolerance ? "150,30 250,200 150,115" :
                  availability && partitionTolerance ? "50,200 250,200 150,115" : ""
                }
                fill="rgba(16, 185, 129, 0.2)"
                stroke="#10b981"
                strokeWidth="2"
              />
            )}
          </svg>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                checked={consistency}
                onCheckedChange={(checked) => setCAPSelection(prev => ({ ...prev, consistency: checked }))}
              />
              <label>Consistency</label>
            </div>
            <p className="text-xs text-muted-foreground">All nodes see the same data simultaneously</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                checked={availability}
                onCheckedChange={(checked) => setCAPSelection(prev => ({ ...prev, availability: checked }))}
              />
              <label>Availability</label>
            </div>
            <p className="text-xs text-muted-foreground">System remains operational</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                checked={partitionTolerance}
                onCheckedChange={(checked) => setCAPSelection(prev => ({ ...prev, partitionTolerance: checked }))}
              />
              <label>Partition Tolerance</label>
            </div>
            <p className="text-xs text-muted-foreground">System continues despite network failures</p>
          </div>
        </div>
        
        {selectedCount === 2 && (
          <Card className="p-4">
            <h4 className="mb-2">System Type: {
              consistency && availability ? "CA (Traditional RDBMS)" :
              consistency && partitionTolerance ? "CP (MongoDB, Redis)" :
              availability && partitionTolerance ? "AP (Cassandra, DynamoDB)" : ""
            }</h4>
            <p className="text-sm text-muted-foreground">
              {consistency && availability ? "Choose this for systems that can't tolerate network partitions (single data center)." :
               consistency && partitionTolerance ? "Choose this when you need strong consistency and can tolerate some downtime." :
               availability && partitionTolerance ? "Choose this for systems that must remain available even during network issues." : ""}
            </p>
          </Card>
        )}
        
        {selectedCount > 2 && (
          <Card className="p-4 border-destructive">
            <p className="text-destructive">⚠️ You can only choose 2 out of 3 properties according to CAP theorem!</p>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <GlobalWarning />
      <div className="mb-8">
        <h1 className="mb-4">Databases & Storage</h1>
        <p className="text-muted-foreground">
          Learn about database types, consistency models, storage systems, and data management strategies in distributed systems.
        </p>
      </div>

      <Tabs defaultValue="databases" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="databases">Database Types</TabsTrigger>
          <TabsTrigger value="cap">CAP Theorem</TabsTrigger>
          <TabsTrigger value="consistency">Consistency</TabsTrigger>
          <TabsTrigger value="sharding">Sharding</TabsTrigger>
          <TabsTrigger value="storage">Storage Systems</TabsTrigger>
        </TabsList>

        <TabsContent value="databases" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Type Comparison</CardTitle>
              <CardDescription>
                Interactive comparison of SQL, NoSQL, and NewSQL databases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-2">
                  {['sql', 'nosql', 'newsql'].map((type) => (
                    <Button
                      key={type}
                      variant={selectedModel === type ? 'default' : 'outline'}
                      onClick={() => setSelectedModel(type)}
                      className="capitalize"
                    >
                      {type === 'newsql' ? 'NewSQL' : type === 'nosql' ? 'NoSQL' : 'SQL'}
                    </Button>
                  ))}
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
                      <TableHead>SQL</TableHead>
                      <TableHead>NoSQL</TableHead>
                      <TableHead>NewSQL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dbComparison.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.feature}</TableCell>
                        <TableCell className={selectedModel === 'sql' ? 'bg-blue-50 dark:bg-blue-950' : ''}>
                          {row.SQL}
                        </TableCell>
                        <TableCell className={selectedModel === 'nosql' ? 'bg-green-50 dark:bg-green-950' : ''}>
                          {row.NoSQL}
                        </TableCell>
                        <TableCell className={selectedModel === 'newsql' ? 'bg-purple-50 dark:bg-purple-950' : ''}>
                          {row.NewSQL}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Card className="p-4">
                  <h4 className="mb-4">Performance by Operation Type</h4>
                  <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="operation" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} ops/sec`, '']} />
                        <Bar dataKey="SQL" fill="#3b82f6" name="SQL" />
                        <Bar dataKey="NoSQL" fill="#10b981" name="NoSQL" />
                        <Bar dataKey="NewSQL" fill="#8b5cf6" name="NewSQL" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  SQL Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• MySQL</li>
                  <li>• PostgreSQL</li>
                  <li>• Oracle</li>
                  <li>• SQL Server</li>
                  <li>• SQLite</li>
                </ul>
                <Badge className="mt-3">ACID Compliant</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  NoSQL Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">Document</div>
                    <div className="text-muted-foreground">MongoDB, CouchDB</div>
                  </div>
                  <div>
                    <div className="font-medium">Key-Value</div>
                    <div className="text-muted-foreground">Redis, DynamoDB</div>
                  </div>
                  <div>
                    <div className="font-medium">Column</div>
                    <div className="text-muted-foreground">Cassandra, HBase</div>
                  </div>
                  <div>
                    <div className="font-medium">Graph</div>
                    <div className="text-muted-foreground">Neo4j, Amazon Neptune</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  NewSQL Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Google Spanner</li>
                  <li>• CockroachDB</li>
                  <li>• TiDB</li>
                  <li>• VoltDB</li>
                  <li>• FoundationDB</li>
                </ul>
                <Badge className="mt-3">Best of Both</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CAP Theorem Interactive Visualization</CardTitle>
              <CardDescription>
                Explore the trade-offs between Consistency, Availability, and Partition Tolerance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CAPTriangle />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>CA Systems</CardTitle>
                <CardDescription>Consistency + Availability</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Traditional RDBMS</li>
                  <li>• Single-node systems</li>
                  <li>• LDAP</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">
                  Works well in single data center environments where network partitions are rare.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CP Systems</CardTitle>
                <CardDescription>Consistency + Partition Tolerance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• MongoDB</li>
                  <li>• Redis</li>
                  <li>• HBase</li>
                  <li>• Zookeeper</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">
                  Ensures data consistency even during network partitions, but may become unavailable.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AP Systems</CardTitle>
                <CardDescription>Availability + Partition Tolerance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Cassandra</li>
                  <li>• DynamoDB</li>
                  <li>• CouchDB</li>
                  <li>• Riak</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">
                  Remains available during network partitions but may serve stale data.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="consistency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Consistency Models</CardTitle>
              <CardDescription>
                Understanding the spectrum of consistency guarantees in distributed systems and their trade-offs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="mb-3">What is Data Consistency?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Data consistency refers to the guarantee that all nodes in a distributed system see the same data at the same time. 
                    Different consistency models offer different guarantees, creating a spectrum from strong consistency (all nodes always agree) 
                    to eventual consistency (nodes will eventually agree).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
                      <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs">
                        S
                      </div>
                      <h6 className="font-medium">Strong</h6>
                      <p className="text-xs text-muted-foreground">All nodes synchronized</p>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs">
                        W
                      </div>
                      <h6 className="font-medium">Weak</h6>
                      <p className="text-xs text-muted-foreground">Limited guarantees</p>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
                      <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs">
                        E
                      </div>
                      <h6 className="font-medium">Eventual</h6>
                      <p className="text-xs text-muted-foreground">Converges over time</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {consistencyModels.map((model, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4>{model.name}</h4>
                        <Badge variant={
                          model.latency === 'High' ? 'destructive' : 
                          model.latency === 'Medium' ? 'default' : 'secondary'
                        }>
                          {model.latency} Latency
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{model.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h6 className="font-medium mb-1 text-blue-600">Use Cases:</h6>
                          <p className="text-muted-foreground">{model.examples}</p>
                        </div>
                        <div>
                          <h6 className="font-medium mb-1 text-green-600">Trade-offs:</h6>
                          <p className="text-muted-foreground">
                            {model.name === 'Strong Consistency' ? 'Higher latency, lower availability during partitions' :
                             model.name === 'Eventual Consistency' ? 'Lower latency, higher availability, temporary inconsistencies' :
                             model.name === 'Causal Consistency' ? 'Balance between performance and ordering guarantees' :
                             'Good for user-specific data with session isolation'}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Consistency vs Performance Trade-offs</CardTitle>
              <CardDescription>
                How different consistency models affect system performance and user experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-3 text-red-600">Strong Consistency</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Read Latency:</span>
                        <span className="text-red-600">High (100-500ms)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Write Latency:</span>
                        <span className="text-red-600">High (200-1000ms)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Availability:</span>
                        <span className="text-yellow-600">Medium</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Accuracy:</span>
                        <span className="text-green-600">100%</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Best for: Financial transactions, inventory management, booking systems
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-3 text-green-600">Eventual Consistency</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Read Latency:</span>
                        <span className="text-green-600">Low (1-10ms)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Write Latency:</span>
                        <span className="text-green-600">Low (5-50ms)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Availability:</span>
                        <span className="text-green-600">High</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Accuracy:</span>
                        <span className="text-yellow-600">99.9%</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Best for: Social media feeds, content delivery, analytics, logging
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                  <h5 className="font-medium mb-2">💡 Choosing the Right Model</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h6 className="font-medium mb-1">Consider Strong Consistency when:</h6>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Data accuracy is critical</li>
                        <li>• Financial or legal compliance required</li>
                        <li>• Inconsistent data causes user harm</li>
                        <li>• Updates are infrequent</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium mb-1">Consider Eventual Consistency when:</h6>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• High availability is required</li>
                        <li>• Global scale with low latency</li>
                        <li>• Temporary inconsistency is acceptable</li>
                        <li>• High read/write volume</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Replication Strategies & Consistency</CardTitle>
              <CardDescription>
                How different replication approaches affect data consistency guarantees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="mb-3">Master-Slave Replication</h4>
                    <div className="space-y-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>Single master handles all writes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Multiple slaves serve read requests</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span>Replication can be sync or async</span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded">
                        <h6 className="text-sm font-medium mb-1">Consistency Impact:</h6>
                        <p className="text-xs text-muted-foreground">
                          Synchronous: Strong consistency, high latency<br/>
                          Asynchronous: Eventual consistency, low latency
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="mb-3">Master-Master Replication</h4>
                    <div className="space-y-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span>Multiple masters accept writes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span>Conflict resolution mechanisms needed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span>Complex consistency management</span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded">
                        <h6 className="text-sm font-medium mb-1">Consistency Impact:</h6>
                        <p className="text-xs text-muted-foreground">
                          Usually eventual consistency with conflict resolution strategies like last-write-wins or vector clocks
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg">
                  <h5 className="font-medium mb-3">Replication Consistency Patterns</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h6 className="font-medium text-blue-600 mb-1">Read-after-Write</h6>
                      <p className="text-muted-foreground">Users see their own writes immediately</p>
                    </div>
                    <div>
                      <h6 className="font-medium text-green-600 mb-1">Monotonic Reads</h6>
                      <p className="text-muted-foreground">Users don't see older data after newer</p>
                    </div>
                    <div>
                      <h6 className="font-medium text-purple-600 mb-1">Monotonic Writes</h6>
                      <p className="text-muted-foreground">Writes from same user are applied in order</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sharding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Sharding: Horizontal Partitioning</CardTitle>
              <CardDescription>
                Understanding how to distribute data across multiple database instances for improved performance and scalability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                  <h4 className="mb-3">What is Database Sharding?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Sharding is a horizontal partitioning technique that distributes data across multiple database instances (shards) 
                    based on a partitioning strategy. Each shard contains a subset of the data and operates independently, 
                    allowing the system to scale beyond the limitations of a single database server.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
                      <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs">
                        1
                      </div>
                      <h6 className="font-medium">Partition</h6>
                      <p className="text-xs text-muted-foreground">Split data using shard key</p>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
                      <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs">
                        2
                      </div>
                      <h6 className="font-medium">Distribute</h6>
                      <p className="text-xs text-muted-foreground">Store subsets on different servers</p>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
                      <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs">
                        3
                      </div>
                      <h6 className="font-medium">Route</h6>
                      <p className="text-xs text-muted-foreground">Direct queries to correct shard</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="mb-3 flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        Range-Based Sharding
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Data is partitioned based on ranges of the shard key values. Simple to understand and implement.
                      </p>
                      <div className="space-y-2">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded text-xs">Shard 1: A-F (Users: Adams-Foster)</div>
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded text-xs">Shard 2: G-M (Users: Garcia-Miller)</div>
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded text-xs">Shard 3: N-S (Users: Nelson-Smith)</div>
                        <div className="p-2 bg-red-100 dark:bg-red-900 rounded text-xs">Shard 4: T-Z (Users: Taylor-Young)</div>
                      </div>
                      <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-950 rounded text-xs">
                        <strong>Pros:</strong> Simple queries, good for range scans<br/>
                        <strong>Cons:</strong> Risk of hotspots, uneven distribution
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="mb-3 flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        Hash-Based Sharding
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Uses a hash function to determine which shard stores each record. Provides even data distribution.
                      </p>
                      <div className="space-y-2">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded text-xs">hash(user_id) % 4 = 0 → Shard 1</div>
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded text-xs">hash(user_id) % 4 = 1 → Shard 2</div>
                        <div className="p-2 bg-pink-100 dark:bg-pink-900 rounded text-xs">hash(user_id) % 4 = 2 → Shard 3</div>
                        <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded text-xs">hash(user_id) % 4 = 3 → Shard 4</div>
                      </div>
                      <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-950 rounded text-xs">
                        <strong>Pros:</strong> Even distribution, good performance<br/>
                        <strong>Cons:</strong> Difficult range queries, resharding complexity
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="mb-3 flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-500 rounded"></div>
                        Directory-Based Sharding
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        A lookup service maintains mappings between data and shards. Most flexible but adds complexity.
                      </p>
                      <div className="space-y-2">
                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs text-center">📋 Directory Service</div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded text-xs">Premium Users</div>
                          <div className="p-1 bg-green-100 dark:bg-green-900 rounded text-xs">Shard 1 (SSD)</div>
                          <div className="p-1 bg-yellow-100 dark:bg-yellow-900 rounded text-xs">Free Users</div>
                          <div className="p-1 bg-red-100 dark:bg-red-900 rounded text-xs">Shard 2 (HDD)</div>
                          <div className="p-1 bg-purple-100 dark:bg-purple-900 rounded text-xs">Enterprise</div>
                          <div className="p-1 bg-pink-100 dark:bg-pink-900 rounded text-xs">Shard 3 (High-Perf)</div>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-950 rounded text-xs">
                        <strong>Pros:</strong> Flexible routing, easy rebalancing<br/>
                        <strong>Cons:</strong> Single point of failure, extra lookup cost
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="mb-3 flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        Geographic Sharding
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Data is partitioned by geographic regions, reducing latency and meeting data sovereignty requirements.
                      </p>
                      <div className="space-y-2">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded text-xs">US East: Shard 1 (Virginia)</div>
                        <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded text-xs">US West: Shard 2 (California)</div>
                        <div className="p-2 bg-lime-100 dark:bg-lime-900 rounded text-xs">Europe: Shard 3 (Ireland)</div>
                        <div className="p-2 bg-rose-100 dark:bg-rose-900 rounded text-xs">Asia: Shard 4 (Singapore)</div>
                      </div>
                      <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-950 rounded text-xs">
                        <strong>Pros:</strong> Low latency, compliance, fault isolation<br/>
                        <strong>Cons:</strong> Uneven loads, cross-region complexity
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sharding Implementation Challenges</CardTitle>
              <CardDescription>
                Common problems and solutions when implementing database sharding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3 text-green-600 dark:text-green-400">✅ Benefits</h4>
                    <div className="space-y-3">
                      <div className="p-3 border-l-4 border-green-500 bg-green-50 dark:bg-green-950">
                        <h6 className="font-medium">Horizontal Scalability</h6>
                        <p className="text-sm text-muted-foreground">Add more servers to handle increased load</p>
                      </div>
                      <div className="p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950">
                        <h6 className="font-medium">Improved Performance</h6>
                        <p className="text-sm text-muted-foreground">Smaller datasets mean faster queries</p>
                      </div>
                      <div className="p-3 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950">
                        <h6 className="font-medium">Fault Isolation</h6>
                        <p className="text-sm text-muted-foreground">Failure in one shard doesn't affect others</p>
                      </div>
                      <div className="p-3 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950">
                        <h6 className="font-medium">Geographic Distribution</h6>
                        <p className="text-sm text-muted-foreground">Data closer to users reduces latency</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="mb-3 text-red-600 dark:text-red-400">⚠️ Challenges</h4>
                    <div className="space-y-3">
                      <div className="p-3 border-l-4 border-red-500 bg-red-50 dark:bg-red-950">
                        <h6 className="font-medium">Cross-Shard Queries</h6>
                        <p className="text-sm text-muted-foreground">JOIN operations across shards are complex and slow</p>
                      </div>
                      <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                        <h6 className="font-medium">Shard Key Selection</h6>
                        <p className="text-sm text-muted-foreground">Poor shard key leads to hotspots and uneven load</p>
                      </div>
                      <div className="p-3 border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-950">
                        <h6 className="font-medium">Rebalancing</h6>
                        <p className="text-sm text-muted-foreground">Adding/removing shards requires data migration</p>
                      </div>
                      <div className="p-3 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-950">
                        <h6 className="font-medium">Operational Complexity</h6>
                        <p className="text-sm text-muted-foreground">More servers, monitoring, backup strategies</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg">
                  <h5 className="font-medium mb-3">🎯 Best Practices for Successful Sharding</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h6 className="font-medium mb-2">Shard Key Selection:</h6>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Choose high cardinality keys</li>
                        <li>• Avoid monotonically increasing keys</li>
                        <li>• Consider query patterns</li>
                        <li>• Plan for future growth</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium mb-2">Architecture Design:</h6>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Start with fewer shards, scale up</li>
                        <li>• Use consistent hashing for flexibility</li>
                        <li>• Implement circuit breakers</li>
                        <li>• Plan migration strategies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sharding vs Alternatives</CardTitle>
              <CardDescription>
                When to choose sharding over other scaling approaches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Approach</TableHead>
                      <TableHead>Complexity</TableHead>
                      <TableHead>Scale Limit</TableHead>
                      <TableHead>Consistency</TableHead>
                      <TableHead>Best For</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Vertical Scaling</TableCell>
                      <TableCell><Badge variant="secondary">Low</Badge></TableCell>
                      <TableCell><Badge variant="destructive">Limited</Badge></TableCell>
                      <TableCell><Badge variant="default">Strong</Badge></TableCell>
                      <TableCell>Small to medium applications</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Read Replicas</TableCell>
                      <TableCell><Badge variant="secondary">Medium</Badge></TableCell>
                      <TableCell><Badge variant="default">Read-heavy</Badge></TableCell>
                      <TableCell><Badge variant="outline">Eventual</Badge></TableCell>
                      <TableCell>Read-heavy workloads</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sharding</TableCell>
                      <TableCell><Badge variant="destructive">High</Badge></TableCell>
                      <TableCell><Badge variant="default">Very High</Badge></TableCell>
                      <TableCell><Badge variant="outline">Complex</Badge></TableCell>
                      <TableCell>Massive scale, even read/write</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">NewSQL</TableCell>
                      <TableCell><Badge variant="default">Medium</Badge></TableCell>
                      <TableCell><Badge variant="default">High</Badge></TableCell>
                      <TableCell><Badge variant="default">Strong</Badge></TableCell>
                      <TableCell>ACID + Scale requirements</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Storage Systems in Distributed Computing</CardTitle>
              <CardDescription>
                Understanding different storage types, their characteristics, and optimal use cases in modern system architecture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg">
                  <h4 className="mb-3">Storage System Fundamentals</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Storage systems are the foundation of data persistence in distributed applications. Different storage types serve different needs: 
                    <strong> Block storage</strong> provides raw, high-performance storage for databases and operating systems, 
                    <strong> Object storage</strong> offers web-scale file storage with HTTP APIs, and 
                    <strong> File storage</strong> provides traditional network-attached storage with file system semantics.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
                      <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs">
                        B
                      </div>
                      <h6 className="font-medium">Block</h6>
                      <p className="text-xs text-muted-foreground">Raw storage volumes</p>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
                      <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs">
                        O
                      </div>
                      <h6 className="font-medium">Object</h6>
                      <p className="text-xs text-muted-foreground">Web-scale storage</p>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs">
                        F
                      </div>
                      <h6 className="font-medium">File</h6>
                      <p className="text-xs text-muted-foreground">Network file systems</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h4 className="mb-4">Storage Type Usage Distribution</h4>
                    <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={storageTypes}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="usage"
                            label={({ name, usage }) => `${name}: ${usage}%`}
                          >
                            {storageTypes.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="mb-4">Detailed Storage Comparison</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Performance</TableHead>
                          <TableHead>Scalability</TableHead>
                          <TableHead>Cost</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Block</TableCell>
                          <TableCell><Badge variant="default">High</Badge></TableCell>
                          <TableCell><Badge variant="outline">Limited</Badge></TableCell>
                          <TableCell><Badge variant="destructive">High</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Object</TableCell>
                          <TableCell><Badge variant="secondary">Medium</Badge></TableCell>
                          <TableCell><Badge variant="default">Excellent</Badge></TableCell>
                          <TableCell><Badge variant="secondary">Low</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">File</TableCell>
                          <TableCell><Badge variant="secondary">Medium</Badge></TableCell>
                          <TableCell><Badge variant="outline">Good</Badge></TableCell>
                          <TableCell><Badge variant="default">Medium</Badge></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Storage Types Deep Dive</CardTitle>
              <CardDescription>
                Comprehensive analysis of different storage systems and their optimal use cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="p-4 h-full">
                    <h4 className="mb-3 flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-500 rounded"></div>
                      Block Storage
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Raw storage volumes that appear as hard drives to the operating system. Provides the highest performance and lowest latency.
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h6 className="text-sm font-medium text-green-600 mb-1">✅ Strengths</h6>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Ultra-low latency (sub-millisecond)</li>
                          <li>• High IOPS (100,000+ operations/sec)</li>
                          <li>• Direct hardware access</li>
                          <li>• Ideal for databases</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h6 className="text-sm font-medium text-red-600 mb-1">⚠️ Limitations</h6>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Single server attachment</li>
                          <li>• Complex to scale</li>
                          <li>• Higher cost per GB</li>
                          <li>• No built-in sharing</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h6 className="text-sm font-medium text-blue-600 mb-1">🏢 Examples</h6>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">AWS EBS</Badge>
                          <Badge variant="outline" className="text-xs">Azure Disk</Badge>
                          <Badge variant="outline" className="text-xs">GCP Persistent Disk</Badge>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 h-full">
                    <h4 className="mb-3 flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      Object Storage
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Web-scale storage accessed via HTTP APIs. Stores data as objects in buckets with metadata and global accessibility.
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h6 className="text-sm font-medium text-green-600 mb-1">✅ Strengths</h6>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Unlimited scalability</li>
                          <li>• Built-in redundancy</li>
                          <li>• Global accessibility</li>
                          <li>• Cost-effective</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h6 className="text-sm font-medium text-red-600 mb-1">⚠️ Limitations</h6>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Higher latency (10-100ms)</li>
                          <li>• Eventually consistent</li>
                          <li>• No file system semantics</li>
                          <li>• Cannot modify parts of objects</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h6 className="text-sm font-medium text-blue-600 mb-1">🏢 Examples</h6>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">AWS S3</Badge>
                          <Badge variant="outline" className="text-xs">Azure Blob</Badge>
                          <Badge variant="outline" className="text-xs">GCS</Badge>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 h-full">
                    <h4 className="mb-3 flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                      File Storage
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Network-attached storage providing traditional file system access. Supports concurrent access from multiple clients.
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h6 className="text-sm font-medium text-green-600 mb-1">✅ Strengths</h6>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Familiar file system interface</li>
                          <li>• Concurrent access support</li>
                          <li>• POSIX compliance</li>
                          <li>• Easy migration</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h6 className="text-sm font-medium text-red-600 mb-1">⚠️ Limitations</h6>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Performance bottlenecks</li>
                          <li>• Network dependency</li>
                          <li>• Scaling complexity</li>
                          <li>• Consistency challenges</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h6 className="text-sm font-medium text-blue-600 mb-1">🏢 Examples</h6>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">AWS EFS</Badge>
                          <Badge variant="outline" className="text-xs">Azure Files</Badge>
                          <Badge variant="outline" className="text-xs">GCP Filestore</Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Storage Performance & Characteristics</CardTitle>
              <CardDescription>
                Key metrics and considerations for storage system selection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="font-medium">Performance Metrics</h5>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Metric</TableHead>
                          <TableHead>Block</TableHead>
                          <TableHead>Object</TableHead>
                          <TableHead>File</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Latency</TableCell>
                          <TableCell className="text-green-600">&lt; 1ms</TableCell>
                          <TableCell className="text-yellow-600">10-100ms</TableCell>
                          <TableCell className="text-orange-600">1-10ms</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">IOPS</TableCell>
                          <TableCell className="text-green-600">100,000</TableCell>
                          <TableCell className="text-red-600">1,000</TableCell>
                          <TableCell className="text-yellow-600">10,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Throughput</TableCell>
                          <TableCell className="text-green-600">GB/s</TableCell>
                          <TableCell className="text-yellow-600">MB/s</TableCell>
                          <TableCell className="text-yellow-600">MB/s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Scalability</TableCell>
                          <TableCell className="text-red-600">Limited</TableCell>
                          <TableCell className="text-green-600">Unlimited</TableCell>
                          <TableCell className="text-yellow-600">Good</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-medium">Cost Considerations</h5>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h6 className="text-sm font-medium mb-1">Block Storage</h6>
                        <p className="text-xs text-muted-foreground">$0.10-0.50/GB/month + IOPS charges</p>
                        <p className="text-xs text-blue-600">Best for: High-performance databases</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h6 className="text-sm font-medium mb-1">Object Storage</h6>
                        <p className="text-xs text-muted-foreground">$0.01-0.05/GB/month + API calls</p>
                        <p className="text-xs text-blue-600">Best for: Backups, media, analytics</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h6 className="text-sm font-medium mb-1">File Storage</h6>
                        <p className="text-xs text-muted-foreground">$0.08-0.30/GB/month + throughput</p>
                        <p className="text-xs text-blue-600">Best for: Shared application data</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg">
                  <h5 className="font-medium mb-3">🎯 Storage Selection Guide</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h6 className="font-medium mb-2 text-purple-600">Choose Block Storage for:</h6>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Transactional databases</li>
                        <li>• High-performance computing</li>
                        <li>• Operating system storage</li>
                        <li>• Low-latency applications</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium mb-2 text-green-600">Choose Object Storage for:</h6>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Static web content</li>
                        <li>• Backup and archival</li>
                        <li>• Data lakes and analytics</li>
                        <li>• Content distribution</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium mb-2 text-yellow-600">Choose File Storage for:</h6>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Legacy application migration</li>
                        <li>• Content management systems</li>
                        <li>• Development environments</li>
                        <li>• Shared configuration files</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Storage Architectures & Best Practices</CardTitle>
              <CardDescription>
                Modern storage patterns and implementation strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium mb-3">Hybrid Storage Architectures</h5>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950">
                        <h6 className="font-medium">Tiered Storage</h6>
                        <p className="text-muted-foreground">Automatically move data between storage tiers based on access patterns</p>
                      </div>
                      <div className="p-3 border-l-4 border-green-500 bg-green-50 dark:bg-green-950">
                        <h6 className="font-medium">Multi-Cloud Storage</h6>
                        <p className="text-muted-foreground">Distribute data across multiple cloud providers for redundancy</p>
                      </div>
                      <div className="p-3 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950">
                        <h6 className="font-medium">Edge Storage</h6>
                        <p className="text-muted-foreground">Cache frequently accessed data closer to end users</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-3">Implementation Best Practices</h5>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h6 className="font-medium">Backup Strategy</h6>
                          <p className="text-muted-foreground">Implement 3-2-1 rule: 3 copies, 2 different media, 1 offsite</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h6 className="font-medium">Lifecycle Management</h6>
                          <p className="text-muted-foreground">Automate data archival and deletion based on age and access</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h6 className="font-medium">Performance Monitoring</h6>
                          <p className="text-muted-foreground">Track IOPS, latency, and throughput metrics continuously</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h6 className="font-medium">Security Controls</h6>
                          <p className="text-muted-foreground">Encrypt at rest and in transit, implement access controls</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h5 className="font-medium mb-2">💡 Modern Storage Trends</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h6 className="font-medium mb-1">Emerging Technologies:</h6>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• NVMe over Fabrics for ultra-low latency</li>
                        <li>• Storage Class Memory (SCM)</li>
                        <li>• Software-defined storage (SDS)</li>
                        <li>• Serverless storage architectures</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium mb-1">Future Considerations:</h6>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• AI-driven storage optimization</li>
                        <li>• Quantum-safe encryption</li>
                        <li>• Green storage initiatives</li>
                        <li>• Edge-to-cloud data pipelines</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}