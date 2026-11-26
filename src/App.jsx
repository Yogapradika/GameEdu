import React, { useState, useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import AddQuestionPage from './pages/AddQuestionPage';
import {
  CreateSessionPage,
  ClassStudentsPage,
  ReportsAndSettingsPage,
} from './pages/SecondaryPages';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { initialQuestions } from './data/initialData';

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('gameedu_active_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('gameedu_questions');
    return saved ? JSON.parse(saved) : initialQuestions;
  });

  useEffect(() => {
    localStorage.setItem('gameedu_questions', JSON.stringify(questions));
  }, [questions]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('gameedu_active_user', JSON.stringify(userData));
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gameedu_active_user');
  };

  const handleSaveQuestion = (savedQuestion) => {
    setQuestions((prev) => {
      const exists = prev.some((q) => q.id === savedQuestion.id);
      if (exists) {
        return prev.map((q) => (q.id === savedQuestion.id ? savedQuestion : q));
      }
      return [savedQuestion, ...prev];
    });
    setEditingQuestion(null);
    setActivePage('dashboard');
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setActivePage('tambah-soal');
  };

  const handleDeleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  if (!user) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen flex bg-slate-50/90">
      <Sidebar
        activePage={activePage}
        setActivePage={(page) => {
          if (page !== 'tambah-soal') setEditingQuestion(null);
          setActivePage(page);
        }}
        user={user}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          activePage={activePage}
          user={user}
          onOpenSidebar={() => setSidebarOpen(true)}
          onQuickAdd={() => {
            setEditingQuestion(null);
            setActivePage('tambah-soal');
          }}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {(activePage === 'dashboard' || activePage === 'bank-soal') && (
            <DashboardPage
              questions={questions}
              onNavigateAdd={() => {
                setEditingQuestion(null);
                setActivePage('tambah-soal');
              }}
              onNavigateSession={() => setActivePage('buat-sesi')}
              onEditQuestion={handleEditQuestion}
              onDeleteQuestion={handleDeleteQuestion}
            />
          )}

          {activePage === 'tambah-soal' && (
            <AddQuestionPage
              editingQuestion={editingQuestion}
              onBack={() => {
                setEditingQuestion(null);
                setActivePage('dashboard');
              }}
              onSaveQuestion={handleSaveQuestion}
            />
          )}

          {activePage === 'buat-sesi' && <CreateSessionPage questions={questions} />}

          {activePage === 'kelas' && <ClassStudentsPage />}

          {(activePage === 'laporan' || activePage === 'pengaturan') && (
            <ReportsAndSettingsPage mode={activePage} user={user} />
          )}
        </main>
      </div>
    </div>
  );
}