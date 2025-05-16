import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();
    const [portfolioData, setPortfolioData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPrices, setCurrentPrices] = useState({});
    const apiKey = "cv9fb89r01qkfpsjhdj0cv9fb89r01qkfpsjhdjg";

    // Fetch data on component mount
    useEffect(() => {
        if (user && user.userId) {
            fetchAllPortfolioData();
        }
    }, [user]);

    // Fetch portfolio data
    const fetchAllPortfolioData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:3000/api/data/portfoliodata/${user.userId}`);
            const data = await response.json();
            
            if (data.status) {
                setPortfolioData(data.data);
                // Fetch current prices for all portfolio items
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
                console.error(`Error fetching price for ${portfolio.productName}:`, error);
            }
        }
        setCurrentPrices(prices);
    };

    return (
        <div className="p-6 space-y-8 bg-gray-900 text-white">
            {error && (
                <div className="p-4 bg-red-500/20 text-red-400 rounded-lg">
                    {error}
                </div>
            )}

            {loading && (
                <div className="p-4 bg-blue-500/20 text-blue-400 rounded-lg">
                    Loading...
                </div>
            )}

            {portfolioData && (
                <div className="space-y-6">
                    <div className="p-4 bg-gray-800 rounded-lg">
                        <h3 className="font-semibold text-xl mb-4">Portfolio Overview</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <p className="text-gray-400">Total Invested</p>
                                <p className="text-2xl">${portfolioData.statistics.totalInvested.toFixed(2)}</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <p className="text-gray-400">Available Balance</p>
                                <p className="text-2xl">${portfolioData.userBalance.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {portfolioData.portfolios.map((portfolio, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-lg font-semibold">{portfolio.productName}</h4>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-400">Current Price:</span>
                                        <span className="font-bold">
                                            ${currentPrices[portfolio.productName]?.toFixed(2) || 'N/A'}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-gray-400">Quantity</p>
                                        <p>{portfolio.statistics.currentQuantity}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Average Price</p>
                                        <p>${portfolio.statistics.averagePrice.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Current Value</p>
                                        <p>${portfolio.currentValue.toFixed(2)}</p>
                                    </div>
                                </div>

                                <details className="mt-4">
                                    <summary className="cursor-pointer text-blue-400 hover:text-blue-300">
                                        Transaction History
                                    </summary>
                                    <div className="mt-2 space-y-2">
                                        {portfolio.transactions.map((transaction, i) => (
                                            <div key={i} className="pl-4 border-l border-gray-700 py-2">
                                                <p className={`text-sm ${transaction.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                                                    {transaction.type.toUpperCase()}
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    Price: ${transaction.price.toFixed(2)} × {transaction.quantity} shares
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(transaction.timestamp).toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;