const { Router } = require('express');
const router = Router();

router.route('/')
const {getLessons, createLesson, updateLesson, deleteLesson, getLesson} = require('../controllers/lessons.controllers.js')
router.route('/')
    .get(getLessons)
    .post(createLesson)

router.route('/:id') 
    .get(getLesson)
    .put(updateLesson)
    .delete(deleteLesson)
    
module.exports = router;