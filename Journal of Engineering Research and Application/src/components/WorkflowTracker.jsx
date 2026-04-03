import { submissionSteps } from '../data/siteContent'

export default function WorkflowTracker() {
  return (
    <section className="workflow" aria-label="Submission workflow">
      <h3>Submission Workflow</h3>
      <div className="workflow-track" role="list">
        {submissionSteps.map((step, index) => (
          <div className="workflow-step" role="listitem" key={step}>
            <span className="step-count" aria-hidden="true">
              {index + 1}
            </span>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
