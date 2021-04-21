import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user/user';
import { AdminUsersService } from 'src/app/services/Admin/admin-users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-applied-for-card',
  templateUrl: './applied-for-card.component.html',
  styleUrls: ['./applied-for-card.component.css']
})
export class AppliedForCardComponent implements OnInit {
  closeResult: string;
  approveId : any;
  user: any;

  // elements: any = [
  //   {user_id: 1, name: 'Mark', dateOfbirth: 'Otto', email: '@mdo', phone_no: '9965326536'},
  //   {user_id: 2, name: 'Mark', dateOfbirth: 'Otto', email: '@mdo', phone_no: '9965326536'},
  //   {user_id: 3, name: 'Mark', dateOfbirth: 'Otto', email: '@mdo', phone_no: '9965326536'},
  // ];

  elements :any = [];
  cardD : any;
  headElements = ['User ID','Name','Email','Phone Number','Card Data','Action'];
  
  isDashBoard =false;
  role;
  adminObj;
  constructor(private modalService: NgbModal,
     private service : AdminUsersService,private toastr: ToastrService,private router : Router) { }

  ngOnInit(): void {
    debugger
    if(sessionStorage.length == 0){
      this.isDashBoard =true;
      this.router.navigateByUrl("");
    }else if(sessionStorage.length > 0 && sessionStorage.getItem('role') == "admin"){

      this.isDashBoard = false;
      this.role = "admin";
      this.adminObj = JSON.parse(sessionStorage.getItem('Admindata'));
      console.log("role :",this.role);

      this.refreshUserList();
    }else if(sessionStorage.length > 0 && sessionStorage.getItem("role") == "user"){
      this.isDashBoard = false;
      this.router.navigateByUrl("/AdminLogin");
    }
    
  }

  refreshUserList(){
    
    this.service.getAppliedUsers().subscribe((data : User[])=>{
      this.elements = data;
      // this.service.getCardDetails(data.userId)
      console.log(data);
    })

  }

  async openCardDetails(targetModal,user){
    
  await this.service.getCardDetails(user.user_id).subscribe( data =>{
      this.cardD = data;
  this.modalService.open(targetModal,{
    centered :true,
    backdrop: 'static',
    size :'1g'
  });
  document.getElementById('card_type').setAttribute('value',this.cardD.card_type);
    document.getElementById('aadhar').setAttribute('value',this.cardD.aadhar_no);
    document.getElementById('panCard').setAttribute('value',this.cardD.pan_card);
    });

  }
  
  openDetails(targetModal,user) {
    
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('user_id').setAttribute('value', user.user_id);
    document.getElementById('name').setAttribute('value', user.name);
    // document.getElementById('dateOfbirth').setAttribute('value', user.dateOfbirth);
    document.getElementById('email').setAttribute('value', user.email);
    document.getElementById('phone_no').setAttribute('value', user.phone_no);
    document.getElementById('address').setAttribute('value', user.address);
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

  // openApprove(targetModal, user) {
  //   this.approveId = user.user_id;
  //   this.modalService.open(targetModal, {
  //     backdrop: 'static',
  //     size: 'lg'
  //   });
  // }

  openApprove(id , user) {
    user.approved_by_admin = true;
    console.log(user);
    if (confirm('Are you sure to Approve this record ?') == true) {
      this.service.upDateUserDetail(id,user)
      .subscribe(x => {
        this.refreshUserList();
        this.toastr.warning("Successfully Approved");
      })
    }
  }

  // onApprove(){
  //   // Servicecode
  //   console.log(this.user)
  //   var id =this.user.user_id;
  //   this.user.approved_by_admin = true;
  //   this.service.upDateUserDetail(id,this.user).subscribe(res => {
      
  //     this.refreshUserList();
  //     this.toastr.info('successfully Approved')
  //   },
  //   err => { console.log(err); }
  // );
  // }
}