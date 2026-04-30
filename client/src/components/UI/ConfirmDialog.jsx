import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, isDangerous = true }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center text-center space-y-4">
        {isDangerous && (
          <div className="w-16 h-16 rounded-full flex-center mb-4" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)' }}>
            <AlertTriangle size={32} />
          </div>
        )}
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex w-full gap-4 mt-6">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button variant={isDangerous ? "danger" : "primary"} className="flex-1" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
