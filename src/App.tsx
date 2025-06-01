
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";
import Navbar from "@/components/Navbar";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Feed from "@/pages/Feed";
import ConsumerFeed from "@/pages/ConsumerFeed";
import AffiliateFeed from "@/pages/AffiliateFeed";
import Dashboard from "@/pages/Dashboard";
import Marketplace from "@/pages/Marketplace";
import Profile from "@/pages/Profile";
import Groups from "@/pages/Groups";
import Chat from "@/pages/Chat";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import CreatePost from "@/pages/CreatePost";
import Reels from "@/pages/Reels";
import AddProduct from "@/pages/AddProduct";
import Presentation from "@/pages/Presentation";
import Connect from "@/pages/Connect";
import CreateStore from "@/pages/CreateStore";
import StoreBuilder from "@/pages/StoreBuilder";
import About from "@/pages/About";
import Help from "@/pages/Help";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import MyStore from "@/pages/MyStore";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/presentation" element={<Presentation />} />
              <Route path="/connect" element={<Connect />} />
              <Route path="/about" element={<About />} />
              <Route path="/help" element={<Help />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Feed geral - redireciona baseado no tipo */}
              <Route path="/feed" element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              } />
              
              {/* Feed específico para consumidores */}
              <Route path="/consumer-feed" element={
                <ProtectedRoute>
                  <RoleProtectedRoute requiredRole="consumer" fallbackPath="/affiliate-feed">
                    <ConsumerFeed />
                  </RoleProtectedRoute>
                </ProtectedRoute>
              } />
              
              {/* Feed específico para afiliados */}
              <Route path="/affiliate-feed" element={
                <ProtectedRoute>
                  <RoleProtectedRoute requiredRole="affiliate" fallbackPath="/consumer-feed">
                    <AffiliateFeed />
                  </RoleProtectedRoute>
                </ProtectedRoute>
              } />
              
              {/* Rotas específicas para afiliados */}
              <Route path="/create-post" element={
                <ProtectedRoute>
                  <RoleProtectedRoute requiredRole="affiliate" fallbackPath="/consumer-feed">
                    <CreatePost />
                  </RoleProtectedRoute>
                </ProtectedRoute>
              } />
              
              <Route path="/add-product" element={
                <ProtectedRoute>
                  <RoleProtectedRoute requiredRole="affiliate" fallbackPath="/consumer-feed">
                    <AddProduct />
                  </RoleProtectedRoute>
                </ProtectedRoute>
              } />
              
              <Route path="/create-store" element={
                <ProtectedRoute>
                  <RoleProtectedRoute requiredRole="affiliate" fallbackPath="/consumer-feed">
                    <CreateStore />
                  </RoleProtectedRoute>
                </ProtectedRoute>
              } />
              
              <Route path="/my-store" element={
                <ProtectedRoute>
                  <RoleProtectedRoute requiredRole="affiliate" fallbackPath="/consumer-feed">
                    <MyStore />
                  </RoleProtectedRoute>
                </ProtectedRoute>
              } />
              
              <Route path="/store-builder" element={
                <ProtectedRoute>
                  <RoleProtectedRoute requiredRole="affiliate" fallbackPath="/consumer-feed">
                    <StoreBuilder />
                  </RoleProtectedRoute>
                </ProtectedRoute>
              } />
              
              {/* Rotas compartilhadas */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/reels" element={
                <ProtectedRoute>
                  <Reels />
                </ProtectedRoute>
              } />
              
              <Route path="/marketplace" element={
                <ProtectedRoute>
                  <Marketplace />
                </ProtectedRoute>
              } />
              
              <Route path="/profile/:id" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              <Route path="/groups" element={
                <ProtectedRoute>
                  <Groups />
                </ProtectedRoute>
              } />
              
              <Route path="/chat" element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
