import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {

  private posts = [];
  private baseUrl = "https://jsonplaceholder.typicode.com/posts";

  constructor(private httpClient: HttpClient) {
  }

  get_products() {
    this.httpClient.get(this.baseUrl)
      .subscribe((response: any[]) => {
        this.posts = response;
        console.log(this.posts);
      });
  }

  // similar to component did mount
  ngOnInit() {
    this.httpClient.get(this.baseUrl)
      .subscribe((response: any[]) => {
        this.posts = response;
        console.log(this.posts);
      });


  }

  createPost(inputElement: HTMLInputElement) {
    let post = {title: inputElement.value};
    inputElement.value = "";
    this.httpClient.post(this.baseUrl, JSON.stringify(post))
      .subscribe((response: any) => {
        post['id'] = response.id;
        this.posts.splice(0, 0, post);
        console.log("response", response);
      });
  }
}

