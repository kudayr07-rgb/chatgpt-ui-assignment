import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Slider,
  Switch,
  TextField,
  Box,
  Typography,
  Divider
} from '@mui/material';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { usePreferences } from '../context/UserPreferenceContext';
import type { UserPreferences } from '../context/UserPreferenceContext';

interface UserPreferencesDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function UserPreferencesDialog({ open, onClose }: UserPreferencesDialogProps) {
    const { preferences, setPreferences } = usePreferences();
    const [localPreferences, setLocalPreferences] = useState<UserPreferences>(preferences);

    const handleSave = () => {
        setPreferences(localPreferences);
        onClose();
    };

  return (
    <Dialog
      className="user-preferences-dialog"
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className="user-preferences-title">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SettingsSuggestIcon />
          User Preferences
        </Box>
      </DialogTitle>

      <DialogContent className="user-preferences-content">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
          
          <TextField
            className="pref-username-field"
            label="Your Name (Optional)"
            value={localPreferences.userName}
            onChange={(e) => setLocalPreferences({ ...localPreferences, userName: e.target.value })}
            placeholder="How should I address you?"
            fullWidth
          />

          <Divider />

          <FormControl className="pref-response-style" component="fieldset">
            <FormLabel component="legend">Response Style</FormLabel>
            <RadioGroup
              value={localPreferences.responseStyle}
              onChange={(e) => setLocalPreferences({ ...localPreferences, responseStyle: e.target.value as any })}
            >
              <FormControlLabel 
                value="concise" 
                control={<Radio />} 
                label={
                  <Box>
                    <Typography variant="body2">Concise</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Short and to the point
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel 
                value="detailed" 
                control={<Radio />} 
                label={
                  <Box>
                    <Typography variant="body2">Detailed</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Comprehensive explanations
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel 
                value="creative" 
                control={<Radio />} 
                label={
                  <Box>
                    <Typography variant="body2">Creative</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Engaging and imaginative
                    </Typography>
                  </Box>
                }
              />
            </RadioGroup>
          </FormControl>

          <Divider />

          <FormControl className="pref-code-language" fullWidth>
            <FormLabel>Preferred Code Language</FormLabel>
            <Select
              value={localPreferences.codeLanguage}
              onChange={(e) => setLocalPreferences({ ...localPreferences, codeLanguage: e.target.value })}
              sx={{ mt: 1 }}
            >
              <MenuItem value="python">Python</MenuItem>
              <MenuItem value="javascript">JavaScript</MenuItem>
              <MenuItem value="typescript">TypeScript</MenuItem>
              <MenuItem value="java">Java</MenuItem>
              <MenuItem value="cpp">C++</MenuItem>
              <MenuItem value="go">Go</MenuItem>
              <MenuItem value="rust">Rust</MenuItem>
            </Select>
          </FormControl>

          <Divider />

          <FormControl className="pref-temperature" fullWidth>
            <FormLabel>Creativity Level</FormLabel>
            <Box sx={{ px: 2, pt: 2 }}>
              <Slider
                value={localPreferences.temperature}
                onChange={(_, value) => setLocalPreferences({ ...localPreferences, temperature: value as number })}
                min={0}
                max={1}
                step={0.1}
                marks={[
                  { value: 0, label: 'Precise' },
                  { value: 0.5, label: 'Balanced' },
                  { value: 1, label: 'Creative' }
                ]}
                valueLabelDisplay="auto"
                sx={{
                  color: '#10a37f',
                  '& .MuiSlider-thumb': {
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px rgba(16, 163, 127, 0.16)'
                    }
                  }
                }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
              Current: {preferences.temperature.toFixed(1)}
            </Typography>
          </FormControl>

          <Divider />

          <FormControl className="pref-max-tokens" fullWidth>
            <FormLabel>Maximum Response Length</FormLabel>
            <Box sx={{ px: 2, pt: 2 }}>
              <Slider
                value={localPreferences.maxTokens}
                onChange={(_, value) => setLocalPreferences({ ...localPreferences, maxTokens: value as number })}
                min={500}
                max={4000}
                step={100}
                marks={[
                  { value: 500, label: 'Short' },
                  { value: 2000, label: 'Medium' },
                  { value: 4000, label: 'Long' }
                ]}
                valueLabelDisplay="auto"
                sx={{ color: '#10a37f' }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
              {preferences.maxTokens} tokens (~{Math.round(preferences.maxTokens * 0.75)} words)
            </Typography>
          </FormControl>

          <Divider />

          <FormControl className="pref-streaming" fullWidth>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <FormLabel>Enable Streaming</FormLabel>
                <Typography variant="caption" color="text.secondary" display="block">
                  Show responses as they're generated
                </Typography>
              </Box>
              <Switch
                checked={localPreferences.streamingEnabled}
                onChange={(e) => setLocalPreferences({ ...localPreferences, streamingEnabled: e.target.checked })}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#10a37f',
                    '&:hover': {
                      backgroundColor: 'rgba(16, 163, 127, 0.08)'
                    }
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#10a37f'
                  }
                }}
              />
            </Box>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions className="user-preferences-actions" sx={{ px: 3, pb: 2 }}>
        <Button className="pref-cancel-btn" onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          className="pref-save-btn"
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: '#10a37f',
            '&:hover': {
              backgroundColor: '#0d8f6f'
            }
          }}
        >
          Save Preferences
        </Button>
      </DialogActions>
    </Dialog>
  );
}
