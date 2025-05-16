import { StockContext } from "../context/Stocklistcontext";
import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '../context/AuthContext';

export default function Sidebarportfolio() {
    const { Balance } = useContext(StockContext);
    const { user } = useAuth();
    const [expand, setexpand] = useState(false);
    const [portfolioData, setPortfolioData] = useState(null);

    useEffect(() => {
        if (user && user.userId) {
            fetchPortfolioData();
        }
    }, [user]);

    const fetchPortfolioData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/data/portfoliodata/${user.userId}`);
            const data = await response.json();
            if (data.status) {
                setPortfolioData(data.data);
            }
        } catch (error) {
            console.error("Error fetching portfolio data:", error);
        }
    };

    // Calculate portfolio statistics
    const getPortfolioStats = () => {
        if (!portfolioData) return null;

        const totalInvestment = portfolioData.statistics.totalInvested;
        const currentBalance = portfolioData.userBalance;
        const profitLoss = currentBalance - totalInvestment;
        const percentageChange = ((currentBalance - totalInvestment) / totalInvestment) * 100;

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
            "title": "Current Balance",
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
            "value": portfolioData?.portfolios.length || 0
        }
    ] : [];

    return (
        <div className="py-4 sm:mt-2 max-h-screen mt-2 font-lemonMilk text-white/70 rounded-2xl bg-gray-900">
            <div className="flex flex-col md:w-[280px] px-2 py-2 space-y-2">
                <div className="bg-gray-950 border-gray-800 border rounded-2xl backdrop-blur-md hover:scale-105 transition-transform duration-300 p-2 border-white/10 flex flex-col space-y-4 md:space-y-4 text-white font-satoshi justify-center items-center">
                    <div className="text-center md:text-3xl text-lg font-semibold">
                        <span className="text-blue-500 drop-shadow-[0_0_10px_#3b82f6] shadow-sm hover:drop-shadow-[0_0_20px_#3b82f6]">Balance</span>
                    </div>
                    <div className="space-y-2 text-center">
                        <p className="bg-gradient-to-r text-xl from-blue-400 to-pink-500 bg-clip-text text-transparent text-3xl font-bold">
                            ${stats?.currentBalance.toFixed(2) || '0.00'}
                        </p>
                    </div>
                    <div className="text-center flex">
                        <p>Total Profit/Loss</p>
                        <p className={`mx-1 ${stats?.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stats?.profitLoss >= 0 ? '+' : '-'}${Math.abs(stats?.profitLoss || 0).toFixed(2)}
                        </p>
                    </div>

                    <div className="flex items-center space-y-4 justify-center flex-col">
                        <button 
                            className="py-2 px-6 rounded-2xl bg-indigo-700 border-2 border-gray-800"
                            onClick={() => setexpand(!expand)}
                        >
                            {expand ? "collapse" : "expand"}
                        </button>

                        <AnimatePresence>
                            {expand && portfolioOverview.length > 0 && (
                                <motion.div 
                                    className="w-full duration-300 transition-all grid md:grid-cols-2 gap-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    layout
                                >
                                    {portfolioOverview.map((e, index) => (
                                        <motion.div 
                                            className="bg-gray-900 rounded-2xl py-2 px-4 text-center md:hover:scale-105 duration-200 text-white"
                                            key={index}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.9, ease: "easeInOut" }}
                                        >
                                            <p className="text-[8px] text-center">{e.title}</p>
                                            <p className="opacity-70 text-center text-[12px]">{e.value}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}