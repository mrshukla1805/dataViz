
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
  { category: 'A', value: 10 },
  { category: 'A', value: 15 },
  { category: 'A', value: 20 },
  { category: 'A', value: 25 },
  { category: 'A', value: 30 },
  { category: 'B', value: 20 },
  { category: 'B', value: 25 },
  { category: 'B', value: 30 },
  { category: 'B', value: 35 },
  { category: 'B', value: 40 },
  { category: 'C', value: 5 },
  { category: 'C', value: 10 },
  { category: 'C', value: 15 },
  { category: 'C', value: 20 },
  { category: 'C', value: 25 }
];

export {barData, lineData, radarChartData, sankeyNodes, sankeyLinks, densityData}