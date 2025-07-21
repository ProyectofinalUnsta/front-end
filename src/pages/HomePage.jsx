import React from "react"
const  Banner = React.lazy(()=> import('../banner/Banner'))
const  WhyUs   = React.lazy(()=> import('../whyUs/WhyUs')) 
import { Layout } from "./Layout"
import { TimerFloatButton } from "../components/TimerFloatButton";

export default function HomePage  ()  {
    return (
        <>
            <Layout banner={<Banner />} why={<WhyUs />} />
            <TimerFloatButton />
        </>
    )
}