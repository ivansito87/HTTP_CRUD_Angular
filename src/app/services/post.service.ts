import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
// import "rxjs/add/operator/catch";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppError } from "../common/app-error";
import { NotFoundError } from "../common/not-found-error";
import { BadInput } from "../common/bad-input";


@Injectable({
  providedIn: 'root'
})

export class PostService {
  private baseUrl = "https://jsonplaceholder.typicode.com/posts";

  constructor(private httpClient: HttpClient) {
  }

  get_products() {
    return this.httpClient.get(this.baseUrl);
  }

  httpCreatePost(post) {
    return this.httpClient.post(this.baseUrl, JSON.stringify(post)).pipe(
      catchError(err => {
        if (err.status === 404) {
          return throwError(new BadInput(err.json()))
        }
        return throwError(new AppError(err.json()))
      })
    )
  }

  updatePost(id) {
    return this.httpClient.patch(`${this.baseUrl}/${id}`, JSON.stringify({isRead: true}));
  }

  deletePost(id) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(err => {
        if (err.status === 404) {
          return throwError(new NotFoundError())
        }
        return throwError(new AppError(err.json()))
      })
    )

  }

}
