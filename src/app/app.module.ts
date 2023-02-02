import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { GamesComponent } from './games/games.component';
import { EditorComponent } from './editor/editor.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const dbConfig: DBConfig = {
  name: 'library',
  version: 1,
  objectStoresMeta: [
    {
      store: 'cards',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'url', keypath: 'url', options: { unique: false } },
      ],
    },
  ],
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GamesComponent,
    EditorComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
