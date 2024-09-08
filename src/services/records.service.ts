import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patients';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private patientDatabaseURL='https://users-database-6baa2-default-rtdb.firebaseio.com/patient-data.json';
  private userDatabaseURL='https://users-database-6baa2-default-rtdb.firebaseio.com/';
  constructor(private http:HttpClient) 
  { 
    // this.getPatientData();
  }
  ngOnInit()
  {
    // this.getPatientData();
  }
  getPatientURL()
  {
    return this.patientDatabaseURL;
  }

  totalPatientRecords:Patient[]=[];
    // {mnr:,firstName:'Fatima',lastName:'Haseeb',DOB:'2001-09-27',contact:923349904197, gender:'Female',street:'st1',area:'area1',city:'Rawalpindi',state:'state',country:'PAkistan',zipcode:"46000",email:'gmail.com'},
    // {
    //   mnr: 5775757, firstName: 'Fatima', lastName: 'Haseeb', DOB: '2001-09-27', contactNo: 923349904197, gender: 'Female', street: 'st1', area: 'area1', city: 'Rawalpindi', state: 'state', country: 'PAkistan', zipcode: "46000", email: 'gmail.com',
    //   countryCodeForContact: 92,
    //   countryCodeForEmerContact:92,
    //   emergencyContactNo: 333333333
    // }
    // {mnr:2,firstName:'Amna',lastName:'Haseeb',DOB:'2000-07-12',contact:923355965081, gender:'Female',address:'Rahimyarkhan',email:'hotmail.com'}
  
  // getPatientData2()
  // {
  //   this.http.get(this.patientDatabaseURL)
  //   .subscribe((values)=>
  //   {console.log(values.headers)
      
      
  //   });
  // }
  
  getPatientData()
  {
    // console.log('this is get')
    this.http.get(this.patientDatabaseURL)
    .pipe(map((res)=>
    {
      let products=[];
      for(const key in res)//key is the string name
      {
        if(res.hasOwnProperty(key))
        {
          // console.log(key);
          products.push({...res[key],id:key})//... for getting the inner values
          // console.log(products);
        }
      }
      return products
    }))
    .subscribe((values)=>
    {console.log(values)
      
      for(let val of values)
      {
        // =this.totalPatientRecords[]=val.id
        
        this.totalPatientRecords.push(val);

        // console.log(i+":"+res[i]);
        // console.log(this.totalPatientRecords);
      }  
    });
  }
  postPatientData(patient: Patient)
  {
      console.log(patient);
      this.http.post(this.patientDatabaseURL,patient).subscribe(
        (res)=>{console.log(res)}
      );

  }
  
  deletePatientData(id:String)
  {
    this.http.delete('https://users-database-6baa2-default-rtdb.firebaseio.com//pateint-data/'+id+'.json')
    .subscribe(()=>
    {
      // alert('The record has been deleted.')
    });
    
  }
  
  getSinglePatientRecord(id:string)
  {
    this.http.get('https://users-database-6baa2-default-rtdb.firebaseio.com//pateint-data/'+id+'.json')
    .subscribe((res)=>{
      console.log(res);
    })
  }
  
  updateSinglePatientRecord(id:string, index:any)
  {
    this.http.put('https://users-database-6baa2-default-rtdb.firebaseio.com//pateint-data/'+id+'.json',this.totalPatientRecords[index])
    .subscribe((res)=>console.log('updated  '+res))
    
  }
  // patientDatabaseURl='https://patient-database-1a315-default-rtdb.firebaseio.com/';
}


// never use new form control for every field
// code structure= components folder, service folder,
// never call api in components
// never create array or is tarah storage walee cheezein in components
// form->list-> store in form type array
// lazyLoading= read about it and see how you could implement it and try to 
// login walee cheez
// how is our speed?

