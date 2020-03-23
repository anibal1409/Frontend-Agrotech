import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Texture } from 'src/app/common/models/texture.model';
import { TextureService } from 'src/app/core/services/texture.service';
import { TextureFormComponent } from '../form/form.component';
import { LoaderService } from 'src/app/common/components/loader/loader.service';

@Component({
  selector: 'texture-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class TextureListComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<Texture>;
  items: Texture[] = [];
  itemsSubs = new Subscription();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dialoge: MatDialog,
    private textureService: TextureService,
    private loaderService: LoaderService,
  ) {
    this.textureService.List();
    this.items = this.textureService.Items;
    this.dataSource = new MatTableDataSource(this.items);
   }

  ngOnInit() {
    this.loaderService.show();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.itemsSubs = this.textureService.itemsChanged.subscribe(
      (newItems: Texture[]) => {
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

  DialogeForm(dataUpd?: Texture) {
    const dialogRef = this.dialoge.open(TextureFormComponent, {
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
