import type { Announcement } from '@/types'

export const JOURNAL_INFO = {
  name: 'Journal of Engineering Research Application',
  shortName: 'JERA',
  issn: '2583-3987',
  issnLabel: 'E-ISSN',
  website: 'https://www.jera.co.in',
  ojsUrl: 'https://www.jera.co.in/index.php/jera',
  ojsSubmit: 'https://www.jera.co.in/index.php/jera/submission/wizard',
  publisher: 'JERA Publications',
  foundingInstitutions: 'Delhi Technological University (DTU) & MMMUT Gorakhpur, India',
  editorInChief: 'Prof. S. Anbukumar (DTU) — Hydraulics & Water Resources',
  executiveEditor: 'Dr. Ritu Raj (DTU) — Structural & Wind Engineering',
  frequency: 'Quarterly',
  launchYear: 2026,
  license: 'CC BY 4.0',
  doi_prefix: '10.56789/jera',
  email: 'editor@jera-journal.org',
  ethicsEmail: 'ethics@jera-journal.org',
}

export const JOURNAL_METRICS = [
  { label: 'Articles Published', value: '4', description: 'Inaugural issue (Vol.1 No.1)' },
  { label: 'E-ISSN', value: '2583-3987', description: 'Registered online ISSN' },
  { label: 'Average Review Time', value: '28 days', description: 'Target first decision' },
  { label: 'Publication Charge', value: 'Free', description: '2025–2026 full waiver' },
]

export const SAMPLE_ARTICLES = [
  {
    id: 'art-001',
    title: 'Structural Performance of High-Strength Concrete Beams Reinforced with Hybrid GFRP-Steel Bars Under Cyclic Loading',
    authors: [
      { id: 'a1', name: 'Dr. Arun Kumar Sharma', affiliation: 'IIT Delhi', country: 'India' },
      { id: 'a2', name: 'Prof. Muhammad Al-Rashid', affiliation: 'KFUPM, Saudi Arabia', country: 'Saudi Arabia' },
    ],
    abstract: 'This study investigates structural performance of high-strength concrete beams reinforced with hybrid GFRP and steel bars under cyclic loading. Results show 40% GFRP replacement achieves comparable ductility with superior corrosion resistance. Validated FE model shows R² > 0.97.',
    keywords: ['high-strength concrete', 'GFRP reinforcement', 'cyclic loading', 'structural performance', 'ductility'],
    doi: '10.56789/jera.2026.v1i1.001',
    volume: 1, issue: 1, year: 2026, pages: '1–18',
    publicationDate: '2026-03-15',
    discipline: 'Structural Engineering',
    articleType: 'research-article' as const,
    status: 'published' as const,
    downloads: 342, citations: 0, views: 1289,
  },
  {
    id: 'art-002',
    title: 'Machine Learning Approaches for Real-Time Traffic Flow Prediction in Urban Arterials: A Comparative Study',
    authors: [
      { id: 'a4', name: 'Dr. Priya Nair', affiliation: 'NIT Trichy', country: 'India' },
      { id: 'a5', name: 'Prof. James O. Adeyemi', affiliation: 'University of Lagos', country: 'Nigeria' },
    ],
    abstract: 'Comparative evaluation of six ML algorithms for urban traffic prediction. ConvLSTM achieves RMSE of 18.3 vehicles/hour, outperforming ARIMA by 34%. Data from 127 loop detectors over 36 months analysed.',
    keywords: ['traffic flow prediction', 'machine learning', 'LSTM', 'ITS', 'urban arterials'],
    doi: '10.56789/jera.2026.v1i1.002',
    volume: 1, issue: 1, year: 2026, pages: '19–35',
    publicationDate: '2026-03-15',
    discipline: 'Transportation Engineering',
    articleType: 'research-article' as const,
    status: 'published' as const,
    downloads: 278, citations: 0, views: 967,
  },
  {
    id: 'art-003',
    title: 'Geotechnical Characterization and Stabilization of Expansive Black Cotton Soil Using Fly Ash–Lime Blends',
    authors: [
      { id: 'a6', name: 'Prof. Rajendra Bhattacharya', affiliation: 'Jadavpur University', country: 'India' },
      { id: 'a7', name: 'Dr. Sarah Mitchell', affiliation: 'University of Melbourne', country: 'Australia' },
    ],
    abstract: 'Fly ash–lime blends evaluated for expansive soil stabilisation. Optimal 15% FA + 4% lime achieved 68% reduction in swelling pressure and 285% improvement in CBR. SEM-EDS confirmed pozzolanic products.',
    keywords: ['expansive soil', 'fly ash', 'lime stabilization', 'CBR', 'microstructure'],
    doi: '10.56789/jera.2026.v1i1.003',
    volume: 1, issue: 1, year: 2026, pages: '36–52',
    publicationDate: '2026-03-20',
    discipline: 'Geotechnical Engineering',
    articleType: 'research-article' as const,
    status: 'published' as const,
    downloads: 195, citations: 0, views: 743,
  },
  {
    id: 'art-004',
    title: 'Life Cycle Assessment of Green Roofing Systems for Urban Heat Island Mitigation in Tropical Megacities',
    authors: [
      { id: 'a9', name: 'Dr. Tanvir Ahmed', affiliation: 'BUET, Bangladesh', country: 'Bangladesh' },
      { id: 'a10', name: 'Prof. Maria Santos', affiliation: 'University of São Paulo', country: 'Brazil' },
    ],
    abstract: 'Cradle-to-grave LCA of four green roof typologies across Dhaka, São Paulo, and Jakarta. Blue-green hybrid systems achieved 2.8–4.1°C temperature reduction and 42–67% stormwater retention.',
    keywords: ['green roofs', 'LCA', 'urban heat island', 'tropical cities', 'stormwater'],
    doi: '10.56789/jera.2026.v1i1.004',
    volume: 1, issue: 1, year: 2026, pages: '53–69',
    publicationDate: '2026-03-25',
    discipline: 'Environmental Engineering',
    articleType: 'research-article' as const,
    status: 'published' as const,
    downloads: 221, citations: 0, views: 884,
  },
]

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-001',
    title: 'JERA Launches Inaugural Volume — Submissions Open at www.jera.co.in',
    content: 'We are delighted to announce the launch of JERA (Journal of Engineering Research Application), E-ISSN 2583-3987. Founded by academics from DTU and MMMUT Gorakhpur, JERA is a fully open-access, double-blind peer-reviewed international journal. Submit your manuscripts at www.jera.co.in. All APCs are fully waived for 2025–2026.',
    date: '2026-01-15',
    type: 'call-for-papers',
    important: true,
  },
  {
    id: 'ann-002',
    title: 'Submission Deadline — Volume 1, Issue 2: June 30, 2026',
    content: 'Authors are invited to submit original manuscripts for Volume 1, Issue 2 (July 2026) via our OJS portal at www.jera.co.in. Deadline: June 30, 2026. Topics include civil engineering, structural and wind engineering, geotechnical engineering, transportation, environmental engineering, and allied disciplines.',
    date: '2026-03-01',
    type: 'deadline',
    important: true,
  },
  {
    id: 'ann-003',
    title: 'Volume 1, Issue 1 (March 2026) — Now Published',
    content: 'JERA has published Volume 1, Issue 1 (March 2026) featuring peer-reviewed research from authors across India, Australia, Saudi Arabia, Bangladesh, Brazil, and Nigeria. All four articles are freely accessible at www.jera.co.in.',
    date: '2026-03-30',
    type: 'update',
    important: false,
  },
]

export const DISCIPLINES = [
  'Civil Engineering', 'Structural Engineering', 'Wind Engineering',
  'Geotechnical Engineering', 'Transportation Engineering',
  'Environmental Engineering', 'Water Resources Engineering',
  'Construction Management', 'Earthquake Engineering', 'Smart Infrastructure',
]

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Journal', href: '#', children: [
    { label: 'About JERA', href: '/about' },
    { label: 'Aims & Scope', href: '/aims-scope' },
    { label: 'Editorial Board', href: '/editorial-board' },
    { label: 'Editorial Policies', href: '/editorial-policies' },
    { label: 'Ethics & Publication Policy', href: '/ethics-policy' },
    { label: 'Indexing & Abstracting', href: '/indexing' },
  ]},
  { label: 'Issues', href: '#', children: [
    { label: 'Current Issue', href: '/current-issue' },
    { label: 'Archives', href: '/archives' },
  ]},
  { label: 'For Authors', href: '#', children: [
    { label: 'Call for Papers', href: '/call-for-papers' },
    { label: 'Author Guidelines', href: '/author-guidelines' },
    { label: 'Submit via OJS', href: '/submit-manuscript' },
    { label: 'Peer Review Process', href: '/peer-review' },
    { label: 'Publication Charges', href: '/publication-charges' },
    { label: 'Downloads', href: '/downloads' },
  ]},
  { label: 'Announcements', href: '/announcements' },
  { label: 'Contact', href: '/contact' },
]
