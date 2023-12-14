#Title: 
Bloom Buddy

Link: 
https://github.com/markpakingan/react-plant-api

Description of the project:
- This website will help customers get information about plants. It allows a user to search for a specific plants, get basic information (e.g. handling care, water frequency, ideal temperature) and create collections. 

Wireframes:
[Click Here](https://docs.google.com/presentation/d/1aeGcRjUjD15oZlgTLrgL3erVi9AuVragYLRPH0ZhsoY/edit?usp=sharing)

**User Stories**
* "My dad loves to grow different type of plants. He would sometimes ask his friends on how to raise a speicific type of plant. It would be nice to create an application that will help any 'plant-lovers' (like my dad) to get some helpful information on how to grow a plant. In addition, he can create his own collection of selected plants to raise in the future"


**Setup**
In order to run on the server, please follow these steps:

- Step 1: Download the code and run the terminal
- Step 2: Download the necessary scripts. 
  You can find the list of scripts in "requirements.txt"
- Step 3: Start the server (backend)
  Use the command "node server.js" to start the server. 
- Step 4: Start the front end
  Use the command npm start to run the application

**Technologies Used:**
- Node 
- Express
- React
- Axios
- CSS
- Jest
- PSQL

This project uses mainly Javascript as the main programming language and the Express framework for building the web application. PSQL is used for database access and management. 

React & CSS are used for the front-end UI, with some bootstrap styling. Git is used for version control.

**Models:**
* UserModel
    The user model represents a registered user of the system

    - user_id: the unique identifier for the product (integer)
    - username: the name of the user (charfield)
    - password: the hidden pin of the user (charfield)
    - image_url: the chosen image of the user (charfield)
    - email: the chosen image of the user (charfield)

* My_Plant_Group
    The My_Plant_Group model represents the general information about a plant

    - user_id: the unique identified for the product
    - plant_true_id: the actual id of the plant derived from the API(Charfield)
    - common_name: the name of the plant (charfield)
    - user_id: the unique identifier for the product derived from the USER table (integer)
  

* My_Plant_Group_Plants
    The my_plant_group_plants model represents a collection of plants based on a user's personal criteria

    - my_plant_group_plants_id: the unique identifier for the product (integer)
    - plant_true_id: the actual id of the plant derived from the API (Charfield)
    	
- common_name: the name of the plant (Charfield)
    	- user_id: the unique identifier for the product derived from the USER table (integer).
- group_id: the unique identifier for the group derived from the My_Plant_Group table (integer).

	
  

* My_Plant_Group_Review
    This model represents the connection between the users table & the my_plant_group.

    - plant_group_review_id: the unique identifier for the product (integer)
    - my_plant_group_id: the unique identifier for the plant group derived from the table my_plant_group (integer)
    - user_id: the unique identifier for the product derived from the table user (integer)

  

Demo (Screenshots or GIFs of the application)
![Alt text](/frontend/src/images/homepage.png)
![Alt text](/frontend/src/images/signup.png)
![Alt text](/frontend/src/images/login.png)
![Alt text](/frontend/src/images/plantdetails.png)

Project Link:
https://github.com/markpakingan/react-plant-api	

**Future Work:**

There are several improvements for future work in this project: 

* Add capability to connect with other users.
* Allow search terms to be filtered based on categories.
* Additional testing and more smoother UI

Resources:
 [API Documentation](https://perenual.com/docs/api)

Team members:
Mark Pakingan - Developer, Designer, Tester

