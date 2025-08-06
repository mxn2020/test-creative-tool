import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { Dashboard } from './pages/Dashboard';
import { SessionsPage } from './pages/SessionsPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { UsersPage } from './pages/UsersPage';
import { UserDetailsPage } from './pages/UserDetailsPage';
import { AdminAuditLogsPage } from './pages/AdminAuditLogsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ClientsPage } from './pages/ClientsPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/auth/AdminRoute';
import { AuthProvider } from './components/auth/AuthProvider';
import { AdminLayout } from './components/admin/AdminLayout';
import { DevModeApp, Container } from './lib/dev-container';
import { componentRegistry } from './registry/componentRegistry';
import { componentLibrary } from './registry/componentLibrary';
function App() {
  return (
    <DevModeApp system={{ registry: componentRegistry, library: componentLibrary }}>
      <AuthProvider>
        <Router>
          <Container componentId="app-root">
            <div className="App">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sessions"
                  element={
                    <ProtectedRoute>
                      <SessionsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/audit-logs"
                  element={
                    <ProtectedRoute>
                      <AuditLogsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/clients"
                  element={
                    <ProtectedRoute>
                      <ClientsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/appointments"
                  element={
                    <ProtectedRoute>
                      <AppointmentsPage />
                    </ProtectedRoute>
                    }
                />
                {/* Admin routes */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<UsersPage />} />
                  <Route path="users/:userId" element={<UserDetailsPage />} />
                  <Route path="audit-logs" element={<AdminAuditLogsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Container>
        </Router>
      </AuthProvider>
    </DevModeApp>
  );
}
export default App;
---END:src/App.tsx---
---FILE:src/pages/ClientsPage.tsx---
import React from 'react';
import { Container, Div, H2 } from '@/lib/dev-container';
export const ClientsPage: React.FC = () => (
  <Container componentId="clients-page">
    <Div devId="clients-section" className="p-8">
      <H2 devId="clients-heading" className="text-2xl font-bold">
        Clients
      </H2>
      <p className="mt-4">This is a placeholder Clients page.</p>
    </Div>
  </Container>
);
export default ClientsPage;
---END:src/pages/ClientsPage.tsx---
---FILE:src/pages/AppointmentsPage.tsx---
import React from 'react';
import { Container, Div, H2 } from '@/lib/dev-container';
export const AppointmentsPage: React.FC = () => (
  <Container componentId="appointments-page">
    <Div devId="appointments-section" className="p-8">
      <H2 devId="appointments-heading" className="text-2xl font-bold">
        Appointments
      </H2>
      <p className="mt-4">This is a placeholder Appointments page.</p>
    </Div>
  </Container>
);
export default AppointmentsPage;
---END:src/pages/AppointmentsPage.tsx---
---END---