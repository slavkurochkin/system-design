import React from 'react'
import { Badge } from '../ui/badge'
import { Switch } from '../ui/switch'

interface ConsistentHashingVisualizationProps {
  hashingEnabled: boolean
  onHashingToggle: (enabled: boolean) => void
}

export function ConsistentHashingVisualization({ hashingEnabled, onHashingToggle }: ConsistentHashingVisualizationProps) {
  const nodes = ['Node A', 'Node B', 'Node C', 'Node D']
  const virtualNodes = hashingEnabled ? 3 : 1
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch
            checked={hashingEnabled}
            onCheckedChange={onHashingToggle}
          />
          <label>Enable Virtual Nodes</label>
        </div>
        <Badge variant={hashingEnabled ? 'default' : 'outline'}>
          {hashingEnabled ? `${virtualNodes} virtual nodes per physical node` : 'Direct hashing'}
        </Badge>
      </div>
      
      <div className="flex justify-center">
        <div className="relative w-64 h-64">
          {/* Hash Ring */}
          <div className="absolute inset-0 border-4 border-dashed border-gray-300 rounded-full"></div>
          
          {/* Nodes on the ring */}
          {nodes.map((node, index) => {
            const angle = (index * 90) * Math.PI / 180
            const x = Math.cos(angle) * 120 + 128
            const y = Math.sin(angle) * 120 + 128
            
            return (
              <div 
                key={node}
                className="absolute w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs transform -translate-x-6 -translate-y-6"
                style={{ left: x, top: y }}
              >
                {node.slice(-1)}
              </div>
            )
          })}
          
          {/* Virtual nodes if enabled */}
          {hashingEnabled && nodes.map((node, nodeIndex) => 
            Array.from({ length: virtualNodes - 1 }, (_, vIndex) => {
              const angle = ((nodeIndex * 90) + ((vIndex + 1) * 30)) * Math.PI / 180
              const x = Math.cos(angle) * 100 + 128
              const y = Math.sin(angle) * 100 + 128
              
              return (
                <div 
                  key={`${node}-v${vIndex}`}
                  className="absolute w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs transform -translate-x-3 -translate-y-3"
                  style={{ left: x, top: y }}
                >
                  {node.slice(-1)}
                </div>
              )
            })
          )}
          
          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm font-medium">Hash Ring</div>
              <div className="text-xs text-muted-foreground">
                {nodes.length * (hashingEnabled ? virtualNodes : 1)} positions
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 border rounded-lg">
          <h5 className="font-medium mb-2">Load Distribution</h5>
          <div className="text-sm">
            {hashingEnabled ? 'More balanced with virtual nodes' : 'May have hot spots'}
          </div>
        </div>
        <div className="p-3 border rounded-lg">
          <h5 className="font-medium mb-2">Rebalancing Cost</h5>
          <div className="text-sm">
            {hashingEnabled ? 'Minimal data movement' : 'Significant reshuffling'}
          </div>
        </div>
      </div>
    </div>
  )
}