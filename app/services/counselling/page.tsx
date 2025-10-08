import { Metadata } from "next"
import { BlogHeader } from "@/components/blog-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Heart, Users, Shield, Lightbulb, MessageCircle, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Counselling Services",
  description: "Faith-centered counselling services to help you navigate life's challenges with wisdom and grace. Professional guidance integrating biblical wisdom with compassionate listening.",
  keywords: [
    "faith counselling",
    "Christian counselling",
    "spiritual guidance",
    "faith-based therapy",
    "pastoral counselling",
    "emotional healing",
    "relationship counselling",
  ],
  openGraph: {
    title: "Counselling Services | FAC",
    description: "Faith-centered counselling services to help you navigate life's challenges with wisdom and grace.",
  },
}

export default function CounsellingPage() {
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4">Counselling Services</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Finding Peace Through Faith-Centered Guidance
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Life's journey can be challenging, but you don't have to walk it alone. Our faith-centered counselling 
            services offer a safe space to explore your struggles, find healing, and discover hope through the lens 
            of faith, grace, and wisdom.
          </p>
        </div>

        {/* Description Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  At FAC, we believe that true healing comes from integrating faith with professional guidance. 
                  Our counselling approach combines biblical wisdom with compassionate listening, helping you navigate 
                  anxiety, depression, relationship challenges, spiritual questions, and life transitions.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Whether you're facing a crisis or seeking deeper understanding of your faith journey, our experienced 
                  counsellors provide personalized support tailored to your unique needs. We create a judgment-free 
                  environment where you can be honest about your struggles and discover the strength that comes from 
                  faith-rooted healing.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Sessions can be conducted in-person or virtually, making support accessible wherever you are. 
                  We work with individuals, couples, and families seeking to grow in faith while addressing life's challenges.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits of Our Counselling Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-xl">Emotional Healing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find relief from anxiety, depression, and emotional pain through faith-based therapeutic approaches 
                  that honor your spiritual beliefs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-xl">Safe Space</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Experience complete confidentiality and non-judgmental support where you can freely express your 
                  thoughts, fears, and questions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-xl">Relationship Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Strengthen your relationships with spouses, family members, and friends through faith-centered 
                  communication and conflict resolution.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lightbulb className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-xl">Spiritual Clarity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Gain deeper understanding of your faith journey, address spiritual doubts, and discover renewed 
                  purpose and direction in your walk with God.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-xl">Professional Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive expert counsel from trained professionals who integrate psychological insights with 
                  biblical wisdom and compassion.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-xl">Flexible Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access support on your schedule with both in-person and virtual sessions available, making healing 
                  convenient and accessible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Request a Counselling Session</CardTitle>
              <p className="text-center text-muted-foreground mt-2">
                Fill out the form below and we'll get back to you within 24 hours to schedule your first session.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      required 
                      style={{ borderRadius: '0.5rem' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
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
                    placeholder="john.doe@example.com" 
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
                  <Label htmlFor="sessionType">Preferred Session Type *</Label>
                  <select 
                    id="sessionType" 
                    className="w-full px-3 py-2 border border-input bg-background text-foreground"
                    style={{ borderRadius: '0.5rem' }}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="individual">Individual Counselling</option>
                    <option value="couples">Couples Counselling</option>
                    <option value="family">Family Counselling</option>
                    <option value="group">Group Sessions</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred Time</Label>
                  <select 
                    id="preferredTime" 
                    className="w-full px-3 py-2 border border-input bg-background text-foreground"
                    style={{ borderRadius: '0.5rem' }}
                  >
                    <option value="">Select an option</option>
                    <option value="morning">Morning (9am - 12pm)</option>
                    <option value="afternoon">Afternoon (12pm - 5pm)</option>
                    <option value="evening">Evening (5pm - 8pm)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Tell Us About Your Needs *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please share what brings you to counselling and what you hope to gain from our sessions..."
                    rows={6}
                    required
                    style={{ borderRadius: '0.5rem' }}
                  />
                  <p className="text-xs text-muted-foreground">
                    Your information is completely confidential and will only be used to match you with the right counsellor.
                  </p>
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
