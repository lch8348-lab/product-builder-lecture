class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'lotto-generator');

        const heading = document.createElement('h1');
        heading.textContent = 'Lotto Number Generator';

        const numbersContainer = document.createElement('div');
        numbersContainer.setAttribute('class', 'numbers');

        const button = document.createElement('button');
        button.textContent = 'Generate Numbers';
        button.addEventListener('click', () => this.generateNumbers(numbersContainer));

        const style = document.createElement('style');
        style.textContent = `
            .lotto-generator {
                padding: 2rem;
                border: 1px solid #ccc;
                border-radius: 8px;
                background-color: #fff;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .numbers {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin: 2rem 0;
            }
            .number {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #eee;
                font-size: 1.5rem;
                font-weight: bold;
            }
            button {
                padding: 0.8rem 1.5rem;
                font-size: 1rem;
                border: none;
                border-radius: 5px;
                background-color: #007bff;
                color: #fff;
                cursor: pointer;
            }
            button:hover {
                background-color: #0056b3;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(heading);
        wrapper.appendChild(numbersContainer);
        wrapper.appendChild(button);

        this.generateNumbers(numbersContainer);
    }

    generateNumbers(container) {
        container.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        for (const number of sortedNumbers) {
            const numberElement = document.createElement('div');
            numberElement.setAttribute('class', 'number');
            numberElement.textContent = number;
            container.appendChild(numberElement);
        }
    }
}

customElements.define('lotto-generator', LottoGenerator);