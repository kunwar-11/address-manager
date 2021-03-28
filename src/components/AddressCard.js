import React from 'react'

export const AddressCard = ({details : {id , name , area , city , state , country , mobile , pinCode}}) => {
    return (
        <div className = 'card card__text' style = {{display : 'flex' , justifyContent : 'space-between' , backgroundColor : 'white' , margin : '1rem'}}>
            <div className="card__body__container">
            <h3 className="card__header">{name}</h3>
            <p className="card__body">{`${area} , ${city} , ${state} , ${country}`}</p>
            <p className="card__body">{`pin : ${pinCode}`}</p>
            <p className="card__body">{`Phone : ${mobile}`}</p>
        </div>
        <div style = {{display : 'flex' , justifyContent : 'space-evenly'}}>
            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-secondary">Remove</button>
        </div>
        </div>
    )
}

