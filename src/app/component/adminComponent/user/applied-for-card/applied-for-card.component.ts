import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user/user';
import { AdminUsersService } from 'src/app/services/Admin/admin-users.service';
import { ToastrService } from 'ngx-toastr';
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

  elements : User [] = [];
  headElements = ['User ID','Name','Email','Phone Number','Address','Action'];
  

  constructor(private modalService: NgbModal, private service : AdminUsersService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshUserList();
  }

  refreshUserList(){
    this.service.getAppliedUsers().subscribe((data : User[])=>{
      this.elements = data;
      console.log(data);
    })
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
