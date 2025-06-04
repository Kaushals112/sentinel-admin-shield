import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { trackFileUpload } from '../utils/trackingApi';

// Obfuscated console logging
const _0x7c3d = (data: string[]) => {
  const _0x2a8f = btoa(data.join('|'));
  console.log(_0x2a8f);
};

const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [patientId, setPatientId] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      const sessionId = sessionStorage.getItem('_session_id') || 'unknown';
      const attackerIp = sessionStorage.getItem('_attacker_ip') || '127.0.0.1';
      
      // Track file selection with obfuscated logging
      await trackFileUpload(selectedFile.name, selectedFile.size, selectedFile.type);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !category || !patientId) return;

    setUploading(true);
    
    const sessionId = sessionStorage.getItem('_session_id') || 'unknown';
    const attackerIp = sessionStorage.getItem('_attacker_ip') || '127.0.0.1';

    // Create form data for file upload
    const formData = new FormData();
    const fileName = `${file.name}_${attackerIp}_${sessionId}`;
    formData.append('file', file, fileName);
    formData.append('category', category);
    formData.append('patientId', patientId);
    formData.append('description', description);
    formData.append('sessionId', sessionId);
    formData.append('attackerIp', attackerIp);

    // Obfuscated upload logging
    _0x7c3d([
      'document_uploaded',
      file.name,
      category,
      patientId,
      sessionId,
      attackerIp,
      description,
      new Date().toISOString()
    ]);

    try {
      // Simulate file upload to /opt/dionaea/var/lib/dionaea/ftp/root/
      await fetch('/api/upload-document', {
        method: 'POST',
        body: formData
      });

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploaded(true);
      setTimeout(() => {
        setUploaded(false);
        setFile(null);
        setCategory('');
        setPatientId('');
        setDescription('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 3000);
    } catch (error) {
      console.error('Upload failed:', error);
    }
    
    setUploading(false);
  };

  const recentUploads = [
    {
      id: 1,
      fileName: 'Patient_Report_12345.pdf',
      category: 'lab-results',
      uploadedBy: 'Dr. Smith',
      uploadDate: '2024-06-04 14:30',
      patientId: 'PT-12345'
    },
    {
      id: 2,
      fileName: 'X-Ray_Chest_67890.jpg',
      category: 'radiology',
      uploadedBy: 'Dr. Johnson',
      uploadDate: '2024-06-04 13:15',
      patientId: 'PT-67890'
    },
    {
      id: 3,
      fileName: 'Blood_Test_Results.pdf',
      category: 'lab-results',
      uploadedBy: 'Lab Tech',
      uploadDate: '2024-06-04 12:00',
      patientId: 'PT-11111'
    }
  ];

  if (uploaded) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Successful!</h3>
            <p className="text-gray-600">Your document has been uploaded and processed.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Medical Document
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <Label htmlFor="file">Select Document</Label>
              <Input
                id="file"
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                required
                className="mt-1"
              />
              {file && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="category">Document Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient-history">Patient History</SelectItem>
                  <SelectItem value="lab-results">Lab Results</SelectItem>
                  <SelectItem value="radiology">Radiology</SelectItem>
                  <SelectItem value="prescriptions">Prescriptions</SelectItem>
                  <SelectItem value="discharge-summary">Discharge Summary</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                type="text"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="Enter patient ID (e.g., PT-12345)"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter document description or notes"
                className="mt-1"
                rows={3}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={!file || !category || !patientId || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentUploads.map((upload) => (
              <div key={upload.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{upload.fileName}</p>
                    <p className="text-sm text-gray-600">Patient: {upload.patientId} | Category: {upload.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{upload.uploadedBy}</p>
                  <p className="text-xs text-gray-500">{upload.uploadDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUpload;
