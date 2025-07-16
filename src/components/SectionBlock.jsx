import React from 'react';
import { Trash2, GripVertical, Plus, X, Edit3 } from 'lucide-react';
import SkillBar from './SkillBar';

const SectionBlock = ({
  section,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  removeSection,
  removeItem,
  updateItem,
  editingSection,
  setEditingSection,
  newItem,
  setNewItem,
  addItem,
  previewMode,
  cvLanguage
}) => (
  <div
    draggable={!previewMode}
    onDragStart={(e) => onDragStart(e, index)}
    onDragOver={onDragOver}
    onDrop={(e) => onDrop(e, index)}
    className={`
      bg-white rounded-xl border border-gray-200 overflow-hidden mb-6
      transition-all duration-300 hover:shadow-lg
      ${!previewMode ? 'hover:border-indigo-300' : ''}
    `}
  >
    {/* Section Header */}
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {!previewMode && (
            <div className="cursor-move p-1 hover:bg-gray-200 rounded transition-colors">
              <GripVertical className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 rounded-lg">
              <section.icon className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
          </div>
        </div>
        {!previewMode && (
          <button
            onClick={() => removeSection(section.id)}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            title={cvLanguage === 'english' ? 'Remove section' : 'Supprimer la section'}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>

    {/* Section Content */}
    <div className="p-6">
      <div className="space-y-4">
        {section.items.map((item) => (
          <div 
            key={item.id} 
            className={`
              relative group p-5 rounded-xl border border-gray-100 
              transition-all duration-300 hover:shadow-md
              ${!previewMode ? 'hover:border-indigo-200 hover:bg-indigo-50/30' : 'bg-gray-50/50'}
            `}
          >
            {!previewMode && (
              <button
                onClick={() => removeItem(section.id, item.id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-lg"
                title={cvLanguage === 'english' ? 'Remove item' : 'Supprimer l\'élément'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            {/* Render different content based on section type */}
            {section.id === 'skills' ? (
              <SkillBar 
                skill={item} 
                sectionId={section.id} 
                updateItem={updateItem} 
                previewMode={previewMode} 
                cvLanguage={cvLanguage} 
              />
            ) : section.id === 'languages' ? (
              <div className="flex justify-between items-center gap-4">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(section.id, item.id, 'name', e.target.value)}
                  className={`font-semibold text-gray-800 bg-transparent border-none outline-none flex-1 placeholder-gray-400 transition-all duration-200 ${
                    !previewMode ? 'hover:bg-white focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-lg px-3 py-2' : ''
                  }`}
                  placeholder={cvLanguage === 'english' ? 'Language name' : 'Nom de la langue'}
                  readOnly={previewMode}
                />
                <select
                  value={item.level}
                  onChange={(e) => updateItem(section.id, item.id, 'level', e.target.value)}
                  className={`text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-2 transition-all duration-200 ${
                    !previewMode ? 'hover:border-indigo-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200' : ''
                  }`}
                  disabled={previewMode}
                >
                  <option value="">{cvLanguage === 'english' ? 'Select level' : 'Sélectionner le niveau'}</option>
                  <option value="A1">{cvLanguage === 'english' ? 'A1 - Beginner' : 'A1 - Débutant'}</option>
                  <option value="A2">{cvLanguage === 'english' ? 'A2 - Elementary' : 'A2 - Élémentaire'}</option>
                  <option value="B1">{cvLanguage === 'english' ? 'B1 - Intermediate' : 'B1 - Intermédiaire'}</option>
                  <option value="B2">{cvLanguage === 'english' ? 'B2 - Upper Intermediate' : 'B2 - Intermédiaire Supérieur'}</option>
                  <option value="C1">{cvLanguage === 'english' ? 'C1 - Advanced' : 'C1 - Avancé'}</option>
                  <option value="C2">{cvLanguage === 'english' ? 'C2 - Proficiency' : 'C2 - Maîtrise'}</option>
                  <option value="Native">{cvLanguage === 'english' ? 'Native' : 'Natif'}</option>
                </select>
              </div>
            ) : section.id === 'hobbies' ? (
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(section.id, item.id, 'name', e.target.value)}
                className={`text-gray-700 bg-transparent border-none outline-none w-full placeholder-gray-400 transition-all duration-200 ${
                  !previewMode ? 'hover:bg-white focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-lg px-3 py-2' : ''
                }`}
                placeholder={cvLanguage === 'english' ? 'Hobby or interest' : 'Loisir ou intérêt'}
                readOnly={previewMode}
              />
            ) : (
              <div className="space-y-4">
                {/* Title and Period */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateItem(section.id, item.id, 'title', e.target.value)}
                    className={`font-bold text-lg text-gray-800 bg-transparent border-none outline-none flex-1 placeholder-gray-400 transition-all duration-200 ${
                      !previewMode ? 'hover:bg-white focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-lg px-3 py-2' : ''
                    }`}
                    placeholder={section.id === 'certifications'
                      ? (cvLanguage === 'english' ? 'Certification name' : 'Nom de la certification')
                      : (cvLanguage === 'english' ? 'Job title or degree' : 'Titre du poste ou diplôme')}
                    readOnly={previewMode}
                  />
                  <input
                    type="text"
                    value={item.period}
                    onChange={(e) => updateItem(section.id, item.id, 'period', e.target.value)}
                    className={`text-sm font-medium text-gray-600 bg-transparent border-none outline-none placeholder-gray-400 transition-all duration-200 ${
                      !previewMode ? 'hover:bg-white focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-lg px-3 py-2' : ''
                    }`}
                    placeholder="2020 - Present"
                    readOnly={previewMode}
                  />
                </div>

                {/* Company/Institution */}
                <input
                  type="text"
                  value={item.company}
                  onChange={(e) => updateItem(section.id, item.id, 'company', e.target.value)}
                  className={`text-indigo-600 font-semibold bg-transparent border-none outline-none w-full placeholder-indigo-300 transition-all duration-200 ${
                    !previewMode ? 'hover:bg-white focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-lg px-3 py-2' : ''
                  }`}
                  placeholder={section.id === 'certifications'
                    ? (cvLanguage === 'english' ? 'Issuing organization' : 'Organisation émettrice')
                    : (cvLanguage === 'english' ? 'Company or institution name' : 'Nom de l\'entreprise ou de l\'institution')}
                  readOnly={previewMode}
                />

                {/* Description */}
                <textarea
                  value={item.description}
                  onChange={(e) => updateItem(section.id, item.id, 'description', e.target.value)}
                  className={`text-gray-600 bg-transparent border-none outline-none w-full resize-none placeholder-gray-400 transition-all duration-200 ${
                    !previewMode ? 'hover:bg-white focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-lg px-3 py-2 min-h-[80px]' : 'min-h-[60px]'
                  }`}
                  placeholder={cvLanguage === 'english'
                    ? 'Describe your responsibilities and achievements...'
                    : 'Décrivez vos responsabilités et réalisations...'}
                  readOnly={previewMode}
                  rows={3}
                />
              </div>
            )}
          </div>
        ))}

        {/* Add New Item */}
        {!previewMode && (
          <>
            {editingSection === section.id ? (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-xl border-2 border-indigo-200">
                <div className="flex items-center gap-2 mb-3">
                  <Edit3 className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-indigo-700">
                    {cvLanguage === 'english' ? 'Add new item' : 'Ajouter un nouvel élément'}
                  </span>
                </div>
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder={cvLanguage === 'english'
                    ? `Add new ${section.title.toLowerCase().slice(0, -1)}`
                    : `Ajouter un nouvel ${section.title.toLowerCase().slice(0, -1)}`}
                  className="w-full p-3 border border-indigo-200 rounded-lg mb-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  onKeyPress={(e) => e.key === 'Enter' && addItem(section.id)}
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => addItem(section.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                  >
                    {cvLanguage === 'english' ? 'Add' : 'Ajouter'}
                  </button>
                  <button
                    onClick={() => setEditingSection(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 text-sm font-medium"
                  >
                    {cvLanguage === 'english' ? 'Cancel' : 'Annuler'}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setEditingSection(section.id)}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center gap-3 text-sm font-medium group"
              >
                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                {cvLanguage === 'english' ? `Add ${section.title.slice(0, -1)}` : `Ajouter ${section.title.slice(0, -1)}`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  </div>
);

export default SectionBlock;

