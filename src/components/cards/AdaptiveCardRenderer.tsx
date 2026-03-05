import { useEffect, useRef } from 'react';
import * as AdaptiveCards from 'adaptivecards';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface AdaptiveCardRendererProps {
  cardPayload: any;
  onAction?: (action: AdaptiveCards.Action) => void;
}

export function AdaptiveCardRenderer({ cardPayload, onAction }: AdaptiveCardRendererProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    if (!cardRef.current) return;

    const adaptiveCard = new AdaptiveCards.AdaptiveCard();
    
    adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
      fontFamily: 'Söhne, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif',
      spacing: {
        small: 8,
        default: 12,
        medium: 16,
        large: 20,
        extraLarge: 24,
        padding: 12
      },
      separator: {
        lineThickness: 1,
        lineColor: isDark ? '#4b5563' : '#e5e7eb'
      },
      containerStyles: {
        default: {
          backgroundColor: isDark ? '#444654' : '#ffffff',
          foregroundColors: {
            default: {
              default: isDark ? '#ececf1' : '#111827',
              subtle: isDark ? '#9ca3af' : '#6b7280'
            }
          }
        },
        emphasis: {
          backgroundColor: isDark ? '#3b3b4a' : '#f3f4f6',
          foregroundColors: {
            default: {
              default: isDark ? '#ececf1' : '#111827',
              subtle: isDark ? '#9ca3af' : '#6b7280'
            }
          }
        }
      }
    });

    // Handle card actions
    adaptiveCard.onExecuteAction = (action) => {
      if (onAction) {
        onAction(action);
      }
    };

    try {
      // Parse the card payload
      adaptiveCard.parse(cardPayload);
      
      // Render the card
      const renderedCard = adaptiveCard.render();
      
      if (renderedCard) {
        // Clear previous content
        cardRef.current.innerHTML = '';
        cardRef.current.appendChild(renderedCard);
      }
    } catch (error) {
      console.error('Error rendering adaptive card:', error);
      cardRef.current.innerHTML = '<div style="color: red;">Error rendering card</div>';
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.innerHTML = '';
      }
    };
  }, [cardPayload, onAction, isDark]);

  return (
    <Box
      className="adaptive-card-renderer"
      ref={cardRef}
      sx={{
        '& .ac-container': {
          fontFamily: 'inherit',
          color: theme.palette.text.primary
        },
        '& .ac-textBlock': {
          color: theme.palette.text.primary
        },
        '& .ac-pushButton': {
          backgroundColor: '#10a37f',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 16px',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#0d8f6f'
          }
        },
        '& .ac-input': {
          backgroundColor: isDark ? '#40414f' : '#ffffff',
          color: theme.palette.text.primary,
          border: `1px solid ${isDark ? '#565869' : '#d1d5db'}`,
          borderRadius: '6px',
          '&:focus': {
            borderColor: '#10a37f',
            outline: 'none'
          }
        }
      }}
    />
  );
}