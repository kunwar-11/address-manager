import React , {useEffect, useState} from 'react'
import {useAddress} from './context/addressContext'
import {AddressForm , AddressCard} from './components'
import './styles/App.css'
import axios from 'axios'
function App() {
  const {address , setAddress, isForm , setIsForm} = useAddress()
  const [loading , setLoading] = useState('loaded')
  
  useEffect(() => {
    (async () => {
      try {
        setLoading('loading')
        const {data : {addresses}} = await axios.get('/api/addresses');
        console.log(addresses)
        setAddress(prev => prev.concat(addresses))
      } catch (error) {
         alert(error)
      }
      finally {
        setLoading('loaded')
      }
    })()
  }, [setAddress])
  return (
    <div className="App">
        <button onClick = {() => setIsForm(!isForm)}>{!isForm ? "Add New Address" : "Back To Your Address"}</button>
        {loading === 'loading' ? <h1>Loading....</h1> : !isForm ? <div style = {{display : 'flex', flexWrap : 'wrap'}}>{address.map(each => <AddressCard key = {each.id} details = {each}/>)}</div>  : <AddressForm />}
    </div>
  );
}

export default App;
