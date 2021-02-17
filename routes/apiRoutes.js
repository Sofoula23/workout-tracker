const router = require('express').Router();
const Workout = require('../models/workout');

router.post('/api/workouts', async (req, res, next) => {
    try {
        const newWorkout = new Workout(req.body);
        await newWorkout.save();
        res.status(201).send(newWorkout);
        next();
    } catch (err) {
        next(err);
    }

})

router.put('/api/workouts/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const workout = await Workout.findById(id);
        const exercise = req.body;
        workout.exercises.push(exercise);
        await workout.save();
        res.status(201).send(workout);
        next();
    } catch (err) {
        next(err)
    }


})
router.get('/api/workouts/last', async (req, res, next) => {
    try {
        const results = await Workout.aggregate([
            { "$limit": 1},
            { "$sort": { day: -1 } },
            {
                "$addFields": {
                    "totalDuration": {
                        "$sum": "$exercises.duration"
                    }
                }
            },
        ]);
        
        if (results.length) {
            const lastWorkout = results[0];
            res.status(200).send(lastWorkout);
        } else {
            res.status(404);
        }
        next();
    } catch (err) {
        next(err)
    }


})
router.get('/api/workouts/range', async (req, res, next) => {
    try {
        const results = await Workout.aggregate([
            { "$limit": 7},
            { "$sort": { day: -1 } },
            {
                "$addFields": {
                    "totalDuration": {
                        "$sum": "$exercises.duration"
                    }
                }
            },
        ]);
        
        if (results.length) {
            res.status(200).send(results);
        } else {
            res.status(404);
        }
        next();
    } catch (err) {
        next(err)
    }


})



module.exports = router;
