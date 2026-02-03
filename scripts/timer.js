// Timer Controller
// Handles all timing functionality including progress bars and countdowns

class TimerController {
    constructor() {
        this.currentTimer = null;
        this.startTime = 0;
        this.duration = 0;
        this.onComplete = null;
        this.onTick = null;
        this.isRunning = false;
        this.isPaused = false;
        
        // DOM elements
        this.progressFill = null;
        this.timeDisplay = null;
        this.progressCircle = null;
        
        this.initializeElements();
    }
    
    initializeElements() {
        this.progressFill = document.getElementById('progressFill');
        this.timeDisplay = document.getElementById('timeRemaining');
        this.progressCircle = document.getElementById('progressCircle');
    }
    
    startTimer(duration, onComplete, onTick = null) {
        this.stop(); // Stop any existing timer
        
        this.duration = duration;
        this.startTime = Date.now();
        this.onComplete = onComplete;
        this.onTick = onTick;
        this.isRunning = true;
        this.isPaused = false;
        
        console.log(`Timer started: ${duration} seconds`);
        
        // Update immediately
        this.updateDisplay(duration);
        
        // Start the timer loop
        this.currentTimer = setInterval(() => {
            if (this.isPaused) return;
            
            const elapsed = (Date.now() - this.startTime) / 1000;
            const remaining = Math.max(0, this.duration - elapsed);
            
            this.updateDisplay(remaining);
            
            // Call tick callback
            if (this.onTick) {
                this.onTick(remaining, elapsed);
            }
            
            // Check if timer completed
            if (remaining <= 0) {
                this.complete();
            }
        }, 100); // Update every 100ms for smooth animation
    }
    
    updateDisplay(timeRemaining) {
        // Update progress bar
        if (this.progressFill) {
            const progress = ((this.duration - timeRemaining) / this.duration) * 100;
            this.progressFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
        
        // Update time display
        if (this.timeDisplay) {
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = Math.floor(timeRemaining % 60);
            this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // Update circular progress (for modal)
        if (this.progressCircle) {
            const progress = ((this.duration - timeRemaining) / this.duration);
            const circumference = 2 * Math.PI * 50; // radius = 50
            const offset = circumference * (1 - progress);
            this.progressCircle.style.strokeDashoffset = offset;
        }
    }
    
    complete() {
        console.log('Timer completed');
        this.stop();
        
        if (this.onComplete) {
            this.onComplete();
        }
    }
    
    stop() {
        if (this.currentTimer) {
            clearInterval(this.currentTimer);
            this.currentTimer = null;
        }
        this.isRunning = false;
        this.isPaused = false;
    }
    
    pause() {
        if (this.isRunning) {
            this.isPaused = true;
            console.log('Timer paused');
        }
    }
    
    resume() {
        if (this.isRunning && this.isPaused) {
            // Adjust start time to account for pause
            const elapsed = (Date.now() - this.startTime) / 1000;
            this.startTime = Date.now() - (elapsed * 1000);
            this.isPaused = false;
            console.log('Timer resumed');
        }
    }
    
    getRemainingTime() {
        if (!this.isRunning) return 0;
        
        const elapsed = (Date.now() - this.startTime) / 1000;
        return Math.max(0, this.duration - elapsed);
    }
    
    getElapsedTime() {
        if (!this.isRunning) return 0;
        
        return (Date.now() - this.startTime) / 1000;
    }
    
    isTimerRunning() {
        return this.isRunning && !this.isPaused;
    }
    
    // Preset timer configurations for different parts
    static getTimerConfig(part, phase) {
        const configs = {
            '1.1': {
                reading: 4,
                answer: 30
            },
            '1.2': {
                reading: 5,
                answer: { describe: 40, analyze: 30, interpret: 30 }
            },
            '2': {
                preparation: 60,
                answer: 120
            },
            '3': {
                preparation: 60,
                answer: 120
            }
        };
        
        return configs[part] ? configs[part][phase] : null;
    }
    
    // Start reading phase timer
    startReadingTimer(part, questionType = null, onComplete) {
        let duration;
        
        if (part === '1.2' && questionType) {
            duration = TimerController.getTimerConfig(part, 'reading');
        } else {
            duration = TimerController.getTimerConfig(part, 'reading');
        }
        
        if (duration) {
            this.startTimer(duration, onComplete);
        }
    }
    
    // Start answer timer
    startAnswerTimer(part, questionType = null, onComplete) {
        let duration;
        
        if (part === '1.2' && questionType) {
            const answerTimes = TimerController.getTimerConfig(part, 'answer');
            duration = answerTimes[questionType] || answerTimes.describe;
        } else {
            duration = TimerController.getTimerConfig(part, 'answer');
        }
        
        if (duration) {
            this.startTimer(duration, onComplete);
        }
    }
    
    // Start preparation timer (for Parts 2 and 3)
    startPreparationTimer(part, onComplete) {
        const duration = TimerController.getTimerConfig(part, 'preparation');
        
        if (duration) {
            this.startTimer(duration, onComplete);
        }
    }
    
    // Format time for display
    static formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    // Get total test duration estimate
    static getTotalTestDuration() {
        return {
            part1_1: 72, // 3 questions × (4s reading + 20s answer) = 72s
            part1_2: 105, // 5s + 40s + 5s + 30s + 5s + 30s = 115s
            part2: 180, // 60s preparation + 120s answer = 180s
            part3: 180, // 60s preparation + 120s answer = 180s
            total: 537 // ~9 minutes total
        };
    }
}