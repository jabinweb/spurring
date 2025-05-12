import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, ArrowRight, CheckCircle, TrendingUp, Sparkles, Shield, Workflow, HelpCircle } from "lucide-react"
import { Hero } from "@/components/ui/hero"
import { Container } from "@/components/ui/container"
import Image from "next/image"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"

const services = [
  {
    title: "Generative AI Consultation",
    icon: Brain,
    description: "Comprehensive consultation services to transform your business with AI",
    items: [
      { title: "Transform Operations", description: "Enhance efficiency and automate with Gen AI" },
      { title: "Create Novel Content", description: "Leverage data to generate text, images, audio, and more" },
      { title: "Boost Speed & Interaction", description: "Accelerate creation and improve customer engagement" },
      { title: "Industry-Specific AI Agents", description: "Automate and accelerate processes with tailored Gen AI" },
      { title: "Empower & Personalise", description: "Improve products with fine-tuned AI and enhance customer satisfaction" }
    ]
  },
  {
    title: "Generative AI Strategy Development",
    icon: Sparkles,
    description: "Strategic planning and implementation roadmap for AI adoption",
    items: [
      { title: "Unlock Gen AI Potential", description: "Essential for staying competitive" },
      { title: "Establish Ethical AI", description: "Build robust governance and risk protocols" },
      { title: "Mitigate AI Risks", description: "Proactive approach to legal, reputational, and societal concerns" },
      { title: "Guide Infrastructure & Talent", description: "Develop tech capabilities and skills" }
    ]
  },
  {
    title: "Generative AI Performance Optimisation",
    icon: Shield,
    description: "Continuous improvement and optimization of AI systems",
    items: [
      { title: "Maintain Peak Performance", description: "Ensure long-term effectiveness and adaptability" },
      { title: "Continuous AI Improvement", description: "Proactive monitoring and iterative refinement for optimal results" },
      { title: "Navigate Deployment Challenges", description: "Expert guidance on technical and ethical hurdles" },
      { title: "Sustainable AI Operations", description: "Prioritise efficiency and eco-friendly practices" },
      { title: "Long-Term Scalable Success", description: "Confidently deliver exceptional AI results over time" }
    ]
  },
  {
    title: "Generative AI Integration Service",
    icon: Workflow,
    description: "Seamless integration of AI solutions into existing systems",
    items: [
      { title: "Custom AI Apps", description: "Tailored generative AI applications integrated effortlessly" },
      { title: "Expert Guidance", description: "Thorough evaluation and technical expertise for implementation" },
      { title: "End-to-End Support", description: "From workflow integration to ongoing maintenance" }
    ]
  }
]

const industryStats = [
  { label: "Annual Economic Impact", value: "$4.4T" },
  { label: "Synthetic Marketing by 2025", value: "30%" },
  { label: "Efficiency Improvement", value: "60%" },
  { label: "Content Creation Speed", value: "10x" }
]

const aiModels = [
  {
    title: "GPT-4",
    description: "Advanced language model for natural text generation and understanding",
    logo: "https://custom.typingmind.com/assets/models/gpt-4.webp",
    company: "OpenAI",
    capabilities: ["Text Generation", "Code Generation", "Language Translation", "Content Analysis"]
  },
  {
    title: "DALL·E 3",
    description: "State-of-the-art image generation from textual descriptions",
    logo: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/dalle-color.png",
    company: "OpenAI",
    capabilities: ["Image Creation", "Art Generation", "Design Concepts", "Visual Editing"]
  },
  {
    title: "Stable Diffusion",
    description: "Advanced image generation and manipulation model",
    logo: "https://custom.typingmind.com/assets/models/stability.png",
    company: "Stability AI",
    capabilities: ["Image Generation", "Style Transfer", "Image Editing", "Visual Design"]
  },
  {
    title: "Claude",
    description: "Advanced AI assistant for complex tasks and analysis",
    logo: "https://custom.typingmind.com/assets/models/claude.webp",
    company: "Anthropic",
    capabilities: ["Text Analysis", "Research", "Content Generation", "Problem Solving"]
  },
  {
    title: "PaLM 2",
    description: "Large language model with enhanced reasoning capabilities",
    logo: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/palm-color.png",
    company: "Google",
    capabilities: ["Natural Language", "Multilingual", "Reasoning", "Analysis"]
  },
  {
    title: "Midjourney",
    description: "Creative image generation with artistic precision",
    logo: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/midjourney.png",
    company: "Midjourney",
    capabilities: ["Art Creation", "Visual Design", "Concept Art", "Illustrations"]
  }
]

const industryApplications = [
  {
    title: "Content Creation",
    description: "Generate high-quality content across multiple formats with AI assistance.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
  },
  {
    title: "Product Design",
    description: "Accelerate product design and prototyping with AI-generated concepts.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80"
  },
  {
    title: "Software Development",
    description: "Enhance coding efficiency with AI-powered code generation and assistance.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80"
  }
]

const faqItems = [
  {
    question: "What is Generative AI and how can it benefit my business?",
    answer: "Generative AI is a technology that creates new content, from text to images, based on patterns learned from existing data. It can benefit your business by automating content creation, enhancing customer experiences, streamlining operations, and driving innovation across various departments."
  },
  {
    question: "How secure is Generative AI for business use?",
    answer: "We implement robust security measures and ethical guidelines for all AI implementations. This includes data encryption, access controls, and compliance with industry regulations to ensure your business data remains protected."
  },
  {
    question: "What kind of ROI can I expect from Generative AI implementation?",
    answer: "ROI varies by implementation, but businesses typically see 30-60% efficiency improvements in content creation, 40% reduction in operational costs, and significant increases in customer engagement and satisfaction."
  },
  {
    question: "How long does it take to implement Generative AI solutions?",
    answer: "Implementation timelines vary based on scope and complexity. Basic implementations can be completed in 4-6 weeks, while more complex, enterprise-wide solutions may take 3-6 months to fully integrate."
  },
  {
    question: "Do you provide training for our team?",
    answer: "Yes, we provide comprehensive training programs tailored to your team's needs. This includes hands-on workshops, documentation, and ongoing support to ensure your team can effectively utilize and manage the AI solutions."
  }
]

export default function GenerativeAiPage() {
  return (
    <div>
      <Hero
        title="Generative AI Solutions"
        description="Transform your business with cutting-edge generative AI technology"
        video="https://static.vecteezy.com/system/resources/previews/011/106/039/mp4/abstract-background-of-digital-data-free-video.mp4"
      />
      {/* Overview with Stats */}
      <section className="py-20 relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Badge>Innovation Through AI</Badge>
              <h2 className="text-3xl font-bold">Next-Generation AI Solutions</h2>
              <p className="text-lg text-muted-foreground">
                Harnessing the transformative power of generative AI, we specialise in crafting AI solutions that revolutionise businesses across diverse industries, enabling our clients to drive innovation, streamline operations, and achieve scalable solutions. Our end-to-end Generative AI capabilities are designed to reinvent your business workflows and efficiency.
              </p>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {industryStats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            {/* Impact Visualization */}
            <div className="relative rounded-2xl overflow-hidden bg-muted/5 border p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              <Brain className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Economic Impact</h3>
              <p className="text-muted-foreground">
                It is expected that annually AI technology will add about $2.6-$4.4 trillion into the global economy. By 2025, 30% of outbound marketing messages will be synthetically generated. We are committed to help our clients automate content creation, accelerate design, personalise experiences, and be future-ready.
              </p>
            </div>
          </div>
        </Container>
      </section>
      {/* AI Models Section */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-16">
            <Badge className="mb-4">AI Technologies</Badge>
            <h2 className="text-3xl font-bold mb-4">Advanced AI Models We Specialise In</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Leverage cutting-edge AI models to transform your business capabilities
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiModels.map((model, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12">
                      <Image
                        src={model.logo}
                        alt={`${model.title} logo`}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{model.title}</h3>
                      <p className="text-sm text-muted-foreground">{model.company}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{model.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {model.capabilities.map((capability, i) => (
                      <Badge key={i} variant="secondary" className="bg-primary/10">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
      {/* Services Grid */}
      <section className="py-24 bg-muted/50">
        <Container>
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={index} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground mt-1">{service.description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.items.map((item, itemIndex) => (
                    <Card 
                      key={itemIndex} 
                      className="group hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 h-full">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <CheckCircle className="w-4 h-4 text-primary" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground/90 group-hover:text-primary transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      {/* Industry Applications */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Generative AI Across Industries</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform your industry with cutting-edge generative AI solutions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryApplications.map((industry, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{industry.title}</h3>
                  <p className="text-muted-foreground">{industry.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
      {/* FAQ Section */}
      <section className="py-24 bg-muted/50">
        <Container>
          <div className="text-center mb-16">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-3xl font-bold mb-4">Common Questions About Generative AI</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Get answers to frequently asked questions about our Generative AI solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* First Column */}
            <Accordion type="single" collapsible className="w-full">
              {faqItems.slice(0, Math.ceil(faqItems.length / 2)).map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Second Column */}
            <Accordion type="single" collapsible className="w-full">
              {faqItems.slice(Math.ceil(faqItems.length / 2)).map((item, index) => (
                <AccordionItem key={index} value={`item-${index + Math.ceil(faqItems.length / 2)}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>
    </div>
  )
}
