import React from "react";
import "./Header.css"
import {Link, useNavigate} from "react-router-dom";
import {Box, Typography, IconButton, Button} from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = ({cartItems}) => {
    const navigate = useNavigate();

    return (
        <Box className="container-header">
            <Link to="/" style={{textDecoration:"none"}} >
                <Typography
                 fontWeight="600"
                >
                    TeeRex Store
                </Typography>
            </Link>
            <Box className="inner-container">
                <Button
                 onClick={()=>{navigate("/")}}
                >
                    Products
                </Button>
                <IconButton
                 size="large"
                 onClick={()=>{navigate("/cart")}}
                >
                    <ShoppingCartIcon fontSize="large" />
                    <Typography
                     className="cart-items-count"
                     fontWeight="600"
                    >
                        {cartItems?.length}
                    </Typography>
                </IconButton>
            </Box>
        </Box>
    )
}

export default Header;