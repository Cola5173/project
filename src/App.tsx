import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import Storage from './pages/Storage';
import Lifecycle from './pages/Lifecycle';
import Access from './pages/Access';
import Performance from './pages/Performance';
import SpecificationSidebar from './components/SpecificationSidebar';
import { SystemProvider } from './context/SystemContext';

function App() {
  const [currentModule, setCurrentModule] = useState('overview');

  return (
    <SystemProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="flex h-screen pt-16">
            <Sidebar currentModule={currentModule} onModuleChange={setCurrentModule} />
            <main className="flex-1 flex">
              <div className="flex-1 p-6 overflow-y-auto">
                <Routes>
                  <Route path="/" element={<Overview />} />
                  <Route path="/overview" element={<Overview />} />
                  <Route path="/storage" element={<Storage />} />
                  <Route path="/lifecycle" element={<Lifecycle />} />
                  <Route path="/access" element={<Access />} />
                  <Route path="/performance" element={<Performance />} />
                </Routes>
              </div>
              {/* <SpecificationSidebar currentModule={currentModule} /> */}
            </main>
          </div>
        </div>
      </Router>
    </SystemProvider>
  );
}

export default App;