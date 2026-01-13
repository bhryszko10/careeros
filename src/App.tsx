import { useState, useEffect } from 'react'
import { LandingPage } from './components/LandingPage'
import { JobTracker } from './components/JobTracker'

export type Job = {
  id: string
  company: string
  position: string
  location: string
  salary?: string
  url?: string
  notes?: string
  status: 'saved' | 'applied' | 'screening' | 'interviewing' | 'offer' | 'rejected'
  appliedDate?: string
  lastActivity: string
  nextFollowUp?: string
  contacts?: string
}

export type AppView = 'landing' | 'tracker'

function App() {
  const [view, setView] = useState<AppView>('landing')
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('careeros-jobs')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('careeros-jobs', JSON.stringify(jobs))
  }, [jobs])

  const addJob = (job: Omit<Job, 'id' | 'lastActivity'>) => {
    const newJob: Job = {
      ...job,
      id: crypto.randomUUID(),
      lastActivity: new Date().toISOString(),
    }
    setJobs(prev => [newJob, ...prev])
  }

  const updateJob = (id: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(job => 
      job.id === id 
        ? { ...job, ...updates, lastActivity: new Date().toISOString() }
        : job
    ))
  }

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id))
  }

  const moveJob = (id: string, newStatus: Job['status']) => {
    updateJob(id, { status: newStatus })
  }

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('tracker')} />
  }

  return (
    <JobTracker 
      jobs={jobs}
      onAddJob={addJob}
      onUpdateJob={updateJob}
      onDeleteJob={deleteJob}
      onMoveJob={moveJob}
      onBackToLanding={() => setView('landing')}
    />
  )
}

export default App
