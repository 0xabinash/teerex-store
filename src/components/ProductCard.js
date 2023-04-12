import React, {useState} from 'react'
import "./ProductCard.css"
import {addToCart} from "./Home"
import {Card, CardMedia, CardActions, CardContent, Button, Typography} from "@mui/material"

const ProductCard = ({product, allProducts, setCartItems, cartItems}) => {
  const {price, currency, imageURL, name } = product;
 
  return (
    <Card>
      <CardMedia component="img" image={imageURL} alt={name} height={200} />
      <CardContent
       sx={{padding:"0.5rem"}}
      >
        <Typography
         variant="subtitle1"
         fontWeight="600"
        >
          {name}
        </Typography>
      </CardContent>
      <CardActions
       className="card-action-section"
      >
        <Typography
         variant="subtitle2"
        >
          {currency} {price}
        </Typography>
        <Button
         variant="contained"
         onClick={()=>{addToCart(product, 1, setCartItems, cartItems)}}
        >
          Add TO CART
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard