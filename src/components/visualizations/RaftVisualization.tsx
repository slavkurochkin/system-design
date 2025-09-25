import React from 'react'
import { Badge } from '../ui/badge'
import { Slider } from '../ui/slider'
import { Server } from 'lucide-react'

interface RaftVisualizationProps {
  clusterSize: number[]
  onClusterSizeChange: (size: number[]) => void
}

export function RaftVisualization({ clusterSize, onClusterSizeChange }: RaftVisualizationProps) {
  const nodes = Array.from({ length: clusterSize[0] }, (_, i) => ({
    id: i + 1,
    role: i === 0 ? 'Leader' : 'Follower',
    status: 'Active'
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <h5 className="font-medium mb-2">Cluster Size: {clusterSize[0]}</h5>
          <Slider
            value={clusterSize}
            onValueChange={onClusterSizeChange}
            max={9}
            min={3}
            step={2}
            className="w-full"
          />
          <div className="text-xs text-muted-foreground mt-1">
            Fault tolerance: {Math.floor((clusterSize[0] - 1) / 2)} failures
          </div>
        </div>
        
        <div className="col-span-2">
          <div className="grid grid-cols-3 gap-2">
            {nodes.map((node) => (
              <div 
                key={node.id} 
                className={`p-3 rounded-lg text-center ${
                  node.role === 'Leader' ? 'bg-blue-50 dark:bg-blue-950 border-2 border-blue-500' : 
                  'bg-gray-50 dark:bg-gray-900 border'
                }`}
              >
                <div className="font-medium">Node {node.id}</div>
                <div className="text-sm text-muted-foreground">{node.role}</div>
                <Badge variant={node.role === 'Leader' ? 'default' : 'outline'} className="mt-1">
                  {node.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-muted/30 rounded-lg">
        <h5 className="font-medium mb-2">Raft Algorithm Properties</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <strong>Leader Election:</strong> One leader per term, handles all client requests
          </div>
          <div>
            <strong>Log Replication:</strong> Leader replicates entries to followers
          </div>
          <div>
            <strong>Safety:</strong> Committed entries are durable and consistent
          </div>
        </div>
      </div>
    </div>
  )
}