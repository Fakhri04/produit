import { ProductModel } from './../product-model.model';
import { ProductService } from './product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  editForm=false;
  produit_data :ProductModel[]=[];
  myProduct: ProductModel={
    nom:'',
    prix_unit: 0,
    qte : 0,
   }
   closeResult = '';
   filterTerm: string;

   open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
 }

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  constructor(private service:ProductService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.gettProduit();
  }

  gettProduit() {
    this.service.getAll().subscribe((
      res:ProductModel[])=>{
        this.produit_data=res;
      });
    }
    persist(){
      this.service.persist(this.myProduct)
          .subscribe((data)=>{
            this.produit_data=[data, ...this.produit_data];
            this.gettProduit();
            
            
          })
    }
    delete(id){
      console.log(id)
      this.service.delete(id).subscribe((data)=>{
        console.log(data);
        this.gettProduit();
        
      })};

      update(produit){
        console.log(produit)
        this.service.update(produit).subscribe((data)=>{
          console.log(data);
          this.gettProduit();


          
        })};
        
        editProduct(product){
          this.myProduct=product
          this.editForm=true;
          

        }
      close(){
        this.editForm=false;
      }
    }
  
  