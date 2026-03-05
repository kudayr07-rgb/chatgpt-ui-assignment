import { Chip, Box, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TranslateIcon from '@mui/icons-material/Translate';
import CodeIcon from "@mui/icons-material/Code";
import ArticleIcon from "@mui/icons-material/Article";
import SchoolIcon from "@mui/icons-material/School";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

interface SuggestionChipsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const getIcon = (text: string) => {
  const lower = text.toLowerCase();

  if (lower.includes("example")) return <TranslateIcon />;
  if (lower.includes("code")) return <CodeIcon />;
  if (lower.includes("example")) return <SchoolIcon />;
  if (lower.includes("summarize")) return <ArticleIcon />;

  return <LightbulbIcon />;
};

export function SuggestionChips({ suggestions = [], onSuggestionClick }: SuggestionChipsProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const validSuggestions = (suggestions || []).filter(Boolean);

  return (
    <Fade in timeout={500}>
    <Box
        className="suggestion-chips-container" 
        role="region"
        aria-label="Suggested prompts"
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            py: 3,
            px: 2
        }}
    >
      {validSuggestions.map((suggestion, index) => (
        <Chip
            key={index}
            role="button"
            aria-label={`Suggested prompt: ${suggestion}`}
            className={`suggestion-chip suggestion-chip-${index}`}
            icon={getIcon(suggestion)}
            label={suggestion.slice(0,50)}
            onClick={() => onSuggestionClick(suggestion)}
            variant="outlined"
            sx={{
                borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                color: theme.palette.text.primary,
                transition: 'all 0.2s ease',
                '&:hover': {
                borderColor: '#10a37f',
                backgroundColor: isDark ? 'rgba(16, 163, 127, 0.1)' : 'rgba(16, 163, 127, 0.05)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(16, 163, 127, 0.2)'
                },
                '& .MuiChip-icon': {
                color: '#10a37f'
                }
          }}
        />
      ))}
    </Box>
    </Fade>
  );
}
