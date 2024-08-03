import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl = 'http://127.0.0.1:8000'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Example method to make a GET request to the backend API
  getData(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/data`)
      .pipe(catchError(this.handleError));
  }

  // Example method to make a POST request to the backend API
  initiateChatBot(bookId: number): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/chatbot/start/${bookId}`, null)
      .pipe(catchError(this.handleError));
  }

  ChatWithChatBot(userInput: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/chatbot/chat/${bookId}`, null)
      .pipe(catchError(this.handleError));
  }
  // Add more methods for other API calls as needed

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
