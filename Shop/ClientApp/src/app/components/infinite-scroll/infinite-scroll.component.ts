import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-infinite-scroll',
    templateUrl: './infinite-scroll.component.html',
    styleUrls: ['./infinite-scroll.component.css']
})
export class InfiniteScrollComponent implements OnInit {

  
  private finishPage = 5;
  private actualPage: number;

  private showGoUpButton: boolean;
  private linesToWrite: Array<string>;
  showScrollHeight = 400;
  private hideScrollHeight = 200;
  private constructor() { this.actualPage = 1; this.showGoUpButton = false;}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }
  ngOnInit() {
    this.linesToWrite = new Array<string>();
    this.add40lines();
  }

 
  scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }
  add40lines() {
    const line = 'Another new line -- ';
    let lineCounter = this.linesToWrite.length;
    for (let i = 0; i < 40; i++) {
      this.linesToWrite.push(line + lineCounter);
      lineCounter++;
    }
  }

  onScroll() {
    if (this.actualPage < this.finishPage) {
      this.add40lines();
      this.actualPage++;
    } else {
      console.log('No more lines. Finish page!');
    }
  }
}
