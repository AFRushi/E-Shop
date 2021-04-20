import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminUsersService } from 'src/app/services/Admin/admin-users.service';

import { UserServiceService } from 'src/app/services/User/user-service.service';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // cartItems: any = [
  //   { id: 1,productId: 1, productName: 'Test 1', qty: 4, price: 100 },
  //   { id: 2, productId: 3, productName: 'Test 3', qty: 5, price: 50 },
  //   { id: 3, productId: 2, productName: 'Test 2', qty: 3, price: 150 },
  //   { id: 4, productId: 4, productName: 'Test 4', qty: 2, price: 200 },
  // ];
  
  cartTotal = 0
  user : any;
  cartProduct : any;
  ImageUrl : any;
  approveByAdmin : any = false;
  CardData : any;
  noCardData = false;
  date : any;
  card_type: any;
  card_number :any;
  limit;
  balance;
  approveId;
  constructor(private router : Router, 
    private service : UserServiceService,
    private  cardService : AdminUsersService,private modalService: NgbModal) {}
    
  ngOnInit(): void {

    if(sessionStorage.length > 0){
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.approveByAdmin = this.user.approved_by_admin;
      console.log(this.user);
      this.refreshCart();
    }else{
      this.router.navigateByUrl("/Login");
    }
   
  }

  Delete(targetModal,item){
    
    this.approveId = item.product_id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  onDelete(){
    // Servicecode
    
    this.service.deleteFromcart(this.approveId).subscribe(res =>{
      if(res == "Deleted"){
        this.refreshCart();
        alert("Product is deleted from cart");
      }else{
        console.log("Failed Delete");
      }
     
    })
    this.modalService.dismissAll();
  }
  
  refreshCart(){
  
   this.service.getCartData(this.user.user_id).subscribe(data =>{
      console.log(data);
      if(data == "No Data"){
        this.cartProduct = null;
      }else{
        this.cartProduct = data;
        this.cartProduct.forEach(element => {
            element.product_image = "../../../../assets/"+element.product_image;
        });
        console.log(this.cartProduct.length);
        console.log(this.cartProduct);
      }

      this.cardService.getCardDetails(this.user.user_id).subscribe(data =>{
        
        this.CardData = data;
        if(this.CardData == "No Card Details"){
          
          this.noCardData = true;
        }else{
          this.date = new Date (this.CardData.valid_till);
          this.date= this.date.getMonth() +"/" + this.date.getFullYear();
          this.card_type = this.CardData.card_type;
          this.card_number = this.CardData.card_number;
          this.limit =  this.CardData.limit;
          this.balance = this.CardData.balance;
        }
        console.log("Card_name",this.CardData.card_number);
        console.log(this.CardData);
      })
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
  
  PayThecharges(){
    alert("EMI Card is Being Processed");
  }
}