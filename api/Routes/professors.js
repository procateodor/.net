const express = require('express');
const router = express.Router();

function getLab(id) {
    return new Promise((resolve, reject) => {
        Lab.find({ disciplineId: id }, (err, lab) => {
            if (err) {
                reject(null);
            }

            resolve(lab);
        });
    });
}

function getCourse(id) {
    return new Promise((resolve, reject) => {
        Course.find({ disciplineId: id }, (err, course) => {
            if (err) {
                reject(null);
            }

            resolve(course);
        });
    });
}

function getComment(id) {
    return new Promise((resolve, reject) => {
        Comment.find({ disciplineId: id }, (err, course) => {
            if (err) {
                reject(null);
            }

            resolve(course);
        });
    });
}

router.get('/disciplines', (req, res) => {
    const { profId } = req.query;

    Discipline.find({ profId }, (err, items) => {
        if (err) {
            return res.status(404).send({ status: false, items: [] });
        }

        return res.status(200).send({ status: true, items });
    });
});

router.post('/studsReport', async (req, res) => {
    const { course_id } = req.body;

    try {
        const answers = await Answer.find({ disciplineId: course_id });
        let answersMap = new Map();

        answers.forEach(answer => {
            if (answersMap.has(answer.userId)) {
                answer.responses.forEach(response => {
                    let current = answersMap.get(answer.userId);

                    response.status === 'right' ? current.r++ : current.w++;

                    answersMap.set(answer.userId, current);
                });
            } else {
                answersMap.set(answer.userId, {
                    r: 0,
                    w: 0
                });

                answer.responses.forEach(response => {
                    let current = answersMap.get(answer.userId);

                    response.status === 'right' ? current.r++ : current.w++;

                    answersMap.set(answer.userId, current);
                });
            }
        });

        let fullText = '';

        for (const [key, value] of answersMap) {
            const user = await User.findOne({ _id: key });

            fullText += `${user.LastName} ${user.FirstName} ${user.Group} ${value.r} Right answers ${value.w} Wrong answers\n`;
        }

        const path = `/upload/${require('uuid/v4')()}.txt`;

        if (!fullText) {
            fullText += 'No data.'
        }

        require('fs').writeFileSync(`public${path}`, fullText);

        return res.status(200).json({
            success: true,
            path
        });
    } catch (error) {
        return res.status(500).json({
            success: false
        });
    }
});

router.put('/disciplines', (req, res) => {
    const item = req.body;

    Discipline.where({ _id: item._id }).updateOne({
        $set: {
            title: item.title,
            description: item.description,
            year: item.year,
            semester: item.semester,
            credit: item.credit
        }
    }, (err, data) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        return res.json({
            success: true,
            data: data
        });
    });
});

router.delete('/disciplines/:id', (req, res) => {
    const id = req.params.id;

    Discipline.deleteOne({ _id: id }, (err, data) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        return res.json({
            success: true
        });
    })
});

router.post('/disciplines', (req, res) => {
    const item = req.body;

    Discipline(item).save((err, data) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        return res.json({
            success: true,
            data
        });
    });
});

router.post('/disciplines/courses/quiz', (req, res) => {
    const item = req.body;

    const then = new Date().valueOf() + 60 * 1000 * item.time;
    item.time = new Date(then).toString();

    Quiz(item).save((err, quiz) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        Course.where({ _id: item.disciplineId }).updateOne({
            $set: {
                game: true,
                gameId: quiz._id
            }
        }, (err, data) => {
            if (err) {
                return res.json({
                    success: false
                });
            }

            return res.json({
                success: true,
                data,
                id: quiz._id
            });
        });
    });
});

router.post('/disciplines/labs/quiz', (req, res) => {
    const item = req.body;

    const then = new Date().valueOf() + 60 * 1000 * item.time;
    item.time = new Date(then).toString();

    Quiz(item).save((err, quiz) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        Lab.where({ _id: item.disciplineId }).updateOne({
            $set: {
                game: true,
                gameId: quiz._id
            }
        }, (err, data) => {
            if (err) {
                return res.json({
                    success: false
                });
            }

            return res.json({
                success: true,
                data,
                id: quiz._id
            });
        });
    });
});

router.get('/disciplines/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const courses = await getCourse(id);
        const labs = await getLab(id);
        const comments = await getComment(id);

        return res.json({
            success: true,
            courses,
            labs,
            comments
        });
    } catch (error) {
        return res.json({
            success: false
        });
    }
});

router.put('/disciplines/courses', (req, res) => {
    const item = req.body;

    Course.where({ _id: item._id }).updateOne({
        $set: {
            title: item.title,
            description: item.description,
            path: item.path
        }
    }, (err, data) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        return res.json({
            success: true,
            data
        });
    });
});

router.put('/disciplines/labs', (req, res) => {
    const item = req.body;

    Lab.where({ _id: item._id }).updateOne({
        $set: {
            title: item.title,
            description: item.description,
            path: item.path
        }
    }, (err, data) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        return res.json({
            success: true,
            data
        });
    });
});

router.delete('/disciplines/courses/:id', (req, res) => {
    const id = req.params.id;

    Course.deleteOne({ _id: id }, (err, data) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        return res.json({
            success: true
        });
    })
});

router.delete('/disciplines/labs/:id', (req, res) => {
    const id = req.params.id;

    Lab.deleteOne({ _id: id }, (err, data) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        return res.json({
            success: true
        });
    })
});

router.post('/disciplines/courses', (req, res) => {
    const item = req.body;

    Course(item).save((err, data) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        Discipline.findOne({ _id: item.disciplineId }, async (err, discipline) => {
            const subscribers = discipline.subscribers;

            for (let index = 0; index < subscribers.length; index++) {
                const sub = subscribers[index];

                await Notification({
                    disciplineName: item.title,
                    message: 'A cour has been added.',
                    userId: sub
                }).save();
            }

            return res.json({
                success: true,
                data
            });
        });
    });
});

router.post('/disciplines/labs', (req, res) => {
    const item = req.body;

    Lab(item).save((err, data) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        Discipline.findOne({ _id: item.disciplineId }, async (err, discipline) => {
            const subscribers = discipline.subscribers;

            for (let index = 0; index < subscribers.length; index++) {
                const sub = subscribers[index];

                await Notification({
                    disciplineName: item.title,
                    message: 'A lab has been added.',
                    userId: sub
                }).save();
            }

            return res.json({
                success: true,
                data
            });
        });

    });
});

router.post('/disciplines/:id/comment', (req, res) => {
    const item = req.body;

    Comment(item).save((err, data) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        return res.json({
            success: true,
            data
        });
    });
});

router.get('/disciplines/:id/:quizId', (req, res) => {
    const { quizId } = req.params;

    Quiz.findOne({ _id: quizId }, (err, data) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        return res.json({
            success: true,
            data
        });
    });
});

router.get('/disciplines/:id/:quizId/answer', (req, res) => {
    const { quizId } = req.params;

    Answer.find({ quizId }, (err, data) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        return res.json({
            success: true,
            data
        });
    });
});

router.post('/disciplines/:id/:quizId/answer', (req, res) => {
    const item = req.body;

    const id = item._id;
    delete item.id;

    Answer.where({ _id: id }).updateOne({
        $set: item
    }, (err, data) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        if (req.query.status === 'right') {
            User.where({ _id: item.userId }).updateOne({
                $inc: { Points: 1 }
            }, (err, data) => {
                if (err) {
                    return res.json({
                        success: false
                    });
                } else {
                    return res.json({
                        success: true
                    });
                }
            });
        }
    });
});

router.post('/disciplines/:id/:quizId', (req, res) => {
    const item = req.body;

    Answer(item).save((err, data) => {
        if (err) {
            return res.json({
                success: false
            });
        }

        return res.json({
            success: true,
            data
        });
    });
});

router.get('/notifications/:id', (req, res) => {
    const { id } = req.params;

    Notification.find({ userId: id }, (err, data) => {
        if (err) {
            return res.status(404).json({
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            items: data
        });
    })
});

module.exports = router;