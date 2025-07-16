// Add this new component before the CVBuilder component
const CVPDFLayout = ({ profile, sections, cvFormat, cvLanguage }) => (
  <div id="cv-pdf-content" className="bg-white p-8 max-w-4xl mx-auto" style={{ fontFamily: 'Arial, sans-serif' }}>
    {/* Header Section */}
    <div className="mb-8">
      <div className="flex items-start gap-6">
        {profile.photo && (
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
          <h2 className="text-xl text-blue-600 mb-4">{profile.title}</h2>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            {profile.email && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Email:</span>
                <span>{profile.email}</span>
              </div>
            )}
            {profile.phone && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Phone:</span>
                <span>{profile.phone}</span>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Location:</span>
                <span>{profile.location}</span>
              </div>
            )}
            {profile.website && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Website:</span>
                <span>{profile.website}</span>
              </div>
            )}
          </div>

          {/* French CV specific fields */}
          {cvFormat === 'french' && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-sm">
                {profile.dateOfBirth && (
                  <div>
                    <span className="font-medium">
                      {cvLanguage === 'english' ? 'Date of Birth:' : 'Date de naissance:'}
                    </span>
                    <div>{profile.dateOfBirth}</div>
                  </div>
                )}
                {profile.nationality && (
                  <div>
                    <span className="font-medium">
                      {cvLanguage === 'english' ? 'Nationality:' : 'Nationalité:'}
                    </span>
                    <div>{profile.nationality}</div>
                  </div>
                )}
                {profile.maritalStatus && (
                  <div>
                    <span className="font-medium">
                      {cvLanguage === 'english' ? 'Marital Status:' : 'État civil:'}
                    </span>
                    <div>{profile.maritalStatus}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Professional Summary */}
    {profile.summary && (
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
          {cvLanguage === 'english' ? 'Professional Summary' : 'Résumé Professionnel'}
        </h3>
        <p className="text-gray-700 leading-relaxed">{profile.summary}</p>
      </div>
    )}

    {/* Sections */}
    {sections.map(section => (
      section.items.length > 0 && (
        <div key={section.id} className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1">
            {section.title}
          </h3>
          
          {section.id === 'skills' ? (
            <div className="grid grid-cols-2 gap-4">
              {section.items.map(item => (
                <div key={item.id} className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    <span className="text-sm text-gray-600">{item.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : section.id === 'languages' ? (
            <div className="grid grid-cols-2 gap-4">
              {section.items.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {item.level}
                  </span>
                </div>
              ))}
            </div>
          ) : section.id === 'hobbies' ? (
            <div className="flex flex-wrap gap-2">
              {section.items.map(item => (
                <span key={item.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {item.name}
                </span>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {section.items.map(item => (
                <div key={item.id} className="border-l-4 border-blue-600 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    {item.period && (
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {item.period}
                      </span>
                    )}
                  </div>
                  {item.company && (
                    <p className="text-blue-600 font-medium mb-2">{item.company}</p>
                  )}
                  {item.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    ))}
  </div>
);

// Replace the existing handleDownload function with this:
const handleDownload = async () => {
  setIsDownloading(true);
  
  try {
    // Create a temporary div to hold the PDF content
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.style.width = '210mm'; // A4 width
    tempDiv.style.backgroundColor = 'white';
    
    // Render the CV PDF layout
    const CVPDFLayoutComponent = () => (
      <CVPDFLayout 
        profile={profile} 
        sections={sections} 
        cvFormat={cvFormat} 
        cvLanguage={cvLanguage} 
      />
    );
    
    // Create the PDF content HTML
    tempDiv.innerHTML = `
      <div style="font-family: Arial, sans-serif; background: white; padding: 20px; max-width: 210mm;">
        ${renderCVContent()}
      </div>
    `;
    
    document.body.appendChild(tempDiv);
    
    // Generate PDF
    await html2pdf().set({
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${profile.name || 'CV'}_${cvFormat || 'default'}_${cvLanguage}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait' 
      },
    }).from(tempDiv).save();
    
    // Clean up
    document.body.removeChild(tempDiv);
    
  } catch (error) {
    console.error('PDF generation failed:', error);
    alert(cvLanguage === 'english' ? 'Failed to generate PDF.' : 'Échec de la génération du PDF.');
  } finally {
    setIsDownloading(false);
  }
};

// Helper function to render CV content as HTML string
const renderCVContent = () => {
  const skillsHTML = sections.find(s => s.id === 'skills')?.items.map(item => `
    <div style="margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-weight: 600; color: #1f2937;">${item.name}</span>
        <span style="font-size: 12px; color: #6b7280;">${item.level}%</span>
      </div>
      <div style="width: 100%; background: #e5e7eb; border-radius: 4px; height: 8px;">
        <div style="background: #2563eb; height: 8px; border-radius: 4px; width: ${item.level}%;"></div>
      </div>
    </div>
  `).join('') || '';

  const languagesHTML = sections.find(s => s.id === 'languages')?.items.map(item => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0;">
      <span style="font-weight: 600; color: #1f2937;">${item.name}</span>
      <span style="font-size: 12px; color: #6b7280; background: #f3f4f6; padding: 4px 8px; border-radius: 4px;">${item.level}</span>
    </div>
  `).join('') || '';

  const hobbiesHTML = sections.find(s => s.id === 'hobbies')?.items.map(item => `
    <span style="background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 16px; font-size: 14px; margin-right: 8px; display: inline-block; margin-bottom: 4px;">${item.name}</span>
  `).join('') || '';

  return `
    <!-- Header -->
    <div style="margin-bottom: 32px;">
      <div style="display: flex; gap: 24px; align-items: start;">
        ${profile.photo ? `
          <div style="width: 96px; height: 96px; border-radius: 8px; overflow: hidden; flex-shrink: 0;">
            <img src="${profile.photo}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
        ` : ''}
        <div style="flex: 1;">
          <h1 style="font-size: 28px; font-weight: bold; color: #1f2937; margin: 0 0 8px 0;">${profile.name}</h1>
          <h2 style="font-size: 20px; color: #2563eb; margin: 0 0 16px 0;">${profile.title}</h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
            ${profile.email ? `
              <div><span style="font-weight: 600;">Email:</span> ${profile.email}</div>
            ` : ''}
            ${profile.phone ? `
              <div><span style="font-weight: 600;">Phone:</span> ${profile.phone}</div>
            ` : ''}
            ${profile.location ? `
              <div><span style="font-weight: 600;">Location:</span> ${profile.location}</div>
            ` : ''}
            ${profile.website ? `
              <div><span style="font-weight: 600;">Website:</span> ${profile.website}</div>
            ` : ''}
          </div>

          ${cvFormat === 'french' ? `
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; font-size: 14px;">
                ${profile.dateOfBirth ? `
                  <div>
                    <span style="font-weight: 600;">${cvLanguage === 'english' ? 'Date of Birth:' : 'Date de naissance:'}</span>
                    <div>${profile.dateOfBirth}</div>
                  </div>
                ` : ''}
                ${profile.nationality ? `
                  <div>
                    <span style="font-weight: 600;">${cvLanguage === 'english' ? 'Nationality:' : 'Nationalité:'}</span>
                    <div>${profile.nationality}</div>
                  </div>
                ` : ''}
                ${profile.maritalStatus ? `
                  <div>
                    <span style="font-weight: 600;">${cvLanguage === 'english' ? 'Marital Status:' : 'État civil:'}</span>
                    <div>${profile.maritalStatus}</div>
                  </div>
                ` : ''}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>

    <!-- Professional Summary -->
    ${profile.summary ? `
      <div style="margin-bottom: 32px;">
        <h3 style="font-size: 18px; font-weight: bold; color: #1f2937; margin: 0 0 12px 0; border-bottom: 2px solid #2563eb; padding-bottom: 4px;">
          ${cvLanguage === 'english' ? 'Professional Summary' : 'Résumé Professionnel'}
        </h3>
        <p style="color: #374151; line-height: 1.6; margin: 0;">${profile.summary}</p>
      </div>
    ` : ''}

    <!-- Sections -->
    ${sections.map(section => {
      if (section.items.length === 0) return '';
      
      return `
        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 18px; font-weight: bold; color: #1f2937; margin: 0 0 16px 0; border-bottom: 2px solid #2563eb; padding-bottom: 4px;">
            ${section.title}
          </h3>
          
          ${section.id === 'skills' ? `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              ${skillsHTML}
            </div>
          ` : section.id === 'languages' ? `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              ${languagesHTML}
            </div>
          ` : section.id === 'hobbies' ? `
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${hobbiesHTML}
            </div>
          ` : `
            <div style="space-y: 16px;">
              ${section.items.map(item => `
                <div style="border-left: 4px solid #2563eb; padding-left: 16px; margin-bottom: 16px;">
                  <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                    <h4 style="font-weight: bold; color: #1f2937; margin: 0;">${item.title}</h4>
                    ${item.period ? `
                      <span style="font-size: 12px; color: #6b7280; background: #f3f4f6; padding: 4px 8px; border-radius: 4px;">
                        ${item.period}
                      </span>
                    ` : ''}
                  </div>
                  ${item.company ? `
                    <p style="color: #2563eb; font-weight: 600; margin: 0 0 8px 0;">${item.company}</p>
                  ` : ''}
                  ${item.description ? `
                    <p style="color: #374151; font-size: 14px; line-height: 1.5; margin: 0;">${item.description}</p>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;
    }).join('')}
  `;
};