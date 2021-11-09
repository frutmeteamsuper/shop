import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { UserWService } from '../../../core/services/user-w.service';
import { DataApiService } from '../../../core/services/data-api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { HttpClient } from  '@angular/common/http';
import { DemoFilePickerAdapter } from  '../../../core/file-picker.adapter';
import { FilePickerComponent } from '../../../../assets/file-picker/src/lib/file-picker.component';
import { FilePreviewModel } from '../../../../assets/file-picker/src/lib/file-preview.model';
import { ValidationError } from '../../../../assets/file-picker/src/lib/validation-error.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TixInterface } from '../../../core/models/tix-interface';  
import { CategoryInterface } from '../../../core/models/category-interface';  
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.scss']
})
export class NewproductComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  submit: boolean;
  typesubmit: boolean;
  adapter = new DemoFilePickerAdapter(this.http,this._uw);
  @ViewChild('uploader', { static: true }) uploader: FilePickerComponent;
  myFiles: FilePreviewModel[] = [];

  constructor(    
      public formBuilder: FormBuilder,
      private http: HttpClient,
      public _uw:UserWService, 
      public location: Location,
      public router: Router,
      private dataApiService: DataApiService
  	) { }
  loaded = false;
  subs = false;
  selectedItems = [];
  dropdownList = [];
  dropdownSettings = {};
  selectedItems2 = [];
  dropdownList2 = [];
  dropdownSettings2 = {};
  categoriesList = {};
  public isError = false;
  public tixs:TixInterface;
//public tix:TixInterface;
  public categories:CategoryInterface ={}
  public tix:TixInterface ={
    name:"",
    model:"",
    idcategory:"",
    idsub:"",
    brand:"",    
    images:[],
    price:0
  };
//  categories:any[]=[];
  public categoryStatus:any[]=[];
  public categoryStatus2:any[]=[];
  public pagoImage:any[]=[];
  public images:any[]=[];

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
  }
  onItemDeSelect2(items: any) {
  }   
  onItemSelect2(item: any) {
    //this.tix.idsubcategory=this._uw.categories[this._uw.indexselected].subs[item.item_id].idsub;
      this._uw.subcategorySelected=this._uw.categories[this._uw.indexselected].subs[item.item_id-1].idsub;
  //  console.log(item);
  }
  onSelectAll2(items: any) {
    console.log(items);
  } 
  sendTix(){
      this.typesubmit = true;
      if (this.typeValidationForm.invalid) {
         this._uw.errorFormAddtixs=true;
      return;
        } 
      this._uw.errorFormAddtixs=false;
      // this.user = this.authService.getCurrentUser();
      // let val=(this.user.id).toString();
      this.tix = this.typeValidationForm.value;
      // this.tix.userd="a"+val;
      this.tix.status="activated";
      this.tix.idcategory=this._uw.categorySelected;
      this.tix.idsub=this._uw.subcategorySelected;
      this._uw.categorySelected="";
      this._uw.subcategorySelected="";
     // this.tix.subcategories=this.selectedItems;
      this.tix.images=this._uw.images;
      return this.dataApiService.saveTixFree(this.tix)
        .subscribe(
             tix => this.router.navigate(['/products'])
        );
  }        
  public okPago(){
   // let id = this._uw.order.id;
 //console.log("id disponible para enviar: "+id);
   // this.updateOrder();
    }
  get type() {
    return this.typeValidationForm.controls;
  }
  /**
   * Type validation form submit data
   */
  typeSubmit() {
    this.typesubmit = true;
  }

  public getAllCategories(){
    this.dataApiService.getAllCategories().subscribe((res:any) => {
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
     
      // for (let i=0;i<this.dentistSubmit.categories.length; i++){
      //   for (let j=0;j<this._uw.totalCategories;j++){
      //     if(this.dentistSubmit.categories[i]==this.categories[j].idspec){
      //       this.categoryStatus[j].filterStatus=true;
      //       this.selectedItems = this.selectedItems.concat({
      //         id: j + 1,
      //         item_id: j + 1,
      //         item_text: this.categories[j].name,
      //         idspec: this.categories[j].idcategory
      //       });
      //     }
      //   }
      // }
      this.loaded=true;
    }, 10000);
  }


  ngOnInit() {
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

    this._uw.images=[];this.tix.modules=[];
    this.breadCrumbItems = [ { label: 'Productos', path: '/products' }, { label: 'Nuevo producto', path: '/', active: true }];
      this.typeValidationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      model: ['', [Validators.required]],
      brand: ['', [Validators.required]]
//      category: ['', [Validators.required]]
//      subcategory: ['', [Validators.required]]
        });
     // this.ngFormSendPago = this.formBuilder.group({
     // npedido: ["",[Validators.required]]
    //  });
  }


    onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }


   onValidationError(e: ValidationError) {
    console.log(e);
  }
  onUploadSuccess(e: FilePreviewModel) {
   // console.log(e);
  // console.log(this.myFiles);
  this.images=this._uw.file;
  }
  onRemoveSuccess(e: FilePreviewModel) {
    console.log(e);
  }
  onFileAdded(file: FilePreviewModel) {
    
    file.fileName="https://db.buckapi.com:3035/imgCssca/server/local-storage/tixsImages/"+file.fileName;
    this.myFiles.push(file);
    // this.images.push(file.fileName);

  }

  removeFile() {
  this.uploader.removeFileFromList(this.myFiles[0].fileName);
  }

}