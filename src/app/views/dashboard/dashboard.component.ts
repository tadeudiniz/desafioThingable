import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Climate } from 'src/app/resources/models/climate';
import { ResponseDashboard } from 'src/app/resources/models/ResponseDashboard';
import { environment } from 'src/environments/environment';
Chart.register(...registerables);
import climateDatas from '../../../assets/csvjson.json';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  climateData: Climate[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }
  
  

  handleData (data: ResponseDashboard){
    this.climateData = data
    this.loadDashboard();
  }

  handleErrors (error: HttpErrorResponse) {
    if(error.status === 401) {
      this.doLogout()
    }
  }

  getClimateData() {
    const token = localStorage.getItem('token')
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return this.httpClient.get<ResponseDashboard>(`${environment.apiURL}/dashboard`, {
      headers
    }).subscribe(data => this.handleData(data), (error: HttpErrorResponse) => this.handleErrors(error));
  }

  ngOnInit() {
    this.getClimateData();
  }

  loadDashboard() {
    //Percorre o arquivo json e retorna os valores dos parâmetros
    const labels = this.climateData.map(function (e) {
      return e.date;
    });
    const dataMeanTemp = this.climateData.map(function (e) {
      return e.meantemp;
    });
    const dataHumidity = this.climateData?.map(function (e) {
      return e.humidity;
    });
    const dataWindSpeed = this.climateData.map(function (e) {
      return e.wind_speed;
    });
    const dataMeanpress = this.climateData.map(function (e) {
      return e.meanpressure;
    });

    //Para exibir o gráfico
    new Chart("ctx", {
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
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

}
