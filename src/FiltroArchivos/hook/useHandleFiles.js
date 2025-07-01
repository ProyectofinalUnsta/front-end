import { useContext, useState } from "react"
import { FileContext } from "../../context/FileContext"


export default function useHandleFiles () {
  const {porMi,setPorMi} = useContext(FileContext)
  const [loading,setLoading] = useState(false)
const handleFiles = async (e) => {
    e.preventDefault()
    setLoading(true)

    if(e.target.value == 'por-Mi') {
      setPorMi(true)
        setLoading(false)
      return
    } if(e.target.value != 'Por-Mi') {
         setPorMi(false)
         setLoading(false)
         return
    }

  
}



return {handleFiles,porMi,loading}
}