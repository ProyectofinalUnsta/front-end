import { Banner } from "../banner/Banner"
import { ExplorarEventos } from "../explore/ExplorarEventos"
import { WhyUs } from "../whyUs/WhyUs"
import { Layout } from "./Layout"

export const HomePage = () => {
    return(
        <>
       <Layout banner={<Banner/>} explore={<ExplorarEventos/>} why={<WhyUs/>}/>
        </>
    )
}