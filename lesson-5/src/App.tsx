import React, {useState, useEffect} from 'react';
import {useQuery} from 'react-query';

type BitcoinData = {
  '15m': number;
  buy: number;
  last: number;
  sell: number;
  symbol: string;
 };
 
type Currencies = {
  [key: string]: BitcoinData;
 }



const INTERVAL_TIME = 30000; //30 sec
//fetch function
const getBCData = async () : Promise<Currencies> => 
 await (await fetch('https://blockchain.info/ticker')).json();




const App = () => {
  const [currency, setCurrency] = useState('USD');
  const handleCurrencySelection = (e: any) => {
    setCurrency(e.target.value);
  }
  const { data, isLoading, error, refetch } = useQuery<Currencies>(
    'bc-data', getBCData
  );
  
  console.log(data);

  useEffect(() => {
    const interval = setInterval(refetch, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, [refetch]);
  return(
    <React.Fragment>
    <h2>Bitcoin Price</h2>
    <select value={currency} onChange = {handleCurrencySelection}>
      {data && Object.keys(data).map(currency => (
        <option key = {currency} value = {currency}>
          {currency}
        </option>
      ))}
     {/* want to map through the data and want the keys from the object to be the options */}
      </select>
    <div>
     <h2>
       {data&&data[currency].symbol}
       {data&&data[currency].last}
     </h2>
   </div>

    </React.Fragment>
  )
}
export default App;
