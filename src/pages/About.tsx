import React from 'react';
import { Users, Target, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">About KrishiMitra</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Empowering farmers with cutting-edge AI technology to protect crops and enhance agricultural productivity
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            To revolutionize agriculture by making advanced crop disease detection technology accessible to every farmer, ensuring food security and sustainable farming practices.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              Leveraging cutting-edge AI technology to provide accurate and timely crop disease detection
            </p>
          </div>
          <div className="text-center p-6">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
            <p className="text-gray-600">
              Making advanced agricultural technology available to farmers of all scales
            </p>
          </div>
          <div className="text-center p-6">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-gray-600">
              Promoting sustainable farming practices for a better future
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <img src="https://i.ibb.co/qY1kn0Y4/anusha.jpg" alt="Team member" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold mb-2">Anusha Sekhar</h3>
              <p className="text-gray-600 mb-2">AI Specialist</p>
              <p className="text-gray-500 text-sm">Expert in machine learning and computer vision</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <img src="https://i.ibb.co/b5h5Dpj3/piyush.jpg" alt="Team member" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold mb-2">Piyush Das</h3>
              <p className="text-gray-600 mb-2">Web Developer</p>
              <p className="text-gray-500 text-sm">Expert in Web Application Development</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <img src="https://i.ibb.co/9kx1sk0x/formal.jpg" alt="Team member" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold mb-2">Abdul Kalam</h3>
              <p className="text-gray-600 mb-2">Front End Developer</p>
              <p className="text-gray-500 text-sm">Expert in React js</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;