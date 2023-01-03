// Create databases
CREATE DATABASES assesstmentV2

// To use the database
USE assesstmentV2

// Create User Table
CREATE TABLE User ( id int NOT NULL AUTO_INCREMENT, username TEXT NOT NULL, firstName TEXT, lastName TEXT, email TEXT NOT NULL, phoneNo TEXT, password TEXT NOT NULL, PRIMARY KEY (id));

// Insert values into User Table
insert into User (username,firstName, lastName, email, phoneNo, password) values ("ali", "ali1", "ali2", "ali@demo.com", "0123456789", "12345678"), ("abu", "abu1", "abu2", "abu@demo.com", "0123456789", "12345678"), ("wei", "wei1", "wei2", "wei@demo.com", "0123456789", "12345678"), ("ria", "ria1", "ria2", "ria@demo.com", "0123456789", "12345678"), ("kali", "kali1", "kali2", "kali@demo.com", "0123456789", "12345678");