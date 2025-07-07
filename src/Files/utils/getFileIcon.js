export function getFileIcon(fileName = '') {
  if (typeof fileName !== 'string' || !fileName.includes('.')) {
    return 'default-icon'; // Puedes cambiarlo a un ícono por defecto
  }

  const extension = fileName.split('.').pop().toLowerCase();

  switch (extension) {
    case 'pdf':
      return 'pdf-icon';
    case 'ppt':
    case 'pptx':
      return 'ppt-icon';
    case 'doc':
    case 'docx':
      return 'word-icon';
    default:
      return 'default-icon';
  }
}