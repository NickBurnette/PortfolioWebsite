/* PROJECT DATA
   Add a new project by adding a key here. Professional case studies need
   { title, stack, problem, role, outcome, metrics[] }.
   Personal/learning projects need type: "personal" plus
   { title, stack, repo, demo, problem, role, outcome, decisions[], details[], next }.
   See render.js for how each shape is rendered. */
export const projects = {
  ncache: {
    title: "Caching Layer Replacement",
    stack: ["C#", "SQL", "PowerShell"],
    problem: "When Microsoft discontinued App Fabric with no replacement, I was tasked with quickly replacing the caching layer for a high-traffic billing platform handling hundreds of database queries per second before the deprecation deadline.",
    role: "I designed and implemented a full NCache integration — identifying what data needed to be cached and architecting cross-server cache calls that reduced licensing costs by consolidating the number of nodes required under NCache's pricing model. I also built a health monitor to ensure cache accuracy at all times, along with self-healing logic that automatically corrects missing or stale data without manual intervention.",
    outcome: "The system remains stable even if the cache goes down entirely, recovering automatically without any manual intervention. The cross-server architecture also reduced NCache licensing costs compared to a node-per-server approach.",
    metrics: [
      { value: "100s/sec", label: "Database queries served from cache" },
      { value: "Zero", label: "Manual interventions on failure" },
      { value: "Reduced", label: "NCache licensing cost" }
    ]
  },
  installer: {
    title: "Automated Build & Installer Pipeline",
    stack: ["C#", "Cake", "Jenkins", "PowerShell"],
    problem: "Deployments across a multi-component billing platform — a tenanted application, SOAP and REST APIs, an operational database, and a reporting database — were entirely manual. Engineers had to build the solution by hand, copy folders onto the server, and update configurations individually, a process that took 2–4 hours per server and introduced errors on nearly every patch.",
    role: "I designed and built a complete build and installer pipeline from scratch. Using Cake, I compiled all four components and extracted only the files needed for shipping. A version-sync system compared the application and database versions on every install, clearly flagging when a database update was needed to stay in sync. A small .NET application generated the MSI and its configuration, while a Windows Forms installer handled each component independently for multi-server configurations — managing registry entries, log paths, challenge passwords, and API URLs.",
    outcome: "The entire process was automated in Jenkins, producing just 3 files capable of deploying the entire solution for any supported configuration. Deployment time dropped from 2–4 hours to 5 minutes per server, and deployment-related issues went from nearly every patch to roughly one per year.",
    metrics: [
      { value: "5 min", label: "Deployment time (was 2–4 hrs)" },
      { value: "3 files", label: "Full solution deployable" },
      { value: "~1/yr", label: "Deployment issues (was every patch)" }
    ]
  },
  automation: {
    title: "Data Correction Automation",
    stack: ["SQL", "C#", "Dapper"],
    problem: "Manual data correction requests were consuming the equivalent of 2.5 full-time employees, with 5–10 requests coming in daily requiring developer involvement to investigate and hand-edit records — introducing risk of human error on every change.",
    role: "I reviewed the most common request types, fixing root causes where possible and designing targeted automation scripts for the remainder. Requests that couldn't be prevented were given automated scripts that support staff could run in seconds — identify the record, run the script, resolve the ticket. For appropriate cases, I extended this further by surfacing fixes directly inside the application behind an access right, allowing power users to resolve their own data entry mistakes without involving support at all.",
    outcome: "Requests dropped from 5–10 daily handled by 2.5 employees to 1–2 daily manageable by a single support person, with 88% of remaining requests fully automated. Developer time shifted from reactive data fixes back to feature development.",
    metrics: [
      { value: "88%", label: "Remaining requests automated" },
      { value: "2.5→0.5", label: "FTEs on corrections" },
      { value: "5→1", label: "Daily requests" }
    ]
  },
  powerbi: {
    title: "Interactive Reporting Suite",
    stack: ["PowerBI", "DAX", "SQL", "C#"],
    problem: "Customers were struggling to get meaningful insights from static SSRS reports that weren't designed around how they actually worked.",
    role: "Rather than simply modernizing the visuals, I attended user conferences to observe real workflows and ran discovery sessions where users brainstormed what would actually help them — then consolidated that feedback into a prioritized design. The result was 13 new interactive PowerBI dashboards with live filtering, drill-down capability, and visualizations built around tracking work completion against the month, monitoring collection percentages, and giving managers visibility into individual employee output. The reports were embedded inside the application through a custom API integration with Microsoft's PowerBI that extracted each user's session to enforce the tenanted security model automatically.",
    outcome: "Report-related support questions dropped from 5 a month to 1, but the more meaningful outcome was giving users capabilities they never had before — including work progress tracking and manager-level performance visibility.",
    metrics: [
      { value: "13", label: "New interactive reports" },
      { value: "5→1", label: "Monthly support questions" },
      { value: "New", label: "Manager visibility features" }
    ]
  },
  jobpipeline: {
    type: "personal",
    title: "Job Pipeline",
    stack: ["React", "TypeScript", "dnd-kit"],
    repo: "https://github.com/NickBurnette/JobPipeline",
    demo: "https://jobpipeline.onrender.com/",
    problem: "Job searching generates a lot of loosely-tracked information — applications at different stages, notes, follow-ups — that's easy to lose track of. I wanted a lightweight, visual tool to track applications through their lifecycle (Applied → Interview → Offer) without the overhead of a generic project management tool, while using the build as a structured way to learn React and TypeScript from the ground up — closing a resume gap on more modern UI development.",
    role: "I designed and built the application solo, end to end: architecture, UI/UX, drag-and-drop interactions, data persistence, and deployment. This was also my first React project, so a secondary goal was establishing habits — component structure, type safety, separation of concerns — that would carry into future projects rather than just shipping something that worked.",
    outcome: "Finished planning and deployed MVP: a Kanban board with draggable job cards across pipeline stages, persistent local storage, and a simple but scalable codebase, live at jobpipeline.onrender.com. Beyond the working app, the project produced a reusable set of patterns — storage abstraction, runtime validation, colocated components — that I can build on for future projects.",
    decisions: [
      {
        title: "TypeScript for compile-time safety while learning.",
        text: "I chose TypeScript over plain JavaScript specifically because I was new to React — the compiler catches structural mistakes immediately, and editor autocomplete made unfamiliar APIs (like @dnd-kit's types) much easier to explore safely. That turned a frustrating trial-and-error learning process into faster, more confident hands-on experience."
      },
      {
        title: "Storage abstraction to decouple persistence from components.",
        text: "Rather than calling localStorage directly inside components, I built a small loadJobs / saveJobs interface (src/storage/jobStorage.ts) that the rest of the app talks to. The UI layer never needs to know how data is persisted — a decision that pays off directly when I eventually swap in a real backend, since only the storage module changes, not every component that reads or writes job data."
      },
      {
        title: "Runtime validation alongside static types.",
        text: "TypeScript only checks types at compile time — it can't guarantee that data coming back from localStorage (or a future import feature) actually matches the expected shape. I added runtime type guards (e.g., isValidJobArray) to validate data as it's loaded, with optional fields designed in from the start so the schema can evolve later without breaking previously saved data."
      }
    ],
    details: [
      "Drag-and-drop implemented with @dnd-kit/core, tuned with an 8px activation constraint so cards remain both draggable and clickable.",
      "Iterated the UI based on feel: removed a manual stage-dropdown on cards once drag-and-drop made it redundant, and favored inline confirmation patterns (e.g., an animated inline delete confirm) over native browser dialogs.",
      "Solved a couple of non-obvious CSS/DnD issues along the way — empty Kanban columns needed flex: 1 on the column body to register as valid drop targets, and the background shorthand property was quietly wiping out a background-image until scoped to background-color."
    ],
    next: "Two features are scoped for a v2: a keyword-matching \"match percentage\" score comparing user skills to job descriptions (with a possible AI-powered paid tier later), and job auto-discovery via JobSpy, an open-source scraper that aggregates listings from LinkedIn, Indeed, and Glassdoor."
  }
};
