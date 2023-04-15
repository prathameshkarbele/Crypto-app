import { LinearProgress, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { numberWithCommas } from '../Component/Banner/Carousel';
import CoinInfo from '../Component/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../Cryptocontext';
// import ReactHtmlParser from "react-html-parser";


const CoinPages = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState()
 
  
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  }

  console.log(coin);

  useEffect(()=>{
    fetchCoin()
  }, []);

if(!coin) return <LinearProgress style={{backgroundColor: "gold"}} />;

  return (
    <div className='coinpage'>
       <div className='sideBar'>
         <img 
          src={coin?.image.large}
          alt ={coin?.name}
          height = "200"
          style={{ marginBottom: 20 }}
         />
         <Typography variant='h3' className='heading-side'>
          {coin?.name}
         </Typography>

         <Typography variant='subtitle1' className='discription'>
            {(coin?.description.en.split(". ")[0])}.
         </Typography>

         <div className='market-data'>
             <span style={{display: "flex"}}>
                <Typography variant='h5' className='heading'>
                Rank :
                </Typography>
                &nbsp; &nbsp;
                <br /><br />

                <Typography variant='h5' style={{fontFamily: "Montserrat"}}>
                {coin?.market_cap_rank}

                </Typography>

             </span>

             <span style={{display: "flex"}}>
                <Typography variant='h5' className='heading'>
                Current Price :
                </Typography>
                &nbsp; &nbsp;
                <br /><br />
                <Typography variant='h5' style={{fontFamily: "Montserrat"}}>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
                </Typography>
             </span>

             <span style={{display: "flex"}}>
                <Typography variant='h5' className='heading'>
                Market Cap{" "} :
                </Typography>
                &nbsp; &nbsp;
                <br /><br />
                <Typography variant='h5' style={{fontFamily: "Montserrat"}}>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
                )}
               M
               </Typography>
             </span>
             
         </div>
       </div>
        {/* chart */}
        <CoinInfo coin ={coin} />
    </div>
  )
}

export default CoinPages
{/* <img src ={coin?CoinInfo.image.large} alt ={coin?CoinInfo.name} 
         height="200"
         style={{ marginBottom: 20 }} */}