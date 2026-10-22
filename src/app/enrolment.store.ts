import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';

export interface Course {
  id: number;
  title: string;
  hours: number;
}
export interface EnrolmentState {
  courses: Course[];
}
export const initialState: EnrolmentState = { courses: [] };
export const addCourse = createAction('[Enrolment] Add Course', props<{ course: Course }>());
export const removeCourse = createAction('[Enrolment] Remove Course', props<{ id: number }>());
export const clearCourses = createAction('[Enrolment] Clear');
export const enrolmentReducer = createReducer(
  initialState,
  on(addCourse, (state, { course }) =>
    state.courses.some((item) => item.id === course.id)
      ? state
      : { ...state, courses: [...state.courses, course] },
  ),
  on(removeCourse, (state, { id }) => ({
    ...state,
    courses: state.courses.filter((item) => item.id !== id),
  })),
  on(clearCourses, () => ({ courses: [] })),
);
export const selectEnrolment = createFeatureSelector<EnrolmentState>('enrolment');
export const selectCourses = createSelector(selectEnrolment, (state) => state.courses);
export const selectCount = createSelector(selectCourses, (courses) => courses.length);
export const selectHours = createSelector(selectCourses, (courses) =>
  courses.reduce((sum, course) => sum + course.hours, 0),
);
