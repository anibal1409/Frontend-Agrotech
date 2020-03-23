import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Weather } from 'src/app/common/models/weather.model';
import { WeatherService } from 'src/app/core/services/weather.service';
import { WeatherFormComponent } from '../form/form.component';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/app/common/components/loader/loader.service';

@Component({
  selector: 'weather-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class WeatherListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<Weather>;
  items: Weather[] = [];
  itemsSubs = new Subscription();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dialoge: MatDialog,
    private weatherService: WeatherService,
    private loaderService: LoaderService
  ) {
    this.weatherService.List();
    this.items = this.weatherService.Items;
    this.dataSource = new MatTableDataSource(this.items);
   }

   ngOnInit() {
    this.loaderService.show();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.itemsSubs = this.weatherService.itemsChanged.subscribe(
      (newItems: Weather[]) => {
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

  DialogeForm(dataUpd?: Weather) {
    const dialogRef = this.dialoge.open(WeatherFormComponent, {
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
}
