import React from 'react'
import "./Products.css"
import {Grid, Box} from "@mui/material";
import { ProductCard } from "./"



const Products = ({ filteredProducts, allProducts, setCartItems, cartItems }) => {
    
  return (
    <Grid container spacing={2} sx={{padding:"1rem"}} >
      {filteredProducts?.length === 0? (<Box className="filter-nothing-found">Nothing Found...</Box>) : (
        filteredProducts.map((product)=>(
          <Grid item lg={3} md={4} sm={5} xs={10} key={product.id} >
            <Box
             className="individual-product"
            >
              <ProductCard
               product={product}
               allProducts={allProducts}
               setCartItems={setCartItems}
               cartItems={cartItems}
              />
            </Box>
          </Grid>
        ))
      )}
    </Grid>
  )
}

export default Products