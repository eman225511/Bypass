
const input = document.getElementById('input');
const runButton = document.getElementById('run');
const consoleOutput = document.getElementById('console');

// Override console.log
const originalConsole = console.log;
console.log = function(...args) {
  originalConsole.apply(console, args);
  consoleOutput.textContent += args.join(' ') + '\n';
};

function highlightSyntax(code) {
  return code
    .replace(/\b(const|let|var|function|return|if|else|for|while)\b/g, '<span class="keyword">$1</span>')
    .replace(/(["'])(.*?)\1/g, '<span class="string">$&</span>')
    .replace(/\b(\d+)\b/g, '<span class="number">$1</span>')
    .replace(/\b(console|log|Math|Date)\b/g, '<span class="function">$1</span>')
    .replace(/\/\/.*/g, '<span class="comment">$&</span>')
    .replace(/[+\-*/%=<>!&|]+/g, '<span class="operator">$&</span>');
}

input.addEventListener('input', () => {
  const code = input.value;
  const highlighted = highlightSyntax(code);
  input.innerHTML = highlighted;
});

runButton.addEventListener('click', () => {
  consoleOutput.textContent = ''; // Clear previous output
  try {
    eval(input.value);
  } catch (error) {
    console.log('Error:', error.message);
  }
});
