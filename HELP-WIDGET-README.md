# Help Widget Content Configuration

This guide explains how to update the text content in the help widget without editing code.

## Configuration File

**File**: `help-widget-config.json`

This JSON file contains all the text content displayed on the help widget's main screen. Edit this file to update:
- Greeting message
- Recommendation cards (titles, descriptions, buttons)
- Chat greetings for each section
- Question links
- Resource links

## How to Update Content

### 1. Greeting Message
```json
"greeting": {
  "text": "Your new greeting message here"
}
```

### 2. Recommendation Cards
Each recommendation has:
```json
{
  "id": "rec1",
  "title": "Card Title",
  "expanded": true,  // true = auto-expanded, false = collapsed
  "content": {
    "description": "Main description text with <span> tags for styling",
    "primaryButton": "Button Text",
    "chatGreeting": "Chat greeting when user clicks chat icon",
    "questions": [
      "First clickable question",
      "Second clickable question"
    ]
  }
}
```

### 3. Resource Links
```json
"resources": {
  "title": "Section Title",
  "links": [
    {
      "icon": "fas fa-icon-name",  // FontAwesome icon class
      "text": "Link Text",
      "url": "#"  // Link destination
    }
  ]
}
```

## Examples of Common Updates

### Change Webinar Date
```json
"description": "Stay ahead and sign up for the Top 5 Sales Strategies webinar coming up on August 15 10AM..."
```

### Update Button Text
```json
"primaryButton": "Join Webinar Now"
```

### Add New Questions
```json
"questions": [
  "What sales strategies are covered in the webinar",
  "How to register for the webinar", 
  "What time zone is the webinar in"
]
```

### Update a Question's Answer
```json
"How does Sales Assistant work": {
  "response": "Updated explanation of Sales Assistant with new features and capabilities...",
  "showFeedback": true
}
```

### Add New Q&A Entry
```json
"What time zone is the webinar in": {
  "response": "The webinar is offered in multiple time zones:\n\n• 10 AM EST (New York)\n• 9 AM CST (Chicago)\n• 7 AM PST (Los Angeles)\n• 3 PM GMT (London)\n\nChoose your preferred time when registering.",
  "showFeedback": true
}
```

### Update Chat Greeting
```json
"chatGreeting": "Hi! Ask me anything about our latest sales tools!"
```

## Chat Responses Configuration

The `chatResponses` section lets you customize the default answers for each question entry point.

### Structure
```json
"chatResponses": {
  "salesAssistant": {
    "Question Text": {
      "response": "The answer that appears when user clicks this question",
      "showFeedback": true  // Whether to show thumbs up/down buttons
    }
  },
  "salesStrategies": { /* Webinar-related Q&A */ },
  "innovations": { /* Q2 features Q&A */ }
}
```

### Editing Responses

1. **Find the question** you want to update in the appropriate section
2. **Edit the response text** - supports formatting with `\n\n` for paragraphs
3. **Use bullet points** with `•` or `✓` for lists
4. **Add emojis** for visual appeal (🔍 📊 🎯)
5. **Toggle feedback buttons** with `showFeedback: true/false`

### Response Formatting Tips

**Paragraphs**: Use `\n\n` between paragraphs
```json
"response": "First paragraph.\n\nSecond paragraph with more details."
```

**Bullet Lists**: Use `•` or `✓` for visual bullets
```json
"response": "Key features:\n\n• Feature 1 - Description\n• Feature 2 - Description\n✓ Benefit 1\n✓ Benefit 2"
```

**Numbered Lists**: Use `1.` `2.` etc.
```json
"response": "Steps to follow:\n\n1. First step\n2. Second step\n3. Final step"
```

**Sections with Headers**: Use emojis or special formatting
```json
"response": "🔍 Analysis Features:\n• Data insights\n• Trend tracking\n\n📊 Reporting:\n• Custom dashboards\n• Export options"
```

## Implementation Notes

- **HTML Styling**: You can use `<span class="sales-assistant">` for highlighting
- **Icon Classes**: Use FontAwesome classes (e.g., `fas fa-question-circle`)
- **Special Characters**: Escape quotes with `\"` if needed
- **Line Breaks**: Use `\n` for line breaks in JSON strings

## File Structure
```
├── index.html              (main HTML file)
├── styles.css             (styling)
├── script.js              (functionality)
├── help-widget-config.json ← EDIT THIS FILE
└── HELP-WIDGET-README.md   (this guide)
```

## Tips

1. **Always validate JSON** after editing (use jsonlint.com)
2. **Keep descriptions concise** for better mobile display
3. **Test on different screen sizes** after content changes
4. **Update the metadata section** with version and date info

## Need Help?

If you need to add new recommendation cards or change the widget structure, you'll need to modify the HTML/JavaScript files. For text-only changes, this config file is all you need! 