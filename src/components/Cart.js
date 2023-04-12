import "./Cart.css";
import { Header } from "./";
import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Typography, IconButton, Stack } from "@mui/material";


// Item quantity toggler component...
const ItemQuantity = ({ addQuantity, substractQuantity, quantity, id, setCartItems, stock }) => {

  return(
    <Stack
     className="item-quantity-increase-decrease"
     spacing={2}
     direction="row"
    >
      <IconButton
       onClick={()=>{substractQuantity( setCartItems, id, 1, quantity)}}
      >
        <RemoveIcon />
      </IconButton>
      <span >{quantity}</span>
      <IconButton
       onClick={()=>{addQuantity( setCartItems, id, 1, quantity, stock)}}
      >
        <AddIcon />
      </IconButton>
    </Stack>
  )
}


// Cart component...
const Cart = ({cartItems, setCartItems}) => {

  const [totalAmount, setTotalAmount] = useState(0);

  const getTotalAmount = (cartItems) =>{
    if(cartItems.length === 0){
      return;
    }
    
    const totalCost = cartItems.map((item)=>{
      return item.price * item.qty;
    })

    const sumTotal = totalCost.reduce((initial, current)=>{
      return initial + current;
    })

    return sumTotal;
  }

  useEffect(()=>{
    const total = getTotalAmount(cartItems);

    if(total){
      setTotalAmount(total);
    }
  }, [cartItems])
  


  // Delete cart Items from cart...
  const deleteItemFromCart = (cartItems, setCartItems, id)=>{

    const newCartItemList = cartItems.filter((item)=>{
      return item.id !== id;
    })

    setCartItems(newCartItemList);
  }

  //Function to increase item quantity...
  const addQuantity = ( setCartItems, id, add, quantity, stock) =>{
    if(quantity <= stock){
      setCartItems((previous)=>{
        const productIndex = previous.findIndex(item => {
          return item.id === id;
        })
        if(productIndex !== -1){
          previous[productIndex].qty += add; 
        }
  
        return [...previous];
      })
    }
    else{
      alert(`sorry only ${stock} can be ordered due to limited stock`)
    }
  }

  //Function to decrease the quantity...
  const substractQuantity = ( setCartItems, id, substract, quantity) =>{
    if(quantity > 1){
      setCartItems((previous)=>{
        const productIndex = previous.findIndex((item)=>{
          return item.id === id;
        })
        if(productIndex !== -1){
          previous[productIndex].qty -= substract;
        }
  
        return [...previous];
      })
    }
    else(alert("if you wish to remove the item... please click the delete button"))
  }


  return (
    <Box className="container-cart">
      <Header cartItems={cartItems} />
      <Box className="heading-cart">
        <Typography
         variant='h5'
         fontWeight="600"
        >
          Shopping cart
        </Typography>
      </Box>
      <Box className="cart-items">
          {!cartItems?.length? (
            <Box className="empty-cart-message">
              <Typography
               variant="h4"
              >
                There's nothing in the cart...
              </Typography>
            </Box>
          ) : (
            cartItems.map((item)=>(
              ( 
                <Box key={item.id} className="item">
                  {/* {console.log(item.qty)} */}
                  <Box className="item-image">
                    <img src={item.imageURL} alt={item.name} width="100%" height="100%" />
                  </Box>

                  <Box className="price-name">
                    <Typography
                    sx={{px:"1rem"}}
                    fontWeight="600"
                    >
                      {item.name}
                    </Typography>

                    <Typography fontWeight="600" >
                      {item.currency} {item.price}
                    </Typography>
                  </Box>

                  <ItemQuantity
                   addQuantity={addQuantity}
                   substractQuantity={substractQuantity}
                   quantity={item.qty}
                   stock={item.quantity}
                   cartItems={cartItems}
                   id={item.id}
                   setCartItems={setCartItems}
                  />

                  <Typography fontWeight="600"  className="total-cost">
                    {"Total Cost: "}{item.qty * item.price}
                  </Typography>

                  <IconButton
                   className="btn-delete"
                   onClick={()=>{deleteItemFromCart(cartItems, setCartItems, item.id)}}
                  >
                    <DeleteForeverIcon fontSize="large"/>
                  </IconButton>
                </Box>
              )
            ))
          )}
          <hr />
      </Box>
        <Box
         className="total-cart-cost-section"
        >
          <Typography
           className="total-cart-amount" 
           fontWeight="600"
          >
            Total cart amount: INR {" "}
            {totalAmount}
          </Typography>
        </Box>

    </Box>
  )
}

export default Cart