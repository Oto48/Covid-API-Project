import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { APIResponse, Data } from '../models';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrls: ['./general-statistics.component.scss'],
})
export class GeneralStatisticsComponent implements OnInit {
  generalArray: Array<Data>;
  lineChart: EChartsOption;
  dateForm: FormGroup;
  generalData: Data;
  lastData: Data;
  maxDate: string;
  minDate: string;
  title: string;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getGeneralData().subscribe((array: APIResponse<Data>) => {
      this.generalArray = array.data;
      this.generalData = this.generalArray[0];
      this.lastData = this.generalArray[this.generalArray.length - 1];
      this.maxDate = this.generalData.date;
      this.minDate = this.lastData.date;
      this.title = 'Date: ' + this.generalData.date;
      this.showData(this.generalData);
    });

    this.dateForm = new FormGroup({
      date: new FormControl(null),
    });
  }

  search() {
    let newArray = this.generalArray.filter(
      (object: Data) => object.date == this.dateForm.value.date
    )[0];
    this.generalData = newArray;
    this.title = 'Date: ' + this.generalData.date;
    this.showData(this.generalData);
  }

  showData(data: Data) {
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
