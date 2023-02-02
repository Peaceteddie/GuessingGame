import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxIndexedDBModule, NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  constructor(
    private dbService: NgxIndexedDBService,
    private formBuilder: FormBuilder
  ) {}

  addForm = this.formBuilder.group({
    name: '',
    url: '',
  });

  Items: any[] = [];

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll() {
    this.dbService.getAll('cards').subscribe((list) => (this.Items = list));
  }

  Delete(id: number) {
    this.dbService.deleteByKey('cards', id).subscribe(() => this.GetAll());
  }

  onSubmit() {
    this.dbService
      .add('cards', {
        name: this.addForm.value['name'],
        url: this.addForm.value['url'],
      })
      .subscribe(() => this.GetAll());
    this.addForm.reset();
  }
}
