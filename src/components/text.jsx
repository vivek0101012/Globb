import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();
    const [portfolioData, setPortfolioData] = useState(null);
    const [productData, setProductData] = useState(null);
    const [productName, setProductName] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPrices, setCurrentPrices] = useState({});
    const apiKey = "cv9fb89r01qkfpsjhdj0cv9fb89r01qkfpsjhdjg"; // Replace with your API key

    // Fetch data on component mount
    useEffect(() => {
        if (user && user.userId) {
            fetchAllPortfolioData();
        }
    }, [user]); // Dependency on user ensures data is fetched when user is available

    // Test All Portfolio Data
    const fetchAllPortfolioData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:3000/api/data/portfoliodata/${user.userId}`);
            const data = await response.json();
            
            if (data.status) {
                setPortfolioData(data.data);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Test Specific Product Data
    const fetchProductData = async (productName) => {
        if (!productName) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `http://localhost:3000/api/data/portfoliodata/${user.userId}/${productName}`
            );
            const data = await response.json();
            
            if (data.status) {
                setProductData(data.data);
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
    const fetchCurrentPrices = async (products) => {
        const prices = {};
        for (const product of products) {
            try {
                const response = await fetch(
                    `https://finnhub.io/api/v1/quote?symbol=${product.productName}&token=${apiKey}`
                );
                const data = await response.json();
                if (data.c) {
                    prices[product.productName] = data.c;
                }
            } catch (error) {
                console.error(`Error fetching price for ${product.productName}:`, error);
            }
        }
        setCurrentPrices(prices);
    };

    // Helper function to aggregate portfolio data
    const aggregatePortfolioData = (portfolios) => {
        const aggregatedData = portfolios.reduce((acc, portfolio) => {
            const existingProduct = acc.find(p => p.productName === portfolio.productName);
            
            if (existingProduct) {
                existingProduct.totalQuantity += portfolio.buy.quantity;
                existingProduct.totalInvested += portfolio.buy.price * portfolio.buy.quantity;
                existingProduct.entries.push(portfolio);
            } else {
                acc.push({
                    productName: portfolio.productName,
                    totalQuantity: portfolio.buy.quantity,
                    totalInvested: portfolio.buy.price * portfolio.buy.quantity,
                    averagePrice: portfolio.buy.price,
                    entries: [portfolio]
                });
            }
            return acc;
        }, []);

        // Calculate additional metrics
        aggregatedData.forEach(product => {
            product.averagePrice = product.totalInvested / product.totalQuantity;
            product.currentPrice = currentPrices[product.productName] || 0;
            product.currentValue = product.currentPrice * product.totalQuantity;
            product.profitLoss = product.currentValue - product.totalInvested;
            product.profitLossPercentage = ((product.currentValue - product.totalInvested) / product.totalInvested) * 100;
        });

        return aggregatedData;
    };

    // Calculate total portfolio value
    const calculateTotalPortfolioValue = (aggregatedData) => {
        return aggregatedData.reduce((total, product) => {
            return total + (product.currentPrice * product.totalQuantity);
        }, 0);
    };

    // Modified useEffect
    useEffect(() => {
        if (user?.userId) {
            fetchAllPortfolioData();
        }
    }, [user]);

    // Update current prices when portfolio data changes
    useEffect(() => {
        if (portfolioData?.portfolios) {
            fetchCurrentPrices(portfolioData.portfolios);
        }
    }, [portfolioData]);

    return (
        <div className="p-6 space-y-8 bg-gray-900 text-white">
            <h1 className="text-2xl font-bold">API Test Dashboard</h1>
            
            {/* Error Display */}
            {error && (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {/* Loading Indicator */}
            {loading && (
                <div className="p-4 bg-blue-100 text-blue-700 rounded-lg">
                    Loading...
                </div>
            )}

            {/* All Portfolio Data Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">All Portfolio Data</h2>
                <button
                    onClick={fetchAllPortfolioData}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Fetch All Portfolio Data
                </button>
                
                {portfolioData && (
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-800 rounded-lg">
                            <h3 className="font-semibold text-xl mb-4">Portfolio Overview</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <p className="text-gray-400">Total Invested</p>
                                    <p className="text-2xl">${portfolioData.statistics.totalInvested.toFixed(2)}</p>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <p className="text-gray-400">Current Value</p>
                                    <p className="text-2xl">${calculateTotalPortfolioValue(aggregatePortfolioData(portfolioData.portfolios)).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="font-semibold">Aggregated Portfolio</h3>
                            {aggregatePortfolioData(portfolioData.portfolios).map((product, index) => (
                                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-lg font-semibold">{product.productName}</h4>
                                        <span className={`px-3 py-1 rounded ${
                                            product.profitLoss >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                        }`}>
                                            {product.profitLoss >= 0 ? '+' : ''}{product.profitLossPercentage.toFixed(2)}%
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-2">
                                        <div>
                                            <p className="text-gray-400">Quantity</p>
                                            <p>{product.totalQuantity}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Current Price</p>
                                            <p>${product.currentPrice.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Average Cost</p>
                                            <p>${product.averagePrice.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Current Value</p>
                                            <p>${product.currentValue.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Total Invested</p>
                                            <p>${product.totalInvested.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Profit/Loss</p>
                                            <p className={product.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}>
                                                ${Math.abs(product.profitLoss).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Expandable transaction history */}
                                    <details className="mt-2">
                                        <summary className="cursor-pointer text-blue-600">
                                            View Transaction History
                                        </summary>
                                        <div className="mt-2 space-y-2">
                                            {product.entries.map((entry, i) => (
                                                <div key={i} className="pl-4 border-l-2 border-gray-200">
                                                    <p>Buy Price: ${entry.buy.price}</p>
                                                    <p>Quantity: {entry.buy.quantity}</p>
                                                    <p>Date: {new Date(entry.createdAt).toLocaleDateString()}</p>
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

            {/* Specific Product Data Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Specific Product Data</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name"
                        className="px-4 py-2 border rounded"
                    />
                    <button
                        onClick={() => fetchProductData(productName)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Fetch Product Data
                    </button>
                </div>
                
                {productData && (
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <h3 className="font-semibold">Product Statistics</h3>
                            <p>Total Invested: ${productData.productStats.totalInvested}</p>
                            <p>Total Quantity: {productData.productStats.totalQuantity}</p>
                            <p>Average Buy Price: ${productData.productStats.averageBuyPrice.toFixed(2)}</p>
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="font-semibold">Product Portfolio Entries</h3>
                            {productData.productPortfolios.map((portfolio, index) => (
                                <div key={index} className="p-4 bg-white shadow rounded-lg">
                                    <p>Buy Price: ${portfolio.buy.price}</p>
                                    <p>Quantity: {portfolio.buy.quantity}</p>
                                    <p>Date: {new Date(portfolio.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;