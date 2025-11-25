# RM Counter - Todo List

## CRITICAL (Security - Do First)
- [ ] Check if .env.local is in git history: `git log --all --full-history -- .env.local`
- [ ] If found, rotate Turso database credentials immediately
- [ ] Move to HTTP-only cookies instead of localStorage for auth
- [ ] Add CSRF protection to forms
- [ ] Add input validation on all user inputs

## HIGH PRIORITY (Core Functionality Broken)
- [ ] Replace hardcoded stats in `getAllStats()` and `getTodayStats()` with real DB queries
- [ ] Make "Submit Todays Stats" button actually save to database
- [ ] Fix WebSocket server to broadcast messages to all clients (not just log them)
- [ ] Add `ws.on('close')` handler to remove disconnected clients from array
- [ ] Implement actual chat message storage and display

## MEDIUM PRIORITY (Bugs)
- [ ] Fix variable naming: `setleads` → `setLeads`, `call` → `calls`
- [ ] Fix backwards conversion rate: `getPercent(allStats.leads, allStats.calls)` should be reversed
- [ ] Add division by zero check in `getPercent()` function
- [ ] Fix database client caching in `lib/db.js` (creates new connection every time)
- [ ] Fix undefined `error` variable in `lib/db.js:11` and `actions.js:39`
- [ ] Typo in websocket server: "recived" → "received"
- [ ] Separate login and registration into different forms/components

## CODE QUALITY
- [ ] Extract magic strings to constants (office names, counter types, etc)
- [ ] Add proper error handling (try-catch blocks where missing)
- [ ] Replace console.log/console.error with proper logging
- [ ] Consolidate multiple useEffect hooks where possible
- [ ] Add WebSocket URL to environment variable (not hardcoded localhost:5000)
- [ ] Add proper TypeScript types (if migrating to TS)

## FEATURES TO COMPLETE
- [ ] Make decrement buttons functional (persist to backend)
- [ ] Add user isolation (each user sees only their own stats)
- [ ] Persist counter state across page refreshes
- [ ] Implement office-specific chat rooms
- [ ] Add "All Chat" functionality
- [ ] Add timestamps to chat messages
- [ ] Store chat messages in database

## ARCHITECTURE IMPROVEMENTS (Later)
- [ ] Move WebSocket server into Next.js app instead of separate server
- [ ] Create `/app/api` routes for backend operations
- [ ] Add unit tests
- [ ] Set up database migrations/schema versioning
- [ ] Add React error boundaries
- [ ] Implement rate limiting on login attempts
- [ ] Add proper session management

## NOTES
- Keep momentum going! Don't need to fix everything at once
- Focus on learning and getting core features working first
- Clean up and refactor at the end
