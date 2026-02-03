// Main Application Controller
// Entry point and UI event handling

class IELTSApp {
    constructor() {
        this.testController = new TestController();
        this.currentScreen = 'startScreen';
        
        this.initializeEventListeners();
        this.initializeUI();
    }
    
    initializeEventListeners() {
        // Start form submission
        const candidateForm = document.getElementById('candidateForm');
        if (candidateForm) {
            candidateForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleStartTest();
            });
        }
        
        // Stop test button
        const stopTestBtn = document.getElementById('stopTestBtn');
        if (stopTestBtn) {
            stopTestBtn.addEventListener('click', () => {
                this.handleStopTest();
            });
        }
        
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
        
        // Handle beforeunload to warn about leaving during test
        window.addEventListener('beforeunload', (e) => {
            if (this.testController.isTestActive) {
                e.preventDefault();
                e.returnValue = 'Are you sure you want to leave? Your test progress will be lost.';
                return e.returnValue;
            }
        });
        
        // Global error handler
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.handleGlobalError(event.error);
        });
        
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.handleGlobalError(event.reason);
        });
    }
    
    async handleStopTest() {
        if (!this.testController.isTestActive) {
            this.showError('No active test to stop.');
            return;
        }
        
        // Confirm stop action
        const confirmed = confirm('Are you sure you want to stop the test? Your video will be downloaded automatically.');
        
        if (confirmed) {
            console.log('User requested to stop test');
            await this.testController.stopTestManually();
        }
    }
    
    initializeUI() {
        // Show start screen initially
        this.showScreen('startScreen');
        
        // Initialize any UI components that need setup
        this.setupProgressAnimations();
    }
    
    setupProgressAnimations() {
        // Set up CSS custom properties for animations
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
    
    async handleStartTest() {
        try {
            // Get candidate information
            const candidateInfo = this.getCandidateInfo();
            
            if (!this.validateCandidateInfo(candidateInfo)) {
                this.showError('Please fill in all required fields.');
                return;
            }
            
            // Update header with candidate info
            this.updateCandidateHeader(candidateInfo);
            
            // Show speaking screen
            this.showScreen('speakingScreen');
            
            // Start the test
            const testStarted = await this.testController.startTest(candidateInfo);
            
            if (!testStarted) {
                this.showError('Failed to start the test. Please check your camera and microphone permissions.');
                this.showScreen('startScreen');
                return;
            }
            
            console.log('Test started successfully');
            
        } catch (error) {
            console.error('Error starting test:', error);
            this.showError('An error occurred while starting the test. Please try again.');
            this.showScreen('startScreen');
        }
    }
    
    getCandidateInfo() {
        return {
            id: document.getElementById('candidateId')?.value?.trim() || '',
            name: document.getElementById('candidateName')?.value?.trim() || '',
            phone: document.getElementById('candidatePhone')?.value?.trim() || ''
        };
    }
    
    validateCandidateInfo(info) {
        return info.id && info.name && info.phone;
    }
    
    updateCandidateHeader(candidateInfo) {
        const headerElements = {
            id: document.getElementById('headerCandidateId'),
            name: document.getElementById('headerCandidateName'),
            phone: document.getElementById('headerCandidatePhone')
        };
        
        if (headerElements.id) headerElements.id.textContent = candidateInfo.id;
        if (headerElements.name) headerElements.name.textContent = candidateInfo.name;
        if (headerElements.phone) headerElements.phone.textContent = candidateInfo.phone;
    }
    
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
        }
        
        console.log(`Switched to screen: ${screenId}`);
    }
    
    showError(message) {
        // Create or update error display
        let errorElement = document.getElementById('errorMessage');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = 'errorMessage';
            errorElement.className = 'error-message';
            document.body.appendChild(errorElement);
        }
        
        errorElement.innerHTML = `
            <div class="error-content glass-card">
                <h3>Error</h3>
                <p>${message}</p>
                <button onclick="this.parentElement.parentElement.remove()" class="error-close-btn">
                    Close
                </button>
            </div>
        `;
        
        // Style the error message
        errorElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        `;
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorElement && errorElement.parentElement) {
                errorElement.remove();
            }
        }, 5000);
    }
    
    handleVisibilityChange() {
        if (document.hidden) {
            console.log('Page hidden - test may be paused');
            // Could implement pause functionality here if needed
        } else {
            console.log('Page visible - test resumed');
            // Could implement resume functionality here if needed
        }
    }
    
    handleGlobalError(error) {
        console.error('Handling global error:', error);
        
        // Don't show error UI if test is not active
        if (!this.testController.isTestActive) {
            return;
        }
        
        // Show user-friendly error message
        this.showError('An unexpected error occurred. The test will continue, but please report this issue.');
        
        // Log error details for debugging
        const errorInfo = {
            message: error.message || 'Unknown error',
            stack: error.stack || 'No stack trace',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.error('Error details:', errorInfo);
    }
    
    // Utility methods
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    // Emergency functions for debugging
    emergencyStop() {
        console.log('Emergency stop requested');
        this.testController.emergencyStop();
        this.showScreen('startScreen');
    }
    
    // Manual stop function (called by stop button)
    async stopTest() {
        await this.handleStopTest();
    }
    
    getTestStatus() {
        return {
            currentScreen: this.currentScreen,
            testActive: this.testController.isTestActive,
            currentPart: this.testController.currentPart,
            currentQuestion: this.testController.currentQuestionIndex + 1,
            videoStatus: this.testController.videoRecorder.getStatus(),
            timerRunning: this.testController.timerController.isTimerRunning()
        };
    }
}

// Global app instance
let app = null;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('IELTS Mock Speaking Test - Initializing...');
    
    try {
        app = new IELTSApp();
        console.log('Application initialized successfully');
        
        // Make app globally accessible for debugging
        window.ieltsApp = app;
        
        // Add some global debugging functions
        window.emergencyStop = () => app.emergencyStop();
        window.stopTest = () => app.stopTest();
        window.getTestStatus = () => app.getTestStatus();
        window.getRecordingStatus = () => app.testController.videoRecorder.getRecordingStatus();
        window.testDownload = () => app.testController.videoRecorder.testDownload();
        
    } catch (error) {
        console.error('Failed to initialize application:', error);
        
        // Show basic error message
        document.body.innerHTML = `
            <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #0d1117 100%);
                color: white;
                font-family: Arial, sans-serif;
                text-align: center;
            ">
                <div>
                    <h1>Application Error</h1>
                    <p>Failed to initialize the IELTS Speaking Test.</p>
                    <p>Please refresh the page and try again.</p>
                    <button onclick="location.reload()" style="
                        background: #4CAF50;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        margin-top: 20px;
                    ">Refresh Page</button>
                </div>
            </div>
        `;
    }
});

// Add CSS for error messages
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .error-message {
        animation: fadeIn 0.3s ease;
    }
    
    .error-content {
        max-width: 400px;
        text-align: center;
        padding: 30px;
    }
    
    .error-content h3 {
        color: #f44336;
        margin-bottom: 15px;
        font-size: 1.5em;
    }
    
    .error-content p {
        margin-bottom: 20px;
        line-height: 1.5;
    }
    
    .error-close-btn {
        background: #f44336;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 600;
    }
    
    .error-close-btn:hover {
        background: #d32f2f;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;

document.head.appendChild(errorStyles);