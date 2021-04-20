import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user/user';
import { AdminUsersService } from 'src/app/services/Admin/admin-users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-approved-users',
  templateUrl: './approved-users.component.html',
  styleUrls: ['./approved-users.component.css']
})
export class ApprovedUsersComponent implements OnInit {
  userForm: FormGroup;
  closeResult: string;
  approveId : any;
  user: any;

  // elements: any = [
  //   {user_id: 1, name: 'Mark', dateOfbirth: 'Otto', email: '@mdo', phone_no: '9965326536'},
  //   {user_id: 2, name: 'Mark', dateOfbirth: 'Otto', email: '@mdo', phone_no: '9965326536'},
  //   {user_id: 3, name: 'Mark', dateOfbirth: 'Otto', email: '@mdo', phone_no: '9965326536'},
  // ];
elements : User [] =[];
emiCard : any [] = [];
cardD :any;
  headElements = ['User ID','Name','Email','Phone Number','Card Details','Edit','Action'];
  isDashBoard =false;
  role;
  adminObj;
  constructor(private modalService: NgbModal, 
    private service : AdminUsersService,private router : Router,private toastr: ToastrService,
    private fb: FormBuilder) {
      this.userForm = new FormGroup({
        user_id:  new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        phone_no : new FormControl('', [Validators.required]),
        address:  new FormControl('', [Validators.required]),
        username : new FormControl('', [Validators.required]),
        password:  new FormControl('', [Validators.required]),
        applied_for_card: new FormControl('', [Validators.required]),
        approved_by_admin : new FormControl('', [Validators.required]),
        paid_emi_card_charges: new FormControl('', [Validators.required]),
      });
     }

  ngOnInit(): void {

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

    this.refreshUserList();
  }
  refreshUserList(){
    this.service.getApprovedUsers().subscribe((data : User[])=>{
      this.elements = data;
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
  document.getElementById('card_number').setAttribute('value',this.cardD.card_number);
  let date = new Date( this.cardD.valid_till);
    document.getElementById('card_type').setAttribute('value',this.cardD.card_type);
  document.getElementById('valid_till').setAttribute('value',date.toDateString());
    document.getElementById('card_limit').setAttribute('value',this.cardD.limit);
    document.getElementById('balance').setAttribute('value',this.cardD.balance);
    });

  }
  openDetails(targetModal,user) {
    
    const modalRef = this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('user_id').setAttribute('value', user.user_id);
    document.getElementById('name').setAttribute('value', user.name);
    document.getElementById('address').setAttribute('value', user.address);
    document.getElementById('email').setAttribute('value', user.email);
    document.getElementById('phone_no').setAttribute('value', user.phone_no);
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

  onUserDelete(targetModal, user) {
    this.approveId = user.user_id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  onDelete(){
    // Servicecode
    this.service.deleteUser(this.approveId).subscribe(res =>{
      this.refreshUserList();
      this.toastr.info("User Deleted");
    })
    this.modalService.dismissAll();
  }

//   openCardDetails(targetModal,user){
//     this.modalService.open(targetModal, {
//       centered: true,
//       backdrop: 'static',
//       size: 'lg'
//     });
//     document.getElementById('user_id').setAttribute('value','CardDetails Will go here');
//     document.getElementById('name').setAttribute('value', user.name);
//     document.getElementById('address').setAttribute('value', user.address);
//     document.getElementById('email').setAttribute('value', user.email);
//     document.getElementById('phone_no').setAttribute('value', user.phone_no);
//  }

 openEditDetails(targetModal,user){
  const modalRef = this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
  // this.userForm = user;
  this.userForm.controls['user_id'].setValue(user.user_id);
  this.userForm.controls['name'].setValue(user.name);
  this.userForm.controls['address'].setValue(user.address);
  this.userForm.controls['email'].setValue(user.email);
  this.userForm.controls['phone_no'].setValue(user.phone_no);
  this.userForm.controls['username'].setValue(user.username);
  this.userForm.controls['password'].setValue(user.password);
  this.userForm.controls['applied_for_card'].setValue(user.applied_for_card);
  this.userForm.controls['approved_by_admin'].setValue(user.approved_by_admin);
  this.userForm.controls['paid_emi_card_charges'].setValue(user.paid_emi_card_charges);
  modalRef.result.then((result) => {
    console.log(result);
  }, (reason) => {
  });
  // document.getElementById('user_id').setAttribute('value','CardDetails Will go here');
  //   document.getElementById('name').setAttribute('value', user.name);
  //   document.getElementById('address').setAttribute('value', user.address);
  //   document.getElementById('email').setAttribute('value', user.email);
  //   document.getElementById('phone_no').setAttribute('value', user.phone_no);
 }

 EditSubmit(userData){
  console.log(userData.value);
    if (confirm('Are you sure to Update this record ?') == true) {
      // userData.value.applied_for_card = true
      this.service.upDateUserDetail(userData.value.user_id,userData.value)
      .subscribe(x => {
        this.refreshUserList();
        this.toastr.warning("Successfully Updated");
      });
    }
    this.modalService.dismissAll();
 }
  
}