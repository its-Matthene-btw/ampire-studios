// file: components/ProcessSection.tsx

import React from 'react';

const processSteps = [
  {
    step: 1,
    title: "Discovery & Consultation",
    description: "We start by understanding your business, goals, and requirements through detailed discussions and research.",
    color: "bg-primary-light dark:bg-primary-dark"
  },
  {
    step: 2,
    title: "Planning & Strategy",
    description: "Our team creates a comprehensive project plan with timelines, milestones, and technology stack recommendations.",
    color: "bg-secondary-light dark:bg-secondary-dark"
  },
  {
    step: 3,
    title: "Design & Prototyping",
    description: "We develop wireframes and design mockups for your approval before any development begins.",
    color: "bg-purple-500"
  },
  {
    step: 4,
    title: "Development",
    description: "Our developers build your solution with clean, efficient code following industry best practices.",
    color: "bg-blue-500"
  },
  {
    step: 5,
    title: "Testing & Quality Assurance",
    description: "We rigorously test all functionality across devices and browsers to ensure flawless performance.",
    color: "bg-green-500"
  },
  {
    step: 6,
    title: "Launch & Support",
    description: "We deploy your solution and provide training plus ongoing support to ensure long-term success.",
    color: "bg-yellow-500"
  }
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary-light dark:text-primary-dark font-semibold">OUR PROCESS</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">How We Bring Your Vision to Life</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Our structured approach ensures efficiency, transparency, and outstanding results at every stage.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step relative pl-16 pb-12">
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold z-10">
                  <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center`}>
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}