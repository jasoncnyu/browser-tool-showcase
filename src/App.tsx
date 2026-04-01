import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import Index from "./pages/Index.tsx";
import ToolDetail from "./pages/ToolDetail.tsx";
import Submit from "./pages/Submit.tsx";
import SubmitBacklink from "./pages/SubmitBacklink.tsx";
import Login from "./pages/Login.tsx";
import About from "./pages/About.tsx";
import MyPage from "./pages/MyPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tool/:id" element={<ToolDetail />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/submit/backlink" element={<SubmitBacklink />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
