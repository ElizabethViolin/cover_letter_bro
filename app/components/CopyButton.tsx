import copy from "copy-to-clipboard";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

interface CopyButtonProps {
    result: string;
    toast?: (options: {title: string, description: string}) => void; 
}

const CopyButton: React.FC<CopyButtonProps> = ({ result, toast}) => {
    const handleCopyClick = () => {
        if (!result) {
          toast({
            title: "Hmms... Nothing to copy here...",
            description: "Let's generate it first!",
          })
          return;
        }
        copy(result);
      };

    return (
        <Button onClick={handleCopyClick}><Copy/>Copy</Button>

    );
}

export default CopyButton;