import { Component, OnInit } from '@angular/core';
import { FormI,FormService } from '../services/form.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  form: FormI[]; 

  constructor(private formService: FormService){ }

  ngOnInit() {
    this.formService.getFormus().subscribe( res => {
      this.form = res;
    });
  }

  remove(formu){
    this.formService.removeFormu(formu.id);
  }
}
