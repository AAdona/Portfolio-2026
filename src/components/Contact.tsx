import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Linkedin, Github, ArrowUpRight, Check, Download, FileText, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [downloadState, setDownloadState] = useState<"idle" | "preparing" | "ready">("idle");

  const coreSkills = [
    "Frontend Development",
    "WordPress Development",
    "Custom CMS Solutions",
    "JavaScript",
    "TypeScript",
    "CSS / SCSS",
    "GSAP Animations",
    "Responsive Web Development",
    "Performance Optimization",
    "UI Implementation"
  ];

  const handleDownload = () => {
    if (downloadState !== "idle") return;
    setDownloadState("preparing");
    setTimeout(() => {
      setDownloadState("ready");
      
      // Dynamic download action for Adrian's tailored creative resume
      const element = document.createElement("a");
      const file = new Blob([
        `ADRIAN HERO ADONA - FRONTEND DEVELOPER RESUME\n\n` +
        `Portfolio: https://ais-pre-je4mpvquhy3ao4qpeyjnal-958613295827.asia-southeast1.run.app\n` +
        `Email: keepcalm0023@gmail.com\n\n` +
        `POSITIONING & STATEMENT:\n` +
        `Building modern, high-performance websites with WordPress, custom CMS solutions, and engaging web interactions.\n\n` +
        `CORE EXPERIENCE & EXPERTISE:\n` +
        coreSkills.map(s => `- ${s}`).join("\n") +
        `\n\nFEATURED RECENT CASE STUDIES:\n` +
        `- My Home (https://www.myhome-co.com/)\n` +
        `  Role: Lead CMS Architect & Frontend Specialist (2024)\n` +
        `- Aidec Plus (https://aidecplus.com/)\n` +
        `  Role: Senior Themes Engineer (2023)\n` +
        `- PTRUCK (https://www.ptruck.co.jp/)\n` +
        `  Role: Core Technical Frontend Lead (2023)`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = "Adrian_Hero_Adona_Resume.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      // Reset state after a few seconds
      setTimeout(() => {
        setDownloadState("idle");
      }, 3000);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-[90vh] py-24 px-6 bg-[#050505] flex flex-col justify-center animate-fade-in"
    >
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="absolute bottom-0 right-[5%] w-[45vw] h-[45vw] rounded-full bg-white/1 blur-[120px] pointer-events-none mask-radial" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10 w-full">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 tracking-[0.25em] uppercase block">
              // PROJECT_DISPATCH // COLLABORATE
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight text-white uppercase">
              Get in <span className="font-serif italic font-normal text-zinc-300">Touch.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs text-zinc-500 font-sans leading-relaxed">
            Let&apos;s build real performant websites. Choose to connect via email, view my repository updates, or request my complete technical resume dossier.
          </p>
        </div>

        {/* Primary Contact Area Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: About Me Positioning (Cols 1 to 6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                ABOUT // FOCUS
              </span>
              <h3 className="text-xl md:text-2xl font-serif italic font-light text-white leading-snug">
                Engineering high-performance custom WordPress themes, fluid layouts, and detailed responsive interfaces.
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                I direct my professional focus on pristine typography pairing, layouts using balanced negative space, responsive structures, fast-loading bundle weights, and clean semantic structures.
              </p>
            </div>
          </div>

          {/* Right Column: Clean Actions & Direct Connections (Cols 7 to 12) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold border-b border-white/10 pb-3">
              COMMUNICATION_CHANNELS // DIRECT_ACTIONS
            </span>

            {/* List direct action links */}
            <div className="space-y-2.5 pt-2">
              {/* Direct email link block */}
              <a 
                href="mailto:keepcalm0023@gmail.com" 
                data-cursor="email_me"
                className="group flex items-center justify-between p-4 bg-[#0c0c0c] border border-white/10 hover:border-white/30 rounded-none transition duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-none bg-black border border-white/5 flex items-center justify-center text-white group-hover:border-white transition-all">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block leading-none">
                      EMAIL_DIRECT
                    </span>
                    <span className="text-xs font-sans text-white hover:text-zinc-300 transition block mt-1">
                      keepcalm0023@gmail.com
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </a>

              {/* LinkedIn action block */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                data-cursor="linkedin"
                className="group flex items-center justify-between p-4 bg-[#0c0c0c] border border-white/10 hover:border-white/30 rounded-none transition duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-none bg-black border border-white/5 flex items-center justify-center text-white group-hover:border-white transition-all">
                    <Linkedin className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block leading-none">
                      LINKEDIN_CONNECT
                    </span>
                    <span className="text-xs font-sans text-white block mt-1">
                      Adrian Hero Adona (Profile)
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </a>

              {/* GitHub action block */}
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                data-cursor="github"
                className="group flex items-center justify-between p-4 bg-[#0c0c0c] border border-white/10 hover:border-white/30 rounded-none transition duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-none bg-black border border-white/5 flex items-center justify-center text-white group-hover:border-white transition-all">
                    <Github className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block leading-none">
                      GITHUB_REPOSITORIES
                    </span>
                    <span className="text-xs font-sans text-white block mt-1">
                      keepcalm0023 (Projects)
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </a>

              {/* Advanced Interactive Resume Download Action Button */}
              <button 
                onClick={handleDownload}
                data-cursor="pointer"
                className={`w-full flex items-center justify-between p-4 border transition duration-500 rounded-none group cursor-pointer ${
                  downloadState === "ready" 
                    ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-400"
                    : "bg-[#0c0c0c] border-white/10 hover:border-white text-white"
                }`}
              >
                <div className="flex items-center gap-4 text-left">
                  <span className={`w-10 h-10 rounded-none flex items-center justify-center transition-all ${
                    downloadState === "ready"
                      ? "bg-emerald-950 border border-emerald-500 text-emerald-400 animate-bounce"
                      : "bg-black border border-white/5 text-white group-hover:border-white"
                  }`}>
                    {downloadState === "ready" ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  </span>
                  <div>
                    <span className={`text-[9px] font-mono uppercase block leading-none ${
                      downloadState === "ready" ? "text-emerald-400" : "text-zinc-500"
                    }`}>
                      {downloadState === "idle" && "COMPREHENSIVE_DOSSIER"}
                      {downloadState === "preparing" && "TRANSMITTING_STREAMS..."}
                      {downloadState === "ready" && "TRANSMISSION_COMPLETE!"}
                    </span>
                    <span className="text-xs font-sans block mt-1">
                      {downloadState === "idle" && "Download Resume (Dossier)"}
                      {downloadState === "preparing" && "Assembling code metrics & custom records..."}
                      {downloadState === "ready" && "Adrian_Hero_Adona_Resume.txt Dispatched!"}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className={`w-4 h-4 transition ${
                  downloadState === "ready" ? "text-emerald-450 rotate-90" : "text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                }`} />
              </button>
            </div>
            
            {/* Minimal Security disclaimer */}
            <div className="text-center md:text-right pt-2">
              <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
                VER_4.08_STABLE // SECURED_TRANSCEIVER
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
