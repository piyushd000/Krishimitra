// ✅ ScanContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ScanRecord {
  id: string;
  date: string;
  cropType: string;
  disease: string;
  confidence: number;
  status: 'completed' | 'processing' | 'failed';
  imageUrl?: string;
  treatment?: string;
  timestamp: number;
}

interface PredictionRecord {
  id: string;
  date: string;
  location: string;
  cropRecommendation: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  sunlight: number;
  soilMoisture: number;
  confidence: number;
  timestamp: number;
}

interface ScanContextType {
  scanRecords: ScanRecord[];
  predictionRecords: PredictionRecord[];
  addScanRecord: (record: Omit<ScanRecord, 'id' | 'timestamp'>) => void;
  addPredictionRecord: (record: Omit<PredictionRecord, 'id' | 'timestamp'>) => void;
  getScanStats: () => {
    totalScans: number;
    totalPredictions: number;
    averageAccuracy: number;
    healthyScans: number;
    diseaseDetected: number;
    averageProcessingTime: number;
  };
}

const ScanContext = createContext<ScanContextType | undefined>(undefined);

export const useScan = () => {
  const context = useContext(ScanContext);
  if (!context) throw new Error('useScan must be used within a ScanProvider');
  return context;
};

export const ScanProvider = ({ children }: { children: ReactNode }) => {
  const [scanRecords, setScanRecords] = useState<ScanRecord[]>([]);
  const [predictionRecords, setPredictionRecords] = useState<PredictionRecord[]>([]);

  useEffect(() => {
    const savedScans = localStorage.getItem('scanRecords');
    const savedPredictions = localStorage.getItem('predictionRecords');

    if (savedScans) setScanRecords(JSON.parse(savedScans));
    if (savedPredictions) setPredictionRecords(JSON.parse(savedPredictions));
  }, []);

  useEffect(() => {
    localStorage.setItem('scanRecords', JSON.stringify(scanRecords));
  }, [scanRecords]);

  useEffect(() => {
    localStorage.setItem('predictionRecords', JSON.stringify(predictionRecords));
  }, [predictionRecords]);

  const addScanRecord = (record: Omit<ScanRecord, 'id' | 'timestamp'>) => {
    const newRecord: ScanRecord = {
      ...record,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    setScanRecords((prev) => [newRecord, ...prev]);
  };

  const addPredictionRecord = (record: Omit<PredictionRecord, 'id' | 'timestamp'>) => {
    const newRecord: PredictionRecord = {
      ...record,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    console.log("Adding prediction record:", newRecord);
    setPredictionRecords((prev) => [newRecord, ...prev]);
  };

  const getScanStats = () => {
    const totalScans = scanRecords.length;
    const totalPredictions = predictionRecords.length;
    const healthyScans = scanRecords.filter(r => r.disease.toLowerCase().includes('healthy')).length;
    const diseaseDetected = totalScans - healthyScans;
    const averageAccuracy = totalScans > 0
      ? Math.round(scanRecords.reduce((sum, r) => sum + r.confidence, 0) / totalScans)
      : 0;
    const averageProcessingTime = 2.4;

    return { totalScans, totalPredictions, averageAccuracy, healthyScans, diseaseDetected, averageProcessingTime };
  };

  return (
    <ScanContext.Provider
      value={{
        scanRecords,
        predictionRecords,
        addScanRecord,
        addPredictionRecord,
        getScanStats
      }}
    >
      {children}
    </ScanContext.Provider>
  );
};
