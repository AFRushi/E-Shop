import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-applied-for-card',
  templateUrl: './applied-for-card.component.html',
  styleUrls: ['./applied-for-card.component.css']
})
export class AppliedForCardComponent implements OnInit {
  closeResult: string;
  approveId : any;
  user: any;

  elements: any = [
    {user_id: 1, name: 'Mark', dateOfbirth: 'Otto', email: '@mdo', phone_no: '9965326536'},
    {user_id: 2, name: 'Mark', dateOfbirth: 'Otto', email: '@mdo', phone_no: '9965326536'},
    {user_id: 3, name: 'Mark', dateOfbirth: 'Otto', email: '@mdo', phone_no: '9965326536'},
  ];

  headElements = ['User ID','Name', 'D.O.B','Email','Phone Number','Action'];
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

 
  openDetails(targetModal,user) {
    
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('user_id').setAttribute('value', user.user_id);
    document.getElementById('name').setAttribute('value', user.name);
    document.getElementById('dateOfbirth').setAttribute('value', user.dateOfbirth);
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

  openApprove(targetModal, user) {
    this.approveId = user.user_id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onApprove(){
    // Servicecode
  }
}
