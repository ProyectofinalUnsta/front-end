import React from "react"
const  Banner = React.lazy(()=> import('../banner/Banner'))
const  WhyUs   = React.lazy(()=> import('../whyUs/WhyUs')) 
import { Layout } from "./Layout"


export default function HomePage  ()  {
    return (
        <>
            <Layout banner={<Banner />} why={<WhyUs />} />
            
        </>
    )
}