
export class Validator {
    static password(password){
     let res = Check.containNumbers(password)
     if(res == false) {
        return {error:true,message:'La contraseña debe contener al menos 1 numero'}
     }
     let lengh = Check.length(password)
     if(lengh < 8){
        return {error:true,message:'La contraseña es demasiado corta'}
     }
      if(lengh < 8){
        return {error:true,message:'La contraseña es demasiado corta'}
     }
     let mayu = Check.containMayus(password)
     if(mayu == false){
        return {error:true,message:'La contraseña debe contener al menos 1 caracter mayuscula'}
     }
     let min = Check.containMin(password)
     if(min == false) {
         return {error:true,message:'La contraseña debe contener al menos 1 caracter minuscula'}
     }
     let especial = Check.containEspecial(password) 
     if(especial == false) {
        return {error:true,message:'La contraseña debe contener al menos 1 caracteres especial [!"#%&-_+*¡¿]'}
     }
     else {
        return {error:false,message:'Todo Ok!'}
     }

    }
}


export class Check {
    static containNumbers (password) {
        return /[0-9]/.test(password)
    }
    static length (password) {
        return password.length
    }
    static containMayus (password) {
        return /[A-Z]/.test(password)
    }
    static containMin (password) {
         return /[a-z]/.test(password)
    }
    static containEspecial (password) {
        return /[!"#$%\-_+*?&¡¿]/.test(password)
    }
}