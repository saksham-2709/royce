import React, { createContext, useState, useContext, ReactNode } from 'react';

interface DatasetContextType {
  data: any[];
  setData: (data: any[]) => void;

  // Per-session upload tracking
  uploadCount: number;
  incrementUploadCount: () => void;

  // Row-level metadata for the most recently uploaded dataset
  currentDatasetRows: number;
  setCurrentDatasetRows: (rows: number) => void;
  isCurrentDatasetFree: boolean;
  setIsCurrentDatasetFree: (isFree: boolean) => void;

  // Simple token balance placeholder for paid usage.
  // In this prototype, it is initialised to 0 and should be
  // synchronised with your billing or account system.
  tokenBalance: number;
  setTokenBalance: (tokens: number) => void;
}

const DatasetContext = createContext<DatasetContextType | undefined>(undefined);

export const DatasetProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any[]>([]);
  const [uploadCount, setUploadCount] = useState<number>(0);
  const [currentDatasetRows, setCurrentDatasetRows] = useState<number>(0);
  const [isCurrentDatasetFree, setIsCurrentDatasetFree] = useState<boolean>(true);
  const [tokenBalance, setTokenBalance] = useState<number>(0);

  const incrementUploadCount = () => {
    setUploadCount((prev) => prev + 1);
  };

  return (
    <DatasetContext.Provider
      value={{
        data,
        setData,
        uploadCount,
        incrementUploadCount,
        currentDatasetRows,
        setCurrentDatasetRows,
        isCurrentDatasetFree,
        setIsCurrentDatasetFree,
        tokenBalance,
        setTokenBalance,
      }}
    >
      {children}
    </DatasetContext.Provider>
  );
};

export const useDataset = () => {
  const context = useContext(DatasetContext);
  if (context === undefined) {
    throw new Error('useDataset must be used within a DatasetProvider');
  }
  return context;
};