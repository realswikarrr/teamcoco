
# AusTaxAI - AI-Powered Australian Taxation Assistant for Disabled Communities

### **GovHack 2024 Submission**

**AusTaxAI** is an AI-powered voice and chat assistant built to provide disabled individuals with real-time, AI-generated information regarding Australian taxation and superannuation. This application supports multiple languages, making it accessible to a diverse population, including vulnerable communities such as migrants and the elderly.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Work Progress and Evidence](#work-progress-and-evidence)
- [Components Overview](#components-overview)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Error Handling](#error-handling)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Voice Assistant**: Supports hands-free operation through natural language understanding.
- **Chat Assistant**: Offers text-based responses in English, Hindi, and Mandarin for tax-related questions.
- **AI Integration**: Utilizes OpenAI GPT-4 for generating accurate, real-time responses.
- **Accessibility First**: Designed with accessibility in mind for vulnerable populations.
- **Secure & Private**: Ensures secure communication using encryption for sensitive information.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/aus-tax-ai.git
   cd aus-tax-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**: Add your OpenAI API key to a `.env` file:
   ```env
   NEXT_PUBLIC_API_KEY=your-openai-api-key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Tech Stack

- **Frontend**: Next.js (React framework)
- **API Integration**: OpenAI GPT-4 API
- **State Management**: React Query
- **Speech Recognition**: Web Speech API
- **Animations**: Framer Motion for smooth UI transitions
- **UI**: Tailwind CSS for styling

## Work Progress and Evidence

### Week 1: Initial Research and Idea Validation
- **Goal**: To define the core features and evaluate the feasibility of the project.
- **Progress**: Researched existing solutions for taxation information systems in Australia, particularly focusing on accessibility for disabled users. Developed a plan to integrate multilingual support and voice assistance for a wide range of users.
- **Outcome**: The decision to use OpenAI’s GPT-4 API for providing accurate, multilingual information about Australian tax and superannuation.

### Week 2: Core Development
- **Goal**: Build basic chat and voice functionality using GPT-4 API and implement the UI components for voice and chat interaction.
- **Progress**: 
  - Created a React-based app with two main components: Chat and Voice Assistant.
  - Integrated OpenAI API and successfully fetched responses in different languages.
  - Set up multilingual support for English, Hindi, and Mandarin.
  - Implemented UI designs using Tailwind CSS for accessibility and ease of navigation.
- **Evidence**:
  - Screenshot of Chat Assistant interaction:
    ![Chat Assistant Interaction](path-to-screenshot)
  - Screenshot of Voice Assistant interaction:
    ![Voice Assistant Interaction](path-to-screenshot)

### Week 3: Testing and Error Handling
- **Goal**: Ensure error handling, user input validation, and secure API interaction.
- **Progress**: 
  - Integrated validation for API failures and implemented fallback responses for better user experience.
  - Conducted testing to ensure the system recognizes voice commands and outputs results correctly.
  - Implemented automatic speech synthesis to read out the responses in the Voice Assistant.
- **Evidence**:
  - Console logs showing API errors being caught and handled effectively.
  - Video demonstration of the Voice Assistant recognizing commands and responding.

### Week 4: Final Touches and Documentation
- **Goal**: Complete project, polish UI, and finalize documentation for GovHack submission.
- **Progress**:
  - Finalized the frontend design, added animations for a better user experience.
  - Wrote comprehensive documentation for GitHub and project presentation.
  - Worked on optimizing performance for both chat and voice assistants.
- **Evidence**:
  - GitHub repository with code structure and final project:
    - [GitHub Repository](https://github.com/your-username/aus-tax-ai)

## Components Overview

### `ChatComponent.tsx`
- Handles user inputs through text and sends API requests to OpenAI for generating responses.
- Features language selection to switch between English, Hindi, and Mandarin.
- Displays conversations in a simple, accessible format.

### `VoiceAssistant.tsx`
- Utilizes Web Speech API for recognizing voice commands and sending them to the GPT-4 API.
- Includes functionality for speaking out the AI’s responses using `speechSynthesis`.

### `LandingPage.tsx`
- Home page with options to select either the voice or chat assistant.
- Includes links to other sections like features, FAQ, and contact.

## Usage

### Chat Assistant
1. Select your preferred language from the dropdown menu.
2. Type your query and click **Send**.
3. The assistant will reply with information about Australian taxes and superannuation.

### Voice Assistant
1. Click **Start Listening** and say "Hello" followed by your query.
2. The assistant will respond both verbally and in text.

## Screenshots

1. **Chat Assistant**  
   ![Chat Assistant Interface](path-to-screenshot)

2. **Voice Assistant**  
   ![Voice Assistant Interface](path-to-screenshot)

## Error Handling

- **API Failure**: Displays a user-friendly error message and logs the error for debugging.
- **Speech Recognition Error**: Notifies the user if speech recognition fails and retries automatically.

## Future Enhancements

- Extend language support for the voice assistant to include Hindi and Mandarin.
- Add personalization features based on user data.
- Implement integration with external tax filing APIs for direct filing capabilities.

## Contributing

We welcome contributions! Fork this repository, submit a pull request, and follow the contribution guidelines.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
