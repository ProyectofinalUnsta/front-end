

const randomUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };



  export const createStickyNote = () => ({
    type: 'Sticky',
    nombre:'nombre Nota',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    fontSize: '22px',
    color:'#000',
    background:'#feffd3',
    selfalign:'start',
    descripcion: 'Descripcion Nota',
    evento: '',
    estado: 'No realizado',
    id: randomUUID(),
  });
  
  export const createTextElement = () => ({
    id: randomUUID(),
    type: 'Text',
    nombre: 'Text',
    fontFamily: 'Virgil,sans-serif',
    fontStyle:'normal',
    fontSize: '22px',
    color: '#000',
  });
