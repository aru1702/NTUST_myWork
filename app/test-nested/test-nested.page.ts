import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-nested',
  templateUrl: './test-nested.page.html',
  styleUrls: ['./test-nested.page.scss'],
})
export class TestNestedPage implements OnInit {

  constructor(public http: HttpClient) { }

  maintenanceData: any;

  ngOnInit() {
    this.getAPI();
  }

  async getAPI() {
    const apiUrl = 'https://smartcampus.et.ntust.edu.tw:5425/Dispenser/Maintenance?Device_ID=T4_04_01';
    let getAPI = await this.http.get(apiUrl).toPromise();

    let errorMeaning = ["Button does not respond", "Unable to water", "Leaking water", "Screen not shown", "Other"];

    let dataMaintenance = [];
    for (let i = getAPI['Data'].length - 1; i >= 0; i--) {
      let dataForMaintenance = {
        'Device_ID': getAPI['Data'][i]['Device_ID'],
        'ErrorType': getAPI['Data'][i]['ErrorType'],
        'Description': getAPI['Data'][i]['Description'],
        'CompleteTime': getAPI['Data'][i]['CompleteTime'],
        'ErrorMeaning': errorMeaning[getAPI['Data'][i]['ErrorType'] - 1],
        'Day': this.getTime(getAPI['Data'][i]['CompleteTime'])['dayForTime'],
        'Month': this.getTime(getAPI['Data'][i]['CompleteTime'])['monthForTime'],
        'Year': this.getTime(getAPI['Data'][i]['CompleteTime'])['yearForTime']
      };
      dataMaintenance.push(dataForMaintenance);
    }

    console.log("Hasil data maintenance:");
    console.log(dataMaintenance);

    

    // let result = [];
    // for (let i = 0 ; i < dataMaintenance.length ; i++) {
    //   let getMonth = dataMaintenance[i]['Month'];
    //   let key = 0;

    //   // search for month
    //   if (result.length != 0) {
    //     for (let ii = 0 ; ii < result.length ; i++) {
    //       if (result[ii]['Month'] === getMonth) {
    //         key = ii;
    //       }
    //     }
    //   }

    //   let hasil = {
    //     'Month': getMonth
    //   };

    //   console.log(hasil);

    //   await result.push(hasil)
    // }

    // console.log("Hasil setelah filter:");
    // console.log(result);

    /**
    let dataResult = [];
    let i = 0;

    while (i < dataMaintenance.length) {
      if (i > 0) {
        let dataArray = [];

        let lastBulan = dataMaintenance[i - 1]['Month'];
        let lastTahun = dataMaintenance[i - 1]['Year'];

        let nowBulan = dataMaintenance[i]['Month'];
        let nowTahun = dataMaintenance[i]['Year'];

        while (lastBulan == nowBulan && lastTahun == nowTahun) {
          // dataArray.push(dataMaintenance[i]);

          console.log("nama bulan" + nowBulan);
          console.log("tahun" + nowTahun);

          let dayMaintenance = {
            'Device_ID': dataMaintenance[i]['Device_ID'],
            'ErrorType': dataMaintenance[i]['ErrorType'],
            'Description': dataMaintenance[i]['Description'],
            'CompleteTime': dataMaintenance[i]['CompleteTime'],
            'ErrorMeaning': dataMaintenance[i]['ErrorMeaning'],
            'Day': dataMaintenance[i]['Day']
          };
          dataArray.push(dayMaintenance);

          i++;

          nowBulan = dataMaintenance[i]['Month'];
          nowTahun = dataMaintenance[i]['Year'];
        }

        let monthMaintenance = {
          'Month': lastBulan,
          'dayMaintenance': dataArray
        };

        dataResult.push(monthMaintenance);
        dataArray = [];
      }

      console.log(i);
      i++;
      console.log(dataResult);
    }

    let tahun = dataMaintenance[0]['Year'];
    this.maintenanceData = {
      'MonthMaintenance': dataResult,
      'Year': tahun
    }

    console.log(this.maintenanceData);
    */

    // for (let i = 0; i < getAPI['Data'].length; i++) {
    //   if (i == 0) {
    //     monthMaintenance = {
    //       'month': dataMaintenance[0]['Month'],
    //       'day': dataMaintenance[0]
    //     }
    //   } else {
    //     if (dataMaintenance[i]['Month'] == dataMaintenance[i - 1]['Month'])

    //   }
    // }
    // console.log(monthMaintenance);
    // if (i == getAPI['Data'].length - 1) {
    //   dayMaintenance.push(dataForMaintenance);
    // } else {
    //   if (dataForMaintenance['Month'] == dayMaintenance[0]['Month']) {
    //     dayMaintenance.push(dataForMaintenance);
    //   } else {
    //     let monthMaintenance = {
    //       'month': dayMaintenance[i + 1]['Month'],
    //       'day': dayMaintenance
    //     }
    //     dayMaintenance = [];
    //   }
    // }



    // console.log(this.maintenanceData);
  }


  getTime(time) {
    // time passed is String, construct into Date format
    // time example from json: "2019-03-08 16:32:00"
    // format: YEAR-MONTH-DATEOFMONTH HOUR:MINUTE:SECOND

    let monthName = ["January", "February", "March", "April", "June", "July", "August", "September", "Oktober", "Desember"]
    // split into DATE form and HOUR form
    let splitTime = time.split(" ");

    let resultDate = splitTime[0];
    let resultHour = splitTime[1];

    // split DATE into YEAR, MONTH, and DATEOFMONTH
    let splitDate = resultDate.split("-");

    let resultYear = splitDate[0];
    let resultMonth = splitDate[1] - 1;
    let resultDateOfMonth = splitDate[2];

    // // split HOUR into HOUR, MINUTE, and SECOND
    // let splitHour = resultHour.split(":");

    // let resultHourC = splitHour[0];
    // let resultMinute = splitHour[1];
    // let resultSecond = splitHour[2];

    // now we get every component to construct date from String
    // let newDate = new Date(
    //   resultYear,
    //   resultMonth,
    //   resultDateOfMonth,
    //   resultHourC,
    //   resultMinute,
    //   resultSecond,
    //   0
    // );

    let newDate = {
      'dayForTime': resultDateOfMonth,
      'monthForTime': monthName[resultMonth],
      'yearForTime': resultYear
    }

    return newDate;
  }
}