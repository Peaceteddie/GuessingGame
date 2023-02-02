import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  constructor(private dbservice: NgxIndexedDBService) {}

  total: number = 0;
  score: number = 0;
  numChoice: number = 4;

  current: any;
  choices: any[] = [];
  shuffled: any[] = [];
  allItems: any[] = [];

  shuffle = (array: any[]) =>
    [...Array(array.length)]
      .map((el, i) => Math.floor(Math.random() * i))
      .reduce((a, rv, i) => ([a[i], a[rv]] = [a[rv], a[i]]) && a, array);

  ngOnInit(): void {
    this.dbservice.getAll('cards').subscribe((list) => {
      this.shuffled = this.shuffle(list);
      this.allItems = list;
    });
  }

  PlayAnother() {
    if (this.total % this.allItems.length === 0 && this.total > 0) {
      this.shuffled = this.shuffle(this.shuffled);
    }

    this.current = this.shuffled[this.total % this.shuffled.length];
    this.choices = this.rndSelection(
      this.numChoice - 1,
      this.allItems,
      this.current['id']
    );
    this.choices.push(this.current);
    this.choices = this.shuffle(this.choices);
  }

  rndSelection(num: number, array: any[], avoid: number) {
    let selection: any[] = [];
    if (array.length < num) return selection;
    while (selection.length < num) {
      let rnd = Math.floor(Math.random() * array.length);
      if (array[rnd]['id'] === avoid) continue;
      selection.push(array[rnd]);
    }
    return selection;
  }

  onSelect(card: any) {
    if (card['name'] === this.current['name']) {
      this.score++;
      this.total++;

      this.PlayAnother();
    }
  }
}
