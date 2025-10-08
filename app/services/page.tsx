import { Metadata } from "next"
import { BlogHeader } from "@/components/blog-header";
import{ Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Pen, BookOpen, Sparkles, Target, Edit3, Clock, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Writing Services",
  description: "Professional writing services that bring your faith-centered stories, content, and ideas to life with clarity and creativity. Blogs, books, devotionals, and more.",
  keywords: [
    "faith writing",
    "Christian writing services",
    "devotional writing",
    "blog writing",
    "book writing",
    "content writing",
    "faith-based content",
  ],
  openGraph: {
    title: "Writing Services | FAC",
    description: "Professional writing services that bring your faith-centered stories, content, and ideas to life with clarity and creativity.",
  },
}

export default function WritingPage() {
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4">Writing Services</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
Ready to bring your vision to life?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
           Whether it’s writing, editing, creative strategy, or custom projects tailored to your unique needs, I’m here to help you craft meaningful, impactful content across all themes and topics.  
          </p>
        </div>

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What My Writing Services Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Pen className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-xl">Writing & Content Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg">
                  I craft diverse, meaningful content across multiple genres and themes—from original poetry and lyrical prose 
                  exploring humanity, spirituality, emotion, and imagination, to faith-based writing and spiritual reflections 
                  that offer critical views on religion and belief systems.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-xl">Editorial & Proofreading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg">
                  Ensure your content is error-free and polished with professional editorial and proofreading services. 
                  I meticulously review grammar, spelling, punctuation, and flow to deliver publication-ready work that 
                  maintains your authentic voice while meeting the highest standards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-xl">Creative Strategy Consulting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg">
                  Elevate your content with strategic creative direction and planning. I help you develop compelling 
                  narratives, establish brand voice, plan content calendars, and craft messaging strategies that 
                  resonate with your audience and achieve your goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Let's Connect Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-0 shadow-lg bg-primary/5">
            <CardContent className="py-12 text-center">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Let's Connect</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Open to collaborations and new ideas.
              </p>
              <a 
                href="mailto:victoryatet@gmail.com" 
                className="inline-flex items-center gap-2 text-xl font-medium text-primary hover:underline"
              >
                <Mail className="h-5 w-5" />
                victoryatet@gmail.com
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Request Writing Services</CardTitle>
              <p className="text-center text-muted-foreground mt-2">
                Tell us about your project and we'll provide a custom quote and timeline within 48 hours.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Sarah" 
                      required 
                      style={{ borderRadius: '0.5rem' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Johnson" 
                      required 
                      style={{ borderRadius: '0.5rem' }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="sarah.johnson@example.com" 
                    required 
                    style={{ borderRadius: '0.5rem' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+1 (555) 123-4567" 
                    style={{ borderRadius: '0.5rem' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type *</Label>
                  <select 
                    id="projectType" 
                    className="w-full px-3 py-2 border border-input bg-background text-foreground"
                    style={{ borderRadius: '0.5rem' }}
                    required
                  >
                    <option value="">Select a project type</option>
                    <option value="blog">Blog Posts / Articles</option>
                    <option value="book">Book / Manuscript</option>
                    <option value="devotional">Devotionals / Reflections</option>
                    <option value="website">Website Content</option>
                    <option value="creative">Creative Writing / Fiction</option>
                    <option value="editing">Editing / Proofreading</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wordCount">Estimated Word Count / Length</Label>
                  <Input 
                    id="wordCount" 
                    placeholder="e.g., 2000 words, 5 blog posts, 200-page book" 
                    style={{ borderRadius: '0.5rem' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Desired Deadline</Label>
                  <Input 
                    id="deadline" 
                    type="date" 
                    style={{ borderRadius: '0.5rem' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectDetails">Project Details *</Label>
                  <Textarea 
                    id="projectDetails" 
                    placeholder="Please describe your writing project, target audience, key messages, tone preferences, and any specific requirements..."
                    rows={6}
                    required
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
                    className="w-full px-3 py-2 border border-input bg-background text-foreground"
                    style={{ borderRadius: '0.5rem' }}
                  >
                    <option value="">Select a range</option>
                    <option value="under-500">Under $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000-2500">$1,000 - $2,500</option>
                    <option value="2500-5000">$2,500 - $5,000</option>
                    <option value="over-5000">Over $5,000</option>
                  </select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-foreground text-background hover:bg-foreground/90"
                  size="lg"
                  style={{ borderRadius: '0.5rem' }}
                >
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
