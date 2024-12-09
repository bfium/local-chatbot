async function sendMessage() {
    const input = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    if (!input) return;
    
    const message = input.value.trim();
    if (!message) return;

    if (sendButton) {
        sendButton.disabled = true;
    }
    input.disabled = true;

    // Display user message
    addMessage(message, 'user');
    input.value = '';

    // Show typing indicator
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.style.display = 'block';
    }

    try {
        const response = await fetch('http://localhost:8000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama3.2',  
                messages: [{
                    role: 'user',
                    content: message
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.message && data.message.message) {
            addMessage(data.message.message.content, 'bot');
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage('Sorry, there was an error connecting to the AI service. Please try again later.', 'bot');
    } finally {
        // Hide typing indicator and re-enable input
        if (typingIndicator) {
            typingIndicator.style.display = 'none';
        }
        input.disabled = false;
        if (sendButton) {
            sendButton.disabled = false;
        }
        input.focus();
    }
}

function formatMarkdownContent(content) {
    return content
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>') // Code blocks
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
        .replace(/\n/g, '<br>')
        .replace(/^# (.*$)/gm, '<br><h1>$1</h1>') // H1
        .replace(/^## (.*$)/gm, '<br><h2>$1</h2>') // H2
        .replace(/^### (.*$)/gm, '<br><h3>$1</h3>'); // H3
}

function addMessage(content, sender) {
    const container = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    // Format the content with markdown and write to user
    const formattedContent = formatMarkdownContent(content);
    messageDiv.innerHTML = formattedContent;
    
    // Add message to container and scroll to bottom
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

// Allow sending message with Enter key
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Prevent default to avoid newline
        sendMessage();
    }
});

// Add error handling for initial page load
window.addEventListener('load', function() {
    const input = document.getElementById('user-input');
    if (input) {
        input.focus();
    }
});
