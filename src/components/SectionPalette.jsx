import React from 'react';
import { Plus, Sparkles } from 'lucide-react';

const SectionPalette = ({ availableSections, cvLanguage, onAddSection }) => {
  const onDragStart = (e, sectionId) => {
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.effectAllowed = 'copy';
    e.target.classList.add('opacity-60', 'scale-95', 'shadow-lg');
  };

  const onDragEnd = (e) => {
    e.target.classList.remove('opacity-60', 'scale-95', 'shadow-lg');
  };

  if (availableSections.length === 0) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-center gap-3 text-green-700">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">
            {cvLanguage === 'english' ? 'All sections added! Your CV is complete.' : 'Toutes les sections ajoutées ! Votre CV est complet.'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200 rounded-xl p-6 mb-8">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Plus className="w-5 h-5 text-indigo-600" />
          {cvLanguage === 'english' ? 'Add More Sections' : 'Ajouter Plus de Sections'}
        </h3>
        <p className="text-sm text-gray-600">
          {cvLanguage === 'english' 
            ? 'Click or drag sections below to add them to your CV'
            : 'Cliquez ou glissez les sections ci-dessous pour les ajouter à votre CV'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {availableSections.map((section) => (
          <div
            key={section.id}
            draggable="true"
            onDragStart={(e) => onDragStart(e, section.id)}
            onDragEnd={onDragEnd}
            onClick={() => onAddSection(section)}
            className="
              flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 
              cursor-pointer hover:border-indigo-400 hover:shadow-lg hover:-translate-y-1
              transition-all duration-300 active:cursor-grabbing group
              hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50
            "
          >
            <div className="p-2.5 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors duration-200">
              <section.icon className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-gray-800 group-hover:text-indigo-700 text-sm block truncate transition-colors duration-200">
                {cvLanguage === 'english' ? section.title : section.titleFrench}
              </span>
            </div>
            <Plus className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200 flex-shrink-0" />
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 italic">
          {cvLanguage === 'english' 
            ? 'Tip: You can reorder sections by dragging them after adding'
            : 'Astuce: Vous pouvez réorganiser les sections en les glissant après les avoir ajoutées'}
        </p>
      </div>
    </div>
  );
};

export default SectionPalette;

