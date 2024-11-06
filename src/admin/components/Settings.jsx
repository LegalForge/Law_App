import React, { useState } from 'react';
import { FiUser, FiLock, FiBell, FiGlobe, FiSave } from 'react-icons/fi';

function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'Admin User',
      email: 'admin@example.com',
      avatar: null
    },
    quiz: {
      timeLimit: 30,
      questionsPerQuiz: 10,
      passingScore: 70,
      showResults: true
    },
    notifications: {
      emailNotifications: true,
      newSubmissions: true,
      systemUpdates: false
    }
  });

  const handleSettingsChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = (section) => {
    console.log(`Saving ${section} settings:`, settings[section]);
    // Add API call to save settings
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <nav className="space-y-1">
            {[
              { id: 'profile', label: 'Profile Settings', icon: FiUser },
              { id: 'quiz', label: 'Quiz Settings', icon: FiGlobe },
              { id: 'notifications', label: 'Notifications', icon: FiBell },
              { id: 'security', label: 'Security', icon: FiLock },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${activeSection === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3 bg-white rounded-lg shadow-sm p-6">
          {/* Profile Settings */}
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Profile Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={settings.profile.name}
                    onChange={(e) => handleSettingsChange('profile', 'name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => handleSettingsChange('profile', 'email', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      AU
                    </div>
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quiz Settings */}
          {activeSection === 'quiz' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Quiz Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time Limit (minutes)</label>
                  <input
                    type="number"
                    value={settings.quiz.timeLimit}
                    onChange={(e) => handleSettingsChange('quiz', 'timeLimit', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Questions Per Quiz</label>
                  <input
                    type="number"
                    value={settings.quiz.questionsPerQuiz}
                    onChange={(e) => handleSettingsChange('quiz', 'questionsPerQuiz', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Passing Score (%)</label>
                  <input
                    type="number"
                    value={settings.quiz.passingScore}
                    onChange={(e) => handleSettingsChange('quiz', 'passingScore', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="showResults"
                    checked={settings.quiz.showResults}
                    onChange={(e) => handleSettingsChange('quiz', 'showResults', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="showResults" className="text-sm font-medium text-gray-700">
                    Show Results Immediately
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
              
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={key}
                      checked={value}
                      onChange={(e) => handleSettingsChange('notifications', key, e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={key} className="text-sm font-medium text-gray-700">
                      {key.split(/(?=[A-Z])/).join(' ')}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeSection === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => handleSave(activeSection)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <FiSave className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings; 