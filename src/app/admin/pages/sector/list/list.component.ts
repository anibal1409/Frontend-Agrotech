import { Component, OnInit, ViewChild } from '@angular/core';
import { Sector } from 'src/app/common/models/sector.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SectorService } from 'src/app/core/services/sector.service';
import { SectorWizardComponent } from '../wizard/wizard.component';
import { WeatherService } from 'src/app/core/services/weather.service';
import { LoaderService } from 'src/app/common/components/loader/loader.service';

@Component({
  selector: 'sector-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class SectorListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'pending', 'weather'];
  dataSource: MatTableDataSource<Sector>;
  items: Sector[] = [];
  itemsSubs = new Subscription();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dialoge: MatDialog,
    private sectorService: SectorService,
    private weatherService: WeatherService,
    private loaderService: LoaderService
  ) {
    this.sectorService.List();
    this.items = this.sectorService.Items;
    this.dataSource = new MatTableDataSource(this.items);
   }

  ngOnInit() {
    this.loaderService.show();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.itemsSubs = this.sectorService.itemsChanged.subscribe(
      (newItems: Sector[]) => {
        if (newItems) {
          this.items = newItems;
          this.dataSource = new MatTableDataSource(newItems);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    );
    setTimeout(() => {
      this.loaderService.hide();
    }, 100);
  }

  ngOnDestroy(): void {
    this.itemsSubs.unsubscribe();
  }

  DialogeForm(dataUpd?: Sector) {
    const dialogRef = this.dialoge.open(SectorWizardComponent, {
      // width: '40rem',
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

  Weather(idWeather: String) {
    let weather = this.weatherService.GetItemtID(idWeather);
    return weather ? weather.name : '';
  }

}
