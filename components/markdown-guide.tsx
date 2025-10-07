"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react"

export function MarkdownGuide() {
  const [isOpen, setIsOpen] = useState(false)

  const syntaxExamples = [
    {
      category: "Headers",
      examples: [
        { syntax: "# Header 1", description: "Main title" },
        { syntax: "## Header 2", description: "Section title" },
        { syntax: "### Header 3", description: "Subsection title" },
      ],
    },
    {
      category: "Text Formatting",
      examples: [
        { syntax: "**bold text**", description: "Bold text" },
        { syntax: "*italic text*", description: "Italic text" },
        { syntax: "~~strikethrough~~", description: "Strikethrough text" },
        { syntax: "`inline code`", description: "Inline code" },
      ],
    },
    {
      category: "Lists",
      examples: [
        { syntax: "- Item 1\n- Item 2", description: "Unordered list" },
        { syntax: "1. Item 1\n2. Item 2", description: "Ordered list" },
        { syntax: "- [ ] Todo item\n- [x] Done item", description: "Checklist" },
      ],
    },
    {
      category: "Links & Images",
      examples: [
        { syntax: "[Link text](https://example.com)", description: "Link" },
        { syntax: "![Alt text](image.jpg)", description: "Image" },
      ],
    },
    {
      category: "Code Blocks",
      examples: [
        { syntax: "```javascript\nconst x = 1;\n```", description: "Code block with syntax highlighting" },
        { syntax: "```\nPlain code block\n```", description: "Plain code block" },
      ],
    },
    {
      category: "Other Elements",
      examples: [
        { syntax: "> Blockquote text", description: "Blockquote" },
        { syntax: "---", description: "Horizontal rule" },
        { syntax: "| Col 1 | Col 2 |\n|-------|-------|\n| Data  | Data  |", description: "Table" },
      ],
    },
  ]

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between bg-transparent">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Markdown Syntax Guide</span>
          </div>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Card className="mt-2">
          <CardHeader>
            <CardTitle className="text-lg">Markdown Syntax Reference</CardTitle>
            <CardDescription>Quick reference for formatting your blog posts with Markdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {syntaxExamples.map((section) => (
              <div key={section.category}>
                <h4 className="font-semibold text-sm mb-2 text-primary">{section.category}</h4>
                <div className="space-y-2">
                  {section.examples.map((example, index) => (
                    <div key={index} className="grid grid-cols-1 gap-1 text-sm">
                      <div className="font-mono text-xs bg-muted p-2 rounded border">{example.syntax}</div>
                      <div className="text-muted-foreground text-xs px-2">{example.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                💡 <strong>Tip:</strong> Use the Preview tab to see how your markdown will look before publishing.
              </p>
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  )
}
