import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categorizeIngredients } from '../Util/categorizeIngredients';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../State/Cart/Action';

const demo = [
    {
        category:"Nuts & Seeds",
        ingredient:["Cashew","Peanuts"]
    },
    {
        category:"Bread",
        ingredient:["Naan","Roti","Bhakri","Chapati"]
    },
] 


const MenuCard = (item) => {
    const dispatch = useDispatch();
    
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleCheckboxChange = (itemName) => {
    console.log("value",itemName)
    if (selectedIngredients.includes(itemName)) {
      //console.log("yes");
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== itemName)
      );
    } else {
      //console.log("no");
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  };
    const handleAddItemToCart = (e) => {
      console.log("menuItemId:" ,item.item.id)
      console.log("SelectedIngredients", selectedIngredients);  
      e.preventDefault();

        const reqData = {
          token: localStorage.getItem("jwt"),
          cartItem: {
            foodId: item.item.id,
            quantity: 1,
            ingredients:selectedIngredients
          },
        };
        console.log("reqData",reqData)
        dispatch(addItemToCart(reqData));
      };
      
      
  return (
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className='lg:flex items-center justify-between'>
            <div className='lg:flex items-center lg:gap-5'>
                <img className='w-[7rem] h-[7rem] object-cover' src={item.item.images[0]} alt="" />
                <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                    <p className='font-semibold text-xl'>
                        {item.item.name}
                        </p>
                    {/* {console.log("name",item.item.images)} */}
                    <p>₹{item.item.price}</p>
                    <p className='text-gray-400'>{item.item.description}</p>

                </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
            <form onSubmit={handleAddItemToCart}>
                <div className='flex gap-5 flex-wrap'>
                  {      
                     Object.keys(categorizeIngredients(item.item.ingredients)).map((category) => 
                      <div>
                        <p>{category}</p>
                        <FormGroup>
                          {categorizeIngredients(item.item.ingredients)[category].map((item)=>
                          <FormControlLabel key={item.id} control={
                          <Checkbox onChange={()=>handleCheckboxChange(item)}/>} label={item.name} />)}    
                        </FormGroup>
                      </div>
                      )
                  }
                </div>
                <div className='pt-5 '>
                    <Button variant='contained' disabled={false} type='submit' onClick={handleAddItemToCart}>{true?"Add to Cart":"Not Available" } </Button>
                </div>
            </form>
        </AccordionDetails>
      </Accordion>
  )
}

export default MenuCard