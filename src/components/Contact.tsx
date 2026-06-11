import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Linkedin, ArrowUpRight, Check, Download, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [downloadState, setDownloadState] = useState<"idle" | "preparing" | "ready">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    
    // Simulate API delivery sequence
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 4000);
    }, 1200);
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-12">
          <div className="space-y-3">
            <span className="text-xs md:text-sm font-sans text-zinc-400 font-semibold tracking-wider uppercase block">
              COLLABORATE
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tight text-white uppercase">
              Get in <span className="font-serif italic font-normal text-zinc-300">Touch.</span>
            </h2>
          </div>
          <p className="max-w-lg text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
            Let's build high-performance websites. Connect with me on LinkedIn, send a direct email, or use the contact form below.
          </p>
        </div>

        {/* Primary Contact Area Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Direct channels and blurb (Cols 1 to 5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs md:text-sm font-sans text-zinc-400 uppercase tracking-wider block font-semibold">
                My Focus
              </span>
              <h3 className="text-xl md:text-2xl font-serif italic text-white leading-relaxed font-normal">
                Engineering high-performance custom WordPress themes, fluid layouts, and detailed responsive interfaces.
              </h3>
              <p className="text-sm md:text-base text-zinc-300 font-sans leading-relaxed">
                I focus on pristine typography pairing, layouts using balanced negative space, responsive structures, fast-loading bundle weights, and clean semantic code.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <span className="text-xs md:text-sm font-sans text-zinc-400 uppercase tracking-wider block font-semibold border-b border-white/10 pb-3">
                Quick Links &amp; Downloads
              </span>

              <div className="space-y-3.5 pt-2">
                {/* Direct email link block */}
                <a 
                  href="mailto:keepcalm0023@gmail.com" 
                  data-cursor="email_me"
                  className="group flex items-center justify-between p-5 bg-[#0c0c0c] border border-white/10 hover:border-white/30 rounded-none transition duration-300"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-none bg-black border border-white/5 flex items-center justify-center text-white group-hover:border-white transition-all">
                      <Mail className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="text-xs font-sans text-zinc-400 font-semibold uppercase block leading-none">
                        Direct Email
                      </span>
                      <span className="text-sm md:text-base font-sans text-white hover:text-zinc-300 transition block mt-1.5 font-medium">
                        keepcalm0023@gmail.com
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </a>

                {/* LinkedIn action block */}
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  data-cursor="linkedin"
                  className="group flex items-center justify-between p-5 bg-[#0c0c0c] border border-white/10 hover:border-white/30 rounded-none transition duration-300"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-none bg-black border border-white/5 flex items-center justify-center text-white group-hover:border-white transition-all">
                      <Linkedin className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="text-xs font-sans text-zinc-400 font-semibold uppercase block leading-none">
                        LinkedIn Connect
                      </span>
                      <span className="text-sm md:text-base font-sans text-white block mt-1.5 font-medium">
                        Adrian Hero Adona (Profile)
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </a>

                {/* Advanced Interactive Resume Download Action Button */}
                <button 
                  onClick={handleDownload}
                  data-cursor="pointer"
                  className={`w-full flex items-center justify-between p-5 border transition duration-500 rounded-none group cursor-pointer ${
                    downloadState === "ready" 
                      ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-400"
                      : "bg-[#0c0c0c] border-white/10 hover:border-white text-white"
                  }`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <span className={`w-12 h-12 rounded-none flex items-center justify-center transition-all ${
                      downloadState === "ready"
                        ? "bg-emerald-950 border border-emerald-500 text-emerald-400 animate-bounce"
                        : "bg-black border border-white/5 text-white group-hover:border-white"
                    }`}>
                      {downloadState === "ready" ? <Check className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                    </span>
                    <div>
                      <span className={`text-xs font-sans uppercase block leading-none font-semibold ${
                        downloadState === "ready" ? "text-emerald-400" : "text-zinc-400"
                      }`}>
                        {downloadState === "idle" && "Complete Resume"}
                        {downloadState === "preparing" && "Preparing Resume..."}
                        {downloadState === "ready" && "Resume Downloaded!"}
                      </span>
                      <span className="text-sm md:text-base font-sans block mt-1.5 text-zinc-200">
                        {downloadState === "idle" && "Download Resume"}
                        {downloadState === "preparing" && "Assembling resume details..."}
                        {downloadState === "ready" && "Adrian_Hero_Adona_Resume.txt downloaded!"}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className={`w-5 h-5 transition ${
                    downloadState === "ready" ? "text-emerald-450 rotate-90" : "text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Modern Messaging Form (Cols 6 to 12) */}
          <div className="lg:col-span-7 p-8 md:p-10 bg-[#0c0c0c] border border-white/10 rounded-none space-y-6 relative">
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="space-y-2">
              <span className="text-xs font-sans text-zinc-400 uppercase tracking-wider block font-semibold">
                Send a Message
              </span>
              <p className="text-sm text-zinc-400 font-sans">
                Fill out this form to send a message directly to my inbox.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-950/30 border border-emerald-500 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-serif italic text-white flex items-center justify-center gap-2">
                      Message Sent!
                    </h4>
                    <p className="text-sm text-zinc-400 font-sans max-w-xs mx-auto">
                      Thank you for your message. I will review and reply within 12 business hours.
                    </p>
                  </div>
                  <span className="text-[10px] font-sans text-emerald-400/80 uppercase tracking-wider block pt-2">
                    Status: Active
                  </span>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 pt-2"
                >
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-xs font-sans text-zinc-400 uppercase tracking-wider block font-medium">
                      Your Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Alexis Carter"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 bg-black/50 border border-white/10 text-white placeholder-zinc-650 rounded-none focus:outline-none focus:border-white/40 focus:ring-0 text-sm transition duration-300 font-sans"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-xs font-sans text-zinc-400 uppercase tracking-wider block font-medium">
                      Your Email Address *
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. alexis@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 bg-black/50 border border-white/10 text-white placeholder-zinc-655 rounded-none focus:outline-none focus:border-white/40 focus:ring-0 text-sm transition duration-300 font-sans"
                    />
                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <label className="text-xs font-sans text-zinc-400 uppercase tracking-wider block font-medium">
                      Your Message *
                    </label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="How can I help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-4.5 bg-black/50 border border-white/10 text-white placeholder-zinc-660 rounded-none focus:outline-none focus:border-white/40 focus:ring-0 text-sm transition duration-300 font-sans resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4.5 bg-white text-black hover:bg-white/90 disabled:bg-zinc-800 disabled:text-zinc-500 font-sans font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition duration-300 cursor-pointer rounded-none shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-zinc-400 border-t-black rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Minimal Security disclaimer */}
            <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[10px] font-sans text-zinc-500">
              <span>Adrian Hero Adona</span>
              <span>Portfolio 2026</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
