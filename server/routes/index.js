import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to FastFoodFast'
    })
});

export default router;