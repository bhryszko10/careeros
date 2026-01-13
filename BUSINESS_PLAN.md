# CareerOS: 6-Month Business Plan

**Document Created:** January 2025  
**Goal:** Validate product-market fit and reach $1,000-3,000/month recurring revenue  
**Decision Point:** Month 3 — continue, pivot, or abandon based on metrics

---

## Executive Summary

CareerOS is a career acceleration platform targeting young professionals (ages 22-35) during job transitions. We start with a job application tracker, then expand to salary negotiation tools and career path mapping.

**Success Metrics:**
- Month 1: 100 signups
- Month 3: 500 users, 25 paying customers ($200-400/month)
- Month 6: 2,000 users, 150 paying customers ($1,200-2,400/month)

**Total Investment Required:** ~$200-500 over 6 months  
**Time Investment (Brett):** 30 min/week average after initial setup

---

## Month 1: Foundation & Soft Launch (Weeks 1-4)

### Week 1: Technical Setup

| Day | Task | Owner | Time |
|-----|------|-------|------|
| 1 | Install Node.js on personal computer | Brett | 10 min |
| 1 | Create personal GitHub account | Brett | 10 min |
| 1 | Create Vercel account (use GitHub login) | Brett | 5 min |
| 1 | Push CareerOS code to GitHub | Claude | — |
| 1 | Deploy to Vercel (careeros.vercel.app) | Claude | — |
| 2 | Purchase domain (careeros.app or similar) | Brett | $12, 10 min |
| 2 | Connect domain to Vercel | Claude | — |
| 3-4 | Add analytics (Plausible or PostHog free tier) | Claude | — |
| 5-7 | Bug fixes, mobile responsiveness polish | Claude | — |

**Week 1 Deliverable:** Live website at custom domain with analytics

---

### Week 2: Account Setup & Content Prep

| Day | Task | Owner | Time |
|-----|------|-------|------|
| 8 | Create dedicated Twitter/X account for CareerOS | Brett | 10 min |
| 8 | Create dedicated LinkedIn page for CareerOS | Brett | 10 min |
| 9 | Create Substack or Medium account for blog | Brett | 10 min |
| 9 | Log into all accounts in Chrome, keep sessions active | Brett | 5 min |
| 10-14 | Write 5 blog posts (SEO-focused) | Claude | — |
| 10-14 | Write 20 social media posts (queued for later) | Claude | — |
| 10-14 | Create Product Hunt draft | Claude | — |

**Content Topics (Blog):**
1. "I Applied to 200 Jobs and Here's What Actually Worked"
2. "The Hidden Reason You're Not Hearing Back (And How to Fix It)"
3. "Job Search Spreadsheet vs. Dedicated Tracker: Honest Comparison"
4. "How to Follow Up Without Being Annoying: Scripts That Work"
5. "Why Your Job Search Needs a System, Not Just Hustle"

**Week 2 Deliverable:** All accounts created, content bank ready

---

### Week 3: Soft Launch

| Day | Task | Owner | Time |
|-----|------|-------|------|
| 15 | Post launch announcement on personal LinkedIn | Brett | 5 min |
| 15 | Share with 10-20 friends/colleagues who are job hunting | Brett | 15 min |
| 15 | Post in 3 Reddit communities (r/jobs, r/careerguidance, r/jobsearch) | Claude | — |
| 16-17 | Respond to all comments and feedback | Claude | — |
| 18-21 | Implement top 3 feature requests from feedback | Claude | — |

**Target Reddit Communities:**
- r/jobs (1.5M members)
- r/careerguidance (500K members)
- r/jobsearch (100K members)
- r/cscareerquestions (800K members) — if tech-focused
- r/recruitinghell (600K members) — relatable pain points

**Soft Launch Post Template:**
```
Title: I built a free job application tracker after losing track of 100+ applications

Body: [Authentic story about job hunting frustration]
[Screenshot of the app]
[Link]
[Ask for feedback, not sales]
```

**Week 3 Deliverable:** First 50-100 signups, initial feedback collected

---

### Week 4: Iterate & Stabilize

| Day | Task | Owner | Time |
|-----|------|-------|------|
| 22-25 | Fix bugs reported by early users | Claude | — |
| 22-25 | Add most-requested feature | Claude | — |
| 26-28 | Publish 2 blog posts | Claude | — |
| 26-28 | Begin daily social posting (1 post/day) | Claude | — |

**Week 4 Deliverable:** Stable product, content engine running

---

### Month 1 Checkpoint

**Review Meeting Agenda:**
- [ ] Total signups: Target 100
- [ ] Active users (used app 2+ times): Target 30
- [ ] Feedback themes: What do people love? What's missing?
- [ ] Traffic sources: What's working?
- [ ] Decision: Continue as planned or adjust?

---

## Month 2: Growth & Monetization Setup (Weeks 5-8)

### Week 5-6: Add Payment Infrastructure

| Task | Owner |
|------|-------|
| Create Stripe account | Brett (10 min) |
| Build pricing page | Claude |
| Implement free tier limits (15 active applications) | Claude |
| Add upgrade prompts in app | Claude |
| Create Stripe products ($8/mo Pro, $19/mo Premium) | Claude |
| Test payment flow end-to-end | Claude + Brett verify |

**Pricing Strategy:**
| Tier | Price | Limits | Features |
|------|-------|--------|----------|
| Free | $0 | 15 active jobs | Basic tracking |
| Pro | $8/month | Unlimited jobs | + Analytics, reminders, export |
| Premium | $19/month | Everything | + AI resume tips, salary data |
| Lifetime | $79 one-time | Everything forever | Early adopter special |

---

### Week 7-8: Ramp Up Distribution

| Task | Owner | Frequency |
|------|-------|-----------|
| Reddit posting (valuable content, not spam) | Claude | 3x/week |
| Twitter/X posting | Claude | 1x/day |
| LinkedIn posting | Claude | 3x/week |
| Blog publishing | Claude | 1x/week |
| Reply to all comments/mentions | Claude | Daily |
| Reach out to career coaches for partnerships | Claude drafts, Brett sends | 10 outreach/week |

**Partnership Outreach Template:**
```
Subject: Free tool for your clients

Hi [Name],

I built a free job tracking tool that might help your career coaching clients stay organized during their search.

[Link] — no affiliate pitch, just thought it might be useful.

If you find it helpful, I'd love any feedback.

[Brett]
```

---

### Month 2 Checkpoint

**Metrics to Review:**
- [ ] Total signups: Target 300
- [ ] Active users: Target 100
- [ ] Paying customers: Target 10-20
- [ ] Monthly revenue: Target $80-200
- [ ] Churn: How many stopped using?
- [ ] Conversion rate: Free → Paid

---

## Month 3: Decision Point (Weeks 9-12)

### Critical Evaluation

At the end of Month 3, we make a go/no-go decision.

**Continue if:**
- 500+ total signups
- 25+ paying customers
- Users actively requesting features
- Positive word-of-mouth happening
- You're enjoying it (or at least not hating it)

**Pivot if:**
- Signups stalled below 200
- Zero or minimal paid conversions
- Negative or apathetic feedback
- Traffic isn't growing

**Pivot Options:**
1. Reposition as B2B (sell to career coaches, bootcamps, universities)
2. Switch to Salary Negotiation tool (standalone, one-time purchase)
3. Switch to Rent vs. Buy calculator (different market entirely)
4. Abandon and try completely different idea

---

### Week 9-10: Double Down on What's Working

Based on Month 2 data:
- Which traffic source drove most signups? → 2x effort there
- Which feature do people love most? → Make it even better
- What's the #1 reason people upgrade? → Emphasize in marketing

---

### Week 11-12: Launch CareerOS Negotiate (if continuing)

| Task | Owner |
|------|-------|
| Build salary lookup feature | Claude |
| Build negotiation script generator | Claude |
| Build counter-offer calculator | Claude |
| Create landing page for Negotiate | Claude |
| Announce to existing users | Claude |
| Update pricing (bundle option) | Claude |

**New Pricing with Bundle:**
| Tier | Price | Access |
|------|-------|--------|
| Job Tracker Pro | $8/month | Tracker only |
| Negotiate Pro | $12/month | Negotiate only |
| Career Stack | $15/month | Both tools |
| Lifetime Stack | $149 one-time | Everything forever |

---

### Month 3 Checkpoint

**Decision Meeting:**
- [ ] Total signups: Target 500
- [ ] Paying customers: Target 25
- [ ] Monthly revenue: Target $200-400
- [ ] Growth trend: Up, flat, or down?
- [ ] **DECISION: Continue, pivot, or stop**

---

## Month 4-6: Scale (If Metrics Support Continuing)

### Month 4: Product Hunt Launch

| Task | Owner |
|------|-------|
| Prepare PH assets (images, video, tagline) | Claude |
| Line up hunter (or self-submit) | Claude researches, Brett decides |
| Coordinate launch day (Tuesday-Thursday best) | Claude |
| Respond to all PH comments | Claude |
| Email existing users to support | Claude |

**Product Hunt Prep Checklist:**
- [ ] High-quality screenshots (desktop + mobile)
- [ ] 1-minute demo video (optional but helps)
- [ ] Compelling tagline (< 60 chars)
- [ ] Detailed description with features
- [ ] Maker comment ready to post

**Expected PH Results:**
- Top 10 finish: 500-2,000 new signups
- Top 5 finish: 2,000-5,000 new signups
- #1 Product of Day: 5,000-10,000 new signups

---

### Month 5: Build CareerOS Navigator

| Task | Owner |
|------|-------|
| Career path visualization | Claude |
| Skill gap analyzer | Claude |
| Learning recommendations | Claude |
| Integration with Job Tracker | Claude |
| Bundle pricing update | Claude |

---

### Month 6: Optimize & Automate

| Task | Owner |
|------|-------|
| Set up email sequences (ConvertKit or Resend) | Claude |
| Automate onboarding emails | Claude |
| Automate upgrade reminder emails | Claude |
| Create affiliate program (if demand exists) | Claude |
| SEO audit and optimization | Claude |
| Document everything for future maintenance | Claude |

---

## Financial Projections

### Costs (6 Months)

| Item | Cost | When |
|------|------|------|
| Domain (careeros.app) | $12 | Month 1 |
| Vercel Pro (if needed) | $0-20/mo | Month 3+ |
| Email service | $0-29/mo | Month 4+ |
| Total (conservative) | ~$200 | — |
| Total (with upgrades) | ~$500 | — |

### Revenue (Conservative Estimate)

| Month | Users | Paying | MRR |
|-------|-------|--------|-----|
| 1 | 100 | 0 | $0 |
| 2 | 300 | 15 | $120 |
| 3 | 500 | 30 | $270 |
| 4 | 800 | 50 | $450 |
| 5 | 1,200 | 80 | $720 |
| 6 | 2,000 | 150 | $1,350 |

### Revenue (Optimistic Estimate)

| Month | Users | Paying | MRR |
|-------|-------|--------|-----|
| 1 | 200 | 5 | $40 |
| 2 | 600 | 40 | $360 |
| 3 | 1,200 | 80 | $720 |
| 4 | 2,500 | 180 | $1,600 |
| 5 | 4,000 | 300 | $2,700 |
| 6 | 6,000 | 500 | $4,500 |

---

## Risk Mitigation

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Nobody signs up | Medium | Soft launch to friends first, validate before scaling |
| Users don't convert to paid | High | Test pricing, add more value to paid tier |
| Competitor launches similar | Medium | Move fast, build community, differentiate on UX |
| Reddit/social bans us for spam | Low | Provide genuine value, don't over-promote |
| Claude loses context between sessions | Certain | Document everything, use memory, maintain this plan |
| Brett loses interest | Medium | Keep time commitment low, celebrate small wins |

---

## Weekly Rhythm (After Setup)

**Brett's Weekly Commitment: 15-30 minutes**

| Day | Brett's Task | Time |
|-----|--------------|------|
| Monday | Review weekend metrics Claude sends | 5 min |
| Wednesday | Approve any posts/content if needed | 5 min |
| Friday | Quick check-in conversation with Claude | 10-15 min |

**Claude's Ongoing Tasks:**
- Daily social media posting
- Respond to all comments/feedback
- Weekly blog post
- Monitor analytics
- Fix bugs as reported
- Build new features per roadmap

---

## Success Criteria Summary

| Milestone | Target | Deadline |
|-----------|--------|----------|
| Live website | ✓ | Week 1 |
| First 100 users | 100 signups | Month 1 |
| First paying customer | $8+ | Month 2 |
| Product-market fit signal | 500 users, 25 paying | Month 3 |
| Sustainable side income | $1,000+ MRR | Month 6 |

---

## Next Immediate Steps

1. **Install Node.js** — nodejs.org → Windows Installer
2. **Create GitHub account** — github.com/signup
3. **Create Vercel account** — vercel.com (use GitHub login)
4. **Tell Claude when ready** — We deploy within 24 hours

---

*This document will be updated as we learn and adapt.*
