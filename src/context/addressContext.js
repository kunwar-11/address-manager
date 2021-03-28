import { createContext , useContext, useState} from 'react'

const Address = createContext();

export const AddressProvider = ({children}) => {
    const [address , setAddress] = useState([])
    const [isForm , setIsForm] = useState(false)
    return (
        <Address.Provider value ={{address , setAddress , isForm , setIsForm}}>
            {children}
        </Address.Provider>
    )
}

export const useAddress = () => useContext(Address)