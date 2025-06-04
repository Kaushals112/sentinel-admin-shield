
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, User, FileText, Calendar, Phone } from 'lucide-react';
import { detectAndTrackXSS } from '../utils/xssDetection';
import { toast } from '@/hooks/use-toast';

// Dummy patient data
const dummyPatients = [
  {
    id: 'AIIMS/2024/001234',
    name: 'Rajesh Kumar Sharma',
    age: 45,
    gender: 'Male',
    phone: '+91-9876543210',
    address: 'A-123, Sector 15, Noida, UP',
    condition: 'Diabetes Type 2',
    doctor: 'Dr. Priya Mehta',
    admissionDate: '2024-05-15',
    status: 'Admitted'
  },
  {
    id: 'AIIMS/2024/001235',
    name: 'Sunita Devi',
    age: 62,
    gender: 'Female',
    phone: '+91-9876543211',
    address: 'B-456, Lajpat Nagar, Delhi',
    condition: 'Hypertension',
    doctor: 'Dr. Amit Singh',
    admissionDate: '2024-05-20',
    status: 'Discharged'
  },
  {
    id: 'AIIMS/2024/001236',
    name: 'Mohammad Ali Khan',
    age: 38,
    gender: 'Male',
    phone: '+91-9876543212',
    address: 'C-789, Old Delhi, Delhi',
    condition: 'Cardiac Arrest',
    doctor: 'Dr. Ravi Kumar',
    admissionDate: '2024-06-01',
    status: 'Critical'
  },
  {
    id: 'AIIMS/2024/001237',
    name: 'Priya Gupta',
    age: 29,
    gender: 'Female',
    phone: '+91-9876543213',
    address: 'D-321, Dwarka, Delhi',
    condition: 'Pregnancy Care',
    doctor: 'Dr. Neha Agarwal',
    admissionDate: '2024-06-03',
    status: 'Admitted'
  },
  {
    id: 'AIIMS/2024/001238',
    name: 'Vikram Singh',
    age: 55,
    gender: 'Male',
    phone: '+91-9876543214',
    address: 'E-654, Rohini, Delhi',
    condition: 'Liver Cirrhosis',
    doctor: 'Dr. Sandeep Jain',
    admissionDate: '2024-05-28',
    status: 'Under Treatment'
  }
];

const PatientRecords: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(dummyPatients);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for XSS in search input
    const isXSS = await detectAndTrackXSS(searchQuery, 'patient_search');
    
    if (isXSS) {
      toast({
        title: "Invalid Search Query",
        description: "Please enter a valid search term without special characters.",
        variant: "destructive"
      });
      return;
    }

    // Filter patients based on search query
    const filtered = dummyPatients.filter(patient =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredPatients(filtered);
    
    // Obfuscated search logging
    const _0x7c2d = ['patient_search', searchQuery, filtered.length, new Date().toISOString()];
    console.log(_0x7c2d.join('|'));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Patient Records Management</h2>
        <p className="text-gray-600">Search and manage patient information, medical records, and treatment history</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Patient Search
          </CardTitle>
          <CardDescription>Search patients by name, ID, or medical condition</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-4">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter patient name, ID, or condition..."
              className="flex-1"
            />
            <Button type="submit">Search Records</Button>
          </form>
        </CardContent>
      </Card>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Patients</TabsTrigger>
          <TabsTrigger value="discharged">Discharged</TabsTrigger>
          <TabsTrigger value="critical">Critical Care</TabsTrigger>
          <TabsTrigger value="outpatient">Outpatient</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Currently Admitted Patients</CardTitle>
              <CardDescription>
                Patients currently receiving treatment at AIIMS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Admission Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.filter(p => p.status === 'Admitted' || p.status === 'Under Treatment').map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.id}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.condition}</TableCell>
                      <TableCell>{patient.doctor}</TableCell>
                      <TableCell>{patient.admissionDate}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          patient.status === 'Admitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {patient.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discharged">
          <Card>
            <CardHeader>
              <CardTitle>Discharged Patients</CardTitle>
              <CardDescription>Recently discharged patients and their records</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Discharge Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.filter(p => p.status === 'Discharged').map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.id}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.condition}</TableCell>
                      <TableCell>{patient.doctor}</TableCell>
                      <TableCell>{patient.admissionDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="critical">
          <Card>
            <CardHeader>
              <CardTitle>Critical Care Patients</CardTitle>
              <CardDescription>Patients requiring immediate medical attention</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.filter(p => p.status === 'Critical').map((patient) => (
                    <TableRow key={patient.id} className="bg-red-50">
                      <TableCell className="font-medium">{patient.id}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.condition}</TableCell>
                      <TableCell>{patient.doctor}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                          {patient.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outpatient">
          <Card>
            <CardHeader>
              <CardTitle>Outpatient Records</CardTitle>
              <CardDescription>Patients scheduled for consultation and follow-ups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Outpatient appointments will be displayed here</p>
                <p className="text-sm">System integration with appointment scheduler in progress</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientRecords;
