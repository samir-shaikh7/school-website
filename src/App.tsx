import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Messages from "./pages/Messages.tsx";
import Index from "./pages/Index.tsx";
import Events from "./pages/Events.tsx";
import About from "./pages/About.tsx";
import Academics from "./pages/Academics.tsx";
import Facilities from "./pages/Facilities.tsx";
import Admissions from "./pages/Admissions.tsx";
import Login from "./pages/Login.tsx";
import AdminEvents from "./pages/AdminEvents.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminNotice from "./pages/AdminNotice.tsx";
import Gallery from "./pages/Gallery.tsx";
import Staff from "./pages/Staff.tsx";
import Contact from "./pages/Contact.tsx";
import AdminGallery from "@/pages/AdminGallery";
import EventDetails from "./pages/EventDetails.tsx";
import AdminAdmissions from "@/pages/AdminAdmissions";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>

        <Routes>

          {/* Layout Wrapper */}
          <Route path="/" element={<Layout />}>

            {/* Public Pages */}
            <Route index element={<Index />} />
            <Route path="about" element={<About />} />
            <Route path="academics" element={<Academics />} />
            <Route path="facilities" element={<Facilities />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route path="staff" element={<Staff />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />


            {/* Admin Panel */}
            <Route
              path="admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="admin/events"
              element={
                <ProtectedRoute>
                  <AdminEvents />
                </ProtectedRoute>
              }
            />

            <Route
              path="admin/notices"
              element={
                <ProtectedRoute>
                  <AdminNotice />
                </ProtectedRoute>
              }
            />

            <Route
              path="admin/messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />

            <Route
              path="admin/gallery"
              element={
                <ProtectedRoute>
                  <AdminGallery />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/admissions"
              element={
                <ProtectedRoute>
                  <AdminAdmissions />
                </ProtectedRoute>} />

          </Route>

          {/* Auth */}

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;