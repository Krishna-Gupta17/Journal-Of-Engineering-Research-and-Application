import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Mail, ExternalLink, BookOpen } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Editorial Board | JERA — E-ISSN 2583-3987',
  description: 'Editorial board of JERA — Journal of Engineering Research Application (E-ISSN 2583-3987). Experts from DTU, MMMUT, NIT Delhi, VNIT, GLA, WRI USA, Beijing Forestry University, and University of Peradeniya.',
}

const editorInChief = {
  name: 'Prof. S. Anbukumar',
  designation: 'Professor',
  role: 'Editor-in-Chief',
  dept: 'Department of Civil Engineering',
  institution: 'Delhi Technological University (DTU)',
  location: 'Delhi, India',
  email: 'sanbukumar@dce.ac.in',
  specialization: ['Hydraulics and Water Resources Engineering', 'Fluid Mechanics', 'Open-Channel Flow', 'Hydraulic Structures'],
  bio: 'Prof. S. Anbukumar is a Professor in the Department of Civil Engineering at Delhi Technological University (formerly DCE), where he has served since 1999 — as Lecturer (1999–2009), Assistant Professor (2009–2012), Associate Professor (2012–2018), and Professor (2018–present). His research expertise spans hydraulics, fluid mechanics, and water resources engineering. He has made significant contributions to open-channel flow research and has extensive experience in graduate and post-graduate education.',
}

const executiveEditor = {
  name: 'Dr. Ritu Raj',
  designation: 'Assistant Professor',
  role: 'Executive Editor',
  dept: 'Department of Civil Engineering',
  institution: 'Delhi Technological University (DTU)',
  location: 'Delhi, India',
  email: 'rituraj@dtu.ac.in',
  specialization: ['Structural Engineering', 'Wind Engineering', 'Computational Fluid Dynamics (CFD)', 'Boundary Layer Wind Tunnels', 'Bluff Body Aerodynamics', 'Tall Buildings', 'Fibre Reinforced Concrete', 'High-Strength Concrete'],
  bio: 'Dr. Ritu Raj graduated from NIT Raipur (B.Tech.), earned his M.Tech. from NIT Warangal, and was awarded his Ph.D. in Structural Engineering from IIT Roorkee. He is proficient in CFD tools (ANSYS CFX, FLUENT), STAAD-PRO, ETABS, SAP-2000, and AutoCAD. His research focuses on wind pressure distribution on high-rise and low-rise structures, building aerodynamics, and fibre reinforced concrete. He brings over 7.5 years of teaching and research experience.',
}

const editors = [
  {
    name: 'Dr. Abhishek Prakash Paswan',
    designation: 'Assistant Professor',
    role: 'Editor',
    dept: 'Department of Civil Engineering',
    institution: 'Madan Mohan Malaviya University of Technology (MMMUT)',
    location: 'Gorakhpur, Uttar Pradesh, India',
    email: 'appce@mmmut.ac.in',
    specialization: ['Geotechnical Engineering', 'Landslide Monitoring & Mitigation', 'Rock Engineering & Tunnelling', 'Structural Health Monitoring', 'Physical & Numerical Modelling in Geomechanics', 'Disaster Risk Reduction'],
    bio: 'Dr. Paswan earned his Ph.D. from Delhi Technological University (2023). His research centres on rainfall-induced landslides, advanced monitoring systems, and geotechnical disaster mitigation. He holds 3 patents on landslide monitoring devices, tilt sensor calibration, and rainfall simulation systems.',
    orcid: '0000-0002-5063-4533',
    scopus: '58037343700',
    scholar: 'B2KK_XQAAAAJ',
  },
  {
    name: 'Dr. Rahul Kumar Meena',
    designation: 'Assistant Professor (Grade-II)',
    role: 'Editor',
    dept: 'Department of Civil Engineering',
    institution: 'National Institute of Technology (NIT) Delhi',
    location: 'Delhi, India',
    email: 'rahulmeena@nitdelhi.ac.in',
    specialization: ['Structural Engineering', 'Wind Engineering', 'Computational Fluid Dynamics', 'Computational Mechanics', 'Concrete Structures', 'Building Aerodynamics'],
    bio: 'Dr. Meena is an Assistant Professor (Grade-II) at NIT Delhi (2024–present), previously Temporary Faculty at Punjab Engineering College (PEC), Chandigarh. His research covers wind engineering, structural dynamics, and building aerodynamics with strong CFD expertise.',
    orcid: '0000-0001-6956-0397',
    scopus: '57565942300',
    scholar: 'MPQPzrMAAAAJ',
  },
]

const associateEditors = [
  { name: 'Dr. Suresh Kumar Nagar', designation: 'Assistant Professor', institution: 'Rajasthan Technological University', location: 'Kota, Rajasthan, India', email: 'snagar@rtu.ac.in', specialization: 'Civil Engineering' },
  { name: 'Dr. Amlan Kumar Bairagi', designation: 'Faculty', institution: 'Meghnad Saha Institute of Technology', location: 'Kolkata, West Bengal, India', email: 'amlan.bairagi.rs2016@civil.iiests.ac.in', specialization: 'Civil Engineering' },
  { name: 'Dr. Jingxue Wang', designation: 'Assistant Professor', institution: 'Beijing Forestry University', location: 'Haidian, Beijing, China', email: 'wangjingxue@bjtu.edu.cn', specialization: 'Wind Engineering, Atmospheric Environment' },
  { name: 'Dr. Smita Tung', designation: 'Assistant Professor', institution: 'GLA University (IET)', location: 'Mathura, Uttar Pradesh, India', email: 'smita.tung@gla.ac.in', specialization: 'Civil Engineering' },
  { name: 'Mr. Prasenjit Sanyal', designation: 'Assistant Professor', institution: 'Meghnad Saha Institute of Technology', location: 'Kolkata, West Bengal, India', email: 'prasenjit.sanyal@msit.edu.in', specialization: 'Civil Engineering' },
  { name: 'Ms. Trupti Nikose', designation: 'Adjunct Assistant Professor', institution: 'VNIT Nagpur', location: 'Nagpur, Maharashtra, India', email: 'truptinikose@gmail.com', specialization: 'Civil Engineering' },
  { name: 'Mr. Shailendra Kumar Yadav', designation: 'Post-Doctoral Fellow', institution: 'World Resources Institute (WRI)', location: 'Washington D.C., USA', email: 'Shailendra.yadav.5@wriconsultant.org', specialization: 'Environmental Engineering, Sustainability' },
  { name: 'Mr. Imesh Udara Ekanayake', designation: 'Research Assistant', institution: 'University of Peradeniya', location: 'Peradeniya, Sri Lanka', email: 'imeshuek@eng.pdn.ac.lk', specialization: 'Machine Learning, Neural Networks, Civil Engineering AI' },
  { name: 'Mr. Ning Su', designation: 'Researcher', institution: 'Tianjin Research Institute for Water Transport Engineering, M.O.T.', location: 'Binhai New District, Tianjin, China', email: 'souvenire@126.com', specialization: 'Wind Engineering, Atmospheric Environment' },
  { name: 'Mr. Sushant Kumar', designation: 'Assistant Professor', institution: 'SVPUAT', location: 'Greater Noida, Delhi, India', email: 'sushantkumar@svpuat.edu.in', specialization: 'Civil Engineering, Agricultural Engineering' },
  { name: 'Mr. Indrajeet Singh', designation: 'Ph.D. Scholar', institution: 'Gautam Buddha University', location: 'Greater Noida, Delhi, India', email: 'indrajeet.singh@gbu.ac.in', specialization: 'Civil Engineering' },
]

function Flag({ loc }: { loc: string }) {
  if (loc.includes('China')) return <>🇨🇳</>
  if (loc.includes('USA')) return <>🇺🇸</>
  if (loc.includes('Sri Lanka')) return <>🇱🇰</>
  return <>🇮🇳</>
}
function Initials({ name }: { name: string }) {
  const clean = name.replace(/^(Prof\.|Dr\.|Mr\.|Ms\.)\s+/, '')
  return <>{clean.split(' ').slice(0, 2).map(n => n[0]).join('')}</>
}

export default function EditorialBoardPage() {
  return (
    <PageWrapper
      title="Editorial Board"
      subtitle="Distinguished international scholars guiding JERA's scientific excellence — E-ISSN 2583-3987"
      breadcrumbs={[{ label: 'Editorial Board' }]}
    >
      <div className="max-w-5xl space-y-12">

        {/* Journal identity bar */}
        <div className="card p-4 flex items-center gap-4 bg-gradient-to-r from-navy-50 to-blue-50 dark:from-navy-800/30 dark:to-navy-900/20 border-navy-200 dark:border-navy-700">
          <Image src="/jera-logo.png" alt="JERA Logo" width={56} height={56} className="object-contain flex-shrink-0" />
          <div>
            <p className="font-serif font-bold text-navy-700 dark:text-white text-base">Journal of Engineering Research Application</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">E-ISSN: 2583-3987 &nbsp;·&nbsp; <a href="https://www.jera.co.in" target="_blank" rel="noopener noreferrer" className="text-ocean-500 hover:underline">www.jera.co.in</a> &nbsp;·&nbsp; Founded by DTU & MMMUT Gorakhpur</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          JERA's editorial board comprises researchers and academics from premier institutions across India, China, the United States, and Sri Lanka, selected for their domain expertise, scholarly contributions, and commitment to rigorous peer review.
        </p>

        {/* Editor-in-Chief */}
        <section>
          <div className="flex items-center gap-4 mb-5">
            <div><p className="section-label mb-0">Journal Leadership</p><h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white">Editor-in-Chief</h2></div>
            <div className="flex-1 h-px bg-gradient-to-r from-navy-200 to-transparent dark:from-navy-700" />
          </div>
          <div className="card p-6 border-l-4 border-l-navy-700 dark:border-l-ocean-500 max-w-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-navy-700 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg font-serif">SA</span>
              </div>
              <div>
                <span className="text-xs font-bold px-2 py-0.5 bg-navy-700 text-white rounded-full">Editor-in-Chief</span>
                <h3 className="font-serif font-bold text-base text-gray-900 dark:text-white mt-2">{editorInChief.name}</h3>
                <p className="text-xs text-ocean-600 dark:text-ocean-400 font-semibold">{editorInChief.designation}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{editorInChief.dept}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{editorInChief.institution}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">🇮🇳 {editorInChief.location}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{editorInChief.bio}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {editorInChief.specialization.map(s => <span key={s} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-navy-800 text-gray-600 dark:text-gray-300 rounded-full">{s}</span>)}
            </div>
            <a href={`mailto:${editorInChief.email}`} className="flex items-center gap-1.5 text-xs text-ocean-500 hover:underline font-medium"><Mail className="w-3 h-3" />{editorInChief.email}</a>
          </div>
        </section>

        {/* Executive Editor */}
        <section>
          <div className="flex items-center gap-4 mb-5">
            <div><p className="section-label mb-0">Editorial Leadership</p><h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white">Executive Editor</h2></div>
            <div className="flex-1 h-px bg-gradient-to-r from-navy-200 to-transparent dark:from-navy-700" />
          </div>
          <div className="card p-6 border-l-4 border-l-red-500 dark:border-l-red-400 max-w-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg font-serif">RR</span>
              </div>
              <div>
                <span className="text-xs font-bold px-2 py-0.5 bg-red-600 text-white rounded-full">Executive Editor</span>
                <h3 className="font-serif font-bold text-base text-gray-900 dark:text-white mt-2">{executiveEditor.name}</h3>
                <p className="text-xs text-red-600 dark:text-red-400 font-semibold">{executiveEditor.designation}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{executiveEditor.dept}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{executiveEditor.institution}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">🇮🇳 {executiveEditor.location}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{executiveEditor.bio}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {executiveEditor.specialization.map(s => <span key={s} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-navy-800 text-gray-600 dark:text-gray-300 rounded-full">{s}</span>)}
            </div>
            <a href={`mailto:${executiveEditor.email}`} className="flex items-center gap-1.5 text-xs text-ocean-500 hover:underline font-medium"><Mail className="w-3 h-3" />{executiveEditor.email}</a>
          </div>
        </section>

        {/* Editors */}
        <section>
          <div className="flex items-center gap-4 mb-5">
            <div><p className="section-label mb-0">Core Team</p><h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white">Editors</h2></div>
            <div className="flex-1 h-px bg-gradient-to-r from-navy-200 to-transparent dark:from-navy-700" />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {editors.map(ed => (
              <div key={ed.email} className="card p-5 border-l-4 border-l-ocean-500">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-ocean-100 dark:bg-ocean-900/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-ocean-700 dark:text-ocean-300 font-bold text-sm font-serif"><Initials name={ed.name} /></span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-ocean-50 text-ocean-700 dark:bg-ocean-900/30 dark:text-ocean-300 rounded-full border border-ocean-200 dark:border-ocean-800">{ed.role}</span>
                    <h3 className="font-serif font-bold text-sm text-gray-900 dark:text-white mt-1.5 leading-tight">{ed.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{ed.designation} · {ed.institution}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">🇮🇳 {ed.location}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{ed.bio}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {ed.specialization.slice(0, 4).map(s => <span key={s} className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-navy-800 text-gray-500 dark:text-gray-400 rounded">{s}</span>)}
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100 dark:border-navy-800">
                  <a href={`mailto:${ed.email}`} className="flex items-center gap-1 text-xs text-ocean-500 hover:underline"><Mail className="w-3 h-3" />{ed.email}</a>
                  {ed.orcid && <a href={`https://orcid.org/${ed.orcid}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-teal-600 hover:underline"><ExternalLink className="w-3 h-3" />ORCID</a>}
                  {ed.scholar && <a href={`https://scholar.google.com/citations?user=${ed.scholar}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-ocean-500"><BookOpen className="w-3 h-3" />Scholar</a>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Associate Editors */}
        <section>
          <div className="flex items-center gap-4 mb-5">
            <div><p className="section-label mb-0">International Panel</p><h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white">Associate Editors</h2></div>
            <div className="flex-1 h-px bg-gradient-to-r from-navy-200 to-transparent dark:from-navy-700" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {associateEditors.map(ed => (
              <div key={ed.email} className="card p-4 hover:border-ocean-300 dark:hover:border-ocean-700 transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-700 dark:text-teal-400 font-bold text-xs font-serif"><Initials name={ed.name} /></span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white leading-tight">{ed.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ed.designation}</p>
                  </div>
                </div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-snug mb-0.5">{ed.institution}</p>
                <p className="text-xs text-gray-400 mb-2 flex items-center gap-1"><Flag loc={ed.location} /> {ed.location}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-2">{ed.specialization}</p>
                <a href={`mailto:${ed.email}`} className="flex items-center gap-1 text-xs text-ocean-500 hover:underline truncate"><Mail className="w-3 h-3 flex-shrink-0" />{ed.email}</a>
              </div>
            ))}
          </div>
        </section>

        {/* Join / OJS */}
        <section className="grid sm:grid-cols-2 gap-5">
          <div className="card p-6 bg-gradient-to-br from-navy-50 to-blue-50 dark:from-navy-800/30 dark:to-navy-900/20 border-navy-200 dark:border-navy-700">
            <h3 className="font-serif font-bold text-navy-700 dark:text-white mb-2">Join the Editorial Board</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">Qualified researchers in civil engineering and allied disciplines are welcome to apply as reviewers or associate editors. Nominees should hold a doctoral degree and have published peer-reviewed research.</p>
            <a href="mailto:editor@jera-journal.org?subject=Editorial Board Application — JERA" className="btn-primary text-sm"><Mail className="w-4 h-4" />Apply to Join</a>
          </div>
          <div className="card p-6 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 border-teal-200 dark:border-teal-800">
            <h3 className="font-serif font-bold text-teal-800 dark:text-teal-300 mb-2">Submit a Manuscript</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">Submit your research via JERA's OJS portal at www.jera.co.in. Volume 1, Issue 2 deadline: June 30, 2026. No publication charges (full APC waiver 2025–2026).</p>
            <a href="https://www.jera.co.in/index.php/jera/submission/wizard" target="_blank" rel="noopener noreferrer" className="btn-accent text-sm"><ExternalLink className="w-4 h-4" />Submit via OJS</a>
          </div>
        </section>

      </div>
    </PageWrapper>
  )
}
