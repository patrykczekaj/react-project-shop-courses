import React, { useContext } from "react";
import Course from '../Course/Course';
import bemCssModules from 'bem-css-modules';
import { default as CoursesStyle } from './Courses.module.scss';
import { StoreContext } from "../../store/StoreProvider";

const style = bemCssModules(CoursesStyle);

const Courses = () => {
    const { courses } = useContext(StoreContext);

    const coursesElements = courses.map(course => <Course key={course.id} {...course} />)

    return (
        <section className={style()}>
            <h2 className={style('title')}></h2>
            <ul className={style('list')}>
                {coursesElements}
            </ul>
        </section>
    );
};

export default Courses;