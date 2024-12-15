import { Button, Card } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';


const AddressCard = ({item,ShowButton,handleSelectAddress}) => {
    
  return (
    <Card className='flex gap-5 w-64 p-5'>
        <HomeIcon/>
        <div className=' space-y-3 text-gray-500'>
            <h1 className='font-semibold text-lg text-white'>Home</h1>
            <p>{item.name}</p>
            {console.log("itemin address",item)}
            <p>{item.streetAddress}, {item.postalCode}, {item.state}, {item.country}
{/*               
            Shop no. 2 & 3, Pranav Omkar C.H.S, TATA Power Lane, Opp. Manav Kalyan Hospital, Dombivli East, 
            Dombivli, Maharashtra 421201, India*/}
            </p> 
            {ShowButton 
            && 
            (<Button 
            variant='outlined' 
            onClick={()=>handleSelectAddress(item)}>Select</Button>)}
        </div>
    </Card>
  )
}

export default AddressCard