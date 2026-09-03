import { useState, useEffect } from 'react';

export default function MaintenanceModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if we've shown it this session
    const hasSeen = sessionStorage.getItem('hasSeenMaintenanceModal');
    if (!hasSeen) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenMaintenanceModal', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="maintenance-modal-backdrop" onClick={handleClose}>
      <div className="maintenance-modal" onClick={(e) => e.stopPropagation()}>
        <div className="maintenance-modal-header">
          <h3>Notice</h3>
          <button className="close-button" onClick={handleClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="maintenance-modal-body">
          <p>The website is currently under maintenance. Some features may be temporarily unavailable.</p>
        </div>
        <div className="maintenance-modal-footer">
          <button className="btn btn-primary" onClick={handleClose}>I Understand</button>
        </div>
      </div>
    </div>
  );
}
