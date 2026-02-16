import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import CollegesPage from "./pages/CollegesPage";
import TimelinePage from "./pages/TimelinePage";
import CareersPage from "./pages/CareersPage";
import QuizPage from "./pages/QuizPage";
import LearnMorePage from "./pages/LearnMorePage";
import FavoritesPage from "./pages/FavoritesPage";
import DashboardPage from "./pages/DashboardPage";
import AIAdvisorPage from "./pages/AIAdvisorPage";
import ComparePage from "./pages/ComparePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/colleges" element={<CollegesPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/learnmore" element={<LearnMorePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/ai-advisor" element={<AIAdvisorPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
