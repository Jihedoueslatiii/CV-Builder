import React from 'react';
import { Camera, Mail, Phone, MapPin, Globe, Calendar, User, Users, Upload } from 'lucide-react';

const ProfileSection = ({ profile, setProfile, cvFormat, handlePhotoUpload, cvLanguage, previewMode }) => {
  return (
    <div className={`mb-8 ${cvFormat === 'french' ? 'bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200' : ''}`}>
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Photo Section */}
        <div className="relative group flex-shrink-0">
          <div className="w-40 h-40 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 rounded-2xl flex items-center justify-center overflow-hidden border-4 border-white shadow-lg hover:shadow-xl transition-all duration-300">
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <span className="text-sm text-gray-500 font-medium">
                  {cvLanguage === 'english' ? 'Upload Photo' : 'Télécharger Photo'}
                </span>
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
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 cursor-pointer">
                <Upload className="w-4 h-4" />
              </div>
            </>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 w-full">
          <div className="space-y-4">
            {/* Name and Title */}
            <div className="space-y-2">
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className={`text-4xl font-bold text-gray-900 bg-transparent border-none outline-none w-full placeholder-gray-400 transition-all duration-200 ${
                  !previewMode ? 'hover:bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-lg px-2 py-1' : ''
                }`}
                placeholder={cvLanguage === 'english' ? 'Your Full Name' : 'Votre Nom Complet'}
                readOnly={previewMode}
              />
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className={`text-xl text-indigo-600 bg-transparent border-none outline-none w-full placeholder-indigo-300 font-medium transition-all duration-200 ${
                  !previewMode ? 'hover:bg-indigo-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-lg px-2 py-1' : ''
                }`}
                placeholder={cvLanguage === 'english' ? 'Your Job Title' : 'Votre Titre Professionnel'}
                readOnly={previewMode}
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                  <Mail className="w-4 h-4 text-indigo-600" />
                </div>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className={`bg-transparent border-none outline-none flex-1 placeholder-gray-400 transition-all duration-200 ${
                    !previewMode ? 'hover:bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-lg px-2 py-1' : ''
                  }`}
                  placeholder="email@example.com"
                  readOnly={previewMode}
                />
              </div>

              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                  <Phone className="w-4 h-4 text-indigo-600" />
                </div>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className={`bg-transparent border-none outline-none flex-1 placeholder-gray-400 transition-all duration-200 ${
                    !previewMode ? 'hover:bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-lg px-2 py-1' : ''
                  }`}
                  placeholder={cvLanguage === 'english' ? 'Phone Number' : 'Numéro de Téléphone'}
                  readOnly={previewMode}
                />
              </div>

              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                </div>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className={`bg-transparent border-none outline-none flex-1 placeholder-gray-400 transition-all duration-200 ${
                    !previewMode ? 'hover:bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-lg px-2 py-1' : ''
                  }`}
                  placeholder={cvLanguage === 'english' ? 'City, Country' : 'Ville, Pays'}
                  readOnly={previewMode}
                />
              </div>

              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                  <Globe className="w-4 h-4 text-indigo-600" />
                </div>
                <input
                  type="url"
                  value={profile.website}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  className={`bg-transparent border-none outline-none flex-1 placeholder-gray-400 transition-all duration-200 ${
                    !previewMode ? 'hover:bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-lg px-2 py-1' : ''
                  }`}
                  placeholder="website.com"
                  readOnly={previewMode}
                />
              </div>
            </div>

            {/* French CV Additional Fields */}
            {cvFormat === 'french' && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                  {cvLanguage === 'english' ? 'Personal Details' : 'Détails Personnels'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 group">
                    <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <Calendar className="w-4 h-4 text-purple-600" />
                    </div>
                    <input
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                      className={`bg-transparent border-none outline-none flex-1 text-gray-700 transition-all duration-200 ${
                        !previewMode ? 'hover:bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 rounded-lg px-2 py-1' : ''
                      }`}
                      readOnly={previewMode}
                    />
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <User className="w-4 h-4 text-purple-600" />
                    </div>
                    <input
                      type="text"
                      value={profile.nationality}
                      onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
                      className={`bg-transparent border-none outline-none flex-1 placeholder-gray-400 transition-all duration-200 ${
                        !previewMode ? 'hover:bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 rounded-lg px-2 py-1' : ''
                      }`}
                      placeholder={cvLanguage === 'english' ? 'Nationality' : 'Nationalité'}
                      readOnly={previewMode}
                    />
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <select
                      value={profile.maritalStatus}
                      onChange={(e) => setProfile({ ...profile, maritalStatus: e.target.value })}
                      className={`bg-transparent border-none outline-none flex-1 text-gray-700 transition-all duration-200 ${
                        !previewMode ? 'hover:bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 rounded-lg px-2 py-1' : ''
                      }`}
                      disabled={previewMode}
                    >
                      <option value="">{cvLanguage === 'english' ? 'Marital Status' : 'État Civil'}</option>
                      <option value="single">{cvLanguage === 'english' ? 'Single' : 'Célibataire'}</option>
                      <option value="married">{cvLanguage === 'english' ? 'Married' : 'Marié'}</option>
                      <option value="divorced">{cvLanguage === 'english' ? 'Divorced' : 'Divorcé'}</option>
                      <option value="widowed">{cvLanguage === 'english' ? 'Widowed' : 'Veuf'}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;

