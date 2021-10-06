import {Component, OnInit} from '@angular/core';
import {NbaService} from "./services/nba.service";
import {NbaPlayer} from "./model/nbaPlayer";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Homework';
  textInfo = 'The project is to write a function that searches through NBA player heights' +
    'The task is to create an application that takes a single integer input.' +
    'and print a list of all pairs of players\n' +
    'whose height in inches adds up to the integer input to the application. If no\n' +
    'matches are found, the application will print "No matches found"'
  numb = 0;
  submitForm: boolean = false;
  nbaPlayers: NbaPlayer[] = [];
  h_inPlayer: NbaPlayer[] = [];
  mapNbaPlayers = new Map;
  integerForm = new FormGroup({
    numberP: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
  })

  constructor(private nbaService: NbaService) {
  }

  ngOnInit() {
    this.nbaService.getAllNbaPlayer().subscribe({
      next: data => {
        this.nbaPlayers = data.values;
      },
      error: error => {
        console.log("Error ", error);
      }
    })
  }


  findPairs() {
    if (this.integerForm.valid) {
      this.submitForm = true;
      this.mapNbaPlayers = new Map;
      let n = this.nbaPlayers.length
      var m = new Map;
      this.numb = this.integerForm.get("numberP")?.value;

      for (var i = 0; i < n; i++) {

        var h_in = parseInt(this.nbaPlayers[i].h_in, 10);
        var rem = this.numb - h_in;

        if (m.get(this.nbaPlayers[i].h_in)) {
          this.h_inPlayer = [].concat(m.get(this.nbaPlayers[i].h_in));
          this.h_inPlayer.push(this.nbaPlayers[i]);
          m.set(h_in.toString(), this.h_inPlayer);
        } else {
          const arr2 = []
          arr2.push(this.nbaPlayers[i])
          m.set((this.nbaPlayers[i].h_in), arr2);
        }
        if (m.get(rem.toString())) {
          var count = m.get(rem.toString()).length;
          for (var j = 0; j < count; j++) {
            this.mapNbaPlayers.set(m.get(rem.toString())[j].first_name + " " + m.get(rem.toString())[j].last_name, this.nbaPlayers[i].first_name + " " + this.nbaPlayers[i].last_name);
          }
        }
      }

    } else {
      this.submitForm = false;
    }

  }

}
