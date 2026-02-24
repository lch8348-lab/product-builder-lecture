// Theme Management
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    return savedTheme;
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    return newTheme;
};

// Add Theme Toggle Button
const createThemeToggle = () => {
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.innerHTML = document.documentElement.getAttribute('data-theme') === 'dark' ? '🌙' : '☀️';
    btn.onclick = () => {
        const next = toggleTheme();
        btn.innerHTML = next === 'dark' ? '🌙' : '☀️';
    };
    document.body.appendChild(btn);
};

class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
            }
            .card {
                background: var(--card-bg, #fff);
                backdrop-filter: blur(10px);
                padding: 3rem 2rem;
                border-radius: 24px;
                box-shadow: var(--shadow);
                text-align: center;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            h1 {
                margin: 0 0 2rem 0;
                font-size: 1.8rem;
                font-weight: 800;
                letter-spacing: -0.02em;
            }
            .numbers {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 12px;
                margin-bottom: 2.5rem;
                min-height: 60px;
            }
            .ball {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 1.2rem;
                color: #fff;
                box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                transform: scale(0);
                animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            }
            @keyframes popIn {
                to { transform: scale(1); }
            }
            .btn-generate {
                background: var(--accent-color);
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 14px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s, background-color 0.2s;
                width: 100%;
            }
            .btn-generate:hover {
                background: var(--button-hover);
                transform: translateY(-2px);
            }
            .btn-generate:active {
                transform: translateY(0);
            }
            
            /* Range Colors */
            .range-1 { background: oklch(0.75 0.15 80); }  /* Yellowish */
            .range-11 { background: oklch(0.6 0.15 240); } /* Blue */
            .range-21 { background: oklch(0.55 0.2 25); }  /* Red */
            .range-31 { background: oklch(0.6 0.05 0); }   /* Gray */
            .range-41 { background: oklch(0.65 0.15 150); } /* Green */
        </style>
        <div class="card">
            <h1>Lotto Numbers</h1>
            <div class="numbers" id="numbers-container"></div>
            <button class="btn-generate" id="generate-btn">Generate New Numbers</button>
        </div>
        `;

        this.shadowRoot.getElementById('generate-btn').addEventListener('click', () => this.generate());
        this.generate();
    }

    getRangeClass(num) {
        if (num <= 10) return 'range-1';
        if (num <= 20) return 'range-11';
        if (num <= 30) return 'range-21';
        if (num <= 40) return 'range-31';
        return 'range-41';
    }

    generate() {
        const container = this.shadowRoot.getElementById('numbers-container');
        container.innerHTML = '';
        
        const nums = new Set();
        while(nums.size < 6) {
            nums.add(Math.floor(Math.random() * 45) + 1);
        }
        
        const sorted = [...nums].sort((a, b) => a - b);
        
        sorted.forEach((num, index) => {
            const ball = document.createElement('div');
            ball.className = `ball ${this.getRangeClass(num)}`;
            ball.style.animationDelay = `${index * 0.1}s`;
            ball.textContent = num;
            container.appendChild(ball);
        });
    }
}

customElements.define('lotto-generator', LottoGenerator);

// Bootstrap
initTheme();
createThemeToggle();

class PartnershipForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
            }
            .card {
                background: var(--card-bg, #fff);
                backdrop-filter: blur(10px);
                padding: 2.5rem 2rem;
                border-radius: 24px;
                box-shadow: var(--shadow);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            h2 {
                margin: 0 0 1.5rem 0;
                font-size: 1.5rem;
                font-weight: 800;
                text-align: center;
                color: var(--text-color);
            }
            .form-group {
                margin-bottom: 1.2rem;
            }
            label {
                display: block;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
                font-weight: 600;
                opacity: 0.8;
                color: var(--text-color);
            }
            input, textarea {
                width: 100%;
                padding: 0.8rem 1rem;
                border-radius: 12px;
                border: 1px solid oklch(0.5 0 0 / 0.2);
                background: oklch(1 0 0 / 0.05);
                color: var(--text-color);
                font-family: inherit;
                font-size: 1rem;
                outline: none;
                transition: border-color 0.2s;
            }
            input:focus, textarea:focus {
                border-color: var(--accent-color);
            }
            textarea {
                resize: vertical;
                min-height: 100px;
            }
            .btn-submit {
                background: var(--accent-color);
                color: white;
                border: none;
                padding: 1rem;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s, background-color 0.2s;
                width: 100%;
                margin-top: 0.5rem;
            }
            .btn-submit:hover {
                background: var(--button-hover);
                transform: translateY(-2px);
            }
        </style>
        <div class="card">
            <h2>Partnership Inquiry</h2>
            <form action="https://formspree.io/f/xwvnwgvn" method="POST">
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" placeholder="your@email.com" required>
                </div>
                <div class="form-group">
                    <label>Message</label>
                    <textarea name="message" placeholder="How can we collaborate?" required></textarea>
                </div>
                <button type="submit" class="btn-submit">Send Message</button>
            </form>
        </div>
        `;
    }
}

customElements.define('partnership-form', PartnershipForm);

class AnimalFaceTest extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.model = null;
        this.webcam = null;
        this.isLoaded = false;
        this.URL = "https://teachablemachine.withgoogle.com/models/sRb6bbfKt/";
    }

    connectedCallback() {
        this.render();
    }

    async initAI() {
        const startBtn = this.shadowRoot.getElementById('start-btn');
        startBtn.disabled = true;
        startBtn.textContent = "Loading AI Model...";

        try {
            const modelURL = this.URL + "model.json";
            const metadataURL = this.URL + "metadata.json";

            this.model = await tmImage.load(modelURL, metadataURL);
            
            const flip = true;
            this.webcam = new tmImage.Webcam(300, 300, flip);
            await this.webcam.setup();
            await this.webcam.play();
            
            this.shadowRoot.getElementById('webcam-container').appendChild(this.webcam.canvas);
            this.isLoaded = true;
            startBtn.style.display = 'none';
            
            window.requestAnimationFrame(() => this.loop());
        } catch (error) {
            console.error("AI Error:", error);
            startBtn.textContent = "Error Loading AI. Try again.";
            startBtn.disabled = false;
        }
    }

    async loop() {
        if (this.isLoaded) {
            this.webcam.update();
            await this.predict();
            window.requestAnimationFrame(() => this.loop());
        }
    }

    async predict() {
        const prediction = await this.model.predict(this.webcam.canvas);
        const resultContainer = this.shadowRoot.getElementById('label-container');
        resultContainer.innerHTML = '';

        prediction.forEach(p => {
            const prob = (p.probability * 100).toFixed(0);
            const labelDiv = document.createElement('div');
            labelDiv.className = 'result-row';
            labelDiv.innerHTML = `
                <div class="label-info">
                    <span>${p.className}</span>
                    <span>${prob}%</span>
                </div>
                <div class="progress-bg">
                    <div class="progress-bar ${p.className === '강아지' ? 'dog' : 'cat'}" style="width: ${prob}%"></div>
                </div>
            `;
            resultContainer.appendChild(labelDiv);
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host { display: block; }
            .card {
                background: var(--card-bg, #fff);
                backdrop-filter: blur(10px);
                padding: 2.5rem 2rem;
                border-radius: 24px;
                box-shadow: var(--shadow);
                border: 1px solid rgba(255, 255, 255, 0.1);
                text-align: center;
            }
            h2 { margin: 0 0 1rem 0; font-weight: 800; font-size: 1.6rem; color: var(--text-color); }
            p { color: var(--text-color); opacity: 0.8; margin-bottom: 1.5rem; }
            #webcam-container {
                margin: 0 auto 1.5rem auto;
                width: 300px;
                height: 300px;
                background: oklch(0.5 0 0 / 0.05);
                border-radius: 20px;
                overflow: hidden;
                box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
                border: 4px solid var(--accent-color);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            #webcam-container canvas { width: 100% !important; height: 100% !important; object-fit: cover; }
            #label-container { margin-top: 1.5rem; text-align: left; }
            .result-row { margin-bottom: 1rem; }
            .label-info { display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 0.4rem; color: var(--text-color); }
            .progress-bg { background: oklch(0.5 0 0 / 0.1); height: 12px; border-radius: 10px; overflow: hidden; }
            .progress-bar { height: 100%; border-radius: 10px; transition: width 0.2s ease; }
            .progress-bar.dog { background: oklch(0.7 0.2 60); }
            .progress-bar.cat { background: oklch(0.7 0.2 200); }
            
            .btn-start {
                background: var(--accent-color);
                color: white;
                border: none;
                padding: 1rem 2.5rem;
                border-radius: 14px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }
            .btn-start:hover { transform: translateY(-2px); filter: brightness(1.1); }
            .btn-start:disabled { opacity: 0.6; cursor: not-allowed; }
        </style>
        <div class="card">
            <h2>Animal Face Test</h2>
            <p>Check if you're a Dog or a Cat face!</p>
            <div id="webcam-container"></div>
            <button class="btn-start" id="start-btn">Start AI Test</button>
            <div id="label-container"></div>
        </div>
        `;

        this.shadowRoot.getElementById('start-btn').onclick = () => this.initAI();
    }
}

customElements.define('animal-face-test', AnimalFaceTest);
