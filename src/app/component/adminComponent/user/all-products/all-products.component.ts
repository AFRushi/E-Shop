import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { sequenceEqual } from 'rxjs/operators';
import { Product } from 'src/app/models/user/product';
import { AdminUsersService } from 'src/app/services/Admin/admin-users.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

//   products: any = [
//     {product_id:'1',product_name:'Realme Narzo 20',color:'Glory Silver',smallDesc:'4 GB RAM 64 GB ROM Expandable Upto 256 GB16.56 cm (6.52 inch) HD+ Display 48MP + 8MP + 2MP  8MP Front Camera  6000 mAh Lithium-ion Battery MediaTek Helio G85 Processor',price:'10499',qty:'35',imgUrl:'src/assets/ProductsImage/1_SmartPhone_realme-narzo-20.jpeg'}
// ,{product_id:'2',product_name:'Realme Narzo 20',color:'Glory Silver',smallDesc:'4 GB RAM 64 GB ROM Expandable Upto 256 GB16.56 cm (6.52 inch) HD+ Display 48MP + 8MP + 2MP  8MP Front Camera  6000 mAh Lithium-ion Battery MediaTek Helio G85 Processor',price:'10499',qty:'35',imgUrl:'src/assets/ProductsImage/1_SmartPhone_realme-narzo-20.jpeg'}  
//   ];

  productsHeader = ['Product ID','Product Img','Product Name', 'Color','Description','Price','Action'];
  approveId : any;
  products :Product[];
  ImageUrls : string[];
  isDashBoard =false;
  role;
  adminObj
  constructor(private service : ProductService, 
    private modalService : NgbModal,private router : Router,private adminService : AdminUsersService) { }

  ngOnInit(): void {

    if(sessionStorage.length == 0){
      this.isDashBoard =true;
      this.router.navigateByUrl("");
    }else if(sessionStorage.length > 0 && sessionStorage.getItem('role') == "admin"){

      this.isDashBoard = false;
      this.role = "admin";
      this.adminObj = JSON.parse(sessionStorage.getItem('Admindata'));
      console.log("role :",this.role);

      this.refreshList();
    }else if(sessionStorage.length > 0 && sessionStorage.getItem("role") == "user"){
      this.isDashBoard = false;
      this.router.navigateByUrl("/AdminLogin");
    }
    
  }

  refreshList(){
    
    this.service.getAllProducts().subscribe((data : Product[]) =>{
      this.products = data;
      console.log("Before:",this.products);

      this.products.forEach(element => {
        element.product_image = "../../../../../assets/"+element.product_image;

        console.log("Element:",element);
      });
      console.log("After:",this.products);
    })
  }

  openDetails(targetModal,product) {
    
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });

    document.getElementById('product_name').setAttribute('value', product.product_name);
    document.getElementById('product_color').setAttribute('value', product.product_color);
    // document.getElementById('dateOfbirth').setAttribute('value', user.dateOfbirth);
    document.getElementById('product_price').setAttribute('value', product.product_price);
    document.getElementById('product_desc').setAttribute('value', product.product_long_description);
 }

 onUserDelete(targetModal, user) {
  this.approveId = user.product_id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}
onDelete(){
  // Servicecode
  this.adminService.deleteProduct(this.approveId).subscribe(res =>{
    this.refreshList();
    // this.toastr.info("User Deleted");
  })
  this.modalService.dismissAll();
}
}