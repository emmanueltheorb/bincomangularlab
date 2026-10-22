import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Course, addCourse, removeCourse, clearCourses,
  selectCourses, selectCount, selectHours
} from './enrolment.store';

@Component({
  imports: [RouterOutlet, FormsModule, MatButtonModule, MatCardModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('bincom-angular-lab');
  private readonly store = inject(Store);
  readonly courses = this.store.selectSignal(selectCourses);
  readonly count = this.store.selectSignal(selectCount);
  readonly hours = this.store.selectSignal(selectHours);
  readonly catalogue: Course[] = [
    { id: 1, title: 'Angular Material', hours: 3 },
    { id: 2, title: 'Bootstrap Layout', hours: 2 },
    { id: 3, title: 'NgRx Store', hours: 4 }
  ];
  search = '';
  get filteredCourses(): Course[] {
    const term = this.search.trim().toLowerCase();
    return this.catalogue.filter(course =>
      course.title.toLowerCase().includes(term));
  }
  isSelected(id: number): boolean {
    return this.courses().some(course => course.id === id);
  }

  add(course: Course): void {
    this.store.dispatch(addCourse({ course }));
  }
  remove(id: number): void {
    this.store.dispatch(removeCourse({ id }));
  }
  clear(): void { this.store.dispatch(clearCourses()); }
}
