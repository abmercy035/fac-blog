"use client"

import { useState } from "react"
import emailjs from '@emailjs/browser'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function EmailJSTest() {
  const [testResult, setTestResult] = useState("")
  const [testing, setTesting] = useState(false)

  const testEmailJS = async () => {
    setTesting(true)
    setTestResult("")

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_name: 'Victor',
          from_name: 'Test User',
          from_email: 'test@example.com',
          phone: '+1 (555) 123-4567',
          project_type: 'Test',
          word_count: 'Test project',
          deadline: '2025-12-31',
          project_details: 'This is a test email to verify EmailJS configuration.',
          budget: 'Under $100',
          reply_to: 'test@example.com',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      setTestResult(`✅ Success! Email sent successfully. Status: ${result.status}`)
    } catch (error) {
      console.error('EmailJS test failed:', error)
      setTestResult(`❌ Failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>EmailJS Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Test your EmailJS configuration by sending a test email.
        </p>
        <Button 
          onClick={testEmailJS} 
          disabled={testing}
          className="w-full"
        >
          {testing ? "Sending Test Email..." : "Send Test Email"}
        </Button>
        {testResult && (
          <div className={`p-3 rounded text-sm ${
            testResult.includes('Success') 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {testResult}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
