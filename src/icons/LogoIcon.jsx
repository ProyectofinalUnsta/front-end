import logo from '../icons/mocks/logo2.webp'

export const LogoIcon = () => {
    return (
        <>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <img src={logo} alt="" width={'50px'} height={'50px'} />
        <h2 className="logo"> <a href="/">Eventum</a></h2>
        </div>
        </>
    )
}