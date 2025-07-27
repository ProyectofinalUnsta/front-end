export function getFileIcon(fileName = '') {
  if (typeof fileName !== 'string' || !fileName.includes('.')) {
    return '📁'; // Icono por defecto
  }

  const extension = fileName.split('.').pop().toLowerCase();

  switch (extension) {
    case 'pdf':
      return '📄';
    case 'ppt':
    case 'pptx':
      return '📊';
    case 'doc':
    case 'docx':
      return '📝';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return '🖼️';
    case 'zip':
    case 'rar':
      return '🗜️';
    default:
      return '📁';
  }
}