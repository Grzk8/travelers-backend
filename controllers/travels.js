const uuid = require('uuid/dist/v4');

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
        creatorId: '001'
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
        creatorId: '001'
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
        creatorId: '001'
    }
];

exports.getTravelById = (req, res, next) => {
    const placeId = req.params.pid;
    const travel = PlacesTemp.find(p => {
        return p.id === placeId;
    });

    if (!travel) {
        const error = new Error('Travel not found');
        error.code = 404;
        return next(error);
    }
    res.json({ travel });
};

exports.getTravelsByUserId = (res, req, next) => {
    userId = req.params.uid;
    travels = PlacesTemp.filter(p => {
        return p.creatorId === userId;
    });

    if (!travels || travels.length === 0) {
        const error = new Error('Travel not found');
        error.code = 404;
        return next(error);
    }
    res.json({ travels });
};

exports.newTravel = (res, req, next) => {
    const { destination, description, coordinates, creatorId } = req.body;
    const createdTravel = {
        id: uuid(),
        destination,
        description,
        userId,
        location: coordinates,
        creatorId,
        photos
    };
    PlacesTemp.push(createdTravel);

    res.status(201).json({ travel: createdTravel });
};

exports.updateTravelById = (req, res, next) => {
    const { destination, description } = req.body;
    const placeId = req.params.pid;

    const updatedTravel = PlacesTemp.find(p => {
        p.id === placeId;
        res.status(200).json({ travel: updatedTravel });
    });
};

exports.deleteTravelById = (req, res, next) => {
    const placeId = req.params.pid;
    PlacesTemp = PlacesTemp.filter(p => {
        p.id !== placeId;
        res.status(200).json({ message: 'Place deleted' })
    });
};