# Weather App Setup Instructions

## Backend Server Setup

This project now uses a Node.js backend server to handle AccuWeather API calls, eliminating CORS issues.

### Prerequisites
- Node.js and npm installed on your system
- The app folder with `server.js`, `package.json`, `index.html`, `script.js`, and `style.css`

### Installation & Running

1. **Open Terminal/Command Prompt** in the project folder
   ```
   cd c:\Users\Sahil\Desktop\sem4 lab exps\MDM\exp5
   ```

2. **Install Dependencies**
   ```
   npm install
   ```

3. **Start the Server**
   ```
   npm start
   ```
   
   You should see:
   ```
   Server running at http://localhost:3000
   Open http://localhost:3000 in your browser
   ```

4. **Open in Browser**
   - Do NOT use Live Server anymore
   - Instead, open `http://localhost:3000` in your browser

5. **Search for a city** and the weather should now load!

### How It Works
- Frontend (HTML/CSS/JS) calls the local backend endpoints: `/api/search` and `/api/weather/:locationKey`
- Backend makes secure requests to AccuWeather API (no CORS issues)
- Data flows: Browser → Local Server → AccuWeather → Local Server → Browser

### Stopping the Server
- Press `Ctrl+C` in the terminal to stop the server

### Notes
- The API key is already configured in `server.js`
- Make sure port 3000 is not in use by another application
