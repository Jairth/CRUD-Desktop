import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  freshnessList = ['Nuevo', 'Segunda Mano', 'Renovar']
  productForm !: FormGroup
  actionBtn:string = 'Save'

  constructor(
    private formBuilder:FormBuilder,
    private api:ApiService,
    private dialogRef:MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any 
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['', Validators.required],
      category : ['', Validators.required],
      freshness : ['', Validators.required],
      date : ['', Validators.required],
      price : ['', Validators.required],
      comment : ['', Validators.required]
    })

    if(this.editData) {
      this.actionBtn = 'Update'
      this.productForm.controls['productName'].setValue(this.editData.productName)
      this.productForm.controls['category'].setValue(this.editData.category)
      this.productForm.controls['date'].setValue(this.editData.date)
      this.productForm.controls['freshness'].setValue(this.editData.freshness)
      this.productForm.controls['price'].setValue(this.editData.price)
      this.productForm.controls['comment'].setValue(this.editData.comment)
    }
  }

  addProduct(){
    if(!this.editData) {
      if(this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe(
          {
            next:() => {
              alert('Producto agregado correctamente')
              this.productForm.reset()
              this.dialogRef.close('save')
            },
            error: () => {
              alert('Error al agregar el producto')
            }
          }
        )
      }
    } else {
      this.updateData()
    }
  }

  updateData() {
    this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res) => {
        alert('Producto actualizado correctamente!')
        this.productForm.reset()
        this.dialogRef.close('update')
      },
      error:() => {
        alert('Error al actualizar')
      }
    })
  }
}