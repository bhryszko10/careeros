import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Briefcase, 
  TrendingUp, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  BarChart3,
  Bell,
  Zap,
  ChevronRight,
  FileSearch
} from 'lucide-react'

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // In production, this would send to a backend
      localStorage.setItem('careeros-waitlist-email', email)
      setSubscribed(true)
    }
  }

  return (
    <div className="min-h-screen bg-background dark">
      {/* Gradient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-600/5 rounded-full blur-[80px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-border/40 backdrop-blur-xl bg-background/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-background" />
            </div>
            <span className="font-semibold text-lg tracking-tight">CareerOS</span>
          </div>
          <Button onClick={onGetStarted} className="bg-emerald-500 hover:bg-emerald-600 text-background font-medium">
            Launch App
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Career Acceleration Stack
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Stop losing track of
            <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              your job search
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            The command center for modern job seekers. Track applications, nail negotiations, 
            and map your career path — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              onClick={onGetStarted} 
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-background font-semibold px-8 h-14 text-base glow"
            >
              Start Tracking — It's Free
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
            <span className="text-sm text-muted-foreground">No signup required</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: '50+', label: 'Applications tracked' },
              { value: '6.2x', label: 'More interviews' },
              { value: '23%', label: 'Higher offers' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 border-t border-border/40 bg-card/30 backdrop-blur-sm py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to land your dream role
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stop juggling spreadsheets. Get a system that actually works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="group p-6 rounded-2xl bg-gradient-to-b from-card to-card/50 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visual Pipeline</h3>
              <p className="text-muted-foreground leading-relaxed">
                Kanban-style board to track every application from saved to offer. 
                Drag, drop, never lose track.
              </p>
              <ul className="mt-4 space-y-2">
                {['Drag & drop interface', 'Custom stages', 'Quick filters'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 2 - Resume Match (NEW) */}
            <div className="group p-6 rounded-2xl bg-gradient-to-b from-card to-card/50 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">
                NEW
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileSearch className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Resume Match</h3>
              <p className="text-muted-foreground leading-relaxed">
                Instantly see how well your resume matches any job description. Get actionable feedback.
              </p>
              <ul className="mt-4 space-y-2">
                {['Match score %', 'Missing skills', 'Improvement tips'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 rounded-2xl bg-gradient-to-b from-card to-card/50 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bell className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
              <p className="text-muted-foreground leading-relaxed">
                Never ghost a recruiter again. Get nudged to follow up at the perfect time.
              </p>
              <ul className="mt-4 space-y-2">
                {['Follow-up alerts', 'Interview prep', 'Deadline tracking'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="group p-6 rounded-2xl bg-gradient-to-b from-card to-card/50 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Analytics</h3>
              <p className="text-muted-foreground leading-relaxed">
                Data-driven insights on your job search. See what's working, fix what isn't.
              </p>
              <ul className="mt-4 space-y-2">
                {['Response rates', 'Time metrics', 'Conversion funnel'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-sky-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Career Stack Preview */}
      <section className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Coming Soon
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              The Complete Career Stack
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Job tracking is just the beginning. Unlock the full suite to accelerate every stage of your career.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Negotiate Tool */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-rose-500/5 to-orange-500/5 border border-rose-500/20 overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-medium">
                Coming Q2
              </div>
              <TrendingUp className="w-10 h-10 text-rose-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">CareerOS Negotiate</h3>
              <p className="text-muted-foreground mb-4">
                Salary data, negotiation scripts, and counter-offer calculators. 
                Stop leaving money on the table.
              </p>
              <ul className="space-y-2">
                {['Real salary benchmarks', 'AI-powered scripts', 'Total comp calculator'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-rose-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigator Tool */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-violet-500/5 to-indigo-500/5 border border-violet-500/20 overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-medium">
                Coming Q3
              </div>
              <Target className="w-10 h-10 text-violet-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">CareerOS Navigator</h3>
              <p className="text-muted-foreground mb-4">
                Interactive career mapping. See possible paths, skill gaps, and 
                build your 5-year plan.
              </p>
              <ul className="space-y-2">
                {['Career path visualization', 'Skill gap analysis', 'Transition roadmaps'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-violet-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="relative z-10 py-24 border-t border-border/40">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get early access to new features
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join the waitlist for CareerOS Negotiate & Navigator. 
            Early supporters get lifetime access at launch pricing.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <span className="text-emerald-400 font-medium">You're on the list! We'll be in touch.</span>
            </div>
          ) : (
            <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-card border-border/50 focus:border-emerald-500/50 flex-1"
                required
              />
              <Button 
                type="submit"
                className="h-12 px-6 bg-emerald-500 hover:bg-emerald-600 text-background font-medium"
              >
                Join Waitlist
              </Button>
            </form>
          )}

          <p className="text-sm text-muted-foreground mt-4">
            🔒 No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <Briefcase className="w-3 h-3 text-background" />
            </div>
            <span className="font-medium text-sm">CareerOS</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 CareerOS. Built for ambitious professionals.
          </p>
        </div>
      </footer>
    </div>
  )
}
