# COMPASS

### Live Link

```
https://compass-55799.web.app
```

## Introduction

Compass is a dynamic tourism website empowering explorers to craft their dream vacations. Browse curated travel packages, wishlist must-see destinations, and connect with experienced guides - all in one place.  This README provides setup instructions and details key functionalities.

## Top Features

#### For users

- Browse & Book: Explore curated travel packages, book with your preferred guide and manage cancellations.
- Payment: Complete payments and confirm bookings.
- Wishlist Management: Add dream destinations and packages to your wishlist for future planning.
- Interactive Storytelling: Read and share travel stories to inspire your adventures.
- Feedback and communication: Give rating to guides, message authorities with questions or feedbacks.

#### For admins

- Package Management: Effortlessly add and manage tourism packages.
- User Management: View, manage, and elevate user permissions.
- Guide Management: Approve or reject guide applications.
- Advanced Search & Filters: Quickly find users by name, email, or role (admin, user, guide).

#### For guides

- Tour Management: View assigned tours and easily accept or decline participation.

## Used packages

- React Hook Form to handle forms with ease.
- Tanstack query to manage fetched data states.
- Axios to handle API requests.
- React-share to handle story sharing on social media.
- Framer-motion to show beautiful transition in home page.

## Running Locally

### Prerequisites:

This project uses Vite for development and build processes. To clone and run the Compass project locally, follow these steps:

- Node.js (version 18 or above) installed on your system. You can check your version by running `node -v` in your terminal.
- Git version control installed.

### Steps:

1. Clone the Repository: Open your terminal and navigate to your desired directory. Then, clone the Compass repository using the following command.
    ```
    git clone https://github.com/ShawonECE/compass-client.git
    ```
2. Install Dependencies: Navigate to the cloned project directory.
    ```
    cd compass-client
    ```
    Install all project dependencies using npm or yarn:
    ```
    npm install  # or yarn install
    ```
3. Set Up Firebase Configuration (Important): This project relies on Firebase for authentication features. To use Firebase functionalities, you'll need to configure it with your own project's credentials. Here's how: 
    - Create `.env.local`: In your project directory (where you cloned the repository), create a new file named `.env.local`.
    -  Define Firebase Configurations: Inside the `.env.local` file, define each Firebase configuration property with its corresponding value. Here's an example:
        ```
        VITE_API_KEY=your_api_key
        VITE_AUTH_DOMAIN=your_auth_domain
        VITE_PROJECT_ID=your_project_id
        VITE_STORAGE_BUCKET=your_storage_bucket
        VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
        VITE_APP_ID=your_app_id
        ```
    #### Important Note
    - Replace `your_api_key`, `your_auth_domain`, etc. with your actual Firebase project configuration values.
    - Never commit the `.env.local` file to your version control system (e.g., Git) as it contains sensitive information.

5. Development Server: With the `.env.local` file in place, you can start the development server as usual:
    ```
    npm run dev  # or yarn dev
    ```
