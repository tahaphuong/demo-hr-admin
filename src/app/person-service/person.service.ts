import { Injectable } from '@angular/core';
import { Person } from '../Person';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private peopleUrl = 'http://localhost:3000/people';

  httpOptions = {
    headers: new HttpHeaders().set('Accept','application/json')
  };

  constructor(private http: HttpClient) { }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.peopleUrl, this.httpOptions)
    .pipe(
      catchError((err) => of(err))
    )
  }

  getPerson(id: number): Observable<Person> {
    const url = `${this.peopleUrl}/${id}`;
    return this.http.get<Person>(url).pipe(
      catchError(this.handleError<Person>(`getPerson id=${id}`))
    );
  }

  updatePerson(person: Person): Observable<any> {
    return this.http.put(this.peopleUrl, person, this.httpOptions).pipe(
      catchError(this.handleError<any>('updatePerson'))
    );
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.peopleUrl, person, this.httpOptions).pipe(
      catchError(this.handleError<Person>('addPerson'))
    );
  }

  deletePerson(id: number) {
    console.log("id", id)
    const url = `${this.peopleUrl}/${id}`;
    console.log(url)
    return this.http.delete(url).pipe(
      catchError(this.handleError<Person>('deletePerson'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' ' + error);
      return of(result as T);
    };
  }
    
}
