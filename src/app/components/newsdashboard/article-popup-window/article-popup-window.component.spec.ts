import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePopupWindowComponent } from './article-popup-window.component';

describe('ArticlePopupWindowComponent', () => {
  let component: ArticlePopupWindowComponent;
  let fixture: ComponentFixture<ArticlePopupWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlePopupWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlePopupWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
