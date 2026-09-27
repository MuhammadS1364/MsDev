/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { NavDrawer } from './components/NavDrawer';
import { CategorySheet } from './components/CategorySheet';
import { HomeView } from './components/HomeView';
import { CategoryView } from './components/CategoryView';
import { ProjectDetailView } from './components/ProjectDetailView';
import { ProductivityDashboard } from './components/ProductivityDashboard';
import { AIArchitectView } from './components/AIArchitectView';
import { AboutView } from './components/AboutView';
import { ContactModal } from './components/ContactModal';
import { Project, PROJECTS } from './data/portfolioData';

export default function App() {
  // Screen / View Tab: 'home' | 'categories' | 'project-detail' | 'dashboard' | 'ai-architect' | 'about'
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>('web-design');
  const [selectedProject, setSelectedProject] = useState<Project>(() => {
    // Default to DigiBazar Commerce (the featured case study from Image 5)
    return PROJECTS.find((p) => p.id === 'digibazar-commerce') || PROJECTS[0];
  });

  // Dark Mode State with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('msdev_dark_mode');
    if (saved !== null) {
      return saved === 'true';
    }
    // Default to dark or system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Like Tracking with localStorage persistence
  const [likedProjects, setLikedProjects] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('msdev_liked_projects');
    return saved ? JSON.parse(saved) : {};
  });

  // Modals & Drawers
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [contactDiscipline, setContactDiscipline] = useState<string>('Full Stack Development');

  // Sync Dark Mode class to <html> element
  useEffect(() => {
    localStorage.setItem('msdev_dark_mode', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sync Liked Projects
  useEffect(() => {
    localStorage.setItem('msdev_liked_projects', JSON.stringify(likedProjects));
  }, [likedProjects]);

  const toggleLike = (projectId: string) => {
    setLikedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentTab('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDiscipline = (disciplineId: string) => {
    setSelectedDisciplineId(disciplineId);
    setCurrentTab('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContactWithDiscipline = (disc?: string) => {
    if (disc) setContactDiscipline(disc);
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] dark:bg-[#0d121c] text-[#151c27] dark:text-[#f0f3ff] transition-colors duration-200 flex flex-col font-['Inter']">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        activeProjectCount={PROJECTS.length}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 w-full pt-16">
        {currentTab === 'home' && (
          <HomeView
            onSelectProject={handleSelectProject}
            onSelectDiscipline={handleSelectDiscipline}
            onOpenContact={() => handleOpenContactWithDiscipline()}
            likedProjects={likedProjects}
            onToggleLike={toggleLike}
          />
        )}

        {currentTab === 'categories' && (
          <CategoryView
            selectedDisciplineId={selectedDisciplineId}
            onSelectDisciplineId={handleSelectDiscipline}
            onSelectProject={handleSelectProject}
            onOpenContact={() => handleOpenContactWithDiscipline()}
            likedProjects={likedProjects}
            onToggleLike={toggleLike}
          />
        )}

        {currentTab === 'project-detail' && (
          <ProjectDetailView
            project={selectedProject}
            onBack={() => {
              setCurrentTab('categories');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProject={handleSelectProject}
            onOpenContact={() => handleOpenContactWithDiscipline(selectedProject.category)}
            likedProjects={likedProjects}
            onToggleLike={toggleLike}
          />
        )}

        {currentTab === 'dashboard' && (
          <ProductivityDashboard
            onOpenAIArchitect={() => {
              setCurrentTab('ai-architect');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenContact={() => handleOpenContactWithDiscipline()}
          />
        )}

        {currentTab === 'ai-architect' && <AIArchitectView />}

        {currentTab === 'about' && (
          <AboutView
            onOpenContact={() => handleOpenContactWithDiscipline()}
            onExploreWork={() => {
              setCurrentTab('categories');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Mobile Fixed Bottom Action Bar */}
      <BottomNav
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCategories={() => setIsCategorySheetOpen(true)}
        onOpenContact={() => handleOpenContactWithDiscipline()}
      />

      {/* Mobile Side Drawer */}
      <NavDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedDiscipline={selectedDisciplineId}
        setSelectedDiscipline={handleSelectDiscipline}
      />

      {/* Category Bottom Sheet Drawer */}
      <CategorySheet
        isOpen={isCategorySheetOpen}
        onClose={() => setIsCategorySheetOpen(false)}
        onSelectCategory={handleSelectDiscipline}
      />

      {/* Contact & Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        prefilledDiscipline={contactDiscipline}
      />
    </div>
  );
}
