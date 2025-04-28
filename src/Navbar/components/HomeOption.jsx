import { useAdminMenu } from "../../hooks/useAdminMenu"
import { HomeIcon } from "../../icons/HomeIcon"
import { PointIcon } from "../../icons/PointIcon"
export const HomeOption = () => {
    
    const {displayed,selectedesRef,handleClick,refactiva} = useAdminMenu()

    return(
        <>
         <article id='home' ref={selectedesRef.home} className='article-options-list ' onClick={()=>handleClick('home')}>
            { 
            displayed ? <>
               <PointIcon fill={selectedesRef[refactiva].current?.id  == 'home' ? '#fff' : '#000'}/> <span>Home</span> 
            </>
            : <span className="flex w-full h-full ml-1 "><HomeIcon fill={selectedesRef[refactiva].current?.id  == 'home' ? '#fff' : '#000'} /> </span> 
            }
            </article>
        </>
    )
}