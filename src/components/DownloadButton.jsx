import React from 'react';
import { Download, Loader2 } from 'lucide-react';

const DownloadButton = ({ onClick, fileName = 'CV', isLoading = false, cvLanguage = 'english' }) => {
  return (
    <div className="text-center">
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`
          inline-flex items-center gap-3 px-8 py-4 
          bg-gradient-to-r from-green-500 to-green-600 
          hover:from-green-600 hover:to-green-700 
          disabled:from-gray-400 disabled:to-gray-500
          text-white font-semibold rounded-xl
          shadow-lg hover:shadow-xl
          transform hover:-translate-y-1 
          disabled:transform-none disabled:cursor-not-allowed
          transition-all duration-300
          focus:outline-none focus:ring-4 focus:ring-green-200
        `}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {cvLanguage === 'english' ? 'Generating PDF...' : 'Génération du PDF...'}
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            {cvLanguage === 'english' ? 'Download CV' : 'Télécharger le CV'}
          </>
        )}
      </button>
      {!isLoading && (
        <p className="mt-3 text-sm text-gray-600">
          {cvLanguage === 'english' 
            ? `File will be saved as: ${fileName}.pdf`
            : `Le fichier sera sauvegardé sous: ${fileName}.pdf`
          }
        </p>
      )}
    </div>
  );
};

export default DownloadButton;

