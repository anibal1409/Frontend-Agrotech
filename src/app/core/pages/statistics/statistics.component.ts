import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/common/components/loader/loader.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SectorService } from '../../services/sector.service';
import { Sector } from 'src/app/common/models/sector.model';
import { Subscription } from 'rxjs';
import { textFieldAppearance } from 'src/app/common/constants/apaperance.constant';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  mySector: Sector = null;
  sectors: Sector[] = [];
  sectorsSubs: Subscription;
  inputAppearance: string = textFieldAppearance;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    // { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' },
    // { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' },
    // { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' },
    // { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];

  constructor(
    private loaderService: LoaderService,
    private sectorService: SectorService,
  ) {
    this.sectorService.Months.forEach(
      (month) => {
        this.barChartLabels.push(month.name);
      }
    );
    this.sectors = this.sectorService.Items;
    this.sectorsSubs = this.sectorService.itemsChanged.subscribe(
      (newItems) => {
        this.sectors = newItems;
      }
    );
    
  }
  ngOnInit() {
  }

  changeSector(sector: any) {
    this.mySector = sector.value;
    this.loadData();
  }

  loadData() {
    if (this.mySector) {
      let temperature: number[]  = [];
      let light: number[]  = [];
      let humidity: number[]  = [];
      for (let i = 0; i < 12; i++) {
        temperature.push(
          (this.mySector.sectorTemperatures[i].min + this.mySector.sectorTemperatures[i].max) / 2
        );
        light.push(
          (this.mySector.sectorLights[i].min + this.mySector.sectorLights[i].max) / 2
        );
        humidity.push(
          (this.mySector.sectorHumidities[i].min + this.mySector.sectorHumidities[i].max) / 2
        );
      }
      this.barChartData.push(
        { data: temperature, label: 'Temperatura' },
        { data: humidity, label: 'Humedad' },
        { data: light, label: 'Luz' },
      );
    }
  }
}
