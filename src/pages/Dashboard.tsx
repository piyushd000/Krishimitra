import React, { useState, useEffect } from 'react';
import { BarChart, Clock, Leaf, TrendingUp, Calendar, AlertTriangle, CheckCircle, Camera, Activity } from 'lucide-react';
import { useUser } from '../pages/UserContext';
import { useScan } from '../pages/ScanContext';

const Dashboard = () => {
  const { user } = useUser();
  const { scanRecords, predictionRecords, getScanStats } = useScan();
  const [activeTab, setActiveTab] = useState<'overview' | 'scans' | 'predictions'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const stats = getScanStats();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user}!</h1>
          <p className="text-gray-600 mt-2">Here's your farming activity overview</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart },
              { id: 'scans', label: 'Disease Scans', icon: Camera },
              { id: 'predictions', label: 'Crop Predictions', icon: TrendingUp }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Scans</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalScans}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Camera className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Disease detection scans</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Crop Predictions</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalPredictions}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Environmental predictions</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Accuracy</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.averageAccuracy}%</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Detection accuracy</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Processing Time</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.averageProcessingTime}s</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Average per scan</p>
              </div>
            </div>

            {/* Health Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Crop Health Overview</h3>
                {stats.totalScans > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">Healthy Plants</span>
                      </div>
                      <span className="font-semibold text-green-600">{stats.healthyScans}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                        <span className="text-gray-700">Disease Detected</span>
                      </div>
                      <span className="font-semibold text-red-600">{stats.diseaseDetected}</span>
                    </div>
                    <div className="mt-4 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(stats.healthyScans / stats.totalScans) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {Math.round((stats.healthyScans / stats.totalScans) * 100)}% of your crops are healthy
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Camera className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No scans yet</p>
                    <p className="text-sm mt-2">Upload your first crop image to get started!</p>
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                {scanRecords.length > 0 ? (
                  <div className="space-y-3">
                    {scanRecords.slice(0, 3).map((record) => (
                      <div key={record.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-900">{record.cropType}</p>
                          <p className="text-sm text-gray-500">{record.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.disease.toLowerCase().includes('healthy') 
                            ? 'bg-green-100 text-green-800' 
                            : record.status === 'failed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.disease}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No recent activity</p>
                    <p className="text-sm mt-2">Your scan history will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Disease Scans Tab */}
        {activeTab === 'scans' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Disease Detection History</h2>
              <p className="text-gray-600 mt-1">All your crop disease detection scans</p>
            </div>
            {scanRecords.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disease</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {scanRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            {record.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.cropType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.disease}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`font-medium ${getConfidenceColor(record.confidence)}`}>
                            {record.confidence}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs whitespace-normal break-words">
                            {record.treatment}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Camera className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No scans yet</h3>
                <p className="text-gray-500 mb-4">Upload your first crop image to start tracking disease detection</p>
                <a href="/upload" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Upload Image
                </a>
              </div>
            )}
          </div>
        )}

        {/* Crop Predictions Tab */}
        {activeTab === 'predictions' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Environmental Crop Predictions</h2>
              <p className="text-gray-600 mt-1">Crop recommendations based on environmental conditions</p>
            </div>
            {predictionRecords.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Humidity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {predictionRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            {record.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {record.cropRecommendation}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <span className="text-red-500 mr-1">🌡️</span>
                            {record.temperature}°C
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <span className="text-blue-500 mr-1">💧</span>
                            {record.humidity}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`font-medium ${getConfidenceColor(record.confidence)}`}>
                            {record.confidence}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No predictions yet</h3>
                <p className="text-gray-500 mb-4">Get your first crop recommendation based on environmental conditions</p>
                <a href="/prediction" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Get Prediction
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;