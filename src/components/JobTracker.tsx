import { useState, useMemo } from 'react'
import type { Job } from '../App'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Briefcase, 
  Plus, 
  Search, 
  MoreHorizontal,
  ExternalLink,
  Trash2,
  Edit3,
  Calendar,
  Building2,
  MapPin,
  DollarSign,
  ArrowLeft,
  GripVertical,
  BarChart3
} from 'lucide-react'

interface JobTrackerProps {
  jobs: Job[]
  onAddJob: (job: Omit<Job, 'id' | 'lastActivity'>) => void
  onUpdateJob: (id: string, updates: Partial<Job>) => void
  onDeleteJob: (id: string) => void
  onMoveJob: (id: string, status: Job['status']) => void
  onBackToLanding: () => void
}

const COLUMNS: { id: Job['status']; title: string; color: string }[] = [
  { id: 'saved', title: 'Saved', color: 'bg-slate-500' },
  { id: 'applied', title: 'Applied', color: 'bg-blue-500' },
  { id: 'screening', title: 'Screening', color: 'bg-amber-500' },
  { id: 'interviewing', title: 'Interviewing', color: 'bg-purple-500' },
  { id: 'offer', title: 'Offer', color: 'bg-emerald-500' },
  { id: 'rejected', title: 'Rejected', color: 'bg-rose-500' },
]

export function JobTracker({ 
  jobs, 
  onAddJob, 
  onUpdateJob, 
  onDeleteJob, 
  onMoveJob,
  onBackToLanding 
}: JobTrackerProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [draggedJob, setDraggedJob] = useState<string | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<Job['status'] | null>(null)

  const filteredJobs = useMemo(() => {
    if (!searchQuery) return jobs
    const query = searchQuery.toLowerCase()
    return jobs.filter(job => 
      job.company.toLowerCase().includes(query) ||
      job.position.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
    )
  }, [jobs, searchQuery])

  const jobsByStatus = useMemo(() => {
    return COLUMNS.reduce((acc, col) => {
      acc[col.id] = filteredJobs.filter(job => job.status === col.id)
      return acc
    }, {} as Record<Job['status'], Job[]>)
  }, [filteredJobs])

  const stats = useMemo(() => {
    const total = jobs.length
    const active = jobs.filter(j => !['rejected', 'offer'].includes(j.status)).length
    const responseRate = total > 0 
      ? Math.round((jobs.filter(j => j.status !== 'applied' && j.status !== 'saved').length / Math.max(jobs.filter(j => j.status !== 'saved').length, 1)) * 100)
      : 0
    return { total, active, responseRate }
  }, [jobs])

  const handleDragStart = (e: React.DragEvent, jobId: string) => {
    setDraggedJob(jobId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, status: Job['status']) => {
    e.preventDefault()
    setDragOverColumn(status)
  }

  const handleDragLeave = () => {
    setDragOverColumn(null)
  }

  const handleDrop = (e: React.DragEvent, status: Job['status']) => {
    e.preventDefault()
    if (draggedJob) {
      onMoveJob(draggedJob, status)
    }
    setDraggedJob(null)
    setDragOverColumn(null)
  }

  const handleDragEnd = () => {
    setDraggedJob(null)
    setDragOverColumn(null)
  }

  return (
    <div className="min-h-screen bg-background dark flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo & Back */}
            <div className="flex items-center gap-4">
              <button 
                onClick={onBackToLanding}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-background" />
                </div>
                <span className="font-semibold text-lg tracking-tight">CareerOS</span>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-border/50 focus:border-emerald-500/50"
                />
              </div>
            </div>

            {/* Stats & Add */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Active:</span>
                  <span className="font-semibold">{stats.active}</span>
                </div>
                <div className="text-muted-foreground">
                  Response: <span className="font-semibold text-foreground">{stats.responseRate}%</span>
                </div>
              </div>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-background">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Add New Job</DialogTitle>
                  </DialogHeader>
                  <JobForm 
                    onSubmit={(job) => {
                      onAddJob(job)
                      setIsAddDialogOpen(false)
                    }}
                    onCancel={() => setIsAddDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Kanban Board */}
      <main className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-4 min-w-max h-full">
          {COLUMNS.map((column) => (
            <div
              key={column.id}
              className={`w-80 flex flex-col rounded-xl bg-card/30 border transition-all duration-200 ${
                dragOverColumn === column.id 
                  ? 'border-emerald-500/50 ring-2 ring-emerald-500/20' 
                  : 'border-border/40'
              }`}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className="p-4 border-b border-border/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${column.color}`} />
                    <h3 className="font-semibold">{column.title}</h3>
                  </div>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {jobsByStatus[column.id].length}
                  </span>
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[calc(100vh-220px)]">
                {jobsByStatus[column.id].length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No jobs here yet
                  </div>
                ) : (
                  jobsByStatus[column.id].map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isDragging={draggedJob === job.id}
                      onDragStart={(e) => handleDragStart(e, job.id)}
                      onDragEnd={handleDragEnd}
                      onEdit={() => setEditingJob(job)}
                      onDelete={() => onDeleteJob(job.id)}
                      onMove={(status) => onMoveJob(job.id, status)}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={!!editingJob} onOpenChange={(open) => !open && setEditingJob(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
          </DialogHeader>
          {editingJob && (
            <JobForm
              initialData={editingJob}
              onSubmit={(updates) => {
                onUpdateJob(editingJob.id, updates)
                setEditingJob(null)
              }}
              onCancel={() => setEditingJob(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Job Card Component
interface JobCardProps {
  job: Job
  isDragging: boolean
  onDragStart: (e: React.DragEvent) => void
  onDragEnd: () => void
  onEdit: () => void
  onDelete: () => void
  onMove: (status: Job['status']) => void
}

function JobCard({ job, isDragging, onDragStart, onDragEnd, onEdit, onDelete, onMove }: JobCardProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`group p-4 rounded-lg bg-card border border-border/50 cursor-grab active:cursor-grabbing transition-all duration-200 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 ${
        isDragging ? 'opacity-50 scale-[1.02] rotate-1' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <GripVertical className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h4 className="font-semibold text-sm truncate">{job.position}</h4>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={onEdit}>
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            {job.url && (
              <DropdownMenuItem onClick={() => window.open(job.url, '_blank')}>
                <ExternalLink className="w-4 h-4 mr-2" />
                View Posting
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Move to</div>
            {COLUMNS.filter(c => c.id !== job.status).map((col) => (
              <DropdownMenuItem key={col.id} onClick={() => onMove(col.id)}>
                <div className={`w-2 h-2 rounded-full mr-2 ${col.color}`} />
                {col.title}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{job.company}</span>
        </div>
        {job.location && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
        )}
        {job.salary && (
          <div className="flex items-center gap-2 text-emerald-400">
            <DollarSign className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{job.salary}</span>
          </div>
        )}
        {job.appliedDate && (
          <div className="flex items-center gap-2 text-muted-foreground text-xs mt-3 pt-3 border-t border-border/50">
            <Calendar className="w-3 h-3 flex-shrink-0" />
            <span>Applied {new Date(job.appliedDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Job Form Component
interface JobFormProps {
  initialData?: Job
  onSubmit: (job: Omit<Job, 'id' | 'lastActivity'>) => void
  onCancel: () => void
}

function JobForm({ initialData, onSubmit, onCancel }: JobFormProps) {
  const [formData, setFormData] = useState({
    company: initialData?.company || '',
    position: initialData?.position || '',
    location: initialData?.location || '',
    salary: initialData?.salary || '',
    url: initialData?.url || '',
    notes: initialData?.notes || '',
    status: initialData?.status || 'saved' as Job['status'],
    appliedDate: initialData?.appliedDate || '',
    nextFollowUp: initialData?.nextFollowUp || '',
    contacts: initialData?.contacts || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.company || !formData.position) return
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            placeholder="Acme Inc."
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position *</Label>
          <Input
            id="position"
            value={formData.position}
            onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
            placeholder="Software Engineer"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="San Francisco, CA"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salary">Salary Range</Label>
          <Input
            id="salary"
            value={formData.salary}
            onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
            placeholder="$120k - $150k"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">Job Posting URL</Label>
        <Input
          id="url"
          type="url"
          value={formData.url}
          onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
          placeholder="https://..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="appliedDate">Applied Date</Label>
          <Input
            id="appliedDate"
            type="date"
            value={formData.appliedDate}
            onChange={(e) => setFormData(prev => ({ ...prev, appliedDate: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nextFollowUp">Follow-up Date</Label>
          <Input
            id="nextFollowUp"
            type="date"
            value={formData.nextFollowUp}
            onChange={(e) => setFormData(prev => ({ ...prev, nextFollowUp: e.target.value }))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contacts">Contacts</Label>
        <Input
          id="contacts"
          value={formData.contacts}
          onChange={(e) => setFormData(prev => ({ ...prev, contacts: e.target.value }))}
          placeholder="John Doe (Recruiter), jane@company.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Interview prep notes, requirements, etc."
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-background">
          {initialData ? 'Save Changes' : 'Add Job'}
        </Button>
      </div>
    </form>
  )
}
