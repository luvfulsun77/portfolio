export default function Home() {
  return (
    <main className="min-h-screen font-sans relative">

      {/* Background gradient base */}
      <div className="fixed inset-0 -z-10" style={{
        background: "linear-gradient(135deg, #e8f4ff 0%, #f8e8f8 25%, #f0e8ff 50%, #e8f8f4 75%, #fff8e8 100%)"
      }} />

      {/* Floating background shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Large blue circle */}
        <div className="animate-drift absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #a8d8f0 0%, transparent 70%)" }} />
        {/* Pink shape */}
        <div className="animate-float absolute top-1/4 right-[-100px] w-[400px] h-[400px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #f4b8d4 0%, transparent 70%)" }} />
        {/* Purple triangle-like */}
        <div className="animate-drift-slow absolute bottom-1/3 left-1/4 w-[300px] h-[300px] opacity-25"
          style={{
            background: "linear-gradient(135deg, #c4a8e8, #f4b8d4)",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            borderRadius: "8px"
          }} />
        {/* Mint orb */}
        <div className="animate-float absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #a8ecd8 0%, transparent 70%)", animationDelay: "3s" }} />
        {/* Gold accent */}
        <div className="animate-drift absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #f9d8a0 0%, transparent 70%)" }} />
        {/* Geometric rectangle */}
        <div className="animate-spin-slow absolute top-1/3 right-1/3 w-[180px] h-[180px] opacity-10"
          style={{
            background: "linear-gradient(45deg, #a8d8f0, #c4a8e8)",
            transform: "rotate(45deg)"
          }} />
        {/* Small circles */}
        <div className="animate-float absolute top-2/3 left-1/6 w-[120px] h-[120px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #f4b8d4, #c4a8e8)", animationDelay: "2s" }} />
        <div className="animate-drift-slow absolute top-1/6 right-1/3 w-[80px] h-[80px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #a8ecd8, #a8d8f0)", animationDelay: "5s" }} />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center">
        <span className="text-xs tracking-widest uppercase font-mono text-[#1a1a2e]/40">
          Park Sunyoung
        </span>
        <div className="flex gap-8">
          <a href="#works" className="text-xs tracking-widest uppercase font-mono text-[#1a1a2e]/40 hover:text-[#1a1a2e] transition-colors">Works</a>
          <a href="#contact" className="text-xs tracking-widest uppercase font-mono text-[#1a1a2e]/40 hover:text-[#1a1a2e] transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24">
        <div className="max-w-5xl">
          {/* Script accent */}
          <p
            className="text-2xl md:text-3xl mb-4 text-[#1a1a2e]/40"
            style={{ fontFamily: "var(--font-dancing)", fontStyle: "italic" }}
          >
            hello, I&apos;m
          </p>

          {/* Name — holographic */}
          <h1 className="holographic-text text-7xl md:text-9xl lg:text-[11rem] font-light leading-none tracking-tight mb-8">
            Park<br />Sunyoung
          </h1>

          {/* Quote — glass pill */}
          <div className="inline-block glass rounded-full px-6 py-3 mt-4">
            <p
              className="text-base md:text-lg text-[#1a1a2e]/70 italic"
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              &ldquo;I believe that divinity dwells in all things&rdquo;
            </p>
          </div>
        </div>

        <div className="absolute bottom-12 left-8 md:left-16 lg:left-24">
          <span className="text-xs text-[#1a1a2e]/30 tracking-widest uppercase font-mono">↓ Scroll</span>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-5xl">
          <span className="text-xs text-[#1a1a2e]/30 tracking-widest uppercase font-mono mb-16 block">
            Tools &amp; Skills
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Midjourney", desc: "AI Image Generation", color: "from-sky-200/40 to-blue-100/40" },
              { name: "Kling", desc: "AI Video Generation", color: "from-pink-200/40 to-purple-100/40" },
              { name: "TouchDesigner", desc: "Visual Programming", color: "from-emerald-100/40 to-teal-100/40" },
            ].map((skill) => (
              <div key={skill.name}
                className={`glass rounded-3xl p-8 bg-gradient-to-br ${skill.color} group hover:scale-105 transition-transform duration-300`}
              >
                <h3 className="text-2xl font-light mb-2 text-[#1a1a2e]/80 group-hover:text-[#1a1a2e] transition-colors">
                  {skill.name}
                </h3>
                <p className="text-sm text-[#1a1a2e]/40 font-mono">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Works */}
      <section id="works" className="py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-5xl">
          <span className="text-xs text-[#1a1a2e]/30 tracking-widest uppercase font-mono mb-16 block">
            Works
          </span>
          <div className="glass rounded-3xl p-10 md:p-16 group hover:scale-[1.01] transition-transform duration-500 cursor-pointer"
            style={{ background: "linear-gradient(135deg, rgba(168,216,240,0.2), rgba(244,184,212,0.2), rgba(196,168,232,0.2))" }}
          >
            <span className="text-xs text-[#1a1a2e]/30 tracking-widest uppercase font-mono mb-6 block">Visual</span>
            <h3
              className="holographic-text text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight"
            >
              looping<br />in the box
            </h3>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-5xl">
          <span className="text-xs text-[#1a1a2e]/30 tracking-widest uppercase font-mono mb-16 block">
            Contact
          </span>
          <div className="flex flex-col gap-6">
            <a
              href="mailto:steamedpsy@gmail.com"
              className="text-3xl md:text-5xl font-light text-[#1a1a2e]/60 hover:text-[#1a1a2e] transition-colors tracking-tight"
            >
              steamedpsy@gmail.com
            </a>
            <a
              href="https://www.instagram.com/yuayera"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl font-light text-[#1a1a2e]/40 hover:text-[#1a1a2e] transition-colors tracking-tight font-mono"
            >
              @yuayera
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 md:px-16 lg:px-24 border-t border-[#1a1a2e]/10">
        <p className="text-xs text-[#1a1a2e]/20 font-mono">© 2025 Park Sunyoung</p>
      </footer>

    </main>
  );
}
