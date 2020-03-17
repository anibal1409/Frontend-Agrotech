import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { StudyFormComponent } from '../form/form.component';
import { SectorService } from 'src/app/core/services/sector.service';
import { StudyService } from 'src/app/core/services/study.service';
import { Study } from 'src/app/common/models/study.model';
import { LocationService } from 'src/app/core/services/location.service';
import { Month } from 'src/app/common/models/month.model';

@Component({
  selector: 'study-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class StudyListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'sector', 'location', 'month'];
  dataSource: MatTableDataSource<Study>;
  items: Study[] = [];
  itemsSubs = new Subscription();
  months: Month[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dialoge: MatDialog,
    private studyService: StudyService,
    private sectorService: SectorService,
    private locationService: LocationService,
  ) {
    this.studyService.List();
    this.months = this.sectorService.Months;
    this.items = this.studyService.Items;
    this.dataSource = new MatTableDataSource(this.items);
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.itemsSubs = this.studyService.itemsChanged.subscribe(
      (newItems: Study[]) => {
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

  DialogeForm(dataUpd?: Study) {
    const dialogRef = this.dialoge.open(StudyFormComponent, {
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
    let sector = this.sectorService.GetItemtID(idSector);
    return sector ? sector.name : '';
  }

  Month(numberValue: number) {
    return this.months[numberValue] ? this.months[numberValue].name : '';
  }

  Location(idLocation: String) {
    let location = this.locationService.GetItemtID(idLocation);
    return location ? location.name : '';
  }

}
