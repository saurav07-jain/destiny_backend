const express = require('express');
const { getAssets, createAsset, updateAsset, deleteAsset } = require('../controllers/assetController');

const router = express.Router();

router.route('/').get(getAssets).post(createAsset);
router.route('/:id').put(updateAsset).delete(deleteAsset);

module.exports = router;
