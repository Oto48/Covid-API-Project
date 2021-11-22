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
  generalArray: object[];
  lineChart: EChartsOption;
  dateForm: FormGroup;
  generalData: any;
  lastData: any;
  maxDate: string;
  minDate: string;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getGeneralData().subscribe((array: any) => {
      this.generalArray = array.data;
      this.generalData = this.generalArray[0];
      this.lastData = this.generalArray[this.generalArray.length - 1];
      this.maxDate = this.generalData.date;
      this.minDate = this.lastData.date;
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
    this.generalData = newArray;
    this.showData(newArray);
  }

  showData(data: any) {
    this.lineChart = {
      tooltip: {
        trigger: 'axis',
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
