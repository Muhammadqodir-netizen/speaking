// Test Controller
// Main controller that manages the entire IELTS speaking test flow

class TestController {
    constructor() {
        this.currentPart = null;
        this.currentQuestionIndex = 0;
        this.currentPhase = 'reading'; // reading, answer, preparation
        this.testQuestions = {};
        this.candidateInfo = {};
        
        // Controllers
        this.speechController = new SpeechController();
        this.timerController = new TimerController();
        this.videoRecorder = new VideoRecorder();
        
        // Test state
        this.isTestActive = false;
        this.testStartTime = null;
        
        // DOM elements
        this.initializeElements();
        
        // Test structure
        this.testStructure = [
            { part: '1.1', name: 'Introduction and Interview' },
            { part: '1.2', name: 'Picture Description' },
            { part: '2', name: 'Long Turn' },
            { part: '3', name: 'Discussion' }
        ];
        
        this.currentPartIndex = 0;
    }
    
    initializeElements() {
        // Get DOM elements
        this.elements = {
            partTitle: document.getElementById('partTitle'),
            questionText: document.getElementById('questionText'),
            phaseLabel: document.getElementById('phaseLabel'),
            currentQuestion: document.getElementById('currentQuestion'),
            totalQuestions: document.getElementById('totalQuestions'),
            imageContainer: document.getElementById('imageContainer'),
            questionImage: document.getElementById('questionImage'),
            transitionModal: document.getElementById('transitionModal'),
            modalTitle: document.getElementById('modalTitle'),
            modalMessage: document.getElementById('modalMessage')
        };
    }
    
    async startTest(candidateInfo) {
        console.log('Starting IELTS Speaking Test...');
        
        this.candidateInfo = candidateInfo;
        this.testStartTime = new Date();
        this.isTestActive = true;
        
        // Request video permissions
        const permissionGranted = await this.videoRecorder.requestPermissions();
        if (!permissionGranted) {
            console.error('Cannot start test without camera/microphone permissions');
            return false;
        }
        
        // Start recording IMMEDIATELY when test starts
        console.log('Starting video recording...');
        const recordingStarted = this.videoRecorder.startRecording();
        if (!recordingStarted) {
            console.error('Failed to start video recording');
            return false;
        }
        
        // Load questions for all parts
        this.loadTestQuestions();
        
        // Start with Part 1.1
        this.currentPartIndex = 0;
        this.currentPart = this.testStructure[0].part;
        this.currentQuestionIndex = 0;
        
        // Begin first part
        await this.startPart(this.currentPart);
        
        return true;
    }
    
    loadTestQuestions() {
        // Load questions for each part
        this.testQuestions = {
            '1.1': getRandomQuestions('part1_1', 3),
            '1.2': getRandomQuestions('part1_2', 3),
            '2': getRandomQuestions('part2', 1),
            '3': getRandomQuestions('part3', 1)
        };
        
        console.log('Test questions loaded:', this.testQuestions);
    }
    
    async startPart(part) {
        console.log(`Starting Part ${part}`);
        
        this.currentPart = part;
        this.currentQuestionIndex = 0;
        
        // Update UI
        this.updatePartDisplay();
        
        // Start first question
        await this.startQuestion();
    }
    
    async startQuestion() {
        const currentQuestion = this.getCurrentQuestion();
        if (!currentQuestion) {
            console.error('No current question available');
            return;
        }
        
        console.log(`Starting question ${this.currentQuestionIndex + 1} of part ${this.currentPart}`);
        
        // Update question display
        this.updateQuestionDisplay(currentQuestion);
        
        // Handle different parts differently
        switch (this.currentPart) {
            case '1.1':
                await this.handlePart1_1Question(currentQuestion);
                break;
            case '1.2':
                await this.handlePart1_2Question(currentQuestion);
                break;
            case '2':
                await this.handlePart2Question(currentQuestion);
                break;
            case '3':
                await this.handlePart3Question(currentQuestion);
                break;
        }
    }
    
    async handlePart1_1Question(question) {
        // Reading phase
        this.currentPhase = 'reading';
        this.updatePhaseDisplay('Reading');
        
        // Speak the question
        await this.speechController.speakQuestion(question.text, '1.1');
        
        // Start reading timer
        this.timerController.startReadingTimer('1.1', null, async () => {
            // Answer phase
            this.currentPhase = 'answer';
            this.updatePhaseDisplay('Answer');
            
            // Start answer timer
            this.timerController.startAnswerTimer('1.1', null, () => {
                this.completeQuestion();
            });
        });
    }
    
    async handlePart1_2Question(question) {
        // Show image if available
        if (question.image) {
            this.showQuestionImage(question.image);
        }
        
        // Reading phase
        this.currentPhase = 'reading';
        this.updatePhaseDisplay('Reading');
        
        // Speak the question
        await this.speechController.speakQuestion(question.text, '1.2');
        
        // Start reading timer
        this.timerController.startReadingTimer('1.2', null, async () => {
            // Answer phase
            this.currentPhase = 'answer';
            this.updatePhaseDisplay('Answer');
            
            // Start answer timer with appropriate duration based on question type
            const questionType = question.type || 'describe';
            this.timerController.startAnswerTimer('1.2', questionType, () => {
                this.completeQuestion();
            });
        });
    }
    
    async handlePart2Question(question) {
        // Speak the question first
        await this.speechController.speakQuestion(question.text, '2');
        
        // Preparation phase
        this.currentPhase = 'preparation';
        this.updatePhaseDisplay('Preparation');
        
        // Start preparation timer
        this.timerController.startPreparationTimer('2', async () => {
            // Answer phase
            this.currentPhase = 'answer';
            this.updatePhaseDisplay('Answer');
            
            // Start answer timer
            this.timerController.startAnswerTimer('2', null, () => {
                this.completeQuestion();
            });
        });
    }
    
    async handlePart3Question(question) {
        // Speak the question first
        await this.speechController.speakQuestion(question.text, '3');
        
        // Preparation phase
        this.currentPhase = 'preparation';
        this.updatePhaseDisplay('Preparation');
        
        // Start preparation timer
        this.timerController.startPreparationTimer('3', async () => {
            // Answer phase
            this.currentPhase = 'answer';
            this.updatePhaseDisplay('Answer');
            
            // Start answer timer
            this.timerController.startAnswerTimer('3', null, () => {
                this.completeQuestion();
            });
        });
    }
    
    completeQuestion() {
        console.log(`Question ${this.currentQuestionIndex + 1} completed`);
        
        this.currentQuestionIndex++;
        
        // Check if part is complete
        const totalQuestions = this.testQuestions[this.currentPart].length;
        if (this.currentQuestionIndex >= totalQuestions) {
            this.completePart();
        } else {
            // Continue with next question
            setTimeout(() => {
                this.startQuestion();
            }, 1000);
        }
    }
    
    async completePart() {
        console.log(`Part ${this.currentPart} completed`);
        
        const currentPartNum = this.currentPart;
        const nextPartIndex = this.currentPartIndex + 1;
        
        // Show transition modal
        if (nextPartIndex < this.testStructure.length) {
            const nextPart = this.testStructure[nextPartIndex];
            await this.showTransition(currentPartNum, nextPart.part);
            
            // Move to next part
            this.currentPartIndex = nextPartIndex;
            await this.startPart(nextPart.part);
        } else {
            // Test complete
            await this.completeTest();
        }
    }
    
    async showTransition(completedPart, nextPart) {
        // Speak completion announcement
        await this.speechController.speakPartCompletion(completedPart, nextPart);
        
        // Show modal
        this.elements.modalTitle.textContent = `Part ${completedPart} Finished`;
        this.elements.modalMessage.textContent = `Preparing for Part ${nextPart}...`;
        this.elements.transitionModal.classList.add('active');
        
        // Animate progress circle
        const progressCircle = document.getElementById('progressCircle');
        if (progressCircle) {
            const circumference = 2 * Math.PI * 50;
            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = circumference;
            
            // Animate to full circle over 3 seconds
            setTimeout(() => {
                progressCircle.style.transition = 'stroke-dashoffset 3s linear';
                progressCircle.style.strokeDashoffset = 0;
            }, 100);
        }
        
        // Wait for transition
        return new Promise(resolve => {
            setTimeout(() => {
                this.elements.transitionModal.classList.remove('active');
                resolve();
            }, 3500);
        });
    }
    
    async completeTest() {
        console.log('IELTS Speaking Test completed');
        
        try {
            // Force stop recording and get video
            console.log('Getting final video recording...');
            const videoBlob = await this.videoRecorder.forceStopAndGetRecording();
            
            if (videoBlob && videoBlob.size > 0) {
                // Generate filename with candidate info
                const candidateId = this.candidateInfo.id || 'unknown';
                const candidateName = this.candidateInfo.name?.replace(/[^a-zA-Z0-9]/g, '') || 'candidate';
                const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
                const filename = `IELTS-Speaking-COMPLETE-${candidateId}-${candidateName}-${timestamp}.webm`;
                
                // Download video
                this.videoRecorder.downloadVideo(videoBlob, filename);
                console.log('Final video downloaded:', filename);
                
                // Clear chunks
                this.videoRecorder.clearRecordedChunks();
            }
            
            // Speak completion
            await this.speechController.speakPartCompletion('3');
            
        } catch (error) {
            console.error('Error during test completion:', error);
        }
        
        // Show completion screen
        this.showScreen('completionScreen');
        
        this.isTestActive = false;
        
        // Cleanup
        setTimeout(() => {
            this.cleanup();
        }, 5000);
    }
    
    // Manual stop test function
    async stopTestManually() {
        console.log('Test stopped manually by user');
        
        // Stop current timers
        this.timerController.stop();
        
        // Stop speech
        this.speechController.stop();
        
        // Show download progress immediately
        this.showDownloadProgress();
        
        try {
            // Force stop recording and get video blob
            console.log('Getting video recording...');
            const videoBlob = await this.videoRecorder.forceStopAndGetRecording();
            
            if (videoBlob && videoBlob.size > 0) {
                console.log(`Video blob ready: ${Math.round(videoBlob.size / 1024)}KB`);
                
                // Generate filename
                const candidateId = this.candidateInfo.id || 'unknown';
                const candidateName = this.candidateInfo.name?.replace(/[^a-zA-Z0-9]/g, '') || 'candidate';
                const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
                const filename = `IELTS-Speaking-${candidateId}-${candidateName}-${timestamp}.webm`;
                
                // Update progress
                this.updateDownloadProgress(90, 'Preparing download...');
                
                // Download video
                const downloaded = this.videoRecorder.downloadVideo(videoBlob, filename);
                
                if (downloaded) {
                    this.updateDownloadProgress(100, 'Video downloaded successfully!');
                    console.log('Video download completed:', filename);
                } else {
                    this.updateDownloadProgress(0, 'Download failed. Please try again.');
                }
                
                // Clear the recorded chunks
                this.videoRecorder.clearRecordedChunks();
                
            } else {
                console.warn('No video data available or empty recording');
                this.updateDownloadProgress(0, 'No video recording available to download.');
            }
            
        } catch (error) {
            console.error('Error during manual stop:', error);
            this.updateDownloadProgress(0, 'Error occurred during download.');
        }
        
        // Show completion screen after download
        setTimeout(() => {
            this.showScreen('completionScreen');
            this.isTestActive = false;
            this.cleanup();
        }, 3000);
    }
    
    showDownloadProgress() {
        // Create download progress UI
        const stopContainer = document.querySelector('.stop-test-container');
        if (stopContainer) {
            stopContainer.innerHTML = `
                <div class="download-progress">
                    <div class="download-status">Preparing video download...</div>
                    <div class="download-progress-bar">
                        <div id="downloadProgressFill" class="download-progress-fill"></div>
                    </div>
                </div>
            `;
        }
        
        // Simulate progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            this.updateDownloadProgress(progress, 'Processing video...');
            
            if (progress >= 90) {
                clearInterval(progressInterval);
            }
        }, 100);
    }
    
    updateDownloadProgress(percentage, message) {
        const progressFill = document.getElementById('downloadProgressFill');
        const statusElement = document.querySelector('.download-status');
        
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        
        if (statusElement) {
            statusElement.textContent = message;
        }
    }
    
    getCurrentQuestion() {
        const partQuestions = this.testQuestions[this.currentPart];
        if (!partQuestions || this.currentQuestionIndex >= partQuestions.length) {
            return null;
        }
        return partQuestions[this.currentQuestionIndex];
    }
    
    updatePartDisplay() {
        if (this.elements.partTitle) {
            this.elements.partTitle.textContent = `Part ${this.currentPart}`;
        }
        
        const totalQuestions = this.testQuestions[this.currentPart]?.length || 0;
        if (this.elements.totalQuestions) {
            this.elements.totalQuestions.textContent = totalQuestions;
        }
    }
    
    updateQuestionDisplay(question) {
        if (this.elements.questionText) {
            this.elements.questionText.textContent = question.text;
        }
        
        if (this.elements.currentQuestion) {
            this.elements.currentQuestion.textContent = this.currentQuestionIndex + 1;
        }
        
        // Hide image by default
        if (this.elements.imageContainer) {
            this.elements.imageContainer.style.display = 'none';
        }
    }
    
    updatePhaseDisplay(phase) {
        if (this.elements.phaseLabel) {
            this.elements.phaseLabel.textContent = phase;
        }
    }
    
    showQuestionImage(imageSrc) {
        if (this.elements.imageContainer && this.elements.questionImage) {
            this.elements.questionImage.src = imageSrc;
            this.elements.imageContainer.style.display = 'block';
        }
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
        }
    }
    
    cleanup() {
        console.log('Cleaning up test controller...');
        
        // Stop all timers
        this.timerController.stop();
        
        // Stop speech
        this.speechController.stop();
        
        // Cleanup video recorder
        this.videoRecorder.cleanup();
        
        // Reset state
        this.isTestActive = false;
        this.currentPart = null;
        this.currentQuestionIndex = 0;
        this.testQuestions = {};
    }
    
    // Emergency stop function
    emergencyStop() {
        console.log('Emergency stop activated');
        this.cleanup();
        this.showScreen('startScreen');
    }
}