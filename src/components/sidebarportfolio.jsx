import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function Sidebarportfolio() {
    const { user } = useAuth();
    const [portfolioData, setPortfolioData] = useState(null);
    const [aggregatedData, setAggregatedData] = useState(null);
    const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
    const [currentPrices, setCurrentPrices] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expand, setexpand] = useState(false);
    const apiKey = "cv9fb89r01qkfpsjhdj0cv9fb89r01qkfpsjhdjg";

    useEffect(() => {
        if (user && user.userId) {
            fetchAllPortfolioData();
        }
        // eslint-disable-next-line
    }, [user]);

    // Fetch portfolio data and then current prices
    const fetchAllPortfolioData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:3000/api/data/portfoliodata/${user.userId}`);
            const data = await response.json();
            if (data.status) {
                setPortfolioData(data.data);
                setAggregatedData(data.data.statistics);
                setTotalPortfolioValue(data.data.statistics.totalCurrentValue || 0);
                if (data.data.portfolios.length > 0) {
                    fetchCurrentPrices(data.data.portfolios);
                }
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch current prices for all products
    const fetchCurrentPrices = async (portfolios) => {
        const prices = {};
        for (const portfolio of portfolios) {
            try {
                const response = await fetch(
                    `https://finnhub.io/api/v1/quote?symbol=${portfolio.productName}&token=${apiKey}`
                );
                const data = await response.json();
                if (data.c) {
                    prices[portfolio.productName] = data.c;
                }
            } catch (error) {
                // Ignore individual errors
            }
        }
        setCurrentPrices(prices);
    };

    // Calculate stats
    const getPortfolioStats = () => {
        if (!portfolioData || !aggregatedData) return null;
        const totalInvestment = portfolioData.statistics.totalInvested;
        const currentBalance = totalPortfolioValue;
        const profitLoss = currentBalance - totalInvestment;
        const percentageChange = ((currentBalance - totalInvestment) / totalInvestment) * 100;
        return {
            totalInvestment,
            currentBalance,
            profitLoss,
            percentageChange,
            totalStocks: portfolioData.portfolios.length
        };
    };

    const stats = getPortfolioStats();

    const portfolioOverview = stats ? [
        {
            "title": "Total Investment",
            "value": `$${stats.totalInvestment.toFixed(2)}`
        },
        {
            "title": "Current Value",
            "value": `$${stats.currentBalance.toFixed(2)}`
        },
        {
            "title": "Total Profit/Loss",
            "value": `${stats.profitLoss >= 0 ? '+' : ''}$${stats.profitLoss.toFixed(2)}`
        },
        {
            "title": "Overall Change (%)",
            "value": `${stats.percentageChange.toFixed(2)}%`
        },
        {
            "title": "Total Stocks",
            "value": stats.totalStocks
        }
    ] : [];

    return (
        <div className="py-4 sm:mt-2 max-h-screen mt-2 font-lemonMilk text-white/70 rounded-2xl bg-gray-900">
            <div className="flex flex-col md:w-[280px] px-2 py-2 space-y-2">
                <div className="bg-gray-950 border-gray-800 border rounded-2xl backdrop-blur-md hover:scale-105 transition-transform duration-300 p-4 border-white/10 flex flex-col space-y-4 md:space-y-6 text-white font-satoshi justify-center items-center">
                    <div className="text-center md:text-3xl text-xl font-semibold">
                        <span className="text-blue-500 drop-shadow-[0_0_10px_#3b82f6] shadow-sm hover:drop-shadow-[0_0_20px_#3b82f6]">Balance</span>
                    </div>
                    {error && (
                        <div className="p-2 bg-red-500/20 text-red-400 rounded-lg w-full text-center">{error}</div>
                    )}
                    {loading ? (
                        <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg w-full text-center">Loading...</div>
                    ) : (
                        <>
                            <div className="space-y-2 text-center">
                                <p className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent text-4xl font-bold">
                                    ${stats?.currentBalance.toFixed(2) || '0.00'}
                                </p>
                            </div>
                            <div className="text-center flex text-lg">
                                <p>Total Profit/Loss</p>
                                <p className={`mx-2 ${stats?.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {stats?.profitLoss >= 0 ? '+' : '-'}${Math.abs(stats?.profitLoss || 0).toFixed(2)}
                                </p>
                            </div>
                            <div className="flex items-center justify-center flex-col w-full">
                                {!expand && (
                                    <button
                                        className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                                        onClick={() => setexpand(true)}
                                    >
                                        <FiChevronDown size={24} />
                                    </button>
                                )}
                                <AnimatePresence>
                                    {expand && portfolioOverview.length > 0 && (
                                        <motion.div
                                            className="w-full duration-300 transition-all flex flex-col space-y-4"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                            layout
                                        >
                                            {portfolioOverview.map((e, index) => (
                                                <motion.div
                                                    className="bg-gray-900 rounded-xl py-3 px-4 text-left hover:bg-gray-800/50 transition-colors"
                                                    key={index}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <p className="text-sm text-gray-400">{e.title}</p>
                                                    <p className="text-lg font-semibold mt-1">{e.value}</p>
                                                </motion.div>
                                            ))}
                                            <motion.button
                                                className="p-2 rounded-full hover:bg-gray-800 transition-colors mt-2"
                                                onClick={() => setexpand(false)}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <FiChevronUp size={24} />
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

<span className={`font-bold ${
  (currentPrices[selectedStock.productName] * sellQuantity - selectedStock.statistics.averagePrice * sellQuantity) > 0
    ? 'text-green-400'
    : 'text-red-400'
}`}>
  ${(
    (currentPrices[selectedStock.productName] * sellQuantity) -
    (selectedStock.statistics.averagePrice * sellQuantity)
  ).toFixed(2)}
</span>