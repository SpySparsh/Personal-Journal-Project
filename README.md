📔 Personal Journal Web App
A secure, full-stack Personal Journal application built using Node.js, Express, and MongoDB. It allows multiple users to maintain their own journals, with password-protected access and cookie-based session tracking.

Each user can create, update, and view daily notes, all neatly organized by date.

🔑 Key Features
👥 Multi-User Support: Homepage displays all registered users.

➕ User Registration: Add new users with a username and secure password.

🔐 Password Verification: Access a user's journal only after entering the correct password (encrypted with bcrypt).

📅 Date-wise Journaling: Notes are organized and listed chronologically.

📝 Add Notes: Users can add new notes by selecting a date and entering content.

✏️ Update Notes: Existing notes can be edited by clicking on them.

🍪 Session Handling: Uses cookie-parser to track authenticated users.

🗄️ MongoDB Storage: All users and journal entries are stored in a MongoDB collection.

🧱 Tech Stack
Layer	Tech
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Security	bcrypt, cookie-parser
Frontend	HTML, CSS, JavaScript (Vanilla or templating engine like EJS)

📂 Project Structure
```
journal-app/
├── models/
│   ├── User.js
│   └── Note.js
├── routes/
│   ├── auth.js
│   └── journal.js
├── views/
│   ├── index.ejs
│   ├── login.ejs
│   └── journal.ejs
├── public/
│   └── styles.css
├── app.js
├── .env
├── package.json
└── README.md
```
🚀 Getting Started
1. Clone the Repository
```
git clone https://github.com/yourusername/personal-journal.git
cd personal-journal
```
2. Install Dependencies
```
npm install
```
3. Set Up Environment Variables
Create a .env file:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/journalDB
SECRET=your_cookie_secret
```
4. Run the App
```
node app.js
Visit http://localhost:3000 in your browser.
```

📸 Screenshots 
Home with user list
![Screenshot (311)](https://github.com/user-attachments/assets/72044d57-9b0c-4c93-ad04-2a34fa084553)

Password verification page
![Screenshot (310)](https://github.com/user-attachments/assets/d4b78b00-e69f-45b9-bcec-5925e294fa0c)

Journal dashboard
![Screenshot (308)](https://github.com/user-attachments/assets/181ff584-dd37-4bf2-be4a-56e6ef9d6e20)


📄 License
This project is licensed under the MIT License.

