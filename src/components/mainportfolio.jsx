import { StockContext } from "../context/Stocklistcontext";
import { useContext, useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import Performance from "./performamcechart";

export default function Mainportfolio() {
  const { stocks } = useContext(StockContext);
  const { user } = useAuth();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    if (user && user.userId) {
      fetchAllPortfolioData();
    }
  }, [user]);

  const fetchAllPortfolioData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/data/portfoliodata/${user.userId}`);
      const data = await response.json();
      if (data.status) {
        setPortfolioData(data.data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Aggregation helper function
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

    aggregatedData.forEach(product => {
      product.averagePrice = product.totalInvested / product.totalQuantity;
    });
    return aggregatedData;
  };

  return (
    <div className="py-8 space-y-4 text-white items-center overflow-y-clip bg-gray-900 rounded-2xl w-full flex flex-col">
      <div className="w-full text-center md:text-3xl text-lg font-semibold">
        Portfolio <span className="text-blue-500 drop-shadow-[0_0_10px_#3b82f6] shadow-sm hover:drop-shadow-[0_0_20px_#3b82f6]">Overview</span>
      </div>

      {/* Portfolio Holdings Section */}
      {portfolioData && (
        <div className="mt-4 w-[96%] isolate rounded-xl bg-gray-950 shadow-lg ring-1 ring-black/5 py-4 px-4">
          <div className="mb-4 border-b border-gray-800 pb-4">
            <h3 className="text-xl font-semibold text-blue-400">Portfolio Summary</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <p>Total Invested: ${portfolioData.statistics.totalInvested.toFixed(2)}</p>
              <p>Available Balance: ${portfolioData.userBalance.toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-4">
            {aggregatePortfolioData(portfolioData.portfolios).map((product, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold text-blue-400">{product.productName}</h4>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                    {product.entries.length} transactions
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p>Quantity: {product.totalQuantity}</p>
                  <p>Invested: ${product.totalInvested.toFixed(2)}</p>
                  <p>Avg Price: ${product.averagePrice.toFixed(2)}</p>
                </div>
                
                <details className="mt-2">
                  <summary className="cursor-pointer text-blue-400 text-sm">
                    Transaction History
                  </summary>
                  <div className="mt-2 space-y-2">
                    {product.entries.map((entry, i) => (
                      <div key={i} className="pl-4 border-l border-gray-700 text-sm">
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

      {/* Performance Chart Section */}
      <div className="py-8 text-center w-[96%] mt-4 space-y-4 bg-gray-950 px-2 rounded-2xl">
        {/* ...existing performance chart code... */}
        <Performance />
      </div>
    </div>
  );
}





