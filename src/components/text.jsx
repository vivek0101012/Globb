import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();
    const [portfolioData, setPortfolioData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPrices, setCurrentPrices] = useState({});
    const apiKey = "cv9fb89r01qkfpsjhdj0cv9fb89r01qkfpsjhdjg";
    const [isSellPopupOpen, setSellPopupOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [sellQuantity, setSellQuantity] = useState(1);

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

    // Add sell handler
    const handleSell = async (portfolio) => {
        try {
            const currentPrice = currentPrices[portfolio.productName];
            if (!currentPrice) {
                throw new Error("Current price not available");
            }

            const response = await fetch('http://localhost:3000/api/portfolio/sell', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.userId,
                    productName: portfolio.productName,
                    price: currentPrice,
                    quantity: sellQuantity
                })
            });

            const data = await response.json();
            if (data.status) {
                // Refresh portfolio data
                fetchAllPortfolioData();
                setSellPopupOpen(false);
                setSellQuantity(1);
                setSelectedStock(null);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setError(error.message);
        }
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
                        {portfolioData.portfolios
                            .filter(portfolio => portfolio.statistics.currentQuantity > 0) // Filter out zero quantity
                            .map((portfolio, index) => (
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

                                    {/* Add Sell Button */}
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={() => {
                                                setSelectedStock(portfolio);
                                                setSellPopupOpen(true);
                                            }}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                            disabled={!currentPrices[portfolio.productName]}
                                        >
                                            Sell
                                        </button>
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

            {/* Sell Popup */}
            {isSellPopupOpen && selectedStock && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg border-2 border-gray-700 max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Sell {selectedStock.productName}</h2>
                            <button 
                                onClick={() => {
                                    setSellPopupOpen(false);
                                    setSellQuantity(1);
                                    setSelectedStock(null);
                                }}
                                className="text-gray-400 hover:text-white"
                            >
                                <span className="text-2xl">×</span>
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Current Price:</span>
                                <span className="font-semibold">
                                    ${currentPrices[selectedStock.productName]?.toFixed(2)}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span>Average Price:</span>
                                <span className="font-semibold">
                                    ${selectedStock.statistics.averagePrice.toFixed(2)}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span>Available Quantity:</span>
                                <span>{selectedStock.statistics.currentQuantity}</span>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                    Quantity to Sell
                                </label>
                                <div className="flex items-center space-x-2">
                                    <button 
                                        onClick={() => setSellQuantity(prev => Math.max(1, prev - 1))}
                                        className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max={selectedStock.statistics.currentQuantity}
                                        value={sellQuantity}
                                        onChange={(e) => setSellQuantity(Math.min(
                                            selectedStock.statistics.currentQuantity,
                                            Math.max(1, parseInt(e.target.value) || 1)
                                        ))}
                                        className="w-20 px-2 py-1 bg-gray-700 rounded text-center"
                                    />
                                    <button 
                                        onClick={() => setSellQuantity(prev => Math.min(
                                            selectedStock.statistics.currentQuantity,
                                            prev + 1
                                        ))}
                                        className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between text-lg font-bold text-green-400">
                                <span>Total Proceeds:</span>
                                <span>
                                    ${(currentPrices[selectedStock.productName] * sellQuantity).toFixed(2)}
                                </span>
                            </div>

                            {/* Add Profit/Loss calculation */}
                            <div className="border-t border-gray-700 pt-4">
                                <div className="flex justify-between items-center">
                                    <span>Profit/Loss:</span>
                                    <div className="text-right">
                                        <span className={`font-bold ${
                                            currentPrices[selectedStock.productName] > selectedStock.statistics.averagePrice 
                                            ? 'text-green-400' 
                                            : 'text-red-400'
                                        }`}>
                                            ${((currentPrices[selectedStock.productName] - selectedStock.statistics.averagePrice) * sellQuantity).toFixed(2)}
                                        </span>
                                        <p className={`text-sm ${
                                            currentPrices[selectedStock.productName] > selectedStock.statistics.averagePrice 
                                            ? 'text-green-400' 
                                            : 'text-red-400'
                                        }`}>
                                            ({(((currentPrices[selectedStock.productName] - selectedStock.statistics.averagePrice) / 
                                                selectedStock.statistics.averagePrice) * 100).toFixed(2)}%)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    onClick={() => {
                                        setSellPopupOpen(false);
                                        setSellQuantity(1);
                                        setSelectedStock(null);
                                    }}
                                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleSell(selectedStock)}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                                >
                                    Confirm Sell
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;