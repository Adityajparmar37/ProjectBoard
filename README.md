## ProjectBoard : *Streamline Projects, Tasks, Files, and Teams.*


## 📑 Synopsis 

- A platform for seamless project management and team collaboration, enabling task assignment, file sharing, and real-time chat with project teammate.
- The application is optimized with code-splitting techniques using React's `react-lazy` and `Suspense` for lazy loading, along with an `error boundary` fallback UI.
- Integrate `AWS s3` bucket for storing files.
- Eanched frontend performance by implementing `debouncing` and `throttling` by `70%` .


## 📜 Features

1. **Authentication and Authorization:**
    - Secure user authentication using JWT tokens and Bcrypt.js for password hashing.
    - Can signup or login even by Google account through googleAuth 
    - Forgot Password functionality to reset passwords via email token.
    - Update Profile 

3. **Project Module:**
    - Create new projects with detailed information.
    - Connect with teammates and invite them to projects.
    - Update project details and status (Pending, Completed, or On Hold).
    - Filter projects by keyword, project name, or status.
    - Debounce applied to search to low down api calls of searching.
    - Sort projects from new to old and use pagination for easy navigation.
 

5. **Task Module:**
    - Create tasks for specific projects and assign them to teammates.
    - View tasks on a calendar with deadlines.
    - Update tasks, including task priority, and allow teammates to make changes.
    - Filter tasks by task name, project name, or priority, and sort them.
    - Mark tasks as done or undo them
  

7. **File Module:**
    - Upload files to specific projects.
    - Allow project teammates to download and upload files.
    - Manage files by deleting and uploading new ones.
    - Integrate with AWS S3 for fast and secure file access.
  
9. **Chat Module:**
    - Communicate with teammates within specific projects.
    - Store chat history securely by encrypting it before storing it to database and decrypted it while retrieving past conversations.
    - Throttling the send button in a chat app prevents spam, reduces server load and ensures consistent performance
     

## 🛠️Tech Stack

**Client:** 
* React
* Context API
* CSS
* Socket.io

**Server:** 
* NodeJs
* Express
* AWS S3
* PassportJs
* Crypto-JS
* Socket
* Nodemailer


**Database:**
* MongoDB 


## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Adityajparmar37/ProjectBoard.git
   ```

2. Go to backend and run 
    ```bash
    cd backend
    npm install
    ```

3. Go to frontend and run
    ```bash
    cd frontend
    npm install
    ```

4. Setup .env file 

    ```bash
    MONGO_URI = "Your Mongodb URI"
    PORT = "SERVER PORT NUMBER"
    JWT_SECRET = "Secret key"
    
    # AWS SERVICES ACCESS 
    ACCESS_KEY_ID = "AWS access key"
    SECRET_ACCESS_KEY = "AWS secret access key for accesing"
    BUCKET_NAME = "S3 bucket name"
    REGION = "Region/country of your AWS account"
    
    # KEY FOR ENCRYPTION AND DESCRYPTION
    KeyCrypt = "Private key for encrypt and decryt"
    
    
    # MAILING
    EMAIL = "Email address to send mail"
    MAILPASS = "app-password for access to gmail services"

    # GOOGLE-AUTH
    SESSION_SECRET = "secret key for session"
    GOOGLE_CLIENT_ID = "Client ID of Project create in Google console of your account"
    GOOGLE_CLIENT_SECRET = "Secret key for accessing and verification"
    
    # FRONTEND
    CLIENT_URL ="Frontend Url"
    ```


5. To Run Project
    ```bash

    cd frontend
    npm start run 

    cd backend
    npm run dev
    ```

 🤞🏻 *Hope you find project useful*
