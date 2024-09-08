// import { Component, OnInit, ViewChild, ElementRef, inject  } from '@angular/core';
import { Component,  inject  } from '@angular/core';
// import { NewPatientComponent } from '../new-patient/new-patient.component';
import { Patient } from '../../../interfaces/patients';
import { RecordsService } from '../../../services/records.service';
import * as countryCodes from 'country-codes-list';
import { Router } from '@angular/router';
// import {MatIconModule} from '@angular/material/icon';

// import { PatientFormModule } from 'src/modules/patient-form/patient-form.module';
// import { PatientFormComponent } from '../patient-form/patient-form.component';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { PatientFormComponent } from '../patient-form/patient-form.component';
// @NgModule
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
  // imports:[MatIconModule]
})
// export class PatientListComponent implements OnInit{
export class PatientListComponent
{
  // p:PatientFormComponent;
  // p.setValueIndex
  canUpdate:boolean=false;
  recordsView: Patient[]=this.recordService.totalPatientRecords;
  // updatePatientForm: FormGroup;
  // letEdit:boolean[]=[];
  letEdit:boolean=false;
  index :any ;
  //for pagination
  items=10;
  page=1;
  visibleButton=true;
  count=this.recordsView.length;
  isReadable:boolean
  countries=countryCodes.all();
  collapseIndexId:any;
  collapseIndexNo:any;
  updateRecord=false;
  
  // @ViewChild('editButton',{static:false}) editButton!:ElementRef;

  private service=inject(RecordsService);
  // constructor(recordService: RecordsService, private http:HttpClient)//, private formBuilder: FormBuilder)
  constructor(private recordService: RecordsService,private router:Router)//, private formBuilder: FormBuilder)
  {
    // this.recordsView=recordService.totalPatientRecords;
    // console.log('records view',this.recordsView)
    // this.updatePatientForm = this.formBuilder.group({
    //   // firstName: String,
    //   // lastName: ['', Validators.required],
    //   // email: ['', [Validators.required, Validators.email]],
    //   firstName: this.recordsView[this.index].firstName,
    //   lastName: '',
    //   DOB: '',
    //   contact: '',
    //   gender: '',
    //   address: '',
    //   email:''
      

    // });
    // this.getData();
  }
  //goBackToMainPage()
//  {
//    this.router.navigate(['']);
//  }
  ngOnInit()
  {
    this.recordService.getPatientData();
    // this.recordsView=this.recordService.totalPatientRecords;
    this.letEdit=false;
    this.isReadable=true;
    (document.getElementById('updateButton') as HTMLButtonElement).hidden=true;
    // (document.getElementById('updateButton') as HTMLButtonElement).
  }
  handlePageChange(event: any)
  {
    this.page=event;
  }
  // getMNR(i:any)
  // {
    
  //   console.log(i);
  // }
  // updateRecord(recordNo : any)
  // {
    
    // this.recordsView[recordNo].firstName=this.updatePatientForm.get('firstName')?.value
    // console.log(this.recordsView[recordNo].firstName);
    // this.recordsView[recordNo].lastName=this.updatePatientForm.get('lastName')?.value
    // this.recordsView[recordNo].DOB=this.updatePatientForm.get('DOB')?.value
    // this.recordsView[recordNo].contact=this.updatePatientForm.get('contact')?.value
    // this.recordsView[recordNo].gender=this.updatePatientForm.get('gender')?.value
    // this.recordsView[recordNo].email=this.updatePatientForm.get('email')?.value
    // this.recordsView[recordNo].address=this.updatePatientForm.get('address')?.value

  // }
  // setArrayLength() 
  // {
  //   // this.letEdit.length = this.recordsView.length; // Truncate the array to the desired length
  // }
  // deleteRecord(i:number)
  // {
    
  // }

  // showButton()
  // {
  //   if(this.editButton || !this.editButton)
  //   {
  //     const editButtonElement: HTMLButtonElement= this.editButton.nativeElement;
  //     editButtonElement.hidden=false;
  //     //this.visibleButton=true;
  //   }
  // }
  onDelete(id:string)
  {
    this.service.deletePatientData(id);
    alert('The record has been deleted.')
    window.location.reload();
    
  }


  collapseTableFunction(index)
  {
    // console.log('collape and records',this.recordsView); 
    console.log('collape and records',index); 
    this.collapseIndexId=this.recordsView[index].id;
    this.collapseIndexNo=index;
    // this.collapseIndexId=
    // console.log('this.collapseIndexId'+'  '+this.recordsView[index]);
    this.letEdit=false;
    (document.getElementById('editButton') as HTMLButtonElement).hidden=false;
    (document.getElementById('updateButton') as HTMLButtonElement).hidden=true;
    
  }

  // getData()
  // {
  //   this.http.get('https://patient-database-1a315-default-rtdb.firebaseio.com/pateint-records.json')
  //   .pipe(map((res)=>
  //   {
  //     let products=[];
  //     for(const key in res)//key is the string name
  //     {
  //       if(res.hasOwnProperty(key))
  //       {
  //         products.push({...res[key],id:key})//... for getting the inner values
  //       }
  //     }
  //     return products
  //   }))
  //   .subscribe((values)=>
  //   {console.log(values)
  //     for(let val of values)
  //     {
  //       this.recordsView.push(val);
  //       // console.log(i+":"+res[i]);
  //       // console.log(val);
  //     }  
  //   });
  // }

  editRecord()
  {
    // console.log(this.letEdit)
    this.letEdit=!this.letEdit;
    // let recordIndexToEdit=this.recordsView.findIndex(record=m>record.id==this.collapseIndexId);
    // let recordToEdit=this.recordsView[recordIndexToEdit];
    
    (document.getElementById('editButton') as HTMLButtonElement).hidden=true;
    (document.getElementById('closeButton') as HTMLButtonElement).hidden=true;
    (document.getElementById('updateButton') as HTMLButtonElement).hidden=false;
    (document.getElementById('updateButton') as HTMLButtonElement).disabled=true;


    console.log("letEdit   "+this.letEdit);

  }


  handleUpdate(data:any)
  {
    // this.canUpdate=data;
    // console.log("Can be Updated: "+ this.canUpdate)
    if(data==true)
    {
      console.log('Can be Updated!!');
      (document.getElementById('updateButton') as HTMLButtonElement).disabled=false;
    }
  }


  sendSignal()
  {
    this.updateRecord=true;
  }
  // isDetailsVisible(rowIndex: number): boolean {
  //   return this.selectedRowIndex === rowIndex;
  // }
  // applyChanges()
  // {
  //   this.recordsView[this.recordsView.findIndex(record=>record.id==this.collapseIndexId)]
  // }
  // applyChanges()
  // {
  //   let matchingRecordIndex=this.recordsView.findIndex(record=>(record.id==this.setValueIndex));
  //   this.recordsView[matchingRecordIndex]=this.newPatientForm.value;

  //   console.log(this.recordsView[matchingRecordIndex]);

  //   this.service.updateSinglePatientRecord(this.setValueIndex,matchingRecordIndex);
  //   alert('The record has been updated.')
  //   window.location.reload();
   
  // }
  // closeForm()
  // {
  //  console.log(document.getElementsByTagName('app-patient-form'))
  // }
  ngAfterViewInit() {
    const tableRow = document.querySelector('table tr:nth-child(this.collapseIndexId+1)'); // Select the second <tr>
    if (tableRow) {
      // Perform operations on the selected <tr>
      console.log('table row:   S'+tableRow);
    }
  }

  }
  

  

