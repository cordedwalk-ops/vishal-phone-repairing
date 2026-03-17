import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import {
  AlertCircle,
  BatteryCharging,
  Camera,
  CheckCircle,
  Clock,
  DollarSign,
  Droplets,
  Loader2,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plug,
  Shield,
  Smartphone,
  Star,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { ServiceType } from "./backend.d";

const SERVICES = [
  {
    id: 1,
    icon: BatteryCharging,
    name: "Battery Replacement",
    desc: "Restore your phone's battery life with genuine replacement batteries. Fast and reliable.",
    serviceType: ServiceType.batteryReplacement,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    id: 2,
    icon: Camera,
    name: "Camera Repair",
    desc: "Fix blurry, cracked, or non-functional cameras. Get crystal-clear photos again.",
    serviceType: ServiceType.cameraRepair,
    color: "text-sky-400",
    bg: "bg-sky-400/10",
  },
  {
    id: 3,
    icon: Plug,
    name: "Charger Port Repair",
    desc: "Solve charging issues, loose ports, or no charging problems with expert precision.",
    serviceType: ServiceType.chargerPortRepair,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    id: 4,
    icon: Droplets,
    name: "Water Damage Repair",
    desc: "Professional cleaning and repair for water-damaged devices. Don't give up on your phone.",
    serviceType: ServiceType.waterDamageRepair,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    id: 5,
    icon: Smartphone,
    name: "Screen Damage Repair",
    desc: "Replace cracked or broken screens with quality parts. Like new in no time.",
    serviceType: ServiceType.screenDamageRepair,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
];

const WHY_US = [
  {
    icon: Clock,
    title: "Quick Turnaround",
    desc: "Most repairs completed same day. No waiting weeks — get your phone back fast.",
  },
  {
    icon: DollarSign,
    title: "Affordable Prices",
    desc: "Home-based service means lower overhead, which means better prices for you.",
  },
  {
    icon: Shield,
    title: "Quality Parts Used",
    desc: "Only high-grade replacement parts used, backed by our repair guarantee.",
  },
];

const SERVICE_SELECT_OPTIONS = [
  { label: "Battery Replacement", value: ServiceType.batteryReplacement },
  { label: "Camera Repair", value: ServiceType.cameraRepair },
  { label: "Charger Port Repair", value: ServiceType.chargerPortRepair },
  { label: "Water Damage Repair", value: ServiceType.waterDamageRepair },
  { label: "Screen Damage Repair", value: ServiceType.screenDamageRepair },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function App() {
  const { actor } = useActor();
  const contactRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    device: "",
    service: "" as ServiceType | "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !formData.service) return;

    setSubmitState("loading");
    try {
      await actor.submitBooking(
        formData.name,
        formData.phone,
        formData.device,
        formData.service as ServiceType,
        formData.message,
      );
      setSubmitState("success");
      setFormData({
        name: "",
        phone: "",
        device: "",
        service: "",
        message: "",
      });
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── NAVBAR ───────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Wrench className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground tracking-tight">
              Vishal <span className="text-primary">Phone Repair</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Home", id: "home", ocid: "nav.home.link" },
              { label: "Services", id: "services", ocid: "nav.services.link" },
              { label: "About", id: "about", ocid: "nav.about.link" },
              { label: "Contact", id: "contact", ocid: "nav.contact.link" },
              { label: "Location", id: "location", ocid: "nav.location.link" },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                data-ocid={item.ocid}
                onClick={() => scrollTo(item.id)}
                className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button
              size="sm"
              className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold animate-pulse-glow"
              onClick={scrollToContact}
            >
              Book Repair
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-background/95 backdrop-blur-md overflow-hidden"
            >
              <div className="container px-4 py-4 flex flex-col gap-1">
                {[
                  { label: "Home", id: "home", ocid: "nav.home.link" },
                  {
                    label: "Services",
                    id: "services",
                    ocid: "nav.services.link",
                  },
                  { label: "About", id: "about", ocid: "nav.about.link" },
                  { label: "Contact", id: "contact", ocid: "nav.contact.link" },
                  {
                    label: "Location",
                    id: "location",
                    ocid: "nav.location.link",
                  },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    data-ocid={item.ocid}
                    onClick={() => scrollTo(item.id)}
                    className="text-left px-4 py-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                  onClick={scrollToContact}
                >
                  Book Repair
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ─────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden pt-16"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/hero-phone-repair.dim_1600x900.jpg"
            alt="Phone repair background"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Decorative glow orb */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl bg-primary/10 pointer-events-none z-0" />

        <div className="container max-w-6xl mx-auto px-4 relative z-10 py-24">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
            <motion.div
              variants={fadeUpVariants}
              custom={0}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <MapPin className="w-3.5 h-3.5" />
              Home-Based Service · Fast Turnaround
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              custom={1}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground mb-6"
            >
              Expert Phone Repairs{" "}
              <span className="text-primary text-glow-orange">
                at Your Doorstep
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              custom={2}
              className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg"
            >
              Professional phone repair from the comfort of your home. Quick
              turnaround, genuine parts, and honest pricing — no shop visits
              needed.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              custom={3}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                data-ocid="hero.primary_button"
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base px-8 py-6 shadow-orange"
                onClick={scrollToContact}
              >
                Book a Repair
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary font-semibold text-base px-8 py-6"
                onClick={() => scrollTo("services")}
              >
                View Services
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={fadeUpVariants}
              custom={4}
              className="flex flex-wrap gap-6 mt-12"
            >
              {[
                { icon: Star, text: "5-Star Service" },
                { icon: Clock, text: "Same-Day Repairs" },
                { icon: Shield, text: "Quality Guaranteed" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────── */}
      <section id="services" className="py-24 bg-background relative">
        {/* Subtle gradient accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary/50 to-transparent" />

        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-muted-foreground text-sm font-medium mb-4">
              <Wrench className="w-3.5 h-3.5" />
              What We Fix
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Our Repair Services
            </h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto">
              From cracked screens to water damage — we handle it all with
              precision and care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                data-ocid={`services.item.${service.id}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.55,
                  ease: "easeOut",
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-card border border-border rounded-xl p-6 shadow-card cursor-default hover:border-primary/40 transition-colors duration-200"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div
                  className={`w-12 h-12 rounded-lg ${service.bg} flex items-center justify-center mb-4`}
                >
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}

            {/* CTA card — fills the 6th slot in 3-col layout */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 5 * 0.08, duration: 0.55, ease: "easeOut" }}
              className="bg-primary/10 border border-primary/30 rounded-xl p-6 flex flex-col items-start justify-between gap-4"
            >
              <div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  Not sure what's wrong?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Describe the issue and we'll diagnose it for you at no extra
                  charge.
                </p>
              </div>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                onClick={scrollToContact}
              >
                Get Help
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────── */}
      <section className="py-20 bg-secondary/30 border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        <div className="container max-w-6xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Why Choose Vishal?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────── */}
      <section id="about" className="py-24 bg-background">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-muted-foreground text-sm font-medium mb-6">
                About Us
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
                Meet Vishal, Your{" "}
                <span className="text-primary">Trusted Tech</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Vishal is an experienced phone technician providing reliable
                repair services from home. With years of hands-on experience
                repairing all major smartphone brands, Vishal brings
                professional-grade repairs directly to your doorstep.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                No need to visit a shop or mail your phone away. Enjoy the
                convenience of home service, honest transparent pricing, and
                repairs done right the first time — backed by a satisfaction
                guarantee.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "All Major Brands",
                  "iPhones & Android",
                  "Same-Day Service",
                  "Home Visits",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-secondary text-sm font-medium text-foreground border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { num: "500+", label: "Phones Fixed" },
                { num: "5★", label: "Average Rating" },
                { num: "Same Day", label: "Turnaround" },
                { num: "100%", label: "Satisfaction" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-xl p-6 text-center shadow-card"
                >
                  <div className="font-display text-3xl font-bold text-primary mb-1">
                    {stat.num}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT / BOOK ────────────────────────── */}
      <section
        id="contact"
        ref={contactRef}
        className="py-24 bg-secondary/20 border-t border-border"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4">
              <Phone className="w-3.5 h-3.5" />
              Let's Get Your Phone Fixed
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Book a Repair
            </h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-md mx-auto">
              Fill in your details and Vishal will get back to you promptly to
              confirm your booking.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
              <a
                href="tel:9250318431"
                data-ocid="contact.phone.link"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors shadow"
              >
                <Phone className="w-4 h-4" />
                Call: 9250318431
              </a>
              <a
                href="https://wa.me/919250318431"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.whatsapp.link"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-base hover:bg-[#1ebe5d] transition-colors shadow"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="bg-card border border-border rounded-2xl p-8 shadow-card"
            >
              {/* Success state */}
              <AnimatePresence>
                {submitState === "success" && (
                  <motion.div
                    data-ocid="contact.success_state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center py-8 gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      Booking Received!
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
                      Vishal will contact you shortly to confirm your repair
                      appointment.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2 border-border"
                      onClick={() => setSubmitState("idle")}
                    >
                      Book Another Repair
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              {submitState !== "success" && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Error state */}
                  {submitState === "error" && (
                    <motion.div
                      data-ocid="contact.error_state"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm font-medium">
                        Something went wrong. Please try again or contact us
                        directly.
                      </p>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-foreground font-medium text-sm"
                      >
                        Your Name <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="name"
                        data-ocid="contact.form.input"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, name: e.target.value }))
                        }
                        required
                        className="bg-input border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-foreground font-medium text-sm"
                      >
                        Phone Number <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="phone"
                        data-ocid="contact.phone.input"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, phone: e.target.value }))
                        }
                        required
                        type="tel"
                        className="bg-input border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="device"
                      className="text-foreground font-medium text-sm"
                    >
                      Device Model <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="device"
                      data-ocid="contact.device.input"
                      placeholder="e.g. iPhone 14, Samsung Galaxy S23"
                      value={formData.device}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, device: e.target.value }))
                      }
                      required
                      className="bg-input border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground font-medium text-sm">
                      Service Type <span className="text-primary">*</span>
                    </Label>
                    <Select
                      value={formData.service}
                      onValueChange={(v) =>
                        setFormData((p) => ({
                          ...p,
                          service: v as ServiceType,
                        }))
                      }
                      required
                    >
                      <SelectTrigger
                        data-ocid="contact.service.select"
                        className="bg-input border-input text-foreground focus:ring-primary"
                      >
                        <SelectValue placeholder="Select a service..." />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {SERVICE_SELECT_OPTIONS.map((opt) => (
                          <SelectItem
                            key={opt.value}
                            value={opt.value}
                            className="text-foreground"
                          >
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-foreground font-medium text-sm"
                    >
                      Describe the Issue{" "}
                      <span className="text-muted-foreground text-xs font-normal">
                        (optional)
                      </span>
                    </Label>
                    <Textarea
                      id="message"
                      data-ocid="contact.message.textarea"
                      placeholder="Tell us more about the problem you're experiencing..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      rows={4}
                      className="bg-input border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary resize-none"
                    />
                  </div>

                  {/* Loading state indicator */}
                  {submitState === "loading" && (
                    <div
                      data-ocid="contact.loading_state"
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      Submitting your booking...
                    </div>
                  )}

                  <Button
                    data-ocid="contact.submit_button"
                    type="submit"
                    size="lg"
                    disabled={
                      submitState === "loading" ||
                      !formData.name ||
                      !formData.phone ||
                      !formData.device ||
                      !formData.service
                    }
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base py-6 disabled:opacity-60"
                  >
                    {submitState === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      "Book Repair"
                    )}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────── */}
      <section id="testimonials" className="py-24 bg-background relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary/50 to-transparent" />
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-muted-foreground text-sm font-medium mb-4">
              <Star className="w-3.5 h-3.5 text-yellow-400" />
              Customer Reviews
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              What Customers Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: "Very fast service, fixed my iPhone screen in 30 minutes. Highly recommend Vishal!",
                name: "Aditya",
                location: "Basti",
                stars: 5,
              },
              {
                text: "My phone was water damaged and I thought it was gone. Vishal fixed it the same day at a very reasonable price.",
                name: "Rahul",
                location: "Basti",
                stars: 5,
              },
              {
                text: "Battery replacement done quickly. The phone is like new now. Very professional and honest service.",
                name: "Priya",
                location: "Basti",
                stars: 5,
              },
            ].map((review, i) => (
              <motion.div
                key={review.name}
                data-ocid={`testimonials.item.${i + 1}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: "easeOut" }}
                className="bg-card border border-border rounded-xl p-6 shadow-card flex flex-col gap-4"
              >
                <div className="flex gap-1">
                  {Array.from(
                    { length: review.stars },
                    (_, s) => `star-${s}`,
                  ).map((key) => (
                    <Star
                      key={key}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed text-sm flex-1">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      {review.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {review.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ─────────────────────────────── */}
      <section
        id="location"
        className="py-24 bg-secondary/20 border-t border-border"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-muted-foreground text-sm font-medium mb-4">
              <MapPin className="w-3.5 h-3.5" />
              Find Us
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Our Location
            </h2>
            <p className="text-muted-foreground mt-3 text-base max-w-md mx-auto">
              House No. 3, Vishal Phone Repairing, Number 3, Kaili Rd, Zakhni,
              Basti, Uttar Pradesh 272002
            </p>
            <a
              href="https://maps.google.com/?q=26.787731,82.763333"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="location.directions.link"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              Get Directions
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="rounded-2xl overflow-hidden border border-border shadow-card"
          >
            <iframe
              title="Vishal Phone Repairing Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d82.763333!3d26.787731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ3JzE1LjgiTiA4MsKwNDUnNDguMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────── */}
      <footer className="bg-background border-t border-border py-10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <Wrench className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <div className="font-display font-bold text-foreground">
                  Vishal Phone Repair
                </div>
                <div className="text-xs text-muted-foreground">
                  Quality repairs, at home
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <button
                type="button"
                onClick={() => scrollTo("services")}
                className="hover:text-foreground transition-colors"
              >
                Services
              </button>
              <button
                type="button"
                onClick={() => scrollTo("about")}
                className="hover:text-foreground transition-colors"
              >
                About
              </button>
              <button
                type="button"
                onClick={scrollToContact}
                className="hover:text-foreground transition-colors"
              >
                Book Repair
              </button>
              <a
                href="tel:9250318431"
                className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5" />
                9250318431
              </a>
              <a
                href="https://wa.me/919250318431"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#25D366] hover:text-[#1ebe5d] transition-colors font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Vishal Phone Repair. All rights
                reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Built with{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
