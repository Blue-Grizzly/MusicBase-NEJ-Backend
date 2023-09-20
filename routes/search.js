//generelt søgning (på tværs af alle kategorier

import { Router } from "express";
import connection from "../database.js";

const searchRouter = Router();

// søge generelt på alle kategorier


searchRouter.get("/all/:searchterm", (request, response) => {
    const searchterm = request.params.searchterm;
    const query = `SELECT * FROM artists  WHERE name LIKE "%${searchterm}%";
    SELECT * FROM albums WHERE name LIKE "%${searchterm}%";
    SELECT * FROM tracks WHERE name LIKE "%${searchterm}%"
    ` 

    

    connection.query(query, (err, results, fields) =>{
        // response.json(results);
        console.log(err);
        response.json(results);
    });

});





//søge på artist navn
searchRouter.get("/artist/:searchterm", (request, response) => {
  const searchterm = request.params.searchterm;
  const query = `SELECT * FROM artists WHERE name LIKE "%${searchterm}%"`;

  connection.query(query, (err, results, fields) => {
    response.json(results);
  });
})



// søge på album navn
searchRouter.get("/albumn/:searchterm", (request, response) => {
  const searchterm = request.params.searchterm;
  const query = `SELECT * FROM albums WHERE name LIKE "%${searchterm}%"`;

  connection.query(query, (err, results, fields) => {
    response.json(results);
  });
})


// søge på track navn
searchRouter.get("/track/:searchterm", (request, response) => {
  const searchterm = request.params.searchterm;
  const query = `SELECT * FROM tracks WHERE name LIKE "%${searchterm}%"`;

  connection.query(query, (err, results, fields) => {
    response.json(results);
  });
})

export {searchRouter};