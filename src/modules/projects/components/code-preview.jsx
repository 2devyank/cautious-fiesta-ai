import { Button } from '@/components/ui/button';
import { ExternalLink, RefreshCw } from 'lucide-react';
import React, { useState } from 'react'

const CodePreview = ({url,title}) => {
    const [loading,setLoading]=useState(false);
    const [key,setKey]=useState(0);
    const handleRefresh=()=>{
        setKey(prev=>prev+1);
        setLoading(true);
    }
  return (
  
        <div className="rounded-lg overflow-hidden border border-gray-700 bg-[#1e1e1e]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm text-gray-300 font-medium ml-2">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="h-8 px-2 text-gray-400 hover:text-white"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(url, "_blank")}
            className="h-8 px-2 text-gray-400 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
        </div>

{/* Preview */}
<div className="relative bg-white" style={{ height: "600px" }}>
  {loading && (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
    </div>
  )}
  <iframe
    key={key}
    src={url}
    className="w-full h-full"
    onLoad={() => setLoading(false)}
    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
  />
</div>
</div>
  )
}

export default CodePreview
