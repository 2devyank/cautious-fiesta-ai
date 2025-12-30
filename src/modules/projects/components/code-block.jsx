import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
// import SyntaxHighlighter from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('typescript', ts);
const CodeBlock = ({code,language,filename}) => {
    const [copy,setCopy]=useState(false);
    const handleCopy=()=>{
        navigator.clipboard.writeText(code);
        setCopy(true);
        setTimeout(()=>{
            setCopy(false);
        },2000);
    }
    console.log("language",language);
  return (
    <div className="rounded-lg overflow-hidden border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-sm font-medium text-foreground truncate">
            {filename}
          </span>
        </div>
        <Button 
          onClick={handleCopy}
          variant="ghost"
          size="sm"
          className="shrink-0 ml-2 h-8 px-3 text-xs"
        >
          {copy ? "Copied" : "Copy"}
        </Button>
      </div>
      {/* Code Content */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter 
          showLineNumbers={true} 
          style={vscDarkPlus} 
          language={language}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'var(--font-mono)',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default CodeBlock