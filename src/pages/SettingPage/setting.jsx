// EnhancedSettingsPage.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Avatar
} from '@mui/material';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        
        <Tabs value={activeTab} onChange={(e, newVal) => setActiveTab(newVal)}>
          <Tab label="Profile" />
          <Tab label="Security" />
          <Tab label="Notifications" />
          <Tab label="Appearance" />
        </Tabs>
        
        <Box sx={{ mt: 3, p: 3, border: '1px solid #ddd', borderRadius: 1 }}>
          {activeTab === 0 && <EnhancedProfileSettings />}
          {activeTab === 1 && <SecuritySettings />}
          {activeTab === 2 && <NotificationSettings />}
          {activeTab === 3 && <AppearanceSettings />}
        </Box>
      </Box>
    </Container>
  );
};

const EnhancedProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Software developer and designer',
    location: 'New York',
    website: 'https://johndoe.dev',
    avatar: '/default-avatar.jpg'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Avatar src={profile.avatar} sx={{ width: 80, height: 80 }} />
        <Box>
          <Button variant="contained" component="label">
            Upload Photo
            <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
          </Button>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            JPG, GIF or PNG. Max size of 2MB
          </Typography>
        </Box>
      </Box>
      
      <TextField
        label="Full Name"
        name="name"
        value={profile.name}
        onChange={handleChange}
        fullWidth
      />
      
      <TextField
        label="Email"
        name="email"
        type="email"
        value={profile.email}
        onChange={handleChange}
        fullWidth
      />
      
      <TextField
        label="Bio"
        name="bio"
        value={profile.bio}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
      />
      
      <TextField
        label="Location"
        name="location"
        value={profile.location}
        onChange={handleChange}
        fullWidth
      />
      
      <TextField
        label="Website"
        name="website"
        value={profile.website}
        onChange={handleChange}
        fullWidth
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

const SecuritySettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6">Change Password</Typography>
      
      <TextField
        label="Current Password"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        fullWidth
      />
      
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
      />
      
      <TextField
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      
      <Button variant="contained" color="primary">
        Update Password
      </Button>
      
      <Typography variant="h6" sx={{ mt: 4 }}>Two-Factor Authentication</Typography>
      
      <FormControlLabel
        control={
          <Switch
            checked={twoFactorEnabled}
            onChange={(e) => setTwoFactorEnabled(e.target.checked)}
          />
        }
        label="Enable Two-Factor Authentication"
      />
      
      {twoFactorEnabled && (
        <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
          <Typography>Scan this QR code with your authenticator app:</Typography>
          {/* Placeholder for QR code */}
          <Box sx={{ width: 200, height: 200, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
            QR Code Placeholder
          </Box>
          <Typography>Or enter this code manually: XK45-9B2C-7D8E</Typography>
        </Box>
      )}
    </Box>
  );
};

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [notificationFrequency, setNotificationFrequency] = useState('daily');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6">Notification Preferences</Typography>
      
      <FormControlLabel
        control={
          <Switch
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
          />
        }
        label="Email Notifications"
      />
      
      <FormControlLabel
        control={
          <Switch
            checked={pushNotifications}
            onChange={(e) => setPushNotifications(e.target.checked)}
          />
        }
        label="Push Notifications"
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography>Notification Frequency:</Typography>
        <Select
          value={notificationFrequency}
          onChange={(e) => setNotificationFrequency(e.target.value)}
          size="small"
        >
          <MenuItem value="instant">Instant</MenuItem>
          <MenuItem value="daily">Daily Digest</MenuItem>
          <MenuItem value="weekly">Weekly Digest</MenuItem>
        </Select>
      </Box>
      
      <Typography variant="h6" sx={{ mt: 4 }}>Notification Types</Typography>
      
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="New Messages"
      />
      
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Friend Requests"
      />
      
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="System Updates"
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" color="primary">
          Save Preferences
        </Button>
      </Box>
    </Box>
  );
};

const AppearanceSettings = () => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  const [density, setDensity] = useState('normal');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6">Theme</Typography>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box
          onClick={() => setTheme('light')}
          sx={{
            p: 2,
            border: '2px solid',
            borderColor: theme === 'light' ? 'primary.main' : 'divider',
            borderRadius: 1,
            cursor: 'pointer',
            bgcolor: 'background.paper'
          }}
        >
          <Typography>Light</Typography>
        </Box>
        
        <Box
          onClick={() => setTheme('dark')}
          sx={{
            p: 2,
            border: '2px solid',
            borderColor: theme === 'dark' ? 'primary.main' : 'divider',
            borderRadius: 1,
            cursor: 'pointer',
            bgcolor: '#121212',
            color: 'white'
          }}
        >
          <Typography>Dark</Typography>
        </Box>
        
        <Box
          onClick={() => setTheme('system')}
          sx={{
            p: 2,
            border: '2px solid',
            borderColor: theme === 'system' ? 'primary.main' : 'divider',
            borderRadius: 1,
            cursor: 'pointer',
            background: 'linear-gradient(45deg, #121212 50%, #ffffff 50%)'
          }}
        >
          <Typography>System</Typography>
        </Box>
      </Box>
      
      <Typography variant="h6">Font Size</Typography>
      
      <Select
        value={fontSize}
        onChange={(e) => setFontSize(e.target.value)}
        fullWidth
      >
        <MenuItem value="small">Small</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="large">Large</MenuItem>
      </Select>
      
      <Typography variant="h6">Density</Typography>
      
      <Select
        value={density}
        onChange={(e) => setDensity(e.target.value)}
        fullWidth
      >
        <MenuItem value="compact">Compact</MenuItem>
        <MenuItem value="normal">Normal</MenuItem>
        <MenuItem value="comfortable">Comfortable</MenuItem>
      </Select>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" color="primary">
          Apply Changes
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsPage;