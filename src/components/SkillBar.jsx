import React from 'react';
import { TrendingUp } from 'lucide-react';

const SkillBar = ({ skill, sectionId, updateItem, previewMode, cvLanguage }) => {
  const getSkillLevel = (level) => {
    if (level >= 90) return { text: cvLanguage === 'english' ? 'Expert' : 'Expert', color: 'from-emerald-500 to-green-600' };
    if (level >= 75) return { text: cvLanguage === 'english' ? 'Advanced' : 'Avancé', color: 'from-blue-500 to-indigo-600' };
    if (level >= 50) return { text: cvLanguage === 'english' ? 'Intermediate' : 'Intermédiaire', color: 'from-yellow-500 to-orange-500' };
    if (level >= 25) return { text: cvLanguage === 'english' ? 'Beginner' : 'Débutant', color: 'from-red-400 to-pink-500' };
    return { text: cvLanguage === 'english' ? 'Novice' : 'Novice', color: 'from-gray-400 to-gray-500' };
  };

  const skillLevel = getSkillLevel(skill.level);

  return (
    <div className="space-y-3">
      {/* Skill Name and Level */}
      <div className="flex justify-between items-center gap-4">
        <input
          type="text"
          value={skill.name}
          onChange={(e) => updateItem(sectionId, skill.id, 'name', e.target.value)}
          className={`font-semibold text-gray-800 bg-transparent border-none outline-none flex-1 placeholder-gray-400 transition-all duration-200 ${
            !previewMode ? 'hover:bg-white focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-lg px-3 py-2' : ''
          }`}
          placeholder={cvLanguage === 'english' ? 'Skill name' : 'Nom de la compétence'}
          readOnly={previewMode}
        />
        
        <div className="flex items-center gap-3">
          {!previewMode && (
            <input
              type="number"
              value={skill.level}
              onChange={(e) => updateItem(sectionId, skill.id, 'level', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-16 px-2 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
              min="0"
              max="100"
              readOnly={previewMode}
            />
          )}
          
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium px-2 py-1 rounded-full bg-gradient-to-r ${skillLevel.color} text-white shadow-sm`}>
              {skill.level}%
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {skillLevel.text}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
          <div 
            className={`h-3 rounded-full bg-gradient-to-r ${skillLevel.color} transition-all duration-700 ease-out shadow-sm relative overflow-hidden`}
            style={{ width: `${skill.level}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
          </div>
        </div>
        
        {/* Skill level indicator */}
        {skill.level > 0 && (
          <div 
            className="absolute top-0 transform -translate-y-8 transition-all duration-500"
            style={{ left: `${Math.max(0, Math.min(95, skill.level - 2))}%` }}
          >
            <div className="flex flex-col items-center">
              <TrendingUp className="w-4 h-4 text-indigo-600 mb-1" />
              <div className="w-0.5 h-2 bg-indigo-600 rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Skill level description */}
      {previewMode && skill.level > 0 && (
        <div className="text-xs text-gray-600 italic">
          {cvLanguage === 'english' 
            ? `${skillLevel.text} level proficiency`
            : `Niveau de maîtrise ${skillLevel.text.toLowerCase()}`
          }
        </div>
      )}
    </div>
  );
};

export default SkillBar;

