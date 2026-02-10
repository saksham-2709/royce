import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, RotateCcw } from 'lucide-react';

interface MetalConcentration {
  Arsenic: number;
  Cadmium: number;
  Chromium: number;
  Copper: number;
  Lead: number;
  Mercury: number;
  Nickel: number;
  Uranium: number;
  Zinc: number;
}

interface SampleData {
  HMPI: number;
  Sample_ID: string;
  all_metal_conc: MetalConcentration;
  geometry: {
    coordinates: [number, number];
    type: 'Point';
  };
  latitudeandlongitudepresent: boolean;
  no_of_metals: number;
}

const allData: SampleData[] = [

  {
      "HMPI": 106.79647837150127,
      "Sample_ID": "S001",
      "all_metal_conc": {
        "Arsenic": 0.0125,
        "Cadmium": 0.0031,
        "Chromium": 0.055,
        "Copper": 1.52,
        "Lead": 0.015,
        "Mercury": 0.0008,
        "Nickel": 0.075,
        "Uranium": 107.00609999999999,
        "Zinc": 5.15
      },
      "geometry": {
        "coordinates": [
          81.0266,
          28.4595
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 77.21014758269722,
      "Sample_ID": "S002",
      "all_metal_conc": {
        "Arsenic": 0.0098,
        "Cadmium": 0.0025,
        "Chromium": 0.048,
        "Copper": 1.21,
        "Lead": 0.0095,
        "Mercury": 0.0005,
        "Nickel": 0.062,
        "Uranium": 106.70929999999998,
        "Zinc": 4.23
      },
      "geometry": {
        "coordinates": [
          77.0311,
          28.4682
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 200.74538083121288,
      "Sample_ID": "S003",
      "all_metal_conc": {
        "Arsenic": 0.025,
        "Cadmium": 0.0065,
        "Chromium": 0.11,
        "Copper": 2.15,
        "Lead": 0.035,
        "Mercury": 0.0015,
        "Nickel": 0.12,
        "Uranium": 107.62130000000002,
        "Zinc": 7.8
      },
      "geometry": {
        "coordinates": [
          77.0203,
          28.451
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 39.974001696352836,
      "Sample_ID": "S004",
      "all_metal_conc": {
        "Arsenic": 0.0051,
        "Cadmium": 0.0013,
        "Chromium": 0.025,
        "Copper": 0.85,
        "Lead": 0.0048,
        "Mercury": 0.0002,
        "Nickel": 0.033,
        "Uranium": 106.36559999999999,
        "Zinc": 2.1
      },
      "geometry": {
        "coordinates": [
          77.0401,
          28.4755
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 273.1697506361323,
      "Sample_ID": "S005",
      "all_metal_conc": {
        "Arsenic": 0.031,
        "Cadmium": 0.0082,
        "Chromium": 0.15,
        "Copper": 2.8,
        "Lead": 0.052,
        "Mercury": 0.0021,
        "Nickel": 0.18,
        "Uranium": 108.2592,
        "Zinc": 9.5
      },
      "geometry": {
        "coordinates": [
          77.0159,
          28.4433
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 96.47880237489397,
      "Sample_ID": "S006",
      "all_metal_conc": {
        "Arsenic": 0.011,
        "Cadmium": 0.0029,
        "Chromium": 0.051,
        "Copper": 1.43,
        "Lead": 0.013,
        "Mercury": 0.0007,
        "Nickel": 0.071,
        "Uranium": 106.92960000000001,
        "Zinc": 4.95
      },
      "geometry": {
        "coordinates": [
          77.0385,
          28.4611
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 66.1304834605598,
      "Sample_ID": "S007",
      "all_metal_conc": {
        "Arsenic": 0.0085,
        "Cadmium": 0.0022,
        "Chromium": 0.042,
        "Copper": 1.1,
        "Lead": 0.008,
        "Mercury": 0.0004,
        "Nickel": 0.055,
        "Uranium": 106.6055,
        "Zinc": 3.75
      },
      "geometry": {
        "coordinates": [
          77.0254,
          28.4801
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 381.9492519083969,
      "Sample_ID": "S008",
      "all_metal_conc": {
        "Arsenic": 0.045,
        "Cadmium": 0.011,
        "Chromium": 0.21,
        "Copper": 3.5,
        "Lead": 0.075,
        "Mercury": 0.003,
        "Nickel": 0.25,
        "Uranium": 108.9696,
        "Zinc": 11.2
      },
      "geometry": {
        "coordinates": [
          77.0298,
          28.4398
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 147.78586598812552,
      "Sample_ID": "S009",
      "all_metal_conc": {
        "Arsenic": 0.018,
        "Cadmium": 0.0045,
        "Chromium": 0.08,
        "Copper": 1.9,
        "Lead": 0.025,
        "Mercury": 0.0011,
        "Nickel": 0.095,
        "Uranium": 107.36670000000001,
        "Zinc": 6.5
      },
      "geometry": {
        "coordinates": [
          77.0112,
          28.4555
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 30.29649872773537,
      "Sample_ID": "S010",
      "all_metal_conc": {
        "Arsenic": 0.0042,
        "Cadmium": 0.0011,
        "Chromium": 0.021,
        "Copper": 0.75,
        "Lead": 0.0035,
        "Mercury": 0.0001,
        "Nickel": 0.028,
        "Uranium": 106.2859,
        "Zinc": 1.8
      },
      "geometry": {
        "coordinates": [
          77.0456,
          28.4903
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 118.34404071246817,
      "Sample_ID": "S011",
      "all_metal_conc": {
        "Arsenic": 0.0135,
        "Cadmium": 0.0035,
        "Chromium": 0.06,
        "Copper": 1.6,
        "Lead": 0.017,
        "Mercury": 0.0009,
        "Nickel": 0.08,
        "Uranium": 107.08529999999999,
        "Zinc": 5.5
      },
      "geometry": {
        "coordinates": [
          77.0221,
          28.4632
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 55.77630195080577,
      "Sample_ID": "S012",
      "all_metal_conc": {
        "Arsenic": 0.0076,
        "Cadmium": 0.0019,
        "Chromium": 0.038,
        "Copper": 1.05,
        "Lead": 0.0072,
        "Mercury": 0.0003,
        "Nickel": 0.048,
        "Uranium": 106.557,
        "Zinc": 3.3
      },
      "geometry": {
        "coordinates": [
          77.0355,
          28.4715
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 234.34776590330793,
      "Sample_ID": "S013",
      "all_metal_conc": {
        "Arsenic": 0.028,
        "Cadmium": 0.0071,
        "Chromium": 0.13,
        "Copper": 2.5,
        "Lead": 0.042,
        "Mercury": 0.0018,
        "Nickel": 0.15,
        "Uranium": 107.96770000000001,
        "Zinc": 8.7
      },
      "geometry": {
        "coordinates": [
          77.0189,
          28.4488
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 45.1955284139101,
      "Sample_ID": "S014",
      "all_metal_conc": {
        "Arsenic": 0.0065,
        "Cadmium": 0.0017,
        "Chromium": 0.031,
        "Copper": 0.92,
        "Lead": 0.0055,
        "Mercury": 0.0002,
        "Nickel": 0.04,
        "Uranium": 106.4371,
        "Zinc": 2.65
      },
      "geometry": {
        "coordinates": [
          77.039,
          28.4781
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 446.63067684478375,
      "Sample_ID": "S015",
      "all_metal_conc": {
        "Arsenic": 0.052,
        "Cadmium": 0.013,
        "Chromium": 0.25,
        "Copper": 4.1,
        "Lead": 0.09,
        "Mercury": 0.0035,
        "Nickel": 0.29,
        "Uranium": 109.5471,
        "Zinc": 12.5
      },
      "geometry": {
        "coordinates": [
          77.0121,
          28.435
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 86.81925360474979,
      "Sample_ID": "S016",
      "all_metal_conc": {
        "Arsenic": 0.0105,
        "Cadmium": 0.0027,
        "Chromium": 0.049,
        "Copper": 1.35,
        "Lead": 0.011,
        "Mercury": 0.0006,
        "Nickel": 0.067,
        "Uranium": 106.845,
        "Zinc": 4.6
      },
      "geometry": {
        "coordinates": [
          77.03,
          28.465
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 171.6090042408821,
      "Sample_ID": "S017",
      "all_metal_conc": {
        "Arsenic": 0.021,
        "Cadmium": 0.0053,
        "Chromium": 0.095,
        "Copper": 2,
        "Lead": 0.029,
        "Mercury": 0.0013,
        "Nickel": 0.105,
        "Uranium": 107.4777,
        "Zinc": 7.1
      },
      "geometry": {
        "coordinates": [
          77.0245,
          28.4532
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 42.4775165394402,
      "Sample_ID": "S018",
      "all_metal_conc": {
        "Arsenic": 0.0058,
        "Cadmium": 0.0015,
        "Chromium": 0.028,
        "Copper": 0.88,
        "Lead": 0.0051,
        "Mercury": 0.0002,
        "Nickel": 0.036,
        "Uranium": 106.39439999999999,
        "Zinc": 2.4
      },
      "geometry": {
        "coordinates": [
          77.0423,
          28.4721
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 313.92505513146733,
      "Sample_ID": "S019",
      "all_metal_conc": {
        "Arsenic": 0.035,
        "Cadmium": 0.009,
        "Chromium": 0.17,
        "Copper": 3.1,
        "Lead": 0.06,
        "Mercury": 0.0025,
        "Nickel": 0.2,
        "Uranium": 108.56299999999999,
        "Zinc": 10.1
      },
      "geometry": {
        "coordinates": [
          77.0175,
          28.4455
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 53.521886344359636,
      "Sample_ID": "S020",
      "all_metal_conc": {
        "Arsenic": 0.0069,
        "Cadmium": 0.0018,
        "Chromium": 0.035,
        "Copper": 0.98,
        "Lead": 0.0062,
        "Mercury": 0.0003,
        "Nickel": 0.045,
        "Uranium": 106.4983,
        "Zinc": 3.1
      },
      "geometry": {
        "coordinates": [
          77.0333,
          28.485
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 109.24376251060221,
      "Sample_ID": "S021",
      "all_metal_conc": {
        "Arsenic": 0.0129,
        "Cadmium": 0.0033,
        "Chromium": 0.057,
        "Copper": 1.55,
        "Lead": 0.0158,
        "Mercury": 0.0008,
        "Nickel": 0.077,
        "Uranium": 107.0362,
        "Zinc": 5.25
      },
      "geometry": {
        "coordinates": [
          77.0281,
          28.4581
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 75.80785750636133,
      "Sample_ID": "S022",
      "all_metal_conc": {
        "Arsenic": 0.0095,
        "Cadmium": 0.0024,
        "Chromium": 0.046,
        "Copper": 1.18,
        "Lead": 0.0092,
        "Mercury": 0.0005,
        "Nickel": 0.06,
        "Uranium": 106.6828,
        "Zinc": 4.1
      },
      "geometry": {
        "coordinates": [
          77.0329,
          28.4699
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 212.9897099236641,
      "Sample_ID": "S023",
      "all_metal_conc": {
        "Arsenic": 0.0265,
        "Cadmium": 0.0068,
        "Chromium": 0.115,
        "Copper": 2.25,
        "Lead": 0.038,
        "Mercury": 0.0016,
        "Nickel": 0.128,
        "Uranium": 107.71959999999999,
        "Zinc": 8.1
      },
      "geometry": {
        "coordinates": [
          77.0195,
          28.4501
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 38.632098388464804,
      "Sample_ID": "S024",
      "all_metal_conc": {
        "Arsenic": 0.0049,
        "Cadmium": 0.0012,
        "Chromium": 0.023,
        "Copper": 0.81,
        "Lead": 0.0045,
        "Mercury": 0.0002,
        "Nickel": 0.031,
        "Uranium": 106.3283,
        "Zinc": 2
      },
      "geometry": {
        "coordinates": [
          77.0415,
          28.4768
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 292.2578490245971,
      "Sample_ID": "S025",
      "all_metal_conc": {
        "Arsenic": 0.033,
        "Cadmium": 0.0085,
        "Chromium": 0.16,
        "Copper": 2.95,
        "Lead": 0.055,
        "Mercury": 0.0023,
        "Nickel": 0.19,
        "Uranium": 108.4063,
        "Zinc": 9.8
      },
      "geometry": {
        "coordinates": [
          77.0142,
          28.4421
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 98.10194741306192,
      "Sample_ID": "S026",
      "all_metal_conc": {
        "Arsenic": 0.0115,
        "Cadmium": 0.003,
        "Chromium": 0.052,
        "Copper": 1.47,
        "Lead": 0.0135,
        "Mercury": 0.0007,
        "Nickel": 0.073,
        "Uranium": 106.9717,
        "Zinc": 5.05
      },
      "geometry": {
        "coordinates": [
          77.0398,
          28.4619
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 64.78995759117898,
      "Sample_ID": "S027",
      "all_metal_conc": {
        "Arsenic": 0.0082,
        "Cadmium": 0.0021,
        "Chromium": 0.04,
        "Copper": 1.08,
        "Lead": 0.0078,
        "Mercury": 0.0004,
        "Nickel": 0.053,
        "Uranium": 106.589,
        "Zinc": 3.6
      },
      "geometry": {
        "coordinates": [
          77.0267,
          28.4823
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 409.404899067006,
      "Sample_ID": "S028",
      "all_metal_conc": {
        "Arsenic": 0.048,
        "Cadmium": 0.012,
        "Chromium": 0.23,
        "Copper": 3.8,
        "Lead": 0.08,
        "Mercury": 0.0032,
        "Nickel": 0.27,
        "Uranium": 109.2697,
        "Zinc": 11.8
      },
      "geometry": {
        "coordinates": [
          77.0312,
          28.4385
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 159.3301272264631,
      "Sample_ID": "S029",
      "all_metal_conc": {
        "Arsenic": 0.0195,
        "Cadmium": 0.0049,
        "Chromium": 0.085,
        "Copper": 1.95,
        "Lead": 0.027,
        "Mercury": 0.0012,
        "Nickel": 0.098,
        "Uranium": 107.419,
        "Zinc": 6.7
      },
      "geometry": {
        "coordinates": [
          77.0123,
          28.4567
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 28.617357082273113,
      "Sample_ID": "S030",
      "all_metal_conc": {
        "Arsenic": 0.0038,
        "Cadmium": 0.001,
        "Chromium": 0.019,
        "Copper": 0.7,
        "Lead": 0.0031,
        "Mercury": 0.0001,
        "Nickel": 0.025,
        "Uranium": 106.2408,
        "Zinc": 1.6
      },
      "geometry": {
        "coordinates": [
          77.0478,
          28.493
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 121.15414758269718,
      "Sample_ID": "S031",
      "all_metal_conc": {
        "Arsenic": 0.014,
        "Cadmium": 0.0037,
        "Chromium": 0.063,
        "Copper": 1.65,
        "Lead": 0.018,
        "Mercury": 0.0009,
        "Nickel": 0.083,
        "Uranium": 107.138,
        "Zinc": 5.7
      },
      "geometry": {
        "coordinates": [
          77.0235,
          28.4645
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 54.52683969465649,
      "Sample_ID": "S032",
      "all_metal_conc": {
        "Arsenic": 0.0073,
        "Cadmium": 0.0018,
        "Chromium": 0.036,
        "Copper": 1.02,
        "Lead": 0.0069,
        "Mercury": 0.0003,
        "Nickel": 0.047,
        "Uranium": 106.5298,
        "Zinc": 3.2
      },
      "geometry": {
        "coordinates": [
          77.0368,
          28.473
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 247.64917387616626,
      "Sample_ID": "S033",
      "all_metal_conc": {
        "Arsenic": 0.0295,
        "Cadmium": 0.0075,
        "Chromium": 0.138,
        "Copper": 2.6,
        "Lead": 0.045,
        "Mercury": 0.0019,
        "Nickel": 0.16,
        "Uranium": 108.0697,
        "Zinc": 8.95
      },
      "geometry": {
        "coordinates": [
          77.0201,
          28.4496
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 43.794232400339276,
      "Sample_ID": "S034",
      "all_metal_conc": {
        "Arsenic": 0.0062,
        "Cadmium": 0.0016,
        "Chromium": 0.029,
        "Copper": 0.9,
        "Lead": 0.0052,
        "Mercury": 0.0002,
        "Nickel": 0.038,
        "Uranium": 106.42,
        "Zinc": 2.55
      },
      "geometry": {
        "coordinates": [
          77.0405,
          28.4795
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 480.184373197625,
      "Sample_ID": "S035",
      "all_metal_conc": {
        "Arsenic": 0.055,
        "Cadmium": 0.014,
        "Chromium": 0.27,
        "Copper": 4.3,
        "Lead": 0.095,
        "Mercury": 0.0038,
        "Nickel": 0.31,
        "Uranium": 109.74969999999999,
        "Zinc": 13
      },
      "geometry": {
        "coordinates": [
          77.0135,
          28.4362
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 85.2949957591179,
      "Sample_ID": "S036",
      "all_metal_conc": {
        "Arsenic": 0.0102,
        "Cadmium": 0.0026,
        "Chromium": 0.047,
        "Copper": 1.32,
        "Lead": 0.0105,
        "Mercury": 0.0006,
        "Nickel": 0.065,
        "Uranium": 106.81799999999998,
        "Zinc": 4.5
      },
      "geometry": {
        "coordinates": [
          77.0315,
          28.4665
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 184.1371433418151,
      "Sample_ID": "S037",
      "all_metal_conc": {
        "Arsenic": 0.0225,
        "Cadmium": 0.0058,
        "Chromium": 0.1,
        "Copper": 2.05,
        "Lead": 0.031,
        "Mercury": 0.0014,
        "Nickel": 0.11,
        "Uranium": 107.5299,
        "Zinc": 7.3
      },
      "geometry": {
        "coordinates": [
          77.0258,
          28.4541
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 41.13730279898219,
      "Sample_ID": "S038",
      "all_metal_conc": {
        "Arsenic": 0.0055,
        "Cadmium": 0.0014,
        "Chromium": 0.026,
        "Copper": 0.86,
        "Lead": 0.0049,
        "Mercury": 0.0002,
        "Nickel": 0.034,
        "Uranium": 106.3775,
        "Zinc": 2.3
      },
      "geometry": {
        "coordinates": [
          77.0435,
          28.474
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 336.9667073791348,
      "Sample_ID": "S039",
      "all_metal_conc": {
        "Arsenic": 0.038,
        "Cadmium": 0.0095,
        "Chromium": 0.18,
        "Copper": 3.25,
        "Lead": 0.065,
        "Mercury": 0.0027,
        "Nickel": 0.215,
        "Uranium": 108.7156,
        "Zinc": 10.5
      },
      "geometry": {
        "coordinates": [
          77.0188,
          28.4468
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 52.24127226463104,
      "Sample_ID": "S040",
      "all_metal_conc": {
        "Arsenic": 0.0067,
        "Cadmium": 0.0017,
        "Chromium": 0.033,
        "Copper": 0.95,
        "Lead": 0.006,
        "Mercury": 0.0003,
        "Nickel": 0.043,
        "Uranium": 106.472,
        "Zinc": 2.9
      },
      "geometry": {
        "coordinates": [
          77.0345,
          28.4875
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 110.52937404580152,
      "Sample_ID": "S041",
      "all_metal_conc": {
        "Arsenic": 0.0132,
        "Cadmium": 0.0034,
        "Chromium": 0.058,
        "Copper": 1.57,
        "Lead": 0.0162,
        "Mercury": 0.0008,
        "Nickel": 0.078,
        "Uranium": 107.05839999999999,
        "Zinc": 5.35
      },
      "geometry": {
        "coordinates": [
          77.0295,
          28.4589
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 74.34426802374894,
      "Sample_ID": "S042",
      "all_metal_conc": {
        "Arsenic": 0.0092,
        "Cadmium": 0.0023,
        "Chromium": 0.044,
        "Copper": 1.15,
        "Lead": 0.0088,
        "Mercury": 0.0005,
        "Nickel": 0.058,
        "Uranium": 106.6549,
        "Zinc": 3.95
      },
      "geometry": {
        "coordinates": [
          77.0341,
          28.4708
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 223.18170992366407,
      "Sample_ID": "S043",
      "all_metal_conc": {
        "Arsenic": 0.027,
        "Cadmium": 0.007,
        "Chromium": 0.12,
        "Copper": 2.35,
        "Lead": 0.04,
        "Mercury": 0.0017,
        "Nickel": 0.135,
        "Uranium": 107.82169999999999,
        "Zinc": 8.4
      },
      "geometry": {
        "coordinates": [
          77.0208,
          28.4509
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 38.20888549618321,
      "Sample_ID": "S044",
      "all_metal_conc": {
        "Arsenic": 0.0047,
        "Cadmium": 0.0012,
        "Chromium": 0.022,
        "Copper": 0.79,
        "Lead": 0.0043,
        "Mercury": 0.0002,
        "Nickel": 0.03,
        "Uranium": 106.31070000000001,
        "Zinc": 1.95
      },
      "geometry": {
        "coordinates": [
          77.0428,
          28.4779
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 304.0392468193384,
      "Sample_ID": "S045",
      "all_metal_conc": {
        "Arsenic": 0.0345,
        "Cadmium": 0.0088,
        "Chromium": 0.165,
        "Copper": 3,
        "Lead": 0.058,
        "Mercury": 0.0024,
        "Nickel": 0.195,
        "Uranium": 108.45840000000001,
        "Zinc": 9.95
      },
      "geometry": {
        "coordinates": [
          77.0155,
          28.4429
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 98.6476030534351,
      "Sample_ID": "S046",
      "all_metal_conc": {
        "Arsenic": 0.0118,
        "Cadmium": 0.003,
        "Chromium": 0.053,
        "Copper": 1.49,
        "Lead": 0.0138,
        "Mercury": 0.0007,
        "Nickel": 0.074,
        "Uranium": 106.9938,
        "Zinc": 5.1
      },
      "geometry": {
        "coordinates": [
          77.041,
          28.4628
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 63.47496183206107,
      "Sample_ID": "S047",
      "all_metal_conc": {
        "Arsenic": 0.008,
        "Cadmium": 0.002,
        "Chromium": 0.039,
        "Copper": 1.07,
        "Lead": 0.0075,
        "Mercury": 0.0004,
        "Nickel": 0.051,
        "Uranium": 106.5815,
        "Zinc": 3.5
      },
      "geometry": {
        "coordinates": [
          77.028,
          28.4835
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 424.9649024597116,
      "Sample_ID": "S048",
      "all_metal_conc": {
        "Arsenic": 0.05,
        "Cadmium": 0.0125,
        "Chromium": 0.24,
        "Copper": 3.95,
        "Lead": 0.085,
        "Mercury": 0.0033,
        "Nickel": 0.28,
        "Uranium": 109.4215,
        "Zinc": 12.1
      },
      "geometry": {
        "coordinates": [
          77.0325,
          28.439
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 161.9858524173028,
      "Sample_ID": "S049",
      "all_metal_conc": {
        "Arsenic": 0.02,
        "Cadmium": 0.0051,
        "Chromium": 0.088,
        "Copper": 1.98,
        "Lead": 0.028,
        "Mercury": 0.0012,
        "Nickel": 0.1,
        "Uranium": 107.451,
        "Zinc": 6.9
      },
      "geometry": {
        "coordinates": [
          77.0135,
          28.4575
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    },
    {
      "HMPI": 27.45424936386768,
      "Sample_ID": "S050",
      "all_metal_conc": {
        "Arsenic": 0.0035,
        "Cadmium": 0.0009,
        "Chromium": 0.018,
        "Copper": 0.68,
        "Lead": 0.0029,
        "Mercury": 0.0001,
        "Nickel": 0.024,
        "Uranium": 106.22400000000002,
        "Zinc": 1.5
      },
      "geometry": {
        "coordinates": [
          77.049,
          28.495
        ],
        "type": "Point"
      },
      "latitudeandlongitudepresent": true,
      "no_of_metals": 9
    }
];

// HMPI color function
const getColor = (hmpi: number): string => {
  if (hmpi <= 60) return '#22c55e'; // green
  if (hmpi <= 100) return '#eab308'; // yellow
  return '#ef4444'; // red
};

// Convert meters to pixels at current zoom
const metersToPixels = (lat: number, meters: number, zoom: number): number => {
  const earthCircumference = 40075017;
  const latitudeRadians = lat * (Math.PI / 180);
  return (meters / earthCircumference) * 512 * Math.pow(2, zoom) / Math.cos(latitudeRadians);
};

const MapVisualization: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const [selectedSample, setSelectedSample] = useState<SampleData | null>(null);
  const [pulseAnimation, setPulseAnimation] = useState<number | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [77.21, 28.613],
      attributionControl: false,
      zoom: 13
    });

    mapRef.current = map;

    // Add navigation controls
    map.addControl(new maplibregl.NavigationControl());

    // Cleanup pulse
    const removePulseCircle = () => {
      if (pulseAnimation) {
        cancelAnimationFrame(pulseAnimation);
        setPulseAnimation(null);
      }
      if (map.getLayer('pulse-circle')) map.removeLayer('pulse-circle');
      if (map.getSource('pulse-circle')) map.removeSource('pulse-circle');
    };

    // Close popup
    const closeOpenPopup = () => {
      if (popupRef.current) {
        try {
          popupRef.current.remove();
        } catch {}
        popupRef.current = null;
      }
      setSelectedSample(null);
      removePulseCircle();
    };

    // Add markers
    allData.forEach(sample => {
      // Popup HTML
      const metals = Object.entries(sample.all_metal_conc)
        .map(([metal, value]) => `
          <li style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>${metal}:</span><span style="font-weight: 500;">${value}</span>
          </li>
        `)
        .join("");

      const popupHtml = `
        <div style="font-family: sans-serif; font-size: 13px; max-width: 280px; background: ${getColor(sample.HMPI)}; color: white; border-radius: 8px; padding: 16px; box-shadow: 0 10px 25px -3px rgba(0,0,0,0.6);">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${getColor(sample.HMPI)};"></div>
            <strong style="font-size: 18px;">${sample.Sample_ID}</strong>
          </div>
          <div style="margin-bottom: 12px;">
            <strong>HMPI:</strong> <span style="font-weight: 500;">${sample.HMPI.toFixed(2)}</span>
          </div>
          <div style="margin-bottom: 8px;">
            <strong>Metal Concentrations:</strong>
          </div>
          <ul style="list-style: none; padding: 0; margin: 0; font-size: 12px;">
            ${metals}
          </ul>
        </div>
      `;

      const popup = new maplibregl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: true,
        className: 'map-popup'
      }).setHTML(popupHtml);

      // Marker element (SVG pin)
      const el = document.createElement('div');
      el.className = 'marker-svg-container cursor-pointer';
      el.style.width = '30px';
      el.style.height = '40px';
      el.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="${getColor(sample.HMPI)}" stroke="black" stroke-width="0.3">
          <path d="M12 2C8 2 5 5 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-4-3-7-7-7z"/>
          <circle cx="12" cy="9" r="2.3" fill="white"/>
        </svg>
      `;

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(sample.geometry.coordinates)
        .addTo(map);

      markersRef.current.push(marker);

      // Marker click
      marker.getElement().addEventListener('click', (e) => {
        e.stopPropagation();

        // If same popup open, close it
        if (popupRef.current === popup) {
          closeOpenPopup();
          return;
        }

        // Close old popup
        closeOpenPopup();

        // Open new popup
        popup.setLngLat(sample.geometry.coordinates).addTo(map);
        popupRef.current = popup;
        setSelectedSample(sample);

        const shiftedCoordinates: [number, number] = [
        sample.geometry.coordinates[0],             // longitude (x) stays the same
        sample.geometry.coordinates[1] - 0.003       // latitude (y) + 0.01
        ];
        // Fly
        map.flyTo({ center: shiftedCoordinates , zoom: 14.5 });

        // Pulse circle
        map.addSource('pulse-circle', {
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [
      { 
        type: 'Feature', 
        geometry: sample.geometry, 
        properties: {}  // <--- add this
      }
    ]
  }
});

        map.addLayer({
          id: 'pulse-circle',
          type: 'circle',
          source: 'pulse-circle',
          paint: {
            'circle-radius': metersToPixels(sample.geometry.coordinates[1], 100, map.getZoom()),
            'circle-color': getColor(sample.HMPI),
            'circle-opacity': 0.5
          }
        });

        // Animate pulse
        let start: number | null = null;
        const animatePulse = (timestamp: number) => {
          if (!map.getLayer('pulse-circle')) return;
          if (!start) start = timestamp;
          const progress = (timestamp - start) / 1000;
          const opacity = 0.3 + 0.2 * Math.sin(progress * 2 * Math.PI);
          map.setPaintProperty('pulse-circle', 'circle-opacity', opacity);

          const radius = metersToPixels(sample.geometry.coordinates[1], 100, map.getZoom());
          map.setPaintProperty('pulse-circle', 'circle-radius', radius);

          const id = requestAnimationFrame(animatePulse);
          setPulseAnimation(id);
        };
        animatePulse(0);

        popup.on('close', () => {
          if (popupRef.current === popup) {
            closeOpenPopup();
          }
        });
      });
    });

    // Map click clears popup
    map.on('click', closeOpenPopup);

    // Fit bounds
    map.on('load', () => {
      const bounds = new maplibregl.LngLatBounds();
      allData.forEach(s => bounds.extend(s.geometry.coordinates));
      map.fitBounds(bounds, { padding: 50 });
    });

    // Cleanup
    return () => {
      if (pulseAnimation) cancelAnimationFrame(pulseAnimation);
      closeOpenPopup();
      markersRef.current.forEach(m => m.remove());
      map.remove();
    };
  }, []);

  const handleRecenter = () => {
    if (!mapRef.current) return;
    const bounds = new maplibregl.LngLatBounds();
    allData.forEach(s => bounds.extend(s.geometry.coordinates));
    mapRef.current.fitBounds(bounds, { padding: 50 });
    // Reset everything
    if (popupRef.current) {
      popupRef.current.remove();
      popupRef.current = null;
    }
    if (pulseAnimation) {
      cancelAnimationFrame(pulseAnimation);
      setPulseAnimation(null);
    }
    setSelectedSample(null);
    if (mapRef.current.getLayer('pulse-circle')) {
      mapRef.current.removeLayer('pulse-circle');
      mapRef.current.removeSource('pulse-circle');
    }
  };

  return (
    <div className="relative w-full h-screen bg-map-background">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-map" />

      {/* Legend */}
      <Card className="absolute top-6 left-6 bg-map-panel/95 backdrop-blur-sm border-border/20 shadow-panel">
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-map-panel-foreground" />
            <h3 className="font-semibold text-map-panel-foreground">HMPI Levels</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-map-safe"></div>
              <span className="text-map-panel-foreground">Safe (≤60)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-map-moderate"></div>
              <span className="text-map-panel-foreground">Moderate (61-100)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-map-danger"></div>
              <span className="text-map-panel-foreground">High (&gt;100)</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Recenter button */}
      <Button
        onClick={handleRecenter}
        className="absolute bottom-6 right-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-panel"
        size="lg"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Recenter
      </Button>

      {/* Sample Info Panel */}
      {selectedSample && (
        <Card className="absolute top-6 right-6 w-80 bg-map-panel/95 backdrop-blur-sm border-border/20 shadow-panel">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: getColor(selectedSample.HMPI) }}
              ></div>
              <h3 className="font-semibold text-lg text-map-panel-foreground">
                {selectedSample.Sample_ID}
              </h3>
            </div>
            <div className="space-y-3 text-sm text-map-panel-foreground">
              <div>
                <span className="font-medium">HMPI: </span>
                <span className="font-bold">{selectedSample.HMPI.toFixed(2)}</span>
              </div>
              <div>
                <span className="font-medium">Total Metals: </span>
                <span>{selectedSample.no_of_metals}</span>
              </div>
              <div>
                <span className="font-medium">Location: </span>
                <span className="text-xs">
                  {selectedSample.geometry.coordinates[1].toFixed(4)}, {selectedSample.geometry.coordinates[0].toFixed(4)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MapVisualization;
