import { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { ArrowLeft, Upload, FileText, Sparkles, CheckCircle, XCircle, Lightbulb, RotateCcw } from 'lucide-react'

interface ResumeMatchProps {
  onBack: () => void
}

interface AnalysisResult {
  score: number
  matchingSkills: string[]
  missingSkills: string[]
  suggestions: string[]
  experienceMatch: {
    required: string | null
    yours: string | null
    meets: boolean | null
  }
}

// Common tech skills and keywords to look for
const SKILL_PATTERNS = [
  // Programming Languages
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'ruby', 'go', 'golang', 'rust', 'php', 'swift', 'kotlin', 'scala', 'r', 'matlab', 'perl', 'bash', 'shell', 'sql', 'html', 'css', 'sass', 'less',
  // Frameworks & Libraries
  'react', 'reactjs', 'react.js', 'angular', 'angularjs', 'vue', 'vuejs', 'vue.js', 'svelte', 'nextjs', 'next.js', 'nuxt', 'gatsby', 'express', 'expressjs', 'nestjs', 'django', 'flask', 'fastapi', 'spring', 'spring boot', 'rails', 'ruby on rails', 'laravel', '.net', 'asp.net', 'node', 'nodejs', 'node.js', 'deno', 'jquery', 'bootstrap', 'tailwind', 'tailwindcss', 'material ui', 'chakra',
  // Databases
  'mysql', 'postgresql', 'postgres', 'mongodb', 'redis', 'elasticsearch', 'dynamodb', 'cassandra', 'sqlite', 'oracle', 'sql server', 'mariadb', 'firebase', 'firestore', 'supabase', 'graphql', 'prisma',
  // Cloud & DevOps
  'aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'heroku', 'vercel', 'netlify', 'digitalocean', 'docker', 'kubernetes', 'k8s', 'terraform', 'ansible', 'jenkins', 'circleci', 'github actions', 'gitlab ci', 'ci/cd', 'devops', 'linux', 'unix', 'nginx', 'apache',
  // Data & AI/ML
  'machine learning', 'ml', 'deep learning', 'ai', 'artificial intelligence', 'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'pandas', 'numpy', 'data science', 'data analysis', 'data engineering', 'etl', 'spark', 'hadoop', 'tableau', 'power bi', 'looker', 'nlp', 'computer vision', 'llm',
  // Tools & Practices
  'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence', 'slack', 'figma', 'sketch', 'adobe', 'photoshop', 'agile', 'scrum', 'kanban', 'rest', 'restful', 'api', 'apis', 'microservices', 'serverless', 'oauth', 'jwt', 'testing', 'unit testing', 'integration testing', 'tdd', 'jest', 'mocha', 'cypress', 'selenium', 'playwright',
  // Soft Skills & Business
  'leadership', 'management', 'communication', 'teamwork', 'collaboration', 'problem solving', 'analytical', 'presentation', 'stakeholder', 'cross-functional', 'strategic', 'project management', 'product management', 'ux', 'ui', 'user experience', 'user interface', 'design thinking', 'customer', 'client',
  // Certifications & Methodologies
  'pmp', 'certified', 'certification', 'aws certified', 'azure certified', 'google certified', 'six sigma', 'lean', 'itil', 'cissp', 'cpa', 'cfa',
  // Industries & Domains
  'fintech', 'healthcare', 'e-commerce', 'ecommerce', 'saas', 'b2b', 'b2c', 'startup', 'enterprise', 'finance', 'banking', 'insurance', 'retail', 'marketing', 'sales',
]

// Experience level patterns
const EXPERIENCE_PATTERNS = [
  { pattern: /(\d+)\+?\s*(?:years?|yrs?)(?:\s+of)?\s+(?:experience|exp)/i, type: 'years' },
  { pattern: /(?:experience|exp)(?:\s+of)?\s*:?\s*(\d+)\+?\s*(?:years?|yrs?)/i, type: 'years' },
  { pattern: /entry[\s-]?level/i, type: 'entry' },
  { pattern: /junior/i, type: 'junior' },
  { pattern: /mid[\s-]?level/i, type: 'mid' },
  { pattern: /senior/i, type: 'senior' },
  { pattern: /lead/i, type: 'lead' },
  { pattern: /principal/i, type: 'principal' },
  { pattern: /staff/i, type: 'staff' },
  { pattern: /director/i, type: 'director' },
  { pattern: /manager/i, type: 'manager' },
  { pattern: /head of/i, type: 'head' },
  { pattern: /vp|vice president/i, type: 'vp' },
  { pattern: /c-level|cto|ceo|cfo|coo/i, type: 'executive' },
]

function extractSkills(text: string): string[] {
  const lowerText = text.toLowerCase()
  const foundSkills: string[] = []
  
  for (const skill of SKILL_PATTERNS) {
    // Create regex that matches whole words
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
    if (regex.test(lowerText)) {
      // Normalize the skill name
      const normalizedSkill = skill.charAt(0).toUpperCase() + skill.slice(1)
      if (!foundSkills.some(s => s.toLowerCase() === skill.toLowerCase())) {
        foundSkills.push(normalizedSkill)
      }
    }
  }
  
  return foundSkills
}

function extractExperience(text: string): string | null {
  for (const { pattern, type } of EXPERIENCE_PATTERNS) {
    const match = text.match(pattern)
    if (match) {
      if (type === 'years' && match[1]) {
        return `${match[1]}+ years`
      }
      return type.charAt(0).toUpperCase() + type.slice(1) + ' level'
    }
  }
  return null
}

function analyzeMatch(resume: string, jobDescription: string): AnalysisResult {
  const resumeSkills = extractSkills(resume)
  const jobSkills = extractSkills(jobDescription)
  
  const matchingSkills = resumeSkills.filter(skill => 
    jobSkills.some(js => js.toLowerCase() === skill.toLowerCase())
  )
  
  const missingSkills = jobSkills.filter(skill => 
    !resumeSkills.some(rs => rs.toLowerCase() === skill.toLowerCase())
  )
  
  // Calculate score
  let score = 0
  if (jobSkills.length > 0) {
    score = Math.round((matchingSkills.length / jobSkills.length) * 100)
  } else {
    score = resumeSkills.length > 0 ? 50 : 0
  }
  
  // Cap at 95 to always leave room for improvement
  score = Math.min(score, 95)
  
  // Boost score slightly if many skills match
  if (matchingSkills.length >= 5 && score < 80) {
    score = Math.min(score + 10, 80)
  }
  
  // Experience matching
  const requiredExp = extractExperience(jobDescription)
  const yourExp = extractExperience(resume)
  
  let experienceMeets: boolean | null = null
  if (requiredExp && yourExp) {
    // Simple heuristic - this could be more sophisticated
    experienceMeets = true // Default to true if both are present
  }
  
  // Generate suggestions
  const suggestions: string[] = []
  
  if (missingSkills.length > 0) {
    const topMissing = missingSkills.slice(0, 3).join(', ')
    suggestions.push(`Consider adding experience with ${topMissing} to your resume if you have any exposure to these technologies.`)
  }
  
  if (matchingSkills.length > 0 && score < 70) {
    suggestions.push(`Highlight your ${matchingSkills[0]} experience more prominently in your resume summary.`)
  }
  
  if (jobSkills.length > 0 && matchingSkills.length === 0) {
    suggestions.push(`This role may require skills outside your current experience. Consider if it's a good fit or if you need additional training.`)
  }
  
  if (score >= 70) {
    suggestions.push(`Strong match! Tailor your cover letter to emphasize your ${matchingSkills.slice(0, 2).join(' and ')} experience.`)
  }
  
  if (missingSkills.length > 5) {
    suggestions.push(`Consider taking online courses in ${missingSkills[0]} or ${missingSkills[1]} to strengthen your application.`)
  }
  
  if (!yourExp && requiredExp) {
    suggestions.push(`The job requires ${requiredExp} - make sure to clearly state your years of experience in your resume.`)
  }
  
  return {
    score,
    matchingSkills,
    missingSkills,
    suggestions: suggestions.slice(0, 4),
    experienceMatch: {
      required: requiredExp,
      yours: yourExp,
      meets: experienceMeets,
    },
  }
}

export function ResumeMatch({ onBack }: ResumeMatchProps) {
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = () => {
    if (!resume.trim() || !jobDescription.trim()) return
    
    setIsAnalyzing(true)
    
    // Simulate brief processing time for better UX
    setTimeout(() => {
      const analysis = analyzeMatch(resume, jobDescription)
      setResult(analysis)
      setIsAnalyzing(false)
    }, 800)
  }

  const handleReset = () => {
    setResume('')
    setJobDescription('')
    setResult(null)
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-emerald-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match'
    if (score >= 70) return 'Strong Match'
    if (score >= 50) return 'Moderate Match'
    if (score >= 30) return 'Weak Match'
    return 'Low Match'
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tracker
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="font-semibold">Resume Match</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!result ? (
          <>
            {/* Input Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">AI Resume Match</h1>
              <p className="text-gray-400">See how well your resume matches a job description</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Resume Input */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <h2 className="font-semibold">Your Resume</h2>
                </div>
                <Textarea
                  placeholder="Paste your resume text here..."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  className="min-h-[300px] bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {resume.length} characters
                </p>
              </div>

              {/* Job Description Input */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <Upload className="w-5 h-5 text-emerald-400" />
                  <h2 className="font-semibold">Job Description</h2>
                </div>
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[300px] bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {jobDescription.length} characters
                </p>
              </div>
            </div>

            {/* Analyze Button */}
            <div className="text-center">
              <Button
                onClick={handleAnalyze}
                disabled={!resume.trim() || !jobDescription.trim() || isAnalyzing}
                className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-8 py-6 text-lg"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Analyze Match
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Results Section */}
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={handleReset}
                className="text-gray-400 hover:text-white mb-4"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Analyze Another Job
              </Button>

              {/* Score Card */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 text-center mb-6">
                <div className="text-6xl font-bold mb-2">
                  <span className={getScoreColor(result.score)}>{result.score}%</span>
                </div>
                <div className={`text-xl ${getScoreColor(result.score)}`}>
                  {getScoreLabel(result.score)}
                </div>
                <p className="text-gray-400 mt-2">
                  Based on {result.matchingSkills.length + result.missingSkills.length} skills identified in the job posting
                </p>
              </div>

              {/* Skills Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Matching Skills */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <h2 className="font-semibold">Matching Skills ({result.matchingSkills.length})</h2>
                  </div>
                  {result.matchingSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {result.matchingSkills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No matching skills found</p>
                  )}
                </div>

                {/* Missing Skills */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <h2 className="font-semibold">Missing Skills ({result.missingSkills.length})</h2>
                  </div>
                  {result.missingSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {result.missingSkills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-emerald-400">You have all the required skills!</p>
                  )}
                </div>
              </div>

              {/* Experience Match */}
              {(result.experienceMatch.required || result.experienceMatch.yours) && (
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
                  <h2 className="font-semibold mb-4">Experience Level</h2>
                  <div className="flex gap-8">
                    {result.experienceMatch.required && (
                      <div>
                        <p className="text-gray-400 text-sm">Required</p>
                        <p className="text-white font-medium">{result.experienceMatch.required}</p>
                      </div>
                    )}
                    {result.experienceMatch.yours && (
                      <div>
                        <p className="text-gray-400 text-sm">Your Experience</p>
                        <p className="text-white font-medium">{result.experienceMatch.yours}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {result.suggestions.length > 0 && (
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h2 className="font-semibold">Suggestions</h2>
                  </div>
                  <ul className="space-y-3">
                    {result.suggestions.map((suggestion, i) => (
                      <li key={i} className="flex gap-3 text-gray-300">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
