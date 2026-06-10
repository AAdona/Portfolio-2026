import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check, ExternalLink, Globe, HardDrive, LayoutGrid } from "lucide-react";
import { Project } from "../types";

function ProjectVisualMockup({ id }: { id: string }) {
  if (id === "my-home") {
    return (
      <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-br from-[#0a0a0a] to-[#040404] text-white select-none">
        {/* Real Estate Header Mock */}
        <div className="flex items-center justify-between text-[8px] font-mono text-zinc-500 border-b border-white/5 pb-2">
          <span>MYHOME // RESIDENCE_ARCHIVE</span>
          <span>EST_2024</span>
        </div>
        {/* Real Estate Body Mock */}
        <div className="flex-1 flex flex-col justify-center items-center gap-2">
          <div className="text-center space-y-0.5">
            <span className="text-[13px] font-serif italic text-white block">find your space.</span>
            <span className="text-[7px] font-mono text-zinc-650 uppercase tracking-widest block">premium residential database</span>
          </div>
          {/* Mock Search Bar */}
          <div className="w-11/12 flex items-center justify-between border border-white/10 bg-black/40 px-2.5 py-1 text-[7px] font-mono text-zinc-400">
            <span>Location: Tokyo, Shibuya...</span>
            <span className="text-white border-l border-white/10 pl-2 text-[6px] tracking-wider uppercase font-bold">SEARCH</span>
          </div>
          {/* Wireframe Cards */}
          <div className="grid grid-cols-3 gap-1.5 w-11/12 pt-1">
            <div className="border border-white/5 bg-white/[0.02] aspect-video p-1 flex flex-col justify-between">
              <span className="text-[5px] font-mono text-zinc-650">MIN_UNIT_01</span>
              <div className="h-0.5 w-[70%] bg-white/20" />
            </div>
            <div className="border border-white/5 bg-white/[0.02] aspect-video p-1 flex flex-col justify-between">
              <span className="text-[5px] font-mono text-zinc-650">MIN_UNIT_02</span>
              <div className="h-0.5 w-[50%] bg-white/20" />
            </div>
            <div className="border border-white/5 bg-white/[0.02] aspect-video p-1 flex flex-col justify-between">
              <span className="text-[5px] font-mono text-zinc-400">SELECTED</span>
              <div className="h-0.5 w-[85%] bg-white/40" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (id === "aidec-plus") {
    return (
      <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-tr from-[#050505] to-[#121212] text-white select-none">
        {/* Furniture Agency Header */}
        <div className="flex items-center justify-between text-[8px] font-mono text-zinc-500 border-b border-white/5 pb-2">
          <span>AIDEC_SYSTEM // METRIC_CRAFTS</span>
          <span>CURATED_2023</span>
        </div>
        {/* Design Wireframe Body Mock */}
        <div className="flex-1 flex gap-4 items-center justify-center px-1">
          {/* Left Side: Curated Grid selection */}
          <div className="flex-1 flex flex-col gap-1 h-full justify-center text-left">
            <span className="text-[11px] font-serif font-light text-zinc-200 leading-tight">curated modern chairs.</span>
            <span className="text-[6px] font-mono text-zinc-500 uppercase tracking-widest block">Model SC-291</span>
            <div className="h-0.5 bg-white/20 w-3/4" />
          </div>
          {/* Right Side: Visual Chair Schematic vector drawing using CSS */}
          <div className="w-[85px] h-[75px] border border-white/10 bg-black/60 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
            {/* Minimalist modern chair outline drawing using pure CSS lines/divs */}
            <div className="relative w-9 h-11 border border-white/20 rounded-t-sm flex flex-col justify-between p-0.5">
              <div className="h-0.5 w-full bg-white/30" />
              <div className="flex justify-between w-full h-6">
                <div className="w-[1px] bg-white/30 h-full" />
                <div className="relative w-4 h-4 border-t border-r border-white/15 self-end" />
                <div className="w-[1px] bg-white/30 h-full" />
              </div>
            </div>
            {/* Dimensions notation overlay */}
            <span className="absolute bottom-0.5 right-1 text-[5px] font-mono text-zinc-550">620 x 580 x 810mm</span>
            <span className="absolute top-0.5 left-1 text-[5px] font-mono text-zinc-400 font-bold">AID_C29</span>
          </div>
        </div>
      </div>
    );
  }
  if (id === "ptruck") {
    return (
      <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-br from-[#0a0a0a] to-[#060c12] text-white select-none">
        {/* Logistics CMS Header */}
        <div className="flex items-center justify-between text-[8px] font-mono text-zinc-500 border-b border-white/5 pb-2">
          <span>PTRUCK // VEHICLE_SOLUTIONS</span>
          <span>VERSION_3.24</span>
        </div>
        {/* Body Mock: Logistics database row details */}
        <div className="flex-1 flex flex-col justify-center gap-1 text-left">
          <span className="text-[11px] font-sans font-light tracking-tight text-white">
            PTRUCK <span className="font-serif italic font-normal text-zinc-400">Database Search</span>
          </span>
          {/* Database simulation table list with custom details */}
          <div className="border border-white/10 bg-black/50 p-1.5 space-y-1 font-mono text-[6px] text-zinc-400">
            <div className="flex justify-between text-zinc-650 border-b border-white/5 pb-0.5">
              <span>TRUCK_MODEL_ID</span>
              <span>ENGINE_SPEC</span>
              <span>STATE</span>
            </div>
            <div className="flex justify-between text-zinc-300">
              <span className="font-bold text-white">FUSO_CANTER_01</span>
              <span>7.5L_DIESEL</span>
              <span className="text-white">IN_STOCK</span>
            </div>
            <div className="flex justify-between">
              <span>ISUZU_GIGA_TRK</span>
              <span>9.8L_TURBO</span>
              <span className="text-zinc-600">RESERVED</span>
            </div>
            <div className="flex justify-between">
              <span>HINO_PROFIA_049</span>
              <span>8.9L_ENERGY</span>
              <span className="text-zinc-300">ARRIVING</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function FeaturedProjects() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: "my-home",
      title: "My Home",
      url: "https://www.myhome-co.com/",
      description: "Custom premium WordPress theme development featuring ultra-responsive regional property search flows, speed optimizations, and ACF Pro architecture.",
      role: "Lead CMS Architect & Frontend Specialist",
      year: "2024",
      category: "REAL ESTATE PORTAL",
      tags: ["WordPress", "Frontend Dev", "ACF Pro", "CMS Architecture"],
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
      tags: ["WordPress", "Custom Block Themes", "Responsive UI", "CSS/SCSS"],
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
      tags: ["WordPress", "Relational CMS", "Speed Tuning", "SCSS"],
      achievements: [],
      stats: [
        { label: "FCP", value: "0.9s" },
        { label: "Performance", value: "95%" }
      ]
    }
  ];

  return (
    <section 
      id="projects" 
      className="relative min-h-screen py-24 px-6 bg-[#050505]"
    >
      {/* Visual ambient noise */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute top-[30%] right-[15%] w-[400px] h-[400px] rounded-full bg-white/1 blur-[100px] pointer-events-none mask-radial" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 tracking-[0.25em] uppercase block">
              // RECENT_ACCOMPLISHMENTS
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight text-white uppercase">
              Featured <span className="font-serif italic font-normal text-zinc-300">Case Studies.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs text-zinc-500 font-sans leading-relaxed">
            Real-world CMS platforms and complex frontend systems engineered with high performance, secure structures, and fluid responsive styling.
          </p>
        </div>

        {/* Projects list */}
        <div className="space-y-24">
          {projects.map((proj, idx) => {
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
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0a0a0a]">
                      {/* Interactive window dots */}
                      <div className="flex gap-2">
                        <span className="w-1.5 h-1.5 rounded-none bg-zinc-800" />
                        <span className="w-1.5 h-1.5 rounded-none bg-zinc-800" />
                        <span className="w-1.5 h-1.5 rounded-none bg-zinc-800" />
                      </div>
                      
                      {/* URL Box */}
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-black border border-white/5 rounded-none text-[9px] font-mono text-zinc-500 w-[60%] justify-center overflow-hidden whitespace-nowrap">
                        <Globe className="w-2.5 h-2.5 text-zinc-600" />
                        <span>{proj.url.replace("https://", "")}</span>
                      </div>
                      
                      <HardDrive className="w-3.5 h-3.5 text-zinc-700" />
                    </div>

                    {/* Inside Canvas display mockup */}
                    <div className="flex-1 p-6 relative overflow-hidden select-none min-h-[200px]">
                      {/* Dynamically Rendered Visual Wireframe Preview */}
                      <ProjectVisualMockup id={proj.id} />
                      
                      {/* Overlay Premium Hover Interaction State */}
                      <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center gap-1 z-10 backdrop-blur-[2px]">
                        <h4 className="text-sm font-sans font-medium text-white tracking-wider uppercase">
                          {proj.title}
                        </h4>
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block pb-3">
                          {proj.category}
                        </span>
                        <a 
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor="view_live"
                          className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-none text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-300 transform scale-95 group-hover:scale-100 cursor-pointer shadow-md"
                        >
                          Launch Project <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Browser Footer - Performance Stats */}
                    <div className="px-5 py-3 border-t border-white/5 bg-[#0a0a0a] flex items-center justify-between text-[9px] font-mono rounded-none">
                      <span className="text-zinc-600 uppercase">SYS_PERFORMANCE: OK</span>
                      <div className="flex gap-4">
                        {proj.stats?.map((st, sidx) => (
                          <div key={sidx} className="flex gap-1.5 items-center">
                            <span className="text-zinc-500">{st.label}:</span>
                            <span className="text-white font-mono">{st.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Text explanation block (Cols 7 to 12) */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Category tag */}
                  <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase block">
                    {proj.category} &bull; {proj.year}
                  </span>
                  
                  {/* Main Title */}
                  <h3 className="text-2xl md:text-3xl font-serif font-light lowercase text-white tracking-tight italic">
                    {proj.title}.
                  </h3>

                  {/* Description text */}
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                    {proj.tags.map((tag, tidx) => (
                      <span 
                        key={tidx}
                        className="px-3 py-1 rounded-none bg-[#0c0c0c] border border-white/5 text-[9px] font-mono text-zinc-500 uppercase tracking-widest"
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
