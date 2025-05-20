import { Features } from "@/components/services/features"
import { Hero } from "@/components/ui/hero"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Brain, Database, LineChart, Search, BarChart, HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const services = [
  {
    title: "Define & Prepare",
    items: [
      { title: "Goal Setting", description: "Establish clear business objectives and success metrics" },
      { title: "Data Identification", description: "Identify and validate relevant data sources" },
      { title: "Quality Assurance", description: "Ensure data quality and completeness" },
      { title: "Data Preparation", description: "Clean and structure data for mining" }
    ],
    icon: Search
  },
  {
    title: "Model & Evaluate",
    items: [
      { title: "Method Selection", description: "Choose optimal data mining techniques" },
      { title: "Model Development", description: "Build robust and accurate models" },
      { title: "Performance Testing", description: "Rigorous testing and validation" },
      { title: "Result Verification", description: "Ensure accuracy and reliability" }
    ],
    icon: Brain
  },
  {
    title: "Optimise & Adapt",
    items: [
      { title: "Continuous Monitoring", description: "Track model performance and accuracy" },
      { title: "Model Refinement", description: "Enhance models based on new data" },
      { title: "Evolution Management", description: "Adapt to changing business needs" },
      { title: "Performance Optimisation", description: "Improve accuracy and efficiency" }
    ],
    icon: LineChart
  },
  {
    title: "Report & Deliver",
    items: [
      { title: "Clear Reporting", description: "Generate business-ready insights" },
      { title: "Custom Dashboards", description: "Visual representation of key metrics" },
      { title: "Automated Alerts", description: "Timely notification of important insights" },
      { title: "Self-Service Tools", description: "Enable independent analysis capabilities" }
    ],
    icon: BarChart
  }
]

const techStack = [
  {
    category: "Programming Languages",
    items: [
      { name: "Python", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
      { name: "Java", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" },
      { name: "R", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/r/r-original.svg" },
      { name: "JavaScript", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" }
    ]
  },
  {
    category: "Databases & Storage",
    items: [
      { name: "PostgreSQL", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" },
      { name: "Redis", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg" },
      { name: "Amazon S3", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original.svg" }
    ]
  },
  {
    category: "Big Data",
    items: [
      { name: "Apache Spark", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/apache/apache-original.svg" },
      { name: "Hadoop", logo: "https://cdn.worldvectorlogo.com/logos/hadoop.svg" },
      { name: "Databricks", logo: "https://www.vectorlogo.zone/logos/databricks/databricks-icon.svg" },
      { name: "Snowflake", logo: "https://www.vectorlogo.zone/logos/snowflake/snowflake-icon.svg" }
    ]
  },
  {
    category: "Libraries & Frameworks",
    items: [
      { name: "TensorFlow", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg" },
      { name: "PyTorch", logo: "https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg" },
      { name: "scikit-learn", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
      { name: "Pandas", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg" }
    ]
  },
  {
    category: "Data Visualization",
    items: [
      { name: "Tableau", logo: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
      { name: "Power BI", logo: "https://www.vectorlogo.zone/logos/microsoft_powerbi/microsoft_powerbi-icon.svg" },
      { name: "D3.js", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/d3js/d3js-original.svg" },
      { name: "Plotly", logo: "https://www.vectorlogo.zone/logos/plot_ly/plot_ly-icon.svg" }
    ]
  }
]

const industryApplications = [
  {
    title: "Financial Services",
    description: "Uncover patterns in financial data for fraud detection and risk assessment.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
  },
  {
    title: "Healthcare Analytics",
    description: "Analyze patient data to improve care outcomes and operational efficiency.",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80"
  },
  {
    title: "Retail Intelligence",
    description: "Optimize inventory and personalize customer experiences through data.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
  }
]

const faqItems = [
  {
    question: "What is Data Mining and how can it benefit my business?",
    answer: "Data Mining is the process of discovering patterns and relationships in large datasets. It can benefit your business by uncovering valuable insights, improving decision-making, and identifying opportunities for growth and optimization."
  },
  {
    question: "How secure is my data during the mining process?",
    answer: "We implement robust security measures including encryption, access controls, and compliance with industry regulations. Your data security is our top priority throughout the entire mining process."
  },
  {
    question: "What kind of ROI can I expect from Data Mining?",
    answer: "ROI varies by implementation, but businesses typically see 25-40% improvement in decision accuracy, 30% reduction in operational costs, and significant increases in revenue through optimized strategies."
  },
  {
    question: "How long does it take to implement Data Mining solutions?",
    answer: "Implementation timelines vary based on data complexity and project scope. Basic implementations can take 2-4 weeks, while comprehensive solutions may require 2-3 months for full integration."
  }
]

export default function DataMiningPage() {
  return (
    <div>
      <Hero
        title="Data Mining Solutions"
        description="Transform raw data into actionable business insights"
        video="https://videos.pexels.com/video-files/3130284/3130284-sd_640_360_30fps.mp4"
      />

      {/* Overview Section */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge>Data-Driven Insights</Badge>
              <h2 className="text-3xl font-bold">Unlock the Power of Your Data</h2>
              <p className="text-lg text-muted-foreground">
                Transforming raw data into strategic advantages, our comprehensive data mining services uncover hidden patterns that drive informed decisions, boosting productivity and profitability. We empower you with actionable insights, delivering high-quality, reliable, and scalable solutions.
              </p>
              <p className="text-lg text-muted-foreground">
                Leveraging industry-specific expertise and a global reach, we provide rapid turnaround on data mining projects. Our commitment is to equip you with the knowledge needed to make impactful business choices.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <p className="text-sm text-muted-foreground">Data-driven decisions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <p className="text-sm text-muted-foreground">Real-time analytics</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
                alt="Data Mining"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-16">
            <Badge className="mb-4">Technologies</Badge>
            <h2 className="text-3xl font-bold mb-4">Technologies and Methods We Use for Data Mining</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Leverage our comprehensive tech stack for powerful data mining solutions
            </p>
          </div>

          <div className="space-y-16">
            {techStack.map((category, index) => (
              <div key={index} className="space-y-6">
                <h3 className="text-2xl font-bold text-center">{category.category}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.items.map((tech, techIndex) => (
                    <Card key={techIndex} className="group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative w-12 h-12">
                            <Image
                              src={tech.logo}
                              alt={`${tech.name} logo`}
                              fill
                              className="object-contain"
                              sizes="48px"
                            />
                          </div>
                          <h4 className="font-bold text-lg">{tech.name}</h4>
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

      {/* Services Grid - Updated Styling */}
      <section className="py-24 bg-muted/50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Service Scope</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See the unseen in your data. Partner with us for data mining solutions that deliver tangible results, turning complexity into clarity.
            </p>
          </div>

          <div className="grid gap-12">
            {services.map((service, index) => (
              <div key={index} className="space-y-6">
                <div className="flex items-center gap-3">
                  <service.icon className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {service.items.map((item, itemIndex) => (
                    <Card key={itemIndex}>
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
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
            <h2 className="text-3xl font-bold mb-4">Data Mining Across Industries</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform your industry with powerful data mining solutions
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
            <h2 className="text-3xl font-bold mb-4">Common Questions About Data Mining</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Get answers to frequently asked questions about our Data Mining solutions
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
