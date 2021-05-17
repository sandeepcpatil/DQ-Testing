import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isVisible= false;
  public fileSearchValue: any = '';
  public radioValue=" "

  validateForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string ; sourceConnectionType: string; sourceConnectionName: string; sourceBucketName: string; sourceFileType: string;sourceFileLocation: string; sourceFileSeparatedBy: string; sourceFirstRowHeader: string
targetConnectionType: string; targetConnectionName: string; targetBucketName: string; targetFileType: string; targetFileLocation: string; targetFileSeparatedBy: string; targetFirstRowHeader: string
  }> = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.addField();
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger ${id}`,
      sourceConnectionType: `sourceConnectionType ${id}`,
      sourceConnectionName: `sourceConnectionName ${id}`,
      sourceBucketName: `sourceBucketName ${id}`,
      sourceFileType: `sourceFileType ${id}`,
      sourceFileLocation: `sourceLocation ${id}`,
      sourceFileSeparatedBy:`sourceSeparatedBy ${id}`,
      sourceFirstRowHeader: `sourceHeader ${id}`,



      targetConnectionType: `targetConnectionType ${id}`,
      targetConnectionName: `targetConnectionName ${id}`,
      targetBucketName: `targetBucketName ${id}`,
      targetFileType: `targetFileType ${id}`,
      targetFileLocation: `targetLocation ${id}`,
      targetFileSeparatedBy:`targetSeparatedBy ${id}`,
      targetFirstRowHeader: `targetHeader ${id}`,
    };
    const index = this.listOfControl.push(control);
    // console.log(this.listOfControl[this.listOfControl.length]);
    // this.validateForm.addControl(this.listOfControl[index - 1].controlInstance, new FormControl(null, Validators.required));


    //Source System
    this.validateForm.addControl(this.listOfControl[index - 1].sourceConnectionType, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.listOfControl[index - 1].sourceConnectionName, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.listOfControl[index - 1].sourceBucketName, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.listOfControl[index - 1].sourceFileType, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.listOfControl[index - 1].sourceFileLocation, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.listOfControl[index - 1].sourceFileSeparatedBy, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.listOfControl[index - 1].sourceFirstRowHeader, new FormControl(null, Validators.required));



    // Target System
    this.validateForm.addControl(this.listOfControl[index - 1].targetConnectionType, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.listOfControl[index - 1].targetConnectionName, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.listOfControl[index - 1].targetBucketName, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.listOfControl[index - 1].targetFileType, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.listOfControl[index - 1].targetFileLocation, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.listOfControl[index - 1].targetFileSeparatedBy, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.listOfControl[index - 1].targetFirstRowHeader, new FormControl(null, Validators.required));

  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value);
  }


    public connectionsTypeList = [
    {name: 'Amazon S3', value:'Amazons3'},
    {name: 'File Server', value:'file'},
    {name: 'Databricks', value:'databricks'},
  ];

  public connectionNameList = [
    {name: 's3-prod', value:'s3-prod'},
    {name: 's3-dev', value:'s3-dev'},
  ]

  public connectionBucketList = [
    {name: 'dds-validator-prod', value:'dds-validator-prod'},
    {name: 'dds-validator-dev', value:'dds-validator-dev'},
  ]
  public connectionFileList=[
    {name: 'CSV', value:'csv'},
    {name: 'JSON', value: 'json'}
  ]

    public filesSeparatedBy = [
    {name: 'Comma', value:'comma'},
    {name: 'Pipe', value:'pipe'},
  ];

    public headerTrue =[
    {name:'True', value: 'true'},
    {name: 'False', value:'false'}
  ]


  public sortBy(inp: string){
    return this.connectionFileList.sort();
  }

  showModal(): any{
    this.isVisible = true;
  }

  handleOk(): void{
    this.isVisible = false;
  }

  handleCancel(): void{
    this.isVisible = false;
  }
}
