import { createContext, useState} from "react";

export const ServerContext = createContext()


export const ServerProvider = ({children}) => {
const [server,setServer] = useState(0)
const [emailsender,setEmailSender] = useState(0)
const [imageconverter,setImageConverter] = useState(0)
    return(
        <ServerContext.Provider value={{
          setServer,
          setEmailSender,
          setImageConverter
        }}>
          {children}
        </ServerContext.Provider>
    )
}