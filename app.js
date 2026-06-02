/* ==========================================================================
   LAMAKA Dynamic Logic, WebRTC Simulator, & Full-Screen Immersive Chat
   ========================================================================== */

// --- Global UI State ---
let isSearching = false;
let isConnected = false;
let currentPartner = null;
let localStream = null;
let isChatViewActive = false;

// Animations and Timers
let particleAnimationId = null;
let sonarInterval = null;
let localStaticCancel = null;
let remoteStaticCancel = null;

const HF_BASE = 'https://huggingface.co/datasets/Antrikshhsjidv/mira-mi-vidoes/resolve/main/';

const HF_VIDEOS = [
  'YTDown.com_YouTube_Beautiful-girl-doing-web-cam-chat_Media_G-agKtCRHYY_001_480p.mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Bea_Media_a1-PV0yloqU_002_720p.mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Chr_Media_aTN1AEws590_002_720p (1).mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Chr_Media_aTN1AEws590_002_720p.mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Cut_Media_2Pbh9uX_iD8_002_720p.mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Cut_Media_GdhCadsv3og_002_720p.mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Cut_Media_IBh00ESuGHo_002_720p.mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Cut_Media_LchAQMK-GqE_002_720p.mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Cut_Media_R0c89lMugsA_002_720p.mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Cut_Media_R0v9tWtt7UY_002_720p.mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Cut_Media_Y88wGtEMmLM_002_720p.mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Cut_Media_drUC90ibMuE_002_720p.mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Cut_Media_eLis5PC2ogg_002_720p.mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Cut_Media_eZN8qz8jSjI_002_720p.mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Han_Media_D0snwVA8Y-s_002_720p.mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Han_Media_ln2uu7HkZtk_002_720p.mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Han_Media_opeP4KUEzSY_002_720p.mp4',
  'YTDown.com_YouTube_Fake-WebCam-HD-For-Video-Omegle-Face-Old_Media_nr4EG7iucNY_002_720p.mp4',
  'YTDown.com_YouTube_Filipino-Beauty_Media_P1naAoPKSRw_001_480p.mp4',
  'YTDown.com_YouTube_beautiful-girl-in-front-of-webcam_Media_BMELOi28Lic_001_480p.mp4',
  'YTDown.com_YouTube_hit-me-in-my-nostalgia_Media_r95xlWYdtJc_002_480p (2).mp4',
  'YTDown.com_YouTube_sabrinacarpenter-Please-Please-Please-C_Media_eaBll4XO5VA_001_720p.mp4',
  'YTDown.com_YouTube_school-makeup-no-talking_Media_VzKKPnac6FI_002_720p.mp4',
  'YTDown.com_YouTube_video-para-Many-cam_Media_EiS0zkPmHck_001_240p.mp4',
  'videoplayback (1).mp4',
  'videoplayback (2).mp4',
  'videoplayback (3).mp4',
  'videoplayback (4).mp4',
  'videoplayback (5).mp4',
  'videoplayback (6).mp4',
  'videoplayback (7).mp4',
  'videoplayback (8).mp4',
  'videoplayback (9).mp4',
  'videoplayback (10).mp4',
  'videoplayback (11).mp4',
  'videoplayback (12).mp4',
  'videoplayback (13).mp4',
  'videoplayback (14).mp4',
  'videoplayback (15).mp4',
  'videoplayback (16).mp4',
  'videoplayback (17).mp4',
  'videoplayback (18).mp4',
  'videoplayback (19).mp4',
  'videoplayback (20).mp4',
  'videoplayback.mp4'
];

function friendlyName(path) {
  const names = {
    'Beautiful-girl-doing-web-cam-chat': 'Alex',
    'Fake-WebCam-HD-For-Video-Omegle-Face-Bea': 'Bea',
    'Fake-WebCam-HD-For-Video-Omegle-Face-Chr': 'Christine',
    'Fake-WebCam-HD-For-Video-Omegle-Face-Cut': 'Cutie',
    'Fake-WebCam-HD-For-Video-Omegle-Face-Han': 'Hannah',
    'Fake-WebCam-HD-For-Video-Omegle-Face-Old': 'Oldie',
    'Filipino-Beauty': 'Mia',
    'beautiful-girl-in-front-of-webcam': 'Sophia',
    'hit-me-in-my-nostalgia': 'Nova',
    'sabrinacarpenter': 'Sabrina',
    'school-makeup-no-talking': 'Emma',
    'video-para-Many-cam': 'Camila',
    'videoplayback': 'Stranger'
  };
  for (const [key, val] of Object.entries(names)) {
    if (path.includes(key)) return val;
  }
  return 'Stranger';
}

const RESPONSES = [
  "omg hiii!! 😊 what's good?",
  "lol no way, that's so funny 😂",
  "wait really?? tell me more!!",
  "haha you're so random 🦙",
  "yessss I totally agree with that",
  "ok but that's actually kinda cool ngl",
  "brb getting snacks real quick 🍿",
  "I've been on here all day lmaooo",
  "wait where are you from??",
  "omg same!! that's wild 😲",
  "haha ok you're actually funny",
  "I literally just woke up tbh 😴",
  "ok next question - fav movie?",
  "noooo way that's my fav too!!",
  "lol okay I fw that 💯"
];

// --- Audio Synthesizer (Web Audio API) ---
class SoundEffects {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playMatchChime() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(261.63, now); // C4
    osc1.frequency.exponentialRampToValueAtTime(523.25, now + 0.3); // C5
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(329.63, now); // E4
    osc2.frequency.exponentialRampToValueAtTime(659.25, now + 0.3); // E5
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.65);
    osc2.stop(now + 0.65);
  }

  playSonarPing() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now); // High A5
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.4); // Down to A4
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.65);
  }

  playMessageSent() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.12);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.16);
  }

  playMessageReceived() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.setValueAtTime(580, now + 0.06);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.22);
  }
  
  playClick() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }
}

const SFX = new SoundEffects();

// --- Floating Particle Field ---
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = Math.min(60, Math.floor(width / 20));
  
  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
    }
    
    reset() {
      this.x = Math.random() * width;
      this.y = height + 10;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.speedX = Math.random() * 0.4 - 0.2;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y < 0) {
        this.reset();
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(229, 207, 179, ${this.alpha})`;
      ctx.fill();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    let grad = ctx.createRadialGradient(width/2, height*0.2, 0, width/2, height*0.2, width);
    grad.addColorStop(0, '#131824');
    grad.addColorStop(1, '#08090d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    particleAnimationId = requestAnimationFrame(animate);
  }
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  animate();
}

// --- Canvas TV Static Noise Simulation ---
function startTVStatic(canvasEl) {
  if (!canvasEl) return null;
  const ctx = canvasEl.getContext('2d');
  canvasEl.width = 320;
  canvasEl.height = 240;
  canvasEl.style.display = 'block';
  let staticAnimId;
  
  function renderStatic() {
    const imgData = ctx.createImageData(canvasEl.width, canvasEl.height);
    const data = imgData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const val = Math.floor(Math.random() * 255);
      data[i] = val;     // R
      data[i+1] = val;   // G
      data[i+2] = val;   // B
      data[i+3] = 255;   // A (Alpha)
    }
    
    ctx.putImageData(imgData, 0, 0);
    staticAnimId = requestAnimationFrame(renderStatic);
  }
  
  renderStatic();
  return () => {
    cancelAnimationFrame(staticAnimId);
    canvasEl.style.display = 'none';
  };
}

// --- Webcam Support ---
async function startWebcam(isFullScreen = false) {
  const localVideoId = isFullScreen ? 'fs-local-video' : 'local-video';
  const localPlaceholderId = isFullScreen ? null : 'local-placeholder';
  const localStaticId = isFullScreen ? 'fs-local-static' : null;
  
  const localVideo = document.getElementById(localVideoId);
  const localPlaceholder = localPlaceholderId ? document.getElementById(localPlaceholderId) : null;
  const localStatic = localStaticId ? document.getElementById(localStaticId) : null;
  
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 320, height: 240 },
      audio: true
    });
    
    localStream = stream;
    localVideo.srcObject = stream;
    localVideo.classList.remove('hidden');
    
    if (localPlaceholder) localPlaceholder.classList.remove('active');
    
    // Stop local static noise if active
    if (localStaticCancel) {
      localStaticCancel();
      localStaticCancel = null;
    }
  } catch (err) {
    console.warn("Webcam access denied or unavailable: ", err);
    if (localPlaceholder) {
      const statusText = localPlaceholder.querySelector('.video-status-text');
      if (statusText) statusText.innerText = "CAMERA OFF (SIMULATOR)";
    }
    // If full screen, spin static noise to indicate fallback offline signal
    if (isFullScreen && localStatic && !localStaticCancel) {
      localStaticCancel = startTVStatic(localStatic);
    }
  }
}

function stopWebcam() {
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
  }
  
  const localVideo = document.getElementById('local-video');
  const fsLocalVideo = document.getElementById('fs-local-video');
  const localPlaceholder = document.getElementById('local-placeholder');
  
  if (localVideo) {
    localVideo.srcObject = null;
    localVideo.classList.add('hidden');
  }
  if (fsLocalVideo) {
    fsLocalVideo.srcObject = null;
    fsLocalVideo.classList.add('hidden');
  }
  if (localPlaceholder) {
    localPlaceholder.classList.add('active');
    const statusText = localPlaceholder.querySelector('.video-status-text');
    if (statusText) statusText.innerText = "WAITING FOR CAMERA...";
  }
  
  if (localStaticCancel) {
    localStaticCancel();
    localStaticCancel = null;
  }
}

// --- View Transition Logic ---
function switchToChatView() {
  SFX.playClick();
  isChatViewActive = true;
  
  document.getElementById('landing-view').classList.add('hidden');
  document.getElementById('chat-view').classList.remove('hidden');
  
  // Start TV Static on feeds
  const fsLocalStatic = document.getElementById('fs-local-static');
  const fsRemoteStatic = document.getElementById('fs-remote-static');
  
  if (!localStream) {
    localStaticCancel = startTVStatic(fsLocalStatic);
  }
  
  // Trigger camera capture in Full Screen
  startWebcam(true).then(() => {
    startMatching();
  });
}

function switchToLandingView() {
  SFX.playClick();
  isChatViewActive = false;
  
  // Stop webcam
  stopWebcam();
  
  // Clear any active chat search/timers
  if (sonarInterval) clearInterval(sonarInterval);
  if (remoteStaticCancel) {
    remoteStaticCancel();
    remoteStaticCancel = null;
  }
  if (localStaticCancel) {
    localStaticCancel();
    localStaticCancel = null;
  }
  
  document.getElementById('chat-view').classList.add('hidden');
  document.getElementById('landing-view').classList.remove('hidden');
  
  // Reset states
  isSearching = false;
  isConnected = false;
  currentPartner = null;
}

// --- Integrated Match Engine ---

// Message Log Renderer
function appendMessage(sender, text, type = 'partner') {
  const logId = isChatViewActive ? 'fsChatLog' : 'chatLog';
  const chatLog = document.getElementById(logId);
  if (!chatLog) return;
  
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const bubble = document.createElement('div');
  
  if (type === 'system') {
    bubble.className = 'chat-bubble system';
    bubble.textContent = text;
  } else {
    bubble.className = `chat-bubble ${type}`;
    bubble.innerHTML = `
      <strong>${sender}</strong><br>${text}
      <span class="msg-meta">${timestamp}</span>
    `;
  }
  
  const infoMsg = chatLog.querySelector('.chat-info-msg') || chatLog.querySelector('.chat-view-info-msg');
  if (infoMsg) infoMsg.remove();
  
  chatLog.appendChild(bubble);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Typing Indicators
function showTypingIndicator() {
  const logId = isChatViewActive ? 'fsChatLog' : 'chatLog';
  const chatLog = document.getElementById(logId);
  if (!chatLog) return;
  
  const typingBubble = document.createElement('div');
  typingBubble.id = 'typingIndicator';
  typingBubble.className = 'typing-bubble';
  typingBubble.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;
  chatLog.appendChild(typingBubble);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typingIndicator');
  if (indicator) indicator.remove();
}

// Matching Process
function startMatching() {
  if (isSearching) return;
  
  isSearching = true;
  isConnected = false;
  currentPartner = null;
  
  SFX.playClick();
  
  // Clear any existing partner video stream
  const videoId = isChatViewActive ? 'fs-remote-video' : 'remote-video-avatar';
  const remoteVideo = document.getElementById(videoId);
  if (remoteVideo) remoteVideo.classList.add('hidden');
  
  // 1. Inputs Disable
  const inputId = isChatViewActive ? 'fsChatInput' : 'chatInput';
  const sendBtnId = isChatViewActive ? 'fsSendMsgBtn' : 'sendMsgBtn';
  const nextBtnId = isChatViewActive ? 'fsNextMatchBtn' : 'nextMatchBtn';
  const emojiBtnId = isChatViewActive ? 'fsEmojiBtn' : 'emojiBtn';
  
  const inputEl = document.getElementById(inputId);
  const sendBtn = document.getElementById(sendBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  const emojiBtn = document.getElementById(emojiBtnId);
  
  if (inputEl) inputEl.disabled = true;
  if (sendBtn) sendBtn.classList.add('disabled');
  if (nextBtn) nextBtn.classList.add('disabled');
  if (emojiBtn) emojiBtn.disabled = true;
  
  // 2. Clear chat log and push System Notice
  const logId = isChatViewActive ? 'fsChatLog' : 'chatLog';
  const chatLog = document.getElementById(logId);
  if (chatLog) chatLog.innerHTML = '';
  appendMessage('System', 'Searching for a connection...', 'system');
  
  // 3. Set Searching Status Indicators
  const statusId = isChatViewActive ? 'fs-match-status' : 'match-status';
  const matchStatus = document.getElementById(statusId);
  if (matchStatus) {
    matchStatus.innerText = "Searching for a LAMA";
    matchStatus.className = isChatViewActive ? "chat-view-status searching" : "match-status-text searching";
  }
  
  const labelId = isChatViewActive ? 'fs-remote-label-name' : 'remote-label-name';
  const labelName = document.getElementById(labelId);
  if (labelName) labelName.innerText = "System";
  
  // 4. Start Video static noise or placeholder
  const placeholderId = isChatViewActive ? null : 'remote-placeholder';
  const remotePlaceholder = placeholderId ? document.getElementById(placeholderId) : null;
  
  if (remotePlaceholder) {
    remotePlaceholder.classList.add('active');
    remotePlaceholder.querySelector('.video-status-text').innerText = "CONNECTING...";
  }
  
  if (isChatViewActive) {
    const fsRemoteStatic = document.getElementById('fs-remote-static');
    if (remoteStaticCancel) remoteStaticCancel();
    remoteStaticCancel = startTVStatic(fsRemoteStatic);
  }
  
  // 5. Play Sonar loop
  SFX.playSonarPing();
  if (sonarInterval) clearInterval(sonarInterval);
  sonarInterval = setInterval(() => {
    SFX.playSonarPing();
  }, 1200);
  
  // 6. Connect after delay
  setTimeout(() => {
    clearInterval(sonarInterval);
    
    // Choose partner
    const randomVideo = HF_VIDEOS[Math.floor(Math.random() * HF_VIDEOS.length)];
    const pName = friendlyName(randomVideo);
    const videoUrl = HF_BASE + encodeURIComponent(randomVideo);

    currentPartner = {
      name: pName,
      intro: `hey! 👋 I'm ${pName}, what's up?`,
      responses: RESPONSES,
      responseIndex: 0
    };
    
    SFX.playMatchChime();
    
    isSearching = false;
    isConnected = true;
    
    // Update Status
    if (matchStatus) {
      matchStatus.innerText = isChatViewActive ? `Connected with ${currentPartner.name}` : `Connected with ${currentPartner.name}`;
      matchStatus.className = isChatViewActive ? "chat-view-status" : "match-status-text";
    }
    
    if (labelName) labelName.innerText = currentPartner.name;
    
    // Swap Static Noise or placeholder for partner avatar
    if (remotePlaceholder) {
      remotePlaceholder.classList.remove('active');
    }
    
    if (isChatViewActive && remoteStaticCancel) {
      remoteStaticCancel();
      remoteStaticCancel = null;
    }
    
    if (remoteVideo) {
      remoteVideo.src = videoUrl;
      remoteVideo.load();
      remoteVideo.play().catch(() => {});
      remoteVideo.classList.remove('hidden');
    }
    
    // Enable Controls
    if (inputEl) {
      inputEl.disabled = false;
      inputEl.focus();
    }
    if (sendBtn) sendBtn.classList.remove('disabled');
    if (nextBtn) nextBtn.classList.remove('disabled');
    if (emojiBtn) emojiBtn.disabled = false;
    
    appendMessage('System', `Connected with ${currentPartner.name}!`, 'system');
    
    // Partner starts typing
    setTimeout(() => {
      showTypingIndicator();
      
      setTimeout(() => {
        removeTypingIndicator();
        appendMessage(currentPartner.name, currentPartner.intro, 'partner');
        SFX.playMessageReceived();
      }, 1500);
      
    }, 1000);
    
  }, 2600);
}

// Send Message Handler
function handleUserSendMessage() {
  if (!isConnected || !currentPartner) return;
  
  const inputId = isChatViewActive ? 'fsChatInput' : 'chatInput';
  const inputEl = document.getElementById(inputId);
  if (!inputEl) return;
  
  const text = inputEl.value.trim();
  if (text === '') return;
  
  inputEl.value = '';
  appendMessage('You', text, 'user');
  SFX.playMessageSent();
  
  // Partner response
  setTimeout(() => {
    showTypingIndicator();
    
    setTimeout(() => {
      removeTypingIndicator();
      
      let reply = "";
      if (currentPartner.responseIndex < currentPartner.responses.length) {
        reply = currentPartner.responses[currentPartner.responseIndex];
        currentPartner.responseIndex++;
      } else {
        reply = "Munch munch... 🌿 Sorry, I got distracted by this delicious meadow. What were we saying?";
      }
      
      appendMessage(currentPartner.name, reply, 'partner');
      SFX.playMessageReceived();
    }, 1800);
    
  }, 1000);
}

// --- DOM Event Listeners & Setups ---
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Landing Canvas Particles
  initParticles();

  // Elements mapping
  const allowCameraBtn = document.getElementById('allowCameraBtn');
  const skipCameraBtn = document.getElementById('skipCameraBtn');
  const cameraOverlay = document.getElementById('cameraOverlay');
  const toggleCameraBtn = document.getElementById('toggle-camera-btn');
  const fsToggleCameraBtn = document.getElementById('fs-toggle-camera-btn');
  
  const mainStartChatBtn = document.getElementById('mainStartChatBtn');
  const nextMatchBtn = document.getElementById('nextMatchBtn');
  const fsNextMatchBtn = document.getElementById('fsNextMatchBtn');
  
  const chatInput = document.getElementById('chatInput');
  const fsChatInput = document.getElementById('fsChatInput');
  
  const sendMsgBtn = document.getElementById('sendMsgBtn');
  const fsSendMsgBtn = document.getElementById('fsSendMsgBtn');
  
  const emojiBtn = document.getElementById('emojiBtn');
  const fsEmojiBtn = document.getElementById('fsEmojiBtn');
  
  const genderSelector = document.getElementById('genderSelector');
  const genderOptions = document.getElementById('genderOptions');
  const fsGenderSelector = document.getElementById('fsGenderSelector');
  const fsGenderOptions = document.getElementById('fsGenderOptions');

  const onboardingForm = document.getElementById('onboardingForm');
  const obSpinner = document.getElementById('obSpinner');
  const obSubmitBtn = document.getElementById('obSubmitBtn');

  // Google Apps Script URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzA7Qh3uKJhNvb-dz-IialeMdlb0uHPF-cTlYbR-SDb8K0I-ryv4niS8_vSHaC3dBhu/exec';

  // ── LOGIN FORM ────────────────────────────────────────────
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  const loginSpinner = document.getElementById('loginSpinner');
  const loginSubmitBtn = document.getElementById('loginSubmitBtn');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      SFX.playClick();
      const name = document.getElementById('loginName').value.trim();
      const age = document.getElementById('loginAge').value.trim();

      loginSpinner.classList.remove('hidden');
      loginSubmitBtn.disabled = true;
      loginError.classList.add('hidden');

      // 1. Check local storage first (fast path)
      const savedProfile = localStorage.getItem('lamakaProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.name.toLowerCase() === name.toLowerCase() && String(profile.age) === age) {
          window.location.href = 'chat.html';
          return; // Success
        }
      }

      // 2. Fallback: Check backend
      try {
        const url = `${GOOGLE_SCRIPT_URL}?name=${encodeURIComponent(name)}&age=${encodeURIComponent(age)}`;
        const response = await fetch(url, { method: 'GET' });
        const result = await response.json();
        
        if (result.status === 'found') {
          // Update local storage and proceed
          localStorage.setItem('lamakaProfile', JSON.stringify(result.profile));
          window.location.href = 'chat.html';
        } else {
          // Not found
          loginError.textContent = "Name & age not found. Please Sign Up first.";
          loginError.classList.remove('hidden');
          loginSpinner.classList.add('hidden');
          loginSubmitBtn.disabled = false;
        }
      } catch (err) {
        console.error("Login fetch error:", err);
        loginError.textContent = "Error connecting to server. Please try again.";
        loginError.classList.remove('hidden');
        loginSpinner.classList.add('hidden');
        loginSubmitBtn.disabled = false;
      }
    });
  }

  // ── SIGN UP FORM ──────────────────────────────────────────
  if (onboardingForm) {
    onboardingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      SFX.playClick();

      const name = document.getElementById('obName').value;
      const age = document.getElementById('obAge').value;
      const gender = document.getElementById('obGender').value;
      const country = document.getElementById('obCountry').value;

      obSpinner.classList.remove('hidden');
      obSubmitBtn.disabled = true;

      // Save profile to localStorage for future logins
      localStorage.setItem('lamakaProfile', JSON.stringify({ name, age, gender, country }));

      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: JSON.stringify({ name, age, gender, country }),
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });
        const result = await response.json();
        console.log('Save result:', result);
      } catch (err) {
        console.error('Error saving data:', err);
      } finally {
        obSpinner.classList.add('hidden');
        obSubmitBtn.disabled = false;
        window.location.href = 'chat.html';
      }
    });
  }

  // Navigation Links: Exit chat and return home
  document.getElementById('chat-logo-home').addEventListener('click', switchToLandingView);
  document.getElementById('chat-nav-home').addEventListener('click', switchToLandingView);
  document.getElementById('chat-nav-lama').addEventListener('click', switchToLandingView);
  document.getElementById('chat-nav-faq').addEventListener('click', switchToLandingView);

  // Monitor Simulator camera actions
  if (allowCameraBtn) {
    allowCameraBtn.addEventListener('click', async () => {
      SFX.playClick();
      if(cameraOverlay) cameraOverlay.classList.add('hidden');
      await startWebcam(false);
      startMatching();
    });
  }

  if (skipCameraBtn) {
    skipCameraBtn.addEventListener('click', () => {
      SFX.playClick();
      if(cameraOverlay) cameraOverlay.classList.add('hidden');
      startMatching();
    });
  }

  // Camera Toggle Buttons
  if (toggleCameraBtn) {
    toggleCameraBtn.addEventListener('click', () => {
      SFX.playClick();
      if (localStream) stopWebcam();
      else startWebcam(false);
    });
  }

  fsToggleCameraBtn.addEventListener('click', () => {
    SFX.playClick();
    const fsLocalVideo = document.getElementById('fs-local-video');
    const fsLocalStatic = document.getElementById('fs-local-static');
    
    if (localStream) {
      stopWebcam();
      // Spin static noise
      if (!localStaticCancel) localStaticCancel = startTVStatic(fsLocalStatic);
    } else {
      startWebcam(true);
    }
  });

  let isMicMuted = false;
  const toggleMicBtn = document.getElementById('toggle-mic-btn');
  const fsToggleMicBtn = document.getElementById('fs-toggle-mic-btn');

  function updateMicState() {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !isMicMuted;
      });
    }
    const color = isMicMuted ? '#e63946' : 'currentColor';
    const icon = isMicMuted 
      ? `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02 3.28l-2.98-2.98v-6.3c0-1.66-1.34-3-3-3-.83 0-1.58.34-2.12.88l-1.88-1.88-1.41 1.41 14.59 14.59 1.41-1.41-4.61-4.61zm-2.98 1.41l-1.33-1.33c-.22.04-.44.06-.67.06-1.66 0-3-1.34-3-3v-.67l-1.33-1.33c-.04.22-.06.44-.06.67 0 3.53 2.61 6.43 6 6.92v3.08h2v-3.08c.5-.07 1-.19 1.48-.37l-1.09-1.09z"/></svg>`
      : `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 14c1.66 0 2.99-1.34 2.99-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>`;
    
    if (toggleMicBtn) { toggleMicBtn.style.color = color; toggleMicBtn.innerHTML = icon; }
    if (fsToggleMicBtn) { fsToggleMicBtn.style.color = color; fsToggleMicBtn.innerHTML = icon; }
  }

  if (toggleMicBtn) toggleMicBtn.addEventListener('click', () => { SFX.playClick(); isMicMuted = !isMicMuted; updateMicState(); });
  if (fsToggleMicBtn) fsToggleMicBtn.addEventListener('click', () => { SFX.playClick(); isMicMuted = !isMicMuted; updateMicState(); });

  // Main chat start button inside mockup monitor
  // (now replaced with the landing image CTA which opens the modal)

  // Match skips (Next Buttons)
  if (nextMatchBtn) {
    nextMatchBtn.addEventListener('click', () => {
      if (!nextMatchBtn.classList.contains('disabled')) {
        if (sonarInterval) clearInterval(sonarInterval);
        startMatching();
      }
    });
  }

  if (fsNextMatchBtn) {
    fsNextMatchBtn.addEventListener('click', () => {
      if (!fsNextMatchBtn.classList.contains('disabled')) {
        if (sonarInterval) clearInterval(sonarInterval);
        startMatching();
      }
    });
  }

  // Chat message send buttons
  if (sendMsgBtn) sendMsgBtn.addEventListener('click', handleUserSendMessage);
  if (fsSendMsgBtn) fsSendMsgBtn.addEventListener('click', handleUserSendMessage);

  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleUserSendMessage();
    });
  }
  
  if (fsChatInput) {
    fsChatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleUserSendMessage();
    });
  }

  // Emojis click helpers
  const appendEmoji = (input) => {
    SFX.playClick();
    const emojis = ["🦙", "✨", "🔥", "😂", "👑", "🌿", "😎", "🍿"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    input.value += randomEmoji;
    input.focus();
  };

  emojiBtn.addEventListener('click', () => appendEmoji(chatInput));
  fsEmojiBtn.addEventListener('click', () => appendEmoji(fsChatInput));

  // Dropdown logic for Landing Mockup monitor
  genderSelector.addEventListener('click', (e) => {
    e.stopPropagation();
    genderOptions.classList.toggle('show');
  });

  // Dropdown logic for Full Screen Chat Panel
  fsGenderSelector.addEventListener('click', (e) => {
    e.stopPropagation();
    fsGenderOptions.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    genderOptions.classList.remove('show');
    fsGenderOptions.classList.remove('show');
  });

  // Select Gender option click handler: Landing
  document.querySelectorAll('.gender-option').forEach(option => {
    option.addEventListener('click', function(e) {
      e.stopPropagation();
      SFX.playClick();
      
      document.querySelectorAll('.gender-option').forEach(el => el.classList.remove('active'));
      this.classList.add('active');
      
      const text = this.innerText;
      document.getElementById('selected-gender-text').innerText = `[${text}]`;
      genderOptions.classList.remove('show');
      
      appendMessage('System', `Search filter updated to: ${text}`, 'system');
      if (isConnected) startMatching();
    });
  });

  // Select Gender option click handler: Full Screen
  document.querySelectorAll('.fs-gender-option').forEach(option => {
    option.addEventListener('click', function(e) {
      e.stopPropagation();
      SFX.playClick();
      
      document.querySelectorAll('.fs-gender-option').forEach(el => el.classList.remove('active'));
      this.classList.add('active');
      
      const text = this.innerText;
      document.getElementById('fs-selected-gender-text').innerText = text;
      fsGenderOptions.classList.remove('show');
      
      appendMessage('System', `Search filter updated to: ${text}`, 'system');
      if (isConnected) startMatching();
    });
  });

  // Header tracking scroll effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.app-header');
    if (window.scrollY > 50) {
      header.style.height = '65px';
      header.style.backgroundColor = 'rgba(8, 9, 13, 0.95)';
    } else {
      header.style.height = '80px';
      header.style.backgroundColor = 'rgba(8, 9, 13, 0.8)';
    }
  });
});


// ============================================================
// Cookie Consent Banner
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('lamakaCookieConsent')) {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <p class="cookie-text">We use cookies to enhance your experience, save your preferences, and keep the herd safe. By continuing to use LAMAKA, you agree to our <a href="privacy.html">Privacy Policy</a> and <a href="terms.html">Terms of Service</a>.</p>
      <div class="cookie-actions">
        <button class="btn-cookie-outline" id="cookieDeclineBtn">Decline</button>
        <button class="btn-cookie-accept" id="cookieAcceptBtn">Accept</button>
      </div>
    `;
    document.body.appendChild(banner);
    
    // Slight delay to allow CSS transition to play out
    setTimeout(() => { banner.classList.add('show'); }, 500);
    
    document.getElementById('cookieAcceptBtn').addEventListener('click', () => {
      localStorage.setItem('lamakaCookieConsent', 'accepted');
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 500);
    });
    
    document.getElementById('cookieDeclineBtn').addEventListener('click', () => {
      localStorage.setItem('lamakaCookieConsent', 'declined');
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 500);
    });
  }
});

