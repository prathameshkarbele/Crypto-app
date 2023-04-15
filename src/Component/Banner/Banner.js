import React from 'react'
import { Container, Typography } from "@mui/material"
  import Carousel from './Carousel'

const Banner = () => {
  return (
    <div className='banner'>
          <Container className = "bannerContent">
          <div className='tagline'>
            <Typography variant='h2' style={{
              fontWeight :"bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}> Crypto Hunter

            </Typography>
            <Typography variant='subtitle2'
             style={{
              color: "darkgray",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
             }}>
             Get all the Info regarding your favorite Crypto Currency..
            </Typography>
          </div>
          <Carousel />
      </Container> 
    </div>
  )
}

export default Banner