import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  
  @Input() noticia:Article;
  @Input() idx:number;
  @Input() enFav;

  constructor(  private iab: InAppBrowser, 
                private actionSheetController: ActionSheetController,
                private socialSharing: SocialSharing,
                private dl:DataLocalService,
                private toastController: ToastController,
                private platform: Platform) { }

  ngOnInit() {}
  
  abrirNoticia(){
    const browser = this.iab.create(this.noticia.url, "_system");
  }

  async lanzarMenu(){
    let button;

    if(this.enFav){
      button = {
        text: 'Borrar en favoritos',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dl.borrarNoticia(this.noticia);
          this.presentToast('Se ha eliminado el elemento de favoritos');
        }
      };
    }else{
      button = {
        text: 'Guardar en favoritos',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          this.dl.guardarNoticias(this.noticia);
          this.presentToast('Se ha añadido el elemento a favoritos')
        }
      };
    }
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            this.compartirNoticia();
          }
        },  
        button,
        {
          text: 'Cancelar',
          icon: 'close',
          cssClass: 'action-dark',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    await actionSheet.present();
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  compartirNoticia(){

    if(this.platform.is('cordova')){
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      )
    }else{
      if (navigator['share']) {
        navigator['share']({
          title: this.noticia.title,
          text: this.noticia.source.name,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }else{
        console.log('Error navegador');
      }
    }
    
  }
}
