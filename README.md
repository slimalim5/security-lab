# Netflix-Style Change Password Form

A clean, responsive password change form inspired by Netflix's design, built with vanilla HTML, CSS, and JavaScript. Features comprehensive password validation and verification without any toggle fields.

## Features

- **Netflix-inspired UI/UX** - Clean, modern design with Netflix's color scheme
- **Email Validation** - Real-time email format and length validation
- **Current Password Field** - Verification of existing password
- **New Password Fields** - Secure new password input with validation (entered twice)
- **Password Matching** - Ensures new password is confirmed correctly
- **Password Difference Check** - Validates new password differs from current password
- **Real-time Validation** - Instant feedback as users type
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **No Dependencies** - Pure HTML, CSS, and JavaScript
- **Deployment Ready** - Can be deployed anywhere instantly

## Project Structure

```
test-folder/
├── index.html       # Main HTML file with form structure
├── styles.css       # Netflix-inspired styling
├── script.js        # Form validation and password verification logic
└── README.md        # This file
```

## How to Use Locally

1. **Open the project:**
   - Simply double-click `index.html` to open in your browser
   - Or use a local server (recommended)

2. **Using a local server (recommended):**
   ```bash
   # Python 3
   python3 -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000

   # Node.js (with npx)
   npx http-server

   # VS Code Live Server
   # Install "Live Server" extension and right-click index.html > "Open with Live Server"
   ```

3. **Access the form:**
   - Open your browser and navigate to `http://localhost:8000`

## Deployment Options

### 1. **Netlify** (Recommended - Easiest)

**Via Drag & Drop:**
1. Go to [netlify.com](https://www.netlify.com/)
2. Sign up or log in
3. Drag and drop your entire `test-folder` into Netlify
4. Your site is live!

**Via Netlify CLI:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd test-folder
netlify deploy --prod
```

### 2. **Vercel**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd test-folder
vercel --prod
```

Or drag and drop on [vercel.com](https://vercel.com/)

### 3. **GitHub Pages**

1. Create a new GitHub repository
2. Upload all files (index.html, styles.css, script.js)
3. Go to Settings > Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repo-name`

### 4. **Firebase Hosting**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

### 5. **Surge.sh**

```bash
# Install Surge
npm install -g surge

# Deploy
cd test-folder
surge
```

### 6. **AWS S3 Static Website Hosting**

1. Create an S3 bucket
2. Enable static website hosting
3. Upload index.html, styles.css, and script.js
4. Set bucket policy for public access
5. Access via S3 website endpoint

### 7. **Any Web Hosting Provider**

Upload all three files (index.html, styles.css, script.js) to your web hosting via:
- FTP/SFTP
- cPanel File Manager
- Web hosting control panel

## Validation Rules

### Email
- Required field
- Must be valid email format (name@example.com)
- Length: 5-50 characters

### Current Password
- Required field
- Minimum length: 6 characters

### New Password
- Required field
- Minimum length: 6 characters
- Maximum length: 60 characters
- Must be different from current password

### Confirm New Password
- Required field
- Must match the new password field exactly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --netflix-red: #e50914;
    --netflix-black: #141414;
    --netflix-dark-gray: #1f1f1f;
    /* ... more colors */
}
```

### Modify Validation Rules
Edit the validation functions in `script.js`:
- `validateEmail()` - Email validation logic
- `validateCurrentPassword()` - Current password requirements
- `validateNewPassword()` - New password requirements and difference check
- `validateConfirmNewPassword()` - Password matching

### Add Backend Integration
Uncomment and modify the fetch code in `script.js` at line ~170:
```javascript
fetch('/api/change-password', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
```

## Security Notes

⚠️ **Important for Production:**
- This is a **frontend-only** implementation
- Never store passwords in localStorage (current implementation is for demo only)
- Always verify the current password on the backend
- Implement proper backend validation for password changes
- Use HTTPS in production
- Implement CSRF protection
- Add rate limiting to prevent brute force attacks
- Hash passwords on the backend (use bcrypt, argon2, etc.)
- Implement proper session management
- Send confirmation emails after password changes
- Consider implementing password strength meters
- Add two-factor authentication for enhanced security

## Optional Enhancements

The code includes a commented-out password visibility toggle feature for all three password fields. To enable it:

Uncomment this line in `script.js` (line ~235):
```javascript
addPasswordToggle();
```

## License

Free to use for personal and commercial projects.

## Credits

Design inspired by Netflix's user interface.

---

**Quick Deploy Commands:**

```bash
# Netlify
netlify deploy --prod

# Vercel
vercel --prod

# Surge
surge

# GitHub Pages
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

Enjoy your deployment! 🚀
