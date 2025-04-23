import './style/banner.css'

export const Banner = () => {

    return(
        <>
        <div className="banner">
          <aside className='article-banner'>
            <h1  className='text-banner'>Descubrí y crea eventos inolvidables</h1>
            <p className='description-banner'>Crea, descubre y comparte eventos únicos que te conectan con personas y experiencias increíbles.</p>
            <div className="button-container">
              <button className="btn-explore">Explorar eventos</button>
              <button className="btn-join">Unirse ahora</button>
            </div>
          </aside>
          <aside  className='article-banner'>
            <img  className='img-banner' src="https://kzmo4ra0ji5m2etf47ef.lite.vusercontent.net/placeholder.svg?height=400&width=600" alt="" />
          </aside>
        </div>
        </>
    )
}