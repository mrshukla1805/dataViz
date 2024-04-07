
const barData = [
    { letter: "A", frequency: 0.08167 },
    { letter: "B", frequency: 0.01492 },
    { letter: "C", frequency: 0.02782 },
    { letter: "D", frequency: 0.04253 },
    { letter: "E", frequency: 0.12702 },
    { letter: "F", frequency: 0.02288 },
    { letter: "G", frequency: 0.02015 },
    { letter: "H", frequency: 0.06094 },
    { letter: "I", frequency: 0.06966 },
    { letter: "J", frequency: 0.00153 }
  ];
  

const lineData = [1, 3, 5, 4, 8, 6, 3, 8, 8, 10];

const radarChartData = [
  {
    "text": "Apple",
    "quadrant": 3,
    "circle": 1
  },
  {
    "text": "Banana",
    "quadrant": 2,
    "circle": 4
  },
  {
    "text": "Orange",
    "quadrant": 1,
    "circle": 3
  },
  {
    "text": "Grapes",
    "quadrant": 4,
    "circle": 2
  }
]

const sankeyNodes = [
  { name: 'A1' },
  { name: 'A2' },
  { name: 'A3' },
  { name: 'A4' },
  { name: 'A5' },
  { name: 'A6' },
  { name: 'A7' },
  { name: 'A8' },
  { name: 'A9' },
  { name: 'A10' }
];

const sankeyLinks = [
  { source: 0, target: 1, value: 200 },
  { source: 0, target: 2, value: 300 },
  { source: 1, target: 2, value: 150 },
  { source: 1, target: 3, value: 50 },
  { source: 2, target: 3, value: 200 },
  { source: 2, target: 4, value: 100 },
  { source: 3, target: 5, value: 50 },
  { source: 3, target: 6, value: 150 },
  { source: 4, target: 6, value: 150 },
  { source: 5, target: 6, value: 100 },
  { source: 5, target: 7, value: 200 },
  { source: 6, target: 8, value: 150 },
  { source: 6, target: 9, value: 200 },
  { source: 7, target: 9, value: 100 }
];


const densityData = [
  { "PointA": 20, "PointB": 30, "PointC": 40 },
  { "PointA": 10, "PointB": 40, "PointC": 50 },
  { "PointA": 15, "PointB": 25, "PointC": 60 },
  { "PointA": 30, "PointB": 50, "PointC": 25 },
  { "PointA": 40, "PointB": 20, "PointC": 35 },
  { "PointA": 25, "PointB": 45, "PointC": 30 },
  { "PointA": 35, "PointB": 15, "PointC": 50 },
  { "PointA": 45, "PointB": 10, "PointC": 45 },
  { "PointA": 10, "PointB": 55, "PointC": 35 },
  { "PointA": 30, "PointB": 35, "PointC": 40 },
  { "PointA": 20, "PointB": 20, "PointC": 60 },
  { "PointA": 40, "PointB": 30, "PointC": 30 },
  { "PointA": 25, "PointB": 40, "PointC": 35 },
  { "PointA": 15, "PointB": 30, "PointC": 55 },
  { "PointA": 35, "PointB": 20, "PointC": 45 },
  { "PointA": 40, "PointB": 10, "PointC": 50 },
  { "PointA": 20, "PointB": 45, "PointC": 35 },
  { "PointA": 30, "PointB": 25, "PointC": 45 },
  { "PointA": 10, "PointB": 35, "PointC": 55 },
  { "PointA": 25, "PointB": 15, "PointC": 60 },
  { "PointA": 45, "PointB": 20, "PointC": 35 },
  { "PointA": 15, "PointB": 50, "PointC": 35 },
  { "PointA": 35, "PointB": 30, "PointC": 35 },
  { "PointA": 20, "PointB": 40, "PointC": 40 },
  { "PointA": 40, "PointB": 25, "PointC": 35 },
  { "PointA": 30, "PointB": 15, "PointC": 55 },
  { "PointA": 25, "PointB": 30, "PointC": 45 },
  { "PointA": 10, "PointB": 20, "PointC": 70 },
  { "PointA": 20, "PointB": 10, "PointC": 70 }
];

const streamData = [
  { year: 2000, a: 10000, b: -5000, c: 20000 },
  { year: 2001, a: 20000, b: -10000, c: 15000 },
  { year: 2002, a: 30000, b: -15000, c: 10000 },
  { year: 2003, a: 25000, b: -20000, c: 5000 },
  { year: 2004, a: 15000, b: -25000, c: 8000 },
  { year: 2005, a: 20000, b: -30000, c: 12000 },
  { year: 2006, a: 22000, b: -35000, c: 16000 },
  { year: 2007, a: 28000, b: -40000, c: 18000 },
  { year: 2008, a: 35000, b: -45000, c: 20000 },
  { year: 2009, a: 40000, b: -47000, c: 23000 },
  { year: 2010, a: 45000, b: -48000, c: 25000 },
  { year: 2011, a: 48000, b: -49000, c: 28000 },
  { year: 2012, a: 50000, b: -50000, c: 30000 },
  { year: 2013, a: 52000, b: -51000, c: 32000 },
  { year: 2014, a: 54000, b: -52000, c: 34000 },
  { year: 2015, a: 56000, b: -53000, c: 36000 },
  { year: 2016, a: 58000, b: -54000, c: 38000 },
  { year: 2017, a: 60000, b: -55000, c: 40000 },
  { year: 2018, a: 62000, b: -56000, c: 42000 },
  { year: 2019, a: 64000, b: -57000, c: 44000 },
  { year: 2020, a: 66000, b: -58000, c: 46000 }
];



const pieData = { hr: 6, sales: 20, tech: 30, admin: 8, research: 12, qa: 14 };


export {barData, lineData, radarChartData, sankeyNodes, sankeyLinks, densityData, streamData,pieData}