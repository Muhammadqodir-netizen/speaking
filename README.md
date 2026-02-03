# IELTS Mock Speaking Test - Web Application

A browser-based IELTS speaking test simulation that provides a realistic exam experience with automatic timing, speech synthesis, and video recording capabilities.

## 🎯 Features

- **Complete Browser-Based Solution** - No installation required
- **Automatic Test Flow** - All parts run automatically without manual intervention
- **Speech Synthesis** - Questions spoken aloud in English using Web Speech API
- **Video Recording** - Camera and microphone recording using MediaDevices API
- **Glassmorphism UI** - Modern dark navy theme with smooth animations
- **Responsive Design** - Works on desktop and mobile devices
- **Expandable Question Database** - Easy to add new questions via data files

## 🏗️ Test Structure

### Part 1.1 - Introduction and Interview
- **Questions**: 3 questions
- **Reading Time**: 4 seconds per question
- **Answer Time**: 20 seconds per question
- **Topics**: Personal information, hometown, work/study, hobbies

### Part 1.2 - Picture Description  
- **Questions**: 3 questions with images
- **Reading Time**: 5 seconds per question
- **Answer Time**: 40s (describe), 30s (analyze), 30s (interpret)
- **Format**: Image-based questions with visual prompts

### Part 2 - Long Turn (Cue Card)
- **Questions**: 1 cue card topic
- **Preparation Time**: 60 seconds
- **Answer Time**: 120 seconds (2 minutes)
- **Format**: Structured topic with bullet points

### Part 3 - Discussion
- **Questions**: 1 discussion topic
- **Preparation Time**: 60 seconds  
- **Answer Time**: 120 seconds (2 minutes)
- **Format**: Abstract/opinion-based questions

## 📁 Project Structure

```
├── index.html                 # Main HTML file with all screens
├── styles/
│   └── main.css              # Complete styling with glassmorphism theme
├── scripts/
│   ├── app.js                # Main application controller
│   ├── testController.js     # Test flow management
│   ├── speechSynthesis.js    # Text-to-speech functionality
│   ├── timer.js              # Timer and progress bar control
│   └── videoRecorder.js      # Camera/microphone handling
├── data/
│   └── questions.js          # All test questions (EASY TO EXPAND)
├── images/
│   └── README.md             # Instructions for adding images
└── README.md                 # This file
```

## 🚀 Quick Start

1. **Download/Clone** the project files
2. **Add Images** to the `images/` directory:
   - `family_park.jpg` - Family scene in a park
   - `office_meeting.jpg` - Business meeting scene
   - `restaurant_scene.jpg` - Restaurant dining scene
3. **Serve the files** using a web server (REQUIRED for screen recording):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve . -p 8000
   
   # Using PHP
   php -S localhost:8000
   ```
4. **Open browser** and navigate to `http://localhost:8000` (NOT file://)
5. **Allow permissions** for screen recording and microphone when prompted

## ⚠️ Important: Screen Recording Requirements

### For Best Results:
- **Use HTTP Server**: Run `python -m http.server 8000` and open `http://localhost:8000`
- **Avoid File Protocol**: Don't open `file://` directly in browser
- **Select "This Tab"**: When prompted for screen recording, choose the test tab

### If Using File Protocol:
- Select **"Entire Screen"** instead of "This Tab"
- Or select another browser window showing the same page
- Screen recording of local files is limited by browser security

## 🎮 How to Use

### For Test Takers:
1. Enter your ID, Name, and Phone Number
2. Click "Start Speaking Test"
3. Allow camera and microphone access
4. Follow the on-screen instructions
5. Speak clearly during answer phases
6. Test runs automatically through all parts

### For Administrators:
- **Add Questions**: Edit `data/questions.js`
- **Add Images**: Place images in `images/` directory
- **Customize Timers**: Modify `scripts/timer.js`
- **Change Styling**: Edit `styles/main.css`

## 🔧 Configuration

### Adding New Questions

Edit `data/questions.js` to add questions to any part:

```javascript
// Example: Adding a new Part 1.1 question
part1_1: {
    questions: [
        // ... existing questions
        {
            id: 7,
            text: "What is your favorite season and why?",
            part: "1.1"
        }
    ]
}
```

### Timer Configuration

Modify timing in `scripts/timer.js`:

```javascript
static getTimerConfig(part, phase) {
    const configs = {
        '1.1': {
            reading: 4,    // Reading time in seconds
            answer: 20     // Answer time in seconds
        },
        // ... other configurations
    };
}
```

### Speech Settings

Customize speech synthesis in `scripts/speechSynthesis.js`:

```javascript
utterance.rate = 0.9;    // Speech speed (0.1 to 10)
utterance.pitch = 1.0;   // Voice pitch (0 to 2)
utterance.volume = 1.0;  // Volume (0 to 1)
```

## 🎥 Technical Details

### Video Recording
- **API**: MediaDevices API for camera/microphone access
- **Format**: WebM with VP8/VP9 video and Opus audio
- **Storage**: Browser-based recording (no server upload in this version)
- **Permissions**: Requires HTTPS for production use

### Speech Synthesis
- **API**: Web Speech API for text-to-speech
- **Voice**: Automatically selects best English voice
- **Features**: Questions spoken aloud, transition announcements

### Browser Compatibility
| Browser | Video | Audio | Speech | Status |
|---------|-------|-------|--------|---------|
| Chrome 60+ | ✅ | ✅ | ✅ | Fully Supported |
| Edge 79+ | ✅ | ✅ | ✅ | Fully Supported |
| Firefox 70+ | ✅ | ✅ | ✅ | Supported |
| Safari 14+ | ✅ | ✅ | ⚠️ | Limited Speech |

## 📱 Mobile Support

- **Responsive Design**: Adapts to mobile screens
- **Touch Interface**: Mobile-friendly controls
- **iOS Safari**: Supported with iOS 14.3+
- **Android Chrome**: Full support

## 🔒 Security & Privacy

- **HTTPS Required**: For camera/microphone access in production
- **Local Processing**: All recording happens in browser
- **No Server**: No data sent to external servers by default
- **Permissions**: Explicit user consent for media access

## 🛠️ Development

### File Responsibilities

- **`scripts/timer.js`**: Controls all timing, progress bars, and countdowns
- **`data/questions.js`**: Contains all test questions - **MAIN FILE TO EDIT FOR NEW QUESTIONS**
- **`scripts/testController.js`**: Manages test flow and part transitions
- **`scripts/speechSynthesis.js`**: Handles text-to-speech functionality
- **`scripts/videoRecorder.js`**: Camera and microphone management

### Adding More Questions

1. Open `data/questions.js`
2. Find the appropriate part (part1_1, part1_2, part2, part3)
3. Add new question objects to the questions array
4. For Part 1.2, also add image references
5. Test the new questions

### Customizing Appearance

- **Colors**: Edit CSS custom properties in `styles/main.css`
- **Fonts**: Change font-family declarations
- **Layout**: Modify glassmorphism card styles
- **Animations**: Adjust transition durations and effects

## 🐛 Troubleshooting

### Common Issues

**Camera/Microphone Not Working:**
- Ensure HTTPS in production
- Check browser permissions
- Try different browser
- Verify device privacy settings

**Speech Not Working:**
- Check browser speech synthesis support
- Try different browser
- Verify system audio settings

**Questions Not Loading:**
- Check `data/questions.js` syntax
- Verify file paths
- Check browser console for errors

**Timer Issues:**
- Ensure JavaScript is enabled
- Check for browser tab switching
- Verify system clock accuracy

### Debug Functions

Open browser console and use:
```javascript
// Get current test status
getTestStatus()

// Emergency stop test
emergencyStop()

// Check available voices
ieltsApp.testController.speechController.getAvailableVoices()
```

## 🚀 Deployment

### Local Development
```bash
python -m http.server 8000
```

### Production Deployment
1. Upload files to web server
2. Ensure HTTPS is configured
3. Add required images to `images/` directory
4. Test all functionality

### Hosting Options
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Free static hosting
- **AWS S3**: Cloud storage with CloudFront

## 📈 Future Enhancements

- **Server Integration**: Upload recordings to cloud storage
- **AI Assessment**: Automated speaking evaluation
- **Progress Tracking**: Multi-session progress monitoring
- **Advanced Analytics**: Detailed performance metrics
- **Offline Mode**: Offline recording with sync capability

## 📄 License

This project is provided for educational and assessment purposes. Ensure compliance with local privacy laws when collecting user recordings.

## 🤝 Contributing

1. Fork the repository
2. Add your improvements
3. Test thoroughly across browsers
4. Submit a pull request

---

**Total Test Duration**: Approximately 9 minutes
**Supported Languages**: English (speech synthesis)
**Minimum Requirements**: Modern browser with camera/microphone access