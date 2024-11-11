# E-valuateur

E-valuateur is a web-based student evaluation tool designed for teachers to track and manage student progress across various competencies in French primary education (CP level).

## Features

- 📝 Student Management

  - Add and remove students
  - Track individual student progress
  - Generate student avatars with initials

- 📊 Evaluation Tools

  - Multiple competency domains (Math, Language, Arts, etc.)
  - Detailed evaluation criteria
  - Progress tracking with color-coded indicators
  - Real-time updates and auto-saving

- 📈 Multiple Views

  - Student List View
  - Progress Chart View
  - Global Overview

- 💾 Data Management
  - Import/Export functionality
  - Automatic data backup
  - Local storage persistence

## Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   ```

2. Open `ressources/main.html` in your web browser

No additional installation steps are required as this is a client-side application.

## Usage

### Adding Students

1. Click the '+' button in the top right corner
2. Enter the student's name
3. The student will appear in the list with their initials as an avatar

### Evaluating Students

1. Switch to the "Tableau de progression" view
2. Select a competency domain from the dropdown
3. Enter evaluation scores (0-100) for each criterion
4. Data is automatically saved

### Viewing Progress

- Use the navigation buttons to switch between views:
  - "Liste des élèves": View all students
  - "Tableau de progression": Detailed evaluation grid
  - "Vue globale": Overview of all competencies for a selected student

### Data Management

- Export: Click the export button to save all data as JSON
- Import: Click the import button to load previously exported data

## Technical Details

### File Structure

```markdown
ressources/
├── main.html
├── styles.css
└── app.js
```

### Dependencies

- No external dependencies required
- Built with vanilla JavaScript
- Uses modern browser features:
  - Local Storage
  - CSS Grid/Flexbox
  - ES6+ Features

### Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Designed for French primary education system
- Competency frameworks based on official CP level requirements
