// Yabujin Core JavaScript with Audio Background

document.addEventListener('DOMContentLoaded', function() {
    // Set up audio
    let audioPlaying = false;
    let audio = null;
    
    // Create audio element
    function setupAudio() {
        audio = new Audio();
        // Use a Creative Commons/public domain music URL
        // In a real implementation, you should host this file locally
        audio.src = './assets/theropodsvault.mp3'; // Example ambient music
        audio.loop = true;
        audio.volume = 0.4;
        
        // More glitchy audio options if you want to change later:
        // https://cdn.freesound.org/previews/648/648407_13123957-lq.mp3
        // https://cdn.freesound.org/previews/417/417486_5121236-lq.mp3
    }
    
    // Toggle audio
    const toggleAudioBtn = document.getElementById('toggle-audio');
    const audioOnText = document.querySelector('.audio-on');
    const audioOffText = document.querySelector('.audio-off');
    
    toggleAudioBtn.addEventListener('click', function() {
        if (!audio) {
            setupAudio();
        }
        
        if (audioPlaying) {
            audio.pause();
            audioPlaying = false;
            audioOnText.classList.remove('active');
            audioOffText.classList.add('active');
        } else {
            audio.play().catch(e => {
                console.log('Audio autoplay blocked. User interaction required.');
            });
            audioPlaying = true;
            audioOnText.classList.add('active');
            audioOffText.classList.remove('active');
        }
    });
    
    // Initialize audio display state
    audioOffText.classList.add('active');
    
    // Glitch effects
    function applyRandomGlitch() {
        const glitchOverlay = document.getElementById('glitch-overlay');
        
        // Random glitch effect
        if (Math.random() < 0.1) {
            document.body.style.filter = `hue-rotate(${Math.random() * 360}deg) saturate(${1 + Math.random()}))`;
            
            setTimeout(() => {
                document.body.style.filter = '';
            }, 100);
        }
        
        // Random displacement of elements
        if (Math.random() < 0.05) {
            const elements = document.querySelectorAll('.glitch-img, .cyber-text');
            elements.forEach(el => {
                el.style.transform = `translateX(${Math.random() * 5 - 2.5}px) translateY(${Math.random() * 5 - 2.5}px)`;
                
                setTimeout(() => {
                    el.style.transform = '';
                }, 150);
            });
        }
    }
    
    // Apply random glitch effects periodically
    setInterval(applyRandomGlitch, 3000);
    
    // CRT scan line effect
    function createScanLine() {
        const scanLine = document.createElement('div');
        scanLine.style.position = 'fixed';
        scanLine.style.left = '0';
        scanLine.style.width = '100%';
        scanLine.style.height = '2px';
        scanLine.style.background = 'rgba(255, 255, 255, 0.1)';
        scanLine.style.zIndex = '99';
        scanLine.style.pointerEvents = 'none';
        
        document.body.appendChild(scanLine);
        
        let position = -2;
        
        function animateScanLine() {
            position += 2;
            if (position > window.innerHeight) {
                position = -2;
            }
            
            scanLine.style.top = position + 'px';
            requestAnimationFrame(animateScanLine);
        }
        
        animateScanLine();
    }
    
    // Create scan line effect
    createScanLine();
    
    // Game functionality placeholders
    const actionBtns = document.querySelectorAll('.action-btn');
    const rulesBtn = document.querySelector('.rules-btn');
    const navBtns = document.querySelectorAll('.nav-btn');
    const cellBtns = document.querySelectorAll('.cell-btn');
    
    // Add click effects to buttons
    function addButtonEffects(btnElements) {
        btnElements.forEach(btn => {
            btn.addEventListener('click', function() {
                // Visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Sound effect for button press
                playGlitchSound();
                
                // Add glitch flash
                flashGlitch();
            });
        });
    }
    
    // Play glitch sound
    function playGlitchSound() {
        const clickSound = new Audio();
        // Use short glitch sound (base64 encoded)
        clickSound.src = 'data:audio/wav;base64,UklGRpYFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXIFAACBhYqFbF5aZH2Vqri2p5N7Z1tYXWp6jJynn5eOg3NiTzQcBvj/Jl2HlJCFdWJVVFtmeIeNjoyLiYJ3ZlRGPTk8QEVETEpFPDInGAr66efj4uHf3dvY1tTS0M3JxcC8uri0r6iknpyZmJaSjImFf3x5d3V0cnFwbm1sa2pqaWhoaGlqbG1vcXJ0dnh6fH6Bg4aJi42QkpWYmp2foaOmqKqsrrCysrS1tre4uLm5urq6urq6ubm4uLe2tbSzsrCvrauqqKalpKKgn52bmJaUkY+Mi4mGhIKAf317enh2dHNxcG5ta2tqaWloaGhoaGlpamtsbW5wcnN1d3l7fX+Cg4aIi42PkZSWmJqdnqChoqSlp6ipqqusra6ur7CwsbGxsrKysrKysrGxsbCwsK+urq2trKuqqainpqWko6GgnpybmZiWlJKQjoyKiIaEgoB+fHt5d3Z0c3Fwb25tbGtqamlpaWlpamprbGxtbm9xc3R2eHp8foGChIaJi42PkZOVl5mcnqChoqSlpqeoqaqrq6ysra2urq6urq6urq6urq2traysq6uqqainpqWko6KhoJ6dnJqYl5WTkZCOjImHhYOBgH59e3p4d3Z0c3JxcG9ubW1sbGxsbGxsbG1tbm9wcXJzdXZ4enx+gIKEhoiKjI6QkpSWmJqcnp+goqOkpaanqKmpqaqqqqqrq6urq6urq6uqqqqqqqmpqKinpqWko6OioaCfnp2cm5mYlpWTkZCOjIuJh4WEgoF/fXx6eXh3dnV0c3Jxcm7Ram7tbXBvcG9wcHFxcXJzdHV2d3h6e31+gIGDhIaIiYuNj5GTlJaXmZqcnZ6foKGio6SlpqampqenqKioqKioqKioqKinp6enp6ampaWko6OioaGgoJ+enZybmpmYl5WUk5GQj42Mi4mIhoWDgoF/fn18e3p5eHd2dnV1dHR0dHR0dHR1dXV2dnd4eXp7fH1+gIGCg4WGiImLjI6PkZKUlZaYmZqbnJ2en6ChoqOjo6SkpaWlpaWmpqampaWlpaWlpKSko6OjoqKhoaCgnp6dnJybmpmYl5aVlJOSkI+OjYuKiYeGhYSCgYB/fn18e3p6eXh3d3Z2dXV1dXV1dXV1dnZ2d3d4eXp7fH1+f4CBgoSFhoeJiouNjpCRkpSVlpeYmZqbnJ2dnp+foKChoaKioqOjo6OjpKSkpKSko6Ojo6OioqKhoaGgoJ+fnp6dnJybmpmYmJeWlZSUk5KRkI+OjYyLioqJiIeGhYSEg4KBgIB/fn59fHx7e3p6enl5eXl5eXl5eXl5enp6e3t8fH1+fn+AgYGCg4SFhoeIiYqLjI2Oj5CRkpOUlJWWl5iYmZqam5ycnZ2enp+fn6CgoKChoaGhoaGhoaGhoKCgn5+fn5+enp6dnZ2cnJubmpmZmJiXl5aWlZSUk5KSkZCPj46NjIyLioqJiIiHhoaFhISDg4KCgYGAgIB/f39/fn5+fn5+fn5+fn5/f3+AgICBgYGCgoODhISFhYaGh4iIiYqKi4yMjY6Oj5CQkZGSk5OUlJWVlpaXl5eYmJiZmZmZmZqampqampqamZmZmZmZmJiYmJeXlpaWlZWUlJSTk5KSkZGQkI+Pjo6NjYyMi4uKioqJiYiIh4eHhoaFhYWEhIODg4OCgoKCgYGBgYGBgYGBgYGBgYGCgoKCg4ODhISEhYWGhoaHiIiJiYqKi4uMjI2Njo6Pj5CQkZGSk5KXbA==';
        clickSound.volume = 0.2;
        clickSound.play();
    }
    
    // Flash glitch effect
    function flashGlitch() {
        const glitchOverlay = document.getElementById('glitch-overlay');
        glitchOverlay.style.opacity = '0.3';
        glitchOverlay.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
        
        setTimeout(() => {
            glitchOverlay.style.opacity = '0';
        }, 100);
    }
    
    // Apply button effects
    addButtonEffects(actionBtns);
    addButtonEffects([rulesBtn]);
    addButtonEffects(navBtns);
    addButtonEffects(cellBtns);
    
    // Popup handling
    const popup = document.querySelector('.popup');
    const vsCpuBtn = document.querySelector('.action-btn:not(.alt)');
    const vsPlayerBtn = document.querySelector('.action-btn.alt');
    
    vsCpuBtn.addEventListener('click', () => {
        popup.style.animation = 'glitch-out 0.5s forwards';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);
    });
    
    vsPlayerBtn.addEventListener('click', () => {
        popup.style.animation = 'glitch-out 0.5s forwards';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);
    });
    
    // Add glitch-out animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch-out {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            20% { transform: translate(-52%, -48%) scale(1.05) skewX(5deg); opacity: 0.9; filter: hue-rotate(90deg); }
            40% { transform: translate(-48%, -52%) scale(0.95) skewX(-10deg); opacity: 0.8; filter: hue-rotate(180deg); }
            60% { transform: translate(-50%, -50%) scale(1.1) skewY(5deg); opacity: 0.6; filter: hue-rotate(270deg); }
            80% { transform: translate(-50%, -50%) scale(0.9) skewY(-5deg); opacity: 0.3; filter: hue-rotate(360deg); }
            100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Timer functionality (placeholder)
    const timerElement = document.querySelector('.time');
    let seconds = 14;
    
    function updateTimer() {
        seconds--;
        if (seconds < 0) {
            seconds = 14;
        }
        timerElement.textContent = `${seconds}s`;
    }
    
    setInterval(updateTimer, 1000);
    
    // Dynamic RGB border effect
    function createRGBBorder() {
        const mainElement = document.querySelector('main');
        
        function updateBorder() {
            const hue = (Date.now() / 50) % 360;
            mainElement.style.boxShadow = `0 0 15px hsl(${hue}, 100%, 50%), 
                                          inset 0 0 15px hsl(${(hue + 120) % 360}, 100%, 50%)`;
        }
        
        setInterval(updateBorder, 50);
    }
    
    createRGBBorder();
    
    // Create matrix-style falling characters background (optional enhancement)
    function createMatrixEffect() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        canvas.style.pointerEvents = 'none';
        
        document.body.appendChild(canvas);
        
        // Characters to display
        const chars = '01︎アカサタナハマヤラワイキシチニヒミリヰウクスツヌフムユルグズブヅプエケセテネヘメレヱオコソト︎';
        const charSize = 12;
        const columns = canvas.width / charSize;
        
        // Position of the characters
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * canvas.height / charSize);
        }
        
        // Draw the characters
        function draw() {
            // Black background with alpha
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Green text
            ctx.fillStyle = '#0F0';
            ctx.font = `${charSize}px monospace`;
            
            // Draw characters
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillStyle = `hsl(${i % 360}, 100%, 50%)`;
                ctx.fillText(text, i * charSize, drops[i] * charSize);
                
                // Reset if it has reached the bottom
                if (drops[i] * charSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Move it down
                drops[i]++;
            }
        }
        
        setInterval(draw, 80);
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Uncomment to add matrix effect
    // createMatrixEffect();
    
    // Extra VHS glitch effects
    function addVHSEffect() {
        const intervalId = setInterval(() => {
            if (Math.random() < 0.05) {
                document.body.style.transform = `translateY(${Math.random() * 5 - 2.5}px)`;
                setTimeout(() => {
                    document.body.style.transform = '';
                }, 50);
            }
        }, 2000);
    }
    
    addVHSEffect();
});

