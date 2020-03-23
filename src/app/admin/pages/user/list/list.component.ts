import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../form/form.component';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoaderService } from 'src/app/common/components/loader/loader.service';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'email', 'role'];
  dataSource: MatTableDataSource<User>;
  items: User[] = [];
  itemsSubs = new Subscription();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dialoge: MatDialog,
    private userService: UserService,
    private loaderService: LoaderService,
  ) {
    this.userService.List();
    this.items = this.userService.Items;
    this.dataSource = new MatTableDataSource(this.items);
   }

  ngOnInit() {
    this.loaderService.show();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.itemsSubs = this.userService.itemsChanged.subscribe(
      (newItems: User[]) => {
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

  DialogeForm(dataUpd?: User) {
    const dialogRef = this.dialoge.open(UserFormComponent, {
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

  GetRole(valueRole: String) {
    const myRole = this.userService.GetRoleValue(valueRole);
    return myRole ? myRole.name : '';
  }


}
