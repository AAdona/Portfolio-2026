import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check, ExternalLink, Globe, HardDrive, LayoutGrid, Briefcase, Beaker } from "lucide-react";
import { Project } from "../types";

function ProjectVisualMockup({ id }: { id: string }) {
  let imgSrc = "";
  let altText = "";

  if (id === "my-home") {
    imgSrc = "/images/myhome.png";
    altText = "My Home Custom WordPress Theme Placeholder";
  } else if (id === "aidec-plus") {
    imgSrc = "/images/aidec.png";
    altText = "Aidec Plus Curated Furniture Placeholder";
  } else if (id === "ptruck") {
    imgSrc = "/images/ptruck.png";
    altText = "PTRUCK Relational Fleet CMS Placeholder";
  } else if (id === "block-forge") {
    imgSrc = "/images/adi-convert.png";
    altText = "adi-convert Image Converter Preview";
  }

  return (
    <div className="absolute inset-0 bg-[#080808] flex items-center justify-center overflow-hidden">
      <img 
        src={imgSrc} 
        alt={altText}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-95 transition-all duration-500 scale-[1.01]"
      />
    </div>
  );
}

export default function FeaturedProjects() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"commercial" | "personal">("commercial");

  const projects: Project[] = [
    {
      id: "my-home",
      title: "My Home",
      url: "https://www.myhome-co.com/",
      description: "Custom premium WordPress theme development featuring ultra-responsive regional property search flows, speed optimizations, and ACF Pro architecture.",
      role: "Lead CMS Architect & Frontend Specialist",
      year: "2024",
      category: "REAL ESTATE PORTAL",
      tags: ["WordPress", "PUG", "CSS/SCSS", "Typescript", "Git"],
      achievements: [],
      stats: [
        { label: "LCP", value: "1.1s" },
        { label: "Speed Index", value: "1.3s" }
      ]
    },
    {
      id: "aidec-plus",
      title: "Aidec Plus",
      url: "https://aidecplus.com/",
      description: "Sleek, high-end furniture design portal using custom block patterns, lazy-loaded aesthetic product showcases, and high-DPI graphics tuning.",
      role: "Senior Themes Engineer",
      year: "2023",
      category: "DESIGN & MFG PORTAL",
      tags: ["WordPress", "Custom Block Themes", "CSS/SCSS", "PUG", "Typescript", "Git"],
      achievements: [],
      stats: [
        { label: "LCP", value: "1.2s" },
        { label: "CLS", value: "0.01" }
      ]
    },
    {
      id: "ptruck",
      title: "PTRUCK",
      url: "https://www.ptruck.co.jp/",
      description: "Relational vehicle fleet database portal with highly optimized custom query filters under the WordPress hood and mobile-first typography scales.",
      role: "Core Technical Frontend Lead",
      year: "2023",
      category: "ENTERPRISE CORP CMS",
      tags: ["WordPress", "Relational CMS", "Speed Tuning", "CSS/SCSS"],
      achievements: [],
      stats: [
        { label: "FCP", value: "0.9s" },
        { label: "Performance", value: "95%" }
      ]
    }
  ];

  const personalProjects: Project[] = [
    {
      id: "block-forge",
      title: "adi-convert",
      url: "https://adi-convert.vercel.app/",
      description: "An image-converter/compressor web application using a custom-built canvas engine to achieve high-quality results with minimal file sizes.",
      role: "Creator & Developer",
      year: "2026",
      category: "LABORATORY GRAPHICS",
      tags: ["React", "Tailwind", "Canvas API", "Web Workers", "Vite", "Git", "Vercel"],
      achievements: [],
      stats: [
        { label: "Weight", value: "14kb" },
        { label: "Rendering", value: "60fps" }
      ]
    }
  ];

  const activeProjects = activeTab === "commercial" ? projects : personalProjects;

  return (
    <section 
      id="work" 
      className="relative min-h-screen py-24 px-6 bg-[#050505]"
    >
      {/* Visual ambient noise */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute top-[30%] right-[15%] w-[400px] h-[400px] rounded-full bg-white/1 blur-[100px] pointer-events-none mask-radial" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-12">
          <div className="space-y-3">
            <span className="text-xs md:text-sm font-sans text-zinc-400 font-semibold tracking-wider uppercase block">
              Recent Case Studies
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tight text-white uppercase">
              Featured <span className="font-serif italic font-normal text-zinc-300">Projects.</span>
            </h2>
          </div>
          <p className="max-w-lg text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
            Real-world CMS platforms and specialized internal application architectures engineered to combine design aesthetics with fast execution times.
          </p>
        </div>

        {/* Tab Selection Filter */}
        <div className="flex justify-start pt-2">
          <div className="inline-flex p-1 bg-zinc-950/80 border border-white/15 rounded-xl select-none w-full sm:w-auto overflow-hidden">
            <button
              onClick={() => {
                setActiveTab("commercial");
                setHoveredIdx(null);
              }}
              data-cursor="pointer"
              className={`relative flex items-center justify-center gap-2.5 py-3 px-6 rounded-lg text-xs md:text-sm font-mono uppercase tracking-widest transition-colors duration-300 cursor-pointer min-w-[200px] ${
                activeTab === "commercial" ? "text-black font-bold" : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {activeTab === "commercial" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-white rounded-lg"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                [01] Work
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab("personal");
                setHoveredIdx(null);
              }}
              data-cursor="pointer"
              className={`relative flex items-center justify-center gap-2.5 py-3 px-6 rounded-lg text-xs md:text-sm font-mono uppercase tracking-widest transition-colors duration-300 cursor-pointer min-w-[200px] ${
                activeTab === "personal" ? "text-black font-bold" : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {activeTab === "personal" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-white rounded-lg"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Beaker className="w-4 h-4" />
                [02] Personal
              </span>
            </button>
          </div>
        </div>

        {/* Projects list */}
        <div className="space-y-24">
          {activeProjects.map((proj, idx) => {
            return (
              <div 
                key={proj.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                
                {/* Visual Mock Card (Cols 1 to 6) */}
                <div className="lg:col-span-6 order-last lg:order-first">
                  {/* Mock Browser Container */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full aspect-video rounded-none border border-white/10 bg-[#0c0c0c] overflow-hidden shadow-2xl group flex flex-col justify-between"
                  >
                    {/* Browser Header Bar */}
                    <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/5 bg-[#0a0a0a]">
                      {/* Interactive window dots */}
                      <div className="flex gap-2">
                        <span className="w-2 h-2 rounded-none bg-zinc-850" />
                        <span className="w-2 h-2 rounded-none bg-zinc-850" />
                        <span className="w-2 h-2 rounded-none bg-zinc-850" />
                      </div>
                      
                      {/* URL Box */}
                      <div className="flex items-center gap-1.5 px-4 py-1 bg-black border border-white/5 rounded-none text-[11px] font-mono text-zinc-450 w-[60%] justify-center overflow-hidden whitespace-nowrap">
                        <Globe className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{proj.url.replace("https://", "")}</span>
                      </div>
                      
                      <HardDrive className="w-4 h-4 text-zinc-700" />
                    </div>
 
                    {/* Inside Canvas display mockup */}
                    <div className="flex-1 p-6 relative overflow-hidden select-none min-h-[220px]">
                      {/* Dynamically Rendered Visual Wireframe Preview */}
                      <ProjectVisualMockup id={proj.id} />
                      
                      {/* Overlay Premium Hover Interaction State */}
                      <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center gap-1.5 z-10 backdrop-blur-[2px]">
                        <h4 className="text-base md:text-lg font-sans font-semibold text-white tracking-wider uppercase">
                          {proj.title}
                        </h4>
                        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block pb-4">
                          {proj.category}
                        </span>
                        <a 
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor="view_live"
                          className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-none text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 transform scale-95 group-hover:scale-100 cursor-pointer shadow-md"
                        >
                          Launch Project <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
 
                    {/* Browser Footer - Performance Stats */}
                    <div className="px-5 py-3.5 border-t border-white/5 bg-[#0a0a0a] flex items-center justify-between text-[11px] font-mono rounded-none">
                      <span className="text-zinc-500 uppercase font-medium">SYS_PERFORMANCE: OK</span>
                      <div className="flex gap-4">
                        {proj.stats?.map((st, sidx) => (
                          <div key={sidx} className="flex gap-1.5 items-center">
                            <span className="text-zinc-450">{st.label}:</span>
                            <span className="text-white font-mono font-bold">{st.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
 
                {/* Text explanation block (Cols 7 to 12) */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Category tag */}
                  <span className="text-xs font-mono text-zinc-400 font-semibold tracking-[0.2em] uppercase block">
                    {proj.category} &bull; {proj.year}
                  </span>
                  
                  {/* Main Title */}
                  <h3 className="text-3xl md:text-4xl font-serif font-light lowercase text-white tracking-tight italic">
                    {proj.title}.
                  </h3>
 
                  {/* Description text */}
                  <p className="text-sm md:text-base text-zinc-300 font-sans leading-relaxed">
                    {proj.description}
                  </p>
 
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                    {proj.tags.map((tag, tidx) => (
                      <span 
                        key={tidx}
                        className="px-3.5 py-1.5 rounded-none bg-[#0c0c0c] border border-white/5 text-xs font-mono text-zinc-350 uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
 
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}