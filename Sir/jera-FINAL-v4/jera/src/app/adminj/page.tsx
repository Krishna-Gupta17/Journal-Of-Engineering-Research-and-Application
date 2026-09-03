'use client'

import { useState, useMemo } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ProtectedAdminRoute } from '@/components/ProtectedAdminRoute'
import { useJournal, Volume, Issue, Paper } from '@/context/JournalContext'

const MAX_PAPER_TITLE_LENGTH = 250
const MAX_PDF_SIZE = 5 * 1024 * 1024

const emptyVolumeForm = { volumeName: '' }
const emptyIssueForm = { volumeId: '', issueName: '' }
const emptyPaperForm = {
  volumeId: '',
  issueId: '',
  title: '',
  authorName: '',
  pdfFile: null as File | null,
}

function formatFileSize(size?: number) {
  if (!size) return '0 KB'
  return `${Math.round((size / 1024) * 10) / 10} KB`
}

export default function AdminPage() {
  const {
    catalog,
    loading,
    error,
    addVolume,
    addIssue,
    addPaper,
    removeVolume,
    removeIssue,
    removePaper,
    logoutAdmin,
  } = useJournal()

  const [volumeForm, setVolumeForm] = useState(emptyVolumeForm)
  const [issueForm, setIssueForm] = useState(emptyIssueForm)
  const [paperForm, setPaperForm] = useState(emptyPaperForm)
  
  const [managerVolumeId, setManagerVolumeId] = useState('')
  const [managerIssueId, setManagerIssueId] = useState('')
  
  const [feedback, setFeedback] = useState('')
  const [busyDeleteKey, setBusyDeleteKey] = useState('')
  
  const [deleteDialog, setDeleteDialog] = useState<{
    type: 'volume' | 'issue' | 'paper'
    id: string
    name: string
    entityLabel: string
    message: string
  } | null>(null)

  const defaultIssueVolumeId = catalog[0]?.id ?? ''
  const paperVolumeId = paperForm.volumeId || defaultIssueVolumeId
  const paperVolume = useMemo(
    () => catalog.find((volume) => volume.id === paperVolumeId),
    [catalog, paperVolumeId],
  )
  const defaultPaperIssueId = paperVolume?.issues[0]?.id ?? ''
  const issueVolumeId = issueForm.volumeId || defaultIssueVolumeId

  const paperIssue = useMemo(
    () => paperVolume?.issues.find((issue) => issue.id === (paperForm.issueId || defaultPaperIssueId)),
    [defaultPaperIssueId, paperForm.issueId, paperVolume],
  )
  const managerVolume = useMemo(
    () => catalog.find((volume) => volume.id === managerVolumeId) ?? null,
    [catalog, managerVolumeId],
  )
  const managerIssue = useMemo(
    () => managerVolume?.issues.find((issue) => issue.id === managerIssueId) ?? null,
    [managerVolume, managerIssueId],
  )

  const showManagerVolumeBoxes = !managerVolume
  const showManagerIssueBoxes = Boolean(managerVolume) && !managerIssue
  const showManagerPapers = Boolean(managerIssue)
  
  const dialogDeleteKey = deleteDialog ? `${deleteDialog.type}:${deleteDialog.id}` : ''
  const isDialogBusy = Boolean(dialogDeleteKey && busyDeleteKey === dialogDeleteKey)

  const handleCreateVolume = async (event: React.FormEvent) => {
    event.preventDefault()
    const result = await addVolume(volumeForm.volumeName)

    if (result.ok) {
      setFeedback(`Created volume "${volumeForm.volumeName.trim()}".`)
      setVolumeForm(emptyVolumeForm)
      return
    }

    if (result.message === 'Admin authentication required.' || result.message === 'Invalid or expired admin session.') {
      logoutAdmin()
    }
    setFeedback(result.message || 'Error creating volume')
  }

  const handleCreateIssue = async (event: React.FormEvent) => {
    event.preventDefault()
    const result = await addIssue(issueForm.volumeId || issueVolumeId, issueForm.issueName)

    if (result.ok) {
      setFeedback(`Created issue "${issueForm.issueName.trim()}".`)
      setIssueForm((f) => ({ ...f, issueName: '' }))
      return
    }

    if (result.message === 'Admin authentication required.' || result.message === 'Invalid or expired admin session.') {
      logoutAdmin()
    }
    setFeedback(result.message || 'Error creating issue')
  }

  const handleCreatePaper = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const file = paperForm.pdfFile

    if (file && file.size > MAX_PDF_SIZE) {
      setFeedback('PDF must be 5 MB or smaller.')
      return
    }

    if (!file) {
      setFeedback('Please select a PDF file.')
      return
    }

    const result = await addPaper({
      volumeId: paperForm.volumeId || paperVolumeId,
      issueId: paperForm.issueId || defaultPaperIssueId,
      title: paperForm.title,
      authorName: paperForm.authorName,
      pdfFile: file,
    })

    if (result.ok) {
      setFeedback(`Uploaded paper "${paperForm.title.trim()}".`)
      setPaperForm(emptyPaperForm)
      event.currentTarget.reset()
      return
    }

    if (result.message === 'Admin authentication required.' || result.message === 'Invalid or expired admin session.') {
      logoutAdmin()
    }
    setFeedback(result.message || 'Error uploading paper')
  }

  const requestDelete = ({ type, id, name, volumeName }: { type: 'volume' | 'issue' | 'paper', id: string, name: string, volumeName?: string }) => {
    if (!type || !id || !name) return

    const messageByType = {
      volume: `Delete ${name}? This will remove all associated issues and papers.`,
      issue: `Delete ${name} from ${volumeName}? All papers in this issue will be removed.`,
      paper: `Delete paper ${name}? This action cannot be undone.`,
    }

    const labelByType = {
      volume: 'Volume',
      issue: 'Issue',
      paper: 'Paper',
    }

    setDeleteDialog({
      type,
      id,
      name,
      entityLabel: labelByType[type],
      message: messageByType[type],
    })
  }

  const handleConfirmDelete = async () => {
    if (!deleteDialog) return

    const { type, id, name, entityLabel } = deleteDialog
    const deleteKey = `${type}:${id}`
    setBusyDeleteKey(deleteKey)

    let result
    if (type === 'volume') {
      result = await removeVolume(id)
    } else if (type === 'issue') {
      result = await removeIssue(id)
    } else {
      result = await removePaper(id)
    }

    setBusyDeleteKey('')

    if (result.ok) {
      setDeleteDialog(null)
      setFeedback(`Deleted ${entityLabel.toLowerCase()} "${name}".`)
      if (type === 'volume') setManagerVolumeId('')
      if (type === 'issue') setManagerIssueId('')
      return
    }

    if (result.message === 'Admin authentication required.' || result.message === 'Invalid or expired admin session.') {
      logoutAdmin()
      return
    }

    setDeleteDialog(null)
    setFeedback(result.message || 'Delete failed')
  }

  return (
    <ProtectedAdminRoute>
      <PageWrapper title="Admin Dashboard" subtitle="Manage volumes, issues, and paper records.">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex justify-between items-center bg-white dark:bg-navy-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-navy-700">
            <span className="font-semibold text-gray-800 dark:text-white">Admin Controls</span>
            <button onClick={logoutAdmin} className="btn-secondary">Logout Admin</button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
              Backend connection issue: {error}
            </div>
          )}
          {feedback && (
            <div className="p-4 bg-teal-50 text-teal-800 border border-teal-200 rounded-lg">
              {feedback}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Create Volume Form */}
            <div className="card p-6 border-t-4 border-t-ocean-500">
              <h3 className="font-serif font-bold text-lg text-navy-700 dark:text-white mb-4">Create Volume</h3>
              <form onSubmit={handleCreateVolume} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Volume Name</label>
                  <input
                    type="text"
                    value={volumeForm.volumeName}
                    onChange={(e) => setVolumeForm({ volumeName: e.target.value })}
                    placeholder="e.g. Volume 3"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:bg-navy-800 dark:text-white"
                    required
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">Save Volume</button>
              </form>
            </div>

            {/* Create Issue Form */}
            <div className="card p-6 border-t-4 border-t-teal-500">
              <h3 className="font-serif font-bold text-lg text-navy-700 dark:text-white mb-4">Create Issue</h3>
              <form onSubmit={handleCreateIssue} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Volume</label>
                  <select
                    value={issueForm.volumeId || issueVolumeId}
                    onChange={(e) => setIssueForm({ ...issueForm, volumeId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:bg-navy-800 dark:text-white"
                  >
                    {catalog.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Issue Name</label>
                  <input
                    type="text"
                    value={issueForm.issueName}
                    onChange={(e) => setIssueForm({ ...issueForm, issueName: e.target.value })}
                    placeholder="e.g. Issue 4"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:bg-navy-800 dark:text-white"
                    required
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center bg-teal-600 hover:bg-teal-700">Save Issue</button>
              </form>
            </div>
          </div>

          {/* Upload Paper Form */}
          <div className="card p-6 border-l-4 border-l-blue-500">
            <h3 className="font-serif font-bold text-lg text-navy-700 dark:text-white mb-4">Upload Paper</h3>
            <form onSubmit={handleCreatePaper} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Volume</label>
                <select
                  value={paperForm.volumeId || paperVolumeId}
                  onChange={(e) => setPaperForm({ ...paperForm, volumeId: e.target.value, issueId: '' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:bg-navy-800 dark:text-white"
                >
                  {catalog.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Issue</label>
                <select
                  value={paperForm.issueId || defaultPaperIssueId}
                  onChange={(e) => setPaperForm({ ...paperForm, issueId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:bg-navy-800 dark:text-white"
                >
                  <option value="">Select an issue</option>
                  {paperVolume?.issues.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Paper Title</label>
                <input
                  type="text"
                  value={paperForm.title}
                  onChange={(e) => setPaperForm({ ...paperForm, title: e.target.value })}
                  maxLength={MAX_PAPER_TITLE_LENGTH}
                  placeholder="Paper title"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:bg-navy-800 dark:text-white"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author's Name</label>
                <input
                  type="text"
                  value={paperForm.authorName}
                  onChange={(e) => setPaperForm({ ...paperForm, authorName: e.target.value })}
                  placeholder="Author name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:bg-navy-800 dark:text-white"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload PDF</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPaperForm({ ...paperForm, pdfFile: e.target.files?.[0] ?? null })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-md file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-ocean-50 file:text-ocean-700 hover:file:bg-ocean-100 dark:file:bg-navy-700 dark:file:text-white dark:bg-navy-800 dark:text-white"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">PDF only. Max size 5 MB.</p>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button type="submit" disabled={loading} className="btn-primary px-8">Upload Paper</button>
              </div>
            </form>
          </div>

          {/* Catalog Manager */}
          <div className="card p-6">
            <h3 className="font-serif font-bold text-xl text-navy-700 dark:text-white mb-6">Catalog Manager</h3>
            
            {!catalog.length ? (
              <p className="text-gray-500">No volumes yet. Create a volume to start.</p>
            ) : (
              <div className="space-y-6">
                
                {/* Volumes */}
                {showManagerVolumeBoxes && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wider">Select Volume</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {catalog.map(vol => (
                        <button
                          key={vol.id}
                          onClick={() => { setManagerVolumeId(vol.id); setManagerIssueId('') }}
                          className="p-4 border border-gray-200 dark:border-navy-700 rounded-lg hover:border-ocean-500 hover:shadow-md transition-all text-center bg-white dark:bg-navy-800"
                        >
                          <span className="font-semibold text-gray-800 dark:text-white">{vol.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Volume */}
                {managerVolume && (
                  <div className="p-4 bg-navy-50 dark:bg-navy-800/50 rounded-lg flex justify-between items-center border border-navy-100 dark:border-navy-700">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Volume</span>
                      <h4 className="font-bold text-navy-700 dark:text-white">{managerVolume.name}</h4>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setManagerVolumeId(''); setManagerIssueId('') }} className="btn-secondary text-xs">Back to Volumes</button>
                      <button
                        onClick={() => requestDelete({ type: 'volume', id: managerVolume.id, name: managerVolume.name })}
                        disabled={busyDeleteKey === `volume:${managerVolume.id}`}
                        className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-md text-xs font-semibold border border-red-200"
                      >
                        {busyDeleteKey === `volume:${managerVolume.id}` ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Issues */}
                {showManagerIssueBoxes && (
                  <div className="pl-4 md:pl-8 border-l-2 border-gray-100 dark:border-navy-800">
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wider">Select Issue</h4>
                    {!managerVolume?.issues.length ? (
                      <p className="text-gray-500 text-sm">No issues in this volume yet.</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {managerVolume.issues.map(iss => (
                          <button
                            key={iss.id}
                            onClick={() => setManagerIssueId(iss.id)}
                            className="p-3 border border-gray-200 dark:border-navy-700 rounded-lg hover:border-teal-500 hover:shadow-md transition-all text-center bg-white dark:bg-navy-800"
                          >
                            <span className="font-medium text-gray-800 dark:text-white">{iss.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Selected Issue */}
                {managerIssue && (
                  <div className="pl-4 md:pl-8 border-l-2 border-gray-100 dark:border-navy-800 space-y-6">
                    <div className="p-4 bg-teal-50 dark:bg-teal-900/10 rounded-lg flex justify-between items-center border border-teal-100 dark:border-teal-900/30">
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Issue</span>
                        <h4 className="font-bold text-teal-800 dark:text-teal-300">{managerIssue.name}</h4>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setManagerIssueId('')} className="btn-secondary text-xs">Back to Issues</button>
                        <button
                          onClick={() => requestDelete({ type: 'issue', id: managerIssue.id, name: managerIssue.name, volumeName: managerVolume?.name })}
                          disabled={busyDeleteKey === `issue:${managerIssue.id}`}
                          className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-md text-xs font-semibold border border-red-200"
                        >
                          {busyDeleteKey === `issue:${managerIssue.id}` ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>

                    {/* Papers */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wider">Papers</h4>
                      {!managerIssue.papers.length ? (
                        <p className="text-gray-500 text-sm">No papers uploaded yet.</p>
                      ) : (
                        <div className="space-y-3">
                          {managerIssue.papers.map(paper => (
                            <div key={paper.id} className="p-4 bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                              <div>
                                <h5 className="font-semibold text-gray-900 dark:text-white leading-tight">{paper.title}</h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{paper.authorName}</p>
                              </div>
                              <div className="flex gap-2 flex-shrink-0">
                                <a href={paper.pdfPreviewUrl || paper.pdfUrl} target="_blank" rel="noreferrer" className="btn-secondary text-xs">View PDF</a>
                                <button
                                  onClick={() => requestDelete({ type: 'paper', id: paper.id, name: paper.title })}
                                  disabled={busyDeleteKey === `paper:${paper.id}`}
                                  className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-md text-xs font-semibold border border-red-200"
                                >
                                  {busyDeleteKey === `paper:${paper.id}` ? 'Deleting...' : 'Delete'}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteDialog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-navy-900 rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-navy-700">
              <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-2">Delete {deleteDialog.entityLabel}?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{deleteDialog.message}</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setDeleteDialog(null)} disabled={isDialogBusy} className="btn-secondary">Cancel</button>
                <button onClick={handleConfirmDelete} disabled={isDialogBusy} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm">
                  {isDialogBusy ? 'Deleting...' : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </PageWrapper>
    </ProtectedAdminRoute>
  )
}
