import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { AllCourses, OneCourse } from '../models/queries';
import { Course } from '../models/Course';

@Injectable()
export class CourseService {

  constructor(private apollo: Apollo) { }

  // Get All Courses
  getAllCourses(searchTerm: string) {
    return this.apollo.watchQuery<AllCourses>({
      query: gql`
        query allCourses($searchTerm: String) {
          allCourses(searchTerm: $searchTerm) {
            id
            title
            author
            description
            topic
            url
            voteCount
          }
        }
      `,
      variables: { searchTerm }
    })
    .valueChanges
    .pipe(map((result) => result.data.allCourses));
  }

  // Get One Course
  getOneCourse(id: string) {
    return this.apollo.watchQuery<OneCourse>({
      query: gql`
        query course($id: String!) {
          course(id: $id) {
            id
            title
            author
            description
            topic
            url
            voteCount
          }
        }
      `,
      variables: { id }
    })
    .valueChanges
    .pipe(map((result) => result.data.course));
  }

  // Create Course
  addCourse(title: string, author: string, description: string, topic: string, url: string) {
    return this.apollo.mutate<Course>({
      mutation: gql`
        mutation addCourse($title: String!, $author: String!, $description: String, $topic: String!, $url: String) {
          addCourse(title: $title, author: $author, description: $description, topic: $topic, url: $url) {
              title
              author
              description
              topic
              url
              voteCount
          }
        }
      `,
      variables: { title, author, description, topic, url }
    });
  }

  // Update vote count (increase)
  upvoteCourse(id: string) {
    return this.apollo.mutate<Course>({
      mutation: gql`
        mutation upvote($id: String!) {
          upvote(id: $id) {
            id
            title
            voteCount
          }
        }
      `,
      variables: { id }
    });
  }

  // Update vote count (decrease)
  downvoteCourse(id: string) {
    return this.apollo.mutate<Course>({
      mutation: gql`
        mutation downvote($id: String!) {
          downvote(id: $id) {
            id
            title
            voteCount
          }
        }
      `,
      variables: { id }
    });
  }

  // Delete Course
  removeCourse(id: string) {
    return this.apollo.mutate<Course>({
      mutation: gql`
        mutation removeCourse($id: String!) {
          removeCourse(id: $id) {
            id
            title
          }
        }
      `,
      variables: { id }
    });
  }

}
