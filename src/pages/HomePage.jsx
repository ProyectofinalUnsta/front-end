import { Banner } from "../banner/Banner"
import { Layout } from "./Layout"

export const HomePage = () => {
    return(
        <>
       <Layout banner={<Banner/>}/>
        </>
    )
}