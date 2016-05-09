 $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

   $('#container').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Historic World Population by Region'
        },
        subtitle: {
            text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
        },
        xAxis: {
            categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population (millions)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Year 1800',
            data: [107, 31, 635, 203, 2]
        }, {
            name: 'Year 1900',
            data: [133, 156, 947, 408, 6]
        }, {
            name: 'Year 2012',
            data: [1052, 954, 4250, 740, 38]
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