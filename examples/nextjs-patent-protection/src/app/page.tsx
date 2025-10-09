'use client';

import { useState } from 'react';
import { ConnectWallet } from '@/components/ConnectWallet';
import { PatentApplicationForm } from '@/components/PatentApplicationForm';
import { ApplicationsList } from '@/components/ApplicationsList';
import { ExaminerPanel } from '@/components/ExaminerPanel';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'applicant' | 'examiner'>('applicant');

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                🔐 Patent Protection System
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Powered by FHEVM SDK - Privacy-Preserving Patent Applications
              </p>
            </div>
            <ConnectWallet />
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('applicant')}
              className={`
                ${activeTab === 'applicant'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              `}
            >
              📝 Applicant Portal
            </button>
            <button
              onClick={() => setActiveTab('examiner')}
              className={`
                ${activeTab === 'examiner'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              `}
            >
              👨‍⚖️ Examiner Dashboard
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'applicant' ? (
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Submit New Application
              </h2>
              <PatentApplicationForm />
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                My Applications
              </h2>
              <ApplicationsList />
            </section>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Examiner Dashboard
            </h2>
            <ExaminerPanel />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Built with ❤️ using <a href="https://www.zama.ai/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-500">Zama's FHEVM</a> and <span className="font-semibold">@fhevm/sdk</span></p>
            <p className="mt-1">All patent data remains fully encrypted on-chain</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
