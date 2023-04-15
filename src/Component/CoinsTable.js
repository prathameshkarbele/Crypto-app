import {
  Container,
  createTheme,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
// import TextField from '@mui/material/TextField';
// import { Container } from '@mui/system';
// import { Container, createTheme, ThemeProvider } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../config/api";
// import { ThemeProvider } from 'styled-components';
// import { CoinList } from "../Config/api";
import { CryptoState } from "../Cryptocontext";
import {numberWithCommas } from "./Banner/Carousel"
const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  let navigate = useNavigate();

  // function hand() {
  //   navigate(`/coins/${row.id}`);
  // }

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  // const useStyles = makeStyles(()=>({

  // }))
  // const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <Container className="coinsTable">
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().slice((page - 1) * 10, (page -1 )* 10 + 10).map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      className="table"
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                      >
                        <img
                         src={row?.image}
                         alt ={row.name}
                         height = "50"
                         style={{marginBottom: 10 }}
                         />
                         <div className="subtable">
                          <span className="spanTable">
                            {row.symbol}
                          </span>
                          <span style= {{ color: "darkgray" }} >{row.name}</span>
                         </div>
                      </TableCell>
                      <TableCell align="right" >
                        {symbol}{" "}
                      {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell 
                       align="right"
                       style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                       }}
                      >
                      {profit && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                      {symbol}{" "}
                      {numberWithCommas(
                        row.market_cap.toString().slice(0, -6)
                      )}
                        M
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <br />
        <Pagination  className = "paganation"
          count={(handleSearch()?.length/10).toFixed(0)}
          color="primary"
          onChange={(_, value) =>{
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;

