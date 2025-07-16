import React from 'react';
import { Briefcase, ArrowLeft, Check } from 'lucide-react';

const FormatSelector = ({ formatLabels, handleFormatSelect, handleLanguageSelect, handleBackToLanguageSelection, cvLanguage }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {cvLanguage === 'english' ? 'Choose Your CV Format' : 'Choisissez le Format de votre CV'}
          </h1>
          <p className="text-gray-600">
            {cvLanguage === 'english' 
              ? 'Select the format that best matches your target market' 
              : 'Sélectionnez le format qui correspond le mieux à votre marché cible'}
          </p>
        </div>

        {/* Language Toggle */}
        <div className="mb-8 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {cvLanguage === 'english' ? 'Language:' : 'Langue:'}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleLanguageSelect('english')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  cvLanguage === 'english'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageSelect('french')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  cvLanguage === 'french'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Français
              </button>
            </div>
          </div>
        </div>

        {/* Format Options */}
        <div className="grid gap-6 mb-8">
          {Object.entries(formatLabels).map(([format, details]) => (
            <div
              key={format}
              onClick={() => handleFormatSelect(format)}
              className="group p-6 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-indigo-400 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${details.color || 'bg-gray-400'} shadow-sm`} />
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                        {details.name}
                      </h3>
                      <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                        {details.description}
                      </p>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  {(details.features || []).map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full border border-indigo-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={handleBackToLanguageSelection}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {cvLanguage === 'english' ? 'Back to Language Selection' : 'Retour à la Sélection de Langue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormatSelector;


