**Documentation**<br/>
`index.js` is the main entry point of the server-side application. It sets up the Express server, configures middleware, and defines the routes for the application<br/>
The frontend repository is at the link https://github.com/keshavtomar/flexmoney  <br/>     
__imports__  
`cockraochDB`  `prisma` are used <br/>
Use  `git clone <url>` to clone this repository  
Use `npm i` command to install the dependencies  
Along with this you will be required a connection string to connect to the database, and store it in `.env` file (create a new file with this name)  
To get the connection string write an email on `tomarkeshavofficial@gmail.com`



__Routes__  
`/CreateUser` and `/LoginUser` routes are handling the registration and login  
`/enrollUser` route is handling the batch enrollment of the user after login  
`/checkPayment` route is handling the function of checking in the database if this user has already paid for the batch in this month 
`/userStatus` route is handling the query of checking the batch history of the user
    

__Age Calculation__  
During the registration Date of Birth is being stored for every user and at the time of enrollment to a batch, age is being verified




