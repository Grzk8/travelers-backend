const uuid = require('uuid/dist/v4');
const { validationResult } = require('express-validator');

const getCoordinates = require('../util/location');
const Travel = require('../models/travel');

let PlacesTemp = [
    {
        id: '1',
        destination: 'Kraków',
        description: 'Description',
        userId: '',
        location: {
            lat: 50.061389,
            lng: 19.938333
        },
        photos: {
            photo1: '../../../../data/krakow/barbican-4468079_1920.jpg',
            photo2: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fplikimpi.krakow.pl%2Fzalacznik%2F396462%2F4.jpg&imgrefurl=https%3A%2F%2Fwww.krakow.pl%2Fodwiedz_krakow%2F148881%2Cartykul%2Co_krakowie____informacje_praktyczne_.html&tbnid=tan065dEIFb3UM&vet=12ahUKEwiK-LSF3qL5AhVTrosKHVcnDocQMygCegUIARDBAQ..i&docid=IBzG9UER6jdMzM&w=900&h=600&q=krak%C3%B3w&client=ubuntu&ved=2ahUKEwiK-LSF3qL5AhVTrosKHVcnDocQMygCegUIARDBAQ',
            photo3: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fu.profitroom.pl%2F2019-hotelwitek-pl%2Fthumb%2F1920x810%2Fuploads%2Fbarbican-4468079_1920.jpg&imgrefurl=https%3A%2F%2Fwww.hotelwitek.pl%2Fhotel%2Faktualnosci%2Fszczegoly-aktualnosci%3FNewsID%3D39039&tbnid=xy-OMc_M-NB_AM&vet=12ahUKEwiK-LSF3qL5AhVTrosKHVcnDocQMyggegUIARCEAg..i&docid=eVc3WNrxUrrHRM&w=1920&h=810&q=krak%C3%B3w&client=ubuntu&ved=2ahUKEwiK-LSF3qL5AhVTrosKHVcnDocQMyggegUIARCEAg'
        },
        creator: '001'
    },
    {
        id: '2',
        destination: 'Gdańsk',
        description: 'Description',
        userId: '',
        location: {
            lat: 20.89,
            lng: 6.93
        },
        photos: {
            photo1: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fc8.alamy.com%2Fcomp%2FT1P810%2Fwoman-taking-photos-in-park-T1P810.jpg&imgrefurl=https%3A%2F%2Fwww.alamy.com%2Fstock-photo%2Fdsrl.html&tbnid=8V_qJSA5SKNy4M&vet=10CBEQxiAoCmoXChMIoMOO87Gm-QIVAAAAAB0AAAAAEAw..i&docid=e-mwy9YVf6ljnM&w=1300&h=956&itg=1&q=photo&ved=0CBEQxiAoCmoXChMIoMOO87Gm-QIVAAAAAB0AAAAAEAw',
            photo2: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fplikimpi.krakow.pl%2Fzalacznik%2F396462%2F4.jpg&imgrefurl=https%3A%2F%2Fwww.krakow.pl%2Fodwiedz_krakow%2F148881%2Cartykul%2Co_krakowie____informacje_praktyczne_.html&tbnid=tan065dEIFb3UM&vet=12ahUKEwiK-LSF3qL5AhVTrosKHVcnDocQMygCegUIARDBAQ..i&docid=IBzG9UER6jdMzM&w=900&h=600&q=krak%C3%B3w&client=ubuntu&ved=2ahUKEwiK-LSF3qL5AhVTrosKHVcnDocQMygCegUIARDBAQ',
            photo3: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fu.profitroom.pl%2F2019-hotelwitek-pl%2Fthumb%2F1920x810%2Fuploads%2Fbarbican-4468079_1920.jpg&imgrefurl=https%3A%2F%2Fwww.hotelwitek.pl%2Fhotel%2Faktualnosci%2Fszczegoly-aktualnosci%3FNewsID%3D39039&tbnid=xy-OMc_M-NB_AM&vet=12ahUKEwiK-LSF3qL5AhVTrosKHVcnDocQMyggegUIARCEAg..i&docid=eVc3WNrxUrrHRM&w=1920&h=810&q=krak%C3%B3w&client=ubuntu&ved=2ahUKEwiK-LSF3qL5AhVTrosKHVcnDocQMyggegUIARCEAg'
        },
        creator: '001'
    },
    {
        id: '3',
        destination: 'Gdańsk',
        description: 'Description',
        userId: '',
        location: {
            lat: 32.89,
            lng: 116.93
        },
        photos: {
            photo1: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.polska.travel%2Fimages%2Fpl-PL%2Fglowne-miasta%2Fkrakow%2Fkrakow_rynek_2_1170.jpg&imgrefurl=https%3A%2F%2Fwww.polska.travel%2Fpl%2Fglowne-miasta%2Fkrakow&tbnid=8gcq15qhnoPd8M&vet=12ahUKEwiK-LSF3qL5AhVTrosKHVcnDocQMygAegUIARC9AQ..i&docid=VnbXKXIdPUfPBM&w=1170&h=780&q=krak%C3%B3w&client=ubuntu&ved=2ahUKEwiK-LSF3qL5AhVTrosKHVcnDocQMygAegUIARC9AQ',
            photo2: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fplikimpi.krakow.pl%2Fzalacznik%2F396462%2F4.jpg&imgrefurl=https%3A%2F%2Fwww.krakow.pl%2Fodwiedz_krakow%2F148881%2Cartykul%2Co_krakowie____informacje_praktyczne_.html&tbnid=tan065dEIFb3UM&vet=12ahUKEwiK-LSF3qL5AhVTrosKHVcnDocQMygCegUIARDBAQ..i&docid=IBzG9UER6jdMzM&w=900&h=600&q=krak%C3%B3w&client=ubuntu&ved=2ahUKEwiK-LSF3qL5AhVTrosKHVcnDocQMygCegUIARDBAQ',
            photo3: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fu.profitroom.pl%2F2019-hotelwitek-pl%2Fthumb%2F1920x810%2Fuploads%2Fbarbican-4468079_1920.jpg&imgrefurl=https%3A%2F%2Fwww.hotelwitek.pl%2Fhotel%2Faktualnosci%2Fszczegoly-aktualnosci%3FNewsID%3D39039&tbnid=xy-OMc_M-NB_AM&vet=12ahUKEwiK-LSF3qL5AhVTrosKHVcnDocQMyggegUIARCEAg..i&docid=eVc3WNrxUrrHRM&w=1920&h=810&q=krak%C3%B3w&client=ubuntu&ved=2ahUKEwiK-LSF3qL5AhVTrosKHVcnDocQMyggegUIARCEAg'
        },
        creator: '001'
    }
];

const getTravelById = async (req, res, next) => {
    const placeId = req.params.pid;
    let travel;

    try {
        travel = await Travel.findById(placeId);
    } catch (err) {
        const error = new Error('Travel not found');
        error.code = 500;
        return next(error);
    }

    if (!travel) {
        const error = new Error('Travel not found');
        error.code = 404;
        return next(error);
    }
    res.json({ travel: travel.toObject({ getters: true }) });
};

const getTravelsByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let travel;

    try {
        travel = await Travel.find({ creator: userId });
    } catch (err) {
        const error = new Error('Travel not found');
        error.code = 500;
        return next(error);
    }
    if (!travel || travel.length === 0) {
        const error = new Error('Travel not found');
        error.code = 404;
        return next(error);
    }
    res.json({ travel: travel.map(t => t.toObject({ getters: true })) });
};

const newTravel = async (req, res, next) => {
    const { destination, description, creator } = req.body;
    let coord;

    try {
        coordinates = await getCoordinates(destination);
    } catch (error) {
        return next(error);
    }

    const createdTravel = new Travel({
        destination,
        description,
        creator,
        photos: {
            photo1: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTffneFER0tHLP0QALe_0I2oJ2p-GaV6IRkyxn08y6aueIipn4U4QoyjOWIT65w_Snzid4&usqp=CAU',
            photo2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8xyo3D12bDqr9eiMCvXix5jlaUfTWIGf3I3UKwY-D4RRslM1ZWORfZ8id2ZUhWhh6_e8&usqp=CAU',
            photo3: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ5traUzdyLzFhLetMVXeCzClhVHo91viJ8KYmbBVldaIgB0qJR8WTR3UQNvP9-WWCZcY&usqp=CAU'
        },
        location: coordinates,

    });

    try {
        await createdTravel.save();
    } catch (err) {
        const error = new Error('Creating new travel faild');
        error.code = 500;
        return next(error);
    }
    res.status(201).json({ travel: createdTravel });
};

const updateTravelById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Invalid data, check your data');
        error.code = 422;
        return next(error);
    }

    const { destination, description } = req.body;
    const placeId = req.params.pid;
    let travel;

    try {
        travel = await Travel.findById(placeId);
    } catch (err) {
        const error = new Error('Updating travel failed');
        error.code = 500;
        return next(error);
    }

    travel.destination = destination;
    travel.description = description;

    try {
        await travel.save();
    } catch {
        const error = new Error('Updating travel failed');
        error.code = 500;
        return next(error);
    }
    res.status(200).json({ travel: travel.toObject({ getters: true }) });

};

const deleteTravelById = async (req, res, next) => {
    const placeId = req.params.pid;
    
    let travel;

    try {
        travel = await Travel.findById(placeId);
    } catch (err) {
        const error = new Error('Deleting travel failed');
        error.code = 500;
        return next(error);
    }

    try {
        await travel.remove();
    } catch {
        const error = new Error('Deleting travel failed');
        error.code = 500;
        return next(error);
    }
    res.status(200).json({ message: 'Travel deleted' });
};

exports.getTravelById = getTravelById;
exports.newTravel = newTravel;
exports.getTravelsByUserId = getTravelsByUserId;
exports.updateTravelById = updateTravelById;
exports.deleteTravelById = deleteTravelById;