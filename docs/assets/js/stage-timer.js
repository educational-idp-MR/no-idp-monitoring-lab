// Stage Timer for Lab Documentation
// Tracks time spent on each stage

class StageTimer {
  constructor(stageId, stageName) {
    this.stageId = stageId;
    this.stageName = stageName;
    this.interval = null;
    this.startTime = null;
    this.elapsedTime = 0;
    this.isRunning = false;
    
    // Load saved state
    this.loadState();
    
    // Initialize UI
    this.initUI();
  }
  
  loadState() {
    const savedState = localStorage.getItem(`stage_${this.stageId}`);
    if (savedState) {
      const state = JSON.parse(savedState);
      this.elapsedTime = state.elapsedTime || 0;
      this.isRunning = state.isRunning || false;
      
      if (this.isRunning) {
        this.startTime = Date.now() - this.elapsedTime;
      }
    }
  }
  
  saveState() {
    const state = {
      elapsedTime: this.elapsedTime,
      isRunning: this.isRunning,
      stageName: this.stageName
    };
    localStorage.setItem(`stage_${this.stageId}`, JSON.stringify(state));
  }
  
  initUI() {
    const timerContainer = document.getElementById('stage-timer');
    if (!timerContainer) return;
    
    timerContainer.innerHTML = `
      <div class="timer-box">
        <div class="timer-header">
          <span class="timer-icon">⏱️</span>
          <span class="timer-title">Tiempo en esta etapa</span>
        </div>
        <div class="timer-display" id="timer-display">00:00:00</div>
        <div class="timer-controls">
          <button id="timer-start" class="timer-btn timer-btn-start">▶️ Iniciar</button>
          <button id="timer-pause" class="timer-btn timer-btn-pause" style="display:none;">⏸️ Pausar</button>
          <button id="timer-finish" class="timer-btn timer-btn-finish">✅ Finalizar Etapa</button>
          <button id="timer-reset" class="timer-btn timer-btn-reset">🔄 Reiniciar</button>
        </div>
        <div class="timer-info" id="timer-info"></div>
      </div>
    `;
    
    // Event listeners
    document.getElementById('timer-start').addEventListener('click', () => this.start());
    document.getElementById('timer-pause').addEventListener('click', () => this.pause());
    document.getElementById('timer-finish').addEventListener('click', () => this.finish());
    document.getElementById('timer-reset').addEventListener('click', () => this.reset());
    
    // Update display
    this.updateDisplay();
    
    // Resume if was running
    if (this.isRunning) {
      this.start();
    }
  }
  
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.startTime = Date.now() - this.elapsedTime;
    
    document.getElementById('timer-start').style.display = 'none';
    document.getElementById('timer-pause').style.display = 'inline-block';
    
    this.interval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
      this.updateDisplay();
      this.saveState();
    }, 1000);
    
    this.saveState();
  }
  
  pause() {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    clearInterval(this.interval);
    
    document.getElementById('timer-start').style.display = 'inline-block';
    document.getElementById('timer-pause').style.display = 'none';
    
    this.saveState();
  }
  
  finish() {
    this.pause();
    
    const hours = Math.floor(this.elapsedTime / 3600000);
    const minutes = Math.floor((this.elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((this.elapsedTime % 60000) / 1000);
    
    let timeText = '';
    if (hours > 0) timeText += `${hours}h `;
    if (minutes > 0) timeText += `${minutes}m `;
    timeText += `${seconds}s`;
    
    // Save completion
    const completionKey = `stage_${this.stageId}_completed`;
    const completionData = {
      stageName: this.stageName,
      timeSpent: this.elapsedTime,
      timeText: timeText,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem(completionKey, JSON.stringify(completionData));
    
    // Show completion message
    const infoDiv = document.getElementById('timer-info');
    infoDiv.innerHTML = `
      <div class="timer-completion">
        🎉 <strong>¡Etapa completada!</strong><br>
        Tiempo total: <strong>${timeText}</strong><br>
        <small>Registrado en tu navegador</small>
      </div>
    `;
    
    // Update total lab time
    this.updateTotalTime();
  }
  
  reset() {
    if (confirm('¿Estás seguro de reiniciar el timer de esta etapa?')) {
      this.pause();
      this.elapsedTime = 0;
      this.updateDisplay();
      document.getElementById('timer-info').innerHTML = '';
      this.saveState();
    }
  }
  
  updateDisplay() {
    const hours = Math.floor(this.elapsedTime / 3600000);
    const minutes = Math.floor((this.elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((this.elapsedTime % 60000) / 1000);
    
    const display = document.getElementById('timer-display');
    if (display) {
      display.textContent = 
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
    }
  }
  
  updateTotalTime() {
    let totalTime = 0;
    const stages = ['etapa1', 'etapa2', 'etapa2-1', 'etapa2-2', 'etapa3'];
    
    stages.forEach(stageId => {
      const completionKey = `stage_${stageId}_completed`;
      const data = localStorage.getItem(completionKey);
      if (data) {
        const completion = JSON.parse(data);
        totalTime += completion.timeSpent;
      }
    });
    
    if (totalTime > 0) {
      localStorage.setItem('lab_total_time', totalTime.toString());
    }
  }
  
  static showTotalTime() {
    const totalTime = parseInt(localStorage.getItem('lab_total_time') || '0');
    
    if (totalTime > 0) {
      const hours = Math.floor(totalTime / 3600000);
      const minutes = Math.floor((totalTime % 3600000) / 60000);
      
      let timeText = '';
      if (hours > 0) timeText += `${hours}h `;
      if (minutes > 0) timeText += `${minutes}m`;
      
      return timeText || '< 1m';
    }
    
    return '0m';
  }
  
  static getAllCompletions() {
    const stages = [
      { id: 'etapa1', name: 'Etapa 1: Preparación del Ambiente' },
      { id: 'etapa2', name: 'Etapa 2: Métricas Iniciales' },
      { id: 'etapa2-1', name: 'Etapa 2.1: Dashboard Base en Grafana' },
      { id: 'etapa2-2', name: 'Etapa 2.2: Propuesta de Métrica Personalizada' },
      { id: 'etapa3', name: 'Etapa 3: Experimentación y Análisis' }
    ];
    
    const completions = [];
    stages.forEach(stage => {
      const completionKey = `stage_${stage.id}_completed`;
      const data = localStorage.getItem(completionKey);
      if (data) {
        const completion = JSON.parse(data);
        completions.push({
          ...stage,
          ...completion
        });
      }
    });
    
    return completions;
  }
}

// Initialize timer when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const timerContainer = document.getElementById('stage-timer');
  if (timerContainer) {
    const stageId = timerContainer.getAttribute('data-stage-id');
    const stageName = timerContainer.getAttribute('data-stage-name');
    new StageTimer(stageId, stageName);
  }
});
