import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { projectActivity, widgetData } from './data';
import { Activity, Widget } from './projectdetai.model';
import { DataApiService } from '../../../../core/services/data-api.service';
import { UserWService } from "../../../../core/services/user-w.service";
import { ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TixInterface } from '../../../../core/models/tix-interface'; 

import { CategoryInterface } from '../../../../core/models/category-interface';  
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.scss']
})

/**
 * Project-detail component - handling project-detail with sidebar and content
 */
export class ProjectdetailComponent implements OnInit {
   typesubmit: boolean;
  constructor(
      private dataApi: DataApiService,
      public _uw:UserWService,
      private location: Location,
      private formBuilder: FormBuilder,
      private route:ActivatedRoute,
      private router: Router
    ) { }
    subs = false;
    deleting = false;
    deletedMessage = false;
    loaded = false;
    selectedItems = [];
    dropdownList = [];
    dropdownSettings = {};
    selectedItems2 = [];
    dropdownList2 = [];
    dropdownSettings2 = {};
    categoriesList = {};
    addModules = false;
    uploading = false;
    editing = false;
    updating = false;
    buttonDisabled = false;
    newModuleTittle="";
    newModuleLink="";
    category="";
    subcategory="";
    newModuleDuration="";
    //ngFormUpdateTixData: FormGroup;
    typeValidationForm: FormGroup; // type validation form
    submit: boolean;
    public categoryStatus:any[]=[];
    public categoryStatus2:any[]=[];
    public tix:TixInterface ={
    tittle:"",
    description:"",    
    images:[],
    modules:[],
    costPrice:""
  };
    public categories:CategoryInterface ={}
    public tixs:TixInterface;
    projectActivity: Activity[];
    widgetData: Widget[];


 sendTix(tix){
      this.typesubmit = true;
      if (this.typeValidationForm.invalid) {
         this._uw.errorFormAddtixs=true;
      return;
        } 
      // this.user = this.authService.getCurrentUser();
      // let val=(this.user.id).toString();
      this.tix = this.typeValidationForm.value;
      this.tix.images=tix.images;
      // this.tix.userd="a"+val;
            let id = tix.id;
      this.tix.status="activated";
      this.tix.idcategory=this._uw.categorySelected;
      this.tix.idsub=this._uw.subcategorySelected;
     // this.tix.subcategories=this.selectedItems;
      return this.dataApi.updateTix(this.tix, id)
        .subscribe(
             tix => this.router.navigate(['/products'])
        );
  }    


onItemSelect(item: any) {
//   this.tix.idcategory=this._uw.categories[item.item_id].idcategory;
    this._uw.categorySelected=this._uw.categories[item.item_id-1].idcategory;
//   console.log(""+this._uw.categories[item.item_id].idcategory);
    this.dropdownList2 = []; 
    let size=this.categories[item.item_id-1].subs.length;
    let indice = item.item_id-1;
    this._uw.indexselected=indice;
       for (let i=0;i<size;i++){
          this.categoryStatus2.push({filterStatus:false});
          this.dropdownList2 = this.dropdownList2.concat({
          id: i + 1,
          item_id: i + 1,
          item_text: this._uw.categories[indice].subs[i].name
        });
      }
      this.subs=true;
  }

onSelectAll(items: any) {
  console.log(items);
}   
 onItemDeSelect(items: any) {

}onItemDeSelect2(items: any) {

}   
onItemSelect2(item: any) {
  //this.tix.idsubcategory=this._uw.categories[this._uw.indexselected].subs[item.item_id].idsub;
      this._uw.subcategorySelected=this._uw.categories[this._uw.indexselected].subs[item.item_id-1].idsub;
  //  console.log(item);
}
onSelectAll2(items: any) {
  console.log(items);
} 
addNewModule(){
  this.buttonDisabled=true;
  this.addModules=true;
}

 get type() {
    return this.typeValidationForm.controls;
  }

  public getAllCategories(){
    this.dataApi.getAllCategories().subscribe((res:any) => {
      if (res[0] === undefined){
       }else{
        this.categories=res;  
        this._uw.categories=res;
        this._uw.totalCategories=res.length;          
        }
    });  
    setTimeout(() => {
      for (let i=0;i<this._uw.totalCategories;i++){
        this.categoriesList[i]=this.categories[i].name;
          this.categoryStatus.push({filterStatus:false});
          this.dropdownList = this.dropdownList.  concat({
          id: i + 1,
          item_id: i + 1,
          item_text: this.categories[i].name,
          idspec: this.categories[i].idcategory
        });
      }
      this.loaded=true;
    }, 10000);

  }

edit(){
     this.determinateCategoryAndSub(this.tix);
  this.buttonDisabled=true;
  this.editing=true;
}
addModule(){
  let Duration = this.newModuleDuration;
  let Link = this.newModuleLink;
  let Tittle =this.newModuleTittle;
  this.tix.modules.push({tittle:Tittle,duration:Duration,link:Link});
  this.addModules=false;
  this.uploading=true;
  this.newModuleDuration="";
  this.newModuleLink ="";
  this.newModuleTittle="";
  this.okUpdateCourse(this.tix);
}

continue(){
  this.buttonDisabled=false;
  this.uploading=false;
}

okUpdateCourse(tix){
    let id = this.tix.id;
    this.dataApi.updateTix(this.tix, id)
      .subscribe(
         dentist => this.continue()
    );
  }
cancel(){
  this.editing=false;
  this.buttonDisabled=false;
}
determinateCategoryAndSub(tix){

 let idcategory=tix.idcategory;
// console.log(+idcategory);
  let idsub=tix.idsub;
    for (let i=0;i<this._uw.totalCategories;i++){
        if(idcategory==this._uw.categories[i].idcategory){
          this.category=this._uw.categories[i].name;
          let nsubs=this._uw.categories[i].subs.length;
          for (let j=0;j<nsubs;j++){
            if (idsub==this._uw.categories[i].subs[j].idsub){
              this.subcategory=this._uw.categories[i].subs[j].name;
            }
          }
        }
    }
   
}

getCourseDetail(id: string){
    this.dataApi.getCourseDetailById(id).subscribe(tix => (this.tix = tix)); 

  }
go(link){
  window.open(link, "_blank");
}
delete(){
  this.deleting=true;
}
cancelDelete(){
  this.deleting=false;
}
okDelete(tix){
  this.dataApi.deleteTix(tix.id).subscribe(
   tix => this.router.navigate(['/products'])
    );
  this.deletedMessage=true;
  this.deleting=false;
}

ngOnInit() {
    this.deletedMessage=false;
     // this.ngFormUpdateTixData = this.formBuilder.group({
     //      newModuleLink:['',[]], 
     //      newModuleDuration:['',[]], 
     //      newModuleTittle:['',[]]
     //  });
       this.typeValidationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      model: ['', [Validators.required]],
      brand: ['', [Validators.required]]
//      category: ['', [Validators.required]]
//      subcategory: ['', [Validators.required]]
        });

    this.getCourseDetail(this.route.snapshot.paramMap.get('id'));

    this.tix.images=[];
    this.tix.modules=[];
    this._fetchData();
    this.dropdownList = []; 
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar todas',
      unSelectAllText: 'Deseleccionar todas',
      itemsShowLimit: 7,
      allowSearchFilter: false
    };
     this.dropdownSettings2 = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar todas',
      unSelectAllText: 'Deseleccionar todas',
      itemsShowLimit: 7,
      allowSearchFilter: false
    };
    this.getAllCategories();
     
  } 

  get fval() {
    return this.typeValidationForm.controls;
  }
  get fval2() {
    return this.typeValidationForm.controls;
  }
  private _fetchData() {
    this.projectActivity = projectActivity;
    this.widgetData = widgetData;
  }
}
