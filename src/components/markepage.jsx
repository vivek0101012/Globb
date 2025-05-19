import { useEffect, useState } from "react";
import YouTube from "./skeleton";
import { StockContext } from "../context/Stocklistcontext";
import { useContext } from "react";
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const BuyPopup = ({ isOpen, onClose, symbol, price, onBuy }) => {
    const [quantity, setQuantity] = useState(1);
    const { user } = useAuth();
    const [userBalance, setUserBalance] = useState(0);
    const totalAmount = price * quantity;

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                if (user?.userId && isOpen) {
                    const response = await fetch(`${BACKEND_URL}/api/data/portfoliodata/${user.userId}`);
                    const data = await response.json();
                    if (data.status) {
                        setUserBalance(data.data.userBalance);
                    }
                }
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, [isOpen, user?.userId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg border-2 border-gray-700 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Buy {symbol}</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <span className="text-2xl">×</span>
                    </button>
                </div>
                
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Current Price:</span>
                        <span className="font-semibold">${price?.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-400">Available Balance:</span>
                        <span className="font-semibold">${userBalance?.toFixed(2)}</span>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Quantity to Buy
                        </label>
                        <div className="flex items-center space-x-2">
                            <button 
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-20 px-2 py-1 bg-gray-700 rounded text-center"
                            />
                            <button 
                                onClick={() => setQuantity(prev => prev + 1)}
                                className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between text-lg font-bold text-green-400">
                        <span>Total Amount:</span>
                        <span>${totalAmount?.toFixed(2)}</span>
                    </div>

                    {totalAmount > userBalance && (
                        <p className="text-red-400 text-sm">
                            Insufficient balance for this purchase
                        </p>
                    )}

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onBuy(quantity)}
                            disabled={totalAmount > userBalance}
                            className={`px-4 py-2 rounded-lg ${
                                totalAmount > userBalance
                                    ? 'bg-gray-600 cursor-not-allowed'
                                    : 'bg-green-600 hover:bg-green-700'
                            }`}
                        >
                            Confirm Purchase
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Market() {
  const { addstocks, removestocks, decreasecount, changeBalance } = useContext(StockContext);
  const { user } = useAuth(); // Add this line to get user context
  const [selectedStock, setSelectedStock] = useState(null);
  const [isBuyPopupOpen, setBuyPopupOpen] = useState(false);

  const stockSymbols = [
    "AAPL", "MSFT", "AMZN", "GOOGL", "TSLA", "META", "NVDA", "BRK.B", "JNJ", "JPM",
    "V", "PG", "UNH", "HD", "MA", "PFE", "KO", "DIS", "NFLX", "CRM",
    "INTC", "PYPL", "ABBV", "CSCO", "NKE", "XOM", "WMT", "AMD", "BA", "IBM",
    "PEP", "T", "VZ", "MRK", "ORCL", "CAT", "CVX", "LLY", "COST", "UPS",
    "HON", "TMO", "MDT", "BMY", "DHR", "LIN", "UNP", "GS", "RTX", "ADP",
    "ELV", "SPGI", "ZTS", "AMGN", "C", "ABT", "CB", "MO", "PLD", "DE",
    "AMT", "SCHW", "USB", "SO", "MMC", "TXN", "BKNG", "PGR", "LOW", "GE",
    "BSX", "GILD", "LMT", "FIS", "ADI", "DUOL", "ATVI", "ITW", "MCD", "MAR",
    "MS", "AXP", "SYK", "INTU", "TJX", "REGN", "CME", "WM", "CCI", "F",
    "HUM"
  ];

  const [sym, setsym] = useState(stockSymbols.slice(0, 19))
  let currentindex = 20;

  const [query, setQuery] = useState("");
  const [querym, setQuerym] = useState("");
  const [isloading, setloading] = useState(false)
  const [isopen, setisopen] = useState(false)
  const apiKey = "cv9fb89r01qkfpsjhdj0cv9fb89r01qkfpsjhdjg";
  const [Card, setcard] = useState({})

  useEffect(() => {
    const asynfn = async () => {
      const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${querym}&token=${apiKey}`)
      const rem = await res.json();
      const data = await rem;
      setcard(data)
    }
    asynfn();
  }, [querym])

  const handleBuyClick = (symbol, price) => {
    setSelectedStock({ symbol, price });
    setBuyPopupOpen(true);
  };

  const handleBuy = async (quantity) => {
    if (!selectedStock || !user) {
      console.log('No stock selected or user not logged in');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/portfolio/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.userId,
          productName: selectedStock.symbol,
          price: selectedStock.price,
          quantity: quantity
        })
      });

      const data = await response.json();
      if (data.status) {
        addstocks({ title: selectedStock.symbol });
        changeBalance(-selectedStock.price * quantity);
        setBuyPopupOpen(false);
        setSelectedStock(null);
      }
    } catch (error) {
      console.error('Buy request failed:', error);
    }
  };

  const add = () => {
    setQuerym(query);
    setisopen(!isopen)
  }

  useEffect(() => {
    const handlescroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        if (currentindex + 19 <= stockSymbols.length) {
          setloading(true)
          setTimeout(() => {
            setsym((prev) => {
              const newarr = stockSymbols.slice(currentindex, currentindex + 9);
              currentindex += 19;
              return [...prev, ...newarr]
            })
            setloading(false)
          }, 1000);
        }
      }
    }
    window.addEventListener("scroll", handlescroll)
    return () => window.removeEventListener("scroll", handlescroll);
  }, [])

  return <AnimatePresence>{<motion.div className=" z-0 w-full  flex flex-col space-y-28 items-center text-white  justify-center"
    layout
  >
    <div className=" w-full ">
      <div className="flex justify-center items-center gap-2 p-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter NASDAQ ticker (e.g., AAPL, MSFT)"
            className="w-full p-3 pl-5 border border-gray-600 rounded-full 
                   bg-[#1E293B] text-white placeholder-gray-400 shadow-md
                   focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 px-5 py-2 
                   bg-blue-600 hover:bg-blue-700 active:scale-95 
                   text-white font-semibold rounded-full shadow-md 
                   transition-all duration-200"
            onClick={add}
          >
            Search
          </button>
        </div>
      </div>
    </div>

    {(isopen ? <div className=" p-6 rounded-lg border-white border-2 flex flex-col space-y-4 md:space-y-6   text-white font-satoshi justify-center items-center">
      <div className="w-full flex justify-end " onClick={() => { setisopen(!isopen) }}>      <img src="/images/close.png " className="active:scale-95" width={20} alt="" />  </div>
      <div><img src={`https://financialmodelingprep.com/image-stock/${querym}.png`} className="w-10" alt="" /></div>
      <div className=" flex space-x-2  items-center justify-center"> <h1> Current: ${Card.c ?? "N/A"}  </h1>
        <img
          className="w-4 h-4 "
          src={Card.c > Card.pc ? "/images/up.png" : "/images/down.png"}
          alt="Stock Trend"
        />  </div>
      <div className="">Previous Close: ${Card.pc ?? "N/A"}</div>
      <div className={` ${Card.c > Card.pc ? "text-green-500" : "text-red-500"
        } `} >Change: {Card.dp ? `${Card.dp}%` : "N/A"}</div>
      <div className=" flex items-center justify-center space-x-4 ">
        <button className={`px-4 py-2 text-center rounded-xl active:scale-95  bg-green-500 ${Card.c > Card.pc ? "animate-pulse" : ""} `}>  Buy</button>
        <button className={`px-4 py-2 text-center rounded-xl active:scale-95  bg-red-500 ${Card.pc > Card.c ? "animate-pulse" : ""} `}>  Sell</button>
      </div>
    </div> : <></>)
    }

    <div className=" md:text-3xl text-2xl font-semibold">
      Market <span className="text-blue-500 drop-shadow-[0_0_10px_#3b82f6] shadow-sm hover:drop-shadow-[0_0_20px_#3b82f6]">Insight</span>
    </div>

    <div className="grid md:grid-cols-4  transition-transform duration-300  grid-cols-1 justify-center gap-10 ">
      {sym.map((e, index) => (
        <Stockcard 
            key={index} 
            isloading={isloading}  
            count={index % 9}  
            symbol={e}
            onBuyClick={handleBuyClick}
        />
      ))}
    </div>

    <BuyPopup
      isOpen={isBuyPopupOpen}
      onClose={() => {
        setBuyPopupOpen(false);
        setSelectedStock(null);
      }}
      symbol={selectedStock?.symbol}
      price={selectedStock?.price}
      onBuy={handleBuy}
    />
  </motion.div>
  }</AnimatePresence>
}

const Stockcard = ({ symbol, count, isloading, onBuyClick }) => {
  const { addstocks, removestocks, Balance, setBalance, decreasecount, changeBalance } = useContext(StockContext);
  const keys = JSON.parse(import.meta.env.VITE_API_KEYS || "[]");
  const [isBuyPopupOpen, setBuyPopupOpen] = useState(false);
  const { user } = useAuth(); // Add this to get user context

  const [Card, setcard] = useState({})
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const asynfn = async () => {
      const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${keys[count]}`)
      const rem = await res.json();
      const data = rem;
      setcard(data)
    }
    asynfn();
  }, [symbol])

  if (Card.pc === undefined || Card.pc === null) {
    return <></>;
  }

  const handleBuy = async (quantity) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/portfolio/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.userId,
          productName: symbol,
          price: Card.c,
          quantity: quantity
        })
      });

      const data = await response.json();
      if (data.status) {
        addstocks({ title: symbol });
        changeBalance(-Card.c * quantity);
        setBuyPopupOpen(false);
        setQuantity(1); // Reset quantity after purchase
      }
    } catch (error) {
      console.error('Buy request failed:', error);
    }
  };

  // Trading buttons component
  const TradingButtons = () => (
    <div className="flex items-center justify-center">
      <button
        className={`px-4 py-2 hover:bg-green-400 transition-all duration-300 text-center rounded-xl active:scale-95 bg-green-600 ${Card.c > Card.pc ? "animate-pulse" : ""}`}
        onClick={() => onBuyClick(symbol, Card.c)}
      >
        Buy
      </button>
    </div>
  );

  // Login prompt component
  const LoginPrompt = () => (
    <div className="flex flex-col items-center space-y-2">
      <Link
        to="/login"
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-center rounded-xl active:scale-95"
      >
        Login to Trade
      </Link>
      <p className="text-sm text-gray-400">Sign in to start trading</p>
    </div>
  );

  // Update Stockcard component return statement
  return (isloading ? (<YouTube />) : (
    <motion.div
      className="bg-gradient-to-br from-white/10 to-white/5
    backdrop-blur-md hover:scale-105 transition-transform duration-300  
    p-6 rounded-lg border border-white/10 shadow-md shadow-white/10
    flex flex-col space-y-4 md:space-y-8 text-white font-satoshi 
    justify-center items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <div><img src={`https://financialmodelingprep.com/image-stock/${symbol}.png`} className="w-10 h-10" alt="" /></div>

      <div className="text-sm md:text-lg flex space-x-2 items-center justify-center">
        <h1>Current: ${Card.c ?? "N/A"}</h1>
        <img
          className="w-4 h-4"
          src={Card.c > Card.pc ? "/images/up.png" : "/images/down.png"}
          alt="Stock Trend"
        />
      </div>

      <div className="text-sm md:text-lg">Previous Close: ${Card.pc ?? "N/A"}</div>
      <div className={`text-sm md:text-lg ${Card.c > Card.pc ? "text-green-500" : "text-red-500"}`}>
        Change: {Card.dp ? `${Card.dp}%` : "N/A"}
      </div>

      {user ? <TradingButtons /> : <LoginPrompt />}

      <BuyPopup
        isOpen={isBuyPopupOpen}
        onClose={() => setBuyPopupOpen(false)}
        symbol={symbol}
        price={Card.c}
        onBuy={(quantity) => {
          handleBuy(quantity);
          setBuyPopupOpen(false);
        }}
      />
    </motion.div>
   ));
}


