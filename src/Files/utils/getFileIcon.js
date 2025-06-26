export  const getFileIcon = (fileType) => {
        switch(fileType.toLowerCase()) {
            case '.pdf': return '📄';
            case '.doc':
            case '.docx': return '📝';
            case '.ppt':
            case '.pptx': return '📊';
            case '.jpg':
            case '.jpeg':
            case '.png': return '🖼️';
            default: return '📁';
        }
    };