import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

export function useProducts () {
    const location = useLocation()
    const [products,setProducts] = useState([])

    const getitems = async  () => {
        let res = await axios.get('https://back-end-fiq8.onrender.com/api/').then((res)=> {return res})
       
        setProducts(res.data)
    }

    useEffect(()=>{
        window.addEventListener('load',getitems)
      
       return () => {
        window.removeEventListener('load',getitems)
      
       }
    },[])

    useEffect(()=>{
        getitems()
    },[location])

    return {products}
}