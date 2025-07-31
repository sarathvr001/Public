const micBtn = document.getElementById('micBtn');
const micIcon = document.getElementById('micIcon');
let recognizing = false;
let recognition;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    recognizing = true;
    micBtn.classList.add('active');
    micIcon.textContent = '🔴'; // Indicate listening
  };
  recognition.onend = () => {
    recognizing = false;
    micBtn.classList.remove('active');
    micIcon.textContent = '🎤';
  };
  recognition.onerror = (event) => {
    recognizing = false;
    micBtn.classList.remove('active');
    micIcon.textContent = '🎤';
    alert('Speech recognition error: ' + event.error);
  };
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    promptInput.value += (promptInput.value ? ' ' : '') + transcript;
    promptInput.focus();
  };

  micBtn.onclick = () => {
    if (recognizing) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };
} else {
  micBtn.disabled = true;
  micIcon.textContent = '❌';
  micBtn.title = "Speech Recognition not supported in this browser";
}
