
MUTUAL FUND EXPLORER
-Fetch mutual fund dataset from an available RAPID API to write on a Postgres DB.
-Created APIs and UI dashboard to fetch Mutual funds through fund families, get info, purchase dummy units


To run the server and client applications, please follow these instructions:

1. Node.js Setup:
    - Install Node.js on your machine. You can download it from the official Node.js website.
    - Verify the installation by running `node -v` and `npm -v` in your terminal. You should see the installed versions.

2. Python Setup:
    - Install Python on your machine. You can download it from the official Python website.
    - Verify the installation by running `python --version` and `pip --version` in your terminal. You should see the installed versions.

3. React Setup:
    - Change to the client directory using `cd client`.
    - Run `npm install` to install the required dependencies.
    - Once the installation is complete, you can start the React development server using `npm start`.

4. Python Virtual Environment Setup:
    - Change to the server directory using `cd server`.
    - Create a virtual environment by running `python -m venv venv`.
    - Activate the virtual environment:
      - On Windows: `venv\Scripts\activate`
      - On macOS/Linux: `source venv/bin/activate`
    - Install the required Python packages by running `pip install -r requirements.txt`.

5. Running the Applications:
    - Start the server by running `uvicorn app.main:app --reload` in the server directory.
    - Open a new terminal window and change to the client directory using `cd client`.
    - Start the client application by running `npm start`.


for testing:
username: testuser
password: pwd