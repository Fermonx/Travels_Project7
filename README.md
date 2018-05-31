# Project_7

(WIP)

Seventh project for the Geekshubs Academy Bootcamp, done for the most part, still missing: shopping cart, improve the design and polish the code to make it clean and understandable.

Functions to achieve this week:

  - A functioning Checkout view to buy travels.
  
  - Implement Sequelize
  
  - Implement Passport to better handle the user sessions
  
  - Implement pagination for the userstable and admintable views.
  
 
HOW TO RUN:

- Have an AMPPS server running with MySQL, go to connection/mysqlconnection.js and change the information for your own DB info
then go to config/sequelize.js and do the same, change the info for the one from your DB.

- Go to models/sequelizeTravelModel.js and sequelizeUserModel.js and make sure the fields are the same to your DB if not it won't work fully or at all.

- After making sure everything is correct run NPM Start. Project runs with nodemon so you can make changes and it will reload automatically.


NOTES:

- Vagrant is not fully implemented, the script does clones the project from the repository and installs most of the needed stuff but that functionality is still being worked on.
