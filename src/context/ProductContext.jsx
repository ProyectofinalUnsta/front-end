import {  createContext, useState, useEffect } from 'react'
import { loadInitialProducts } from '../reducer/InitialProducts'
export const ProductContext = createContext()


export const ProductProvider =   ({children}) => {

const [products,setProducts] = useState([])
const itemsPerPage = 6;
const rounded = async () => {
  const data = await loadInitialProducts()
    let res = Math.ceil(data.length / itemsPerPage)
    if(res % 1 !== 0){
        res = res + 1
    }
  setTotalPages(res)
    }
    const [totalpages,setTotalPages] = useState(0)

      useEffect(() => {
    loadInitialProducts().then((data) => {
      setProducts(data);
      rounded()
    });
  }, []);


const [currenntPage,setCurrentPage] = useState(1)
const inicio = (currenntPage - 1) * itemsPerPage
const fin = inicio + itemsPerPage
const itemsinPage = products.slice(inicio,fin)

    return(
        <ProductContext.Provider value={{
           products,
           setProducts,
           itemsinPage,
           currenntPage,
           setCurrentPage, 
           inicio,
           fin,
           totalpages
        }}>
          {children}
        </ProductContext.Provider>
    )
} 