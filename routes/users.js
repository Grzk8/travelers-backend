const express = require('express');

const router = express.Router();

const Users = [{
    id: '001',
    firstName: 'Grzegorz',
    lastName: 'Kaczor',
    photo: 'https://media-exp1.licdn.com/dms/image/C4E35AQHWU9Dy4Qo5cA/profile-framedphoto-shrink_200_200/0/1603349375467?e=1659718800&v=beta&t=3N8kUVzXatAodLv0HXulRX65WLVb6HBT6DiUVVI-szo'
}];


router.get('/:uid', (req,res,next) => {
    const userId = req.params.uid;
    const user = Users.find(u => {
        u.id === userId;
    });

    if (!travel) {
        return res.status(404).json({ message: 'travel not found' });
    }
    
    res.json({ user });
});

module.exports = router;