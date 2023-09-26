CREATE TABLE Plant_list (
    plant_list_id INT PRIMARY KEY, 
    common_name TEXT NOT NULL, 
    other_name TEXT NOT NULL, 
    cycle TEXT NOT NULL, 
    default_image TEXT NOT NULL, 
)


CREATE TABLE Plant_details (
    plant_list_id INT PRIMARY KEY, 
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
)


CREATE TABLE Review (
    plant_list_id INT PRIMARY KEY, 
    rating INT NOT NULL, 
    title TEXT NOT NULL, 
    comment TEXT NOT NULL, 
)


CREATE TABLE User (
    id INT PRIMARY KEY, 
    plant_list_id TEXT NOT NULL, 
    username TEXT NOT NULL, 
    "password" TEXT NOT NULL, 
    image_url TEXT NOT NULL, 
    email TEXT NOT NULL, 
)

