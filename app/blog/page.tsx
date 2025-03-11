import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
  const posts = [
    {
      title: "The Future of AI in Indian Business",
      excerpt: "Exploring how artificial intelligence is transforming businesses across India...",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80",
      date: "2024-03-15",
      readTime: "5 min",
      category: "Industry Insights"
    },
    {
      title: "Implementing Machine Learning in Healthcare",
      excerpt: "A comprehensive guide to leveraging ML for better healthcare outcomes...",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
      date: "2024-03-10",
      readTime: "8 min",
      category: "Healthcare"
    },
    {
      title: "Smart Cities: AI-Driven Urban Planning",
      excerpt: "How artificial intelligence is shaping the future of urban development...",
      image: "https://images.unsplash.com/photo-1573804013926-c3f537c3c0fc?auto=format&fit=crop&q=80",
      date: "2024-03-05",
      readTime: "6 min",
      category: "Smart Cities"
    },
    {
      title: "The Rise of Generative AI",
      excerpt: "Understanding the impact of generative AI on content creation...",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80",
      date: "2024-03-01",
      readTime: "7 min",
      category: "Technology"
    },
    {
      title: "AI Security Best Practices",
      excerpt: "Essential security considerations for AI implementation...",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
      date: "2024-02-25",
      readTime: "10 min",
      category: "Security"
    },
    {
      title: "Data Mining Techniques for Business",
      excerpt: "Advanced techniques for extracting valuable insights from data...",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
      date: "2024-02-20",
      readTime: "9 min",
      category: "Data Science"
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80"
          alt="Blog"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights and updates from the world of AI and technology
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-[400px] md:h-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80"
                    alt="Featured Post"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <Badge className="mb-4">Featured</Badge>
                  <h2 className="text-3xl font-bold mb-4">
                    The Future of AI in Indian Business
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      March 15, 2024
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      5 min read
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Exploring how artificial intelligence is transforming businesses across India,
                    from startups to enterprises. Learn about the latest trends, challenges,
                    and opportunities in AI adoption.
                  </p>
                  <Button asChild>
                    <Link href="/blog/future-of-ai">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <Badge className="mb-4">{post.category}</Badge>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {post.readTime}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/blog/${index}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-muted py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe to our newsletter for the latest insights and updates
          </p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  )
}