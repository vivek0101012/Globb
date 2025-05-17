import { StockContext } from "../context/Stocklistcontext";
import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '../context/AuthContext';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Sidebarportfolio() {
    const { Balance } = useContext(StockContext);
    const { user } = useAuth();
    const [expand, setexpand] = useState(false);
    const [portfolioData, setPortfolioData] = useState(null);
    const [currentPrices, setCurrentPrices] = useState({});
    const apiKey = "cv9fb89r01qkfpsjhdj0cv9fb89r01qkfpsjhdjg";

    useEffect(() => {
        if (user && user.userId) {
            fetchPortfolioData();
        }
    }, [user]);

    const fetchPortfolioData = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/data/portfoliodata/${user.userId}`);
            const data = await response.json();
            if (data.status) {
                setPortfolioData(data.data);
                if (data.data.portfolios.length > 0) {
                    fetchCurrentPrices(data.data.portfolios);
                }
            }
        } catch (error) {
            console.error("Error fetching portfolio data:", error);
        }
    };

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
                console.error(`Error fetching price for ${portfolio.productName}:`, error);
            }
        }
        setCurrentPrices(prices);
    };

    // Calculate portfolio statistics using same logic as mainportfolio
    const getPortfolioStats = () => {
        if (!portfolioData?.portfolios) return null;

        // Calculate total investment (using averagePrice * currentQuantity)
        const totalInvestment = Array.isArray(portfolioData.portfolios)
            ? portfolioData.portfolios.reduce(
                (sum, p) =>
                    sum +
                    ((p.statistics?.averagePrice || 0) *
                        (p.statistics?.currentQuantity || 0)),
                0
            )
            : 0;

        // Calculate current value (using currentPrice * currentQuantity)
        const currentBalance = Array.isArray(portfolioData.portfolios)
            ? portfolioData.portfolios.reduce(
                (sum, p) =>
                    sum +
                    ((currentPrices[p.productName] || 0) *
                        (p.statistics?.currentQuantity || 0)),
                0
            )
            : 0;

        // Calculate profit/loss (current value - total investment)
        const profitLoss = currentBalance - totalInvestment;
        
        // Calculate percentage change
        // ((Current Value - Total Investment) / Total Investment) * 100
        const percentageChange = totalInvestment > 0 
            ? ((currentBalance - totalInvestment) / totalInvestment) * 100 
            : 0;

        return {
            totalInvestment,
            currentBalance,
            profitLoss,
            percentageChange
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
            "value": `${stats.percentageChange.toFixed(7)}%`
        },
        {
            "title": "Active Stocks",
            "value": portfolioData?.portfolios.filter(p => p.statistics?.currentQuantity > 0).length || 0
        }
    ] : [];

    return (
        <div className="py-4 sm:mt-2 mt-2 font-lemonMilk text-white/70 rounded-2xl bg-gray-900">
            <motion.div 
                className="flex flex-col md:w-[280px] px-2 py-2 space-y-2"
                layout
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <motion.div 
                    className="bg-gray-950 border-gray-800 border rounded-2xl backdrop-blur-md p-4 border-white/10 flex flex-col space-y-6 text-white font-satoshi justify-center items-center"
                    layout
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {/* Title */}
                    <div className="text-center text-2xl md:text-4xl font-semibold">
                        <span className="text-blue-500 drop-shadow-[0_0_10px_#3b82f6] shadow-sm hover:drop-shadow-[0_0_20px_#3b82f6]">
                            Available Balance
                        </span>
                    </div>

                    {/* Available Balance */}
                    <div className="space-y-2 text-center">
                        <p className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent text-4xl md:text-5xl font-bold">
                            ${portfolioData?.userBalance?.toFixed(2) ?? "0.00"}
                        </p>
                    </div>

                    {/* Profit/Loss */}
                    <div className="text-center flex items-center text-lg md:text-xl">
                        <p>Total Profit/Loss</p>
                        <p className={`mx-2 font-bold ${stats?.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stats?.profitLoss >= 0 ? '+' : '-'}${Math.abs(stats?.profitLoss || 0).toFixed(2)}
                        </p>
                    </div>

                    {/* Expand/Collapse Section */}
                    <AnimatePresence mode="wait">
                        <motion.div 
                            className="w-full flex justify-center items-center"
                            layout
                        >
                            {!expand ? (
                                <motion.button 
                                    className="p-3 rounded-full hover:bg-gray-800/50 transition-colors"
                                    onClick={() => setexpand(true)}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <FiChevronDown size={28} />
                                </motion.button>
                            ) : (
                                <motion.div 
                                    className="w-full space-y-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {portfolioOverview.map((e, index) => (
                                        <motion.div 
                                            className="bg-gray-900 rounded-xl p-4 text-left hover:bg-gray-800/50 transition-colors"
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <p className="text-sm text-gray-400">{e.title}</p>
                                            <p className="text-lg md:text-xl font-semibold mt-1">{e.value}</p>
                                        </motion.div>
                                    ))}

                                    <motion.button
                                        className="w-full p-3 rounded-full hover:bg-gray-800/50 transition-colors"
                                        onClick={() => setexpand(false)}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <FiChevronUp size={28} />
                                    </motion.button>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    );
}