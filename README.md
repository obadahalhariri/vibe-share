# vibe-share
is a public, anonymous social platform where users can share thoughts or feelings — called *vibes*. Each vibe includes a nickname, text, an optional image, and one or more "moods" (categories). Users can also define their own custom moods.

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Image Upload**: Multer
- **Frontend**: *(Coming Soon)*

**Installation & Setup**
1. Clone the Repository
2. Install Server Dependencies: npm install
3. Configure Environment Variables :
    Create a .env file in the server/ directory:
    Replace <username>, <password>, and <cluster-url> with your MongoDB credentials
    MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/vibeshare
4. Run the Server: npm run dev
