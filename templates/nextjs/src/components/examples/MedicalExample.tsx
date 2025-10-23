'use client';

import { useState } from 'react';
import { useFhevmEncrypt } from '@fhevm/sdk';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

/**
 * Medical Example Component
 * Demonstrates confidential health data management using FHE
 */
export function MedicalExample() {
  const { encrypt, isEncrypting, error } = useFhevmEncrypt();

  const [patientAge, setPatientAge] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [encryptedRecords, setEncryptedRecords] = useState<any[]>([]);

  const handleEncryptRecord = async (value: string, recordType: string, dataType: 'uint8' | 'uint16' = 'uint8') => {
    if (!value) return;

    try {
      const numValue = parseInt(value);
      const result = await encrypt(numValue, dataType);

      if (result) {
        setEncryptedRecords(prev => [...prev, {
          type: recordType,
          encrypted: true,
          timestamp: new Date().toISOString()
        }]);
      }
    } catch (err) {
      console.error('Encryption error:', err);
    }
  };

  const handleEncryptAll = async () => {
    if (!patientAge || !bloodPressure || !heartRate) {
      alert('Please fill in all fields');
      return;
    }

    setEncryptedRecords([]);
    await handleEncryptRecord(patientAge, 'Patient Age', 'uint8');
    await handleEncryptRecord(bloodPressure, 'Blood Pressure (mmHg)', 'uint8');
    await handleEncryptRecord(heartRate, 'Heart Rate (bpm)', 'uint8');
  };

  return (
    <Card
      title="Medical Records Use Case"
      description="Confidential patient health data with privacy-preserving analytics"
    >
      <div className="space-y-6">
        {/* Patient Data Input */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Patient Health Metrics
          </h3>

          <Input
            label="Patient Age"
            type="number"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
            placeholder="Enter patient age"
            helperText="Age will be encrypted (0-255)"
          />

          <Input
            label="Blood Pressure (Systolic)"
            type="number"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            placeholder="e.g., 120"
            helperText="Systolic blood pressure in mmHg"
          />

          <Input
            label="Heart Rate"
            type="number"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            placeholder="e.g., 75"
            helperText="Heart rate in beats per minute"
          />

          <Button
            onClick={handleEncryptAll}
            isLoading={isEncrypting}
            disabled={!patientAge || !bloodPressure || !heartRate || isEncrypting}
            className="w-full"
          >
            🏥 Encrypt All Medical Records
          </Button>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">
                Error: {error.message}
              </p>
            </div>
          )}
        </div>

        {/* Encrypted Records Display */}
        {encryptedRecords.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Encrypted Records
            </h4>
            {encryptedRecords.map((record, index) => (
              <div
                key={index}
                className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">
                    ✓ {record.type}
                  </span>
                  <span className="text-xs text-green-600 dark:text-green-500">
                    Encrypted
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Use Case Description */}
        <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
          <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
            Healthcare Privacy Benefits
          </h4>
          <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-1">
            <li>• Patient data remains encrypted on-chain and off-chain</li>
            <li>• Enable privacy-preserving medical research and analytics</li>
            <li>• HIPAA-compliant data handling without centralized databases</li>
            <li>• Patients control access to their medical records</li>
            <li>• Secure data sharing between healthcare providers</li>
          </ul>
        </div>

        {/* Additional Features */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
            Advanced FHE Capabilities
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            With FHE, medical institutions can perform statistical analysis,
            risk assessments, and machine learning on encrypted patient data
            without ever accessing the raw information.
          </p>
        </div>
      </div>
    </Card>
  );
}
