const express = require('express');
const queryAsync = require('../database');
const apiController = express.Router();

apiController.get('/:id', async (req, res) => {
  data = await queryAsync(`SELECT * FROM 
  WHERE id = ?`, req.params.id);
  
  res.status(200).json(data);
});

module.exports = apiController;