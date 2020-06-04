import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  noticias:Article[] = [];
  constructor( private ns:NoticiasService) {

  }

  ngOnInit(){
    this.cargarNoticias();
  }

  loadData(e){
    this.cargarNoticias(e);
  }

  cargarNoticias(e?){
    this.ns.getTopHeadlines().subscribe( resp => {
      if(resp.articles.length == 0){
        e.target.disabled = true;
        e.target.complete();
        return;
      }
      this.noticias.push(...resp.articles);
      if(e){
        e.target.complete();
      }
    })
  }
}
