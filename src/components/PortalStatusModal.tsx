import React from 'react';
import {
  CheckCircle, HelpCircle, Copy, ExternalLink,
} from 'lucide-react';

interface PortalStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PortalStatusModal: React.FC<PortalStatusModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          Your portal is active
          {' '}
          <CheckCircle className="text-green-500 ml-2" size={20} />
        </h2>
        <p className="text-gray-600 mb-4">All services are operational</p>

        <div className="mb-4">
          <h3 className="font-medium mb-2">Custom Domain</h3>
          <a href="#" className="text-blue-500 hover:underline">Click here to add a custom domain</a>
        </div>

        <div className="mb-4">
          <h3 className="font-medium mb-2 flex items-center">
            Portal
            {' '}
            <HelpCircle className="text-gray-400 ml-1" size={16} />
          </h3>
          <div className="flex items-center justify-between bg-gray-100 rounded p-2">
            <span className="text-gray-700">nocta.copilot.app</span>
            <button className="text-gray-500 hover:text-gray-700">
              <Copy size={16} />
            </button>
          </div>
        </div>

        <button
          className="w-full bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200 transition duration-200 flex items-center justify-center"
          onClick={onClose}
        >
          Open portal
          {' '}
          <ExternalLink size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default PortalStatusModal;
