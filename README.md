# Pneuma-Web

This website is a simple admin dashboard for managing credit cards.

## Project Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/BalajiDyavanpalli7030/pneuma-web.git
2. **Backend Setup:**

   ```bash
   cd backend
   npm install

3. **MySQL Setup:**
   Create the pneuma database:
   ```sql
   CREATE DATABASE pneuma;
   USE pneuma;
   ```
   Create the CreditCards table:
   ```sql
      CREATE TABLE CreditCards (
     id INT AUTO_INCREMENT PRIMARY KEY,
     bank_name VARCHAR(255) NOT NULL,
     credit_card_name VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     enabled BOOLEAN DEFAULT TRUE
   );
4. **Run the Backend:**
   ```bash
   npm run dev
   
5. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm start



