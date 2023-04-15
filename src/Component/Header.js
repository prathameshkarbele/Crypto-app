import React from 'react'
import { useNavigate } from "react-router-dom";
import {AppBar, Container,createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography} from "@mui/material"
import { CryptoState } from '../Cryptocontext';


const Header = () => {
  const navigate = useNavigate();

  // useContext use here
  const {currency, setCurrency} = CryptoState();

  console.log(currency);

  function handleClick() {
    navigate(-1);
  }

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
         <AppBar color="transparent" position='static'>
      <Container>
        <Toolbar >
          <Typography className="title" variant="h5" onClick={handleClick}>
          Crypto Hunter
          </Typography>
          <Select 
           variant="outlined"
               style={{
                width: 100,
                 height: 40,
                 marginRight: 15,
               }}
               value={currency}
               onChange={(e) => setCurrency(e.target.value)}
          >
              <MenuItem value={"USD"}>USD</MenuItem>
               <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
    
  )
}

export default Header