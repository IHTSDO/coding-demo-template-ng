import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TerminologyService } from '../services/terminology.service';

@Component({
  selector: 'app-binding-details',
  templateUrl: './binding-details.component.html',
  styleUrls: ['./binding-details.component.css']
})
export class BindingDetailsComponent implements OnInit {

  expansion: any[] | undefined;
  total: any;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<BindingDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public terminologyService: TerminologyService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.loading = true;
    this.terminologyService.expandValueSet(this.data.ecl, '').subscribe(response => {
      if (!response.issue) {
        this.expansion = response.expansion?.contains;
        this.total = response.expansion?.total;
      } else {
        this.expansion = [];
        this.total = '-';
        console.log(response.issue.diagnostics)
      }
      this.loading = false;
    } );
  }

}
