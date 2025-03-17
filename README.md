# AI Joke Generator

A web application that generates customized jokes using OpenAI's API. Users can tailor their joke experience by selecting various parameters such as topic, tone, joke type, and creativity level. The application also includes an AI evaluation feature that assesses generated jokes for humor, appropriateness, and other relevant criteria.

## Features

- **Joke Generation**: Create unique jokes using OpenAI's powerful language models
- **Customization Options**: Personalize jokes by selecting:
  - Topic (work, people, animals, food, television, etc.)
  - Tone (witty, sarcastic, silly, dark, goofy, etc.)
  - Type (pun, knock-knock, story, one-liner, etc.)
  - Temperature (controls randomness/creativity level)
- **Joke Evaluation**: AI-powered assessment of jokes for:
  - Humor level
  - Appropriateness
  - Originality
  - Target audience suitability

## Technology Stack

- **Frontend**: Next.js with React
- **AI Integration**: OpenAI API
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/blockwidgets/ai-joke-generator.git
cd ai-joke-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Select your desired joke parameters using the provided options
2. Click the "Generate Joke" button
3. View your generated joke along with its AI evaluation
4. Generate a new joke or adjust parameters as desired

## License

MIT

## Acknowledgments

- OpenAI for providing the API
- The open-source community for the various packages used in this project