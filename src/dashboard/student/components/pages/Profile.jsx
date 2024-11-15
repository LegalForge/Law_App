import React, { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiBook, 
  FiAward, 
  FiEdit2, 
  FiStar,
  FiBell,
  FiGlobe,
  FiLock,
  FiToggleLeft,
  FiToggleRight
} from 'react-icons/fi';

function Profile() {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'settings'
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    studentId: "ST12345",
    grade: "12th Grade",
    joinDate: "2024-01-15",
    bio: "Passionate student interested in computer science and mathematics.",
    interests: ["Programming", "Mathematics", "Physics"],
    achievements: {
      quizzesTaken: 15,
      averageScore: 85,
      totalPoints: 750,
      badges: 8
    }
  });

  const [settings, setSettings] = useState({
    notifications: {
      quizReminders: true,
      newAchievements: true,
      progressUpdates: false,
      emailNotifications: true
    },
    preferences: {
      language: 'English',
      theme: 'light',
      showTimer: true,
      autoSubmit: true
    },
    privacy: {
      showProfile: true,
      showProgress: true,
      showAchievements: true
    }
  });

  const handleToggle = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-semibold">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50">
                <FiEdit2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-gray-500">{profile.studentId} • {profile.grade}</p>
              <p className="text-sm text-gray-500">Joined {new Date(profile.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => setActiveTab(activeTab === 'profile' ? 'settings' : 'profile')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              {activeTab === 'profile' ? 'Settings' : 'Profile'}
            </button>
            {activeTab === 'profile' && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <QuickStat 
            icon={FiBook}
            label="Quizzes Taken"
            value={profile.achievements.quizzesTaken}
          />
          <QuickStat 
            icon={FiStar}
            label="Average Score"
            value={`${profile.achievements.averageScore}%`}
          />
          <QuickStat 
            icon={FiAward}
            label="Total Points"
            value={profile.achievements.totalPoints}
          />
          <QuickStat 
            icon={FiAward}
            label="Badges Earned"
            value={profile.achievements.badges}
          />
        </div>
      </div>

      {activeTab === 'profile' ? (
        // Profile Content
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Details</h3>
          
          {isEditing ? (
            <form onSubmit={(e) => { e.preventDefault(); setIsEditing(false); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileInput 
                  label="Full Name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
                <ProfileInput 
                  label="Email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
                <ProfileInput 
                  label="Phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                />
                <ProfileInput 
                  label="Grade"
                  value={profile.grade}
                  onChange={(e) => setProfile({...profile, grade: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  rows={4}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileField icon={FiUser} label="Full Name" value={profile.name} />
                <ProfileField icon={FiMail} label="Email" value={profile.email} />
                <ProfileField icon={FiPhone} label="Phone" value={profile.phone} />
                <ProfileField icon={FiBook} label="Grade" value={profile.grade} />
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Bio</h4>
                <p className="text-gray-600">{profile.bio}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Settings Content
        <div className="space-y-6">
          {/* Notification Settings */}
          <SettingsSection 
            title="Notifications" 
            icon={FiBell}
            description="Manage your notification preferences"
          >
            <div className="space-y-4">
              <ToggleSetting
                label="Quiz Reminders"
                description="Receive reminders about upcoming quizzes"
                enabled={settings.notifications.quizReminders}
                onChange={() => handleToggle('notifications', 'quizReminders')}
              />
              <ToggleSetting
                label="Achievement Notifications"
                description="Get notified when you earn new achievements"
                enabled={settings.notifications.newAchievements}
                onChange={() => handleToggle('notifications', 'newAchievements')}
              />
              <ToggleSetting
                label="Progress Updates"
                description="Receive weekly progress reports"
                enabled={settings.notifications.progressUpdates}
                onChange={() => handleToggle('notifications', 'progressUpdates')}
              />
            </div>
          </SettingsSection>

          {/* Preferences Settings */}
          <SettingsSection 
            title="Preferences" 
            icon={FiGlobe}
            description="Customize your quiz experience"
          >
            <div className="space-y-4">
              <SelectSetting
                label="Language"
                value={settings.preferences.language}
                options={['English', 'Spanish', 'French']}
                onChange={(value) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, language: value }
                }))}
              />
              <SelectSetting
                label="Theme"
                value={settings.preferences.theme}
                options={['light', 'dark']}
                onChange={(value) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, theme: value }
                }))}
              />
              <ToggleSetting
                label="Show Timer"
                description="Display countdown timer during quizzes"
                enabled={settings.preferences.showTimer}
                onChange={() => handleToggle('preferences', 'showTimer')}
              />
            </div>
          </SettingsSection>

          {/* Privacy Settings */}
          <SettingsSection 
            title="Privacy" 
            icon={FiLock}
            description="Control your privacy settings"
          >
            <div className="space-y-4">
              <ToggleSetting
                label="Show Profile"
                description="Allow others to view your profile"
                enabled={settings.privacy.showProfile}
                onChange={() => handleToggle('privacy', 'showProfile')}
              />
              <ToggleSetting
                label="Show Progress"
                description="Make your progress visible to others"
                enabled={settings.privacy.showProgress}
                onChange={() => handleToggle('privacy', 'showProgress')}
              />
              <ToggleSetting
                label="Show Achievements"
                description="Display your achievements publicly"
                enabled={settings.privacy.showAchievements}
                onChange={() => handleToggle('privacy', 'showAchievements')}
              />
            </div>
          </SettingsSection>
        </div>
      )}
    </div>
  );
}

// Helper Components
function QuickStat({ icon: Icon, label, value }) {
  return (
    <div className="text-center">
      <Icon className="w-5 h-5 text-blue-600 mx-auto mb-1" />
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function ProfileField({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center space-x-3">
      <Icon className="w-5 h-5 text-gray-400" />
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function ProfileInput({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
}

function SettingsSection({ title, icon: Icon, description, children }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function ToggleSetting({ label, description, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium text-gray-900">{label}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`p-2 rounded-full transition-colors duration-200 ${
          enabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
        }`}
      >
        {enabled ? <FiToggleRight className="w-6 h-6" /> : <FiToggleLeft className="w-6 h-6" />}
      </button>
    </div>
  );
}

function SelectSetting({ label, value, options, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-900">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Profile;