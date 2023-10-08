CREATE TABLE Plants (
    plant_true_id INT PRIMARY KEY, 
    common_name TEXT NOT NULL, 
    other_name TEXT NOT NULL, 
    cycle TEXT NOT NULL, 
    default_image TEXT NOT NULL
);

CREATE TABLE Plant_Details (
    plant_details_id SERIAL PRIMARY KEY, 
    plant_true_id INT NOT NULL, 
    common_name TEXT NOT NULL, 
    scientific_name TEXT NOT NULL, 
    "type" TEXT NOT NULL, 
    dimension FLOAT NOT NULL, 
    cycle TEXT NOT NULL, 
    hardiness TEXT NOT NULL, 
    watering TEXT NOT NULL, 
    sunlight TEXT NOT NULL, 
    pruning_month TEXT NOT NULL, 
    care_guides TEXT NOT NULL, 
    indoor TEXT NOT NULL,
    poisonous_to_humans TEXT NOT NULL,
    "description" TEXT NOT NULL,
    default_image TEXT NOT NULL
);

CREATE TABLE Plant_Group_Plants_Review (
    plant_group_id SERIAL PRIMARY KEY, 
    plant_true_id INT NOT NULL, 
    user_id INT NOT NULL, 
    rating INT NOT NULL,
    review TEXT NOT NULL
);

CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY, 
    username TEXT NOT NULL, 
    "password" TEXT NOT NULL,
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL,
    image_url TEXT NOT NULL, 
    email TEXT NOT NULL
);

CREATE TABLE My_Plant_Group (
    my_plant_group_id SERIAL PRIMARY KEY, 
    group_name TEXT,
    "description" TEXT
);

CREATE TABLE My_Plant_Group_Plants (
    My_Plant_Group_Plants_id INT PRIMARY KEY,
    plant_true_id INT,
    common_name VARCHAR(255),
    scientific_name VARCHAR(255),
    group_name VARCHAR(255),
    FOREIGN KEY (plant_true_id) REFERENCES Your_Plant_Table_Name(plant_true_id),
    FOREIGN KEY (group_name) REFERENCES My_Plant_Group(group_name)
);
