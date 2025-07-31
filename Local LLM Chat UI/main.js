const chatContainer = document.getElementById('chat');
    const promptInput = document.getElementById('promptInput');
    const modelInput = document.getElementById('modelInput');
    const chatForm = document.getElementById('chatForm');
    const sendBtn = document.getElementById('sendBtn');
    const clearBtn = document.getElementById('clearBtn');
    let chatHistory = [];

    // Scroll chat to bottom
    function scrollChat() {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Add a message to chat UI
    function addMessage(role, text, options = {}) {
      const msg = document.createElement('div');
      msg.className = 'chat-bubble ' + role + (options.waiting ? ' waiting' : '');
      msg.textContent = text;
      chatContainer.appendChild(msg);
      scrollChat();
      return msg;
    }

    // Main function to handle user prompt and AI response
    chatForm.onsubmit = async (e) => {
      e.preventDefault();
      const prompt = promptInput.value.trim();
      if (!prompt) return;
      const model = modelInput.value.trim() || "llama3.2:latest";
      promptInput.value = '';
      sendBtn.disabled = true;

      // Display user message
      addMessage('user', prompt);
      chatHistory.push({ role: 'user', content: prompt });

      // Add bot message bubble (for streaming response)
      const botMsg = addMessage('bot', '');
      chatHistory.push({ role: 'bot', content: '' });

      try {
        const res = await fetch('http://localhost:3000/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model,
            prompt,
            stream: true
            // Optionally: include chat history for context
            // messages: chatHistory.map(m => ({ role: m.role, content: m.content }))
          })
        });

        if (!res.ok) throw new Error("LLM error: " + res.status);

        const reader = res.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let fullReply = '';
        botMsg.classList.add('waiting');

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter(line => line.trim());
          for (const line of lines) {
            try {
              const data = JSON.parse(line);
              if (data.response) {
                fullReply += data.response;
                botMsg.textContent = fullReply;
                scrollChat();
              }
            } catch { /* ignore JSON errors */ }
          }
        }
        botMsg.classList.remove('waiting');
        chatHistory[chatHistory.length - 1].content = fullReply.trim();

      } catch (err) {
        botMsg.textContent = "⚠️ " + (err.message || 'Network error');
        botMsg.classList.remove('waiting');
      }
      sendBtn.disabled = false;
    };

    // Clear chat
    clearBtn.onclick = () => {
      chatHistory = [];
      chatContainer.innerHTML = '';
      promptInput.value = '';
    };

    // Auto expand textarea as user types
    promptInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });

    // Submit on Ctrl+Enter
    promptInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
      }
    });