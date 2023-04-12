import React from 'react'
import "./Filters.css"
import { Box, Typography, Button } from "@mui/material"




const Filters = ({colorFilter, genderFilter, priceFilter, typeFilter, handleInput}) => {
  
  return (
    <Box className="container-filters">
      <Box className="color-filter">
        <Typography
         fontWeight="600"
        >
          Colour
        </Typography>

        {colorFilter.map((color)=>(
          <Box key={color}>
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
            <br/>
          </Box>
        ))}
      </Box>

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
            <br/>
          </Box>
        ))}
      </Box>

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
            <br/>
          </Box>
        ))}
      </Box>

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
            <br/>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Filters