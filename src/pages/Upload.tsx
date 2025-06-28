import React, { useState } from 'react';
import { Upload as UploadIcon } from 'lucide-react';

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
<<<<<<< HEAD
=======
  const [treatment, setTreatment] = useState<string | null>(null);
>>>>>>> f415b1ba3b645dcf85a16e81dc55318e5de3ff34
  const [loading, setLoading] = useState(false);

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
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setPrediction(null);
<<<<<<< HEAD
=======
      setTreatment(null);
>>>>>>> f415b1ba3b645dcf85a16e81dc55318e5de3ff34
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setPrediction(null);
<<<<<<< HEAD
=======
      setTreatment(null);
>>>>>>> f415b1ba3b645dcf85a16e81dc55318e5de3ff34
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/load", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
<<<<<<< HEAD
      if (response.ok) {
        setPrediction(data.prediction);
      } else {
        setPrediction("Error: " + data.error);
=======
      console.log(data); // Debugging

      if (response.ok) {
        setPrediction(data.prediction);
        setTreatment(data.treatment);
      } else {
        setPrediction("Error: " + data.error);
        setTreatment("No treatment available due to error.");
>>>>>>> f415b1ba3b645dcf85a16e81dc55318e5de3ff34
      }
    } catch (err) {
      console.error(err);
      setPrediction("Prediction failed. Please try again.");
<<<<<<< HEAD
=======
      setTreatment("Unable to fetch treatment due to error.");
>>>>>>> f415b1ba3b645dcf85a16e81dc55318e5de3ff34
    } finally {
      setLoading(false);
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
<<<<<<< HEAD
          className={`border-2 border-dashed rounded-lg p-12 ${
            dragActive ? "border-green-500 bg-green-50" : "border-gray-300"
          } text-center`}
=======
          className={`border-2 border-dashed rounded-lg p-12 ${dragActive ? "border-green-500 bg-green-50" : "border-gray-300"} text-center`}
>>>>>>> f415b1ba3b645dcf85a16e81dc55318e5de3ff34
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
<<<<<<< HEAD

=======
>>>>>>> f415b1ba3b645dcf85a16e81dc55318e5de3ff34
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
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Image"}
            </button>
          )}
        </div>

        {imagePreview && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Preview</h2>
            <img
              src={imagePreview}
              alt="Uploaded preview"
              className="mx-auto rounded-md shadow-md max-h-64"
            />
          </div>
        )}

<<<<<<< HEAD
        {prediction && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Prediction:</h2>
            <p className="text-lg text-green-700 mt-2">{prediction}</p>
=======
        {(prediction || treatment) && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Prediction:</h2>
            <p className="text-lg text-green-700 mt-2">{prediction}</p>

            {treatment && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mt-4">Treatment Info:</h2>
                <p className="text-lg text-green-700 mt-2">{treatment}</p>
              </>
            )}
>>>>>>> f415b1ba3b645dcf85a16e81dc55318e5de3ff34
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Supported Formats</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>JPEG / JPG</li>
            <li>PNG</li>
            <li>Maximum file size: 10MB</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Upload;
