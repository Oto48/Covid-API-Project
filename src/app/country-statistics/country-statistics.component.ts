import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { dataTool, EChartsOption } from 'echarts';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-country-statistics',
  templateUrl: './country-statistics.component.html',
  styleUrls: ['./country-statistics.component.scss'],
})
export class CountryStatisticsComponent implements OnInit {
  constructor(private api: ApiService) {}

  countriesArray: any;
  countryForm!: FormGroup;
  option!: EChartsOption;

  population: any;
  updatedAt: any;
  deathRate: any;
  recoveryRate: any;
  casePerMillion: any;
  confirmed: any;
  confirmedToday: any;
  deaths: any;
  deathsToday: any;
  recovered: any;
  recoveredToday: any;

  ngOnInit(): void {
    this.api.getCountriesData().subscribe((array: any) => {
      this.countriesArray = array.data;
    });

    this.countryForm = new FormGroup({
      country: new FormControl(null),
    });
  }

  selectCountry() {
    console.log(this.countryForm.value.country);
    let country = this.countriesArray.filter(
      (country: any) => country.name == this.countryForm.value.country
    )[0];

    let timeline = country.timeline.reverse();

    this.population = country.population;
    this.updatedAt = country.updated_at;
    this.deathRate = country.latest_data.calculated.death_rate;
    this.recoveryRate = country.latest_data.calculated.recovery_rate;
    this.casePerMillion =
      country.latest_data.calculated.cases_per_million_population;
    this.confirmed = country.latest_data.calculated.confirmed;
    this.confirmedToday = country.today.confirmed;
    this.deaths = country.latest_data.calculated.deaths;
    this.deathsToday = country.today.deaths;
    this.recovered = country.latest_data.calculated.recovered;
    // this.recoveredToday = country.today.recovered;

    this.option = {
      title: {
        text: 'Stacked Line',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Confirmed', 'Deaths'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: timeline.map((data: any) => ({
          value: data.date,
        })),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Confirmed',
          type: 'line',
          showSymbol: false,
          stack: 'Total',
          data: timeline.map((data: any) => ({
            value: data.confirmed,
          })),
        },
        {
          name: 'Deaths',
          type: 'line',
          showSymbol: false,
          stack: 'Total',
          data: timeline.map((data: any) => ({
            value: data.deaths,
          })),
        },
      ],
    };
  }
}

// this.option = {
//   title: {
//     text: 'Stacked Line',
//   },
//   tooltip: {
//     trigger: 'axis',
//   },
//   legend: {
//     data: ['Confirmed', 'Deaths'],
//   },
//   grid: {
//     left: '3%',
//     right: '4%',
//     bottom: '3%',
//     containLabel: true,
//   },
//   toolbox: {
//     feature: {
//       saveAsImage: {},
//     },
//   },
//   xAxis: {
//     type: 'category',
//     boundaryGap: false,
//     data: this.test.map((data: any) => ({
//       value: data.date,
//     })),
//   },
//   yAxis: {
//     type: 'value',
//   },
//   series: [
//     {
//       name: 'Confirmed',
//       type: 'line',
//       showSymbol: false,
//       stack: 'Total',
//       data: this.test.map((data: any) => ({
//         value: data.confirmed,
//       })),
//     },
//     {
//       name: 'Deaths',
//       type: 'line',
//       showSymbol: false,
//       stack: 'Total',
//       data: this.test.map((data: any) => ({
//         value: data.deaths,
//       })),
//     },
//   ],
// };
