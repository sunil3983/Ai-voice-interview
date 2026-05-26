Prompt
Context and Role

 As a senior full - stack engineer specializing in AI-integrated SaaS platforms,you are responsible for designing and building AI - powered interview preparation platform. The platform enables users to attend real-time voice-based mock interviews powered by the Vapi SDK, receive structured AI-generated feedback, and track their interview history and performance over time. The application must help users meaningfully improve their communication and technical skills through analytical - driven practice. The architecture should be modular with clean separation between frontend , backend, AI processing and analytics layer.


  Objective
Develop a complete full - stack AI interview platform that helps to achieve the following goals:
Allows users to complete a full interview cycle that is from session creation to AI generated feedback within a single authenticated session.
Allows user securely register , log in, sign in and manage their profiles using firebase authentication with JWT- API access.
Generate role - specific interview questions using open AI and deliver real - time voice using Vapi SDK , it must capture voice responses in real time and convert speech to text using Vapi’s transcript pipeline and then evaluate answers using AI feedback.
It stores all interview recordings, transcripts , feedback reports and scores in mongoDB for analytics.
Build a responsive and professional dashboard that helps in visualizing performance and breakdown scores to give improvement suggestions also provide complete contact and support system with the confirmation of email and also notifies admin for the issue.
UI and Animation Requirements
Scroll-Based Storytelling
Use framer motion for all page transitions, card entrances and layout animations.
Use staggered card entrance animations on dashboard and feedback pages with standard delay time.
Sidebar should be animated by using standard initial and animate on mount and speaking indicator must use pulse animation based on speech_start and speech_end events.
All animations should be GPU friendly like they use transform and opacity only layout thrashing properties must not be used like width ,height or top.
Also make sure animations must not block scroll performance.
Required pages
Landing page
Must contain features overview with animated card reveals
It should also contain Hero section with animated introduction text.
Landing pages should also have call-to-action buttons like start_interview , view Demo.
It must have smooth navigation between different sections.
Authentication page
Sign up new user
Login for existing user
Forgot password
All forms must be validated client - side with Zod before submission
Dashboard
User profile section which includes stats of the user also.
Recent interview history cards with proper scores.
It should also list all the categories of interviews that user is eligible for.
Dashboard also have quick - start  button for new interview.

Interview creation page
Role selection, creation of interviews depends upon the role chosen by the user.
Experience level, experience level can be categorised into entry level, mid level, senior level in general so that user can easily choose its level of experience and according to that interview will be created.
Input tech stack,user can give the tech stack he/she is comfortable with.
Difficulty level, difficulty level can be easy , medium and hard based on the choice made by user.

Live interview page
It should have vapi voice assistant bot integrated and active
Real time text or transcript display in chat bubble style like AI on left and User on right.
Speaking indicators like mic icon should be visible when either party is speaking.
It should have start and end session controls with session timer.

Feedback page
It must display overall scores and breakdown scores like technical accuracy , communication skills and confidence estimation.
Strengths , weakness and suggestion should be rendered as categorised cards for each segment.
There should be option to retry the same interview configuration.

Layout Requirements
Header
It must have logo in left
Navigation links in center
User profile dropdown towards right side
Theme toggle button which helps to change dark/light mode.

Slidebar
At first slidebar must have dashboard link
All available interviews
User analysis in graphical format
Settings option
Logout option at bottom corner

Main content area
Layout must be  fully responsive
Components should be reusable
There should be consistent spacing and border radius with card - design.

Footer
Contact details with proper social links
Terms and service and privacy links

It must be fully responsive for mobile and desktop both
It must have proper navigation and sidebar
Optimized for performance

Contact System Requirements
Contact and support system must be complete and implemented properly
Features
Contact form must be interactive for the submission of user query.
On the user submission a confirmation mail should be sent to the user
On every new submission Admin should also be notified via email
It should also have FAQ section with expandable answers.
There should also have Admin support panel that maps failed submissions for manual follow - up 
Phone number and redirect link for chat must be provided for user support
Fields of contact form
Name is required
Email is also required and must be validated
Subject will also be required
Query message is also required with like minimum 10 characters.

Validation
Required field validation
Validation of email format using RFC - compliant regex
Schema must be validated both sides client side using Zod and server side using express - validator
Credential authentication
Required field validation on message fields.
Firebase secure token validation on every protected API route
Password hashing using bycrypt
Access control must be role based



Backend Requirements
Backend architecture must scalable

Architecture
Modular monotrepo backend and frontend directories with a root readme.md file
Resful API design with versioned routed  and all services should be reusable and independently scalable
Architecture should also have global error handler middleware to prevent system failure
Request login with Morgan to provide automated HTTP request logging Express applications.

Authentication
Firebase authentication must be applied client side
Firebase Admin SDK on the backend to verify token ID.
JWT session management are used for API access for requesting and getting response
Access control must role based like user , admin.

Backend is divided into four modules:
Interview  module:
Create interview API (POST API)endpoint to create a new interview session Frontend sends interview configuration data like role,experience level,tech stack and difficulty leval through the request body.
Complete interview API , this API will be triggered after the interview session ends,backend will update the interview document, stores transcript and record data.
Get user interview API(GET API) , this endpoint is used to fetch all interview history of a particular user where user id is passes as parameter, Dashboard uses this API to display the interview history , previous score , transcripts and analytics data.
The platform follows RESTful API structure.

Contact Module
POST/api/v1/contact , it validates input , stores submissions, sends dual emails via nodemailer which is based on both user configuration and admin notification.

AI module
AI question generation API, this API endpoint is responsible for generatingAI - based interview questions dynamically according to user interview configuration.The backend then interactswith OpenAI API using gpt -40-mini model to generate structured technical interview questions according to the selected domain.
AI feedback processing pipeline, it will be triggered internally after the interview completion process and is not exposed as a public API endpoint,the transcript is then processed through NLP - based evaluation pipelineusing OpenAI models.
Structured response handling, to ensure consistent and machine readable AI responses, the backend will use the OpenAI res[ponse-format configuration like response_format: {type:”json_object”}.

Analytical Module
GET/api/v1/analytics/user/:id, this API endpoint is responsible for retrieving analytical performance data for a specific user.The user id is passed as a route parameter, after which the backend performs data aggregation using MongoDB aggregation pipeline on the feedback and interview collections.
The analytical module calculates average interview scores, performance trends , communication performance metrics and total number of interviews attended.
Data Processing Requirements
Data collection
It need capture user voice using vapi sdk pipeline
It will receive transcripts through vapi message events on the frontend
After session ends it will send complete transcript to the backend
Then it will store interview metadata that is complete information like role, difficulty , techstack, experience level, duration of the session and status of session.
Store audio recording in URLs.

Data processing
Initially transcript will be received by backend
Then it will be formatted and and send to OpenAI with structured prompt system
Then received JSON response will be parsed and validated
Feedback documents will be saved to MongoDB with the reference to interview document
Anlytics documents to be updated with new scores
Insights returned to frontend for display

AI processing
When user clicks start interview frontend will be called and vapi gets started.
Vapi emits speech - start which shows animated speaking indicator
When speech ends it will hide indicator
Then vapi will send message event to get the transcripts
When user clicks end interview again frontend will be called to POST.
Backend formats transcripts as string and sends to openAi
OpenAi returns structured JSON feedback to backend which will be saved to MongoDB.
Frontend will redirect to feedback page using returned feedbackId.


Output Requirements
The final delivered output must include:
Fully functional live interview page with working Vapi SDK voice integration and real-time transcript display
AI-generated questions will be delivered through Vapi assistant on session start
Structured feedback dashboard with score visualization after each interview
Authenticated user flow from signup to interview creation then  live session  then feedback then dashboard section 
Contact form that sends dual confirmation emails to both user and notify admin
Confirmation message shown to user after successful form submission
Graceful error states for: voice processing failure, AI evaluation failure, network errors, auth token expiry 

Error Handling and Documentation
Frontend
Form validation errors will be shown inline
In case of network failure : show retry prompt with cached state where possible
Redirect to login with session - expired message in case Auth token expiry
Show voice connection unavailable with option 

Documentation
README documentation
API documentation
Environment variables setup guide 
Deployment guide
Contribution guidelines
on the basis of this recommended architecture please give me complete response based on prompt with code and proper file structure


Performance and Scalability
Frontend
Lazy-load all page components using React.lazy() and Suspense
Dynamic imports for heavy components (charts, interview page)
Memoize static components with React.memo
Debounce all search and filter inputs (300ms)
Animations must not degrade on low-end devices — provide prefers-reduced-motion fallback that disables Framer Motion animations
Backend
MongoDB indexes on all query-critical fields
Redis caching for analytics aggregation results (TTL: 5 minutes)
BullMQ job queue for AI feedback processing (non-blocking)
Rate limiting: 10 requests/minute on auth endpoints, 5 requests/minute on contact endpoint
Compression middleware enabled
Designed for horizontal scaling (stateless API, external session store)

Technology Stack
Frontend
React 18 (Vite) or Next.js 14
TypeScript
Tailwind CSS
Framer Motion
Zustand (state management)
Axios
React Hook Form + Zod
Recharts
Lucide React (icons)
Backend
Node.js + Express.js
TypeScript
MongoDB Atlas + Mongoose
Firebase Admin SDK
Nodemailer
Redis + BullMQ
Morgan + dotenv
express-validator
bcryptjs + jsonwebtoken
 
