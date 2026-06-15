import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, Calendar, MapPin, Sparkles, ChevronRight, Check } from "lucide-react";

export default function Experience() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const careerHistory = [
    {
      company: "Upward Next Inc.",
      role: "Front End Engineer",
      period: "March 2022 - PRESENT",
      location: "Remote",
      highlight: "Led engineering teams and shaped custom, high-speed corporate, and Welcart e-commerce WordPress architectures.",
      details: [
        "Developed custom WordPress websites, landing pages, and e-commerce solutions. Built responsive interfaces using HTML, CSS/SCSS, JavaScript, and PHP, while optimizing performance, SEO, and user experience. Collaborated with cross-functional teams through code reviews, QA, and version control workflows."
      ]
    },
    {
      company: "Independent Freelance",
      role: "Full Stack CMS & Frontend Developer",
      period: "2021 - Present",
      location: "Remote / Worldwide",
      highlight: "Crafting lightweight web projects, converting prototypes to responsive layouts, and engineering custom database platforms.",
      details: [
        "Develop high-performance client websites from scratch pairing modern interactive systems with HTML/CSS/JS, PHP, and modern frameworks.",
        "Build fully customized, lightning-fast WordPress themes utilizing ACF Pro and targeted custom field frameworks.",
        "Conduct thorough lighthouse auditing, asset compression, and mobile responsiveness tuning to ensure pristine usability."
      ]
    }
  ];

  return (
    <section 
      id="experience" 
      className="relative py-24 px-6 bg-[#050505] border-t border-white/10"
    >
      <div className="absolute inset-0 bg-[#050505] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] rounded-full bg-white/[0.01] blur-[90px] pointer-events-none mask-radial" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-12">
          <div className="space-y-3">
            <span className="text-xs md:text-sm font-sans text-zinc-400 tracking-wider uppercase block font-semibold">
              Career Timeline
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tight text-white uppercase">
              Work <span className="font-serif italic font-normal text-zinc-300">Experience.</span>
            </h2>
          </div>
          <p className="max-w-lg text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
            A cohesive timeline of leading development teams, solving interactive complexities, and deploying robust CMS themes.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Summary Info (Cols 1 to 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 bg-[#0c0c0c] border border-white/10 rounded-none space-y-6">
              <div className="flex items-center gap-2.5 text-xs font-sans text-zinc-300 uppercase tracking-wider font-semibold">
                <Sparkles className="w-4 h-4 text-zinc-400" />
                <span>Core Skills</span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif italic text-white leading-snug font-normal">
                Merging modular engineering with aesthetic design systems.
              </h3>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Applying modern reactive structures like React and TypeScript alongside custom PHP models to create reliable backend capabilities, fast-loading portfolios, and clean typography layouts.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-3">
                {["WordPress", "PHP/REST API", "React.JS", "HTML5/CSS3", "JavaScript", "SCSS", "Git", "Figma", "XD", "Illustrator", "Photoshop", "Customer Service", "SEO Tuning"].map((sk, idx) => (
                  <span 
                    key={idx}
                    className="text-xs font-mono bg-black border border-white/10 px-3 py-1 font-medium text-zinc-300 hover:text-white transition duration-200"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Core Timeline (Cols 5 to 12) */}
          <div className="lg:col-span-8 space-y-12 relative">
            {/* Visual vertical stem line */}
            <div className="absolute left-[21px] top-6 bottom-6 w-[1px] bg-white/10 hidden sm:block" />

            {careerHistory.map((item, idx) => {
              const isFirst = idx === 0;

              return (
                <motion.div 
                  key={idx}
                  id={`exp-card-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="relative pl-0 sm:pl-12 group"
                >
                  {/* Outer circle hub node */}
                  <div className={`absolute left-4.5 top-2.5 w-2.5 h-2.5 rounded-full border hidden sm:block transition-all duration-300 ${
                    hoveredIdx === idx 
                      ? "bg-white border-white scale-125" 
                      : "bg-black border-zinc-700"
                  }`} />

                  <div className="p-8 bg-[#0c0c0c] border border-white/5 group-hover:border-white/15 transition-all duration-300 relative rounded-none shadow-xl">
                    {/* Active gloss top-border line */}
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Role Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-white/5">
                      <div>
                        <span className="text-xs font-mono text-zinc-400 font-medium uppercase tracking-widest block">
                          {item.company}
                        </span>
                        <h4 className="text-xl md:text-2xl font-sans font-semibold text-white uppercase tracking-tight mt-1">
                          {item.role}
                        </h4>
                      </div>
                      
                      {/* Meta context info */}
                      <div className="flex flex-wrap gap-4 font-mono text-xs text-zinc-400 uppercase tracking-wider self-start sm:self-center">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                          {item.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    {/* Brief highlights banner text */}
                    <div className="py-5">
                      <p className="text-sm md:text-base text-zinc-200 font-serif italic font-light leading-relaxed">
                        &ldquo;{item.highlight}&rdquo;
                      </p>
                    </div>

                    {/* Checklists bullets */}
                    <ul className="space-y-4 border-t border-white/5 pt-6">
                      {item.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex gap-4.5 items-start">
                          <span className="w-5 h-5 rounded-none bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-zinc-400 group-hover:text-white transition-colors" />
                          </span>
                          <span className="text-sm md:text-[15px] text-zinc-300 font-sans leading-relaxed group-hover:text-zinc-200 transition-colors">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
