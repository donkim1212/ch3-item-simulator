import express from 'express';

const router = express.Router();

/**
 * default get, retrieves all items list
 */
router.get('/', (req, res) => {
    // res.send("item get called!");
    
});

/**
 * creates item based on item info from req.body
 */
router.post('/:item', (req, res) => {
    // 
});

export default router;