import { Component, OnInit, ViewChild } from '@angular/core';
import { SectorLocation } from 'src/app/common/models/sector-location.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { LocationService } from 'src/app/core/services/location.service';
import { LocationFormComponent } from '../form/form.component';
import { SectorService } from 'src/app/core/services/sector.service';

@Component({
  selector: 'location-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class LocationListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'asnm', 'sector'];
  dataSource: MatTableDataSource<SectorLocation>;
  items: SectorLocation[] = [];
  itemsSubs = new Subscription();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dialoge: MatDialog,
    private locationService: LocationService,
    private sectorService: SectorService,
  ) {
    this.locationService.List();
    this.items = this.locationService.Items;
    this.dataSource = new MatTableDataSource(this.items);
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.itemsSubs = this.locationService.itemsChanged.subscribe(
      (newItems: SectorLocation[]) => {
        if (newItems) {
          this.items = newItems;
          this.dataSource = new MatTableDataSource(newItems);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    );
  }

  ngOnDestroy() {
    this.itemsSubs.unsubscribe();
  }

  DialogeForm(dataUpd?: SectorLocation) {
    const dialogRef = this.dialoge.open(LocationFormComponent, {
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

  Sector(idSector: String) {
    return this.sectorService.GetItemtID(idSector) ? this.sectorService.GetItemtID(idSector).name : '';
  }

}
