import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { CheckCircle, XCircle } from 'lucide-react'



const disciplines = [
  { name: 'Civil Engineering', active: true, topics: ['Structural analysis and design', 'Foundation engineering', 'Construction materials and technology', 'Surveying and geomatics', 'Coastal and port engineering', 'Engineering mechanics'] },
  { name: 'Structural & Wind Engineering', active: true, topics: ['Reinforced and prestressed concrete', 'Steel, composite and timber structures', 'Structural dynamics and vibration', 'Wind loads on buildings and bridges', 'Boundary layer wind tunnels', 'Tall building and bluff body aerodynamics', 'Fibre reinforced concrete', 'High-strength and ultra-high-performance concrete'] },
  { name: 'Geotechnical Engineering', active: true, topics: ['Soil mechanics and characterisation', 'Foundation systems (shallow and deep)', 'Slope stability and landslide mitigation', 'Rainfall-induced landslide monitoring', 'Rock engineering and tunnelling', 'Ground improvement techniques', 'Geosynthetics and retaining structures', 'Physical and numerical modelling in geomechanics', 'Disaster risk reduction systems'] },
  { name: 'Transportation Engineering', active: true, topics: ['Pavement design, materials and performance', 'Traffic engineering and simulation', 'Intelligent transportation systems (ITS)', 'Highway and railway engineering', 'Road safety engineering', 'Sustainable transport planning'] },
  { name: 'Environmental Engineering', active: true, topics: ['Water and wastewater treatment', 'Air quality assessment and management', 'Solid and hazardous waste management', 'Environmental impact assessment', 'Green and blue-green infrastructure', 'Climate change adaptation'] },
  { name: 'Water Resources Engineering', active: true, topics: ['Hydraulics and open-channel flow', 'Hydrology and flood management', 'Irrigation and drainage systems', 'Groundwater modelling', 'Dam and reservoir engineering', 'Sediment transport'] },
  { name: 'Construction Management', active: true, topics: ['Project planning, scheduling and control', 'Building Information Modelling (BIM)', 'Lean construction and productivity', 'Construction safety and risk', 'Sustainable and green building', 'Procurement and contract management'] },
  { name: 'Earthquake Engineering', active: true, topics: ['Seismic hazard and risk assessment', 'Structural response to ground motion', 'Seismic design and retrofitting', 'Soil-structure interaction', 'Performance-based earthquake engineering', 'Disaster resilience of infrastructure'] },
  { name: 'Smart Infrastructure & Emerging Areas', active: true, topics: ['Structural health monitoring (SHM)', 'IoT and sensor applications in civil engineering', 'Machine learning in infrastructure management', 'Remote sensing and GIS applications', 'Additive manufacturing in construction', 'Life cycle assessment of infrastructure', 'Building materials innovation'] },
]

const articleTypes = [
  { type: 'Original Research Article', length: '4,000–8,000 words', desc: 'Novel experimental, theoretical, field-based, or computational research presenting significant original findings. Most common and preferred submission type. Must include clearly stated objectives, robust methodology, verifiable results, and discussion of engineering significance.' },
  { type: 'Review Article', length: '6,000–12,000 words', desc: 'Comprehensive, critical, and systematic synthesis of the existing literature on a well-defined topic in civil engineering or allied fields. Must identify research gaps and propose future directions. Invited reviews are also considered; unsolicited review proposals should contact the editorial office in advance.' },
  { type: 'Case Study', length: '2,000–5,000 words', desc: 'In-depth, well-documented examination of a real-world engineering project, failure, remediation, or innovative practice, with clear lessons applicable to wider engineering practice. Field data and photographs are strongly encouraged.' },
  { type: 'Short Communication', length: '1,500–3,000 words', desc: 'Concise report of a novel, clearly defined finding or preliminary result that warrants rapid publication and is of immediate interest to the research community. Results need not be complete but must be reproducible.' },
  { type: 'Technical Note', length: '1,000–2,500 words', desc: 'Focused, self-contained description of a new testing method, numerical technique, experimental apparatus, or software tool. Must include sufficient detail for independent replication or adoption.' },
  { type: 'Discussion & Reply', length: 'Up to 1,000 words', desc: 'Technical comment on a previously published JERA article. The original authors are invited to respond. Both the Discussion and Reply are published together. Submitted at editorial discretion.' },
]

export default function AimsScopePage() {
  return (
    <PageWrapper
      title="Aims & Scope"
      subtitle="Research coverage, manuscript types, and editorial objectives of JERA"
      breadcrumbs={[{ label: 'Aims & Scope' }]}
    >
      <div className="max-w-4xl space-y-10">

        {/* Aims */}
        <section className="card p-6 bg-gradient-to-br from-navy-50 to-blue-50 dark:from-navy-800/30 dark:to-navy-900/20 border-navy-200 dark:border-navy-700">
          <p className="section-label">Journal Aims</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-4">Purpose & Objectives</h2>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>JERA aims to be a premier international platform for disseminating original, impactful research across the full spectrum of civil engineering and its allied disciplines. The journal actively bridges the gap between fundamental scientific inquiry and engineering practice — publishing work that advances both theoretical understanding and the design, construction, and management of real-world infrastructure.</p>
            <p>JERA is particularly committed to fostering interdisciplinary research that addresses the grand engineering challenges of the 21st century: climate-resilient infrastructure, sustainable construction, smart and connected systems, disaster risk reduction, and equitable access to safe built environments.</p>
            <p>The journal warmly encourages contributions from researchers at all career stages and from all geographic regions, with a special focus on amplifying high-quality research from South Asia, Southeast Asia, Africa, the Middle East, and Latin America — regions that are central to global infrastructure development yet historically underrepresented in mainstream engineering journals.</p>
          </div>
        </section>

        {/* Scope by discipline */}
        <section>
          <p className="section-label">Coverage</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-5">Disciplines & Topic Areas</h2>
          <div className="space-y-3">
            {disciplines.map(({ name, active, topics }) => (
              <div key={name} className={`card p-5 ${active ? 'border-l-4 border-l-ocean-500' : 'opacity-60'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-sm text-navy-700 dark:text-white">{name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    ✓ Active
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-1.5">
                  {topics.map(t => (
                    <div key={t} className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-3 h-3 text-teal-600 flex-shrink-0 mt-0.5" />{t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Manuscript types */}
        <section>
          <p className="section-label">Submission Types</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-5">Types of Manuscripts Accepted</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {articleTypes.map(({ type, length, desc }) => (
              <div key={type} className="card p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-sm text-navy-700 dark:text-white">{type}</h3>
                  <span className="text-xs px-2 py-0.5 bg-navy-50 dark:bg-navy-800 text-navy-600 dark:text-navy-200 rounded-full flex-shrink-0 font-mono">{length}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Out of scope */}
        <section className="card p-6 border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/10">
          <h3 className="font-semibold text-sm text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
            <XCircle className="w-4 h-4" /> Out of Scope — Desk Rejection Without Review
          </h3>
          <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-400">
            {[
              'Manuscripts outside civil engineering and its allied disciplines as defined above',
              'Previously published work (duplicate or redundant publication)',
              'Manuscripts with similarity index exceeding 15% (excluding references) on iThenticate screening',
              'Self-plagiarism exceeding 20% from the authors\' own prior publications',
              'Manuscripts that present no new data, analysis, methodology, or insight',
              'Manuscripts falling below minimum quality, length, or formatting thresholds',
              'Work not conducted with appropriate ethical approvals where applicable',
            ].map(item => (
              <li key={item} className="flex items-start gap-2">
                <XCircle className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />{item}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </PageWrapper>
  )
}
