import { notFound } from "next/navigation";
import { getProjectBySlug, getPublishedProjects } from "@/lib/data";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function SingleProjectPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }
  
  return (
    <main>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 text-center bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{project.title}</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              {project.description}
            </p>
          </div>
          {project.imageUrl && (
            <div className="max-w-6xl mx-auto mt-12">
              <img src={project.imageUrl} alt={project.title} className="rounded-xl shadow-2xl w-full" />
            </div>
          )}
        </div>
      </section>

      {/* The main content of your project from the CMS */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div 
            className="prose dark:prose-invert lg:prose-xl max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{ __html: project.content || "" }}
          />
        </div>
      </section>
      
      {/* Optional: You can add more sections from your template here if needed */}
      <section className="py-16 md:py-24 bg-primary-light dark:bg-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Have a Similar Project in Mind?</h2>
            <p className="max-w-2xl mx-auto text-lg mb-8 opacity-90">
              Let's discuss how we can achieve these kinds of results for your business.
            </p>
            <a href="/contact" className="bg-white text-primary-light dark:text-primary-dark px-6 py-3 rounded-md hover:opacity-90 transition font-medium">
              Start Your Project
            </a>
        </div>
      </section>
    </main>
  );
}