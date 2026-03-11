"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  const loadingRef = useRef<HTMLDivElement | null>(null)
  const logoRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const marqueeRef = useRef<HTMLDivElement | null>(null)
  const section3Ref = useRef<HTMLDivElement | null>(null)
  const section4Ref = useRef<HTMLDivElement | null>(null)
  const footerRef = useRef<HTMLDivElement | null>(null)
  const heroTextRef = useRef<HTMLDivElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const imageRef = useRef<HTMLDivElement | null>(null)

  // Loading animation
  useGSAP(() => {
    const tl = gsap.timeline()
    gsap.set(logoRef.current, { opacity: 0, scale: 0.8 })

    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out"
    })
    tl.to(logoRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.in"
    })
    tl.to(loadingRef.current, {
      y: "-100%",
      duration: 1.4,
      ease: "power4.inOut"
    })

    // Hero text after loading
    tl.from(".hero-line", {
      y: 120,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out"
    }, "-=0.4")

    tl.from(".hero-sub", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")

    tl.from(".hero-cta", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")

    tl.from(".nav-item", {
      y: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out"
    }, "-=1.2")
  }, [])

  // Marquee animation
  useGSAP(() => {
    if (!marqueeRef.current) return
    gsap.to(marqueeRef.current, {
      x: "-50%",
      duration: 18,
      ease: "none",
      repeat: -1,
    })
  }, [])

  // Text section scroll animation
  useGSAP(() => {
    if (!textRef.current) return
    gsap.from(textRef.current.children, {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    })
  })

  // useGSAP(() => {
  //   if (!imageRef.current) return
  //   gsap.to(imageRef.current, {
  //     rotate:0,
  //     duration: 1,
  //     ease: "power3.out",
  //     scrollTrigger: {
  //       trigger: imageRef.current,
  //       start: "top 80%",
  //       toggleActions: "play none none none",
  //       markers:true
  //     }
  //   })
  // })

  // Section 3 - editorial grid
  useGSAP(() => {
    if (!section3Ref.current) return
    gsap.from(".editorial-item", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section3Ref.current,
        start: "top 75%",
        toggleActions: "play none none none",
      }
    })
  })

  // Section 4 - parallax
  useGSAP(() => {
    if (!section4Ref.current) return
    gsap.from(".process-step", {
      x: -60,
      opacity: 0,
      duration: 1,
      stagger: 0.25,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section4Ref.current,
        start: "top 70%",
        toggleActions: "play none none none",
      }
    })

    gsap.from(".process-img", {
      scale: 1.1,
      opacity: 0,
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section4Ref.current,
        start: "top 70%",
        toggleActions: "play none none none",
      }
    })
  })

  // Footer reveal
  useGSAP(() => {
    if (!footerRef.current) return
    gsap.from(".footer-item", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        toggleActions: "play none none none",
      }
    })
  })

  return (
    <div className="min-h-screen bg-[#E9E6E1] font-sans overflow-x-hidden">

      {/* LOADING SCREEN */}
      <div ref={loadingRef} className="fixed inset-0 z-[100] bg-[#0A0A0A] flex items-center justify-center">
        <div ref={logoRef} className="flex flex-col items-center gap-2">
          <div className="text-white font-anton text-6xl tracking-[0.3em]">KHART</div>
          <div className="text-[#888] text-xs tracking-[0.5em] uppercase">Est. Haarlem</div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between mix-blend-difference">
        <div className="nav-item text-white font-anton text-2xl tracking-[0.2em]">KHART</div>
        <div className="hidden md:flex items-center gap-10">
          {["Collection", "About", "Process", "Contact"].map((item) => (
            <a key={item} className="nav-item text-white text-xs tracking-[0.3em] uppercase hover:opacity-60 transition-opacity cursor-pointer">
              {item}
            </a>
          ))}
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-item md:hidden text-white text-xs tracking-widest uppercase"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col items-center justify-center gap-10">
          {["Collection", "About", "Process", "Contact"].map((item) => (
            <a key={item} className="text-white font-anton text-4xl tracking-widest uppercase cursor-pointer">
              {item}
            </a>
          ))}
        </div>
      )}

      {/* SECTION 1 — HERO VIDEOS */}
      <div className="section1 h-screen grid grid-cols-3 gap-2 overflow-hidden relative w-full">
        <video src="/videos/video3.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        <video src="/videos/video1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        <video src="/videos/video2.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero text overlay */}
        <div className="absolute inset-0 flex flex-col justify-end px-10 pb-16 overflow-hidden">
          <div className="overflow-hidden">
            <h1 className="hero-line font-anton text-white text-[clamp(3rem,8vw,8rem)] leading-none tracking-tight">REBORN.</h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-line font-anton text-white text-[clamp(3rem,8vw,8rem)] leading-none tracking-tight">REWORN.</h1>
          </div>
          <div className="overflow-hidden mt-4">
            <p className="hero-sub text-white/70 text-sm tracking-[0.3em] uppercase max-w-md">
              Sustainable fashion reimagined in Haarlem
            </p>
          </div>
          <div className="overflow-hidden mt-6">
            <button className="hero-cta border border-white text-white text-xs tracking-[0.4em] uppercase px-8 py-3 hover:bg-white hover:text-black transition-colors duration-300">
              Explore Collection
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 right-10 flex flex-col items-center gap-2 text-white/50">
          <span className="text-[10px] tracking-widest uppercase rotate-90 origin-center">Scroll</span>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-[#0A0A0A] py-4">
        <div ref={marqueeRef} className="flex whitespace-nowrap w-max">
          {Array(8).fill("GIVE CLOTHING A SECOND LIFE · HAARLEM · SUSTAINABLE FASHION · UPCYCLE · ").map((text, i) => (
            <span key={i} className="font-anton text-[#E9E6E1] text-2xl tracking-widest mx-4">{text}</span>
          ))}
        </div>
      </div>

      {/* SECTION 2 — TEXT + IMAGE */}
      <div className="h-screen py-20 bg-[#E9E6E1]">
        <div className="grid grid-cols-2 max-w-7xl mx-auto h-full px-8 gap-10">
          <div ref={textRef} className="flex flex-col justify-center gap-6 font-anton text-black">
            <span className="text-xs tracking-[0.4em] text-[#888] uppercase font-sans">Our Philosophy</span>
            <h1 className="text-[clamp(2rem,4vw,4rem)] leading-tight">GIVE CLOTHING A SECOND LIFE, TOGETHER IN HAARLEM OR ON LOCATION</h1>
            <p className="font-anton text-base text-[#444] leading-relaxed font-normal">
              Design, cut, sew, and transform old clothing into something new — completely in your own style.
            </p>
            <p className="font-anton  text-base text-[#444] leading-relaxed font-normal">
              Feel the satisfaction of creating something with your own hands, discover unexpected combinations, and experience how reuse not only changes clothing, but also the way you look at fashion.
            </p>
            {/* <button className="w-fit border border-black text-black text-xs tracking-[0.4em] uppercase px-8 py-3 hover:bg-black hover:text-white transition-colors duration-300 font-sans mt-4">
              Our Story
            </button> */}
          </div>
          <div ref={imageRef} className="relative h-full w-full overflow-hidden  ">
            {/* Replace src with your actual image */}
            <Image src="/images/modelimg.jpeg" alt="model" fill sizes="" className="w-full h-full object-contain   " />
            
          </div>
        </div>
      </div>

      {/* SECTION 3 — EDITORIAL GRID */}
      <div ref={section3Ref} className="bg-[#0A0A0A] py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <h2 className="editorial-item font-anton text-[#E9E6E1] text-[clamp(2.5rem,5vw,5rem)] leading-none">THE<br />COLLECTION</h2>
            <a className="editorial-item text-[#888] text-xs tracking-[0.4em] uppercase cursor-pointer hover:text-white transition-colors">View All →</a>
          </div>

          <div className="grid grid-cols-12 gap-4">
            {/* Large featured item */}
            <div className="editorial-item col-span-7 relative aspect-3/4 overflow-hidden group">
              {/* Replace with /images/collection1.jpg */}
              <Image src="/images/collection1.jpeg" alt="collection1" width={1828} height={2560}  className="w-full h-full "/>
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <p className="font-anton text-white text-2xl">REBORN JACKET</p>
                <p className="text-white/60 text-xs tracking-widest uppercase">Upcycled Denim · €280</p>
              </div>
              <div className="absolute top-4 right-4 bg-white text-black text-[10px] tracking-widest uppercase px-3 py-1">New</div>
            </div>

            {/* Right stacked */}
            <div className="col-span-5 flex flex-col gap-4">
              <div className="editorial-item relative aspect-square overflow-hidden group">
                <Image src="/images/collection4.jpeg" alt="collection4" width={1828} height={2560}  className="w-full h-full object-contain  "/>
                <div className="absolute inset-0 bg-linear-to-t from-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                  <p className="font-anton text-white text-xl">PATCHWORK COAT</p>
                  <p className="text-white/60 text-xs tracking-widest uppercase">Mixed Fabrics · €340</p>
                </div>
              </div>
              <div className="editorial-item relative aspect-square overflow-hidden group">
                <Image src="/images/collection5.jpeg" alt="collection5" width={1828} height={2560}  className="w-full h-full object-contain "/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                  <p className="font-anton text-white text-xl">WRAP DRESS</p>
                  <p className="text-white/60 text-xs tracking-widest uppercase">Vintage Silk · €220</p>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            {["TAILORED TROUSERS", "KNIT VEST", "LINEN SHIRT"].map((name, i) => (
              <div key={i} className="editorial-item col-span-4 relative aspect-[4/5] overflow-hidden group">
                <div className="w-full h-full bg-[#1e1e1e]" style={{ filter: `brightness(${0.8 + i * 0.1})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                  <p className="font-anton text-white text-lg">{name}</p>
                  <p className="text-white/60 text-xs tracking-widest uppercase">Upcycled · €{160 + i * 40}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4 — PROCESS */}
      <div ref={section4Ref} className="py-24 bg-[#E9E6E1] px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-20 items-center">
          <div className="process-img relative aspect-[3/4] overflow-hidden">
            {/* Replace with /images/process.jpg */}
            <div className="w-full h-full bg-[#ccc]" />
            <div className="absolute inset-0 bg-[#E9E6E1]/10" />
          </div>

          <div className="flex flex-col gap-12">
            <div>
              <span className="text-xs tracking-[0.4em] text-[#888] uppercase">How it works</span>
              <h2 className="font-anton text-[clamp(2.5rem,4vw,4rem)] leading-none mt-3 text-black">THE<br />PROCESS</h2>
            </div>

            {[
              { num: "01", title: "BRING YOUR CLOTHING", desc: "Arrive with pieces you no longer wear. Any fabric, any condition — we see potential in everything." },
              { num: "02", title: "DESIGN TOGETHER", desc: "Work with our craftspeople to sketch and plan your transformation. Your vision, our expertise." },
              { num: "03", title: "CUT & SEW", desc: "Hands-on sessions in our Haarlem atelier. Learn the craft, feel the material come alive." },
              { num: "04", title: "WEAR WITH PRIDE", desc: "Leave with a one-of-a-kind piece that tells your story. Fashion that is truly yours." },
            ].map((step) => (
              <div key={step.num} className="process-step flex gap-6 items-start border-t border-black/10 pt-6">
                <span className="font-anton text-4xl text-[#ccc] leading-none">{step.num}</span>
                <div>
                  <h3 className="font-anton text-xl text-black mb-2">{step.title}</h3>
                  <p className="text-[#666] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}

            <button className="w-fit bg-black text-white text-xs tracking-[0.4em] uppercase px-10 py-4 hover:bg-[#333] transition-colors duration-300">
              Book a Session
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 5 — FULL BLEED VIDEO */}
      <div className="relative h-screen overflow-hidden">
        <video src="/videos/video1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <span className="text-white/60 text-xs tracking-[0.5em] uppercase mb-6">On Location</span>
          <h2 className="font-anton text-white text-[clamp(3rem,8vw,8rem)] leading-none max-w-4xl">WE COME TO YOU</h2>
          <p className="text-white/70 mt-6 max-w-md text-sm leading-relaxed">
            Can't make it to Haarlem? We bring the atelier experience to your venue, event, or community.
          </p>
          <button className="mt-10 border border-white text-white text-xs tracking-[0.4em] uppercase px-10 py-4 hover:bg-white hover:text-black transition-colors duration-300">
            Request On-Location
          </button>
        </div>
      </div>

      {/* SECTION 6 — TESTIMONIALS */}
      <div className="py-24 bg-[#0A0A0A] px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-anton text-[#E9E6E1] text-center text-[clamp(2rem,4vw,4rem)] mb-20">WHAT PEOPLE SAY</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              { quote: "I walked in with a bag of old clothes and left with the most beautiful jacket I've ever owned.", name: "Lena V.", location: "Amsterdam" },
              { quote: "The experience of making something with my own hands was completely transformative.", name: "Marcus T.", location: "Haarlem" },
              { quote: "KHART changed the way I think about fashion forever. I'll never shop fast fashion again.", name: "Sophie R.", location: "Utrecht" },
            ].map((t, i) => (
              <div key={i} className="border border-[#222] p-8 flex flex-col justify-between gap-8 hover:border-[#444] transition-colors">
                <p className="text-[#888] text-sm leading-relaxed italic">"{t.quote}"</p>
                <div>
                  <p className="font-anton text-[#E9E6E1] text-lg">{t.name}</p>
                  <p className="text-[#555] text-xs tracking-widest uppercase">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer ref={footerRef} className="bg-[#E9E6E1] pt-20 pb-10 px-8 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-10 mb-20">
            <div className="footer-item col-span-2">
              <div className="font-anton text-4xl text-black mb-4">KHART</div>
              <p className="text-[#666] text-sm leading-relaxed max-w-xs">
                Sustainable fashion atelier based in Haarlem. Giving clothing a second life, one piece at a time.
              </p>
            </div>
            <div className="footer-item">
              <p className="font-anton text-black text-sm tracking-widest mb-6">NAVIGATE</p>
              {["Collection", "About", "Process", "On Location", "Contact"].map(link => (
                <a key={link} className="block text-[#666] text-sm mb-3 hover:text-black transition-colors cursor-pointer">{link}</a>
              ))}
            </div>
            <div className="footer-item">
              <p className="font-anton text-black text-sm tracking-widest mb-6">CONTACT</p>
              <p className="text-[#666] text-sm mb-2">Haarlem, Netherlands</p>
              <p className="text-[#666] text-sm mb-2">hello@khart.nl</p>
              <p className="text-[#666] text-sm mb-6">+31 23 000 0000</p>
              <div className="flex gap-4">
                {["IG", "FB", "PIN"].map(social => (
                  <a key={social} className="text-xs tracking-widest text-[#888] hover:text-black transition-colors cursor-pointer">{social}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-item border-t border-black/10 pt-8 flex items-center justify-between">
            <p className="text-[#888] text-xs">© 2025 KHART. All rights reserved.</p>
            <p className="text-[#888] text-xs tracking-widest uppercase">Sustainable · Handmade · Haarlem</p>
          </div>
        </div>
      </footer>
    </div>
  );
}