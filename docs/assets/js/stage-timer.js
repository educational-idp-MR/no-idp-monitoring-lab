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
  console.log('⏱️ Timer system initializing...');
  const timerContainer = document.getElementById('stage-timer');
  
  if (timerContainer) {
    const stageId = timerContainer.getAttribute('data-stage-id');
    const stageName = timerContainer.getAttribute('data-stage-name');
    console.log('✅ Timer found for:', stageName, '(ID:', stageId + ')');
    
    const timer = new StageTimer(stageId, stageName);
    
    // Intercept navigation to next stage
    console.log('🔗 Setting up navigation interception...');
    interceptNextStageNavigation(stageId, stageName, timer);
  } else {
    console.warn('⚠️ No timer container found on this page');
  }
});

// Intercept clicks on "Next Stage" links
function interceptNextStageNavigation(currentStageId, currentStageName, timerInstance) {
  // Find ALL links on the page
  const allLinks = document.querySelectorAll('a');
  console.log('🔍 Found', allLinks.length, 'links on page');
  
  let nextLinksFound = 0;
  
  allLinks.forEach(link => {
    const linkText = link.textContent.trim();
    const linkHref = link.getAttribute('href') || '';
    
    // Check if it's a "Next" or "Siguiente" link
    // Must contain the right arrow emoji OR the word "Siguiente" AND point to another stage
    const isNextLink = (
      (linkText.includes('➡️') || linkText.includes('Siguiente') || linkText.toLowerCase().includes('next')) &&
      !linkText.includes('⬅️') && // Not a back link
      !linkText.includes('Anterior') && // Not a previous link
      !linkText.includes('🏠') && // Not a home link
      linkHref && // Has a href
      linkHref !== '#' && // Not just an anchor
      !linkHref.startsWith('http') // Not an external link
    );
    
    if (isNextLink) {
      nextLinksFound++;
      console.log('➡️ Next link found:', linkText, '-> href:', linkHref);
      
      link.addEventListener('click', function(e) {
        console.log('👆 Click detected on:', linkText);
        
        // Check if stage is not completed yet
        const completionKey = `stage_${currentStageId}_completed`;
        const isCompleted = localStorage.getItem(completionKey);
        const currentTime = timerInstance.elapsedTime;
        
        console.log('📊 Status Check:');
        console.log('  - Stage ID:', currentStageId);
        console.log('  - Is Completed:', !!isCompleted);
        console.log('  - Timer Time:', currentTime, 'ms');
        console.log('  - Should show modal:', !isCompleted && currentTime > 0);
        
        // Only prompt if stage is not completed and timer has some time
        if (!isCompleted && currentTime > 0) {
          e.preventDefault(); // Stop navigation temporarily
          console.log('✅ Showing modal...');
          
          const hours = Math.floor(timerInstance.elapsedTime / 3600000);
          const minutes = Math.floor((timerInstance.elapsedTime % 3600000) / 60000);
          const seconds = Math.floor((timerInstance.elapsedTime % 60000) / 1000);
          
          let timeText = '';
          if (hours > 0) timeText += `${hours}h `;
          if (minutes > 0) timeText += `${minutes}m `;
          timeText += `${seconds}s`;
          
          // Show custom confirmation dialog
          showSaveTimeDialog(
            currentStageName,
            timeText,
            () => {
              // User chose to save
              timerInstance.finish();
              setTimeout(() => {
                window.location.href = link.href;
              }, 1000); // Small delay to show completion message
            },
            () => {
              // User chose not to save
              window.location.href = link.href;
            }
          );
        }
        // If already completed or no time, allow normal navigation
      });
    }
  });
  
  console.log(`✅ Navigation setup complete: ${nextLinksFound} "next" links intercepted`);
  
  if (nextLinksFound === 0) {
    console.warn('⚠️ No "next" links found! The modal won\'t work.');
  }
}

// Show custom dialog for saving time
function showSaveTimeDialog(stageName, timeText, onSave, onSkip) {
  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s;
  `;
  
  // Create modal content
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 12px;
    max-width: 500px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s;
  `;
  
  modal.innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 3rem; margin-bottom: 15px;">⏱️</div>
      <h2 style="margin: 0 0 15px 0; color: #333;">¿Guardar tiempo de esta etapa?</h2>
      <p style="color: #666; margin: 10px 0; line-height: 1.6;">
        Estás a punto de pasar a la siguiente etapa.<br>
        <strong style="color: #667eea;">${stageName}</strong>
      </p>
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <div style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 5px;">Tiempo transcurrido:</div>
        <div style="font-size: 2rem; font-weight: bold; font-family: 'Courier New', monospace;">${timeText}</div>
      </div>
      <p style="color: #666; font-size: 0.9rem; margin-bottom: 25px;">
        ¿Quieres registrar este tiempo como completado?<br>
        <small style="opacity: 0.8;">Podrás ver un resumen al final del laboratorio</small>
      </p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        <button id="save-time-btn" style="
          background: #10b981;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s;
        ">✅ Sí, Guardar Tiempo</button>
        <button id="skip-time-btn" style="
          background: #6b7280;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s;
        ">⏭️ Continuar sin Guardar</button>
      </div>
    </div>
  `;
  
  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideIn {
      from { transform: translateY(-50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    #save-time-btn:hover {
      background: #059669;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    }
    #skip-time-btn:hover {
      background: #4b5563;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(107, 114, 128, 0.4);
    }
  `;
  document.head.appendChild(style);
  
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  // Add event listeners
  document.getElementById('save-time-btn').addEventListener('click', () => {
    document.body.removeChild(overlay);
    onSave();
  });
  
  document.getElementById('skip-time-btn').addEventListener('click', () => {
    document.body.removeChild(overlay);
    onSkip();
  });
  
  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
      onSkip();
    }
  });
}
