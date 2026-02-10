import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';
import { useDataset } from '@/context/DataContext';
import { useToast } from '@/hooks/use-toast';

const DatasetUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();
  const {
    setData,
    uploadCount,
    incrementUploadCount,
    setCurrentDatasetRows,
    setIsCurrentDatasetFree,
    tokenBalance,
  } = useDataset();
  const navigate = useNavigate();

  const openFileDialog = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleFile = (file: File) => {
    const allowedTypes = ['.csv', '.xlsx', '.xls'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!allowedTypes.includes(fileExtension)) {
      toast({ title: "Invalid File Type", description: "Upload CSV or Excel", variant: "destructive" });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File Too Large", description: "Max size 10MB", variant: "destructive" });
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);

    if (fileExtension === '.csv') {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (result) => {
          setIsProcessing(false);

          const parsedData = (result.data || []) as any[];
          const rowCount = Array.isArray(parsedData) ? parsedData.length : 0;
          const nextUploadCount = uploadCount + 1;

          // Free usage rules:
          // - Up to 5 uploads, AND
          // - Each free dataset has 20 rows or fewer.
          const isFreeDataset = nextUploadCount <= 5 && rowCount <= 20;

          setData(parsedData);
          setCurrentDatasetRows(rowCount);
          setIsCurrentDatasetFree(isFreeDataset);
          incrementUploadCount();

          const costClassification = isFreeDataset
            ? "FREE dataset: all analysis, visualisation, mapping, export, and prediction are available at no token cost."
            : `PAID dataset: further HMPI analysis and any prediction/forecasting will require tokens (1 token per row = ${rowCount} tokens).`;

          toast({
            title: "Upload Successful",
            description: [
              `${file.name} processed successfully.`,
              `Upload count: ${nextUploadCount} (this session).`,
              `Rows in dataset: ${rowCount}.`,
              costClassification,
              !isFreeDataset
                ? `Current token balance: ${tokenBalance} tokens. No tokens are deducted at upload; they are only consumed when you run paid analyses or predictions.`
                : undefined,
            ]
              .filter(Boolean)
              .join(" "),
          });
        },
        error: (error) => {
          setIsProcessing(false);
          console.error("CSV parsing error:", error);
          toast({ title: "File Error", description: `Failed to parse ${file.name}`, variant: "destructive" });
        }
      });
    } else {
      setIsProcessing(false);
      toast({ title: "Excel Support", description: "Excel parsing not implemented. Please use a CSV file.", variant: "destructive" });
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Upload Groundwater Dataset</h2>
          <p className="text-muted-foreground">Upload heavy metal data with geo-coordinates for HMPI analysis</p>
        </div>

        {!uploadedFile ? (
          <div
            className="relative border-2 border-water-primary bg-water-primary/20 rounded-lg p-8 text-center cursor-pointer"
            onClick={openFileDialog}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-water-primary/20">
                <Upload className="w-8 h-8 text-water-primary" />
              </div>
              <p className="text-lg font-medium mb-2">Drop your dataset here</p>
              <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  openFileDialog();
                }}
                variant="outline"
                className="border-water-primary text-water-primary"
              >
                Select File
              </Button>
              <div className="text-xs text-muted-foreground mt-2">
                Supported: CSV, Excel (.xlsx, .xls) • Max 10MB
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg border">
              <FileSpreadsheet className="w-8 h-8 text-water-primary" />
              <div className="flex-1">
                <p className="font-medium">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              {isProcessing ? (
                <div className="text-water-primary animate-spin">Processing...</div>
              ) : (
                <CheckCircle className="w-6 h-6 text-water-primary" />
              )}
            </div>

            {!isProcessing && (
              <div className="text-center mt-4">
                <Button
                  onClick={() => navigate('/analysis/samples')}
                  className="bg-blue-600 text-white hover:bg-blue-700 border-none"
                >
                  Go to Analysis
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-water-secondary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Dataset Requirements:</p>
              <ul className="space-y-1 text-xs">
                <li>• Heavy metal values (mg/L or μg/L)</li>
                <li>• Geographic coordinates (lat, long)</li>
                <li>• Standard column headers</li>
                <li>• Supported metals: Pb, Cd, As, Hg, Cr, Cu, Zn, Ni</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatasetUpload;
