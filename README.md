# Local Chat with AI

A simple chat interface for interacting with local AI models through Ollama.

## Description

This project provides a lightweight web interface for chatting with local AI models using Ollama. It features a clean, responsive design and supports multiple popular language models.

## Features

- Real-time chat interface with typing indicators
- Support for multiple models (llama3.2, llama2, mistral)
- FastAPI backend with error handling
- Clean, responsive UI with vanilla JavaScript
- CORS enabled for development

## Prerequisites

- Python 3.8 or higher
- Ollama installed and running locally
- Task (optional, for using Taskfile commands)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/local-chat-ai.git
   cd local-chat-ai
   ```

2. Install dependencies:
   ```bash
   # Install Python dependencies
   task install
   # or
   pip install -r requirements.txt
   ```

## Usage

1. Start the FastAPI server:
   ```bash
   task run
   # or
   uvicorn api:app --reload
   # or 
   python api.py
   ```

2. Open your browser and navigate to `http://localhost:8002/api/chat`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Ollama](https://github.com/ollama/ollama) for providing the local AI model infrastructure
- [FastAPI](https://fastapi.tiangolo.com/) for the backend framework
