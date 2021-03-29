import axios from 'axios'
import React, { useState } from 'react'
import {useAddress} from '../context/addressContext'
export const AddressCard = ({details : {id , name , area , city , state , country , mobile , pinCode}}) => {
    const [message , setMessage] = useState('')
    const {address , setAddress} = useAddress()
    const removeAddressHandler = async (id) => {
        try {
            setMessage('Please Wait.....')
            const {status} = await axios.delete(`/api/addresses/${id}`)
            if(status === 204) {
                 setAddress(address.filter(each => each.id !== id))
            }
        } catch (error) {
            alert(error)
        }
        finally{
            setMessage('')
        }
    }
    return (
        <>
         <small className="text__muted">{message}</small>
        <div className = 'card card__text' style = {{display : 'flex' , justifyContent : 'space-between' , backgroundColor : 'white' , margin : '1rem'}}>
           
            <div className="card__body__container">
            <h3 className="card__header">{name}</h3>
            <p className="card__body">{`${area} , ${city} , ${state} , ${country}`}</p>
            <p className="card__body">{`pin : ${pinCode}`}</p>
            <p className="card__body">{`Phone : ${mobile}`}</p>
        </div>
        <div style = {{display : 'flex' , justifyContent : 'space-evenly'}}>
            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-secondary" onClick = {() => removeAddressHandler(id)}>Remove</button>
        </div>
        </div>
        </>
    )
}

