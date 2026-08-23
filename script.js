// Locomotive Scroll Setup
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 0.8
});



// Selectors
const devName = document.querySelector('.dev-name');
const designerName = document.querySelector('.designer-name');
const schoolSpeakerBtn = document.getElementById('schoolSpeakerBtn');

// Audio Objects
const songAnime = new Audio('audio/anime ahh.mp3');
songAnime.loop = true;

const songMatlab = new Audio('audio/abc.mp3');
songMatlab.loop = false;

const campusSong = new Audio('audio/aa.mp3');
campusSong.loop = true;

const schoolSong = new Audio('audio/Majak nahi kijiye.mp3'); 
schoolSong.loop = false;

const songDesigner = new Audio('audio/are mc.mp3'); 
songDesigner.loop = false;

// Wanted Table Audio Collection
const wantedSongs = {
    1: new Audio('audio/ab dekh tu.mp3'),
    2: new Audio('audio/ab bol na mx.mp3'),
    3: new Audio('audio/bsdk mc.mp3'),
    4: new Audio('audio/kya re mc.mp3'),
    5: new Audio('audio/me gali nahi.mp3'),
    6: new Audio('audio/non stop gali.mp3')
};

let currentPlayingIndex = null;

// Audio Handlers
function playMySong() {
    songAnime.play().catch(err => console.log("Audio Error:", err));
}

songMatlab.onplay = () => { if (devName) devName.classList.add('playing-music'); };
songMatlab.onended = () => { if (devName) devName.classList.remove('playing-music'); };
songMatlab.onpause = () => { if (devName) devName.classList.remove('playing-music'); };

function matlab() {
    if (songMatlab.paused) songMatlab.play().catch(err => console.log("Audio Error:", err));
    else { songMatlab.pause(); songMatlab.currentTime = 0; }
}

schoolSong.onplay = () => { if (schoolSpeakerBtn) schoolSpeakerBtn.classList.add('playing-sound'); };
schoolSong.onended = () => { if (schoolSpeakerBtn) schoolSpeakerBtn.classList.remove('playing-sound'); };
schoolSong.onpause = () => { if (schoolSpeakerBtn) schoolSpeakerBtn.classList.remove('playing-sound'); };

function playSchoolSong() {
    if (schoolSong.paused) schoolSong.play().catch(err => console.log("Audio Play Error:", err));
    else { schoolSong.pause(); schoolSong.currentTime = 0; }
}

// Wanted Table Audio Handlers
Object.keys(wantedSongs).forEach(index => {
    const audio = wantedSongs[index];
    audio.loop = false;
    audio.onplay = () => {
        const row = document.getElementById(`wantedRow${index}`);
        if (row) row.classList.add('row-playing');
    };
    audio.onended = () => {
        const row = document.getElementById(`wantedRow${index}`);
        if (row) row.classList.remove('row-playing');
        currentPlayingIndex = null;
    };
    audio.onpause = () => {
        const row = document.getElementById(`wantedRow${index}`);
        if (row) row.classList.remove('row-playing');
    };
});

function playWantedSong(index) {
    const selectedAudio = wantedSongs[index];

    if (currentPlayingIndex && currentPlayingIndex !== index) {
        wantedSongs[currentPlayingIndex].pause();
        wantedSongs[currentPlayingIndex].currentTime = 0;
    }

    if (selectedAudio.paused) {
        selectedAudio.play().catch(err => console.log("Audio Error:", err));
        currentPlayingIndex = index;
    } else {
        selectedAudio.pause();
        selectedAudio.currentTime = 0;
        currentPlayingIndex = null;
    }
}

songDesigner.onplay = () => { if (designerName) designerName.classList.add('playing-music'); };
songDesigner.onended = () => { if (designerName) designerName.classList.remove('playing-music'); };
songDesigner.onpause = () => { if (designerName) designerName.classList.remove('playing-music'); };

function playDesignerSong() {
    if (songDesigner.paused) songDesigner.play().catch(err => console.log("Audio Error:", err));
    else { songDesigner.pause(); songDesigner.currentTime = 0; }
}

// Form Validation & Browser Default Alert
const inquiryForm = document.getElementById('inquiryForm');
const nameInput = document.getElementById('nameInput');
const phoneInput = document.getElementById('phoneInput');
const messageInput = document.getElementById('messageInput');
const submitBtn = document.getElementById('submitBtn');

function checkForm() {
    if (nameInput.value.trim() !== '' && phoneInput.value.trim() !== '' && messageInput.value.trim() !== '') {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

if (inquiryForm) {
    nameInput.addEventListener('input', checkForm);
    phoneInput.addEventListener('input', checkForm);
    messageInput.addEventListener('input', checkForm);

    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const isNameValid = /^[a-zA-Z\s]+$/.test(nameInput.value.trim());
        const isPhoneValid = /^[0-9]{10}$/.test(phoneInput.value.trim());

        if (isNameValid && isPhoneValid) {
            alert('ummm sahi bhare ho lagta hai sarif bache ho tab tumre layak ye school nahi hai');
            inquiryForm.reset();
            submitBtn.disabled = true;
        } else {
            alert('bakchodi karega ki sahi bharega sala!!!!!');
        }
    });
}

// ==========================================
// EXPLORE CAMPUS (GLITCH & FULLSCREEN ENGINE)
// ==========================================
let isGlitchModeActive = false;
let autoScrollInterval = null;
let currentScrollY = 0;
let scrollDirection = 1;

// Fullscreen Helper Function
function requestFullscreenMode() {
    if (!document.fullscreenElement) {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
            docEl.requestFullscreen().catch(() => {});
        } else if (docEl.webkitRequestFullscreen) {
            docEl.webkitRequestFullscreen();
        }
    }
}

// Explore Campus Click Handler
function triggerGlitchExperience(event) {
    if (event) event.preventDefault();

    isGlitchModeActive = true;

    // Trigger Fullscreen
    requestFullscreenMode();

    // Play Campus Song
    campusSong.loop = true;
    campusSong.play().catch(err => console.log("Audio Play Error:", err));

    // Add Glitch Classes
    document.body.classList.add('real-glitch-active');
    document.documentElement.classList.add('glitch-stutter-scroll');

    startRealScreenTearing();
    startAutoGlitchScroll();
}

// Glitch active hone ke baad screen par kahi bhi click karne se dobara Fullscreen ho jayega
document.addEventListener('click', () => {
    if (isGlitchModeActive) {
        requestFullscreenMode();
    }
});

// Browser ka Default Reload / Tab Close Confirmation Dialog
window.addEventListener('beforeunload', (event) => {
    if (isGlitchModeActive) {
        event.preventDefault();
        event.returnValue = ''; // Standard trigger for browser's default exit pop-up
    }
});

function startRealScreenTearing() {
    setInterval(() => {
        if (!isGlitchModeActive) return;
        if (Math.random() > 0.6) {
            document.body.classList.add('screen-tear-burst');
            setTimeout(() => {
                document.body.classList.remove('screen-tear-burst');
            }, 80);
        }
    }, 200);
}

function startAutoGlitchScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);

    autoScrollInterval = setInterval(() => {
        if (!isGlitchModeActive) return;

        currentScrollY += 1.5 * scrollDirection;

        if (currentScrollY > 300) {
            scrollDirection = -1;
        } else if (currentScrollY <= 0) {
            currentScrollY = 0;
            scrollDirection = 1;
        }

        if (scroll) {
            scroll.scrollTo(currentScrollY, {
                duration: 0,
                disableLerp: true
            });
        }
    }, 16);
}

// ==========================================
// PASSWORD PROTECTION ENGINE WITH EYE TOGGLE
// ==========================================
const CORRECT_PASSWORD = "12345"; // 👈 Yahan apna password set karein!

function leavePage() {
    // Website se auto-leave kar ke blank page par bhej dega
    window.location.href = "about:blank";
}

function checkSitePassword() {
    const passInput = document.getElementById('sitePassInput');
    if (!passInput) return;

    const userPass = passInput.value;

    if (userPass === CORRECT_PASSWORD) {
        // Sahi Password: Overlay hatao aur page unlock karo
        const overlay = document.getElementById('password-overlay');
        if (overlay) overlay.remove();
        document.body.classList.remove('locked');
    } else {
        // Galat Password: Auto leave page
        alert("⚠️ sahi password pata nahi hai to gand maro.");
        leavePage();
    }
}

// Password Hide/Show (Eye Icon Toggle) Function
function togglePasswordVisibility() {
    const passInput = document.getElementById('sitePassInput');
    const toggleBtn = document.getElementById('togglePasswordBtn');

    if (passInput && toggleBtn) {
        if (passInput.type === "password") {
            passInput.type = "text";
            toggleBtn.textContent = "🐵"; // Show hone par Emoji Change
        } else {
            passInput.type = "password";
            toggleBtn.textContent = "🙈"; // Hide hone par Normal Eye
        }
    }
}

// Page load hote hi lock apply aur Enter Key detection
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add('locked');
    
    const passInput = document.getElementById('sitePassInput');
    if (passInput) {
        passInput.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                checkSitePassword();
            }
        });
    }
});