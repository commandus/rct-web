import { Component } from '@angular/core';
import { WebappService } from '../webapp.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clean-all',
  templateUrl: './clean-all.component.html',
  styleUrls: ['./clean-all.component.css']
})
export class CleanAllComponent {

  constructor(
    public app: WebappService, 
    private router: Router,
    private snackbar: MatSnackBar
  ) { 
  }

  clean() {
    this.app.clean().then( v => {
      const snack = this.snackbar.open('Поздравления все удалено', 'Вернуться в начало', {duration: 10000});
      snack.onAction().subscribe(() => {
        this.back();
      });
    });
  }

  back() {
    this.router.navigateByUrl('');
  }
}
