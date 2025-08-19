import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Github, 
  Linkedin, 
  Mail, 
  FileText, 
  School, 
  Shield, 
  Lock, 
  Bug, 
  Store,
  Database,
  MessageCircle,
  Calculator,
  ExternalLink
} from "lucide-react";
import profileImage from "@/assets/profile-image.png";

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: "CampusAx",
      description: "A secure and student-friendly e-commerce platform tailored for campus needs, built to simplify buying, selling, and resolving issues directly within the app.",
      icon: School,
      tech: ["Flutter", "Firebase", "Node.js", "Spring Boot"],
      current: true,
      color: "cyber-accent"
    },
    {
      id: 2,
      title: "PixelPatch",
      description: "Developed a bug bounty platform using ReactJS and Firebase. It allows security researchers to submit vulnerability reports, track their status, and receive notifications.",
      icon: Shield,
      tech: ["ReactJS", "Firebase", "Cloud Functions"],
      color: "cyber-warning"
    },
    {
      id: 3,
      title: "PhantomGate - Honeypot System",
      description: "A decoy admin login page built to trap intruders and log their credentials, IP address, and browser information. It redirects legitimate users to a secure subdomain.",
      icon: Lock,
      tech: ["Node.js", "JavaScript", "GitHub Pages"],
      color: "cyber-danger"
    },
    {
      id: 4,
      title: "Explora",
      description: "A security project that demonstrates how untrusted mobile applications can compromise devices. It involves injecting reverse TCP/HTTPS payloads into a Flutter APK.",
      icon: Bug,
      tech: ["Flutter", "APKTool", "Metasploit", "Kali Linux", "msfvenom"],
      color: "cyber-success"
    },
    {
      id: 5,
      title: "Ecommerce",
      description: "A campus-based e-commerce app developed to provide students with a secure platform to buy and sell essentials. Features smooth UI and robust backend.",
      icon: Store,
      tech: ["Flutter", "SpringBoot", "MongoDB"],
      color: "cyber-secondary"
    },
    {
      id: 6,
      title: "Student BioData Management",
      description: "Automates student biodata management, eliminating manual record-keeping with a comprehensive digital solution.",
      icon: Database,
      tech: ["Java","JDBC","OracleDB","Java Swing"],
      color: "cyber-primary"
    },
    {
      id: 7,
      title: "Chat App",
      description: "Real-time chat application with modern UI and secure messaging capabilities.",
      icon: MessageCircle,
      tech: ["Flutter", "Firebase"],
      color: "cyber-accent"
    },
    {
      id: 8,
      title: "Expense Tracker",
      description: "Helps users track expenses and categorize spending with intuitive analytics.",
      icon: Calculator,
      tech: ["Flutter"],
      color: "cyber-warning"
    }
  ];

  const skills = [
    { name: "Flutter", category: "Mobile" },
    { name: "Dart", category: "Language" },
    { name: "Spring Boot", category: "Backend" },
    { name: "Linux", category: "System" },
    { name: "Kali Linux", category: "Security" },
    { name: "Git", category: "Tool" },
    { name: "Python", category: "Language" },
    { name: "HTML", category: "Web" },
    { name: "CSS", category: "Web" },
    { name: "Java", category: "Language" },
    { name: "Node.js", category: "Backend" },
    { name: "JavaScript", category: "Language" },
    { name: "Firebase", category: "Backend" },
    { name: "MongoDB", category: "Database" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            background: `radial-gradient(circle at 30% 40%, hsl(var(--cyber-primary) / 0.1) 0%, transparent 70%),
                        radial-gradient(circle at 70% 60%, hsl(var(--cyber-secondary) / 0.1) 0%, transparent 70%)`
          }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-8 animate-float">
            <img 
              src={profileImage} 
              alt="Rahul Thatipamula" 
              className="w-32 h-42 md:w-40 md:h-70 rounded-full mx-auto border-4 border-primary shadow-glow animate-pulse-glow"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Hi, I'm{" "}
            <span className="text-gradient">Rahul Thatipamula</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            B.Tech Computer Science student specializing in{" "}
            <span className="text-primary font-semibold">Cybersecurity</span>. 
            Former Flutter Developer Intern at Rablo. Passionate about creating 
            secure and scalable software solutions.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button 
              variant="default" 
              size="lg" 
              className="bg-gradient-primary hover:scale-105 transition-transform shadow-glow"
              asChild
            >
              <a href="https://linkedin.com/in/rahul-thatipamula" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              asChild
            >
              <a href="https://github.com/rahul-thatipamula" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>
            
            <Button 
              variant="secondary" 
              size="lg" 
              className="hover:scale-105 transition-transform"
              onClick={() => window.open('./resume.pdf', '_blank')}
            >
              <FileText className="mr-2 h-5 w-5" />
              View Resume
            </Button>
          </div>
          <div>
            {/* Add my personal website */}
            <Button 
              variant="link" 
              size="lg" 
              className="hover:underline"
              onClick={() => window.open('https://axiviontech.com', '_blank')}
            >
              My Personal Website
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            A collection of cybersecurity and full-stack projects showcasing my technical expertise
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <Card 
                  key={project.id} 
                  className={`relative group card-hover bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden ${
                    project.current ? 'ring-2 ring-primary shadow-glow' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {project.current && (
                    <Badge className="absolute top-4 right-4 z-10 bg-cyber-success text-background">
                      Current Project
                    </Badge>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <IconComponent 
                        className={`h-12 w-12 text-${project.color} mb-4 group-hover:scale-110 transition-transform`} 
                      />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="text-xs bg-secondary/50"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-glow">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Technologies and tools I use to build secure and scalable applications
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <Badge 
                key={skill.name}
                variant="outline"
                className="px-6 py-3 text-base border-primary/30 hover:border-primary hover:shadow-glow transition-all duration-300 hover:scale-105 bg-card/30 backdrop-blur-sm"
                style={{
                  animationDelay: `${index * 0.05}s`
                }}
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="py-20 px-4 sm:px-8 bg-card/30 backdrop-blur-sm border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always open to collaboration, job opportunities, and interesting projects.
            Let's build something amazing together!
          </p>
          
          <div className="flex justify-center gap-6 mb-8">
            <Button 
              variant="ghost" 
              size="lg" 
              className="hover:text-primary hover:scale-110 transition-all"
              asChild
            >
              <a href="mailto:rahulthatipamula6@gmail.com">
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg" 
              className="hover:text-primary hover:scale-110 transition-all"
              asChild
            >
              <a href="https://linkedin.com/in/rahul-thatipamula" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg" 
              className="hover:text-primary hover:scale-110 transition-all"
              asChild
            >
              <a href="https://github.com/rahul-thatipamula" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2025 Axiviontech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;