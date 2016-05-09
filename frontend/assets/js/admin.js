$(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    $('#container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Faculty User Section Distribution'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %</a>',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Volunteer Frequency',
            colorByPoint: true,
            data: [{
                name: 'AB-7L',
                y: 27.33,
                sliced: true,
            }, {
                name: 'AB-2L',
                y: 24.27,
            }, {
                name: 'AB-4L',
                y: 15.88
            }, {
                name: 'AB-3L',
                y: 13.79
            }, {
                name: 'AB-1L',
                y: 8.92
            }, {
                name: 'AB-5L',
                y: 5.21
            }, {
                name: 'AB-6L',
                y: 4.6
            }]
        }]
    });

    $('#container2').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'User Login Count per Lab Class'
        },
        subtitle: {
            text: 'for the whole semester'
        },
        xAxis: {
            categories: [
                'AB-1L',
                'AB-2L',
                'AB-3L',
                'AB-4L',
                'AB-5L',
                'AB-6L',
                'AB-7L',
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Volunteers'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} students</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Male',
            data: [5, 3, 2, 3, 2, 1, 4]

        }, {
            name: 'Female',
            data: [3, 2, 1, 5, 1, 4, 4]
        }]
    });

    $('#container3').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'User Logout Count per Lab Class'
        },
        subtitle: {
            text: 'for the whole semester'
        },
        xAxis: {
            categories: [
                'AB-1L',
                'AB-2L',
                'AB-3L',
                'AB-4L',
                'AB-5L',
                'AB-6L',
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Volunteers'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} students</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Male',
            data: [5, 3, 2, 3, 2, 1]

        }, {
            name: 'Female',
            data: [3, 2, 1, 5, 1, 4]
        }]
    });
  });