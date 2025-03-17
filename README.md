# 🏦 Mutual Fund Explorer

A web application that allows users to search for mutual funds using GIN-indexing, fetch mutual fund datasets from a RAPID API, and interact with mutual fund details via an intuitive UI.

---

## ✨ Features

- **🔍 Search API** – Enables keyword-based mutual fund search using GIN indexing for optimized performance.
- **📊 Dataset Ingestion** – Fetches mutual fund data from RAPID API and writes it to a PostgreSQL database.
- **🖥️ User Interface** – Built with React.js to browse mutual funds by fund families, view details, and purchase dummy units.

---

## 🚀 Getting Started

Follow these steps to set up and run the application.

### 🛠 Prerequisites

Ensure you have the following installed:

- **Node.js** (for frontend & backend development)  
  - Download: [Node.js Official Site](https://nodejs.org/)  
  - Verify installation:
    ```sh
    node -v
    npm -v
    ```

- **Python** (for backend API)  
  - Download: [Python Official Site](https://www.python.org/)  
  - Verify installation:
    ```sh
    python --version
    pip --version
    ```

---

## 🏗 Installation

### 1️⃣ Backend (FastAPI Server)

```sh
cd server
python -m venv venv      # Create virtual environment
source venv/bin/activate  # Activate (Linux/Mac)
venv\Scripts\activate     # Activate (Windows)
pip install -r requirements.txt  # Install dependencies

