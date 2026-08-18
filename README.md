# Teachable Circle Sync v2

Course creators who host curriculum on Teachable and community on Circle struggle with student churn because the platforms don't talk to each other. Build a STATIC browser tool (no live API calls, no OAuth — not possible in a static site) that: (1) accepts a pasted/uploaded CSV export from Teachable (columns: student_email, last_login_date) and a pasted/uploaded CSV export from Circle's member roster (columns: email, community_space), (2) lets the user set an inactivity threshold in days (e.g. 14), (3) computes which students have stalled (last_login_date older than threshold) AND are not already in a 'needs-encouragement' space, (4) outputs a ready-to-reimport CSV (columns: email, new_space) assigning stalled students to a 'needs-encouragement' Circle space. This replaces the weekly manual cross-referencing creators currently do by hand. Target customer: online course creators.

## Running

Open index.html for the landing page; app.html is the working tool.
