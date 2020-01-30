
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface FormI {
    nombre: string;
    apellido: string;
    email: string;
    contrasenia: string;
    creado:number;
}

@Injectable({
    providedIn: 'root' 
})

export class FormService {

    private formCollection: AngularFirestoreCollection<FormI>;

    private formulario: Observable<FormI[]>; 

    constructor(db: AngularFirestore) {
        
        this.formCollection = db.collection<FormI>('formulario');

        this.formulario = this.formCollection.snapshotChanges().pipe(
            map(actions  => {
                return actions.map( a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id, ...data };
                });
            })
        );
     }

     getFormus() {
         return this.formulario;
     }
    
     getFormu(id) {
        return this.formCollection.doc<FormI>(id).valueChanges();
    }

    updateFormu(formu: FormI, id: string){
        return this.formCollection.doc(id).update(formu);
    }

    addFormu(formu: FormI){
        return this.formCollection.add(formu);
    }

    removeFormu(id){
        return this.formCollection.doc(id).delete();
    }
}