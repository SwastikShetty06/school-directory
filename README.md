# School Directory - Next.js & MySQL Project

This project is a simple school directory web application built with **Next.js**, **React Hook Form**, **Tailwind CSS**, and a **MySQL-compatible database** (like TiDB Cloud).

It consists of two main pages:

- **Add School**: A responsive form to input and store school data, including an image upload feature.  
- **Show Schools**: A page to fetch and display all schools in a responsive, card-based grid layout.  

---

## Final Project URLs

- **GitHub Repo**: (https://github.com/SwastikShetty06/school-directory)
- **Hosted Project**: (https://schooldirectoryswastik.netlify.app)

---

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Prerequisites

- Node.js (v18 or later)  
- npm, yarn, or pnpm  
- A MySQL-compatible database (e.g., TiDB Cloud, PlanetScale, or a local MySQL server)  

---

### 2. Clone the Repository

Clone this repository to your local machine:

```bash
git clone <your-github-repo-url>
cd <repository-name>
```

---

### 3. Install Dependencies

Install the required packages using your preferred package manager:

```bash
npm install
# or
yarn install
# or
pnpm install
```

---

### 4. Set Up the Database

Connect to your MySQL database.  

Create a table named **schools** using the following SQL schema:

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact VARCHAR(20),
    image TEXT,
    email_id VARCHAR(255)
);
```

---

### 5. Configure Environment Variables

Create a file named **.env.local** in the root of your project.  

Add your database credentials to this file:

```env
# --- MySQL Database Credentials ---
DB_HOST=YOUR_DB_HOST
DB_PORT=YOUR_DB_PORT
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_PASSWORD_HERE
DB_NAME=YOUR_DB_NAME
```

---

### 6. Create the Image Uploads Directory

Create a folder to store the uploaded school images inside the **public** directory:

```bash
mkdir -p public/schoolImages
```

This ensures the `schoolImages` folder exists before the first file upload is attempted.

---

### 7. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- Navigate to `/add-school` to add a new school.  
- Navigate to `/show-schools` to view the list of schools.  
