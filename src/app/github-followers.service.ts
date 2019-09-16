import { Injectable } from '@angular/core';
import { DataService } from "./services/data.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class GithubFollowersService extends DataService {

  constructor(httpClient: HttpClient) {
    super("https://api.github.com/users/mosh-hamedani/followers", httpClient)
  }

}
