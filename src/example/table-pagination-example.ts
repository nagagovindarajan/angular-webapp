import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {environment} from "../environments/environment";

/**
 * @title Table with pagination
 */
@Component({
  selector: 'table-pagination-example',
  styleUrls: ['table-pagination-example.css'],
  templateUrl: 'table-pagination-example.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, HttpClientModule],
})
export class TablePaginationExample implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  data: any;
  count_200 = 0
  count_404 = 0
  count_500 = 0
  count_503 = 0

  tableData : any[] = []

  displayedColumns: string[] = ['time_stamp', '200', '301', '400', '403', '404', '408', '500', '503'];
  dataSource:any = new MatTableDataSource<any>(this.tableData);
  constructor(private http: HttpClient) {
    this.http.get(environment.latest_summary).subscribe(response => {
      this.data = response;
      console.log(this.data);
      this.count_200 = this.data['200']
      this.count_404 = this.data['404']
      this.count_500 = this.data['500']
      this.count_503 = this.data['503']
    });

    this.http.get(environment.past_hour_summary).subscribe(response => {
      this.tableData = response as any[];
      this.dataSource = new MatTableDataSource<any>(this.tableData);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}