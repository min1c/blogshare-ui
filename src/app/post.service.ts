import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Post } from './post';
import { Comment } from './comment';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl = 'api/v1/post';  // URL to web api
  private commentsUrl = 'api/v1/comment';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getPosts(): Observable<Post[]> {
    let params = new HttpParams().set("getComments", 'true');

    console.log(params);

    return this.http.get<Post[]>(this.postsUrl, { params: params })
      .pipe(
        tap(heroes => this.log('fetched posts')),
        catchError(this.handleError('getPosts', []))
      );
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    let params = new HttpParams().set("getComments", 'true');
    return this.http.get<Post>(url, { params : params});
  }

  postComment(comment: Comment): Observable<Comment> {
    const url = `${this.commentsUrl}`;
    
    return this.http.post<Comment>(url, comment, httpOptions);
  }

  deleteComment(id: number): Observable<Comment> {
    const url = `${this.commentsUrl}/${id}`;
    return this.http.delete<Comment>(url);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('PostService: ' + message);
  }
}
