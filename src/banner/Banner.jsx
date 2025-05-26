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
            <spline-viewer url="https://prod.spline.design/o7W0EzJhMfAEmxEF/scene.splinecode"></spline-viewer>
          </aside>
        </div>
        </>
    )
}


