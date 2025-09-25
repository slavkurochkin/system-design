import React from 'react'
import { Badge } from '../ui/badge'
import { Slider } from '../ui/slider'
import { Activity, Shield, X, RefreshCw, Zap } from 'lucide-react'

interface CircuitBreakerVisualizationProps {
  circuitBreakerState: string
  failureRate: number[]
  setFailureRate: (value: number[]) => void
  setCircuitBreakerState: (state: string) => void
}

export function CircuitBreakerVisualization({ 
  circuitBreakerState, 
  failureRate, 
  setFailureRate, 
  setCircuitBreakerState 
}: CircuitBreakerVisualizationProps) {
  const getStateColor = () => {
    switch (circuitBreakerState) {
      case 'open': return 'bg-red-500'
      case 'half-open': return 'bg-yellow-500'
      default: return 'bg-green-500'
    }
  }

  const getStateIcon = () => {
    switch (circuitBreakerState) {
      case 'open': return <X className="w-8 h-8 text-white" />
      case 'half-open': return <RefreshCw className="w-8 h-8 text-white" />
      default: return <Zap className="w-8 h-8 text-white" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="space-y-6 text-center">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm mt-2">Client</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-20 h-16 ${getStateColor()} rounded-lg flex items-center justify-center relative`}>
                {getStateIcon()}
              </div>
              <span className="text-sm mt-2">Circuit Breaker</span>
              <Badge variant="outline" className="mt-1 capitalize">{circuitBreakerState}</Badge>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm mt-2">Service</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div>
              <label className="text-sm font-medium">Failure Rate: {failureRate[0]}%</label>
              <Slider
                value={failureRate}
                onValueChange={(value) => {
                  setFailureRate(value)
                  if (value[0] > 50) setCircuitBreakerState('open')
                  else if (value[0] > 20) setCircuitBreakerState('half-open')
                  else setCircuitBreakerState('closed')
                }}
                max={100}
                min={0}
                step={5}
                className="w-64"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="p-2 border rounded">
                <div className="font-medium text-green-600">Closed</div>
                <div className="text-muted-foreground">Normal operation</div>
              </div>
              <div className="p-2 border rounded">
                <div className="font-medium text-yellow-600">Half-Open</div>
                <div className="text-muted-foreground">Testing recovery</div>
              </div>
              <div className="p-2 border rounded">
                <div className="font-medium text-red-600">Open</div>
                <div className="text-muted-foreground">Failing fast</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}