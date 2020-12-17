import { Injectable } from '@angular/core';

@Injectable()
export class AvailableCoursesService {
    public availableCourse = ''; // Jee Mains
    public availableCourseKey = ''; // JEEMAINS_, NEET_
    public appVersion = '0.0.1';
    constructor() {}
}
