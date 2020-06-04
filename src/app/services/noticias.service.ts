import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Respuesta } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});
@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  
  topHeadlines = 0;
  categoriaActual = '';
  categoriaPage = 0;
  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>(query: string){
    
    query = `${apiUrl}${query}`
    return this.http.get<T>(query, {headers})
  }

  getTopHeadlines(){
    this.topHeadlines++;
    return this.ejecutarQuery<Respuesta>(`/top-headlines?country=co&page=${this.topHeadlines}`);
  }

  getTopHeadlinesCat(categoria: string){
    if (this.categoriaActual == categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<Respuesta>(`/top-headlines?country=co&category=${categoria}&${this.categoriaPage}`);
  }
}
