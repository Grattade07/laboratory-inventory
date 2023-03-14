# Laboratory-inventory

This project was created as my final project during my Web Development bootcamp. It is an single-page web application that functions as an inventory management for a laboratory. It was built using React and Bootstrap for the front-end, with Express and Mongoose used to communicate with the database on MongoDB using a custom API with middleware and JWTokens used to authenticate users.

## Table of Contents

Section | Link |
--- | --- |
Wireframe | [Link](https://github.com/Grattade07/laboratory-inventory/edit/main/README.md#project-wireframe)
How to install | [Link](https://github.com/Grattade07/laboratory-inventory/edit/main/README.md#install-the-project-locally)
How to use | [Link](https://github.com/Grattade07/laboratory-inventory/edit/main/README.md#how-to-use-application)

## Project Wireframe

During the preparation of the project I created a wireframe to design the application (wireframe created using draw.io)

![image](https://user-images.githubusercontent.com/107367099/225123792-315654d5-abea-4406-9985-0ae47e8e7943.png)


## Install the project locally

(DISCLAIMER: As the application requires a MongoDBURI to operate, a local clone of the repo will not be able to completely function. To experience the working application go to <a href="https://laboratory-inventory.onrender.com" target="_blank">this website</a> )

* To install the project to your local machine get the repo URL from here:

![image](https://user-images.githubusercontent.com/107367099/225124052-85f45854-2ad3-4e77-871b-7e3f0e686338.png)

* Go to the folder you want to clone the repo to on your desktop

* Use 'git clone [url]' in your terminal/command prompt to download a clone of the repo and then enter the 'lab-inventory-server' folder in the cloned folder.

* In this folder, run 'npm install && npm install mongoose' in your terminal/command prompt then run 'npm start' and open 'localhost:3001' in your web browser to run the application

## How to use application 

Access the hosted application from [here](https://laboratory-inventory.onrender.com)

![image](https://user-images.githubusercontent.com/107367099/225119529-b7654280-b48b-4ff3-b11e-98d8817f7ffe.png)

* To access the application you must first register a new account or login using an account you have created previously.

* Registering a new account or logging in can be carried out through this area in the top right coner on the webpage.

![image](https://user-images.githubusercontent.com/107367099/225119847-831b945d-bc7a-4bc7-943c-cce2ea02c51e.png)

* Pressing the "SIGN UP" button will open a modal for you to enter your account details and set whether you would like your account to have admin permissions. 

![image](https://user-images.githubusercontent.com/107367099/225120874-88cba7eb-661e-4c1e-b6d3-5a94edf3a8df.png)


* With admin permissions you will be able to add new items to the inventory list, adjust item quantities and remove items from the inventory. Without admin permissions you will only be able to search for items and sort the inventory list using the tools to the right of the inventory table.

(User view with admin account)

![image](https://user-images.githubusercontent.com/107367099/225121019-d83cfd4d-7a0e-46d8-9ee4-70d5cb39ddab.png)

* To add a new item to the inventory fill out the item details in this box and press the "SUBMIT" button

![image](https://user-images.githubusercontent.com/107367099/225121394-110a378c-913a-42f0-bd16-8a619cb7050f.png)

* As an admin, use these buttons to incremend or decrement the item quantity

![image](https://user-images.githubusercontent.com/107367099/225121674-61b58739-362d-4f94-8e80-9db599602bda.png)

* As an admin, press the remove button to delete the item from the inventory

![image](https://user-images.githubusercontent.com/107367099/225121833-a8fe2197-f709-4c10-8866-03ad76921a20.png)

* To search for items, type your search terms into the search bar and press the search button to see items matching your search. Press the "Clear Search" button to reset the table.

![image](https://user-images.githubusercontent.com/107367099/225122386-58ce824e-dcb9-4327-9000-2e578d670da6.png)

* To sort the inventory, use the options from the "Sort By" container 

![image](https://user-images.githubusercontent.com/107367099/225122699-776c0a8b-cdfd-4b78-a739-6816b92ccc6a.png)


* To log out of the application press the "Logout" button in the top right of the page

![image](https://user-images.githubusercontent.com/107367099/225122972-edc2a40f-ff63-4093-9e25-e88fe65544b6.png)
