// Sample Adaptive Card templates for various use cases
export const adaptiveCardTemplates = {
  weather: {
    type: 'AdaptiveCard',
    version: '1.5',
    body: [
      {
        type: 'TextBlock',
        text: 'Weather Forecast',
        weight: 'Bolder',
        size: 'Large'
      },
      {
        type: 'ColumnSet',
        columns: [
          {
            type: 'Column',
            width: 'auto',
            items: [
              {
                type: 'Image',
                url: 'https://adaptivecards.io/content/weather.png',
                size: 'Medium',
                altText: 'Weather icon'
              }
            ]
          },
          {
            type: 'Column',
            width: 'stretch',
            items: [
              {
                type: 'TextBlock',
                text: 'San Francisco, CA',
                weight: 'Bolder'
              },
              {
                type: 'TextBlock',
                text: 'Monday, March 2, 2026',
                spacing: 'None',
                isSubtle: true
              },
              {
                type: 'TextBlock',
                text: '72°F / 22°C',
                size: 'ExtraLarge',
                weight: 'Bolder'
              },
              {
                type: 'TextBlock',
                text: 'Partly Cloudy',
                spacing: 'None'
              }
            ]
          }
        ]
      },
      {
        type: 'FactSet',
        facts: [
          {
            title: 'Humidity:',
            value: '65%'
          },
          {
            title: 'Wind:',
            value: '12 mph NW'
          },
          {
            title: 'Pressure:',
            value: '30.12 in'
          }
        ]
      }
    ]
  },

  task: {
    type: 'AdaptiveCard',
    version: '1.5',
    body: [
      {
        type: 'TextBlock',
        text: 'Task Summary',
        weight: 'Bolder',
        size: 'Large'
      },
      {
        type: 'TextBlock',
        text: 'Update project documentation',
        size: 'Medium',
        wrap: true
      },
      {
        type: 'FactSet',
        facts: [
          {
            title: 'Status:',
            value: 'In Progress'
          },
          {
            title: 'Priority:',
            value: 'High'
          },
          {
            title: 'Due Date:',
            value: 'March 5, 2026'
          },
          {
            title: 'Assigned to:',
            value: 'John Doe'
          }
        ]
      }
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Mark Complete',
        data: { action: 'complete' }
      },
      {
        type: 'Action.Submit',
        title: 'View Details',
        data: { action: 'details' }
      }
    ]
  },

  calendar: {
    type: 'AdaptiveCard',
    version: '1.5',
    body: [
      {
        type: 'TextBlock',
        text: 'Upcoming Meeting',
        weight: 'Bolder',
        size: 'Large'
      },
      {
        type: 'Container',
        style: 'emphasis',
        items: [
          {
            type: 'ColumnSet',
            columns: [
              {
                type: 'Column',
                width: 'auto',
                items: [
                  {
                    type: 'TextBlock',
                    text: '📅',
                    size: 'ExtraLarge'
                  }
                ]
              },
              {
                type: 'Column',
                width: 'stretch',
                items: [
                  {
                    type: 'TextBlock',
                    text: 'Team Standup Meeting',
                    weight: 'Bolder',
                    size: 'Medium'
                  },
                  {
                    type: 'TextBlock',
                    text: 'Today at 2:00 PM',
                    spacing: 'None',
                    isSubtle: true
                  },
                  {
                    type: 'TextBlock',
                    text: 'Duration: 30 minutes',
                    spacing: 'None',
                    isSubtle: true
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: 'FactSet',
        separator: true,
        facts: [
          {
            title: 'Location:',
            value: 'Conference Room A'
          },
          {
            title: 'Organizer:',
            value: 'Sarah Johnson'
          },
          {
            title: 'Attendees:',
            value: '8 people'
          }
        ]
      }
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Accept',
        data: { action: 'accept' }
      },
      {
        type: 'Action.Submit',
        title: 'Decline',
        data: { action: 'decline' }
      }
    ]
  },

  product: {
    type: 'AdaptiveCard',
    version: '1.5',
    body: [
      {
        type: 'TextBlock',
        text: 'Product Recommendation',
        weight: 'Bolder',
        size: 'Large'
      },
      {
        type: 'ColumnSet',
        columns: [
          {
            type: 'Column',
            width: 'auto',
            items: [
              {
                type: 'Image',
                url: 'https://adaptivecards.io/content/cats/1.png',
                size: 'Medium',
                altText: 'Product image'
              }
            ]
          },
          {
            type: 'Column',
            width: 'stretch',
            items: [
              {
                type: 'TextBlock',
                text: 'Premium Wireless Headphones',
                weight: 'Bolder',
                size: 'Medium',
                wrap: true
              },
              {
                type: 'TextBlock',
                text: '⭐⭐⭐⭐⭐ 4.8/5 (1,234 reviews)',
                spacing: 'None',
                size: 'Small'
              },
              {
                type: 'TextBlock',
                text: '$299.99',
                size: 'Large',
                weight: 'Bolder',
                color: 'Accent'
              },
              {
                type: 'TextBlock',
                text: 'Free shipping • In stock',
                spacing: 'None',
                isSubtle: true,
                size: 'Small'
              }
            ]
          }
        ]
      },
      {
        type: 'TextBlock',
        text: 'Features:',
        weight: 'Bolder',
        separator: true
      },
      {
        type: 'TextBlock',
        text: '• Active noise cancellation\n• 30-hour battery life\n• Bluetooth 5.0\n• Premium sound quality',
        wrap: true
      }
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Add to Cart',
        data: { action: 'addtocart' }
      },
      {
        type: 'Action.Submit',
        title: 'View Details',
        data: { action: 'viewdetails' }
      }
    ]
  },

  poll: {
    type: 'AdaptiveCard',
    version: '1.5',
    body: [
      {
        type: 'TextBlock',
        text: 'Quick Poll',
        weight: 'Bolder',
        size: 'Large'
      },
      {
        type: 'TextBlock',
        text: 'What\'s your favorite programming language?',
        wrap: true,
        size: 'Medium'
      },
      {
        type: 'Input.ChoiceSet',
        id: 'language',
        style: 'expanded',
        choices: [
          {
            title: 'JavaScript / TypeScript',
            value: 'js'
          },
          {
            title: 'Python',
            value: 'python'
          },
          {
            title: 'Java',
            value: 'java'
          },
          {
            title: 'C#',
            value: 'csharp'
          },
          {
            title: 'Other',
            value: 'other'
          }
        ]
      }
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Submit Vote',
        data: { action: 'vote' }
      }
    ]
  },

  notification: {
    type: 'AdaptiveCard',
    version: '1.5',
    body: [
      {
        type: 'Container',
        style: 'attention',
        items: [
          {
            type: 'ColumnSet',
            columns: [
              {
                type: 'Column',
                width: 'auto',
                items: [
                  {
                    type: 'TextBlock',
                    text: '⚠️',
                    size: 'Large'
                  }
                ]
              },
              {
                type: 'Column',
                width: 'stretch',
                items: [
                  {
                    type: 'TextBlock',
                    text: 'Important Notice',
                    weight: 'Bolder',
                    size: 'Medium'
                  },
                  {
                    type: 'TextBlock',
                    text: 'System maintenance scheduled for tonight at 11:00 PM. Expected downtime: 2 hours.',
                    wrap: true,
                    spacing: 'None'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: 'FactSet',
        facts: [
          {
            title: 'Start Time:',
            value: 'March 2, 11:00 PM PST'
          },
          {
            title: 'Duration:',
            value: '2 hours'
          },
          {
            title: 'Impact:',
            value: 'All services temporarily unavailable'
          }
        ]
      }
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Acknowledge',
        data: { action: 'acknowledge' }
      }
    ]
  }
};
