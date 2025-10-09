'use client';

import { useState } from 'react';
import { useFhevmEncrypt, useFhevm } from '@fhevm/sdk';
import { BrowserProvider, Contract } from 'ethers';

export function PatentApplicationForm() {
  const { client } = useFhevm();
  const { encrypt, isEncrypting } = useFhevmEncrypt();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    claims: '',
    category: '1'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!client) {
      alert('FHEVM not initialized');
      return;
    }

    try {
      // Encrypt patent data
      const encryptedTitle = await encrypt(Number(formData.title.length), 'uint32');
      const encryptedDescription = await encrypt(Number(formData.description.length), 'uint32');
      const encryptedClaims = await encrypt(Number(formData.claims.length), 'uint32');
      const encryptedCategory = await encrypt(Number(formData.category), 'uint8');

      if (!encryptedTitle || !encryptedDescription || !encryptedClaims || !encryptedCategory) {
        throw new Error('Encryption failed');
      }

      // Submit to contract
      // const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);
      // await contract.submitApplication(...encrypted data);

      alert('Application submitted successfully!');
      setFormData({ title: '', description: '', claims: '', category: '1' });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Patent Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Claims
        </label>
        <textarea
          value={formData.claims}
          onChange={(e) => setFormData({ ...formData, claims: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="1">Technology</option>
          <option value="2">Medical</option>
          <option value="3">Software</option>
          <option value="4">Hardware</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isEncrypting}
        className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
      >
        {isEncrypting ? 'Encrypting...' : 'Submit Application'}
      </button>
    </form>
  );
}
