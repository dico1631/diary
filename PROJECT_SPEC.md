🧠 Life Management Diary App (Mandalart System)
1. Overview

This project is a personal life management web app that combines:

Mandalart (goal planning)
Daily journaling
Habit tracking
Emotional tracking

The goal is to create a system that connects:
Goal → Execution → Feedback → Improvement

Supports:

Mobile
Tablet
Desktop
2. Tech Stack

Frontend:

Next.js (App Router)
React
Tailwind CSS

Backend:

Supabase (Auth + Database)

Deployment:

Vercel
3. Core Features
3.1 Yearly Planning
1) Year Goal Brainstorm
Free input list
Categorization (career, health, finance, etc.)
Priority selection
2) Year Mandalart
3x3 grid UI
Center: "Year Identity"
8 surrounding categories
3.2 Small Mandalart
Create multiple mandalarts
Each has:
title
3x3 structure
Used for:
career
fitness
projects
3.3 Monthly
Monthly Goals
3~5 goals
Monthly Mood Journal
overall mood
good moments
bad moments
reflection
next month intention
3.4 Weekly
Weekly Goals
derived from monthly
Habit Tracker
daily check
repeatable habits
3.5 Daily
Daily Feedback
what I learned
what I felt
what I will apply
4. Data Model (Simplified)

User

id
email

YearGoals

id
user_id
content

Mandalart

id
user_id
title
type (year / small)

MandalartItems

id
mandalart_id
position (0~8)
content

Monthly

id
user_id
month
goals
mood

Weekly

id
user_id
week
goals

Daily

id
user_id
date
feedback

Habit

id
user_id
name

HabitLog

id
habit_id
date
checked
5. UI Principles
Mobile-first
Simple input (fast typing)
Card-based layout
Minimal design
6. MVP Scope (First Version)
Auth (login/signup)
Daily feedback
Weekly goals
Habit tracker
7. Future Features
Mandalart drag & drop
Statistics dashboard
Notifications
AI reflection assistant
8. Development Rules
Build only what you will use
Keep inputs simple
Avoid over-engineering
Iterate weekly
9. Core Philosophy

This is not a diary.

This is a life operating system.