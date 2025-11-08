# Placement Portal 
This is a web application designed to scrape jobs from various job portals and display them in a user-friendly interface. The application also includes verified authentication features for users to sign up and log in.


## Tech Stack
- Frontend: React.js
- Backend: Node.js with Express.js
- Database: MongoDB
- Web Scraping: Puppeteer
- Authentication: JWT (JSON Web Tokens), Google OAuth client using Passport.js


## Setup Instructions
1. Clone the repository:
    ```bash
    git clone https://github.com/Abhik-Mudi/Placement-Portal.git
    cd Placement-Portal
    ```
2. Install dependencies for both frontend and backend:

    For backend:
    ```bash
    npm install
    ```
    For frontend:
    ```bash
    cd frontend
    npm install
    ```
3. Create a `.env` file in the root directory and add the following environment variables:

    PORT=your_backend_port

    MONGODB_URI=your_mongodb_connection_string

    JWT_SECRET=your_jwt_secret_key

    CLIENT_ID=your_google_oauth_client_id

    CLIENT_SECRET=your_google_oauth_client_secret

4. Start the backend server:
    ```bash
    npm start
    ```
5. Start the frontend development server:
    ```bash
    cd frontend
    npm run dev
    ```
6. Open your browser and navigate to `http://localhost:3000` to access the application.
