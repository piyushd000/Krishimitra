import React, { useState } from 'react';
import { Upload as UploadIcon, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useScan } from '../pages/ScanContext';

interface PredictionResult {
  prediction: string;
  confidence: number;
  treatment: string;
}

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addScanRecord } = useScan();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const extractCropType = (prediction: string): string => {
    // Extract crop type from prediction string
    const cropTypes = ['Apple', 'Blueberry', 'Cherry', 'Corn', 'Grape', 'Orange', 'Peach', 'Pepper', 'Potato', 'Raspberry', 'Soybean', 'Squash', 'Strawberry', 'Tomato'];
    
    for (const crop of cropTypes) {
      if (prediction.toLowerCase().includes(crop.toLowerCase())) {
        return crop;
      }
    }
    
    // If no specific crop found, try to extract from the beginning of the string
    const parts = prediction.split(' - ');
    if (parts.length > 0) {
      return parts[0].trim();
    }
    
    return 'Unknown';
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/load', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        
        // Add scan record to context
        const cropType = extractCropType(data.prediction);
        const disease = data.prediction.includes(' - ') 
          ? data.prediction.split(' - ')[1] 
          : data.prediction;
        
        addScanRecord({
          date: new Date().toISOString().split('T')[0],
          cropType: cropType,
          disease: disease,
          confidence: data.confidence,
          status: 'completed',
          treatment: data.treatment,
          imageUrl: URL.createObjectURL(selectedFile)
        });
        
      } else {
        setError(data.error || 'Analysis failed');
        
        // Add failed scan record
        addScanRecord({
          date: new Date().toISOString().split('T')[0],
          cropType: 'Unknown',
          disease: 'Analysis Failed',
          confidence: 0,
          status: 'failed',
          treatment: 'Please try again with a clearer image.'
        });
      }
    } catch (err) {
      setError('Failed to connect to server. Please try again.');
      console.error('Upload error:', err);
      
      // Add failed scan record
      addScanRecord({
        date: new Date().toISOString().split('T')[0],
        cropType: 'Unknown',
        disease: 'Connection Failed',
        confidence: 0,
        status: 'failed',
        treatment: 'Server connection failed. Please check your connection and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Crop Disease Detection</h1>
          <p className="text-gray-600">Upload your crop images for instant AI-powered disease detection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div 
              className={`border-2 border-dashed rounded-lg p-8 ${
                dragActive ? "border-green-500 bg-green-50" : "border-gray-300"
              } text-center transition-colors`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={handleChange}
              />
              
              <label htmlFor="file-upload" className="cursor-pointer">
                <UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg text-gray-600 mb-2">
                  {selectedFile ? selectedFile.name : "Drag and drop your image here"}
                </p>
                <p className="text-sm text-gray-500">
                  {!selectedFile && "or click to select a file"}
                </p>
              </label>
            </div>

            <div className="mt-6 space-y-4">
              {selectedFile && (
                <div className="flex space-x-4">
                  <button 
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze Image'
                    )}
                  </button>
                  <button 
                    onClick={resetUpload}
                    className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Supported Formats</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>JPEG/JPG</li>
                <li>PNG</li>
                <li>Maximum file size: 10MB</li>
                <li>Clear, well-lit images work best</li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-lg font-semibold mb-6">Analysis Results</h3>
            
            {loading && (
              <div className="text-center py-8">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-green-600 mb-4" />
                <p className="text-gray-600">Analyzing your image...</p>
                <p className="text-sm text-gray-500 mt-2">This scan will be saved to your dashboard</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                  <h4 className="font-semibold text-red-800">Analysis Failed</h4>
                </div>
                <p className="text-red-700">{error}</p>
                <p className="text-sm text-red-600 mt-2">This failed attempt has been recorded in your dashboard.</p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                    <h4 className="font-semibold text-green-800">Detection Complete</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Disease: </span>
                      <span className="text-gray-900">{result.prediction}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Confidence: </span>
                      <span className={`font-semibold ${
                        result.confidence > 80 ? 'text-green-600' : 
                        result.confidence > 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {result.confidence}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">Treatment Recommendation</h4>
                  <p className="text-blue-700 leading-relaxed">{result.treatment}</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    ✅ This scan has been automatically saved to your dashboard for future reference.
                  </p>
                </div>
              </div>
            )}

            {!loading && !error && !result && (
              <div className="text-center py-8 text-gray-500">
                <p>Upload an image to see analysis results</p>
                <p className="text-sm mt-2">All scans are automatically saved to your dashboard</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;