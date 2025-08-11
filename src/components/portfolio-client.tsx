"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { type Project } from "@prisma/client";

const ITEMS_PER_PAGE = 6;

interface PortfolioClientProps {
  projects: Project[];
}

export function PortfolioClientComponent({ projects }: PortfolioClientProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filters = [
    { id: "all", label: "All" },
    { id: "web", label: "Web Design" },
    { id: "ecommerce", label: "E-Commerce" },
    { id: "branding", label: "Branding" },
    { id: "marketing", label: "Marketing" },
  ];

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        (project.description || '').toLowerCase().includes(activeFilter.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeFilter, projects]);

  const projectsToShow = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < filteredProjects.length;

  return (
    <>
      <div id="filter-buttons" className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`filter-btn px-4 py-2 font-medium rounded-md transition ${
              activeFilter === filter.id ? "active-filter" : ""
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div id="portfolio-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsToShow.map((project, index) => (
          <Link
            href={`/portfolio/${project.slug}`}
            key={project.id}
            className="portfolio-item-wrapper"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="portfolio-item group relative rounded-xl overflow-hidden shadow-lg h-full">
              <img
                src={project.imageUrl || "/placeholder.jpg"}
                alt={project.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="portfolio-overlay absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-200 mb-4 text-sm line-clamp-2">{project.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {projectsToShow.length === 0 && (
         <div className="text-center col-span-full py-12">
           <p className="text-gray-500 dark:text-gray-400">No projects found for this category.</p>
         </div>
      )}

      {hasMoreProjects && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
            className="bg-primary-light dark:bg-primary-dark text-white px-6 py-3 rounded-md hover:opacity-90 transition font-medium"
          >
            Load More
          </button>
        </div>
      )}
      
      <style jsx global>{`
        .filter-btn.active-filter {
          background-color: #6366f1;
          color: white;
        }
        .dark .filter-btn.active-filter {
          background-color: #818cf8;
        }
        .filter-btn:not(.active-filter) {
          background-color: #f3f4f6;
          color: #374151;
        }
        .dark .filter-btn:not(.active-filter) {
          background-color: #374151;
          color: #d1d5db;
        }
        .filter-btn {
           font-weight: 500;
        }
        @keyframes itemFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .portfolio-item-wrapper {
          animation: itemFadeIn 0.5s ease-in-out forwards;
          opacity: 0;
        }
        .testimonial-card {
          transition: all 0.3s ease;
        }
        .testimonial-card:hover {
          transform: scale(1.02);
        }
      `}</style>
    </>
  );
}