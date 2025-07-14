import { useQuery } from "@tanstack/react-query"

export const CursoTanstack = () => {

const getMetricas = async () => {
    const response = await fetch('https://jsonplaceholder.typecode.com/todos')
    return await response.json()
}

const {data} = useQuery({
    queryKey: ['metricas'],
    queryFn: getMetricas,

})


return(
    <>
     <div>{JSON.stringify(data.slice(0,10))}</div>
    </>
)
}