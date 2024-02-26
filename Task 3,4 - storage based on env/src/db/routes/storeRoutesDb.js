const express = require('express')
const storeController = require('./../controllers/storeController')
const uploadImage = require('../../../middleware/uploadImage')

const router = express.Router()



router.route('/')
    .get(storeController.getAllStore)
    .post(uploadImage.single('storeLogo'), storeController.createStore)

router.route('/storeId')
    .get(storeController.getStoreProducts)

router.route('/search')
    .get(storeController.findNearStores)

module.exports = router;