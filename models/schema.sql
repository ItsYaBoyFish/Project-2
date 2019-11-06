DROP DATABASE IF EXISTS giftListApp;
CREATE DATABASE giftListApp;

USE giftListApp;

CREATE TABLE users (
  userID int NOT NULL AUTO_INCREMENT,
  email varchar(200) NOT NULL,
  handle varchar(200) NOT NULL,
  username varchar(200) NOT NULL,
  userPassword varchar(200) NOT NULL,
  PRIMARY KEY (userID)
);

CREATE TABLE recipient (
  recipientID int NOT NULL AUTO_INCREMENT,
  recipientName varchar(200) NOT NULL,
  userID int NOT NULL,
  PRIMARY KEY (recipientID)
);

CREATE TABLE gifts (
  giftID int NOT NULL AUTO_INCREMENT,
  giftName varchar(200) NOT NULL,
  purchased boolean NOT NULL,
  giftUrl varchar(255) NOT NULL,
  receipt varchar(200) NOT NULL,
  recipientID int NOT NULL,
  PRIMARY KEY (giftID)
);
