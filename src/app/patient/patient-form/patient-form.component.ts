import { Component, Output, Input, inject, OnInit, SimpleChanges, EventEmitter } from '@angular/core';
import { Patient } from '../../../interfaces/patients';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RecordsService } from '../../../services/records.service';
// import { RecordsService } from '../records.service';
import * as countryCodes from 'country-codes-list';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AppUtils } from 'src/app/shared/app-utils';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css'],
  providers:[RecordsService]
})

export class PatientFormComponent implements OnInit {
  // recordService: RecordsService;
  // records=this.recordService.records;
  records :Patient[]=this.recordService.totalPatientRecords;
  newPatientForm: FormGroup ;//| undefined;
  // birthDate:string='';
  // isAdult:boolean=true;
  isNotAnAdult=false;
  @Input() isReadMode: boolean=false;
  @Input() updateRecord: boolean=false;
  countryCodeObject=countryCodes;
  private service=inject(RecordsService);
  @Input() setValueIndex :any='';
  // formChangeValue: EventEmitter<any>;
  genderOptions = AppUtils.getGenderOptions();
  // @Output() canUpdate=false;
  @Output() canUpdate=new EventEmitter<boolean>();

  // inex=252;
  // countries='+' + this.countryCodeObject.all()[this.index].countryCallingCode+' '+ this.countryCodeObject.all()[this.index].countryNameEn;
  countries=this.countryCodeObject.all();
  
  // countryCode = require('country-codes-list');
  // readonly countryCode:any;

//  constMyCountryCodesObject = countryCodes.customList('countryCode', '[{countryCode}] {countryNameEn}: +{countryCallingCode}');
//  getCountryNameByCode(code: string): string | undefined 
//  {
//   const countryInfo = countryCodes.customList();
//   return countryInfo?.country;
// }



// readonly myCountryCodeObject:any;
  

  // recordService: RecordsService;
  // showForm: boolean =false;
  // showList: boolean =false;

    showNewForm=false;
    
    



  constructor(private formBuilder: FormBuilder,private recordService: RecordsService, private http:HttpClient, private router:Router) 
  {
    // console.log(this.countryCodeObject.all());

    // console.log(this.countryCodeObject.all());
    // console.log(this.countryCodes);
    // this.countryCode=this.constCountryCode;
    // this.myCountryCodeObject=this.constMyCountryCodesObject;

    // this.records=recordService.totalPatientRecords;
    // console.log('patient-form')
    // @Output this.formBuilder;
    
    // this.notAnAdult();
    // if(this.newPatientForm.get('DOB')?.dirty){this.notAnAdult()};
    
  }
  ngOnInit(): void 
  {
    this.newPatientForm = this.formBuilder.group
    ({
      // firstName: String,
      // lastName: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      mnr:AppUtils.generatedMRN,
      firstName: ['',[Validators.required,Validators.pattern(AppUtils.nameRegex)]],
      lastName: ['',Validators.pattern(AppUtils.nameRegex)],

      // DOB: ['',Validators.pattern('\d{4}\d{2}-\d{2}$')],
      DOB: ['',Validators.required],

      // countryCodeForContact:'+'+this.countries[0].countryCallingCode,
      countryCodeForContact:'',
      // countryCodeForEmerContact:'+'+this.countries[0].countryCallingCode,
      countryCodeForEmerContact:'',
      contactNo: ['',[Validators.pattern(AppUtils.contactRegex)]],//10 digits because zero kee jaga country code
      // contactNo: ['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],//10 digits because zero kee jaga country code
      emergencyContactNo:['',[Validators.pattern(AppUtils.contactRegex)]],
      // emergencyContactNo:['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
      gender: ['',Validators.required],
      street: ['',Validators.required],
      area:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      country:['',Validators.required],
      zipcode:['',Validators.required],
      email:['',[Validators.required,Validators.email],this.uniqueEmail()],
      onlyReadable:[false]

    }
    // ,this.newPatientForm.valueChanges.subscribe((values)=>
    // {
      //   console.log(this.formChangeValue.emit(values));
      // })
      );
      
    this.recordService.getPatientData();
    console.log('in init');
    // (document.getElementById('formApplyChangesButton') as HTMLButtonElement).hidden=true;

    // this.newPatientForm.valueChanges.subscribe((values)=>
    // {
    //   console.log("emittion  "+this.formChangeValue.emit(values));
    // })
    // this.customForm();

  }
  //goBackToMainPage()
//  {
//    this.router.navigate(['']);
//  }
  ngOnChanges(changes:SimpleChanges):void
  {
    if(changes['setValueIndex'] && this.newPatientForm)
    {
      // console.log('setvalueindex',this.setValueIndex);
      // let matchingRecord=this.records.filter(record=>(record.id==this.setValueIndex));
      
      let matchingRecordIndex=this.records.findIndex(record=>(record.id==this.setValueIndex));
      // console.log('setvalueindex',athis.records);
      let matchingRecord=this.records[matchingRecordIndex];
      (document.getElementById('formSubmitButton') as HTMLButtonElement).hidden=true;
      (document.getElementById('formHeading') as HTMLHeadingElement).hidden=true;
      // console.log(matchingRecord[0]);  
      // console.log(matchingRecord);  
      
      // this.newPatientForm.setValue(matchingRecord[0]);
      // let displayRecord=
      // {
      //   firstName=matchingRecord.firstName,
        
      // }
      // this.notAnAdult();

      this.newPatientForm.disable();
      // console.log((document.getElementById('emergencyContactDiv') as HTMLDivElement))
      // this.newPatientForm.markAsDirty;
      // this.newPatientForm.markAsDirty;
      // this.newPatientForm.markAllAsTouched;
      // this.newPatientForm.

      // if(this.records[matchingRecordIndex].emergencyContactNo!='')
      // {
      //   (document.getElementById('emergencyContactDiv') as HTMLDivElement).hidden=false;
      // }
      console.log(this.newPatientForm.touched);

      if(matchingRecord.emergencyContactNo!='')
        this.isNotAnAdult=true
      else
        this.isNotAnAdult=false;
      this.newPatientForm.patchValue
      ({
        // firstName:matchingRecord[0].firstName,
        
        firstName:matchingRecord.firstName,
        lastName:matchingRecord.lastName,
        DOB:matchingRecord.DOB,
        countryCodeForContact:matchingRecord.countryCodeForContact,
        contactNo:matchingRecord.contactNo,
        countryCodeForEmerContact:matchingRecord.countryCodeForEmerContact,
        emergencyContactNo:matchingRecord.emergencyContactNo,
        gender:matchingRecord.gender,
        email:matchingRecord.email,
        street:matchingRecord.street,
        area:matchingRecord.area,
        city:matchingRecord.city,
        country:matchingRecord.country,
        state:matchingRecord.state,
        zipcode:matchingRecord.zipcode

        // firstName:matchingRecord[0].firstName,
        // lastName:matchingRecord[0].lastName,
        // DOB:matchingRecord[0].DOB,
        // countryCodeForContact:matchingRecord[0].countryCodeForContact,
        // contactNo:matchingRecord[0].contactNo,
        // countryCodeForEmerContact:matchingRecord[0].countryCodeForEmerContact,
        // emergencyContactNo:matchingRecord[0].emergencyContactNo,
        // gender:matchingRecord[0].gender,
        // email:matchingRecord[0].email,
        // street:matchingRecord[0].street,
        // area:matchingRecord[0].area,
        // city:matchingRecord[0].city,
        // country:matchingRecord[0].country,
        // state:matchingRecord[0].state,
        // zipcode:matchingRecord[0].zipcode

      });
      
      // this.newPatientForm.get('firstName').patchValue(matchingRecord[0].firstName);
      // this.newPatientForm.get('lastName').patchValue(matchingRecord[0].lastName);
      // this.newPatientForm.get('DOB').patchValue(matchingRecord[0].DOB);
      // this.newPatientForm.get('countryCodeForContact').patchValue(matchingRecord[0].countryCodeForContact);
      // this.newPatientForm.get('contactNo').patchValue(matchingRecord[0].contactNo);
      // this.newPatientForm.get('countryCodeForEmerContact').patchValue(matchingRecord[0].countryCodeForEmerContact);
      // this.newPatientForm.get('emergencyContactNo').patchValue(matchingRecord[0].emergencyContactNo);
      // this.newPatientForm.get('gender').patchValue(matchingRecord[0].gender);
      // this.newPatientForm.get('street').patchValue(matchingRecord[0].street);
      // this.newPatientForm.get('area').patchValue(matchingRecord[0].area);
      // this.newPatientForm.get('city').patchValue(matchingRecord[0].city);
      // this.newPatientForm.get('country').patchValue(matchingRecord[0].country);
      // this.newPatientForm.get('zipcode').patchValue(matchingRecord[0].zipcode);
      // if(this.isReadMode)
      // {   
      //   console.log('readMode  '+this.isReadMode);    
      //   this.newPatientForm.disable();
      // }
      // else
      // {        
      //   console.log('readMode  '+this.isReadMode);    
      //   this.newPatientForm.enable();
      // }
      // if(this.records[matchingRecordIndex].emergencyContactNo!='')
      // {
      //   (document.getElementById('emergencyContactDiv') as HTMLDivElement).hidden=false;
      // }
      
    }
    if(changes['isReadMode'])// this only works when the page is first time loaded
    
    {
      // (document.getElementById('formSubmitButton') as HTMLButtonElement).hidden=true;
      // document.getElementById('formSubmitButton').disabled=true;
      
      // (document.getElementById('formApplyChangesButton') as HTMLButtonElement).hidden=false;

        console.log('ngOnChanges');
        if(this.isReadMode)
        
        { 
          
          console.log('readMode  '+this.isReadMode);    
          this.newPatientForm.disable();
        }
        else
        {        
          console.log('readMode  '+this.isReadMode);    
          this.newPatientForm.enable();
          
        }
    }

    if(changes['updateRecord'])
    {
      this.applyChanges();
    }


  }
  
  ngDoCheck()
  {
    // this.newPatientForm.valueChanges.subscribe((values)=>
    // {
    //   console.log("emittion  "+values);
    // })
    // if(this.newPatientForm.dirty==true)
    if(this.newPatientForm.touched==true)
    {
      console.log("Can be Updated")
      // this.newPatientForm.updateOn
      this.canUpdate.emit(true);
    }
    // document.getElementsByTagName('input')     // console.log('Updates:   '+this.newPatientForm.updateOn)
  }
  
  uniqueEmail():AsyncValidatorFn
  {
    return(control:AbstractControl):Observable<ValidationErrors|null>=>
    {
      let value=control.value;
      return this.http.get(this.service.getPatientURL())
      .pipe
      (map
        ((res)=>
        {
          let patientsFromDB=[];
          for(let key in res)
          {
            if(res.hasOwnProperty(key))
            {
              patientsFromDB.push({...res[key],id:key})
            }
          }
          return patientsFromDB;
        }
        )
      ,map
      ((patientsFromDB)=>
        {
          for(let i=0;i<patientsFromDB.length;i++)
          {
            if(patientsFromDB[i].email===value)
              return {invalidValue:true};
          }
          return null;
        }
      )

      )
    }
    // if(this.newPatientForm.get('email')?.dirty && this.newPatientForm.get('email')?.valid)
    // {
    //   for(let record of this.records )
    //   {
    //     if(record.email=this.newPatientForm.get('email')?.value)
    //     {
    //       // console.log(record.email);
    //       console.log('Error');
    //       // console.log(this.newPatientForm.get('email')?.value);
    //       // this.newPatientForm.get('email')?.setErrors({invalid:true,valid:false});
    //     }
    //   }
    // }
  }

  onSubmit()
  {
    console.log(this.setValueIndex);

    // console.log(this.newPatientForm.get('country')?.value);
    // console.log(this.newPatientForm.get('gender')?.value);

    
    // if(this.newPatientForm.get('email')?.touched && this.newPatientForm.get('email')?.valid)
    // {
    //   for(let record of this.records)
    //   {
    //     if(record.email=this.newPatientForm.get('email')?.value)
    //     {

    //       this.newPatientForm.get('email')?.setErrors({invalid:true,valid:false});
    //     }
    //   }
    // }
    // let id;    
    // this.records.length!=0 ? id=(this.records[this.records.length-1].mnr)+1 : id=1;
    // console.log(id);
    // auto generate mnr here and shw in the end
    // console.log(uuid());
    // const newPatient: Patient={
    // mnr:id,
    // firstName: this.newPatientForm.get('firstName')?.value,
    // lastName: this.newPatientForm.get('lastName')?.value,
    // DOB: this.newPatientForm.get('DOB')?.value,
    // contact: this.newPatientForm.get('contact')?.value,
    // gender: this.newPatientForm.get('gender')?.value,
    // address: this.newPatientForm.get('address')?.value,
    // email: this.newPatientForm.get('email')?.value
    // }
    // recordService: RecordsService;
    // this.records.push(newPatient);


    // mnr:this.generatedMRN;

    // console.log(this.newPatientForm);
    // console.log(this.newPatientForm.get('street')?.value);
  //  this.uniqueEmail();
    if(this.newPatientForm.status=='INVALID')
    {
      // errorFields:String;
      alert('Form Not Submitted!. The form fields have incomplete or invalid data')
      
    }
    
    
    if(this.newPatientForm.status!='INVALID')
      {
        // serviceInstance: RecordsService;
        // this.uniqueEmail();
        let patientData: Patient;
        // patientData.onlyReadable=true;
        patientData= this.newPatientForm.value;
        // this.records.push(patientData);
      
        this.newPatientForm.reset();
      // console.log(this.newPatientForm.get('firstName')?.value);
        this.showNewForm=false;
        console.log(patientData);
        // console.log(this.records);
        // let headers=new HttpHeaders({'myHeader':'angularTask'});
        // this.http.post('https://patient-database-1a315-default-rtdb.firebaseio.com',patientData,{headers:headers}).subscribe((res)=>{console.log(res)});
        // this.http.post('https://patient-database-1a315-default-rtdb.firebaseio.com',patientData).subscribe(()=>{console.log(er)});
        this.service.postPatientData(patientData);
        
        alert('The data has been recorded!')
      }
  }
  // if(this.newPatientForm.get('email')?.touched && this.newPatientForm.get('email')?.valid)
  // {
  //   for(let record of this.records)
  //   {
  //     if(record.email=this.newPatientForm.get('email')?.value)
  //     {
  //       this.newPatientForm.get('email')?.setErrors({invalid:true,valid:false});
  //     }
  //   }
  // }
  // let id;    
  // this.records.length!=0 ? id=(this.records[this.records.length-1].mnr)+1 : id=1;
  // console.log(id);
  // auto generate mnr here and shw in the end
  // console.log(uuid());
  // const newPatient: Patient={
  // mnr:id,
  // firstName: this.newPatientForm.get('firstName')?.value,
  // lastName: this.newPatientForm.get('lastName')?.value,
  // DOB: this.newPatientForm.get('DOB')?.value,
  // contact: this.newPatientForm.get('contact')?.value,
  // gender: this.newPatientForm.get('gender')?.value,
  // address: this.newPatientForm.get('address')?.value,
  // email: this.newPatientForm.get('email')?.value
  // }
  // recordService: RecordsService;
  // this.records.push(newPatient);
  // mnr:this.generatedMRN;
  // console.log(this.newPatientForm);
  // console.log(this.newPatientForm.get('street')?.value);
  //  this.uniqueEmail();
  // if(arg0: boolean) {
  //   throw new Error('Method not implemented.');
  // }

    

    // for show/hide new patient form
  
  // editList()
  // {

  // }
  
  
  
  notAnAdult() 
  {

    
    // console.log('not an adult method');
    if(this.newPatientForm.get('DOB').dirty && this.newPatientForm.get('DOB').valid)
    {
      // console.log((new Date(this.newPatientForm.get('DOB').value)).getFullYear());
      let num=((new Date()).getFullYear()-(new Date(this.newPatientForm.get('DOB').value)).getFullYear());
      // let num=    ((new Date()).getSeconds()-(new Date(this.newPatientForm.get('DOB').value)).getSeconds());
      if(num< 18)
      // if(num< (84600*18))
      {// {    console.log('not an adult');

        return true;
      // this.isAdult=false
      }
        // console.log('is an adult');
      
      return false;
    }
    return false;
    
  }


  getData(val:any)
  {
    // if(val.valid && val.touched)
    if(val.touched)
    {
      console.log(val.value);
    }
  }

  // postPatientData(patient: Patient)
  // {
  //     console.log(patient);
  //     this.http.post('https://patient-database-1a315-default-rtdb.firebaseio.com/pateint-records.json',patient).subscribe(
  //       (res)=>{console.log(res)}
  //     );

  // }
 
//  @Input() customForm()
  customForm()
  {
    console.log(this.setValueIndex);
    // console.log(this.records[this.setValueIndex]);
    // if(this.setValueIndex!=null)
    // {
    //   // console.log(this.setValueIndex);
    //   console.log(this.records[this.setValueIndex]);
    //   // this.newPatientForm.setValue();
    // }
      
  }
  applyChanges()
  {
    let matchingRecordIndex=this.records.findIndex(record=>(record.id==this.setValueIndex));
    this.records[matchingRecordIndex]=this.newPatientForm.value;

    console.log(this.records[matchingRecordIndex]);

    this.service.updateSinglePatientRecord(this.setValueIndex,matchingRecordIndex);
    alert('The record has been updated.')
    window.location.reload();
   
  }
}
//show emergency contact number field 

