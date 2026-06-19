import {
  Avatar, AvatarBadge, AvatarFallback, AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Check, ChevronRight, HardDriveDownload, Menu, X } from "lucide-react"
import React, { useEffect, useState } from 'react'
import { CountUp } from "use-count-up"
import TypingText from "@/components/TypingText"
import CardComponent from "@/components/CardComponent"
import { services, stats, skills, roles, stack, slides, projects, EXPERIENCE, EDUCATION } from "@/constants/database"
import '../css/embla.css'
import EmblaCarousel from '../components/EmblaCarousel'
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import ContactForm from "@/components/ContactForm"


const Home = () => {
  const OPTIONS = { slidesToScroll: 'auto' }
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const [stackProgress, setStackProgress] = useState({
    "airtable": 0, "n8n": 0, "zapier": 0, "postman": 0
  })

  useEffect(() => {
    const timer = setTimeout(() => setStackProgress(stack), 500)
    return () => clearTimeout(timer)
  }, [])

  // Close sidebar on route-like anchor clicks on mobile
  const handleNavClick = () => {
    if (window.innerWidth < 1024) setSidebarOpen(false)
  }

  return (
    <div className="bg-black h-full overflow-auto scrollbar-hide scroll-smooth">
      <main
        className="flex min-h-screen bg-fixed bg-cover bg-center relative scroll-smooth"
        style={{
          backgroundImage: `linear-gradient(rgba(31, 31, 41, 0.82), rgba(31, 31, 41, 1)), url('https://res.cloudinary.com/dw94gbpfs/image/upload/v1780168312/lin2015-siguniang-mountain-8568913_1920_jsgqgu.jpg')`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Desktop spacer — hidden on mobile */}
        <div className="hidden lg:block w-64.5 shrink-0" />

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <Card
          className={`
            w-64.5 rounded-none text-white border-0 shadow-none ring-0 pt-0
            fixed top-0 left-0 h-screen flex flex-col z-40 gap-0
            transition-transform duration-300 ease-in-out
            lg:top-3.75 lg:left-3.75 lg:h-[calc(100vh-30px)] lg:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <CardHeader className="border-0 pt-6 pb-12 bg-[#24242edb] rounded-none shrink-0 relative">
            {/* Close button — mobile only */}
            <button
              className="lg:hidden absolute top-4 right-4 text-[#777779] hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={18} />
            </button>

            <Avatar size="lg" className="mx-auto">
              <AvatarImage src="https://res.cloudinary.com/dw94gbpfs/image/upload/v1779775058/3d-rendering-cartoon-like-business-man_pmnqry.jpg" />
              <AvatarFallback>KO</AvatarFallback>
              <AvatarBadge className="bg-[#eec037] animate-status-glow translate-x-[-25%] translate-y-[-25%]" />
            </Avatar>
            <CardTitle className="mt-4 text-[16px]">Kenneth Okoro</CardTitle>
            <CardDescription className="text-[#777779] text-[12px]">Automation Specialist</CardDescription>
          </CardHeader>

          <CardContent className="bg-[#20202a] p-6 flex-1 overflow-y-auto scrollbar-hide scroll-smooth">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-[13px]">Residence:</p>
                <p className="text-[12px] text-[#777779]">Nigeria</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[13px]">City:</p>
                <p className="text-[12px] text-[#777779]">Lagos</p>
              </div>
              <Separator className="bg-[#383839] my-4" />

              <div className="flex flex-col gap-5">
                {Object.entries(stack).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[13px] capitalize">{key}</p>
                      <small className="text-[12px] text-[#777779]">{value}%</small>
                    </div>
                    <Progress value={stackProgress[key]} className="max-w-full bg-[#191923] flex-1 rounded-none" />
                  </div>
                ))}
              </div>
              <Separator className="bg-[#383839] my-4" />

              <div className="space-y-2">
                {skills.map((group, index) => (
                  <div key={index} className="flex items-center justify-start gap-2">
                    <Check size={11} color="#eec037" strokeWidth={5} className="shrink-0" />
                    <p className="text-[12px] text-[#777779] font-light text-left">{group.items.join(", ")}</p>
                  </div>
                ))}
              </div>
              <Separator className="bg-[#383839] my-4" />


              <a href="https://res.cloudinary.com/dw94gbpfs/image/upload/v1781279190/Kenneth_Automation_Resume_ftda8f.pdf?fl_attachment"
                download={true}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#777779]"
              >
                <small className="text-[12px] font-semibold leading-none">DOWNLOAD CV</small>
                <HardDriveDownload size={16} strokeWidth={2.2} className="shrink-0" />
              </a>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between px-6 rounded-b-none border-none bg-[#24242edb] text-[14px]">
            <a href="https://www.linkedin.com/in/kenneth-okoro-5a7a3815b" target="_blank" rel="noreferrer" className="text-[#777779] hover:text-white transition-all ease-in-out duration-500"><FaLinkedinIn /></a>

            <a href="x.com" target="_blank" rel="noreferrer" className="text-[#777779] hover:text-white transition-all ease-in-out duration-500"><FaXTwitter /></a>

            <a href="github.com" target="_blank" rel="noreferrer" className="text-[#777779] hover:text-white transition-all ease-in-out duration-500"><FaGithub /></a>

            <a href="instagram.com" target="_blank" rel="noreferrer" className="text-[#777779] hover:text-white transition-all ease-in-out duration-500"><FaInstagram /></a>
          </CardFooter>
        </Card>

        {/* Page */}
        <div className="w-full flex-1 z-10 p-4 lg:p-6.5 text-white min-h-screen overflow-x-hidden">

          {/* Mobile top bar */}
          <div className="lg:hidden flex items-center justify-between mb-4 bg-[#24242edb] px-4 py-3 -mx-4 -mt-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-[#777779] hover:text-white"
            >
              <Menu size={22} />
            </button>
            <span className="text-white text-[14px] font-semibold">Kenneth Okoro</span>
            <div className="w-6" /> {/* spacer */}
          </div>

          {/* Hero */}
          <header
            className="relative w-full h-[40vh] min-h-48 sm:min-h-56 lg:min-h-78 max-h-125 overflow-hidden"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dw94gbpfs/image/upload/v1780168312/lin2015-siguniang-mountain-8568913_1920_jsgqgu.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "left top",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-b from-[#24242e]/60 to-[#24242e]/80" />
            <div className="relative z-10 p-4 lg:p-6 text-white flex w-full gap-4">
              <div className="text-left w-full lg:w-[60%]">
                <h1 className="text-xl lg:text-3xl font-bold mt-4 lg:mt-6">Automating Workflows.<br />Accelerating Growth.</h1>
                <TypingText
                  texts={roles}
                  typingSpeed={50}
                  deletingSpeed={30}
                  pauseTime={2000}
                  className="mt-3 text-[14px] lg:text-[16px] text-white/80 h-8 font-mono"
                />
                <div className="mt-7 sm:mt-3 flex gap-3">

                  <a href="#projects"
                    className="px-4 py-2 bg-[#eec037] w-32 lg:w-37.5 text-[#382400] uppercase text-[11px] font-bold tracking-widest cursor-pointer transition-all duration-600 ease-in-out text-center hover:tracking-wider"
                  >
                    explore now
                  </a>

                  <a href="#contact"
                    className="cursor-pointer text-white/80 text-[12px] tracking-wider uppercase flex items-center gap-1.25 transition-all duration-500 ease-in-out hover:gap-2 hover:text-white/95"
                  >
                    <span>Hire me</span>
                    <ChevronRight size={13} strokeWidth={4} />
                  </a>
                </div>
              </div>
              <div className="hidden lg:block flex-1">
                <img src="https://res.cloudinary.com/dw94gbpfs/image/upload/v1780300281/hero_qtodzx.png" alt="hero image" className="w-full" />
              </div>
            </div>
          </header>

          {/* Stats */}
          <div className="w-full my-6 grid grid-cols-1 min-[370px]:grid-cols-2  sm:flex sm:items-center sm:justify-between gap-4">
            {stats.map((stat, index) => (
              <div className="flex gap-3 items-center" key={index}>
                <span className="text-[16px] lg:text-[20px] text-[#eec037] font-semibold">
                  <CountUp isCounting end={stat.value} duration={2} />{stat.showPlus && "+"}
                </span>
                <p className="capitalize text-[12px]">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Services */}
          <section className="my-6 w-full">
            <h2 className="text-left mb-6">My Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {services.map((service, index) => (
                <CardComponent key={index} title={service.title} desc={service.text} cta="Order Now" />
              ))}
            </div>
          </section>

          {/* Recommendations */}
          <section className="my-6 w-full">
            <h3 className="text-left mb-6">Recommendations</h3>
            <div className="w-full">
              <EmblaCarousel slides={slides} options={OPTIONS} />
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="my-6 w-full">
            <h4 className="text-left mb-6">Works</h4>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {projects.map((project, index) => (
                <div onClick={() => setSelected(project.id)} className="overflow-hidden relative transition-all group cursor-pointer h-50" key={index}>
                  <img
                    src={project.projectImage}
                    alt={project.projectTitle}
                    className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${selected === project.id ? "scale-110" : ""} `}
                  />
                  <div
                    className={`absolute z-10 right-0 bottom-0 w-full bg-[#2c2d39]/98 p-4 text-left
      transform transition-transform duration-1000 ease-in-out ${selected === project.id ? "translate-y-0" : "translate-y-full"} group-hover:translate-y-0`}
                  >

                    <h5 className="text-[13px] text-white/80 font-medium capitalize leading-4.5">{project.projectTitle}</h5>
                    <p className="text-[12px] text-[#777779] leading-4.5">{project.projectDesc}</p>
                    
                    {/* <a href={project?.projectUrl} className="cursor-pointer text-[#eec037] text-[10px] tracking-wider uppercase flex items-center gap-1.25 transition-all duration-500 ease-in-out hover:gap-2">
                      <span>View Project</span>
                      <ChevronRight size={13} strokeWidth={4} />
                    </a> */}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Resume / Timeline */}
          <section id="resume" className="my-6 w-full">
            <div className="flex flex-col lg:flex-row gap-6">

              {/* Education */}
              <div className="flex-1">
                <h3 className="text-left text-[16px] font-semibold mb-6 text-white/80">Education</h3>
                <div className="flex gap-3">
                  <div className="flex-1 flex flex-col gap-4">
                    {EDUCATION.map((e, i) => (
                      <div key={i} className="bg-[#2c2d39] p-5 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <p className="text-[13px] text-white/80 font-semibold leading-5">{e.school}</p>
                          <span className="shrink-0 text-[10px] text-[#777779] bg-[#1e1f29] px-2.5 py-1 rounded-full">{e.period}</span>
                        </div>
                        <p className="text-[12px] text-[#777779] italic text-left">{e.role}</p>
                        <p className="text-[12px] text-[#777779] leading-4.5 text-left">{e.desc}</p>
                        {e.cta && (
                          <a href={e.ctaUrl ?? "#"} className="mt-1 text-[#eec037] text-[10px] tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all duration-300">
                            {e.cta}<ChevronRight size={11} strokeWidth={4} />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-center pt-1">
                    {EDUCATION.map((_, i) => (
                      <React.Fragment key={i}>
                        <div className="w-3 h-3 rounded-full border-2 border-[#eec037] bg-transparent shrink-0" />
                        {i < EDUCATION.length - 1 && <div className="w-px flex-1 min-h-25 bg-[#383839]" />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="flex-1">
                <h3 className="text-left text-[15px] font-semibold mb-6 text-white/80">Work History</h3>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center pt-1">
                    {EXPERIENCE.map((_, i) => (
                      <React.Fragment key={i}>
                        <div className="w-3 h-3 rounded-full border-2 border-[#eec037] bg-transparent shrink-0" />
                        {i < EXPERIENCE.length - 1 && <div className="w-px flex-1 min-h-25 bg-[#383839]" />}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    {EXPERIENCE.map((e, i) => (
                      <div key={i} className="bg-[#2c2d39] p-5 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <p className="text-[13px] text-white/80 font-semibold leading-5">{e.company}</p>
                          <span className="shrink-0 text-[10px] text-[#777779] bg-[#1e1f29] px-2.5 py-1 rounded-full">{e.period}</span>
                        </div>
                        <p className="text-[12px] text-[#777779] italic text-left">{e.role}</p>
                        <p className="text-[12px] text-[#777779] leading-4.5 text-left">{e.desc}</p>
                        {e.cta && (
                          <a href={e.ctaUrl ?? "#"} className="mt-1 text-[#eec037] text-[10px] tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all duration-300">
                            {e.cta}<ChevronRight size={11} strokeWidth={4} />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="my-6 w-full">
            <h5 className="text-left mb-6">Contact Information</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="rounded-none border-0 shadow-none ring-0 text-left bg-[#2c2d39] px-4 py-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-white/80 font-medium text-[13px]">Country:</p>
                  <small className="text-[12px] text-[#777779]">Nigeria</small>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white/80 font-medium text-[13px]">City:</p>
                  <small className="text-[12px] text-[#777779]">Lagos</small>
                </div>
              </div>
              <div className="rounded-none border-0 shadow-none ring-0 text-left bg-[#2c2d39] px-4 py-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-white/80 font-medium text-[13px]">Email:</p>
                  <small className="text-[12px] text-[#777779]"><a href="mailto:Kennethokoro280@gmail.com">Kennethokoro280@gmail.com</a></small>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white/80 font-medium text-[13px]">Direct Message:</p>
                  <small className="text-[12px] text-[#777779]"><a href="https://wa.me/2349134692716">Chat on WhatsApp</a></small>
                </div>
              </div>
              <div className="rounded-none border-0 shadow-none ring-0 text-left bg-[#2c2d39] px-4 py-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-white/80 font-medium text-[13px]">Phone:</p>
                  <small className="text-[12px] text-[#777779]"><a href="tel:+2349134692716">09134692716
                  </a></small>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white/80 font-medium text-[13px]">Support Line:</p>
                  <small className="text-[12px] text-[#777779]"><a href="tel:+2348137825383">08137825383</a></small>
                </div>
              </div>
            </div>

            <div className="w-full my-6">
              <h6 className="text-left mb-6">Get In Touch</h6>
              <ContactForm />
            </div>
          </section>

          <footer className="bg-[#2c2d39] flex flex-col sm:flex-row items-center justify-between px-6 py-2.5">
            <small className="text-[#777779] hover:text-white transition-all duration-1000 ease-in-out text-[12px]">
              &copy; {new Date().getFullYear()} Kenneth Okoro
            </small>
            <a href="mailto:mail@placeholder.com" className="text-[#777779] hover:text-white transition-all duration-200 ease-in-out text-[12px]">
              Kennethokoro280@gmail.com
            </a>
          </footer>

        </div>
      </main>
    </div>
  )
}

export default Home