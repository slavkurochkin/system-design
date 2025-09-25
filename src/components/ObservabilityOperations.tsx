import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Activity,
  AlertTriangle,
  Eye,
  Clock,
  Zap,
  TrendingUp,
  Bell,
  Search,
  Target,
  Gauge,
  Shield,
  CheckCircle,
  XCircle,
  Timer,
  Users,
  FileText,
  BarChart3,
} from "lucide-react";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { GlobalWarning } from "./GlobalWarning";
import {
  metricsData,
  logLevels,
  traceData,
  slaMetrics,
  alertsData,
  observabilityTools,
  monitoringPatterns,
  sloDefinitions,
  alertingSeverities,
  observabilityPillars,
  incidentResponse,
} from "./data/observabilityData";

export function ObservabilityOperations() {
  const [alertingEnabled, setAlertingEnabled] = useState(true);
  const [tracingEnabled, setTracingEnabled] = useState(true);
  const [logLevel, setLogLevel] = useState([3]); // 3 = INFO level
  const [selectedMetric, setSelectedMetric] = useState("response-time");
  const [selectedSeverity, setSelectedSeverity] = useState("all");

  const MetricsDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["response-time", "error-rate", "throughput", "cpu-usage"].map(
          (metric) => (
            <Button
              key={metric}
              variant={selectedMetric === metric ? "default" : "outline"}
              onClick={() => setSelectedMetric(metric)}
              className="capitalize"
            >
              {metric.replace("-", " ")}
            </Button>
          )
        )}
      </div>

      <div style={{ width: "100%", height: "300px", minHeight: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={metricsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={
                selectedMetric === "response-time"
                  ? "responseTime"
                  : selectedMetric === "error-rate"
                  ? "errorRate"
                  : selectedMetric === "throughput"
                  ? "throughput"
                  : "cpuUsage"
              }
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
              name={selectedMetric.replace("-", " ")}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">99.95%</div>
          <div className="text-xs text-muted-foreground">Uptime</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">245ms</div>
          <div className="text-xs text-muted-foreground">Avg Response</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">1.2k</div>
          <div className="text-xs text-muted-foreground">Requests/sec</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">0.08%</div>
          <div className="text-xs text-muted-foreground">Error Rate</div>
        </Card>
      </div>
    </div>
  );

  const TracingVisualization = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch
            checked={tracingEnabled}
            onCheckedChange={setTracingEnabled}
          />
          <label>Enable Distributed Tracing</label>
        </div>
        <Badge variant={tracingEnabled ? "default" : "outline"}>
          {tracingEnabled ? "Tracing Active" : "Tracing Disabled"}
        </Badge>
      </div>

      {tracingEnabled && (
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="mb-3">Request Trace: POST /api/users/123</h4>
            <div className="space-y-2">
              {traceData.map((span, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-24 text-sm">{span.service}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-4 rounded ${
                          span.status === "error" ? "bg-red-500" : "bg-blue-500"
                        }`}
                        style={{
                          width: `${(span.duration / 200) * 100}%`,
                          minWidth: "20px",
                        }}
                      ></div>
                      <span className="text-sm">{span.duration}ms</span>
                      {span.status === "error" && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              Total duration:{" "}
              {traceData.reduce((sum, span) => sum + span.duration, 0)}ms
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <h5 className="mb-2">Trace Statistics</h5>
              <div className="space-y-1 text-sm">
                <div>Total Spans: {traceData.length}</div>
                <div>
                  Error Spans:{" "}
                  {traceData.filter((s) => s.status === "error").length}
                </div>
                <div>
                  Success Rate:{" "}
                  {(
                    (traceData.filter((s) => s.status === "success").length /
                      traceData.length) *
                    100
                  ).toFixed(1)}
                  %
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h5 className="mb-2">Performance Bottlenecks</h5>
              <div className="space-y-1 text-sm">
                <div>Slowest: External API (200ms)</div>
                <div>Database: 120ms</div>
                <div>User Service: 45ms</div>
              </div>
            </Card>

            <Card className="p-4">
              <h5 className="mb-2">Service Dependencies</h5>
              <div className="space-y-1 text-sm">
                <div>Direct: 6 services</div>
                <div>External: 1 API</div>
                <div>Critical Path: 5 hops</div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );

  const getLogLevelName = (level) => {
    const levels = ["DEBUG", "INFO", "WARN", "ERROR"];
    return levels[parseInt(level)];
  };

  return (
    <div className="space-y-6">
      <GlobalWarning />
      <div className="mb-8">
        <h1 className="mb-4">Observability & Operations</h1>
        <p className="text-muted-foreground">
          Learn about monitoring, logging, distributed tracing, and operational
          excellence for distributed systems.
        </p>
      </div>

      <Tabs defaultValue="monitoring" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="logging">Logging</TabsTrigger>
          <TabsTrigger value="tracing">Tracing</TabsTrigger>
          <TabsTrigger value="slos">SLAs & SLOs</TabsTrigger>
          <TabsTrigger value="alerting">Alerting</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What is Observability?</CardTitle>
              <CardDescription>
                Observability is the ability to understand the internal state of
                a system based on its external outputs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="mb-3">Three Pillars of Observability</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {observabilityPillars.map((pillar, index) => (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                          {pillar.pillar === "Metrics" && (
                            <BarChart3 className="w-6 h-6 text-white" />
                          )}
                          {pillar.pillar === "Logs" && (
                            <FileText className="w-6 h-6 text-white" />
                          )}
                          {pillar.pillar === "Traces" && (
                            <Activity className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <h5 className="font-medium">{pillar.pillar}</h5>
                        <p className="text-xs text-muted-foreground">
                          {pillar.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {observabilityPillars.map((pillar, index) => (
                    <Card key={index} className="p-4">
                      <h4 className="font-medium mb-3">{pillar.pillar}</h4>

                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-medium mb-1">
                            Characteristics:
                          </h5>
                          <ul className="text-xs space-y-1">
                            {pillar.characteristics.map((char, i) => (
                              <li key={i} className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                {char}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium mb-1">
                            Examples:
                          </h5>
                          <div className="flex flex-wrap gap-1">
                            {pillar.examples.slice(0, 3).map((example, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-xs"
                              >
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium mb-1">Tools:</h5>
                          <div className="text-xs text-muted-foreground">
                            {pillar.tools.slice(0, 2).join(", ")}
                          </div>
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
              <CardTitle>System Metrics Dashboard</CardTitle>
              <CardDescription>
                Real-time monitoring of key system performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MetricsDashboard />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monitoring Methodologies</CardTitle>
              <CardDescription>
                Proven approaches to effective system monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {monitoringPatterns.map((pattern, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium">{pattern.pattern}</h4>
                      <Badge variant="outline">{pattern.useCase}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {pattern.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium mb-2">
                          Key Signals:
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {pattern.signals.map((signal, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs"
                            >
                              {signal}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">
                          Implementation:
                        </h5>
                        <p className="text-xs text-muted-foreground">
                          {pattern.implementation}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Observability Tools Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {observabilityTools.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">{category.category}</h5>
                        <span className="text-sm text-muted-foreground">
                          {category.usage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${category.usage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {category.tools.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monitoring Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Four Golden Signals
                    </h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Latency, Traffic, Errors, Saturation
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      RED Method
                    </h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Rate, Errors, Duration for requests
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium flex items-center gap-2">
                      <Gauge className="w-4 h-4" />
                      USE Method
                    </h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Utilization, Saturation, Errors for resources
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Metrics Types & Implementation Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="mb-2">Counters</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Always increasing values
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs space-y-1">
                      <div>
                        <strong>Examples:</strong>
                      </div>
                      <div>• HTTP requests total</div>
                      <div>• Database connections</div>
                      <div>• Error count</div>
                    </div>
                    <div className="text-xs bg-muted p-2 rounded">
                      <strong>When to use:</strong> Tracking cumulative events
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="mb-2">Gauges</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Current value snapshots
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs space-y-1">
                      <div>
                        <strong>Examples:</strong>
                      </div>
                      <div>• CPU usage %</div>
                      <div>• Memory usage</div>
                      <div>• Queue length</div>
                    </div>
                    <div className="text-xs bg-muted p-2 rounded">
                      <strong>When to use:</strong> Current state monitoring
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="mb-2">Histograms</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Distribution of values
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs space-y-1">
                      <div>
                        <strong>Examples:</strong>
                      </div>
                      <div>• Response times</div>
                      <div>• Request sizes</div>
                      <div>• Processing duration</div>
                    </div>
                    <div className="text-xs bg-muted p-2 rounded">
                      <strong>When to use:</strong> Performance analysis
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="mb-2">Summaries</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Quantiles over time
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs space-y-1">
                      <div>
                        <strong>Examples:</strong>
                      </div>
                      <div>• P50, P95, P99</div>
                      <div>• SLA calculations</div>
                      <div>• Performance percentiles</div>
                    </div>
                    <div className="text-xs bg-muted p-2 rounded">
                      <strong>When to use:</strong> SLO monitoring
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logging" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What is Effective Logging?</CardTitle>
              <CardDescription>
                Logging provides detailed insights into application behavior and
                system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="mb-3">Logging Principles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2 text-green-600">
                        Structure & Standards
                      </h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Use structured logging (JSON)</li>
                        <li>• Consistent log levels and formats</li>
                        <li>• Include correlation IDs</li>
                        <li>• Timestamp with timezone</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-blue-600">
                        Content & Context
                      </h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Log meaningful events</li>
                        <li>• Include relevant context</li>
                        <li>• Avoid sensitive information</li>
                        <li>• Use appropriate log levels</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3">Log Level Guidelines</h4>
                    <div className="space-y-2">
                      {[
                        {
                          level: "ERROR",
                          desc: "Application errors that need immediate attention",
                          color: "text-red-600",
                        },
                        {
                          level: "WARN",
                          desc: "Warning conditions that might lead to errors",
                          color: "text-orange-600",
                        },
                        {
                          level: "INFO",
                          desc: "General application flow and important events",
                          color: "text-blue-600",
                        },
                        {
                          level: "DEBUG",
                          desc: "Detailed diagnostic information for troubleshooting",
                          color: "text-gray-600",
                        },
                      ].map((item, i) => (
                        <div key={i} className="p-2 border rounded">
                          <div className={`font-medium ${item.color}`}>
                            {item.level}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-3">Logging Anti-patterns</h4>
                    <div className="space-y-2">
                      {[
                        "Logging sensitive data (passwords, tokens)",
                        "Excessive DEBUG logging in production",
                        "Unstructured log messages",
                        "Missing correlation/trace IDs",
                        "Logging everything without filtering",
                      ].map((antipattern, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm"
                        >
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <span>{antipattern}</span>
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
              <CardTitle>Log Level Distribution</CardTitle>
              <CardDescription>
                Current log levels and their frequency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">
                      Minimum Log Level: {getLogLevelName(logLevel[0])}
                    </label>
                    <Badge variant="outline">
                      {getLogLevelName(logLevel[0])}
                    </Badge>
                  </div>
                  <Slider
                    value={logLevel}
                    onValueChange={setLogLevel}
                    max={3}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
                    <span>DEBUG</span>
                    <span>INFO</span>
                    <span>WARN</span>
                    <span>ERROR</span>
                  </div>
                </div>

                <div
                  style={{ width: "100%", height: "300px", minHeight: "300px" }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={logLevels}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="level" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {logLevels.map((level, index) => (
                    <Card key={index} className="p-3 text-center">
                      <div
                        className="text-lg font-bold"
                        style={{ color: level.color }}
                      >
                        {level.count}
                      </div>
                      <div className="text-sm">{level.level}</div>
                      <Badge variant="outline" className="mt-1">
                        {level.severity}
                      </Badge>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Structured Logging Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">
                      ✓ Good Example
                    </h5>
                    <pre className="text-xs overflow-x-auto bg-green-100 dark:bg-green-900 p-2 rounded">
                      {`{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "ERROR",
  "service": "user-api",
  "trace_id": "abc123def456",
  "span_id": "span789",
  "user_id": "user_456",
  "endpoint": "/api/users/456",
  "method": "GET",
  "status_code": 500,
  "error": "Database connection timeout",
  "duration_ms": 5000,
  "retries": 3
}`}
                    </pre>
                  </div>

                  <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                    <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">
                      ✗ Bad Example
                    </h5>
                    <pre className="text-xs overflow-x-auto bg-red-100 dark:bg-red-900 p-2 rounded">
                      {`User 456 failed to login at 10:30 - DB timeout after 5s`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Log Aggregation Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Activity className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs mt-1">Applications</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs mt-1">Log Shipper</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <Search className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs mt-1">Search Engine</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs mt-1">Visualization</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-center">
                      <Badge variant="outline">ELK Stack / EFK Stack</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>
                        <strong>Elasticsearch:</strong> Search and analytics
                        engine
                      </div>
                      <div>
                        <strong>Logstash/Fluentd:</strong> Data processing
                        pipeline
                      </div>
                      <div>
                        <strong>Kibana:</strong> Visualization and exploration
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Log Retention & Storage Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Log Level</TableHead>
                    <TableHead>Hot Storage</TableHead>
                    <TableHead>Warm Storage</TableHead>
                    <TableHead>Cold Storage</TableHead>
                    <TableHead>Total Retention</TableHead>
                    <TableHead>Cost Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">ERROR</TableCell>
                    <TableCell>30 days</TableCell>
                    <TableCell>90 days</TableCell>
                    <TableCell>1 year</TableCell>
                    <TableCell>1 year</TableCell>
                    <TableCell>
                      <Badge variant="destructive">High</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">WARN</TableCell>
                    <TableCell>14 days</TableCell>
                    <TableCell>30 days</TableCell>
                    <TableCell>90 days</TableCell>
                    <TableCell>90 days</TableCell>
                    <TableCell>
                      <Badge variant="default">Medium</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INFO</TableCell>
                    <TableCell>7 days</TableCell>
                    <TableCell>14 days</TableCell>
                    <TableCell>30 days</TableCell>
                    <TableCell>30 days</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Low</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">DEBUG</TableCell>
                    <TableCell>1 day</TableCell>
                    <TableCell>3 days</TableCell>
                    <TableCell>7 days</TableCell>
                    <TableCell>7 days</TableCell>
                    <TableCell>
                      <Badge variant="outline">Very Low</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What is Distributed Tracing?</CardTitle>
              <CardDescription>
                Distributed tracing tracks requests as they flow through
                multiple services in a distributed system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <h4 className="mb-3">Why Distributed Tracing?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2 text-purple-600">
                        Performance Issues
                      </h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Identify slow services</li>
                        <li>• Find performance bottlenecks</li>
                        <li>• Understand request flow</li>
                        <li>• Optimize critical paths</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-orange-600">
                        Error Analysis
                      </h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Root cause analysis</li>
                        <li>• Error propagation tracking</li>
                        <li>• Service dependency mapping</li>
                        <li>• Failure correlation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3">Tracing Concepts</h4>
                    <div className="space-y-3">
                      {[
                        {
                          term: "Trace",
                          desc: "Complete request journey across all services",
                          icon: "🔄",
                        },
                        {
                          term: "Span",
                          desc: "Individual operation within a trace",
                          icon: "📊",
                        },
                        {
                          term: "Trace ID",
                          desc: "Unique identifier linking all spans",
                          icon: "🆔",
                        },
                        {
                          term: "Span ID",
                          desc: "Unique identifier for each operation",
                          icon: "#️⃣",
                        },
                      ].map((concept, i) => (
                        <div key={i} className="p-3 border rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <span>{concept.icon}</span>
                            <h5 className="font-medium">{concept.term}</h5>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {concept.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-3">Implementation Benefits</h4>
                    <div className="space-y-2">
                      {[
                        "Faster root cause analysis",
                        "Better understanding of service dependencies",
                        "Performance optimization insights",
                        "Improved debugging experience",
                        "Enhanced monitoring capabilities",
                      ].map((benefit, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{benefit}</span>
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
              <CardTitle>Distributed Tracing</CardTitle>
              <CardDescription>
                Trace requests across multiple services to identify bottlenecks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TracingVisualization />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sampling Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Probabilistic Sampling</h5>
                      <Badge variant="outline">10%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Random sampling based on probability
                    </p>
                    <div className="text-xs bg-muted p-2 rounded">
                      <strong>Best for:</strong> High-volume services with
                      consistent traffic
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Rate Limiting</h5>
                      <Badge variant="outline">100/sec</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Fixed number of traces per time window
                    </p>
                    <div className="text-xs bg-muted p-2 rounded">
                      <strong>Best for:</strong> Controlling trace volume and
                      costs
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Adaptive Sampling</h5>
                      <Badge variant="default">Smart</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Dynamic sampling based on service behavior
                    </p>
                    <div className="text-xs bg-muted p-2 rounded">
                      <strong>Best for:</strong> Optimizing signal-to-noise
                      ratio
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>OpenTelemetry Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h5 className="font-medium mb-2">
                      Auto-instrumentation Libraries
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <Badge variant="outline">Node.js</Badge>
                      <Badge variant="outline">Python</Badge>
                      <Badge variant="outline">Java</Badge>
                      <Badge variant="outline">Go</Badge>
                      <Badge variant="outline">.NET</Badge>
                      <Badge variant="outline">PHP</Badge>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Implementation Steps</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="w-6 h-6 text-center p-0"
                        >
                          1
                        </Badge>
                        <span>Install OpenTelemetry SDK</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="w-6 h-6 text-center p-0"
                        >
                          2
                        </Badge>
                        <span>Configure trace exporters</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="w-6 h-6 text-center p-0"
                        >
                          3
                        </Badge>
                        <span>Add auto-instrumentation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="w-6 h-6 text-center p-0"
                        >
                          4
                        </Badge>
                        <span>Create custom spans</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="slos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SLAs, SLOs, and SLIs Explained</CardTitle>
              <CardDescription>
                Understanding the hierarchy of service level management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-4">
                    <h4 className="font-medium mb-2 text-blue-600">SLA</h4>
                    <h5 className="text-sm font-medium mb-1">
                      Service Level Agreement
                    </h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      Legal contract with consequences
                    </p>
                    <div className="text-xs space-y-1">
                      <div>
                        <strong>Example:</strong>
                      </div>
                      <div>"99.9% uptime or credit"</div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2 text-green-600">SLO</h4>
                    <h5 className="text-sm font-medium mb-1">
                      Service Level Objective
                    </h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      Internal target for reliability
                    </p>
                    <div className="text-xs space-y-1">
                      <div>
                        <strong>Example:</strong>
                      </div>
                      <div>"99.95% of requests &lt; 200ms"</div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2 text-purple-600">SLI</h4>
                    <h5 className="text-sm font-medium mb-1">
                      Service Level Indicator
                    </h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      Measurable metric
                    </p>
                    <div className="text-xs space-y-1">
                      <div>
                        <strong>Example:</strong>
                      </div>
                      <div>"Request latency percentile"</div>
                    </div>
                  </Card>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <h4 className="mb-3">Error Budget Concept</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2">
                        What is an Error Budget?
                      </h5>
                      <p className="text-muted-foreground mb-2">
                        The amount of unreliability you can tolerate while
                        meeting your SLO
                      </p>
                      <div className="text-xs bg-orange-100 dark:bg-orange-900 p-2 rounded">
                        <strong>Formula:</strong> Error Budget = 1 - SLO
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">
                        How to Use Error Budgets
                      </h5>
                      <ul className="space-y-1 text-muted-foreground text-xs">
                        <li>• Balance reliability vs velocity</li>
                        <li>• Make informed deployment decisions</li>
                        <li>• Prioritize reliability work</li>
                        <li>• Set incident response priorities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SLO Examples by Service Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sloDefinitions.map((slo, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{slo.service}</h4>
                      <Badge variant="outline">{slo.measurement}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-blue-600 mb-1">SLI:</h5>
                        <p className="text-muted-foreground">{slo.sli}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-green-600 mb-1">
                          SLO:
                        </h5>
                        <p className="text-muted-foreground">{slo.slo}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-orange-600 mb-1">
                          Error Budget:
                        </h5>
                        <p className="text-muted-foreground">
                          {slo.errorBudget}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current SLA Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {slaMetrics.map((metric, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {metric.metric}
                          </span>
                          <Badge
                            variant={
                              metric.status === "good"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {metric.status}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Current:</span>
                            <span className="font-medium">
                              {metric.current}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Target:</span>
                            <span>{metric.target}</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              metric.status === "good"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                100,
                                (metric.current / metric.target) * 100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What Makes Effective Alerting?</CardTitle>
              <CardDescription>
                Alerting should be actionable, relevant, and minimize false
                positives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                  <h4 className="mb-3">Alerting Principles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2 text-red-600">
                        Alert Fatigue Problems
                      </h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Too many non-actionable alerts</li>
                        <li>• False positives and noise</li>
                        <li>• Unclear severity levels</li>
                        <li>• Missing context in alerts</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-green-600">
                        Effective Alerting
                      </h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Clear severity classification</li>
                        <li>• Actionable information</li>
                        <li>• Proper escalation policies</li>
                        <li>• Contextual runbooks</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Severity Classification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertingSeverities.map((severity, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{severity.severity}</h4>
                      <div className="flex gap-2">
                        <Badge variant="outline">
                          ⏱️ {severity.responseTime}
                        </Badge>
                        <Badge
                          variant={
                            severity.severity.includes("P0")
                              ? "destructive"
                              : severity.severity.includes("P1")
                              ? "default"
                              : severity.severity.includes("P2")
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {severity.escalation}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {severity.description}
                    </p>

                    <div>
                      <h5 className="text-sm font-medium mb-1">Examples:</h5>
                      <div className="flex flex-wrap gap-1">
                        {severity.examples.map((example, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Alerts Dashboard</CardTitle>
              <CardDescription>
                Real-time system alerts and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  Monitor system alerts in real-time
                </span>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={alertingEnabled}
                    onCheckedChange={setAlertingEnabled}
                  />
                  <label className="text-sm">Enable Alerting</label>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={selectedSeverity === "all" ? "default" : "outline"}
                    onClick={() => setSelectedSeverity("all")}
                    size="sm"
                  >
                    All
                  </Button>
                  {["Critical", "Warning", "Info"].map((severity) => (
                    <Button
                      key={severity}
                      variant={
                        selectedSeverity === severity ? "default" : "outline"
                      }
                      onClick={() => setSelectedSeverity(severity)}
                      size="sm"
                    >
                      {severity}
                    </Button>
                  ))}
                </div>

                <div className="space-y-3">
                  {alertsData
                    .filter(
                      (alert) =>
                        selectedSeverity === "all" ||
                        alert.severity === selectedSeverity
                    )
                    .map((alert) => (
                      <Card key={alert.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                alert.severity === "Critical"
                                  ? "bg-red-500"
                                  : alert.severity === "Warning"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                              }`}
                            ></div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {alert.service}
                                </span>
                                <Badge
                                  variant={
                                    alert.severity === "Critical"
                                      ? "destructive"
                                      : alert.severity === "Warning"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {alert.severity}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {alert.message}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">{alert.time}</div>
                            <Badge
                              variant={
                                alert.status === "firing"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {alert.status}
                            </Badge>
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
              <CardTitle>Incident Response Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div style={{ width: "100%", height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={incidentResponse}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="phase" />
                      <YAxis />
                      <Tooltip
                        formatter={(value, name) => [`${value} minutes`, name]}
                      />
                      <Bar dataKey="duration" fill="#8884d8" name="Duration" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {incidentResponse.map((phase, index) => (
                    <Card key={index} className="p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{phase.phase}</h4>
                        <Badge variant="outline">{phase.duration}min</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <h5 className="font-medium text-blue-600 mb-1">
                            Key Activities:
                          </h5>
                          <ul className="text-xs space-y-1 text-muted-foreground">
                            {phase.activities.slice(0, 3).map((activity, i) => (
                              <li key={i}>• {activity}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-green-600 mb-1">
                            Success Criteria:
                          </h5>
                          <p className="text-xs text-muted-foreground">
                            {phase.success}
                          </p>
                        </div>
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
  );
}
