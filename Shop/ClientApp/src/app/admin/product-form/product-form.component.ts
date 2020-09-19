import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { AdminService } from '../../services/admin-service.service';
import { error } from 'protractor';
import { ToastrService } from 'ngx-toastr';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public helpTextImg: boolean = false;
  productForm = new FormGroup({
    name: new FormControl(''),
    amount: new FormControl(0),
    description: new FormControl(''),
    price: new FormControl(0),
    Image: this.formBuilder.array([]),
  });
  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private toastr: ToastrService) {
    //Allows bootstrap carousels to display 3 items per page rather than just one
    $('.carousel.carousel-multi .item').each(function () {
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().attr("aria-hidden", "true").appendTo($(this));

      if (next.next().length > 0) {
        next.next().children(':first-child').clone().attr("aria-hidden", "true").appendTo($(this));
      }
      else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
      }
    });
  }

  ngOnInit(): void {
  }

  get Image(): FormArray {
    return this.productForm.get('Image') as FormArray;
  };
  detectFiles(event) {
    let files = event.target.files;
    if (event.target.files.length > 3) {
      this.helpTextImg = true;
      return 0;
    }
    if (files) {
      while (0 !== this.Image.length) {
        this.Image.removeAt(0);
      }
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.Image.push(this.createItem({
            Content: e.target.result  //Base64 string for preview image
          }));
        }
        reader.readAsDataURL(file);
      }
      this.helpTextImg = false;
    }
  }
  createItem(data): FormGroup {
    return this.formBuilder.group(data);
  }

  onSubmit() {
    this.adminService.setProduct(this.productForm.value).subscribe(
      response => { this.toastr.success('Nuevo Producto', "Producto creado con éxito");},
      error => { this.toastr.error('ERROR!', error)}

    );
  }
}
