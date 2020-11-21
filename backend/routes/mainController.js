const express = require('express');
const queryAsync = require('../database');
const mainController = express.Router();

mainController.get('/', (req, res) => {
  let sqlQuery = "SELECT * FROM ;"
  queryAsync(sqlQuery)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      res.status(500).json({
        "errorMessage": error.sqlMessage
      });
    });
});

mainController.get('/:id', async (req, res) => {

  Data = await queryAsync(`SELECT * FROM
  WHERE id = ?`, req.params.id);

  res.status(200).json(Data);
})

mainController.post('/:id', async (req, res) => {
  console.log(req);
  response = await queryAsync(`INSERT INTO   (id)
   VALUES (?);`, [req.params.id, req.body.name = 'Sanyi', req.body.amount = 123]);
  res.status(200).json(response);
})


module.exports = mainController;