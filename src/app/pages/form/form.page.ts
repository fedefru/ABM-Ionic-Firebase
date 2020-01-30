import { Component, OnInit } from '@angular/core';
import { FormService, FormI } from 'src/app/services/form.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  form: FormI = {
    nombre: 'Federico',
    apellido: 'Frutos',
    email: 'fru.federico@gmail.com',
    contrasenia: '12345',
    creado: new Date().getTime()
  }
  
  formId = null;

  constructor(private formservice: FormService, private route: ActivatedRoute,
     private loadingController: LoadingController,
     private nav: NavController) { }

  ngOnInit() {
    this.formId = this.route.snapshot.params['id'];
    if (this.formId) {
      this.loadForm();
    }
  }

  async loadForm() {
    const loading = await this.loadingController.create({
        message: 'Cargando Formulario..'
    });
    await loading.present();

    this.formservice.getFormu(this.formId).subscribe(res =>{
      loading.dismiss();
      this.form = res;
    });

  }

   async saveForm(){
    const loading = await this.loadingController.create({
      message: 'Guardando Formulario..'
      });
  await loading.present();

    if(this.formId){
      this.formservice.updateFormu(this.form, this.formId);
      this.nav.navigateBack('home');
      loading.dismiss();
    } else {
      this.formservice.addFormu(this.form).then(() =>{
        loading.dismiss();
        this.nav.navigateBack('home');
      });
      
    }
  }

}
