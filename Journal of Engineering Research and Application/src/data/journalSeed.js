const demoPdfUrl =
  'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function createInitialCatalog() {
  return [
    {
      id: createId(),
      name: 'Volume 1',
      issues: [
        {
          id: createId(),
          name: 'Issue 1',
          papers: [
            {
              id: createId(),
              title: 'Performance of Sustainable Concrete Mixes in Coastal Structures',
              authorName: 'JERA Editorial Demo',
              fileName: 'sample-paper.pdf',
              pdfUrl: demoPdfUrl,
              uploadedAt: new Date().toISOString(),
            },
          ],
        },
        {
          id: createId(),
          name: 'Issue 2',
          papers: [],
        },
      ],
    },
    {
      id: createId(),
      name: 'Volume 2',
      issues: [
        {
          id: createId(),
          name: 'Issue 1',
          papers: [],
        },
      ],
    },
  ]
}

export const initialCatalog = createInitialCatalog()
