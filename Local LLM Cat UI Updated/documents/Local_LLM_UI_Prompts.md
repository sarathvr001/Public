
# Prompt for Creating Local LLM Chat UI

## ✅ Summary Prompt:
Create a **responsive web chat interface** for interacting with Local LLM models using **HTML5, CSS3, Bootstrap 5, Font Awesome, and JavaScript**. The UI should have:
- Left panel for **chat session history** with collapsible functionality.
- Right panel for **chat area** with:
  - Header (title + model selector + menu toggle).
  - Chat message section (user and bot bubbles with gradients and icons).
  - Footer with a curved input bar (mic icon, textarea, send button) and an action icon row.
- Use **linear gradient backgrounds**, **hover effects**, **shadows**, and ensure **mobile responsiveness**.

---

## ✅ Detailed Prompt:
Create a fully responsive, modern web-based chat interface for interacting with Local LLM models. Use **Bootstrap 5** and **Font Awesome icons**. Follow these specifications:

### **Layout Structure**
- **Left Panel (Chat Session History)**:
  - Fixed width (280px), collapsible on mobile.
  - Gradient background: `#ffc0cb` → `#800080`.
  - Displays a list of sessions with:
    - Chat icon on the left.
    - Title (bold) in the first row.
    - Date/time and action icons (Edit, Download, Delete) in the second row.
  - First card: “Create New” with **dotted border** and a **plus (+) icon**.
  - Hover effect for cards (lift with shadow).

- **Right Panel (Chat Window)**:
  - Flexible width.
  - Gradient background: `#caf0fa` → `#ffb8b8` → `#ed5353`.
  - Sections:
    - **Header**:
      - Left: Hamburger menu (toggle sessions) + title.
      - Right: Dropdown for GPT models (GPT-3.5, GPT-4, Local LLM).
    - **Message Section**:
      - Scrollable with user and bot message bubbles.
      - **User Messages**:
        - Right-aligned, gradient `#667db6 → #0082c8`.
        - Icons: Copy, Edit.
      - **Bot Messages**:
        - Left-aligned, gradient pink-red tones.
        - Icons: Copy, Like, Dislike, Speaker, Refresh.
    - **Footer**:
      - Rounded input container:
        - Left: Mic icon.
        - Center: Multiline textarea.
        - Right: Send button.
      - Below input: Action icons (Upload, Tools).

### **Visual Design**
- Apply **linear gradients**, **box-shadows**, **hover transitions**.
- Smooth animations for panel toggle.
- Responsive design using **flexbox** and media queries.

### **Interactivity**
- Toggle session panel via menu icon.
- Press **Enter** to send a message.
- Append messages dynamically.
- Render dummy sessions and responses for UI demonstration.

### **Tech Stack**
- HTML5, CSS3
- Bootstrap 5
- Font Awesome
- Vanilla JavaScript

---

### Deliverable:
- Single HTML file with embedded CSS & JS.
- Fully responsive and functional demo layout.
