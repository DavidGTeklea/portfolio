// Portfolio copy, keyed by landmark id — the file to edit when adding a job,
// project, or tweaking wording, decoupled from the 3D/interaction logic.
export const content = {
  intro: {
    title: 'David Teklea',
    subtitle: 'Backend Software Engineer & ML Researcher',
    body: "I'm a software engineer with backend and infrastructure experience from Capital One, Google, and PNC, plus machine learning research at the University of Pittsburgh. I'm currently pursuing an MS in Computer Science (ML specialization) at Georgia Tech. Walk around the islands to explore my experience, projects, and education, or head to Contact to get in touch.",
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/david-teklea' },
      { label: 'GitHub', url: 'https://github.com/DavidGTeklea' },
    ],
  },

  'capital-one': {
    title: 'Capital One',
    subtitle: 'Software Engineering Intern · Jun 2026 – Aug 2026 · Richmond, VA',
    bullets: [
      'Built a nightly Python/AWS Lambda reconciliation pipeline syncing 481 ITSM records into an internal PostgreSQL governance catalog, eliminating eight months of data staleness.',
      'Cut Lambda execution time 61% (300s → 116s) by fixing VPC DNS/proxy conflicts and moving connection pooling and Secrets Manager retrieval outside the processing loop.',
      'Extended Flask REST APIs and Flyway-managed PostgreSQL schemas with 89.4% unit test coverage to surface governance data in CSV/BI dashboards.',
      'Productionized the pipeline across dev/QA/prod with Jenkins, CloudFormation, and IAM, migrating Snowflake auth to OAuth 2.0 with zero downtime.',
    ],
  },

  'ml-research': {
    title: 'Machine Learning Researcher',
    subtitle: 'Dr. Xiang Lorraine Li Group, University of Pittsburgh · Jun 2025 – Dec 2025',
    bullets: [
      'Built a configuration-driven Python/OpenAI API pipeline that generated and rated 885 scenarios across 177 verbs for semantic-role experiments.',
      "Integrated IBM's Transition AMR Parser to convert scenarios into Penman graphs, improving parser performance 2%.",
      'Built a 100-scenario human-annotated evaluation harness measuring precision, recall, and macro-F1.',
      "Cut end-to-end runtime over 50% (saving ~$100) by parallelizing Slurm batch jobs on Pitt's HPC cluster.",
    ],
  },

  pnc: {
    title: 'PNC',
    subtitle: 'Software Engineering Intern · Jun 2024 – Aug 2024 · Pittsburgh, PA',
    bullets: [
      'Increased FastAPI service test coverage over 30% by refactoring Pydantic models and adding pytest regression tests.',
      'Built Python + Automation Anywhere bots to automate monthly AML case-assignment distribution and shared-drive cleanup.',
    ],
  },

  google: {
    title: 'Google',
    subtitle: 'STEP Intern · May 2023 – Aug 2023 · Cambridge, MA',
    bullets: [
      "Built Java/TypeScript URL, country, and language prefill flows for Google's content-removal product across 10+ policy forms.",
      'Implemented experiment feature flags with Mendel and added unit/compatibility tests, achieving 70% test coverage.',
      'Built a responsive Soy/SCSS accordion validated with SCUBA visual-regression tests across eight UI states.',
    ],
  },

  eigendb: {
    title: 'EigenDB',
    subtitle: 'C, C++, Go, API Gateway, S3',
    bullets: [
      'Built a C/C++ vector search engine with AVX2 SIMD distance kernels and HNSW approximate nearest-neighbor indexing across 100,000+ vectors.',
      'Implemented S3 snapshot persistence in a Go API (AWS SDK v2), restoring 500K+ vector collections in under two seconds and enforcing rate limits via API Gateway.',
    ],
  },

  'georgia-tech': {
    title: 'Georgia Institute of Technology',
    subtitle: 'M.S. Computer Science (ML Specialization) · GPA 4.0/4.0 · Aug 2025 – Dec 2026',
    body: 'Coursework: Graduate Algorithms, Deep Learning, Computer Networking, Operating Systems, Machine Learning.',
  },

  'pitt-bs': {
    title: 'University of Pittsburgh',
    subtitle: 'B.S. Computer Science · GPA 3.74/4.0 · Aug 2021 – May 2025',
  },

  contact: {
    title: "Let's Connect",
    subtitle: 'Get in touch',
    body: "I'm always happy to talk about backend systems, ML research, or new opportunities. Reach out below.",
    links: [
      { label: 'Email', url: 'mailto:davidgteklea@gmail.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/david-teklea' },
      { label: 'GitHub', url: 'https://github.com/DavidGTeklea' },
      { label: 'Download Resume (PDF)', url: '/resume-david-teklea.pdf' },
    ],
  },
};
