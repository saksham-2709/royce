import React, { useState } from 'react';
import { useDataset } from '@/context/DataContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from 'lucide-react';
import Visualize from '@/components/Visualize';

const Samples = () => {
  const { data } = useDataset();
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-6">
        <p>No dataset samples available. Please upload a file first on the main page.</p>
      </div>
    );
  }

  const whoLimits = {
    "Pb": 0.05,
    "Cd": 0.003,
    "As": 0.01,
    "Hg": 0.006,
    "Cr": 0.05,
    "Cu": 2,
    "Zn": 3,
    "Ni": 0.02,
  };

  const allHeaders = Object.keys(data[0] || {});
  const metals = allHeaders.filter(header => Object.keys(whoLimits).includes(header));
  const otherHeaders = allHeaders.filter(header => !metals.includes(header));

  const handleRowClick = (index: number) => {
    setExpandedRowIndex(expandedRowIndex === index ? null : index);
  };
  
  const prepareDataForVisualize = (row) => {
    const currentLevels = metals.map(metal => row[metal]);
    const limits = metals.map(metal => whoLimits[metal]);
    return {
      metals,
      currentLevels,
      whoLimits: limits,
    };
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 flex-shrink-0 text-foreground">Dataset Samples</h2>
      
      {/* Fixed Header - Using your water theme */}
      <div className="flex-shrink-0 border border-border rounded-t-lg bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border water-surface">
                <th className="w-12 px-2 py-3 text-left text-sm font-semibold text-card-foreground border-r border-border min-w-[40px]">
                  {/* Expand column */}
                </th>
                {otherHeaders.map((header) => (
                  <th 
                    key={header}
                    className="px-4 py-3 text-left text-sm font-semibold text-card-foreground border-r border-border whitespace-nowrap min-w-[120px]"
                  >
                    {header.replace(/_/g, ' ')}
                  </th>
                ))}
                {metals.map((header) => (
                  <th 
                    key={header}
                    className="px-4 py-3 text-left text-sm font-semibold text-card-foreground border-r border-border whitespace-nowrap min-w-[100px]"
                  >
                    {header.replace(/_mg_L/g, ' (mg/L)')}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {/* Scrollable Body */}
      <div 
        className="flex-1 border-x border-b border-border rounded-b-lg overflow-auto bg-card max-h-[calc(70vh-60px)] min-h-[400px]"
      >
        <table className="w-full">
          <tbody>
            {data.map((row, index) => (
              <React.Fragment key={index}>
                <tr
                  onClick={() => handleRowClick(index)}
                  className="cursor-pointer hover:bg-muted/50 transition-colors border-b border-border"
                >
                  <td className="w-12 px-2 py-3 text-center border-r border-border min-w-[40px]">
                    {expandedRowIndex === index ? 
                      <ChevronUp className="w-4 h-4 mx-auto text-muted-foreground" /> : 
                      <ChevronDown className="w-4 h-4 mx-auto text-muted-foreground" />
                    }
                  </td>
                  {otherHeaders.map((header) => (
                    <td 
                      key={header} 
                      className="px-4 py-3 text-sm text-card-foreground border-r border-border whitespace-nowrap min-w-[120px]"
                    >
                      {row[header]}
                    </td>
                  ))}
                  {metals.map((header) => (
                    <td 
                      key={header} 
                      className={`px-4 py-3 text-sm border-r border-border whitespace-nowrap font-mono min-w-[100px] ${
                        row[header] > whoLimits[header] ? 
                        'text-destructive font-semibold bg-destructive/10' : 
                        'text-green-400'
                      }`}
                    >
                      {row[header]}
                    </td>
                  ))}
                </tr>
                {expandedRowIndex === index && (
                  <tr>
                    <td colSpan={allHeaders.length + 1} className="p-0">
                      <div className="p-6 bg-muted/20 border-t border-border water-ripple">
                        <h4 className="text-lg font-semibold mb-4 text-card-foreground">
                          Metal Concentration Analysis for Sample {row[otherHeaders[0]]}
                        </h4>
                        <Visualize dataset={prepareDataForVisualize(row)} />
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Legend - Using your theme colors */}
      <div className="mt-4 text-sm text-muted-foreground flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive/20 border border-destructive rounded"></div>
            <span>Exceeds WHO limits</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400/20 border border-green-400 rounded"></div>
            <span>Within WHO limits</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Samples;