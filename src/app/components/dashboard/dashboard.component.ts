import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule,MatToolbarModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  articles: any;
  industryName: any;
  constructor(private supabaseService: SupabaseService, private route: ActivatedRoute) { }

  async ngOnInit(){
    this.route.params.subscribe(params => {
      this.industryName = params['industryName'];
    });
    await this.getNews();
  }
  
  async getNews() {
    this.articles = await this.supabaseService.getData(this.industryName);
  }
}
