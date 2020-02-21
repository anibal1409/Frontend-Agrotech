import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Crop } from 'src/app/common/models/crop.model';
import { CropService } from 'src/app/core/services/crop.service';
import { CropFormComponent } from '../form/form.component';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'crop-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CropListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'scientificName', 'weather'];
  dataSource: MatTableDataSource<Crop>;
  items: Crop[] = [];
  itemsSubs = new Subscription();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dialoge: MatDialog,
    private cropService: CropService,
    private weatherService: WeatherService,
  ) {
    this.cropService.List();
    this.items = this.cropService.Items;
    this.dataSource = new MatTableDataSource(this.items);
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.itemsSubs = this.cropService.itemsChanged.subscribe(
      (newItems: Crop[]) => {
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

  DialogeForm(dataUpd?: Crop) {
    const dialogRef = this.dialoge.open(CropFormComponent, {
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

  Weather(idWeather: String) {
    let weather = this.weatherService.GetItemtID(idWeather);
    return weather ? weather.name : '';
  }

}
