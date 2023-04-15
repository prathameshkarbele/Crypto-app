import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header";
import HomePage from "./Pages/HomePage";
import CoinPages from "./Pages/CoinPages";

// import { makeStyles } from "@mui/material";
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';


function App() {  
   
  //  const classes = useStyle();
  return ( 
    <div className='main'>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coins/:id" element={<CoinPages />}  />
      </Routes>
   
    </div>
   )
}

export default App;
