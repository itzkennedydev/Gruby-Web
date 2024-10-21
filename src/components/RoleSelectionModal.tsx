import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ isOpen, onClose }) => {
  const handleRoleSelect = (role: string) => {
    console.log(`Selected role: ${role}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Select Your Role</DialogTitle>
        <div className="space-y-4">
          <Button className="w-full" onClick={() => handleRoleSelect('chef')}>
            Chef
          </Button>
          <Button className="w-full" onClick={() => handleRoleSelect('customer')}>
            Customer
          </Button>
        </div>
        <div className="mt-4 text-center">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
