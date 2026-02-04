// Video Recorder Controller
// Handles camera/microphone access and video recording simulation

class VideoRecorder {
    constructor() {
        this.stream = null;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.isRecording = false;
        this.videoElement = null;
        this.hasPermission = false;
        
        this.initializeElements();
    }
    
    initializeElements() {
        this.videoElement = document.getElementById('videoPreview');
        this.recordingTypeLabel = document.getElementById('recordingTypeLabel');
    }
    
    updateRecordingTypeLabel(type) {
        if (this.recordingTypeLabel) {
            this.recordingTypeLabel.textContent = type;
        }
    }
    
    async requestPermissions() {
        try {
            console.log('Requesting screen recording permissions...');
            
            // Clear any existing streams first
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
                this.stream = null;
            }
            
            // Check if running on localhost or file protocol
            const isLocalFile = window.location.protocol === 'file:';
            const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            
            if (isLocalFile) {
                console.warn('File protocol detected - screen recording may be limited');
                this.showProtocolWarning();
            }
            
            // Enhanced display media options for better tab detection
            const displayMediaOptions = {
                video: {
                    width: { ideal: 1920, max: 1920 },
                    height: { ideal: 1080, max: 1080 },
                    frameRate: { ideal: 30, max: 30 },
                    cursor: 'always'
                },
                audio: false, // Don't request tab audio, we'll use microphone
                selfBrowserSurface: 'include',
                surfaceSwitching: 'include',
                systemAudio: 'exclude'
            };
            
            // Try to get screen recording with retry mechanism
            let attempts = 0;
            const maxAttempts = 2; // Reduce attempts
            
            while (attempts < maxAttempts) {
                try {
                    console.log(`Screen recording attempt ${attempts + 1}/${maxAttempts}`);
                    
                    // Force browser to refresh available sources
                    if (attempts > 0) {
                        // Wait and try with different options
                        await new Promise(resolve => setTimeout(resolve, 500));
                        displayMediaOptions.preferCurrentTab = true;
                    }
                    
                    this.stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
                    
                    // Check if we got a valid stream
                    if (this.stream && this.stream.getVideoTracks().length > 0) {
                        console.log('Screen recording stream obtained successfully');
                        break;
                    } else {
                        throw new Error('No video tracks in stream');
                    }
                } catch (attemptError) {
                    console.warn(`Screen recording attempt ${attempts + 1} failed:`, attemptError);
                    attempts++;
                    
                    if (attempts >= maxAttempts) {
                        throw attemptError;
                    }
                }
            }
            
            // Get microphone audio separately with retry
            let microphoneStream = null;
            try {
                console.log('Requesting microphone access...');
                microphoneStream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 44100
                    }
                });
                console.log('Microphone access granted');
            } catch (micError) {
                console.warn('Microphone access failed:', micError);
                // Continue without microphone
            }
            
            // Combine screen video with microphone audio
            if (microphoneStream) {
                const combinedStream = new MediaStream();
                
                // Add video track from screen
                this.stream.getVideoTracks().forEach(track => {
                    combinedStream.addTrack(track);
                    console.log('Added video track:', track.label);
                });
                
                // Add audio track from microphone (not screen audio)
                microphoneStream.getAudioTracks().forEach(track => {
                    combinedStream.addTrack(track);
                    console.log('Added audio track:', track.label);
                });
                
                this.stream = combinedStream;
                console.log('Combined screen video + microphone audio');
            }
            
            // Set up stream end handler
            this.stream.getVideoTracks().forEach(track => {
                track.onended = () => {
                    console.log('Screen recording track ended');
                    this.handleStreamEnded();
                };
            });
            
            this.hasPermission = true;
            console.log('Screen recording permissions granted successfully');
            
            // Update recording type indicator
            this.updateRecordingTypeLabel('Screen + Microphone');
            
            // Set up video preview (will show screen content)
            if (this.videoElement) {
                this.videoElement.srcObject = this.stream;
                console.log('Video preview set up');
            }
            
            // Initialize MediaRecorder for recording simulation
            this.initializeMediaRecorder();
            
            return true;
            
        } catch (error) {
            console.error('Error requesting screen recording permissions:', error);
            
            // Show specific error message
            this.showScreenRecordingError(error);
            
            // Fallback to camera if screen recording fails
            console.log('Falling back to camera recording...');
            return await this.requestCameraPermissions();
        }
    }
    
    handleStreamEnded() {
        console.log('Screen recording stream ended by user');
        this.hasPermission = false;
        this.updateRecordingTypeLabel('Recording Stopped');
        
        // Show message to user
        if (this.videoElement) {
            this.videoElement.srcObject = null;
        }
    }
    
    showScreenRecordingError(error) {
        let errorMessage = 'Screen recording failed: ';
        let userFriendlyMessage = '';
        
        switch (error.name) {
            case 'NotAllowedError':
                errorMessage += 'Permission denied. Please allow screen recording access.';
                userFriendlyMessage = 'Screen recording permission denied. Using camera instead.';
                break;
            case 'NotFoundError':
                errorMessage += 'No screen recording capability found.';
                userFriendlyMessage = 'Screen recording not available. Using camera instead.';
                break;
            case 'NotReadableError':
                errorMessage += 'Screen recording is being used by another application.';
                userFriendlyMessage = 'Screen recording busy. Using camera instead.';
                break;
            case 'AbortError':
                errorMessage += 'Screen recording was cancelled. Please try again.';
                userFriendlyMessage = 'Screen recording cancelled. Using camera instead.';
                break;
            case 'NotSupportedError':
                errorMessage += 'Screen recording is not supported in this browser.';
                userFriendlyMessage = 'Screen recording not supported. Using camera instead.';
                break;
            default:
                errorMessage += error.message || 'Unknown error occurred.';
                userFriendlyMessage = 'Screen recording failed. Using camera instead.';
        }
        
        console.log(errorMessage); // Use log instead of error for user-initiated denials
        
        // Show user-friendly message
        this.showUserMessage(userFriendlyMessage, 'info');
    }
    
    showUserMessage(message, type = 'info') {
        // Create a temporary message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `recording-message ${type}`;
        messageDiv.textContent = message;
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(33, 150, 243, 0.9);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 1001;
            font-weight: 600;
            animation: slideDown 0.3s ease;
        `;
        
        document.body.appendChild(messageDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (messageDiv && messageDiv.parentElement) {
                messageDiv.remove();
            }
        }, 3000);
    }
    
    showProtocolWarning() {
        const warningDiv = document.createElement('div');
        warningDiv.className = 'protocol-warning';
        warningDiv.innerHTML = `
            <div class="warning-content">
                <h3>⚠️ Local File Detected</h3>
                <p>You're running this from a local file. For best screen recording results:</p>
                <ul>
                    <li><strong>Recommended:</strong> Use a local server (python -m http.server 8000)</li>
                    <li><strong>Alternative:</strong> Select "Entire Screen" instead of "This Tab"</li>
                    <li><strong>Or:</strong> Select another browser window that shows this page</li>
                </ul>
                <button onclick="this.parentElement.parentElement.remove()" class="warning-close-btn">
                    Got it!
                </button>
            </div>
        `;
        
        // Add warning styles
        warningDiv.style.cssText = `
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
        
        document.body.appendChild(warningDiv);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (warningDiv && warningDiv.parentElement) {
                warningDiv.remove();
            }
        }, 10000);
    }
    
    async requestCameraPermissions() {
        try {
            console.log('Requesting camera and microphone permissions...');
            
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user'
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            });
            
            this.hasPermission = true;
            console.log('Camera and microphone permissions granted');
            
            // Update recording type indicator
            this.updateRecordingTypeLabel('Camera Recording');
            
            // Set up video preview
            if (this.videoElement) {
                this.videoElement.srcObject = this.stream;
            }
            
            // Initialize MediaRecorder for recording simulation
            this.initializeMediaRecorder();
            
            return true;
            
        } catch (error) {
            console.error('Error requesting camera permissions:', error);
            this.handlePermissionError(error);
            return false;
        }
    }
    
    initializeMediaRecorder() {
        try {
            // Check for MediaRecorder support
            if (!window.MediaRecorder) {
                console.warn('MediaRecorder not supported in this browser');
                return;
            }
            
            // Get supported MIME type
            const mimeType = this.getSupportedMimeType();
            
            this.mediaRecorder = new MediaRecorder(this.stream, {
                mimeType: mimeType
            });
            
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            };
            
            this.mediaRecorder.onstop = () => {
                console.log('Recording stopped');
                this.processRecording();
            };
            
            this.mediaRecorder.onerror = (event) => {
                console.error('MediaRecorder error:', event.error);
            };
            
            console.log('MediaRecorder initialized with MIME type:', mimeType);
            
        } catch (error) {
            console.error('Error initializing MediaRecorder:', error);
        }
    }
    
    getSupportedMimeType() {
        const types = [
            'video/webm;codecs=vp9,opus',
            'video/webm;codecs=vp8,opus',
            'video/webm',
            'video/mp4'
        ];
        
        for (let type of types) {
            if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(type)) {
                return type;
            }
        }
        
        return 'video/webm'; // fallback
    }
    
    startRecording() {
        if (!this.hasPermission || !this.mediaRecorder) {
            console.warn('Cannot start recording: no permissions or MediaRecorder not available');
            return false;
        }
        
        if (this.mediaRecorder.state === 'recording') {
            console.warn('Already recording');
            return false;
        }
        
        try {
            this.recordedChunks = [];
            this.mediaRecorder.start(1000); // Record in 1-second chunks
            this.isRecording = true;
            
            console.log('Recording started');
            return true;
            
        } catch (error) {
            console.error('Error starting recording:', error);
            return false;
        }
    }
    
    stopRecording() {
        if (!this.isRecording || !this.mediaRecorder) {
            console.warn('Cannot stop recording: not recording or no MediaRecorder');
            return false;
        }
        
        if (this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop();
            this.isRecording = false;
            console.log('Recording stopped successfully');
            return true;
        }
        
        return false;
    }
    
    processRecording() {
        if (this.recordedChunks.length === 0) {
            console.warn('No recorded data available');
            return null;
        }
        
        const blob = new Blob(this.recordedChunks, {
            type: this.getSupportedMimeType()
        });
        
        console.log(`Recording processed: ${Math.round(blob.size / 1024)}KB`);
        
        // Don't clear chunks here - let caller handle it
        return blob;
    }
    
    // Clear recorded chunks
    clearRecordedChunks() {
        this.recordedChunks = [];
        console.log('Recorded chunks cleared');
    }
    
    // Create download for video blob
    downloadVideo(blob, filename) {
        if (!blob) {
            console.error('No video blob to download');
            return false;
        }
        
        try {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename || `ielts-speaking-test-${Date.now()}.webm`;
            
            // Trigger download
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            // Clean up URL
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            
            console.log('Video download initiated:', a.download);
            return true;
            
        } catch (error) {
            console.error('Error downloading video:', error);
            return false;
        }
    }
    
    // Get current recording as blob (without clearing chunks)
    getCurrentRecording() {
        if (this.recordedChunks.length === 0) {
            console.warn('No recorded data available');
            return null;
        }
        
        const blob = new Blob(this.recordedChunks, {
            type: this.getSupportedMimeType()
        });
        
        console.log(`Current recording: ${Math.round(blob.size / 1024)}KB`);
        return blob;
    }
    
    // Force stop and get recording
    forceStopAndGetRecording() {
        console.log('Force stopping recording and getting video...');
        
        if (this.isRecording && this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            // Stop recording
            this.mediaRecorder.stop();
            this.isRecording = false;
            
            // Return promise that resolves when recording is processed
            return new Promise((resolve) => {
                const originalOnStop = this.mediaRecorder.onstop;
                
                this.mediaRecorder.onstop = () => {
                    // Call original handler if exists
                    if (originalOnStop) {
                        originalOnStop();
                    }
                    
                    // Get the recording blob
                    const blob = this.getCurrentRecording();
                    resolve(blob);
                };
            });
        } else {
            // Not recording, return current chunks if any
            return Promise.resolve(this.getCurrentRecording());
        }
    }
    
    handlePermissionError(error) {
        let errorMessage = 'Recording access failed. ';
        
        switch (error.name) {
            case 'NotAllowedError':
                errorMessage += 'Please allow screen recording or camera access to continue with the test.';
                break;
            case 'NotFoundError':
                errorMessage += 'No recording device found on this system.';
                break;
            case 'NotReadableError':
                errorMessage += 'Recording device is being used by another application.';
                break;
            case 'OverconstrainedError':
                errorMessage += 'Recording device constraints could not be satisfied.';
                break;
            case 'AbortError':
                errorMessage += 'Screen recording was cancelled. Please try again.';
                break;
            default:
                errorMessage += 'Please check your recording settings and try again.';
        }
        
        // Show error to user
        this.showError(errorMessage);
    }
    
    showError(message) {
        // Create error display
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <h3>Media Access Error</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="retry-btn">Try Again</button>
            </div>
        `;
        
        // Add error styles
        errorDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            color: white;
            text-align: center;
        `;
        
        document.body.appendChild(errorDiv);
    }
    
    cleanup() {
        // Stop recording if active
        if (this.isRecording) {
            this.stopRecording();
        }
        
        // Stop all media tracks
        if (this.stream) {
            this.stream.getTracks().forEach(track => {
                track.stop();
                console.log(`Stopped ${track.kind} track (${track.label})`);
            });
            this.stream = null;
        }
        
        // Clear video element
        if (this.videoElement) {
            this.videoElement.srcObject = null;
        }
        
        // Reset recording type label
        this.updateRecordingTypeLabel('No Recording');
        
        this.hasPermission = false;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        
        console.log('Video recorder cleaned up');
    }
    
    // Check if recording is currently active
    isCurrentlyRecording() {
        return this.isRecording && this.mediaRecorder && this.mediaRecorder.state === 'recording';
    }
    
    // Get recording status
    getStatus() {
        return {
            hasPermission: this.hasPermission,
            isRecording: this.isRecording,
            mediaRecorderState: this.mediaRecorder ? this.mediaRecorder.state : 'unavailable',
            streamActive: this.stream ? this.stream.active : false
        };
    }
    
    // Debug function to check recording status
    getRecordingStatus() {
        const audioTracks = this.stream ? this.stream.getAudioTracks() : [];
        const videoTracks = this.stream ? this.stream.getVideoTracks() : [];
        
        return {
            isRecording: this.isRecording,
            hasPermission: this.hasPermission,
            mediaRecorderState: this.mediaRecorder ? this.mediaRecorder.state : 'no recorder',
            recordedChunksCount: this.recordedChunks.length,
            totalRecordedSize: this.recordedChunks.reduce((total, chunk) => total + chunk.size, 0),
            streamActive: this.stream ? this.stream.active : false,
            audioTracks: audioTracks.map(track => ({
                kind: track.kind,
                label: track.label,
                enabled: track.enabled,
                muted: track.muted
            })),
            videoTracks: videoTracks.map(track => ({
                kind: track.kind,
                label: track.label,
                enabled: track.enabled,
                muted: track.muted
            }))
        };
    }
    
    // Force restart recording permissions
    async restartRecording() {
        console.log('Restarting recording permissions...');
        
        // Cleanup existing
        this.cleanup();
        
        // Wait a moment
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Request again
        return await this.requestPermissions();
    }
    
    // Test download function
    testDownload() {
        const testBlob = new Blob(['test video data'], { type: 'video/webm' });
        return this.downloadVideo(testBlob, 'test-download.webm');
    }
}