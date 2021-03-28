import React , {useEffect, useRef , useState} from 'react';
import axios from 'axios';
import '../styles/form.css'
import {countryList , states} from '../database'
import {useAddress} from '../context/addressContext'
export const AddressForm = () => {
    const val = useRef();
    const [name , setName] = useState('')
    const [area , setArea] = useState('')
    const [city , setCity] = useState('')
    const [pinCode , setPinCode] = useState('')
    const [mobile , setMobile] = useState('')
    const [errorMessage , setErrorMessage] = useState({})
    const [country , setCountry] = useState(countryList[102])
    const [state , setState] = useState(states[3])
    useEffect(() => {
        val.current.focus()
    },[])
    const {setAddress} = useAddress()
    const formValidation = () => {
        let valid = true;
        if(name.trim()) {
            setErrorMessage((errorMessage) => ({...errorMessage , name_error : ''}))
            
        }
        else {
            setErrorMessage((errorMessage) => ({...errorMessage , name_error : 'enter Name !'}))
            valid = false;
        }
        if(area.trim()) {
            setErrorMessage((errorMessage) => ({...errorMessage , area_error : ''}))
            
        }
        else {
            setErrorMessage((errorMessage) => ({...errorMessage , area_error : 'entter your address !'}))
            valid = false;
        }
        if(city.trim()) {
            setErrorMessage((errorMessage) => ({...errorMessage , city_error : ''}))
            
        }
        else {
            setErrorMessage((errorMessage) => ({...errorMessage , city_error : 'enter city !'}))
            valid = false;
        }
        if (/^[1-9][0-9]{4}[1-9]$/.test(pinCode)) {
            setErrorMessage((errorMessage) => ({
              ...errorMessage,
              pinCode_error: ""
            }));
            
          } else {
            setErrorMessage((errorMessage) => ({ ...errorMessage, pinCode_error: "Please enter valid zip code!" }));
            valid = false
          }
          if (/^(\+91)?\s?[1-9][0-9]{9}$/.test(mobile)) {
            setErrorMessage((errorMessage) => ({
              ...errorMessage,
              phoneNumber_error: ""
            }));
          } else {
            setErrorMessage((errorMessage) => ({ ...errorMessage, phoneNumber_error: "enter valid mobile number !" }));
            valid = false
          }

        return valid
    }
    const formSubmitHandler = async (e) => {
        e.preventDefault()
        if(formValidation()) {
                try {
                    const {data : {address} , status} = await axios.post('/api/addresses' , {
                        address: { 
                            name,
                            area,
                            city,
                            state,
                            country,
                            pinCode,
                            mobile
                        }
                    })
                    
                if(status === 201) {
                    setAddress(prev => prev.concat(address))
                }
                    console.log(address , status)
                } catch (error) {
                    
                }
                finally {

                }
        }

    }

    return (
        <form className = 'form' onSubmit = {formSubmitHandler}>
            {/* <div className={`input`}>
            <input type="text" ref = {val} className={`inputText ${error === 'error' ? 'error' : ''}`} placeholder="Enter Name"/>
            <small className="error__message">there is an error</small>
            </div> */}
            <div className="input">
            <select className = 'inputText' value = {country} onChange = {(e) => setCountry(e.target.value)}>
                {countryList.map((countryName) => (
                <option key={countryName} value={countryName}>
                    {countryName}
                </option>
                ))}
            </select>
            </div>
            <div className={`input`}>
            <input type="text" ref = {val} value = {name} className={`inputText`} onChange = {(e) => setName(e.target.value)} placeholder="Enter Name" />
                 <small className="error__message">{errorMessage.name_error}</small>
            </div>
            <div className="input">
                <input type="text" value = {area} className={`inputText`} onChange = {(e) => setArea(e.target.value)} placeholder="Enter House no. , street , colony" />
                 <small className="error__message">{errorMessage.area_error}</small>
            </div>
            <div className="input">
                <input type="text" value = {city} className={`inputText`} onChange = {(e) => setCity(e.target.value)} placeholder="Enter city" />
                 <small className="error__message">{errorMessage.city_error}</small>
            </div>
            <div className="input">
            <select className = 'inputText' value = {state} onChange = {(e) => setState(e.target.value)}>
                {states.map((stateName) => (
                <option key={stateName} value={stateName}>
                    {stateName}
                </option>
                ))}
            </select>
            </div>
            <div className="input">
                <input type="number" value = {pinCode} className={`inputText`} onChange = {(e) => setPinCode(e.target.value)} placeholder="Enter Pincode" />
                 <small className="error__message">{errorMessage.pinCode_error}</small>
            </div>
            <div className="input">
                <input type="number" value = {mobile} className={`inputText`} onChange = {(e) => setMobile(e.target.value)} placeholder="Enter Mobile Number" />
                 <small className="error__message">{errorMessage.phoneNumber_error}</small>
            </div>
            <div className="button">
                <button className="btn btn-primary-success" type = 'submit'>Save</button>
                <button className="btn btn-primary-danger">Reset</button>
            </div>
        </form>
    )
}
