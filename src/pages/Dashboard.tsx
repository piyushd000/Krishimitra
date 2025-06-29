import React from 'react';
import { BarChart, Clock, Leaf } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <Leaf className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold">Total Scans</h3>
            </div>
            <p className="text-3xl font-bold">24</p>
            <p className="text-gray-600 text-sm">Last 30 days</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <BarChart className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold">Detection Rate</h3>
            </div>
            <p className="text-3xl font-bold">98%</p>
            <p className="text-gray-600 text-sm">Accuracy</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold">Average Time</h3>
            </div>
            <p className="text-3xl font-bold">2.4s</p>
            <p className="text-gray-600 text-sm">Per scan</p>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Scans</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disease</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-03-15</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Wheat</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Leaf Rust</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">98%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;