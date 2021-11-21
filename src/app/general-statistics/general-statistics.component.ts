import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrls: ['./general-statistics.component.scss'],
})
export class GeneralStatisticsComponent implements OnInit {
  generalArray: any;
  lineChart!: EChartsOption;
  dateForm!: FormGroup;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getGeneralData().subscribe((array: any) => {
      this.generalArray = array.data;
      this.showData(this.generalArray[0]);
    });

    this.dateForm = new FormGroup({
      date: new FormControl(null),
    });
  }

  search() {
    let newArray = this.generalArray.filter(
      (object: any) => object.date == this.dateForm.value.date
    )[0];

    this.showData(newArray);
  }

  showData(data: any) {
    this.lineChart = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['Confirmed', 'Deaths', 'Recovered'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [data.confirmed, data.deaths, data.recovered],
          type: 'line',
        },
      ],
    };
  }
}
