
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DocumentUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [documentType, setDocumentType] = useState('');
  const [patientId, setPatientId] = useState('');
  const [description, setDescription] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Obfuscated file logging for honeypot
      const _0x9c5f = ['file_selected', file.name, file.size, file.type, new Date().toISOString()];
      console.log(_0x9c5f.join('|'));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !documentType || !patientId) {
      setUploadStatus('error');
      return;
    }

    setUploadStatus('uploading');
    
    // Simulate upload with honeypot logging
    const _0x7b8d = [
      'document_upload_attempt',
      selectedFile.name,
      documentType,
      patientId,
      description,
      new Date().toISOString()
    ];
    console.log(_0x7b8d.join('|'));
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setUploadStatus('success');
    
    // Reset form after success
    setTimeout(() => {
      setSelectedFile(null);
      setDocumentType('');
      setPatientId('');
      setDescription('');
      setUploadStatus('idle');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Document Upload Center</h2>
        <p className="text-gray-600">Upload medical documents, reports, and patient records to the secure database</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload New Document
            </CardTitle>
            <CardDescription>
              Select and upload medical documents with proper classification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="document-type">Document Type</Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical-report">Medical Report</SelectItem>
                  <SelectItem value="lab-result">Laboratory Result</SelectItem>
                  <SelectItem value="xray">X-Ray/Imaging</SelectItem>
                  <SelectItem value="prescription">Prescription</SelectItem>
                  <SelectItem value="discharge-summary">Discharge Summary</SelectItem>
                  <SelectItem value="consent-form">Consent Form</SelectItem>
                  <SelectItem value="insurance">Insurance Document</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="patient-id">Patient ID / Registration Number</Label>
              <Input
                id="patient-id"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="Enter patient ID (e.g., AIIMS/2024/001234)"
              />
            </div>
            
            <div>
              <Label htmlFor="file-upload">Select File</Label>
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dicom"
              />
              {selectedFile && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter document description or notes"
                rows={3}
              />
            </div>
            
            {uploadStatus === 'error' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please fill in all required fields and select a file.
                </AlertDescription>
              </Alert>
            )}
            
            {uploadStatus === 'success' && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Document uploaded successfully and added to patient records.
                </AlertDescription>
              </Alert>
            )}
            
            <Button 
              onClick={handleUpload}
              disabled={uploadStatus === 'uploading' || !selectedFile}
              className="w-full"
            >
              {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload Document'}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
            <CardDescription>Latest documents uploaded to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'ECG_Report_Patient_7845.pdf', type: 'Medical Report', time: '2 minutes ago' },
                { name: 'Blood_Test_Results_9123.pdf', type: 'Lab Result', time: '15 minutes ago' },
                { name: 'Chest_Xray_5689.dicom', type: 'X-Ray/Imaging', time: '1 hour ago' },
                { name: 'Prescription_Note_4421.pdf', type: 'Prescription', time: '2 hours ago' },
                { name: 'Surgery_Consent_8834.pdf', type: 'Consent Form', time: '3 hours ago' }
              ].map((doc, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.type} • {doc.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentUpload;
