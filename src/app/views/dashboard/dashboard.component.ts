import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import climateDatas from '../../../assets/csvjson.json';

interface Climate {
  date: string;
  meantemp: number;
  humidity: number;
  wind_speed: number;
  meanpressure: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  climateData: Climate[] = climateDatas;

  ngOnInit() {

    console.log(climateDatas);

    var jsonfile = {
      "jsonarray": climateDatas
    };

    //Percorre o arquivo json e retorna os valores dos parâmetros
    var labels = jsonfile.jsonarray.map(function (e) {
      return e.date;
    });
    var dataMeanTemp = jsonfile.jsonarray.map(function (e) {
      return e.meantemp;
    });
    var dataHumidity = jsonfile.jsonarray.map(function (e) {
      return e.humidity;
    });
    var dataWindSpeed = jsonfile.jsonarray.map(function (e) {
      return e.wind_speed;
    });
    var dataMeanpress = jsonfile.jsonarray.map(function (e) {
      return e.meanpressure;
    });

    //Para exibir o gráfico
    var myChart = new Chart("ctx", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperatura Média",
            backgroundColor: "rgba(78, 115, 223, 0.05)",
            borderColor: "rgba(78, 115, 223, 1)",
            pointRadius: 2,
            tension: 0.1,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: dataMeanTemp,
          },
          {
            label: "Umidade",
            data: dataHumidity,
            hidden: true,
            borderColor: "#FFCC00",
            pointRadius: 2,
            tension: 0.1,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
          },
          {
            label: "Velocidade do Vento",
            data: dataWindSpeed,
            hidden: true,
            borderColor: "rgb(234, 67, 53, 1)",
            pointRadius: 2,
            tension: 0.1,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
          },
          {
            label: "Pressão Média",
            data: dataMeanpress,
            hidden: true,
            borderColor: "rgb(52, 168, 83, 1)",
            pointRadius: 2,
            tension: 0.1,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
          }
        ]
      },
    });
  }

  doLogout() {
    this.router.navigate(['dashboard'])
  }

}
