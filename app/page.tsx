export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center">
        <span className="text-sm tracking-widest uppercase text-white/40 font-mono">
          Park Sunyoung
        </span>
        <a
          href="mailto:steamedpsy@gmail.com"
          className="text-sm tracking-widest uppercase text-white/40 hover:text-white transition-colors font-mono"
        >
          Contact
        </a>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight tracking-tight mb-8">
            Park<br />Sunyoung
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed italic">
            &ldquo;I believe that divinity dwells in all things&rdquo;
          </p>
        </div>
        <div className="absolute bottom-12 left-8 md:left-16 lg:left-24">
          <span className="text-xs text-white/20 tracking-widest uppercase font-mono">
            Scroll
          </span>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-32 px-8 md:px-16 lg:px-24 border-t border-white/10">
        <div className="max-w-4xl">
          <span className="text-xs text-white/30 tracking-widest uppercase font-mono mb-12 block">
            Tools &amp; Skills
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Midjourney", desc: "AI Image Generation" },
              { name: "Kling", desc: "AI Video Generation" },
              { name: "TouchDesigner", desc: "Visual Programming" },
            ].map((skill) => (
              <div key={skill.name} className="group">
                <h3 className="text-2xl font-light mb-2 group-hover:text-white/60 transition-colors">
                  {skill.name}
                </h3>
                <p className="text-sm text-white/30 font-mono">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="works" className="py-32 px-8 md:px-16 lg:px-24 border-t border-white/10">
        <div className="max-w-4xl">
          <span className="text-xs text-white/30 tracking-widest uppercase font-mono mb-12 block">
            Works
          </span>
          <div className="group cursor-default">
            <div className="flex items-baseline justify-between py-8 border-b border-white/10 hover:border-white/30 transition-colors">
              <h3 className="text-3xl md:text-5xl font-light tracking-tight">
                looping in the box
              </h3>
              <span className="text-xs text-white/30 font-mono ml-4 shrink-0">
                Visual
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-8 md:px-16 lg:px-24 border-t border-white/10">
        <div className="max-w-4xl">
          <span className="text-xs text-white/30 tracking-widest uppercase font-mono mb-12 block">
            Contact
          </span>
          <a
            href="mailto:steamedpsy@gmail.com"
            className="text-3xl md:text-5xl font-light hover:text-white/50 transition-colors tracking-tight"
          >
            steamedpsy@gmail.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 md:px-16 lg:px-24 border-t border-white/10">
        <p className="text-xs text-white/20 font-mono">
          © 2025 Park Sunyoung
        </p>
      </footer>
    </main>
  );
}
