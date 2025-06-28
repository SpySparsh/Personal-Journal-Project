const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');
const bcrypt = require('bcrypt');
const  User =require('./models/user');
const  Note =require('./models/note');
const { render } = require('ejs');

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

// Ensure the 'files' directory exists
const filesDir = path.join(__dirname, 'files');
if (!fs.existsSync(filesDir)){
    fs.mkdirSync(filesDir);
}

app.get('/',async(req,res)=>{
    let alluser = await User.find();
    fs.readdir(filesDir, function (err, users) {
        
        if (err) {
            console.error("Error reading directory:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.render("index", { users: alluser});
    });
})

// Route: Display login form
app.get('/login/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).send('User not found.');

        // Render login page with user details
        res.render('login', { userName: user.name, userId: user._id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving user.');
    }
});
// Route: Display user's journal
app.get('/journal/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Fetch notes for the user, sorted by date (newest first)
        const notes = await Note.find({ userId: userId }).sort({ date: -1 });

        res.render('journal', { userId: userId, notes: notes });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading journal.');
    }
});


app.get('/journal/:userId/edit/:noteId', async (req, res) => {
    try {
        const { userId, noteId } = req.params;

        // Find the note by its ID
        const note = await Note.findOne({ _id: noteId, userId: userId });

        if (!note) {
            return res.status(404).send('Note not found.');
        }

        // Render the edit note page with the note's current data
        res.render('edit', { userId: userId, note: note });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading note for editing.');
    }
});

// Route: Update the note
app.post('/journal/:userId/edit/:noteId', async (req, res) => {
    try {
        const { userId, noteId } = req.params;
        const { date, content } = req.body;

        // Update the note in the database
        const updatedNote = await Note.findOneAndUpdate(
            { _id: noteId, userId: userId },
            { date: new Date(date), content: content },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).send('Note not found or failed to update.');
        }

        // Redirect back to the journal page
        res.redirect(`/journal/${userId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating note.');
    }
});
// Route: Add a new note
app.post('/journal/:userId/add', async (req, res) => {
    try {
        const { userId } = req.params;
        const { date, content } = req.body;

        // Create and save the new note
        const newNote = new Note({
            userId: userId,
            date: new Date(date),
            content: content,
        });

        await newNote.save();

        // Redirect back to the journal page
        res.redirect(`/journal/${userId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding note.');
    }
});
// Route: Handle login form submission
app.post('/login/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).send('User not found.');

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid password.');
        }

        // Redirect to the user's journal page (Page 3)
        res.redirect(`/journal/${user._id}`);
    } catch (err) {
        console.error(err);noden
        res.status(500).send('Error during authentication.');
    }
});

// Route: Add a new user
app.post('/create', async (req, res) => {
    const newName = req.body.name;
    const password = req.body.password;

    // Validate inputs
    if (!newName || !password) {
        return res.status(400).send('User name and password are required.');
    }
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({ name: newName, password: hashedPassword });
        const savedUser = await newUser.save(); // Save and get the saved user

        // Redirect to the journal page with the user's ID
        res.redirect(`/journal/${savedUser._id}`);
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            res.status(400).send('User already exists.');
        } else {
            res.status(500).send('Error saving user.');
        }
    }
});


app.listen(4000,()=>{
    console.log("Server is running on http://localhost:4000");
});