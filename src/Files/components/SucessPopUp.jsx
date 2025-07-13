import '../../PopUp/style/popUp.css'
import { useNavigate } from 'react-router';
import { useState , useEffect} from 'react';
import { LogoIcon } from '../../icons/LogoIcon';

export const SucessPopUp = () => {
  const [segundos, setSegundos] = useState(4);
  const volver = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setSegundos((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          volver('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pop-up-container" style={{backdropFilter:'blur(6px)', background:'rgba(30,32,38,0.70)'}}>
      <div style={{
        background:'#fff',
        borderRadius: '18px',
        boxShadow: '0 4px 32px #0002',
        padding: '2.5rem 2.2rem 2.2rem 2.2rem',
        minWidth: 320,
        maxWidth: 380,
        width: '95vw',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        gap:'1.2rem',
        border:'1px solid #ececec',
        position:'relative',
        animation:'fadeInScale 0.7s cubic-bezier(.4,1.6,.6,1)'
      }}>
        <div style={{marginBottom:'0.5rem', marginTop:'-1.2rem'}}>
          <LogoIcon prop={true}/>
        </div>
        <div style={{fontSize:'2.2rem',color:'#22c55e',marginBottom:'0.2rem',marginTop:'-0.5rem'}}>✔️</div>
        <h2 style={{fontWeight:700, fontSize:'1.25rem', color:'#222', textAlign:'center', margin:'0 0 0.5rem 0'}}>Archivo subido con éxito</h2>
        <div style={{width:'100%',height:1,background:'#ececec',margin:'0.7rem 0'}}></div>
        <div style={{fontSize:'1rem',color:'#444',marginBottom:'0.7rem',textAlign:'center'}}>Serás redirigido al inicio en <b>{segundos}</b> segundos</div>
        <button style={{
          background:'#222',
          color:'#fff',
          border:'none',
          borderRadius:8,
          padding:'0.7em 1.5em',
          fontSize:'1rem',
          fontWeight:500,
          marginTop:'0.5rem',
          cursor:'pointer',
          letterSpacing:'0.01em',
          transition:'background 0.2s',
          boxShadow:'none',
        }} onClick={()=>volver('/')}>Ir al inicio ahora</button>
      </div>
      <style>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}