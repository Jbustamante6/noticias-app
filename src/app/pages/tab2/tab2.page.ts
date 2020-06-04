import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  
  @ViewChild(IonSegment, {static:true}) segment:IonSegment;
  
  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias:Article[] = [];
  
  constructor( private ns: NoticiasService) {}

  ngOnInit(){
    this.segment.value = this.categorias[0];
    this.cargaNoticias(this.categorias[0]);
  }

  cambioCat(e){
    this.noticias = [];
    this.cargaNoticias(e.detail.value);

  }

  cargaNoticias( categoria:string, e? ){
    
    this.ns.getTopHeadlinesCat(categoria).subscribe( resp => {
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

  loadData(e){
    this.cargaNoticias(this.segment.value, e)
  }
}
