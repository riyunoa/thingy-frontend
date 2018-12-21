# QWAVE

## About
Done for ELMO hackathon 2018.

## Architecture
- This project consists of:
    - Frontend: create-react-app
    - Backend: AWS lambda functions (in /lambda). 
    - DynamoDB as the database. 
    
- To run it
    - npm install
    - npm start
    - Create DynamoDB, modify lambda functions to hit this DB
    - Deploy lambda functions to AWS. They live behind API Gateway. Update the endpoints in the React components accordingly
 
