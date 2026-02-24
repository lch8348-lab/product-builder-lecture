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
