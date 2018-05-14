import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseCredentials } from './firebase-credentials.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  loadedFeatured = 'recipe';

  constructor(private firebaseCredentials: FirebaseCredentials) {}

  ngOnInit () {
    firebase.initializeApp(this.firebaseCredentials.credentials);
  }

  onNavigate(feature: string) {
    this.loadedFeatured = feature;
  }
}
