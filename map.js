/**
 * 模拟迁徙图功能实现
 */
require.config({
    paths: {
        echarts: './js'
    }
});
var ecConfig;
require(
    [
        'echarts',
        'echarts/chart/map'
    ],
    function (ec) {
        ecConfig = require('echarts/config');
        myChart = ec.init(document.getElementById('map'));
        initData();
        loadAll(2018, '数据交换监控');
    }
);

var myChart;
option = {
    backgroundColor: '#1b1b1b',
    color: ['gold', 'aqua', 'lime'],
    title: {
        show: true,
        text: ' ',

        x: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params, ticket, callback) {
            /*$.get('detail?name=' + params.name, function (content) {
                callback(ticket, toHTML(content));
            });*/
            var tips = '<ul style="list-style: none">';
            tips += '<li>行政区划：' + params.name + '</li>';
            tips += '<li>历史已报件：1000个</li>';
            tips += '<li>最近上报时间：' + new Date().toLocaleTimeString() + '</li>';
            tips += '</ul>';
            return tips;
        }
    },
    legend: {
        show: true,
        orient: 'vertical',
        x: 'left',
        data: ['玉溪 Top10', '大理 Top10', '保山 Top10'],
        selectedMode: 'single',
        selected: {
            '保山 Top10': false,
            '大理 Top10': false
        },
        textStyle: {
            color: '#fff'
        }
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        x: 'right',
        y: 'center',
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    dataRange: {
        min: 0,
        max: 100,
        calculable: true,
        color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
        textStyle: {
            color: '#fff'
        }
    },
    series: [
        {
            name: '云南',
            type: 'map',
            roam: true,
            hoverable: false,
            mapType: '云南',
            itemStyle: {
                normal: {
                    color: '#28363E',
                    borderColor: 'rgba(100,149,237,1)',
                    borderWidth: 1,
                    areaStyle: {
                        color: '#1b1b1b'
                    },
                    label: {
                        show: true,
                        textStyle: {
                            fontSize: 12,
                            color: 'white'
                        }
                    }
                }
            },
            data: [],
            markLine: {

                smooth: true,
                symbol: ['none', 'circle'],
                symbolSize: 1,
                itemStyle: {
                    normal: {
                        color: '#fff',
                        borderWidth: 1,
                        borderColor: 'rgba(30,144,255,0.5)'
                    }
                },
                data: [],
            },
            geoCoord: {
                '普洱市': [100.7446, 23.4229],
                '红河哈尼族彝族自治州': [103.0408, 23.6041],
                '文山壮族苗族自治州': [104.8865, 23.5712],
                '曲靖市': [103.9417, 25.7025],
                '楚雄彝族自治州': [101.6016, 25.3619],
                '大理白族自治州': [99.9536, 25.6805],
                '临沧市': [99.613, 24.0546],
                '迪庆藏族自治州': [99.4592, 27.9327],
                '昭通市': [104.0955, 27.6031],
                '昆明市': [102.9199, 25.4663],
                '丽江市': [100.448, 26.955],
                '西双版纳傣族自治州': [100.8984, 21.8628],
                '保山市': [99.0637, 24.9884],
                '玉溪市': [101.9312, 23.8898],
                '怒江傈僳族自治州': [99.1516, 26.5594],
                '德宏傣族景颇族自治州': [98.1299, 24.5874],
            }
        },
        {
            name: '昆明市',
            type: 'map',
            mapType: '云南',
            data: [],
            markLine: {
                smooth: true,
                effect: {
                    show: true,
                    scaleSize: 2,
                    period: 30,
                    color: '#fff',
                    shadowBlur: 10
                },
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        lineStyle: {
                            type: 'solid',
                            shadowBlur: 10
                        }
                    }
                }
            },
            markPoint: {
                symbol: 'emptyCircle',
                symbolSize: function (v) {
                    return 10 + v / 10
                },
                effect: {
                    show: true,
                    shadowBlur: 0
                },
                itemStyle: {
                    normal: {
                        label: {show: false}
                    },
                    emphasis: {
                        label: {position: 'top'}
                    }
                }
            }

        }
    ]
};

function changeDataSource() {
    var dataSourceId = parseInt($("#dataSourceId").val());
    loadAll(dataSourceId, '数据交换监控');
}

/**
 * 加载数据源，构造需要加入迁徙图的数据和连线信息
 * @param dataSourceId 数据源  data.js中定义的对象
 * @param title 标题
 */
function loadAll(dataSourceId, title) {
    myChart.clear();
    var data = h2.get(dataSourceId);
    option.series[1].markLine.data = [];
    //各市州到中心的连线数据
    for (var i = 0; i < data.length; i++) {
        var point = new Object();
        point.name = data[i].name;
        var centerPoint = new Object();
        centerPoint.name = center;
        var arr = new Array();
        arr.push(point);
		arr.push(centerPoint);
        option.series[1].markLine.data.push(arr);
    }
    //流向数据
    option.series[1].markPoint.data = data;
    option.title.text = title;
    myChart.setOption(option);
}

var h2 = new HashMap();

function initData() {
    for (var i = 0; i < dataSource.length; i++) {
        h2.put(dataSource[i].dataSourceId, dataSource[i].data);
    }
}

window.onresize = function () {
    myChart.resize();
}

