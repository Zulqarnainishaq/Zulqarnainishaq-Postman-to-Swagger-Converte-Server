var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /your-endpoint:
 *   get:
 *     summary: Retrieves data from the server
 *     description: Use this endpoint to fetch data based on the provided parameters
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional ID parameter to filter results
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
// Your GET route implementation here

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;