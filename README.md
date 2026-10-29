# 🛒 CodeAlpha E-Commerce Website

A basic e-commerce website developed as part of the **CodeAlpha Internship Project**. The project includes a modern frontend and a Django REST API backend.

## 🚀 Features

- **Product Listing:** Browse available products.
- **Product Details:** View individual product information.
- **Shopping Cart:** Add products and manage cart items.
- **Checkout:** Checkout interface for placing orders.
- **REST API:** Django REST Framework APIs for retrieving product data.
- **Responsive UI:** Modern interface built with React and Tailwind CSS.

## 🛠️ Technologies Used

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- HTML, CSS, JavaScript

### Backend
- Python
- Django
- Django REST Framework
- SQLite

## 📁 Project Structure

```text
CodeAlpha_Ecommerce_Submission/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── package-lock.json
├── backend/
│   ├── config/
│   ├── store/
│   ├── manage.py
│   └── requirements.txt
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/HarshDedha6415/E-commerce-.git
cd E-commerce-
```

### 2. Run the Frontend

Open a terminal in the project folder:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal.

### 3. Run the Django Backend

Open a second terminal:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Note:** On Windows, activate the environment using `venv\Scripts\activate` instead of `source venv/bin/activate`.

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products/` | Retrieve all products |
| GET | `/api/products/1/` | Retrieve product with ID 1 |

The backend runs locally at `http://127.0.0.1:8000/` by default.

## 🎯 Project Objective

The objective of this project is to develop a basic e-commerce application with product browsing, product details, cart functionality, and a checkout interface using modern frontend technologies and Django REST Framework.

## 👨‍💻 Developer

**Harsh Dedha**

GitHub: https://github.com/HarshDedha6415

## 📌 Future Improvements

- User authentication and authorization
- Database-backed order processing
- Payment gateway integration
- Product search and filtering
- Deployment to a live server

---

*Developed as part of the CodeAlpha Internship Project.*
