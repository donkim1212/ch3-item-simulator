import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("item get called!");
});

export default router;