import { db } from "../src/lib/db"

async function createTestimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart Inc.",
      content: "AMpire Studio transformed our online presence completely. Their attention to detail and creative approach helped us increase our conversion rates by 40% within just three months. The team is professional, responsive, and truly understands how to deliver results that matter.",
      featured: true,
      published: true
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "GreenLeaf Solutions",
      content: "Working with AMpire Studio was a game-changer for our business. They took our vision and turned it into a stunning website that perfectly represents our brand. The project was delivered on time and exceeded all our expectations.",
      featured: true,
      published: true
    },
    {
      name: "Emily Rodriguez",
      role: "Founder",
      company: "Bloom Boutique",
      content: "I can't recommend AMpire Studio enough! They helped us launch our e-commerce store and the results have been incredible. Our online sales have tripled since the launch. The team's expertise in both design and development is unmatched.",
      featured: false,
      published: true
    },
    {
      name: "David Thompson",
      role: "Operations Manager",
      company: "LogiFlow Systems",
      content: "The custom web application developed by AMpire Studio has streamlined our operations significantly. Their technical expertise and problem-solving skills are outstanding. They delivered a solution that perfectly fits our business needs.",
      featured: false,
      published: true
    },
    {
      name: "Lisa Wang",
      role: "Creative Director",
      company: "Pixel Perfect Agency",
      content: "As a creative agency ourselves, we have high standards when it comes to design and execution. AMpire Studio not only met but exceeded our expectations. Their collaborative approach and technical excellence made them a pleasure to work with.",
      featured: true,
      published: true
    },
    {
      name: "James Mitchell",
      role: "Small Business Owner",
      company: "Mitchell's Cafe",
      content: "AMpire Studio helped us establish our digital presence from scratch. They created a beautiful website that captures the essence of our local cafe. The ongoing support and maintenance they provide has been invaluable to our business growth.",
      featured: false,
      published: true
    },
    {
      name: "Amanda Foster",
      role: "Digital Marketing Manager",
      company: "GrowthHackers Ltd.",
      content: "The mobile app developed by AMpire Studio has revolutionized how we engage with our customers. The user experience is seamless, and the app has received rave reviews from our user base. Their development process is thorough and efficient.",
      featured: false,
      published: true
    },
    {
      name: "Robert Kim",
      role: "CTO",
      company: "InnovateTech Solutions",
      content: "We hired AMpire Studio for a complex web application project, and they delivered exceptional results. Their technical expertise, attention to detail, and project management skills are top-notch. They've become our go-to development partner.",
      featured: true,
      published: true
    }
  ]

  try {
    console.log("Creating testimonials...")
    
    for (const testimonial of testimonials) {
      const created = await db.testimonial.create({
        data: testimonial
      })
      console.log(`Created testimonial: ${created.name}`)
    }

    console.log("All testimonials created successfully!")
  } catch (error) {
    console.error("Error creating testimonials:", error)
  }
}

createTestimonials()