# Mind2Design

Mind2Design is a specialized web application built to democratize high-quality, culturally authentic graphic design for the South Indian market. It leverages a local "Expert System" to synthesize deep cultural context (Tamil festivals, rituals, business aesthetics) into precise prompt engineering for DALL-E 3, enabling users to create professional-grade designs without design expertise.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Key Components](#key-components)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Culturally Aware Design Generation**: Specialized knowledge base for South Indian aesthetics, including Festivals (Pongal, Diwali), Business (Shops, Hotels), Crackers (fireworks packaging), and Solemn occasions.
- **Bilingual Interface**: Full support for **English** and **Tamil** (தமிழ்) languages.
- **Expert Prompt Synthesis**: intelligently constructs complex DALL-E 3 prompts by combining user intent with hard-coded design rules (layouts, motifs, colors, lighting).
- **Interactive Step-by-Step Builder**: A user-friendly, wizard-style interface to guide users through the design process.
- **Deep Linking**: Shareable URLs for specific steps in the design process (e.g., `/builder?step=3`).
- **Responsive & Modern UI**: Built with Tailwind CSS, featuring glassmorphism, smooth transitions, and a premium dark/light mode experience.

## Technology Stack

- **Frontend Framework**: [React](https://react.dev/) (v19)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Icons**: [Material Symbols](https://fonts.google.com/icons) & [Lucide React](https://lucide.dev/)
- **AI Integration**: OpenAI DALL-E 3 API (via custom `openaiService.js`)

## Installation

Follow these steps to set up the project locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Swathi-88/Mind2Design.git
    cd Mind2Design
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` to view the application.

## Usage

1.  **Select a Category**: Choose from Festivals, Crackers, Business, Funerals, or Events to start your design.
2.  **Build Your Intent**:
    *   **Step 1**: Select specific occasion (e.g., Diwali, Pongal).
    *   **Step 2**: Choose a visual style (Traditional, Modern, Luxury).
    *   **Step 3**: Select cultural/religious context (Hindu, Muslim, Christian, Secular).
    *   **Step 4**: Pick an aspect ratio (Square, Portrait, Landscape, etc.).
    *   **Step 5**: Fine-tune with specific text, themes, color palettes, and optional reference logic.
3.  **Generate**: The system synthesizes a highly detailed prompt and (if API key is configured) generates the image using DALL-E 3.

## Key Components

### `IntentBuilder.jsx`
The core logic of the application. It manages the multi-step form state, handles user inputs for design parameters, and synchronizes the current step with the URL for better navigation.

### `promptSynthesizer.js`
The "brain" of the application. It contains the `CATEGORY_KNOWLEDGE` object—a database of South Indian design aesthetics, motifs, and layouts. It takes raw user input and expands it into a professional-grade art direction prompt.

### `App.jsx`
The main application shell. It handles routing (using `react-router-dom`) between the Landing Page, Job Selector, Builder, and Results views.

## Project Structure

```
Mind2Design/
├── public/              # Static assets
├── src/
│   ├── components/      # React components (Header, LandingPage, etc.)
│   ├── services/        # Logic for prompt synthesis and API calls
│   ├── utils/           # Helper functions and translations
│   ├── App.jsx          # Main App component with Routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles and Tailwind imports
├── vercel.json          # Deployment configuration for Vercel
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies
```

## Deployment

This project is configured for easy deployment on **Vercel**.

1.  Push your code to a GitHub repository.
2.  Import the repository into Vercel.
3.  Vercel will detect Vite and deploy automatically.
4.  The included `vercel.json` ensures that client-side routing works correctly on page refresh.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the project.
2.  Create a feature branch (`git checkout -b feature/NewFeature`).
3.  Commit your changes (`git commit -m 'Add NewFeature'`).
4.  Push to the branch (`git push origin feature/NewFeature`).
5.  Open a Pull Request.

## License

This project is licensed under the ISC License.
