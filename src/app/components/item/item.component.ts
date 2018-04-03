import { Component, Input, OnDestroy } from '@angular/core';
import { Course } from '../../models/Course';
import { CourseService } from '../../services/course.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styles: []
})
export class ItemComponent implements OnDestroy {

  // Define variable
  @Input() course: Course;

  // Unsubscribe subject
  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(private courseService: CourseService) { }

  // Upvote method
  upvote(id: string) {
    this.courseService.upvoteCourse(id).subscribe();
  }

  // Downvote method
  downvote(id: string) {
    this.courseService.downvoteCourse(id).subscribe();
  }

  // Delete Course
  remove(id: string) {
    this.courseService.removeCourse(id).toPromise()
      .then(() => window.location.href = 'http://localhost:4200');
  }

  // Unsubscribe from all observables
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
