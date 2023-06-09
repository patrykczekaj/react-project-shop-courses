const { v4: uuid } = require('uuid');

const coursesData = [
  {
    authors: ['Patryk Czekaj'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2049385_9a8c.jpg',
    price: 69.99,
    title: 'Web developer od podstaw w 15 dni',
  },
  {
    authors: ['Patryk Czekaj'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2049385_9a8c.jpg',
    price: 69.99,
    title: 'Zaawansowany front-end w 15 dni',
  },
  {
    authors: ['Patryk Czekaj'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2049385_9a8c.jpg',
    price: 69.99,
    title: 'Programowanie w JavaScript',
  },
  {
    authors: ['Patryk Czekaj'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2049385_9a8c.jpg',
    price: 69.99,
    title: 'React od podstaw - teoria i praktyka',
  },
  {
    authors: ['Patryk Czekaj'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2049385_9a8c.jpg',
    price: 69.99,
    title: 'Backend - Node.js, Express i MongoDB',
  },
  {
    authors: ['Bartłomiej Borowczyk'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2049385_9a8c.jpg',
    price: 69.99,
    title: '(Zaawansowane) Projekty w CSS i JavaScript',
  },
  {
    authors: ['Patryk Czekaj'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2049385_9a8c.jpg',
    price: 0,
    title: 'Wprowadzenie do Git i GitHub',
  },
  {
    authors: ['Patryk Czekaj'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2049385_9a8c.jpg',
    price: 69.99,
    title: 'Programowanie obiektowe w JavaScript - opanuj, tworząc gry!'
  }
];

exports.getCourses = (request, response, next) => {
  try {
    response.status(200).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /courses',
    });
  }
};

exports.getCourse = (request, response, next) => {
  try {
    const { id } = request.params;
    const courseToSend = coursesData.find(course => course.id === id);

    if (!courseToSend) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym id',
      });
      
      return;
    }

    response.status(200).json({
      course: courseToSend, 
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /courses/:id',
    })
  }
};

exports.postCourse = (request, response, next) => {
  try {
    const { authors, img, price, title } = request.body;
    if ( !authors || !price || !title ) {
      response.status(400).json({
        message: 'Nie podano wszystkich wymaganych informacji',
      });

      return;
    }

    const isCourseExist = coursesData.some(({title: currentTitle}) => currentTitle === title);
    if (isCourseExist) {
      response.status(409).json({
        message: `Istnieje już w bazie kurs ${title}`,
      });

      return;
    }

    const newCourse = {
      authors: authors,
      id: uuid(),
      img,
      price,
      title,
    };

    coursesData.push(newCourse);

    response.status(201).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /courses'
    });
  }
};

exports.putCourse = (request, response, next) => {
  try {
    const { authors, id, price, title } = request.body;
    if (!authors || !id || !price || !title) {
      response.status(400).json({
        message: 'Nie podano wszystkich wymaganych informacji',
      });

      return;
    }

    const indexCourseToUpdate = coursesData.findIndex(course => course.id === id);
    if (indexCourseToUpdate === -1) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym id',
      });
      
      return;
    }
    
    
    coursesData.splice(indexCourseToUpdate, 1, request.body);

    response.status(202).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /courses'
    });
  }
};

exports.deleteCourse = (request, response, next) => {
  try {
    const { id } = request.params;

    console.log(id);
    const indexCourseToDelete = coursesData.findIndex(course => course.id === id);

    if (indexCourseToDelete === -1) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym id',
      });
      
      return;
    }

    coursesData.splice(indexCourseToDelete, 1);
    response.status(200).end();
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie DELETE w endpointcie /courses/:id',
    });
  }
};

exports.coursesData = coursesData;