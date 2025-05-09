import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { Container } from "@/components/ui/container"
import { WorldMap } from "@/components/world-map"

export default function ContactPage() {
  return (
    <div>
      <Hero
        title="Contact Us"
        description="Get in touch with our team to discuss your AI needs"
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80"
      />

      {/* Contact Information */}
      <Container>
        <section className="py-20 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
                <Card>
                  <CardContent className="p-6">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            First Name
                          </label>
                          <Input placeholder="John" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Last Name
                          </label>
                          <Input placeholder="Doe" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Email
                        </label>
                        <Input type="email" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Phone
                        </label>
                        <Input placeholder="+91 98765 43210" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Message
                        </label>
                        <Textarea
                          placeholder="Tell us about your project..."
                          className="min-h-[150px]"
                        />
                      </div>
                      <Button className="w-full">Send Message</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                <div className="space-y-8">
                  {/* <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">Visit Us</h3>
                          <p className="text-muted-foreground">
                            Spurring Ventures India<br />
                            123 Tech Park, Whitefield<br />
                            Bangalore, Karnataka 560066<br />
                            India
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <Phone className="h-6 w-6 text-primary mr-4 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">Call Us</h3>
                          <p className="text-muted-foreground">
                            +91 80 1234 5678<br />
                            +91 98765 43210
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card> */}

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <Mail className="h-6 w-6 text-primary mr-4 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">Email Us</h3>
                          <p className="text-muted-foreground">
                            info@spurringventures.com<br />
                            spurringventuresindia@gmail.com  
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <Clock className="h-6 w-6 text-primary mr-4 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">Business Hours</h3>
                          <p className="text-muted-foreground">
                            Monday - Friday: 9:00 AM - 6:00 PM<br />
                            Saturday: 10:00 AM - 2:00 PM<br />
                            Sunday: Closed
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
        </section>
        <WorldMap />
      </Container>

      {/* Map Section */}
      {/* <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80"
              alt="Location Map"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-background/20" />
          </div>
        </div>
      </section> */}
    </div>
  )
}