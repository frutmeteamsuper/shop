import { Component, OnInit } from '@angular/core';

import { messageData, activities, tasks, projectData } from './data';

import { Message, Activity, Tasks, List } from './orderdetail.model';
import { DataApiService } from '../../../core/services/data-api.service';
import { UserWService } from "../../../core/services/user-w.service";
import { OrderInterface } from '../../../core/models/order-interface'
import { ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss']
})
/**
 * Profile-component - handling profile with sidenav-content
 */
export class OrderdetailComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  messageData: Message[];
  activities: Activity[];
  tasks: Tasks[];
  projectData: List[];

  constructor(
    private dataApi: DataApiService,
    public _uw:UserWService,
    private location: Location,
    private route:ActivatedRoute,
    private router: Router
    ) { }

    // public activate(){
    // this.dentist.status="activated";
    //   return this.dataApi.updateDentist(this.dentist, this.route.snapshot.paramMap.get('id'))
    //     .subscribe(
    //         dentist => this.router.navigate(['/dentists'])
    //     );
    // }


public order : OrderInterface ={
    // address:"",
    // collegeN:"",
    // clinicName:"",
    // images:[],
    // name:"",
    // password:"",
    // phone:"",
    // status:"",
    // specialty:"",
    // specs:[],
    // surname:"",
    // userd:"",
    // username:"",
    // usertype:""
  };
    public orders:OrderInterface;  

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Shreyu', path: '/' }, { label: 'Pages', path: '/' }, { label: 'Profile', active: true }];
 this._fetchData();
    this.getOrder(this.route.snapshot.paramMap.get('id'));

  }
  
  getOrder(id: string){
    this.dataApi.getOrderById(id).subscribe(order => (this.order = order)); 
  }

  /**
   * Fetches the data
   */
  private _fetchData() {
    this.messageData = messageData;
    this.activities = activities;
    this.tasks = tasks;
    this.projectData = projectData;
  }
}
