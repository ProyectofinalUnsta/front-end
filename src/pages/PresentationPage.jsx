import axios from "axios"
import { useEffect, useState } from "react"
import { MappedPresentations } from "../Files/components/MappedPresentations"
export default function PresentationPage () {

    return(
        <>
       
        <h1>
            Hola
        </h1>
       <section>
      <MappedPresentations/>
       </section>
        </>
    )
}