import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Document } from 'src/app/common/models/document.model';
import { DocumentService } from 'src/app/core/services/document.service';
import { DocumentFormComponent } from '../form/form.component';
import { CropService } from 'src/app/core/services/crop.service';

@Component({
  selector: 'document-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class DocumentListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'crop'];
  dataSource: MatTableDataSource<Document>;
  items: Document[] = [];
  itemsSubs = new Subscription();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dialoge: MatDialog,
    private documentService: DocumentService,
    private cropService: CropService,
  ) {
    this.documentService.List();
    this.items = this.documentService.Items;
    this.dataSource = new MatTableDataSource(this.items);
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.itemsSubs = this.documentService.itemsChanged.subscribe(
      (newItems: Document[]) => {
        if (newItems) {
          this.items = newItems;
          this.dataSource = new MatTableDataSource(newItems);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.itemsSubs.unsubscribe();
  }

  DialogeForm(dataUpd?: Document) {
    const dialogRef = this.dialoge.open(DocumentFormComponent, {
      width: '40rem',
      disableClose: true,
      data: dataUpd ? dataUpd : null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Crop(idCrop: string) {
    let myCrop = this.cropService.GetItemtID(idCrop);
    return myCrop ? myCrop.name : '';
  }

}
