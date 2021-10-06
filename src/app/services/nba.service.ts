import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NbaPlayer} from "../model/nbaPlayer";

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  private urlApi = "https://mach-eight.uc.r.appspot.com/";
  constructor(private http: HttpClient) { }

  getAllNbaPlayer(): Observable<SearchResults>{
    return this.http.get<SearchResults>(this.urlApi);
  }

}

interface SearchResults {
  total: number;
  values: Array<NbaPlayer>;
}
