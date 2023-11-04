import React from 'react';
import { Button } from './ui/button';
import { ArrowDownToLine } from 'lucide-react';

interface DownloadButtonProps {
    result: string;
    isLoading: boolean;
    toast?: (options: {title: string, description: string}) => void; 
  }

const DownloadButton: React.FC<DownloadButtonProps> = ({ result, isLoading, toast}) => {

    const handleDownload = () => {
        if (!result) {
            toast({
                title: "Hmms... Nothing to download...",
                description: "Maybe generate it first",
            })
            return;
        }
        // Create a Blob from the 'result' variable
        const blob = new Blob([result], { type: 'application/octet-stream' });

        // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element for downloading
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'cover-letter.txt'; // Set the desired file name

        // Append the anchor element to the document
        document.body.appendChild(a);

        // Trigger a click event on the anchor to start the download
        a.click();

        // Clean up by removing the anchor and revoking the URL
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <Button onClick={handleDownload} disabled={isLoading}>
            <ArrowDownToLine/>
            Download
        </Button>
    );
}

export default DownloadButton;