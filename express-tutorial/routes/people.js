const express = require('express');
const router = express.Router();

const { people } = require('../data')

router.get('/', (req, res) => {
    res.status(200).json({ success: true, data: people })
})

router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please provide the name' })
    }
    res.status(201).json({ success: true, person: name })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const person = people.find(person => person.id === +id)

    if (!person) {
        res.status(404).send(`Can't find person with id ${id}`)
    }

    const newPeople = people.map(person => {
        if (person.id === +id) {
            person.name = name
        }
        return person
    })

    res.status(200).send(newPeople)
})

router.delete('/:id', (req, res) => {
    const person = people.find(person => person.id === +req.params.id)

    if (!person) {
        res.status(404).send(`Can't find person with id ${req.params.id}`)
    }

    const newPeople = people.filter(person => person.id !== +req.params.id)

    res.status(200).send(newPeople)
})

module.exports = router;
