CREATE TABLE Plants (
    plant_true_id INT PRIMARY KEY,
    common_name TEXT,
    other_name TEXT,
    cycle TEXT,
    default_image TEXT,
    scientific_name TEXT,
    type TEXT,
    dimension FLOAT,
    hardiness TEXT,
    watering TEXT,
    sunlight TEXT,
    pruning_month TEXT,
    care_guides TEXT,
    indoor TEXT,
    poisonous_to_humans INT,
    description TEXT
);

CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY, 
    username TEXT NOT NULL, 
    password TEXT NOT NULL,
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    image_url TEXT NOT NULL
);

CREATE TABLE My_Plant_Group (
    my_plant_group_id SERIAL PRIMARY KEY, 
    group_name TEXT NOT NULL,
    description TEXT, 
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE
);

CREATE TABLE My_Plant_Group_Plants (
    My_Plant_Group_Plants_id SERIAL PRIMARY KEY,
    plant_true_id INT,
    common_name TEXT,
    group_id INT,
    user_id INT NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES My_Plant_Group(my_plant_group_id) ON DELETE CASCADE

);

CREATE TABLE Plant_Group_Plants_Review (
    plant_group_plants_review_id SERIAL PRIMARY KEY, 
    my_plant_group_id INT NOT NULL, 
    user_id INT NOT NULL, 
    rating INT NOT NULL,
    review TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (my_plant_group_id) REFERENCES My_Plant_Group (my_plant_group_id)
    ON DELETE CASCADE
    
);