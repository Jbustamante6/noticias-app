import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Article[] = []
  constructor(private storage: Storage) { }

  guardarNoticias(noticia:Article){

    const existe = this.noticias.find( noti => noti.title === noticia.title )
    if(!existe){
      this.noticias.unshift(noticia);
      this.storage.set('noticias', this.noticias);
    }
  }

  async cargarNoticias(){
    const noticias = await this.storage.get('noticias');
    console.log(noticias);
    if(noticias){
      this.noticias = noticias;
    }
  }

  borrarNoticia(noticia:Article){
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this.storage.set('noticias', this.noticias);
  }
  
}
