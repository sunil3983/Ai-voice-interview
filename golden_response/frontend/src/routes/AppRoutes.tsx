import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { ProtectedRoute } from './ProtectedRoute';

const Landing = lazy(() => import('../pages/Landing'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const InterviewCreate = lazy(() => import('../pages/InterviewCreate'));
const LiveInterview = lazy(() => import('../pages/LiveInterview'));
const Feedback = lazy(() => import('../pages/Feedback'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Settings = lazy(() => import('../pages/Settings'));
const Contact = lazy(() => import('../pages/Contact'));

const Loader = () => <div className="grid min-h-screen place-items-center bg-slate-50 text-ink dark:bg-slate-950 dark:text-mint">Loading PrepWise...</div>;

export const AppRoutes = () => {
  const location = useLocation();
  return (
    <Suspense fallback={<Loader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/interviews/new" element={<InterviewCreate />} />
              <Route path="/interviews/:id/live" element={<LiveInterview />} />
              <Route path="/feedback/:id" element={<Feedback />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};
