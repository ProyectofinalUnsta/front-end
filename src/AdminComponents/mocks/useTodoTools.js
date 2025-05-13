
import { useContext, useMemo } from 'react'
import { createStickyNote } from '../mocks/elements.js'
import { createTextElement } from '../mocks/elements.js'
import { ElementsContext } from '../context/ElementsContext.jsx'

export function useTodoTools () {

const {MappedElements,setMappedElements} = useContext(ElementsContext)

const createNote = () => {
  // Crea una copia del array original
  const array = [...MappedElements];
  
  // Crea una nueva nota
  const newSticky = createStickyNote();
  
  // Agrega la nota al array copiado
  array.push(newSticky);
  
  // Actualiza el estado global con un NUEVO array
  setMappedElements(array);

  // Guarda en localStorage o donde corresponda
  saveOnLocal(array);
};


const deleteNote = (id) => {

const newMap = MappedElements.filter(elements => elements.id !== id)
setMappedElements(newMap)
saveOnLocal(newMap)

}

const editNombreNote = (id,e) => {
  // creamos un array copia para mapear el del estado global y actualizar el campo nombre
  const copia = MappedElements.map((nota)=> nota.id === id ? {...nota, nombre: e.target.value}: nota)

  setMappedElements(copia)
  // guardamos cambios en memoria local
  saveOnLocal(copia)
}

const editDescripcionNote = (id,e) => {
  // creamos un array copia para mapear el del estado global y actualizar el campo nombre
  const copia = MappedElements.map((nota)=> nota.id === id ? {...nota, descripcion: e.target.value}: nota)

  setMappedElements(copia)
  // guardamos cambios en memoria local
  saveOnLocal(copia)
}

const editEstadoNote = (id,e) => {
  // creamos un array copia para mapear el del estado global y actualizar el campo nombre
  const copia = MappedElements.map((nota)=> nota.id === id ? {...nota, estado: e.target.value}: nota)

  setMappedElements(copia)
  // guardamos cambios en memoria local
  saveOnLocal(copia)
}

const createText = () => {
   // creoun nuevo array o una copia del contexto
   const array = [...MappedElements];
  
   // creo una sticky note con props por defecto
   const newText = createTextElement()
   // guardo la nota en el array 
  array.push(newText)
  // guardo la nota en mi estado global
   setMappedElements(array)
   // llamo a guardar el array en memoria local
   saveOnLocal(array)
}

const editText = (id,e) => {
const copia = MappedElements.map((texto)=> texto.id === id ? {...texto, nombre:e.target.value}: texto)
setMappedElements(copia)
// guardamos cambios en memoria local
saveOnLocal(copia)
}

const DeleteText = (id) => {
  const newMap = MappedElements.filter(elements => elements.id !== id)
  saveOnLocal(newMap)
}


class styleElements  {
  static changeProps  (id,target,value) {
    console.log(id,target,value)
    const copy = MappedElements.map((elements)=> elements.id  === id ? {...elements, [target]: value}: elements)
    setMappedElements(copy)
    saveOnLocal(copy)
  }
}

const saveOnLocal = (elements) => {
  window.localStorage.setItem('elements',JSON.stringify(elements))
}


const mappedElements = useMemo(() => {
  return MappedElements.map(item => ({
    ...item,
    someExtraProp: true
  }));
}, [MappedElements]);





return {createNote,deleteNote,mappedElements,editNombreNote,editDescripcionNote,editEstadoNote,createText,editText,DeleteText,styleElements}

}