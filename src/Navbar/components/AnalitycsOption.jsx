import { useAdminMenu } from "../../hooks/useAdminMenu"
import { PointIcon } from "../../icons/PointIcon"
import { ChartIcon } from "../../icons/ChartIcon"
export const AnalitycsOption = () => {

    const {displayed,selectedesRef,handleClick,refactiva} = useAdminMenu()

    return(
        <>
        <article id='analitycs' ref={selectedesRef.analitycs} className='article-options-list ' onClick={()=>handleClick('analitycs')}>
           {displayed ? 
           <>
            <PointIcon fill={selectedesRef[refactiva].current?.id  == 'analitycs' ? '#fff' : '#000'}/> Analitycs
           </> 
           : <span className="flex w-full h-full ml-1 "><ChartIcon fill={selectedesRef[refactiva].current?.id  == 'analitycs' ? '#fff' : '#000'}/></span>
           } 
            </article>
        </>
    )
}