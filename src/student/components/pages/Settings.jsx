import React, { useState } from 'react';
import { FiBell, FiGlobe,FiStar , FiLock, FiEye, FiShield, FiToggleLeft, FiToggleRight } from 'react-icons/fi';

function Settings() {
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
      {/* Notifications Settings */}
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
          <ToggleSetting
            label="Email Notifications"
            description="Receive notifications via email"
            enabled={settings.notifications.emailNotifications}
            onChange={() => handleToggle('notifications', 'emailNotifications')}
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
            onChange={(e) => setSettings(prev => ({
              ...prev,
              preferences: {
                ...prev.preferences,
                language: e.target.value
              }
            }))}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </SelectSetting>
          <SelectSetting
            label="Theme"
            value={settings.preferences.theme}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              preferences: {
                ...prev.preferences,
                theme: e.target.value
              }
            }))}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </SelectSetting>
          <ToggleSetting
            label="Show Timer"
            description="Display a timer during quizzes"
            enabled={settings.preferences.showTimer}
            onChange={() => handleToggle('preferences', 'showTimer')}
          />
          <ToggleSetting
            label="Auto Submit"
            description="Automatically submit quizzes when time is up"
            enabled={settings.preferences.autoSubmit}
            onChange={() => handleToggle('preferences', 'autoSubmit')}
          />
        </div>
      </SettingsSection>

      {/* Privacy Settings */}
      <SettingsSection 
        title="Privacy" 
        icon={FiShield}
        description="Control who sees your progress and achievements"
      >
        <div className="space-y-4">
          <ToggleSetting
            label="Show Profile"
            description="Allow others to see your profile"
            enabled={settings.privacy.showProfile}
            onChange={() => handleToggle('privacy', 'showProfile')}
          />
          <ToggleSetting
            label="Show Progress"
            description="Allow others to see your progress"
            enabled={settings.privacy.showProgress}
            onChange={() => handleToggle('privacy', 'showProgress')}
          />
          <ToggleSetting
            label="Show Achievements"
            description="Allow others to see your achievements"
            enabled={settings.privacy.showAchievements}
            onChange={() => handleToggle('privacy', 'showAchievements')}
          />
        </div>
      </SettingsSection>
    </div>
  );
} 