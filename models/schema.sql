DROP DATABASE IF EXISTS giftListApp;
CREATE DATABASE giftListApp;

USE giftListApp;

CREATE TABLE users (
  userID int NOT NULL AUTO_INCREMENT,
  email varchar(200) NOT NULL,
  handle varchar(200) NOT NULL,
  username varchar(200) NOT NULL,
  user_password varchar(200) NOT NULL,
  PRIMARY KEY (userID)
);

CREATE TABLE recipient (
  recipientID int NOT NULL AUTO_INCREMENT,
  recipient_name varchar(200) NOT NULL,
  userID int NOT NULL,
  PRIMARY KEY (recipientID)
);

CREATE TABLE gifts (
  giftID int NOT NULL AUTO_INCREMENT,
  gift_name varchar(200) NOT NULL,
  purchased boolean NOT NULL,
  gift_url varchar(255) NOT NULL,
  receipt varchar(200) NOT NULL,
  recipientID int NOT NULL,
  PRIMARY KEY (giftID)
);
