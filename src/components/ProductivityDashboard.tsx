import React, { useState, useEffect } from 'react';
import { SprintTask, INITIAL_TASKS, DISCIPLINES } from '../data/portfolioData';

interface ProductivityDashboardProps {
  onOpenAIArchitect: () => void;
  onOpenContact: () => void;
}

export const ProductivityDashboard: React.FC<ProductivityDashboardProps> = ({
  onOpenAIArchitect,
  onOpenContact,
}) => {
  // Tasks state
  const [tasks, setTasks] = useState<SprintTask[]>(() => {
    const saved = localStorage.getItem('msdev_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  // Selected discipline filter
  const [taskFilter, setTaskFilter] = useState<string>('all');

  // New task form state
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newProject, setNewProject] = useState('DigiBazar Commerce');
  const [newDiscipline, setNewDiscipline] = useState('Full Stack');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('high');

  // Focus Timer state (25 minutes)
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(3);

  // Scratchpad state
  const [scratchpad, setScratchpad] = useState<string>(() => {
    return (
      localStorage.getItem('msdev_scratchpad') ||
      `// High-Priority Notes & Architecture Memo\n- Finalize Supabase RLS row-level policies for multi-tenant workspace\n- Review bundle size of Next.js 15 dynamic imports (target < 50kB)\n- Prepare LP keynote deck with clear unit economics for investor call`
    );
  });

  // Inquiries state
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  useEffect(() => {
    localStorage.setItem('msdev_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('msdev_scratchpad', scratchpad);
  }, [scratchpad]);

  // Pomodoro timer tick
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setCompletedSessions((prev) => prev + 1);
      setTimerSeconds(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Fetch inquiries from server
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setLoadingInquiries(true);
        const res = await fetch('/api/inquiries');
        if (res.ok) {
          const data = await res.json();
          setInquiries(data.inquiries || []);
        }
      } catch (err) {
        console.error('Failed to load inquiries:', err);
      } finally {
        setLoadingInquiries(false);
      }
    };
    fetchInquiries();
  }, []);

  const moveTask = (taskId: string, newStatus: 'backlog' | 'in_progress' | 'review' | 'completed') => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: SprintTask = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      project: newProject,
      discipline: newDiscipline,
      status: 'in_progress',
      priority: newPriority,
      dueDate: 'This sprint',
      progress: 0,
    };

    setTasks([newTask, ...tasks]);
    setNewTitle('');
    setIsAddingTask(false);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === 'all') return true;
    return t.discipline.toLowerCase().includes(taskFilter.toLowerCase());
  });

  const columns: { id: SprintTask['status']; label: string; count: number }[] = [
    {
      id: 'backlog',
      label: 'Backlog',
      count: filteredTasks.filter((t) => t.status === 'backlog').length,
    },
    {
      id: 'in_progress',
      label: 'In Progress',
      count: filteredTasks.filter((t) => t.status === 'in_progress').length,
    },
    {
      id: 'review',
      label: 'Review & QA',
      count: filteredTasks.filter((t) => t.status === 'review').length,
    },
    {
      id: 'completed',
      label: 'Shipped',
      count: filteredTasks.filter((t) => t.status === 'completed').length,
    },
  ];

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Header Bar */}
      <section className="px-4 sm:px-6 pt-5 pb-6 bg-white dark:bg-[#111722] border-b border-[#e5e7eb] dark:border-[#1f2937]">
        <div className="max-w-5xl mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-[#2563eb] dark:text-[#60a5fa] tracking-wider">
                Studio Operations & Task OS
              </span>
              <h1 className="font-['Manrope'] text-2xl sm:text-3xl font-extrabold text-[#151c27] dark:text-white tracking-tight">
                Productivity Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenAIArchitect}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold shadow-xs transition-all"
              >
                <span className="material-symbols-outlined text-[17px]">psychology</span>
                <span>Launch AI Architect</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAddingTask(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f0f3ff] dark:bg-[#1a2333] hover:bg-[#e2e8f0] dark:hover:bg-[#222e42] text-[#151c27] dark:text-white border border-[#e5e7eb] dark:border-[#222d3d] text-xs font-semibold transition-all"
              >
                <span className="material-symbols-outlined text-[17px] text-[#2563eb]">add</span>
                <span>New Task</span>
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8] max-w-2xl leading-relaxed">
            Minimalist studio command center for managing ongoing deliverables, tracking deep work
            sessions, and monitoring client pipelines.
          </p>

          {/* 4 Top KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="p-3.5 rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] flex flex-col justify-between">
              <span className="text-[10px] font-bold text-[#6b7280] dark:text-[#94a3b8] uppercase tracking-wider">
                Active Builds
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-['Manrope'] text-2xl font-extrabold text-[#151c27] dark:text-white">
                  6
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  ● On track
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] flex flex-col justify-between">
              <span className="text-[10px] font-bold text-[#6b7280] dark:text-[#94a3b8] uppercase tracking-wider">
                Sprint Velocity
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-['Manrope'] text-2xl font-extrabold text-[#2563eb] dark:text-[#60a5fa]">
                  94.2%
                </span>
                <span className="text-[10px] text-slate-500 font-medium">target 90%</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] flex flex-col justify-between">
              <span className="text-[10px] font-bold text-[#6b7280] dark:text-[#94a3b8] uppercase tracking-wider">
                P95 Global Latency
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-['Manrope'] text-2xl font-extrabold text-[#007b71] dark:text-[#2dd4bf]">
                  42ms
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Edge CDN</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] flex flex-col justify-between">
              <span className="text-[10px] font-bold text-[#6b7280] dark:text-[#94a3b8] uppercase tracking-wider">
                Billable Hours
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-['Manrope'] text-2xl font-extrabold text-[#151c27] dark:text-white">
                  38.5h
                </span>
                <span className="text-[10px] text-slate-500 font-medium">this week</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        {/* Top Control: Filter Tasks + Pomodoro Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left 2 Cols: Sprint Board Header & Filters */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2563eb] text-[20px]">
                  view_kanban
                </span>
                <h2 className="font-['Manrope'] text-lg font-bold text-[#151c27] dark:text-white">
                  Active Sprint Board (SyncFlow OS)
                </h2>
              </div>
              <span className="text-xs text-[#6b7280] dark:text-[#94a3b8]">
                {filteredTasks.length} tasks
              </span>
            </div>

            {/* Discipline Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <button
                type="button"
                onClick={() => setTaskFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  taskFilter === 'all'
                    ? 'bg-[#151c27] text-white dark:bg-white dark:text-[#111827]'
                    : 'bg-[#f0f3ff] dark:bg-[#1a2333] text-[#575e70] dark:text-[#94a3b8]'
                }`}
              >
                All Disciplines
              </button>
              <button
                type="button"
                onClick={() => setTaskFilter('Full Stack')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  taskFilter === 'Full Stack'
                    ? 'bg-[#151c27] text-white dark:bg-white dark:text-[#111827]'
                    : 'bg-[#f0f3ff] dark:bg-[#1a2333] text-[#575e70] dark:text-[#94a3b8]'
                }`}
              >
                Full Stack
              </button>
              <button
                type="button"
                onClick={() => setTaskFilter('Web Design')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  taskFilter === 'Web Design'
                    ? 'bg-[#151c27] text-white dark:bg-white dark:text-[#111827]'
                    : 'bg-[#f0f3ff] dark:bg-[#1a2333] text-[#575e70] dark:text-[#94a3b8]'
                }`}
              >
                Web Design
              </button>
              <button
                type="button"
                onClick={() => setTaskFilter('Poster')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  taskFilter === 'Poster'
                    ? 'bg-[#151c27] text-white dark:bg-white dark:text-[#111827]'
                    : 'bg-[#f0f3ff] dark:bg-[#1a2333] text-[#575e70] dark:text-[#94a3b8]'
                }`}
              >
                Poster
              </button>
              <button
                type="button"
                onClick={() => setTaskFilter('PPT')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  taskFilter === 'PPT'
                    ? 'bg-[#151c27] text-white dark:bg-white dark:text-[#111827]'
                    : 'bg-[#f0f3ff] dark:bg-[#1a2333] text-[#575e70] dark:text-[#94a3b8]'
                }`}
              >
                Presentations
              </button>
            </div>
          </div>

          {/* Right Col: Deep Focus Pomodoro Timer */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#2563eb]">
                  timer
                </span>
                <span className="text-xs font-bold text-[#151c27] dark:text-white uppercase tracking-wider">
                  Deep Focus Mode
                </span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                {completedSessions} sessions today
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="font-mono text-3xl font-extrabold text-[#151c27] dark:text-white tracking-tight">
                {formatTimer(timerSeconds)}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsTimerRunning((prev) => !prev)}
                  className={`h-8 px-3 rounded-lg text-xs font-bold transition-all shadow-2xs ${
                    isTimerRunning
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                  }`}
                >
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(25 * 60);
                  }}
                  className="w-8 h-8 rounded-lg bg-[#f0f3ff] dark:bg-[#1a2333] text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center border border-[#e5e7eb] dark:border-[#222d3d]"
                  title="Reset Timer"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for adding a task */}
        {isAddingTask && (
          <form
            onSubmit={handleCreateTask}
            className="p-4 sm:p-5 rounded-2xl bg-[#f0f3ff] dark:bg-[#161f2e] border-2 border-[#2563eb] shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#151c27] dark:text-white uppercase tracking-wider">
                Create New Sprint Task
              </span>
              <button
                type="button"
                onClick={() => setIsAddingTask(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <input
              type="text"
              required
              placeholder="e.g. Optimize Postgres query plan for live catalog search..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-[#111722] border border-[#e5e7eb] dark:border-[#222d3d] text-xs text-[#151c27] dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#2563eb]"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Project
                </label>
                <input
                  type="text"
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-lg bg-white dark:bg-[#111722] border border-[#e5e7eb] dark:border-[#222d3d] text-xs text-[#151c27] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Discipline
                </label>
                <select
                  value={newDiscipline}
                  onChange={(e) => setNewDiscipline(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg bg-white dark:bg-[#111722] border border-[#e5e7eb] dark:border-[#222d3d] text-xs text-[#151c27] dark:text-white"
                >
                  <option value="Full Stack">Full Stack</option>
                  <option value="Web Design">Web Design</option>
                  <option value="Poster Design">Poster Design</option>
                  <option value="PPT Design">PPT Design</option>
                  <option value="Infographics">Infographics</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Priority
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full h-8 px-2 rounded-lg bg-white dark:bg-[#111722] border border-[#e5e7eb] dark:border-[#222d3d] text-xs text-[#151c27] dark:text-white"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingTask(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[#2563eb] text-white text-xs font-semibold hover:bg-[#1d4ed8]"
              >
                Add to Sprint
              </button>
            </div>
          </form>
        )}

        {/* 4 Columns Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className="flex flex-col rounded-2xl bg-[#f8fafc] dark:bg-[#111722] border border-[#e5e7eb] dark:border-[#1f2937] p-3.5 min-h-[360px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#e5e7eb] dark:border-[#1f2937]">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        col.id === 'in_progress'
                          ? 'bg-[#2563eb]'
                          : col.id === 'completed'
                          ? 'bg-emerald-500'
                          : col.id === 'review'
                          ? 'bg-amber-500'
                          : 'bg-slate-400'
                      }`}
                    ></span>
                    <h3 className="font-['Manrope'] text-xs font-bold text-[#151c27] dark:text-white">
                      {col.label}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white dark:bg-[#1a2333] border border-[#e5e7eb] dark:border-[#222d3d] text-slate-600 dark:text-slate-300">
                    {col.count}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="flex flex-col gap-2.5 pt-3 flex-1">
                  {colTasks.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-center p-4 border border-dashed border-[#e2e8f0] dark:border-[#222d3d] rounded-xl text-[11px] text-slate-400">
                      No cards
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-3 rounded-xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs hover:border-[#2563eb] dark:hover:border-[#3b82f6] transition-all flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-semibold text-slate-500 dark:text-slate-400 truncate max-w-[130px]">
                            {task.project}
                          </span>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                              task.priority === 'high'
                                ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                                : task.priority === 'medium'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>

                        <p className="text-xs font-semibold text-[#151c27] dark:text-[#f0f3ff] leading-snug">
                          {task.title}
                        </p>

                        {/* Progress Bar */}
                        <div className="w-full bg-[#f1f5f9] dark:bg-[#1e293b] h-1 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full ${
                              task.status === 'completed' ? 'bg-emerald-500' : 'bg-[#2563eb]'
                            }`}
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>

                        {/* Stage Mover Buttons */}
                        <div className="pt-1 flex items-center justify-between border-t border-[#f1f5f9] dark:border-[#1e293b] text-[10px]">
                          <span className="text-slate-400 font-mono">{task.dueDate}</span>
                          <div className="flex items-center gap-1">
                            {col.id !== 'backlog' && (
                              <button
                                type="button"
                                onClick={() => {
                                  const stages: SprintTask['status'][] = [
                                    'backlog',
                                    'in_progress',
                                    'review',
                                    'completed',
                                  ];
                                  const currentIdx = stages.indexOf(task.status);
                                  if (currentIdx > 0) moveTask(task.id, stages[currentIdx - 1]);
                                }}
                                className="p-0.5 rounded text-slate-400 hover:text-[#2563eb]"
                                title="Move backward"
                              >
                                <span className="material-symbols-outlined text-[14px]">west</span>
                              </button>
                            )}
                            {col.id !== 'completed' && (
                              <button
                                type="button"
                                onClick={() => {
                                  const stages: SprintTask['status'][] = [
                                    'backlog',
                                    'in_progress',
                                    'review',
                                    'completed',
                                  ];
                                  const currentIdx = stages.indexOf(task.status);
                                  if (currentIdx < stages.length - 1)
                                    moveTask(task.id, stages[currentIdx + 1]);
                                }}
                                className="p-0.5 rounded text-slate-400 hover:text-[#2563eb]"
                                title="Move forward"
                              >
                                <span className="material-symbols-outlined text-[14px]">east</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Split: Local Scratchpad & Client Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          {/* Scratchpad */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#2563eb]">
                  edit_note
                </span>
                <h3 className="font-['Manrope'] text-sm font-bold text-[#151c27] dark:text-white">
                  Engineering Scratchpad
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Auto-saved locally</span>
            </div>

            <textarea
              rows={6}
              value={scratchpad}
              onChange={(e) => setScratchpad(e.target.value)}
              placeholder="Paste quick thoughts, architectural constraints, API snippets..."
              className="w-full p-3 text-xs font-mono rounded-xl bg-[#f8fafc] dark:bg-[#111722] border border-[#e5e7eb] dark:border-[#222d3d] text-[#151c27] dark:text-slate-200 focus:outline-hidden focus:border-[#2563eb] leading-relaxed"
            />
          </div>

          {/* Incoming Inquiries Manager */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#f1f5f9] dark:border-[#1e293b]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-teal-600 dark:text-teal-400">
                    inbox
                  </span>
                  <h3 className="font-['Manrope'] text-sm font-bold text-[#151c27] dark:text-white">
                    Client Inquiries Pipeline
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="text-[11px] font-bold text-[#2563eb] dark:text-[#60a5fa] hover:underline"
                >
                  Submit New +
                </button>
              </div>

              <div className="divide-y divide-[#f1f5f9] dark:divide-[#1e293b] max-h-48 overflow-y-auto no-scrollbar">
                {loadingInquiries ? (
                  <p className="text-xs text-slate-400 py-3">Loading inquiries...</p>
                ) : inquiries.length === 0 ? (
                  <p className="text-xs text-slate-400 py-3">No pending client inquiries.</p>
                ) : (
                  inquiries.map((inq) => (
                    <div key={inq.id} className="py-2.5 flex items-start justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#151c27] dark:text-white">
                          {inq.name} •{' '}
                          <span className="text-slate-500 font-normal">
                            {inq.company || inq.discipline}
                          </span>
                        </span>
                        <p className="text-[11px] text-[#575e70] dark:text-[#94a3b8] line-clamp-1 mt-0.5">
                          {inq.message}
                        </p>
                      </div>
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 font-semibold shrink-0">
                        {inq.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-[#f1f5f9] dark:border-[#1e293b] flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px]">Direct bookings via Calendly/WhatsApp</span>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="text-[#2563eb] dark:text-[#60a5fa] font-semibold hover:underline"
              >
                Chat on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
