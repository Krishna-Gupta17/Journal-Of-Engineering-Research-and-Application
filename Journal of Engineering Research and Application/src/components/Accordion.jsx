import { useState } from 'react'

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="accordion" role="list">
      {items.map((item, index) => {
        const isOpen = index === openIndex
        return (
          <section className={`accordion-item ${isOpen ? 'open' : ''}`} key={item.title}>
            <h3>
              <button
                type="button"
                className="accordion-trigger"
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${index}`}
                id={`accordion-trigger-${index}`}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                {item.title}
              </button>
            </h3>
            <div
              id={`accordion-panel-${index}`}
              role="region"
              aria-labelledby={`accordion-trigger-${index}`}
              hidden={!isOpen}
            >
              <p>{item.content}</p>
            </div>
          </section>
        )
      })}
    </div>
  )
}
