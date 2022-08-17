const express = require("express");
const { singUp, login, logOut } = require("../controllers/authController")
const appRoutes = require("express").Router();
appRoutes.post("/signup", singUp);
appRoutes.post("/login", login);

module.exports = appRoutes;