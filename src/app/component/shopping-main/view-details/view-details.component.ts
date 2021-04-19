import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
//import {ProductModelServer} from "../../../models/product";
import {map} from "rxjs/operators";
import {CartService} from "../../../services/cart.service";
import { MessengerService } from 'src/app/services/messenger.service';
import { Product } from 'src/app/models/user/product';
import { UserServiceService } from 'src/app/services/User/user-service.service';


declare let $: any;

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements  OnInit {
  // AfterViewInit,
  productItem;
  imageUrl : any ;
  user :any
  disableBuy= false;
  constructor(
    private productService: ProductService,
    private service : UserServiceService,private router:ActivatedRoute,private router1 : Router) { }
    
    ngOnInit(){
      // this.msgService.getProduct().subscribe( (item : Product)=>{
        
      //   console.log(item);
      // });

      if(sessionStorage.length > 0){
        this.getProductDetails();
        this.user = JSON.parse(sessionStorage.getItem("user"));
        console.log(this.user);
        if(this.user.approved_by_admin == false){
          this.disableBuy = true;
        }
      }else{
        this.router1.navigateByUrl("/Login");
        this.disableBuy = true;
      }
      
      
    }

    async getProductDetails(){
      
      console.log(this.router.snapshot.params['productid']);
     var result = false;
      await this.productService.getProductById(this.router.snapshot.params['productid']).subscribe((data) =>{
      this.productItem = data;
        console.log(data);
        this.imageUrl = "../../../../assets/"+ this.productItem.product_image;
        console.log(this.imageUrl)
      });
      
      // if(result){
      //   this.imageUrl = "../../../../assets/"+ this.productItem.product_image;
      //   console.log(this.imageUrl)
      // }
     
    }

    handleAddToCart(){
      // this.msg.senMsg(this.productItem);
      try{
        this.user = JSON.parse(sessionStorage.getItem('user'));
          
        console.log("User Id:",this.user.user_id,"Product ID:",this.productItem.product_id);
          this.service.addToCart(this.user.user_id,this.productItem.product_id).subscribe(data =>{
              if(data == "Success"){
                  alert("Successfully addded to cart");
              }else{
                  alert("Network Problems");
              }
           });
          
  
          }catch(error){
          console.error(error);
        
          }
    }
  // ngOnInit(): void {

  //   this.msgService.getProduct().subscribe((product : Product) =>{
  //     console.log(product);
  //     // this.productItem = product;
  //     console.log(this.productItem);
  //   });
    // this.route.paramMap.pipe(
    //   map((param: ParamMap) => {
    //     // @ts-ignore
    //     return param.params.id;
    //   })
    // )/*.subscribe(prodId => {
    //   this.id = prodId;
    //   this.productService.getSingleProduct(this.id).subscribe(prod => {
    //     this.product = prod;
    //     if (prod.images !== null) {
    //       this.thumbimages = prod.images.split(';');
    //     }

    //   });
    // });*/
    
  // }

  // ngAfterViewInit(): void {

  //   // Product Main img Slick
  //   $('#product-main-img').slick({
  //     infinite: true,
  //     speed: 300,
  //     dots: false,
  //     arrows: true,
  //     fade: true,
  //     asNavFor: '#product-imgs',
  //   });

  //   // Product imgs Slick
  //   $('#product-imgs').slick({
  //     slidesToShow: 3,
  //     slidesToScroll: 1,
  //     arrows: true,
  //     centerMode: true,
  //     focusOnSelect: true,
  //     centerPadding: 0,
  //     vertical: true,
  //     asNavFor: '#product-main-img',
  //     responsive: [{
  //       breakpoint: 991,
  //       settings: {
  //         vertical: false,
  //         arrows: false,
  //         dots: true,
  //       }
  //     },
  //     ]
  //   });

  //   // Product img zoom
  //   var zoomMainProduct = document.getElementById('product-main-img');
  //   if (zoomMainProduct) {
  //     $('#product-main-img .product-preview').zoom();
  //   }
  // }


  /*addToCart(id: Number) {
    this.cartService.AddProductToCart(id, this.quantityInput.nativeElement.value);
  }

  Increase() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity >= 1){
      value++;

      if (value > this.product.quantity) {
        // @ts-ignore
        value = this.product.quantity;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  Decrease() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity > 0){
      value--;

      if (value <= 0) {
        // @ts-ignore
        value = 0;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }*/
}
