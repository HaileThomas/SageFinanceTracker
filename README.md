<h1 align="center">
  <br>
    <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/fire.svg" width="300" height="300">
  <br>
  Sage Finance Tracker
  <br>
</h1>

<h4 align="center">A comprehensive finance tracker app developed with <a href="https://reactjs.org" target="_blank">React</a> and <a href="https://nodejs.org" target="_blank">Node.js</a>, featuring real-time transaction tracking.</h4>

<div align="center">

  ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
  ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
  ![Ant Design](https://img.shields.io/badge/Ant_Design-0170FE?style=for-the-badge&logo=ant-design&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
  ![Axios](https://img.shields.io/badge/Axios-5A29E3?style=for-the-badge&logo=axios&logoColor=white)

</div>

## Key Features

- **Real-Time Budget Tracking**  
  Track your expenses and income with up-to-the-minute updates.

- **Secure Authentication**  
  Protect your account with advanced user authentication.

- **Plaid Integration**  
  View and manage bank transactions with integrated Plaid support.

- **Customizable Budget Categories**  
  Organize your finances with personalized budget categories.

- **Multi-Currency Support**  
  Handle finances in various currencies with automatic conversion.

- **Responsive Design**  
  Enjoy seamless access across desktop and mobile devices.


## How To Use

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/HaileThomas/SageFinanceTracker.git

# Go into the repository
$ cd Sage

# Go into the client directory
$ cd client

# Install dependencies for the client
$ npm install

# Run the client app
$ npm run dev

# Go back to the root directory
$ cd ..

# Go into the server directory
$ cd server

# Install dependencies for the server
$ npm install

# Run the server app
$ npm run dev

# Go back to the root directory
$ cd ..
```

## Plaid Integration Setup

1. **Create a Plaid Account**  
   If you don't have a Plaid account, sign up at [Plaid's website](https://plaid.com/).

2. **Obtain Your Plaid API Keys**  
   After signing in, navigate to the "Dashboard" and find your API keys under the "Keys" section. You'll need the `client_id`, `secret`, and `public_key`.

3. **Add Plaid Credentials to Environment Variables**  
   Create a `.env` file in the root of your server directory if it doesn't already exist, and add the following variables:

   ```bash
   PLAID_CLIENT_ID=your_client_id
   PLAID_SECRET=your_secret
   PLAID_PUBLIC_KEY=your_public_key
   PLAID_PRODUCTS=auth,transactions
   PLAID_COUNTRY_CODES=US,CA
   PLAID_ENV=sandbox # or 'development' or 'production'
   
## Questions?

If you have any questions about the project you can reach out to me via email, LinkedIn, or GitHub with the information below.

> Email: tghaile@stanford.edu

> LinkedIn: [Thomas Haile](https://www.linkedin.com/in/thomashaile/)

> GitHub: [HaileThomas](https://github.com/HaileThomas)
> 
