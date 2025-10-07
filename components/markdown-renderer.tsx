import ReactMarkdown from "react-markdown"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            const language = match ? match[1] : ""

            return !inline && match ? (
              <div className="relative">
                {language && (
                  <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {language}
                  </div>
                )}
                <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto">
                  <code className="text-sm font-mono text-foreground whitespace-pre" {...props}>
                    {String(children).replace(/\n$/, "")}
                  </code>
                </pre>
              </div>
            ) : (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            )
          },
          h1: ({ children }) => <h1 className="text-4xl font-bold text-foreground mb-6 text-balance">{children}</h1>,
          h2: ({ children }) => (
            <h2 className="text-3xl font-semibold text-foreground mb-4 mt-8 text-balance">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold text-foreground mb-3 mt-6 text-balance">{children}</h3>
          ),
          p: ({ children }) => <p className="text-muted-foreground mb-4 leading-relaxed text-pretty">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-2">{children}</ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
