import {Header, Products, Filters} from "./"
import "./Home.css"
import axios from "axios"
import React, {useEffect, useState, useContext} from "react";
import { Typography, TextField, IconButton, CircularProgress,
         Box, Grid, Dialog, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import {Search, FilterAlt} from "@mui/icons-material"

//Filter label array...
  const colorFilter = ["All", "Red", "Blue", "Green"];
  const genderFilter = ["Both", "Men", "Women"];
  const priceFilter = ["No Range", "0-250", "251-450", "450"];
  const typeFilter = ["All", "Polo", "Hoodie", "Basic"];

// Check if the item is already in cart...
const includes = (cartItems, product)=>{

    const isPresent = cartItems.find((item)=>{
        return item.id === product.id;
    })
    if(isPresent){
        return true;
    }
    else{
        return false;
    }
}

//Add to cart function...
export const addToCart = ( product, quantity, setCartItems, cartItems ) => {

    if(includes(cartItems, product)){
        alert("Item is already in cart try toggling the quantity in the cart")
        return;
    }

    const newCartItem = {...product, qty: quantity}

    setCartItems([...cartItems, newCartItem]) 

}



const Home = ({cartItems, setCartItems}) =>{
    const filtersInitialValue = {color:"All", gender:"Both", price:"No Range", clothType: "All"}
    const [searchInput, setSearchInput] = useState("");
    const [allProducts, setAllProducts] = useState([]);
    const [filters, setFilters] = useState(filtersInitialValue)
    const [showFilterDialog, setFilterDialog] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
  
    //Updating the Filters state when clicked...
    const handleInput = (event)=> {
       const name = event.target.name;
       const value = event.target.value;
       setFilters({...filters, [name]: value});
    }

    // Filtering products according to the selected filter option...
    const filterProducts = (filters, setFilteredProducts) =>{
        const {color, gender, price, clothType} = filters;

        let filteredArray = allProducts;

        if(color !== "All"){
            filteredArray = allProducts.filter((item)=>{
                return item.color === color;
            })
        }

        if(gender !== "Both"){
            filteredArray = filteredArray.filter((item)=>{
                return item.gender === gender;
            })
        }

        if(price !== "No Range"){
            const priceArray = price.split("-");
            if(priceArray[1] !== undefined){
                const lower = Number(priceArray[0]);
                const higher = Number(priceArray[1]);

                filteredArray = filteredArray.filter((item)=>{
                    return (Number(item.price) >= lower && Number(item.price) <= higher)
                })
            }
            else{
                const lower = Number(priceArray[0]);

                filteredArray = filteredArray.filter((item)=>{
                    return Number(item.price) >= lower;
                })
            }

        }

        if(clothType !== "All"){
            filteredArray = filteredArray.filter((item)=>{
                return item.type === clothType;
            })
        }

        setFilteredProducts(filteredArray);
    }



    const fet = async () =>{
        setLoadingProducts(true)
        const url = "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
        const data = await axios.get(url)
        setLoadingProducts(false)
        return data.data;
    }

    const performSearch = (searchInput, allProducts) =>{
        const searchWord = searchInput;
        let filtered;
        if(searchWord){
            filtered = allProducts.filter((item) => {
                return item.name.toLowerCase().includes(searchWord);
            })
            setFilteredProducts(filtered);
        }
        else{
            setFilteredProducts(allProducts)
        }
        
    }

    const handleSearchInput = (event, allProducts) => {
        const word = event.target.value;
        setSearchInput(word);
        if(word === ""){
            setFilteredProducts(allProducts)
        }
    }

    useEffect(()=>{
        filterProducts(filters, setFilteredProducts);
    }, [filters])

    //Fetch products and update the state variables
    useEffect(()=>{
        const callBack = async() =>{
            const productsData = await fet();
            setFilteredProducts(productsData)
            setAllProducts(productsData);
        }
        callBack();

    },[])



    return(
        <Box className="container-home">
            <Header cartItems={cartItems}  />
            <Box className="search-Box">
                <TextField 
                 size="small"
                 variant="standard"
                 label="Search here"
                 placeholder="Search for products..."
                 onChange={(event) => handleSearchInput(event, allProducts)}
                 inputProps={{
                     className: "search",
                 }}
                />
                <IconButton onClick={()=>{performSearch(searchInput, allProducts)}}>
                    <Search />
                </IconButton>
                <IconButton
                 className="filter-icon"
                 onClick={()=>{setFilterDialog(true)}}
                >
                    <FilterAlt />
                </IconButton>
            </Box>
            
            {/* Dialogue for the filters mobile view */}
            <Dialog
             open={showFilterDialog}
             onClose={()=>{setFilterDialog(false)}}
            >
                <DialogContent className="filter-dialog-box">
                <Box className="color-filter" >
                    <Typography
                    fontWeight="600"
                    >
                    Colour
                    </Typography>

                    {colorFilter.map((color)=>(
                    <Box key={color} className="color-filter-item">
                        <input
                        type="radio"
                        value={color}
                        name="color"
                        onChange={handleInput}
                        />
                        <label
                        htmlFor={color}
                        >
                        {color}
                        </label>
                        <div
                         className={filters.color === color? "selected-indicator": "not-selected"}
                         ></div>
                         <br/>
                    </Box>
                    ))}
                </Box>
                <br/>
                <Box className="gender-filter">
                    <Typography
                    fontWeight="600"
                    >
                    Gender
                    </Typography>
                    {genderFilter.map((gender)=>(
                    <Box key={gender}>
                        <input
                        type="radio"
                        value={gender}
                        name="gender"
                        onChange={handleInput}
                        />
                        <label
                        htmlFor={gender}
                        >
                        {gender}
                        </label>
                        <div
                         className={filters.gender === gender? "selected-indicator": "not-selected"}
                         ></div>
                        <br/>
                    </Box>
                    ))}
                </Box>
                <br/>
                <Box className="price-filter">
                    <Typography
                    fontWeight="600"
                    >
                    Price
                    </Typography>
                    {priceFilter.map((price)=>(
                    <Box key={price}>
                        <input
                        type="radio"
                        value={price}
                        name="price"
                        onChange={handleInput}
                        />
                        <label
                        htmlFor={price}
                        >
                        {price}
                        </label>
                        <div
                         className={filters.price === price? "selected-indicator": "not-selected"}
                         ></div>
                        <br/>
                    </Box>
                    ))}
                </Box>
                <br/>
                <Box className="itemType-filter">
                    <Typography
                    fontWeight="600"
                    >
                    Type
                    </Typography>
                    {typeFilter.map((item)=>(
                    <Box key={item}>
                        <input
                        type="radio"
                        value={item}
                        name="clothType"
                        onChange={handleInput}
                        />
                        <label
                        htmlFor={item}
                        >
                        {item}
                        </label>
                        <div
                         className={filters.clothType === item? "selected-indicator": "not-selected"}
                         ></div>
                        <br/>
                    </Box>
                    ))}
                </Box>
                </DialogContent>
                <DialogActions>
                    <Button 
                     variant="contained"
                     onClick={()=>{setFilters(filtersInitialValue)}}
                    >
                        clear Filters
                    </Button>
                    <Button 
                     variant="contained"
                     onClick={()=>{setFilterDialog(false)}}
                    >
                        Close
                    </Button>
                </DialogActions>
                
            </Dialog>
            
            {/* Container for the filter and products desktop view */}
            <Grid container>
                {
                    loadingProducts? (
                        <Box className="loading-products-home">
                            <CircularProgress />
                            <Typography variant="h4">
                                Loading...
                            </Typography>
                        </Box>
                    ): (
                        <Grid container >
                            {/* Filter section */}
                            <Grid item md={3} xm={12}>
                                <Filters
                                 colorFilter={colorFilter}
                                 genderFilter={genderFilter}
                                 priceFilter={priceFilter}
                                 typeFilter={typeFilter}
                                 handleInput={handleInput}
                                 />
                            </Grid>
                            {/* Products section */}
                            <Grid item md={9} xm={12}>
                            <Products
                                filteredProducts={filteredProducts}
                                allProducts={allProducts}
                                setCartItems={setCartItems}
                                cartItems={cartItems}
                            />
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    )
}

export default Home;