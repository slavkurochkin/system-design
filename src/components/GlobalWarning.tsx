import React, { useState, useEffect } from 'react'
import { Alert, AlertDescription } from './ui/alert'
import { AlertTriangle, X } from 'lucide-react'
import { Button } from './ui/button'

export function GlobalWarning() {
  const [isVisible, setIsVisible] = useState(true)

  // Check if warning was previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('system-design-warning-dismissed')
    if (dismissed === 'true') {
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('system-design-warning-dismissed', 'true')
  }

  if (!isVisible) {
    return null
  }

  return (
    <Alert className="mb-6 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="flex justify-between items-start">
        <div className="text-amber-800 dark:text-amber-200">
          <strong>⚠️ Heads up!</strong> This is a static site, so any interactive content (like form entries or temporary data) won't stick around after a refresh. Additionally, much of the content was generated with AI, so please use careful judgment and fact-check information before making important career decisions.
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleDismiss}
          className="ml-4 h-auto p-1 text-amber-600 hover:text-amber-700 hover:bg-amber-100 dark:text-amber-300 dark:hover:text-amber-200 dark:hover:bg-amber-900"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}