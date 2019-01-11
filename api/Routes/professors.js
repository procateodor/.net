const express = require('express');
const router = express.Router();

function getLab(_id) {
    return new Promise((resolve, reject) => {
        Lab.findOne({ _id }, (err, lab) => {
            if (err) {
                reject(null);
            }

            resolve(lab);
        });
    });
}


function getCourse(_id) {
    return new Promise((resolve, reject) => {
        Course.findOne({ _id }, (err, course) => {
            if (err) {
                reject(null);
            }
            
            resolve(course);
        });
    });
}

router.get('/disciplines/:id', (req, res) => {
    const { id } = req.params;

    Discipline.findOne({ _id: id }, (err, item) => {
        if (err) {
            return res.status(404).send({ status: false, items: [] });
        }

        const response = {
            details: item,
            courses: [],
            labs: []
        }

        item.courses.forEach(async coursId => {
            console.log(coursId);
            
            const course = await getCourse(coursId);

            if (course) {
                response.courses.push(course);
            }
        });

        item.labs.forEach(async labId => {
            const lab = await getLab(labId);

            if (lab) {
                response.labs.push(lab);
            }
        });

        console.log(response);


        return res.status(200).send({ status: true, item });
    });
});

module.exports = router;