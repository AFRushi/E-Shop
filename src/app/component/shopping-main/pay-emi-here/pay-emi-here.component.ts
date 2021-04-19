
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';


import { UserServiceService } from 'src/app/services/User/user-service.service';

@Component({
  selector: 'app-pay-emi-here',
  templateUrl: './pay-emi-here.component.html',
  styleUrls: ['./pay-emi-here.component.css']
})
export class PayEmiHereComponent implements OnInit {

   user;
   emiData;
   products;
   noOfDueDaysRemaining;
   DueDate;
   disablePay = true;
  constructor(private router : Router, private userService : UserServiceService) { }

  ngOnInit(): void {

    if(sessionStorage.length > 0){
      this.user = JSON.parse(sessionStorage.getItem('user'));
      console.log('user',this.user);
      this.refreshPayNow();
     
    }else{
      this.router.navigateByUrl("/Login");
    }

  }

  refreshPayNow(){
    debugger
      this.userService.getPayingEMIDetails(this.user.user_id).subscribe(res =>{
         
        
          if(res == "No Card Details"){
            alert("No Products");

          }else{
            this.calculateNextDueDate(res.EMI);
            this.emiData = res.EMI;
            this.products = res.Product;
       
         console.log("Response Data:", res);
         console.log("EMIDATA :",this.emiData);
         console.log("Products :",this.products);
 
         for(var i = 0 ;  i< this.emiData.length; i++){
           for(var j=0; j< this.products.length; j++){
 
             if(this.emiData[i].product_id == this.products[j].product_id){
               this.emiData[i]["product_name"] = this.products[j].product_name;
               this.emiData[i]["product_price"] = this.products[j].product_price;
               break;
             }
 
           }
         }
         console.log("After Loop EMi Data:", this.emiData);
          }
           
      })
  }

  calculateNextDueDate(emi){

      emi.forEach(element => {
        
        let period = element.emi_period;
        let startDate = element.start_date;
        let endDate = element.end_date;
        var nextDeuDate;
        // this.noOfDueDaysRemaining = 0;
        var currentDate = moment(new Date());

        console.log("Period",period);
        console.log("StartDate",startDate);
        console.log("EndDate",endDate);
        console.log("Current",currentDate);
        startDate = moment(startDate).format("DD/MM/YYYY");
        let d = moment(currentDate, "DD/MM/YYYY").add(30, 'days')
        let e = moment(currentDate, "DD/MM/YYYY").add(30, 'd')
        let f = moment(currentDate, "DD/MM/YYYY").add(30, 'd').format("DD/MM/YYYY")
        let g = moment(startDate, "DD/MM/YYYY").add(30*2, 'days').format("DD/MM/YYYY")
        console.log(d);
        console.log(e);
        console.log(f);
        console.log(g);

        for(var i =1; i < period; i++){
          let days = 30 * i;
            nextDeuDate = moment(startDate ,"DD/MM/YYYY").add(days,'d');

            if( currentDate < nextDeuDate){
              this.noOfDueDaysRemaining = moment.duration(nextDeuDate.diff(currentDate)).asDays() ;
              this.DueDate = nextDeuDate;
              break
            }
        }
        console.log("noOfDueDaysRemaining",this.noOfDueDaysRemaining);
        console.log("DueDate",this.DueDate);

        if(this.DueDate == currentDate){
          this.disablePay = false;
        }
      });
  }

  PaySuccess(){
    alert("Payment Successfull");
  }

}
