import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Course } from '../../models/Course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit, OnChanges {

  // Define variables
  @Input() searchTerm: string;
  courses: Observable<Course[]>;

  constructor(private courseService: CourseService) { }

  // Get all courses
  ngOnInit() {
    this.courses = this.courseService.getAllCourses(this.searchTerm);
  }

  // Update courses on search
  ngOnChanges() {
    this.courses = this.courseService.getAllCourses(this.searchTerm);
  }

  goToCreateForm() {
    console.log('Not implemented');
  }

}
