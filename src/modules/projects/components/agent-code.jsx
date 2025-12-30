// components/AgentResult.tsx
"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode, Globe } from "lucide-react";
import CodePreview from "./code-preview";
import CodeBlock from "./code-block";


export function AgentResult({ files, url, title }) {
  const [activeTab, setActiveTab] = useState("preview");

  // Extract language from filename
  const getLanguage = (filename) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    const languageMap = {
      tsx: "typescript",
      ts: "typescript",
      jsx: "javascript",
      js: "javascript",
      css: "css",
      html: "html",
      json: "json",
      md: "markdown",
    };
    return languageMap[ext || ""] || "typescript";
  };
  console.log("files",files);

  // Clean summary by removing XML tags
//   const cleanSummary = summary
//     .replace(/<task_summary>/g, "")
//     .replace(/<\/task_summary>/g, "")
//     .trim();

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Summary */}
      {/* <div className="rounded-lg border border-gray-700 bg-[#1e1e1e] p-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Summary</h3>
        <p className="text-gray-200">{cleanSummary}</p>
      </div> */}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)}>
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            Code ({Object.keys(files).length})
          </TabsTrigger>
        </TabsList>

        {/* Preview Tab */}
        <TabsContent value="preview" className="mt-4">
          <CodePreview url={url} title={title} />
        </TabsContent>

        {/* Code Tab */}
        <TabsContent value="code" className="mt-4 space-y-4">
          {Object.entries(files).map(([filename, code]) => (
            <CodeBlock

              filename={filename}
              code={code}
              language={getLanguage(filename)}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}