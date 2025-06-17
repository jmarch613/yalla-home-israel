
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FileImage, X } from 'lucide-react';

interface FloorplanViewerProps {
  floorplanUrl: string;
  title: string;
}

export const FloorplanViewer = ({ floorplanUrl, title }: FloorplanViewerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsDialogOpen(true)}
        className="w-full"
      >
        <FileImage className="w-4 h-4 mr-2" />
        View Floorplan
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <div className="relative">
            <img
              src={floorplanUrl}
              alt={`${title} - Floorplan`}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setIsDialogOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
