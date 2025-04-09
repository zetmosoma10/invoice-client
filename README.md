# Invoice App

This is the **Frontend Invoice app** built with **React.js + Vite** for creating and updating invoices. Users are able to register and login with jwt auth, and perform CRUD operation for invoices. Users also get real-time email notification when invoices are created or updated.

## FEATURES

- User registration & login (jwt auth)
- User forgot & reset password
- User profile page
- User can delete their account
- User upload profile images (cloudinary for storing images)
- CRUD operation for invoices
- Filter invoices by status
- Pagination on invoice data
- Real time email sending notification
- Loading skeleton for better user experience

## TECH STACK

- React.js
- Vite
- Tailwindcss
- Axios (API calls)
- Tanstack Query (syncing server data with client state)
- React Hook Form (handling form data)
- Zod (handling schema based form validation)
- React Context (global state management)
- Motion (for Animations)

## GETTING STARTED

### 1. clone the Repository

```bash
git clone https://github.com/zetmosoma10/invoice-client.git
cd invoice-client
```

### 2. Install Dependencies

npm install

### 3. Create .env file

At the root of the project create .env file and add:

VITE_BASE_URL=http://localhost:3000/api

(change VITE_BASE_URL to your deployed url if needed)

### 4. Start the Development Server

npm run dev

- The app will run at: http://localhost:5173 (or whichever vite has given you)

**App Integration**

- This app communicates with the **invoice api** available here: https://github.com/zetmosoma10/invoice-api
- Make sure the api is running and the .env file has correct VITE_BASE_URL .
