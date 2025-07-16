import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import { 
  Briefcase, GraduationCap, Wrench, Languages, Heart, FileText, 
  User, Phone, MapPin, Globe, Calendar, Users, Camera, Download, X, Plus, Edit, Eye, EyeOff, Lightbulb, CheckCircle, Sparkles 
} from 'lucide-react';

const LanguageSelector = ({ handleLanguageSelect, cvLanguage }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50 p-4">
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full border border-gray-100">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {cvLanguage === 'english' ? 'Welcome to CV Builder' : 'Bienvenue dans le Constructeur de CV'}
        </h2>
        <p className="text-gray-600 text-sm">
          {cvLanguage === 'english' ? 'Choose your language to start' : 'Choisissez votre langue pour commencer'}
        </p>
      </div>
      <div className="space-y-4">
        {['english', 'french'].map(lang => (
          <button
            key={lang}
            onClick={() => handleLanguageSelect(lang)}
            className={`w-full p-4 rounded-lg border-2 flex items-center justify-between transition-all duration-300 group ${
              cvLanguage === lang ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${lang === 'english' ? 'bg-blue-100' : 'bg-red-100'}`}>
                <span className={`font-semibold text-sm ${lang === 'english' ? 'text-blue-600' : 'text-red-600'}`}>
                  {lang === 'english' ? 'EN' : 'FR'}
                </span>
              </div>
              <div className="text-left">
                <div className="font-semibold capitalize">{lang}</div>
                <div className="text-sm text-gray-500">{lang === 'english' ? 'International' : 'France & Canada'}</div>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const FormatSelector = ({ formatLabels, handleFormatSelect, handleLanguageSelect, handleBackToLanguageSelection, cvLanguage }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50 p-4">
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full border border-gray-100">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {cvLanguage === 'english' ? 'Select CV Format' : 'Sélectionnez le Format du CV'}
        </h1>
        <p className="text-gray-600 text-sm">
          {cvLanguage === 'english' ? 'Choose a format for your target market' : 'Choisissez un format adapté à votre marché cible'}
        </p>
      </div>
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {cvLanguage === 'english' ? 'Language:' : 'Langue:'}
          </span>
          <div className="flex gap-2">
            {['english', 'french'].map(lang => (
              <button
                key={lang}
                onClick={() => handleLanguageSelect(lang)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  cvLanguage === lang ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {lang === 'english' ? 'English' : 'Français'}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {Object.entries(formatLabels).map(([format, details]) => (
          <div
            key={format}
            onClick={() => handleFormatSelect(format)}
            className="p-6 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:shadow-xl transition-all duration-300 bg-white hover:bg-blue-50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${details.color}`} />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{details.name}</h3>
                  <p className="text-sm text-gray-600">{details.description}</p>
                </div>
              </div>
              <CheckCircle className="w-6 h-6 text-blue-600 opacity-0 hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-wrap gap-2">
              {details.features.map((feature, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleBackToLanguageSelection}
        className="mt-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all text-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {cvLanguage === 'english' ? 'Back to Language' : 'Retour à la Langue'}
      </button>
    </div>
  </div>
);

const ProfileSection = ({ profile, setProfile, cvFormat, handlePhotoUpload, cvLanguage, previewMode }) => (
  <div className={`p-6 rounded-lg ${cvFormat === 'french' ? 'bg-gray-50 border border-gray-200' : ''} ${previewMode ? 'cv-profile-section' : ''}`}>
    <div className="flex flex-col sm:flex-row gap-6">
      <div className="relative w-32 h-32">
        <div className={`w-full h-full rounded-lg bg-gradient-to-br from-blue-100 to-slate-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-md ${previewMode ? 'cv-photo' : ''}`}>
          {profile.photo ? (
            <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center">
              <Camera className="w-8 h-8 text-gray-400 mx-auto" />
              <span className="text-xs text-gray-500">{cvLanguage === 'english' ? 'Upload Photo' : 'Ajouter Photo'}</span>
            </div>
          )}
        </div>
        {!previewMode && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
              id="photo-upload"
            />
            <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full">
              <Camera className="w-4 h-4" />
            </div>
          </>
        )}
      </div>
      <div className="flex-1 space-y-4">
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          placeholder={cvLanguage === 'english' ? 'Full Name' : 'Nom Complet'}
          className={`text-2xl font-bold text-gray-900 w-full ${previewMode ? 'bg-transparent border-none cv-name' : 'border-b border-gray-200 focus:border-blue-500'}`}
          readOnly={previewMode}
        />
        <input
          type="text"
          value={profile.title}
          onChange={(e) => setProfile({ ...profile, title: e.target.value })}
          placeholder={cvLanguage === 'english' ? 'Job Title' : 'Titre Professionnel'}
          className={`text-lg text-blue-600 w-full ${previewMode ? 'bg-transparent border-none cv-title' : 'border-b border-gray-200 focus:border-blue-500'}`}
          readOnly={previewMode}
        />
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${previewMode ? 'cv-contact' : ''}`}>
          {[
            { icon: User, key: 'email', placeholder: 'email@example.com', type: 'email' },
            { icon: Phone, key: 'phone', placeholder: cvLanguage === 'english' ? 'Phone Number' : 'Numéro de Téléphone', type: 'tel' },
            { icon: MapPin, key: 'location', placeholder: cvLanguage === 'english' ? 'City, Country' : 'Ville, Pays', type: 'text' },
            { icon: Globe, key: 'website', placeholder: 'website.com', type: 'url' },
          ].map(({ icon: Icon, key, placeholder, type }) => (
            <div key={key} className={`flex items-center gap-3 ${previewMode ? 'cv-contact-item' : ''}`}>
              <Icon className="w-5 h-5 text-blue-600" />
              <input
                type={type}
                value={profile[key]}
                onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                placeholder={placeholder}
                className={`flex-1 ${previewMode ? 'bg-transparent border-none' : 'border-b border-gray-200 focus:border-blue-500'}`}
                readOnly={previewMode}
              />
            </div>
          ))}
        </div>
        {cvFormat === 'french' && (
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              {cvLanguage === 'english' ? 'Personal Details' : 'Détails Personnels'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <input
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                  className={`flex-1 ${previewMode ? 'bg-transparent border-none' : 'border-b border-gray-200 focus:border-blue-500'}`}
                  readOnly={previewMode}
                />
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <input
                  type="text"
                  value={profile.nationality}
                  onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
                  placeholder={cvLanguage === 'english' ? 'Nationality' : 'Nationalité'}
                  className={`flex-1 ${previewMode ? 'bg-transparent border-none' : 'border-b border-gray-200 focus:border-blue-500'}`}
                  readOnly={previewMode}
                />
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <select
                  value={profile.maritalStatus}
                  onChange={(e) => setProfile({ ...profile, maritalStatus: e.target.value })}
                  className={`flex-1 ${previewMode ? 'bg-transparent border-none' : 'border-b border-gray-200 focus:border-blue-500'}`}
                  disabled={previewMode}
                >
                  <option value="">{cvLanguage === 'english' ? 'Marital Status' : 'État Civil'}</option>
                  {['single', 'married', 'divorced', 'widowed'].map(status => (
                    <option key={status} value={status}>
                      {cvLanguage === 'english' ? status.charAt(0).toUpperCase() + status.slice(1) : 
                        status === 'single' ? 'Célibataire' : 
                        status === 'married' ? 'Marié' : 
                        status === 'divorced' ? 'Divorcé' : 'Veuf'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

const SummaryEditor = ({ summary, onChange, cvFormat, cvLanguage, previewMode }) => {
  const [wordCount, setWordCount] = useState(0);
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    setWordCount(summary.trim().split(/\s+/).filter(word => word.length > 0).length);
  }, [summary]);

  const optimalWordCount = cvFormat === 'canadian' ? { min: 50, max: 100 } : { min: 80, max: 150 };
  const status = wordCount === 0 ? 'empty' : 
                 wordCount < optimalWordCount.min ? 'too-short' : 
                 wordCount > optimalWordCount.max ? 'too-long' : 'optimal';

  const getSampleSummaries = () => {
    const samples = {
      english: {
        canadian: [
          "Dynamic Software Engineer with 5+ years in scalable web apps, boosting performance by 35%. Skilled in React, Node.js, and AWS. Seeking innovative tech roles.",
          "Marketing Specialist with 6+ years driving 50% brand growth via SEO and analytics. Passionate about impactful campaigns."
        ],
        french: [
          "Experienced Software Engineer with 5+ years in web development, improving system efficiency by 35%. Expert in React and AWS. Seeking challenging tech roles.",
          "Marketing Expert with 6+ years, increasing brand visibility by 50%. Skilled in SEO and data-driven strategies."
        ]
      },
      french: {
        canadian: [
          "Ingénieur logiciel dynamique avec 5+ ans en applications web, améliorant les performances de 35%. Compétent en React, Node.js et AWS.",
          "Spécialiste marketing avec 6+ ans, augmentant la notoriété de marque de 50% via SEO et analyses."
        ],
        french: [
          "Ingénieur logiciel expérimenté avec 5+ ans, optimisant l'efficacité système de 35%. Expert en React et AWS.",
          "Expert marketing avec 6+ ans, boostant la visibilité de marque de 50% avec des stratégies SEO."
        ]
      }
    };
    return samples[cvLanguage][cvFormat];
  };

  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <div>
              <h2 className="text-xl font-bold text-gray-900">
                {cvLanguage === 'english' ? 'Professional Summary' : 'Résumé Professionnel'}
              </h2>
              <p className="text-sm text-gray-600">
                {cvLanguage === 'english' ? 'Highlight your key achievements' : 'Mettez en avant vos réalisations clés'}
              </p>
            </div>
          </div>
          {!previewMode && (
            <button
              onClick={() => setShowTips(!showTips)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              <Lightbulb className="w-4 h-4" />
              {cvLanguage === 'english' ? 'Show Tips' : 'Voir Conseils'}
            </button>
          )}
        </div>
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-4">
          <span className={`flex items-center gap-2 text-sm font-medium ${
            status === 'optimal' ? 'text-green-600' : status === 'too-short' ? 'text-yellow-600' : status === 'too-long' ? 'text-red-600' : 'text-gray-400'
          }`}>
            <CheckCircle className="w-4 h-4" />
            {wordCount} {cvLanguage === 'english' ? 'words' : 'mots'} ({optimalWordCount.min}-{optimalWordCount.max})
          </span>
        </div>
        {showTips && !previewMode && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            {getSampleSummaries().map((sample, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border mb-2">
                <p className="text-sm text-gray-700 mb-2">{sample}</p>
                <button
                  onClick={() => onChange({ target: { value: sample } })}
                  className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                >
                  {cvLanguage === 'english' ? 'Use this' : 'Utiliser ceci'}
                </button>
              </div>
            ))}
          </div>
        )}
        <textarea
          value={summary}
          onChange={onChange}
          placeholder={cvLanguage === 'english' ? 'Write your professional summary...' : 'Rédigez votre résumé professionnel...'}
          className={`w-full p-4 rounded-lg border ${previewMode ? 'bg-gray-50' : 'border-gray-200 focus:border-blue-500'}`}
          rows={5}
          readOnly={previewMode}
        />
      </div>
    </div>
  );
};

const SectionPalette = ({ availableSections, cvLanguage, onAddSection }) => (
  <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
    <h3 className="text-lg font-bold text-gray-900 mb-4">
      {cvLanguage === 'english' ? 'Add Sections' : 'Ajouter des Sections'}
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {availableSections.map(section => (
        <div
          key={section.id}
          onClick={() => onAddSection(section)}
          className="p-4 bg-gray-50 rounded-lg border hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all"
        >
          <div className="flex items-center gap-3">
            <section.icon className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-800">
              {cvLanguage === 'english' ? section.title : section.titleFrench}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SkillBar = ({ skill, sectionId, updateItem, previewMode, cvLanguage }) => {
  const skillLevel = skill.level >= 90 ? { text: cvLanguage === 'english' ? 'Expert' : 'Expert', color: 'bg-green-500' } :
                    skill.level >= 75 ? { text: cvLanguage === 'english' ? 'Advanced' : 'Avancé', color: 'bg-blue-500' } :
                    skill.level >= 50 ? { text: cvLanguage === 'english' ? 'Intermediate' : 'Intermédiaire', color: 'bg-yellow-500' } :
                    skill.level >= 25 ? { text: cvLanguage === 'english' ? 'Beginner' : 'Débutant', color: 'bg-red-500' } :
                    { text: cvLanguage === 'english' ? 'Novice' : 'Novice', color: 'bg-gray-500' };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <input
          type="text"
          value={skill.name}
          onChange={(e) => updateItem(sectionId, skill.id, 'name', e.target.value)}
          placeholder={cvLanguage === 'english' ? 'Skill Name' : 'Nom de la Compétence'}
          className={`flex-1 ${previewMode ? 'bg-transparent' : 'border-b border-gray-200 focus:border-blue-500'}`}
          readOnly={previewMode}
        />
        {!previewMode && (
          <input
            type="number"
            value={skill.level}
            onChange={(e) => updateItem(sectionId, skill.id, 'level', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-16 border-b border-gray-200 focus:border-blue-500"
            min="0"
            max="100"
          />
        )}
        <span className={`px-2 py-1 text-xs text-white rounded-full ${skillLevel.color}`}>
          {skillLevel.text} ({skill.level}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`h-2 rounded-full ${skillLevel.color}`} style={{ width: `${skill.level}%` }} />
      </div>
    </div>
  );
};

const SectionBlock = ({
  section, index, onDragStart, onDragOver, onDrop, removeSection, removeItem, updateItem, editingSection, setEditingSection, newItem, setNewItem, addItem, previewMode, cvLanguage
}) => (
  <div
    draggable={!previewMode}
    onDragStart={(e) => onDragStart(e, index)}
    onDragOver={onDragOver}
    onDrop={(e) => onDrop(e, index)}
    className="bg-white rounded-lg border border-gray-200 mb-6"
  >
    <div className="flex items-center justify-between p-4 bg-gray-50">
      <div className="flex items-center gap-3">
        {!previewMode && (
          <svg className="w-5 h-5 text-gray-400 cursor-move" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
        <section.icon className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
      </div>
      {!previewMode && (
        <button onClick={() => removeSection(section.id)} className="text-red-500 hover:text-red-600">
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
    <div className="p-4">
      {section.items.map(item => (
        <div key={item.id} className="p-4 border-b border-gray-200 relative group">
          {!previewMode && (
            <button
              onClick={() => removeItem(section.id, item.id)}
              className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {section.id === 'skills' ? (
            <SkillBar
              skill={item}
              sectionId={section.id}
              updateItem={updateItem}
              previewMode={previewMode}
              cvLanguage={cvLanguage}
            />
          ) : section.id === 'languages' ? (
            <div className="flex gap-4">
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(section.id, item.id, 'name', e.target.value)}
                placeholder={cvLanguage === 'english' ? 'Language' : 'Langue'}
                className={`flex-1 ${previewMode ? 'bg-transparent' : 'border-b border-gray-200 focus:border-blue-500'}`}
                readOnly={previewMode}
              />
              <select
                value={item.level}
                onChange={(e) => updateItem(section.id, item.id, 'level', e.target.value)}
                className={`w-32 ${previewMode ? 'bg-transparent' : 'border-b border-gray-200 focus:border-blue-500'}`}
                disabled={previewMode}
              >
                {['', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'].map(level => (
                  <option key={level} value={level}>
                    {level === '' ? (cvLanguage === 'english' ? 'Level' : 'Niveau') : 
                     level === 'Native' ? (cvLanguage === 'english' ? 'Native' : 'Natif') : level}
                  </option>
                ))}
              </select>
            </div>
          ) : section.id === 'hobbies' ? (
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(section.id, item.id, 'name', e.target.value)}
              placeholder={cvLanguage === 'english' ? 'Hobby' : 'Loisir'}
              className={`w-full ${previewMode ? 'bg-transparent' : 'border-b border-gray-200 focus:border-blue-500'}`}
              readOnly={previewMode}
            />
          ) : (
            <div className="space-y-2">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateItem(section.id, item.id, 'title', e.target.value)}
                  placeholder={section.id === 'certifications' ? (cvLanguage === 'english' ? 'Certification' : 'Certification') : (cvLanguage === 'english' ? 'Title' : 'Titre')}
                  className={`flex-1 ${previewMode ? 'bg-transparent' : 'border-b border-gray-200 focus:border-blue-500'}`}
                  readOnly={previewMode}
                />
                <input
                  type="text"
                  value={item.period}
                  onChange={(e) => updateItem(section.id, item.id, 'period', e.target.value)}
                  placeholder="2020 - Present"
                  className={`w-32 ${previewMode ? 'bg-transparent' : 'border-b border-gray-200 focus:border-blue-500'}`}
                  readOnly={previewMode}
                />
              </div>
              <input
                type="text"
                value={item.company}
                onChange={(e) => updateItem(section.id, item.id, 'company', e.target.value)}
                placeholder={section.id === 'certifications' ? (cvLanguage === 'english' ? 'Issuing Organization' : 'Organisation Émettrice') : (cvLanguage === 'english' ? 'Company/Institution' : 'Entreprise/Institution')}
                className={`w-full ${previewMode ? 'bg-transparent' : 'border-b border-gray-200 focus:border-blue-500'}`}
                readOnly={previewMode}
              />
              <textarea
                value={item.description}
                onChange={(e) => updateItem(section.id, item.id, 'description', e.target.value)}
                placeholder={cvLanguage === 'english' ? 'Description...' : 'Description...'}
                className={`w-full ${previewMode ? 'bg-transparent' : 'border-b border-gray-200 focus:border-blue-500'}`}
                rows={3}
                readOnly={previewMode}
              />
            </div>
          )}
        </div>
      ))}
      {!previewMode && (
        editingSection === section.id ? (
          <div className="p-4 bg-gray-50 rounded-lg">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={cvLanguage === 'english' ? `Add new ${section.title.toLowerCase()}` : `Ajouter ${section.title.toLowerCase()}`}
              className="w-full p-2 border border-gray-200 rounded-lg focus:border-blue-500 mb-2"
              onKeyPress={(e) => e.key === 'Enter' && addItem(section.id)}
            />
            <div className="flex gap-2">
              <button
                onClick={() => addItem(section.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {cvLanguage === 'english' ? 'Add' : 'Ajouter'}
              </button>
              <button
                onClick={() => setEditingSection(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                {cvLanguage === 'english' ? 'Cancel' : 'Annuler'}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setEditingSection(section.id)}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-600"
          >
            <Plus className="w-5 h-5 inline-block mr-2" />
            {cvLanguage === 'english' ? `Add ${section.title.toLowerCase()}` : `Ajouter ${section.title.toLowerCase()}`}
          </button>
        )
      )}
    </div>
  </div>
);

const DownloadButton = ({ onClick, fileName, isLoading, cvLanguage }) => (
  <div className="text-center">
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all`}
    >
      {isLoading ? (
        <>
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 0116 0" />
          </svg>
          {cvLanguage === 'english' ? 'Generating...' : 'Génération...'}
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          {cvLanguage === 'english' ? 'Download CV' : 'Télécharger CV'}
        </>
      )}
    </button>
    <p className="mt-2 text-sm text-gray-600">
      {cvLanguage === 'english' ? `File: ${fileName}.pdf` : `Fichier: ${fileName}.pdf`}
    </p>
  </div>
);

const CVBuilder = () => {
  const [cvFormat, setCvFormat] = useState(null);
  const [cvLanguage, setCvLanguage] = useState(localStorage.getItem('cvLanguage') || 'english');
  const [showFormatSelector, setShowFormatSelector] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [profile, setProfile] = useState({
    name: '', title: '', email: '', phone: '', location: '', website: '',
    dateOfBirth: '', nationality: '', maritalStatus: '', photo: null, summary: ''
  });
  const [sections, setSections] = useState([
    { id: 'experience', title: 'Work Experience', titleFrench: 'Expérience Professionnelle', icon: Briefcase, items: [], isActive: true },
    { id: 'education', title: 'Education', titleFrench: 'Éducation', icon: GraduationCap, items: [], isActive: true },
  ]);
  const [editingSection, setEditingSection] = useState(null);
  const [newItem, setNewItem] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const availableSections = [
    { id: 'projects', title: 'Projects', titleFrench: 'Projets', icon: FileText },
    { id: 'skills', title: 'Skills', titleFrench: 'Compétences', icon: Wrench },
    { id: 'languages', title: 'Languages', titleFrench: 'Langues', icon: Languages },
    { id: 'hobbies', title: 'Interests', titleFrench: 'Intérêts', icon: Heart },
  ];

  const formatLabels = {
    canadian: {
      name: cvLanguage === 'english' ? 'Canadian Resume' : 'CV Canadien',
      description: cvLanguage === 'english' ? 'Modern, ATS-friendly format for North America' : 'Format moderne et compatible ATS pour l’Amérique du Nord',
      color: 'bg-blue-600',
      features: cvLanguage === 'english' ? ['ATS Optimized', 'Clean Design', 'Achievement-Driven'] : ['Optimisé ATS', 'Design Épuré', 'Axé sur les Réalisations'],
    },
    french: {
      name: cvLanguage === 'english' ? 'French CV' : 'CV Français',
      description: cvLanguage === 'english' ? 'Formal European format with personal details' : 'Format européen formel avec détails personnels',
      color: 'bg-slate-600',
      features: cvLanguage === 'english' ? ['Formal Layout', 'Personal Details', 'ATS Compatible'] : ['Mise en Page Formelle', 'Détails Personnels', 'Compatible ATS'],
    },
  };

  useEffect(() => {
    setSections(prev => prev.map(section => ({
      ...section,
      title: cvLanguage === 'english' ? section.title : section.titleFrench,
    })));
    localStorage.setItem('cvLanguage', cvLanguage);
  }, [cvLanguage]);

  const handleLanguageSelect = (language) => {
    setCvLanguage(language);
    setShowLanguageSelector(false);
    setShowFormatSelector(true);
  };

  const handleFormatSelect = (format) => {
    setCvFormat(format);
    setShowFormatSelector(false);
  };

  const handleBackToLanguageSelection = () => {
    setShowFormatSelector(false);
    setShowLanguageSelector(true);
  };

  const addSection = (sectionData) => {
    if (sections.find(s => s.id === sectionData.id)) return;
    setSections(prev => [
      ...prev,
      { ...sectionData, title: cvLanguage === 'english' ? sectionData.title : sectionData.titleFrench, items: [], isActive: true },
    ]);
  };

  const removeSection = (sectionId) => {
    setSections(prev => prev.filter(section => section.id !== sectionId));
  };

  const addItem = (sectionId) => {
    if (!newItem.trim()) return;
    setSections(prev => prev.map(section =>
      section.id === sectionId ? {
        ...section,
        items: [
          ...section.items,
          {
            id: `${sectionId}-${section.items.length + 1}`,
            title: section.id === 'skills' || section.id === 'languages' || section.id === 'hobbies' ? '' : newItem,
            company: '',
            period: '',
            description: '',
            name: section.id === 'skills' || section.id === 'languages' || section.id === 'hobbies' ? newItem : '',
            level: section.id === 'skills' ? 50 : section.id === 'languages' ? 'B1' : '',
          },
        ],
      } : section
    ));
    setNewItem('');
    setEditingSection(null);
  };

  const removeItem = (sectionId, itemId) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId ? { ...section, items: section.items.filter(item => item.id !== itemId) } : section
    ));
  };

  const updateItem = (sectionId, itemId, field, value) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId ? {
        ...section,
        items: section.items.map(item => item.id === itemId ? { ...item, [field]: value } : item),
      } : section
    ));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfile({ ...profile, photo: reader.result });
      reader.readAsDataURL(file);
    }
  };
const createPDFStyles = (cvFormat) => `
  <style>
    * { 
      margin: 0; 
      padding: 0; 
      box-sizing: border-box; 
      -webkit-print-color-adjust: exact !important; 
      color-adjust: exact !important; 
    }
    
    body { 
      font-family: 'Segoe UI', 'Calibri', 'Arial', sans-serif; 
      font-size: 11px; 
      line-height: 1.5; 
      color: #2c3e50; 
      background: white;
    }
    
    .cv-container { 
      width: 210mm; 
      min-height: 297mm; 
      margin: 0 auto; 
      padding: ${cvFormat === 'french' ? '18mm 15mm' : '15mm 12mm'}; 
      background: white;
      position: relative;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    
    /* Modern accent bar for Canadian format */
    ${cvFormat === 'canadian' ? `
      .cv-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 5mm;
        height: 100%;
        background: linear-gradient(to bottom, #1e40af, #1e3a8a, #1f2937);
      }
    ` : ''}
    
    /* Header Section */
    .cv-header { 
      ${cvFormat === 'french' 
        ? 'background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%); color: white; margin: -18mm -15mm 25mm -15mm; padding: 20mm 15mm 15mm 15mm;' 
        : 'border-bottom: 3px solid #3498db; padding-bottom: 20px; margin-bottom: 25px; position: relative;'}
      page-break-inside: avoid;
    }
    
    ${cvFormat === 'canadian' ? `
      .cv-header::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 60mm;
        height: 3px;
        background: linear-gradient(to right, #1e40af, #1f2937);
      }
    ` : ''}
    
    .cv-profile-section { 
      display: flex; 
      align-items: flex-start; 
      gap: ${cvFormat === 'french' ? '25px' : '20px'}; 
      margin-bottom: 0;
    }
    
    .cv-photo { 
      width: ${cvFormat === 'french' ? '120px' : '90px'}; 
      height: ${cvFormat === 'french' ? '160px' : '90px'}; 
      ${cvFormat === 'french' ? 'border-radius: 8px;' : 'border-radius: 50%;'}
      object-fit: cover; 
      border: ${cvFormat === 'french' ? '3px solid white' : '3px solid #ecf0f1'};
      flex-shrink: 0;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    
    .cv-name { 
      font-size: ${cvFormat === 'french' ? '28px' : '26px'}; 
      font-weight: 700; 
      color: ${cvFormat === 'french' ? 'white' : '#2c3e50'}; 
      margin-bottom: 8px;
      text-transform: ${cvFormat === 'french' ? 'uppercase' : 'none'};
      letter-spacing: ${cvFormat === 'french' ? '2px' : '0.5px'};
      line-height: 1.2;
    }
    
    .cv-title { 
      font-size: ${cvFormat === 'french' ? '14px' : '16px'}; 
      color: ${cvFormat === 'french' ? '#ecf0f1' : '#3498db'}; 
      font-weight: 500;
      margin-bottom: 15px;
      ${cvFormat === 'french' ? 'text-transform: uppercase; letter-spacing: 1px;' : 'font-style: italic;'}
    }
    
    .cv-contact { 
      display: grid; 
      grid-template-columns: ${cvFormat === 'french' ? '1fr 1fr' : '1fr'}; 
      gap: 8px; 
      font-size: 11px;
      color: ${cvFormat === 'french' ? '#ecf0f1' : '#34495e'};
    }
    
    .cv-contact-item { 
      display: flex; 
      align-items: center; 
      gap: 8px;
      margin-bottom: 4px;
      padding: 3px 0;
    }
    
    .cv-contact-item::before {
      content: attr(data-icon);
      font-size: 14px;
      width: 16px;
      text-align: center;
      color: ${cvFormat === 'french' ? '#3498db' : '#3498db'};
    }
    
    /* Summary Section */
    .cv-summary { 
      background: ${cvFormat === 'french' 
        ? 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' 
        : 'linear-gradient(135deg, #ebf3fd 0%, #d6eaff 100%)'}; 
      padding: 20px; 
      border-radius: 8px;
      ${cvFormat === 'french' ? 'border-left: 5px solid #e74c3c;' : 'border-left: 5px solid #3498db;'}
      margin: 25px 0; 
      page-break-inside: avoid;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    
    .cv-summary h3 { 
      font-size: 16px; 
      font-weight: 700; 
      color: ${cvFormat === 'french' ? '#2c3e50' : '#2980b9'}; 
      margin-bottom: 12px;
      ${cvFormat === 'french' ? 'text-transform: uppercase; letter-spacing: 1px;' : ''}
      position: relative;
    }
    
    .cv-summary h3::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 40px;
      height: 2px;
      background: ${cvFormat === 'french' ? '#e74c3c' : '#3498db'};
    }
    
    .cv-summary p { 
      color: #34495e; 
      text-align: justify;
      line-height: 1.6;
      font-size: 11.5px;
    }
    
    /* Section Styling */
    .cv-section { 
      margin-bottom: 30px; 
      page-break-inside: avoid;
    }
    
    .cv-section-title { 
      font-size: 18px; 
      font-weight: 700; 
      color: ${cvFormat === 'french' ? '#2c3e50' : '#2980b9'}; 
      margin-bottom: 20px;
      ${cvFormat === 'french' ? 'text-transform: uppercase; letter-spacing: 1.5px;' : ''}
      position: relative;
      padding-bottom: 8px;
    }
    
    .cv-section-title::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: #ecf0f1;
    }
    
    .cv-section-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 3px;
      background: ${cvFormat === 'french' 
        ? 'linear-gradient(to right, #e74c3c, #c0392b)' 
        : 'linear-gradient(to right, #3498db, #2980b9)'};
      border-radius: 2px;
    }
    
    /* Items in sections */
    .cv-item { 
      margin-bottom: 18px; 
      padding: 15px;
      border-radius: 6px;
      background: #fdfdfd;
      border: 1px solid #f1f2f6;
      page-break-inside: avoid;
      position: relative;
      transition: all 0.3s ease;
    }
    
    .cv-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: ${cvFormat === 'french' 
        ? 'linear-gradient(to bottom, #e74c3c, #c0392b)' 
        : 'linear-gradient(to bottom, #3498db, #2980b9)'};
      border-radius: 0 2px 2px 0;
    }
    
    .cv-item:last-child { 
      margin-bottom: 0; 
    }
    
    .cv-item-header { 
      display: flex; 
      justify-content: space-between; 
      align-items: flex-start; 
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    
    .cv-item-title { 
      font-weight: 700; 
      color: #2c3e50; 
      font-size: 13px;
      flex: 1;
      line-height: 1.3;
    }
    
    .cv-item-company { 
      color: #7f8c8d; 
      font-style: italic; 
      font-size: 11px;
      margin-top: 3px;
      font-weight: 500;
    }
    
    .cv-item-period { 
      color: white; 
      font-size: 10px; 
      font-weight: 600;
      white-space: nowrap;
      background: ${cvFormat === 'french' 
        ? 'linear-gradient(135deg, #e74c3c, #c0392b)' 
        : 'linear-gradient(135deg, #3498db, #2980b9)'};
      padding: 4px 10px;
      border-radius: 15px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    .cv-item-description { 
      color: #34495e; 
      margin-top: 10px; 
      text-align: justify;
      line-height: 1.5;
      font-size: 10.5px;
    }
    
    /* Skills Section */
    .cv-skills-grid { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 15px;
    }
    
    .cv-skill-item { 
      margin-bottom: 12px;
      padding: 12px;
      background: #fdfdfd;
      border-radius: 6px;
      border: 1px solid #f1f2f6;
    }
    
    .cv-skill-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    
    .cv-skill-name { 
      font-weight: 600; 
      font-size: 11px;
      color: #2c3e50;
    }
    
    .cv-skill-level {
      font-size: 9px;
      color: white;
      background: ${cvFormat === 'french' 
        ? 'linear-gradient(135deg, #e74c3c, #c0392b)' 
        : 'linear-gradient(135deg, #3498db, #2980b9)'};
      padding: 2px 6px;
      border-radius: 10px;
      font-weight: 600;
    }
    
    .cv-skill-bar { 
      height: 8px; 
      background: #ecf0f1; 
      border-radius: 4px; 
      overflow: hidden;
      position: relative;
      box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
    }
    
    .cv-skill-fill { 
      height: 100%; 
      background: ${cvFormat === 'french' 
        ? 'linear-gradient(90deg, #e74c3c, #c0392b)' 
        : 'linear-gradient(90deg, #3498db, #2980b9)'};
      transition: width 0.3s ease;
      border-radius: 4px;
      position: relative;
    }
    
    .cv-skill-fill::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50%;
      background: linear-gradient(to bottom, rgba(255,255,255,0.3), transparent);
      border-radius: 4px 4px 0 0;
    }
    
    /* Languages Section */
    .cv-languages { 
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 10px;
    }
    
    .cv-language-item { 
      background: linear-gradient(135deg, #f8f9fa, #e9ecef); 
      padding: 10px 12px; 
      border-radius: 20px; 
      font-size: 10px;
      text-align: center;
      border: 1px solid #e9ecef;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
    
    .cv-language-name {
      font-weight: 600;
      color: #2c3e50;
    }
    
    .cv-language-level {
      font-size: 9px;
      color: white;
      background: ${cvFormat === 'french' 
        ? 'linear-gradient(135deg, #e74c3c, #c0392b)' 
        : 'linear-gradient(135deg, #3498db, #2980b9)'};
      padding: 2px 6px;
      border-radius: 8px;
      font-weight: 600;
    }
    
    /* Hobbies Section */
    .cv-hobbies { 
      display: flex; 
      flex-wrap: wrap; 
      gap: 10px;
    }
    
    .cv-hobby-item { 
      background: linear-gradient(135deg, #fff3cd, #ffeaa7); 
      padding: 6px 12px; 
      border-radius: 15px; 
      font-size: 10px;
      color: #856404;
      border: 1px solid #ffeaa7;
      font-weight: 500;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
    
    /* French CV specific styling */
    ${cvFormat === 'french' ? `
      .cv-personal-details {
        background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(236,240,241,0.9));
        padding: 15px;
        border-radius: 8px;
        margin-top: 15px;
        border: 1px solid rgba(255,255,255,0.5);
        backdrop-filter: blur(10px);
      }
      
      .cv-personal-details h4 {
        font-size: 12px;
        font-weight: 700;
        color: white;
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .cv-personal-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        font-size: 10px;
      }
      
      .cv-personal-item {
        display: flex;
        align-items: center;
        gap: 6px;
        color: rgba(255,255,255,0.95);
        font-weight: 500;
      }
    ` : ''}
    
    /* Print optimizations */
    @media print {
      .cv-container { 
        margin: 0; 
        padding: 10mm; 
        box-shadow: none;
      }
      
      .cv-section { 
        page-break-inside: avoid; 
      }
      
      .cv-item { 
        page-break-inside: avoid; 
      }
      
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
    }
    
    /* Responsive adjustments for PDF */
    .cv-container {
      font-kerning: normal;
      text-rendering: optimizeLegibility;
    }
    
    /* Modern typography enhancements */
    h1, h2, h3, h4, h5, h6 {
      font-feature-settings: "liga", "kern";
    }
    
    p, span, div {
      font-feature-settings: "liga", "kern";
      orphans: 2;
      widows: 2;
    }
  </style>
`; 
const handleDownload = async () => {
  setIsDownloading(true);
  setPreviewMode(true);
  
  try {
    // Wait for preview mode to render
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const fileName = `${profile.name || 'CV'}_${cvFormat || 'default'}_${cvLanguage}`;
    
    // Create the PDF-optimized HTML structure
    const createCVHTML = () => {
      const getSkillLevel = (level) => {
        if (level >= 90) return cvLanguage === 'english' ? 'Expert' : 'Expert';
        if (level >= 75) return cvLanguage === 'english' ? 'Advanced' : 'Avancé';
        if (level >= 50) return cvLanguage === 'english' ? 'Intermediate' : 'Intermédiaire';
        if (level >= 25) return cvLanguage === 'english' ? 'Beginner' : 'Débutant';
        return cvLanguage === 'english' ? 'Novice' : 'Novice';
      };

      const getContactIcon = (type) => {
        const icons = {
          email: '✉',
          phone: '📱',
          location: '📍',
          website: '🌐'
        };
        return icons[type] || '•';
      };

      return `
        <div class="cv-container">
          <!-- Header Section -->
          <div class="cv-header">
            <div class="cv-profile-section">
              ${profile.photo ? `<img src="${profile.photo}" alt="Profile" class="cv-photo">` : ''}
              <div style="flex: 1;">
                <h1 class="cv-name">${profile.name || ''}</h1>
                <h2 class="cv-title">${profile.title || ''}</h2>
                <div class="cv-contact">
                  ${profile.email ? `<div class="cv-contact-item" data-icon="${getContactIcon('email')}">${profile.email}</div>` : ''}
                  ${profile.phone ? `<div class="cv-contact-item" data-icon="${getContactIcon('phone')}">${profile.phone}</div>` : ''}
                  ${profile.location ? `<div class="cv-contact-item" data-icon="${getContactIcon('location')}">${profile.location}</div>` : ''}
                  ${profile.website ? `<div class="cv-contact-item" data-icon="${getContactIcon('website')}">${profile.website}</div>` : ''}
                </div>
                ${cvFormat === 'french' && (profile.dateOfBirth || profile.nationality || profile.maritalStatus) ? `
                  <div class="cv-personal-details">
                    <h4>${cvLanguage === 'english' ? 'Personal Information' : 'Informations Personnelles'}</h4>
                    <div class="cv-personal-grid">
                      ${profile.dateOfBirth ? `<div class="cv-personal-item">📅 ${new Date(profile.dateOfBirth).toLocaleDateString()}</div>` : ''}
                      ${profile.nationality ? `<div class="cv-personal-item">🏛️ ${profile.nationality}</div>` : ''}
                      ${profile.maritalStatus ? `<div class="cv-personal-item">👤 ${cvLanguage === 'english' ? 
                        profile.maritalStatus.charAt(0).toUpperCase() + profile.maritalStatus.slice(1) : 
                        profile.maritalStatus === 'single' ? 'Célibataire' : 
                        profile.maritalStatus === 'married' ? 'Marié(e)' : 
                        profile.maritalStatus === 'divorced' ? 'Divorcé(e)' : 'Veuf/Veuve'}</div>` : ''}
                    </div>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>

          <!-- Professional Summary -->
          ${profile.summary ? `
            <div class="cv-summary">
              <h3>${cvLanguage === 'english' ? 'Professional Summary' : 'Résumé Professionnel'}</h3>
              <p>${profile.summary}</p>
            </div>
          ` : ''}

          <!-- CV Sections -->
          ${sections.map(section => `
            <div class="cv-section">
              <h3 class="cv-section-title">${section.title}</h3>
              ${section.id === 'skills' ? `
                <div class="cv-skills-grid">
                  ${section.items.map(item => `
                    <div class="cv-skill-item">
                      <div class="cv-skill-header">
                        <span class="cv-skill-name">${item.name}</span>
                        <span class="cv-skill-level">${getSkillLevel(item.level)}</span>
                      </div>
                      <div class="cv-skill-bar">
                        <div class="cv-skill-fill" style="width: ${item.level}%"></div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : section.id === 'languages' ? `
                <div class="cv-languages">
                  ${section.items.map(item => `
                    <div class="cv-language-item">
                      <span class="cv-language-name">${item.name}</span>
                      <span class="cv-language-level">${item.level}</span>
                    </div>
                  `).join('')}
                </div>
              ` : section.id === 'hobbies' ? `
                <div class="cv-hobbies">
                  ${section.items.map(item => `
                    <span class="cv-hobby-item">${item.name}</span>
                  `).join('')}
                </div>
              ` : `
                ${section.items.map(item => `
                  <div class="cv-item">
                    <div class="cv-item-header">
                      <div>
                        <div class="cv-item-title">${item.title}</div>
                        ${item.company ? `<div class="cv-item-company">${item.company}</div>` : ''}
                      </div>
                      ${item.period ? `<div class="cv-item-period">${item.period}</div>` : ''}
                    </div>
                    ${item.description ? `<div class="cv-item-description">${item.description}</div>` : ''}
                  </div>
                `).join('')}
              `}
            </div>
          `).join('')}
        </div>
      `;
    };

    // Create complete HTML document
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${fileName}</title>
          ${createPDFStyles(cvFormat)}
        </head>
        <body>
          ${createCVHTML()}
        </body>
      </html>
    `;

    // Create temporary element for PDF generation
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    document.body.appendChild(tempDiv);

    const opt = {
      margin: [8, 8, 8, 8],
      filename: `${fileName}.pdf`,
      image: { 
        type: 'jpeg', 
        quality: 0.98 
      },
      html2canvas: { 
        scale: 3,
        useCORS: true,
        allowTaint: true,
        letterRendering: true,
        logging: false,
        width: 794,
        height: 1123,
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true,
        precision: 2
      },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'] 
      }
    };
    
    await html2pdf().set(opt).from(tempDiv.querySelector('.cv-container')).save();
    
    // Clean up
    document.body.removeChild(tempDiv);
    
  } catch (error) {
    console.error('PDF generation error:', error);
    alert(cvLanguage === 'english' ? 'Failed to generate PDF. Please try again.' : 'Échec de la génération du PDF. Veuillez réessayer.');
  } finally {
    setIsDownloading(false);
    setPreviewMode(false);
  }
};

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('sectionIndex', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = e.dataTransfer.getData('sectionIndex');
    const newSections = [...sections];
    const [draggedSection] = newSections.splice(dragIndex, 1);
    newSections.splice(dropIndex, 0, draggedSection);
    setSections(newSections);
  };

  if (showLanguageSelector) {
    return <LanguageSelector handleLanguageSelect={handleLanguageSelect} cvLanguage={cvLanguage} />;
  }

  if (showFormatSelector) {
    return (
      <FormatSelector
        formatLabels={formatLabels}
        handleFormatSelect={handleFormatSelect}
        handleLanguageSelect={handleLanguageSelect}
        handleBackToLanguageSelection={handleBackToLanguageSelection}
        cvLanguage={cvLanguage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Briefcase className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {cvLanguage === 'english' ? 'CV Builder' : 'Constructeur de CV'}
                  </h1>
                  <p className="text-sm text-gray-600">{formatLabels[cvFormat]?.name}</p>
                </div>
              </div>
              <button
                onClick={() => { setShowLanguageSelector(true); setShowFormatSelector(false); }}
                className="text-blue-600 hover:text-blue-800"
              >
                {cvLanguage === 'english' ? 'Change Settings' : 'Modifier Paramètres'}
              </button>
            </div>
          </div>
          <div id="cv-content" className={`bg-white rounded-lg shadow-md p-6 ${previewMode ? 'cv-pdf-layout' : ''}`}>
  {/* Profile Header */}
  <div className={`${previewMode ? 'cv-header' : ''}`}>
    <div className={`${previewMode ? 'cv-profile' : ''}`}>
      <ProfileSection
        profile={profile}
        setProfile={setProfile}
        cvFormat={cvFormat}
        handlePhotoUpload={handlePhotoUpload}
        cvLanguage={cvLanguage}
        previewMode={previewMode}
      />
    </div>
  </div>

  {/* Professional Summary */}
  <div className={`${previewMode ? 'cv-summary' : ''}`}>
    <SummaryEditor
      summary={profile.summary}
      onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
      cvFormat={cvFormat}
      cvLanguage={cvLanguage}
      previewMode={previewMode}
    />
  </div>

  {/* Section Palette - Hidden in preview */}
  {!previewMode && (
    <SectionPalette
      availableSections={availableSections.filter(sec => !sections.find(s => s.id === sec.id))}
      cvLanguage={cvLanguage}
      onAddSection={addSection}
    />
  )}

  {/* CV Sections */}
  <div className={`${previewMode ? 'cv-sections' : ''}`}>
    {sections.map((section, index) => (
      <div key={section.id} className={`${previewMode ? 'cv-section' : ''}`}>
        <SectionBlock
          section={section}
          index={index}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          removeSection={removeSection}
          removeItem={removeItem}
          updateItem={updateItem}
          editingSection={editingSection}
          setEditingSection={setEditingSection}
          newItem={newItem}
          setNewItem={setNewItem}
          addItem={addItem}
          previewMode={previewMode}
          cvLanguage={cvLanguage}
        />
      </div>
    ))}
  </div>
</div>
        <div className="mt-8">
  <DownloadButton
    onClick={handleDownload}
    fileName={`${profile.name || 'CV'}_${cvFormat || 'default'}_${cvLanguage}`}
    isLoading={isDownloading}
    cvLanguage={cvLanguage}
  />
</div>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder; 