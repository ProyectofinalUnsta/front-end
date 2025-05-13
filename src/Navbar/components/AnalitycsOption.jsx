import { useAdminMenu } from "../../hooks/useAdminMenu"
import { PointIcon } from "../../icons/PointIcon"
import { ChartIcon } from "../../icons/ChartIcon"
import { Link } from "react-router"
export const AnalitycsOption = () => {

    const {displayed,selectedesRef,handleClick,refactiva} = useAdminMenu()

    return(
        <>
        <article id='analitycs' ref={selectedesRef.analitycs} className='article-options-list ' onClick={()=>handleClick('analitycs')}>
           {displayed ? 
           <>
           <Link to={'/Admin/Metricas'} className="w-full p-1 h-full  flex flex-row items-center gap-2"> <PointIcon fill={selectedesRef[refactiva].current?.id  == 'analitycs' ? '#fff' : '#000'}/> Metricas </Link>
           </> 
           :  <Link to={'/Admin/Metricas'} className=" w-full p-1 h-full flex flex-row items-center gap-2"> <span className="flex w-full h-full ml-1 "><ChartIcon fill={selectedesRef[refactiva].current?.id  == 'analitycs' ? '#fff' : '#000'}/></span> </Link>
           } 
            </article>
        </>
    )
}