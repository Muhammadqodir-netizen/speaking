// Speech Synthesis Controller
// Handles text-to-speech functionality using Web Speech API

class SpeechController {
    constructor() {
        this.synthesis = window.speechSynthesis;
        this.voice = null;
        this.isSupported = 'speechSynthesis' in window;
        this.isSpeaking = false;
        
        this.initializeVoice();
    }
    
    initializeVoice() {
        if (!this.isSupported) {
            console.warn('Speech synthesis not supported in this browser');
            return;
        }
        
        // Wait for voices to load
        const setVoice = () => {
            const voices = this.synthesis.getVoices();
            
            // Prefer English voices
            const englishVoices = voices.filter(voice => 
                voice.lang.startsWith('en-') && 
                (voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.default)
            );
            
            if (englishVoices.length > 0) {
                // Prefer female voices for IELTS test
                this.voice = englishVoices.find(voice => 
                    voice.name.toLowerCase().includes('female') || 
                    voice.name.toLowerCase().includes('zira') ||
                    voice.name.toLowerCase().includes('hazel')
                ) || englishVoices[0];
            } else {
                this.voice = voices.find(voice => voice.lang.startsWith('en-')) || voices[0];
            }
            
            console.log('Selected voice:', this.voice?.name || 'Default');
        };
        
        if (this.synthesis.getVoices().length > 0) {
            setVoice();
        } else {
            this.synthesis.addEventListener('voiceschanged', setVoice);
        }
    }
    
    speak(text, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isSupported) {
                console.warn('Speech synthesis not supported');
                resolve();
                return;
            }
            
            // Stop any current speech
            this.stop();
            
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Set voice and properties
            if (this.voice) {
                utterance.voice = this.voice;
            }
            
            utterance.rate = options.rate || 0.9; // Slightly slower for clarity
            utterance.pitch = options.pitch || 1.0;
            utterance.volume = options.volume || 1.0;
            utterance.lang = options.lang || 'en-US';
            
            // Event handlers
            utterance.onstart = () => {
                this.isSpeaking = true;
                console.log('Speech started:', text.substring(0, 50) + '...');
            };
            
            utterance.onend = () => {
                this.isSpeaking = false;
                console.log('Speech ended');
                resolve();
            };
            
            utterance.onerror = (event) => {
                this.isSpeaking = false;
                console.error('Speech error:', event.error);
                reject(event.error);
            };
            
            // Start speaking
            this.synthesis.speak(utterance);
        });
    }
    
    stop() {
        if (this.isSupported && this.synthesis.speaking) {
            this.synthesis.cancel();
            this.isSpeaking = false;
        }
    }
    
    pause() {
        if (this.isSupported && this.synthesis.speaking) {
            this.synthesis.pause();
        }
    }
    
    resume() {
        if (this.isSupported && this.synthesis.paused) {
            this.synthesis.resume();
        }
    }
    
    // Speak question with appropriate formatting
    async speakQuestion(questionText, part) {
        let textToSpeak = '';
        
        switch (part) {
            case '1.1':
                textToSpeak = `Question: ${questionText}`;
                break;
            case '1.2':
                textToSpeak = `Look at the picture and answer: ${questionText}`;
                break;
            case '2':
                textToSpeak = `Here is your topic: ${questionText.replace(/\n/g, ' ').replace(/•/g, '')}`;
                break;
            case '3':
                textToSpeak = `Discussion question: ${questionText}`;
                break;
            default:
                textToSpeak = questionText;
        }
        
        await this.speak(textToSpeak);
    }
    
    // Speak transition announcements
    async speakTransition(message) {
        await this.speak(message, { rate: 0.8 });
    }
    
    // Speak part completion announcements
    async speakPartCompletion(completedPart, nextPart = null) {
        let message = `Part ${completedPart} finished.`;
        
        if (nextPart) {
            message += ` Now preparing for Part ${nextPart}.`;
        } else {
            message += ` Test completed. Thank you.`;
        }
        
        await this.speak(message, { rate: 0.8 });
    }
    
    // Check if speech is currently active
    isSpeechActive() {
        return this.isSpeaking || (this.isSupported && this.synthesis.speaking);
    }
    
    // Get available voices for debugging
    getAvailableVoices() {
        if (!this.isSupported) return [];
        return this.synthesis.getVoices().map(voice => ({
            name: voice.name,
            lang: voice.lang,
            default: voice.default
        }));
    }
}