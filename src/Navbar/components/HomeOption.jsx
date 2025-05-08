import { Link } from "react-router"
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
               <Link className="w-full p-1 h-full flex flex-row items-center gap-2" to={'/Admin'}><PointIcon fill={selectedesRef[refactiva].current?.id  == 'home' ? '#fff' : '#000'}/> <span>Home</span> </Link> 
            </>
            :  <Link className="w-full p-1 h-full flex flex-row items-center gap-2" to={'/Admin'}><span className="flex w-full h-full ml-1 "><HomeIcon fill={selectedesRef[refactiva].current?.id  == 'home' ? '#fff' : '#000'} /> </span> </Link>
            }
            </article>
        </>
    )
}