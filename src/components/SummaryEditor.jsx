import React, { useState, useEffect } from 'react';
import { FileText, Lightbulb, Target, Zap, AlertCircle, CheckCircle, Eye, EyeOff, Sparkles } from 'lucide-react';

const SummaryEditor = ({ summary, onChange, cvFormat, cvLanguage, previewMode }) => {
  const [wordCount, setWordCount] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const words = summary.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [summary]);

  const getOptimalWordCount = () => {
    return cvFormat === 'canadian' ? { min: 50, max: 100 } : { min: 80, max: 150 };
  };

  const getWordCountStatus = () => {
    const { min, max } = getOptimalWordCount();
    if (wordCount === 0) return 'empty';
    if (wordCount < min) return 'too-short';
    if (wordCount > max) return 'too-long';
    return 'optimal';
  };

  const getStatusColor = () => {
    const status = getWordCountStatus();
    switch (status) {
      case 'empty': return 'text-gray-400';
      case 'too-short': return 'text-amber-600';
      case 'too-long': return 'text-red-600';
      case 'optimal': return 'text-green-600';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    const status = getWordCountStatus();
    switch (status) {
      case 'empty': return <AlertCircle className="w-4 h-4" />;
      case 'too-short': return <AlertCircle className="w-4 h-4" />;
      case 'too-long': return <AlertCircle className="w-4 h-4" />;
      case 'optimal': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getSampleSummaries = () => {
    if (cvLanguage === 'english') {
      return cvFormat === 'canadian' ? [
        "Results-driven Software Engineer with 5+ years of experience developing scalable web applications. Proven track record of reducing system response times by 40% and leading cross-functional teams. Expertise in React, Node.js, and cloud technologies. Seeking to leverage technical skills and leadership experience to drive innovation at a forward-thinking technology company.",
        "Marketing Professional with 7+ years of experience in digital marketing and brand management. Successfully increased brand awareness by 60% and generated $2M+ in revenue through strategic campaigns. Skilled in SEO, social media marketing, and data analytics. Passionate about creating compelling brand stories that drive customer engagement and business growth."
      ] : [
        "Experienced Software Engineer with over 5 years of expertise in developing scalable web applications. Advanced skills in React, Node.js, and cloud technologies. Proven history of improving system performance by 40% and leading multidisciplinary teams. Seeking a challenging role to contribute to technological innovation in a dynamic, forward-thinking company.",
        "Digital Marketing Professional with 7+ years of experience in brand management and digital strategies. Demonstrated success in increasing brand awareness by 60% and generating over $2M in revenue. Expertise in SEO, social media marketing, and data analytics. Passionate about creating compelling brand stories that drive customer engagement and business growth."
      ];
    } else {
      return cvFormat === 'canadian' ? [
        "Ingénieur logiciel orienté résultats avec 5+ années d'expérience dans le développement d'applications web évolutives. Historique prouvé de réduction des temps de réponse système de 40% et de direction d'équipes transversales. Expertise en React, Node.js et technologies cloud. Cherche à exploiter les compétences techniques et l'expérience de leadership pour stimuler l'innovation dans une entreprise technologique avant-gardiste.",
        "Professionnel du marketing avec 7+ années d'expérience en marketing numérique et gestion de marque. A augmenté avec succès la notoriété de la marque de 60% et généré plus de 2M$ de revenus grâce à des campagnes stratégiques. Compétent en SEO, marketing des médias sociaux et analyse de données. Passionné par la création d'histoires de marque convaincantes qui stimulent l'engagement client et la croissance commerciale."
      ] : [
        "Ingénieur logiciel expérimenté avec plus de 5 années d'expertise dans le développement d'applications web évolutives. Compétences avancées en React, Node.js et technologies cloud. Historique prouvé d'amélioration des performances système de 40% et de direction d'équipes pluridisciplinaires. Recherche un poste stimulant pour contribuer à l'innovation technologique dans une entreprise dynamique et orientée vers l'avenir.",
        "Professionnel du marketing digital avec 7+ années d'expérience en gestion de marque et stratégies numériques. Succès démontré dans l'augmentation de la notoriété de marque de 60% et la génération de plus de 2M€ de revenus. Expertise en SEO, marketing des réseaux sociaux et analyse de données. Passionné par la création d'histoires de marque convaincantes qui stimulent l'engagement client et la croissance commerciale."
      ];
    }
  };

  const getATSTips = () => {
    if (cvLanguage === 'english') {
      return [
        "Use industry-specific keywords from job descriptions",
        "Include quantifiable achievements with numbers and percentages",
        "Mention relevant technical skills and certifications",
        "Use action verbs like 'developed', 'managed', 'increased'",
        "Keep sentences clear and concise for ATS parsing",
        "Avoid special characters and complex formatting"
      ];
    } else {
      return [
        "Utilisez des mots-clés spécifiques à votre secteur d'activité",
        "Incluez des réalisations quantifiables avec des chiffres et pourcentages",
        "Mentionnez les compétences techniques et certifications pertinentes",
        "Utilisez des verbes d'action comme 'développé', 'géré', 'augmenté'",
        "Gardez des phrases claires et concises pour l'analyse ATS",
        "Évitez les caractères spéciaux et la mise en forme complexe"
      ];
    }
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border border-indigo-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {cvLanguage === 'english' ? 'Professional Summary' : 'Résumé Professionnel'}
              </h2>
              <p className="text-sm text-gray-600">
                {cvLanguage === 'english' 
                  ? 'Craft a compelling summary that highlights your key achievements'
                  : 'Rédigez un résumé convaincant qui met en valeur vos réalisations clés'}
              </p>
            </div>
          </div>
          
          {!previewMode && (
            <div className="flex gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-3 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm border border-gray-200"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {cvLanguage === 'english' ? 'Preview' : 'Aperçu'}
              </button>
              <button
                onClick={() => setShowTips(!showTips)}
                className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all text-sm"
              >
                <Lightbulb className="w-4 h-4" />
                {cvLanguage === 'english' ? 'Tips' : 'Conseils'}
              </button>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
          <div className={`flex items-center gap-2 ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="font-medium">
              {wordCount} {cvLanguage === 'english' ? 'words' : 'mots'} 
              <span className="text-gray-500 ml-1 font-normal">
                ({getOptimalWordCount().min}-{getOptimalWordCount().max} {cvLanguage === 'english' ? 'recommended' : 'recommandés'})
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-green-600">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">{cvLanguage === 'english' ? 'ATS Optimized' : 'Optimisé ATS'}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                getWordCountStatus() === 'optimal' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                getWordCountStatus() === 'too-short' ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                getWordCountStatus() === 'too-long' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gray-400'
              }`}
              style={{ width: `${Math.min(100, (wordCount / getOptimalWordCount().max) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tips Panel */}
      {showTips && !previewMode && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-4">
                <Target className="w-5 h-5 text-indigo-600" />
                {cvLanguage === 'english' ? 'ATS Optimization Tips' : 'Conseils d\'Optimisation ATS'}
              </h3>
              <ul className="space-y-2">
                {getATSTips().map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-4">
                <Sparkles className="w-5 h-5 text-purple-600" />
                {cvLanguage === 'english' ? 'Sample Summaries' : 'Exemples de Résumés'}
              </h3>
              <div className="space-y-3">
                {getSampleSummaries().map((sample, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition-all duration-200">
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">{sample}</p>
                    <button
                      onClick={() => onChange({ target: { value: sample } })}
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-xs bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-full transition-all duration-200"
                    >
                      {cvLanguage === 'english' ? 'Use this example' : 'Utiliser cet exemple'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editor/Preview */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {showPreview && !previewMode && summary ? (
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              {cvLanguage === 'english' ? 'Preview' : 'Aperçu'}
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <textarea
              value={summary}
              onChange={onChange}
              placeholder={
                cvLanguage === 'english'
                  ? "Write a compelling professional summary highlighting your key achievements, skills, and career objectives. Focus on quantifiable results and industry-relevant keywords..."
                  : "Rédigez un résumé professionnel convaincant mettant en valeur vos réalisations clés, compétences et objectifs de carrière. Concentrez-vous sur des résultats quantifiables et des mots-clés pertinents..."
              }
              className={`w-full p-6 border-none outline-none resize-none transition-all duration-200 ${
                previewMode ? 'bg-gray-50 cursor-not-allowed' : 'bg-white focus:bg-gray-50'
              }`}
              rows={6}
              readOnly={previewMode}
            />
            {!previewMode && (
              <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                {cvLanguage === 'english' ? 'Tip: Use Ctrl+Enter for line breaks' : 'Astuce: Utilisez Ctrl+Entrée pour les sauts de ligne'}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preview Mode Display */}
      {previewMode && summary && (
        <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            {cvLanguage === 'english' ? 'Professional Summary' : 'Résumé Professionnel'}
          </h3>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummaryEditor;

