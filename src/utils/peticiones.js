import axios from "axios"
export const getitems = async  () => {
      
    let res =  await axios.get('https://back-end-fiq8.onrender.com/api/').then((res)=> {return res})
       return res.data 
}