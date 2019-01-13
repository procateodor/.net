const express = require('express');
const router = express.Router();

router.get('/disciplines', (req, res) => {
    Discipline.find({}, (err, items) => {
        if (err) {
            return res.status(404).send({ status: false, items: [] });
        }

        return res.status(200).send({ status: true, items });
    });
});

router.post('/disciplines/sub', (req, res) => {
    const { userId, id } = req.body;
    
    Discipline.findOne({_id: id}, (err, item) => {
        if (err) {
            return res.status(404).send({ status: false, items: [] });
        }

        item.subscribers.push(userId);

        Discipline(item).save(err => {
            if (err) {
                return res.status(404).send({ status: false, items: [] });
            }

            return res.status(200).send(item);
        });
    });
});

router.post('/disciplines/unsub', (req, res) => {
    const { userId, id } = req.body;
    
    Discipline.findOne({_id: id}, (err, item) => {
        if (err) {
            return res.status(404).send({ status: false, items: [] });
        }

        item.subscribers.splice(item.subscribers.indexOf(userId), 1);

        Discipline(item).save(err => {
            if (err) {
                return res.status(404).send({ status: false, items: [] });
            }

            return res.status(200).send(item);
        });
    });
});

router.get('/disciplines/:id/:quizId/answer', (req, res) => {
    const { quizId } = req.params;
    const { userId } = req.query;

    Answer.findOne({ userId, quizId }, (err, data) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        return res.json({
            success: true,
            data
        });
    })
});

module.exports = router;