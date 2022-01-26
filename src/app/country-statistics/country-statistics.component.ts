import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { dataTool, EChartsOption } from 'echarts';
import { APIResponse, CountryData, Data } from '../models';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-country-statistics',
  templateUrl: './country-statistics.component.html',
  styleUrls: ['./country-statistics.component.scss'],
})
export class CountryStatisticsComponent implements OnInit {
  constructor(private api: ApiService) {}

  countriesArray: Array<CountryData>;
  countryForm: FormGroup;
  option: EChartsOption;
  barChart: EChartsOption;
  title: string;

  countryData: CountryData;
  fullData: Array<Data>;
  monthlyData: Array<Data>;
  validData: boolean = true;

  ngOnInit(): void {
    this.api.getCountriesData().subscribe((array: APIResponse<CountryData>) => {
      this.countriesArray = array.data;
    });

    this.countryForm = new FormGroup({
      country: new FormControl(null),
    });
  }

  selectCountry() {
    let country = this.countriesArray.filter(
      (country: CountryData) => country.name == this.countryForm.value.country
    )[0];
    if (country.timeline.length !== 0) {
      this.validData = true;
      this.fullData = country.timeline;
      if (
        this.fullData[0].date > this.fullData[this.fullData.length - 1].date
      ) {
        this.fullData.reverse();
      }
      if (this.fullData.length === 122) {
        this.fullData.shift();
      }
      this.countryData = country;
      this.monthlyData = this.fullData.slice(-90);
      this.showFullData();
    } else {
      this.validData = false;
      alert('Invalid country data');
    }
  }

  showFullData() {
    this.title = 'FUll statistics';
    this.showChart(this.fullData);
  }

  showMonthlyData() {
    this.title = 'Last 3 months statistics';
    this.showChart(this.monthlyData);
  }

  showChart(data: Array<Data>) {
    this.option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Total Confirmed', 'Total Deaths', 'Total Recovered'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map((data: Data) => ({
          value: data.date,
        })),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Total Confirmed',
          type: 'line',
          showSymbol: false,
          data: data.map((data: Data) => ({
            value: data.confirmed,
          })),
        },
        {
          name: 'Total Deaths',
          type: 'line',
          showSymbol: false,
          data: data.map((data: Data) => ({
            value: data.deaths,
          })),
        },
        {
          name: 'Total Recovered',
          type: 'line',
          showSymbol: false,
          data: data.map((data: Data) => ({
            value: data.recovered,
          })),
        },
      ],
    };

    this.barChart = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      legend: {
        data: ['Daily Confirmed', 'Daily Deaths', 'Daily Recovered'],
      },
      xAxis: [
        {
          type: 'category',
          data: data.map((data: Data) => ({
            value: data.date,
          })),
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Daily Confirmed',
          type: 'bar',
          data: data.map((data: Data) => ({
            value: data.new_confirmed,
          })),
        },
        {
          name: 'Daily Deaths',
          type: 'bar',
          data: data.map((data: Data) => ({
            value: data.new_deaths,
          })),
        },
        {
          name: 'Daily Recovered',
          type: 'bar',
          data: data.map((data: Data) => ({
            value: data.new_recovered,
          })),
        },
      ],
    };
  }
}
