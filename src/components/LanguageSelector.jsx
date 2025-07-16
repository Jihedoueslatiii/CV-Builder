import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';

const LanguageSelector = ({ handleLanguageSelect, cvLanguage }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to CV Builder
          </h2>
          <p className="text-gray-600">
            Choose your preferred language to get started
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => handleLanguageSelect('english')}
            className={`
              w-full p-4 rounded-xl border-2 transition-all duration-300
              flex items-center justify-between group
              ${cvLanguage === 'english' 
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">EN</span>
              </div>
              <div className="text-left">
                <div className="font-semibold">English</div>
                <div className="text-sm opacity-75">International</div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => handleLanguageSelect('french')}
            className={`
              w-full p-4 rounded-xl border-2 transition-all duration-300
              flex items-center justify-between group
              ${cvLanguage === 'french' 
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 font-semibold text-sm">FR</span>
              </div>
              <div className="text-left">
                <div className="font-semibold">Français</div>
                <div className="text-sm opacity-75">France & Canada</div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            You can change this setting later
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;

