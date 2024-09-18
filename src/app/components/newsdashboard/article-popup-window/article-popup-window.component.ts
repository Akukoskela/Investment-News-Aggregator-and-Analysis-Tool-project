import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { checkPolarity } from 'src/app/app.component';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-article-popup-window',
  standalone: true,
  imports: [MatButtonModule,MatTooltipModule,MatIconModule],
  templateUrl: './article-popup-window.component.html',
  styleUrl: './article-popup-window.component.css'
})

export class ArticlePopupWindowComponent {
  title:string='Haloo';
  imageURL:string='';
  content:string='';
  description:string='';
  sourceName:string='';
  publishedAt:string='';
  url:string='';
  polarity:number=0;
  imageNotAvailableImage = 'assets/no-image-available-image.jpg';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.imageURL = data.imageUrl;
    this.url = data.url;
    this.publishedAt = this.data.publishedAt;
    this.description = data.description;
    this.sourceName = data.sourceName;
    this.content = data.content;
    this.polarity = parseFloat(data.polarity);
  }
  showAlternativeImage(event: Event) {
    (event.target as HTMLImageElement).src = this.imageNotAvailableImage;
  }

  checkPolarity(polarity:number) {
    return checkPolarity(polarity);
  }
}
