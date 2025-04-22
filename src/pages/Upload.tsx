import React, { useState } from 'react';
import { Upload as UploadIcon } from 'lucide-react';

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Crop Image</h1>
          <p className="text-gray-600">Upload your crop images for instant disease detection</p>
        </div>

        <div 
          className={`border-2 border-dashed rounded-lg p-12 ${
            dragActive ? "border-green-500 bg-green-50" : "border-gray-300"
          } text-center`}
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

          {selectedFile && (
            <button 
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
              onClick={() => {/* Handle upload logic */}}
            >
              Analyze Image
            </button>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Supported Formats</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>JPEG/JPG</li>
            <li>PNG</li>
            <li>Maximum file size: 10MB</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Upload;