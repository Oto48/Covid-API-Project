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
  option!: EChartsOption;
  dateForm!: FormGroup;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getGeneralData().subscribe((array: any) => {
      this.generalArray = array.data;
    });

    this.dateForm = new FormGroup({
      date: new FormControl(null),
    });
  }

  search() {
    let newArray = this.generalArray.filter(
      (object: any) => object.date == this.dateForm.value.date
    )[0];
    this.option = {
      title: {
        text: 'General Chart',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
        },
      },
      series: [
        {
          name: 'Area Mode',
          type: 'pie',
          radius: [20, 140],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5,
          },
          data: [
            { value: newArray.confirmed, name: 'Confirmed' },
            { value: newArray.new_confirmed, name: 'New Confirmed' },
            { value: newArray.deaths, name: 'Deaths' },
            { value: newArray.new_deaths, name: 'New Deaths' },
            { value: newArray.recovered, name: 'Recovered' },
            { value: newArray.new_recovered, name: 'New Recovered' },
          ],
        },
      ],
    };
  }
}
