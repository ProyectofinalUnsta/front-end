export function useElementsMethods () {


    const handleDoubleClick = (state) => {
        state(true);
      };
    
      const handleBlur = (state,state2,prop) => {
        state(false);
        if(prop == true) {
            state2(false)
        }
    
    
      };
    
      const handleKeyDown = (e,state) => {
        if (e.key === 'Enter') {
            state(false);
        }
      };
    



    return {handleKeyDown,handleBlur,handleDoubleClick}
}