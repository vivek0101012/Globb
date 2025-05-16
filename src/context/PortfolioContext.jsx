import { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
    const [portfolioData, setPortfolioData] = useState(null);
    const [currentPrices, setCurrentPrices] = useState({});
    const [aggregatedData, setAggregatedData] = useState(null);
    const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);

    return (
        <PortfolioContext.Provider value={{
            portfolioData,
            setPortfolioData,
            currentPrices,
            setCurrentPrices,
            aggregatedData,
            setAggregatedData,
            totalPortfolioValue,
            setTotalPortfolioValue
        }}>
            {children}
        </PortfolioContext.Provider>
    );
}

export const usePortfolio = () => useContext(PortfolioContext);