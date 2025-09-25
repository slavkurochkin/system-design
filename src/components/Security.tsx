import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Shield, Lock, Key, Eye, AlertTriangle, CheckCircle, X, User, Globe } from 'lucide-react'
import { Switch } from './ui/switch'
import { GlobalWarning } from './GlobalWarning'

export function Security() {
  const [zeroTrustEnabled, setZeroTrustEnabled] = useState(false)
  const [mfaEnabled, setMfaEnabled] = useState(true)
  const [encryptionLevel, setEncryptionLevel] = useState('AES-256')

  const authMethods = [
    { method: 'OAuth 2.0', usage: 40, color: '#8884d8', security: 'High' },
    { method: 'JWT', usage: 30, color: '#82ca9d', security: 'Medium' },
    { method: 'SAML', usage: 20, color: '#ffc658', security: 'High' },
    { method: 'API Keys', usage: 10, color: '#ff7300', security: 'Low' }
  ]

  const securityMetrics = [
    { month: 'Jan', incidents: 12, blocked: 1240, score: 87 },
    { month: 'Feb', incidents: 8, blocked: 1580, score: 91 },
    { month: 'Mar', incidents: 15, blocked: 2100, score: 85 },
    { month: 'Apr', incidents: 5, blocked: 1890, score: 94 },
    { month: 'May', incidents: 3, blocked: 2350, score: 96 },
    { month: 'Jun', incidents: 7, blocked: 2010, score: 92 }
  ]

  const threatTypes = [
    { type: 'DDoS Attacks', severity: 'High', frequency: 'Daily', mitigation: 'Rate Limiting' },
    { type: 'SQL Injection', severity: 'Critical', frequency: 'Weekly', mitigation: 'Input Validation' },
    { type: 'XSS', severity: 'Medium', frequency: 'Weekly', mitigation: 'Output Encoding' },
    { type: 'CSRF', severity: 'Medium', frequency: 'Monthly', mitigation: 'CSRF Tokens' },
    { type: 'Man-in-Middle', severity: 'High', frequency: 'Rare', mitigation: 'TLS/mTLS' }
  ]

  const zeroTrustPrinciples = [
    { principle: 'Never Trust, Always Verify', status: zeroTrustEnabled, description: 'Verify every user and device' },
    { principle: 'Least Privilege Access', status: zeroTrustEnabled, description: 'Minimal required permissions' },
    { principle: 'Continuous Monitoring', status: zeroTrustEnabled, description: 'Real-time security analysis' },
    { principle: 'Micro-segmentation', status: zeroTrustEnabled, description: 'Network isolation' }
  ]

  const AuthenticationFlow = () => (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="grid grid-cols-5 gap-4 items-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm mt-2">User</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-4 h-1 bg-gray-400"></div>
            <span className="text-xs text-muted-foreground">Login</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm mt-2">Auth Server</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-4 h-1 bg-gray-400"></div>
            <span className="text-xs text-muted-foreground">Token</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm mt-2">API</span>
          </div>
        </div>
      </div>
      
      {mfaEnabled && (
        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800 dark:text-green-200">Multi-Factor Authentication Active</span>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400">
            Additional verification required after password
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 border rounded-lg text-center">
          <h5 className="font-medium">Authentication</h5>
          <p className="text-xs text-muted-foreground">Who are you?</p>
        </div>
        <div className="p-3 border rounded-lg text-center">
          <h5 className="font-medium">Authorization</h5>
          <p className="text-xs text-muted-foreground">What can you do?</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <GlobalWarning />
      <div className="mb-8">
        <h1 className="mb-4">Security</h1>
        <p className="text-muted-foreground">
          Learn about security patterns, authentication, authorization, encryption, and zero trust architecture for distributed systems.
        </p>
      </div>

      <Tabs defaultValue="authentication" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="authorization">Authorization</TabsTrigger>
          <TabsTrigger value="encryption">Encryption</TabsTrigger>
          <TabsTrigger value="zero-trust">Zero Trust</TabsTrigger>
          <TabsTrigger value="threats">Threat Protection</TabsTrigger>
        </TabsList>

        <TabsContent value="authentication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Flow</CardTitle>
              <CardDescription>
                Interactive visualization of authentication process with MFA options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={mfaEnabled}
                      onCheckedChange={setMfaEnabled}
                    />
                    <label>Enable Multi-Factor Authentication</label>
                  </div>
                  <Badge variant={mfaEnabled ? 'default' : 'outline'}>
                    {mfaEnabled ? 'MFA Active' : 'Password Only'}
                  </Badge>
                </div>
                
                <AuthenticationFlow />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Authentication Methods Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={authMethods}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="usage"
                        label={({ method, usage }) => `${method}: ${usage}%`}
                      >
                        {authMethods.map((entry, index) => (
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
                <CardTitle>Authentication Methods Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {authMethods.map((method, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{method.method}</h4>
                        <Badge variant={
                          method.security === 'High' ? 'default' : 
                          method.security === 'Medium' ? 'outline' : 'destructive'
                        }>
                          {method.security} Security
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${method.usage}%`,
                            backgroundColor: method.color
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Multi-Factor Authentication Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="mb-2 flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    SMS/Voice
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">Text message or voice call verification</p>
                  <Badge variant="outline">Medium Security</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Authenticator App
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">TOTP-based apps like Google Authenticator</p>
                  <Badge variant="default">High Security</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Hardware Token
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">FIDO2/WebAuthn hardware keys</p>
                  <Badge variant="default">Highest Security</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authorization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Authorization Models</CardTitle>
              <CardDescription>
                Different approaches to controlling access to resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="mb-2">Role-Based Access Control (RBAC)</h4>
                    <p className="text-sm text-muted-foreground mb-3">Users assigned to roles, roles have permissions</p>
                    <div className="text-xs space-y-1">
                      <div>Admin → Full Access</div>
                      <div>Editor → Read/Write</div>
                      <div>Viewer → Read Only</div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="mb-2">Attribute-Based Access Control (ABAC)</h4>
                    <p className="text-sm text-muted-foreground mb-3">Dynamic authorization based on attributes</p>
                    <div className="text-xs space-y-1">
                      <div>User: Department, Location</div>
                      <div>Resource: Classification, Owner</div>
                      <div>Environment: Time, IP</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="mb-2">Permission-Based Access Control</h4>
                    <p className="text-sm text-muted-foreground mb-3">Direct assignment of permissions to users</p>
                    <div className="text-xs space-y-1">
                      <div>user:read → View users</div>
                      <div>user:write → Create/Update users</div>
                      <div>user:delete → Remove users</div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="mb-2">Policy-Based Access Control</h4>
                    <p className="text-sm text-muted-foreground mb-3">Centralized policies define access rules</p>
                    <div className="text-xs space-y-1">
                      <div>IF role = 'manager'</div>
                      <div>AND department = 'finance'</div>
                      <div>THEN allow budget:read</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>OAuth 2.0 Flows</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Flow Type</TableHead>
                    <TableHead>Use Case</TableHead>
                    <TableHead>Security</TableHead>
                    <TableHead>Client Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Authorization Code</TableCell>
                    <TableCell>Web applications</TableCell>
                    <TableCell><Badge variant="default">High</Badge></TableCell>
                    <TableCell>Confidential</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Client Credentials</TableCell>
                    <TableCell>Server-to-server</TableCell>
                    <TableCell><Badge variant="default">High</Badge></TableCell>
                    <TableCell>Confidential</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Device Code</TableCell>
                    <TableCell>IoT devices, CLI tools</TableCell>
                    <TableCell><Badge variant="outline">Medium</Badge></TableCell>
                    <TableCell>Public</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">PKCE</TableCell>
                    <TableCell>Mobile apps, SPAs</TableCell>
                    <TableCell><Badge variant="outline">Medium</Badge></TableCell>
                    <TableCell>Public</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>JWT Token Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg text-center">
                    <h5 className="font-medium text-red-800 dark:text-red-200">Header</h5>
                    <p className="text-xs text-red-600 dark:text-red-400">Algorithm & Type</p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-center">
                    <h5 className="font-medium text-blue-800 dark:text-blue-200">Payload</h5>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Claims & Data</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg text-center">
                    <h5 className="font-medium text-green-800 dark:text-green-200">Signature</h5>
                    <p className="text-xs text-green-600 dark:text-green-400">Verification</p>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-xs font-mono break-all">
                    <span className="text-red-600">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>.
                    <span className="text-blue-600">eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ</span>.
                    <span className="text-green-600">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="encryption" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Encryption Methods</CardTitle>
              <CardDescription>
                Symmetric vs Asymmetric encryption and their use cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="mb-3 flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    Symmetric Encryption
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Same key for encryption/decryption</li>
                    <li>• Fast performance</li>
                    <li>• Key distribution challenge</li>
                    <li>• AES-256, ChaCha20</li>
                  </ul>
                  <div className="mt-4 p-2 bg-blue-50 dark:bg-blue-950 rounded">
                    <div className="text-xs">Use Case: Data at rest, bulk encryption</div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <h4 className="mb-3 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Asymmetric Encryption
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Public/private key pairs</li>
                    <li>• Slower performance</li>
                    <li>• Secure key exchange</li>
                    <li>• RSA, ECC, Ed25519</li>
                  </ul>
                  <div className="mt-4 p-2 bg-green-50 dark:bg-green-950 rounded">
                    <div className="text-xs">Use Case: Key exchange, digital signatures</div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>TLS/SSL Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Current Encryption Level:</span>
                  <Badge variant="default">{encryptionLevel}</Badge>
                </div>
                
                <div className="space-y-3">
                  {['TLS 1.0', 'TLS 1.1', 'TLS 1.2', 'TLS 1.3'].map((version, index) => (
                    <div key={version} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">{version}</h5>
                        <p className="text-sm text-muted-foreground">
                          {version === 'TLS 1.3' ? 'Latest, fastest, most secure' :
                           version === 'TLS 1.2' ? 'Widely supported, secure' :
                           'Deprecated, security vulnerabilities'}
                        </p>
                      </div>
                      <Badge variant={
                        version === 'TLS 1.3' ? 'default' :
                        version === 'TLS 1.2' ? 'outline' : 'destructive'
                      }>
                        {version === 'TLS 1.3' ? 'Recommended' :
                         version === 'TLS 1.2' ? 'Acceptable' : 'Deprecated'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Encryption at Rest vs in Transit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-center">Data at Rest</h4>
                  <div className="p-4 border rounded-lg text-center">
                    <Lock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <div className="text-sm">Stored Data</div>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• Database encryption</li>
                    <li>• File system encryption</li>
                    <li>• Backup encryption</li>
                    <li>• Key management (HSM)</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-center">Data in Transit</h4>
                  <div className="p-4 border rounded-lg text-center">
                    <Globe className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <div className="text-sm">Network Traffic</div>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• TLS/SSL encryption</li>
                    <li>• VPN tunnels</li>
                    <li>• API communication</li>
                    <li>• Message queue encryption</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zero-trust" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zero Trust Architecture</CardTitle>
              <CardDescription>
                Never trust, always verify - comprehensive security model
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={zeroTrustEnabled}
                      onCheckedChange={setZeroTrustEnabled}
                    />
                    <label>Enable Zero Trust Model</label>
                  </div>
                  <Badge variant={zeroTrustEnabled ? 'default' : 'outline'}>
                    {zeroTrustEnabled ? 'Zero Trust Active' : 'Traditional Perimeter'}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {zeroTrustPrinciples.map((principle, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${principle.status ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <div>
                          <h4 className="font-medium">{principle.principle}</h4>
                          <p className="text-sm text-muted-foreground">{principle.description}</p>
                        </div>
                      </div>
                      <Badge variant={principle.status ? 'default' : 'outline'}>
                        {principle.status ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traditional vs Zero Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-red-600 dark:text-red-400">Traditional Perimeter</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Trust internal network</li>
                      <li>• VPN for remote access</li>
                      <li>• Firewall-based security</li>
                      <li>• Privileged network zones</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-green-600 dark:text-green-400">Zero Trust</h5>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Verify every request</li>
                      <li>• Identity-based access</li>
                      <li>• Micro-segmentation</li>
                      <li>• Continuous monitoring</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Zero Trust Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Identity & Access Management</h5>
                    <p className="text-xs text-muted-foreground">Strong authentication and authorization</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Device Trust</h5>
                    <p className="text-xs text-muted-foreground">Device compliance and health checks</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Network Segmentation</h5>
                    <p className="text-xs text-muted-foreground">Micro-perimeters around resources</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Data Protection</h5>
                    <p className="text-xs text-muted-foreground">Encryption and data loss prevention</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Metrics Dashboard</CardTitle>
              <CardDescription>
                Monitor security incidents and threat protection effectiveness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={securityMetrics} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="incidents" stroke="#ff7300" name="Security Incidents" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="blocked" stroke="#82ca9d" name="Threats Blocked" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="score" stroke="#8884d8" name="Security Score" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Threat Types</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Threat Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Primary Mitigation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {threatTypes.map((threat, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{threat.type}</TableCell>
                      <TableCell>
                        <Badge variant={
                          threat.severity === 'Critical' ? 'destructive' : 
                          threat.severity === 'High' ? 'default' : 'outline'
                        }>
                          {threat.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>{threat.frequency}</TableCell>
                      <TableCell>{threat.mitigation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                    <div>
                      <h5 className="text-sm font-medium">Input Validation</h5>
                      <p className="text-xs text-muted-foreground">Validate all user inputs</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                    <div>
                      <h5 className="text-sm font-medium">Principle of Least Privilege</h5>
                      <p className="text-xs text-muted-foreground">Minimal required permissions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                    <div>
                      <h5 className="text-sm font-medium">Defense in Depth</h5>
                      <p className="text-xs text-muted-foreground">Multiple security layers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                    <div>
                      <h5 className="text-sm font-medium">Regular Security Audits</h5>
                      <p className="text-xs text-muted-foreground">Continuous security assessment</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Monitoring Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">SIEM Systems</h5>
                    <p className="text-xs text-muted-foreground">Centralized log analysis and correlation</p>
                    <Badge variant="outline" className="mt-1">Splunk, ELK</Badge>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">IDS/IPS</h5>
                    <p className="text-xs text-muted-foreground">Intrusion detection and prevention</p>
                    <Badge variant="outline" className="mt-1">Snort, Suricata</Badge>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Vulnerability Scanners</h5>
                    <p className="text-xs text-muted-foreground">Automated security assessments</p>
                    <Badge variant="outline" className="mt-1">Nessus, OpenVAS</Badge>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">WAF</h5>
                    <p className="text-xs text-muted-foreground">Web application firewall protection</p>
                    <Badge variant="outline" className="mt-1">CloudFlare, AWS WAF</Badge>
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