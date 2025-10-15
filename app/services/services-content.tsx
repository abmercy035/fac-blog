"use client"

import { useState } from "react"
import { BlogHeader } from "@/components/blog-header";
import{ Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Pen, BookOpen, Target, } from "lucide-react"
import emailjs from '@emailjs/browser'

export default function ServicesContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    wordCount: "",
    deadline: "",
    projectDetails: "",
    budget: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, 
        {
          to_name: 'Victory', 
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          phone: formData.phone,
          project_type: formData.projectType,
          word_count: formData.wordCount,
          deadline: formData.deadline,
          project_details: formData.projectDetails,
          budget: formData.budget,
          reply_to: formData.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      console.log('SUCCESS!', result.status, result.text)
      setSubmitMessage("Thank you! Your request has been sent successfully. I'll get back to you within 24 hours.")
      
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        projectType: "",
        wordCount: "",
        deadline: "",
        projectDetails: "",
        budget: ""
      })
    } catch (error) {
      console.log('FAILED...', error)
      setSubmitMessage("Sorry, there was an error sending your request. Please try again or contact me directly.")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitMessage(""), 8000)
    }
  }
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4">Writing Services</Badge>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-6">
Ready to bring your vision to life?
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
           Whether it’s writing, editing, creative strategy, or custom projects tailored to your unique needs, I’m here to help you craft meaningful, impactful content across all themes and topics.  
          </p>
        </div>

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-xl md:text-3xl font-bold text-center mb-12">What My Writing Services Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Pen className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-base md:text-xl">Writing & Content Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm md:text-lg">
                  I craft diverse, meaningful content across multiple genres and themes—from original poetry and lyrical prose 
                  exploring humanity, spirituality, emotion, and imagination, to faith-based writing and spiritual reflections 
                  that offer critical views on religion and belief systems.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="md:text-xl">Editorial & Proofreading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm md:text-lg">
                  Ensure your content is error-free and polished with professional editorial and proofreading services. 
                  I meticulously review grammar, spelling, punctuation, and flow to deliver publication-ready work that 
                  maintains your authentic voice while meeting the highest standards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="md:text-xl">Creative Strategy Consulting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm md:text-lg">
                  Elevate your content with strategic creative direction and planning. I help you develop compelling 
                  narratives, establish brand voice, plan content calendars, and craft messaging strategies that 
                  resonate with your audience and achieve your goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

     

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl md:text-3xl text-center">Request Writing Services</CardTitle>
              <p className="text-center text-sm md:text-base text-muted-foreground mt-2">
                Tell us about your project and we'll provide a custom quote and timeline within 48 hours.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Sarah" 
                      required 
                      disabled={isSubmitting}
                      style={{ borderRadius: '0.5rem' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Johnson" 
                      required 
                      disabled={isSubmitting}
                      style={{ borderRadius: '0.5rem' }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="sarah.johnson@example.com" 
                    required 
                    disabled={isSubmitting}
                    style={{ borderRadius: '0.5rem' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    type="tel" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567" 
                    disabled={isSubmitting}
                    style={{ borderRadius: '0.5rem' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type *</Label>
                  <select 
                    id="projectType" 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input bg-background text-foreground"
                    style={{ borderRadius: '0.5rem' }}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select a project type</option>
                    <option value="writing-content">Writing / Content Creation</option>
                    <option value="editorial-proofreading">Editorial / Proofreading</option>
                    <option value="creative-strategy">Creative Strategy Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wordCount">Estimated Word Count / Length</Label>
                  <Input 
                    id="wordCount" 
                    name="wordCount"
                    value={formData.wordCount}
                    onChange={handleInputChange}
                    placeholder="e.g., 2000 words, 5 blog posts, 200-page book" 
                    disabled={isSubmitting}
                    style={{ borderRadius: '0.5rem' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Desired Deadline</Label>
                  <Input 
                    id="deadline" 
                    name="deadline"
                    type="date" 
                    value={formData.deadline}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    style={{ borderRadius: '0.5rem' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectDetails">Project Details *</Label>
                  <Textarea 
                    id="projectDetails" 
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    placeholder="Please describe your writing project, target audience, key messages, tone preferences, and any specific requirements..."
                    rows={6}
                    required
                    disabled={isSubmitting}
                    style={{ borderRadius: '0.5rem' }}
                  />
                  <p className="text-xs text-muted-foreground">
                    The more details you provide, the better we can tailor our services to your needs.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range (Optional)</Label>
                  <select 
                    id="budget" 
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input bg-background text-foreground"
                    style={{ borderRadius: '0.5rem' }}
                    disabled={isSubmitting}
                  >
                    <option value="">Select a range</option>
                    <option value="under-100">Under $100</option>
                    <option value="100-250">$100 - $250</option>
                    <option value="250-500">$250 - $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="over-1000">Over $1,000</option>
                  </select>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                  style={{ borderRadius: '0.5rem' }}
                >
                  {isSubmitting ? "Sending Request..." : "Submit Request"}
                </Button>

                {/* Success/Error Message */}
                {submitMessage && (
                  <div className={`mt-4 p-4 rounded-md text-sm text-center ${
                    submitMessage.includes("Thank you") 
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
