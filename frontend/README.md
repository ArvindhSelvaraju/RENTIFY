# Rentify

Project Title : Rentify

Frameworks used :
    => Client : React JS
    => Server : Node JS (Express JS)
    => Database : MongoDb Atlas

Deployed Link: https://rentify-frontend-otfe.onrender.com



Instructions to run the project on local machine :
    -> Open terminal
    -> Run the command "npm install" to download node_modules


    -> Open a new terminal
    -> Go to the backend folder by running "cd backend"
    -> Run the command "npm install" to download node_modules
    -> Create a dotenv file in the backend folder, to initialize environment variables
            * NODE_ENV=development
            * PORT=4000
            * MONGO_URI=mongodb+srv://arvindh:Password@rentify.5yzhvsr.mongodb.net/?retryWrites=true&w=majority&appName=RENTIFY
    -> Then, start the backend server by executing "npm run dev"



    -> Open a new terminal
    -> Move to the frontend folder by running "cd frontend"
    -> Run the command "npm install" to download node_modules

    -> Create a dotenv file in the backend folder, to initialize environment variables
            * VITE_API_URL=http://localhost:4000

    -> Then, start the frontend vite-react-app using "npm run dev"