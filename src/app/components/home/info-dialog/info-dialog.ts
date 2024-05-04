import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { HomeComponent } from "../home.component";
@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: './info-dialog.html',
    styleUrls: ['./info-dialog.css'],
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, HomeComponent],
  })
  export class InfoDialog {
    newsTitle: any;
    newsImage: any;
    newsUrl: any;
    newsDate: any;
    newsDescription: any;
    sourceName: any;
    newsContent: any;

    constructor() {
       
    }

    formatDate(dateStr: any) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
      }
  }