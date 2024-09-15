document.addEventListener('DOMContentLoaded', () => {
  const markdownInput = document.getElementById('markdownInput');
  const formattedOutput = document.getElementById('formattedOutput');
  const htmlOutput = document.getElementById('htmlOutput');
  const cssOutput = document.getElementById('cssOutput');

  // Toggle buttons
  const formattedBtn = document.getElementById('formattedBtn');
  const htmlBtn = document.getElementById('htmlBtn');
  const cssBtn = document.getElementById('cssBtn');

  // Copy buttons
  const copyFormatted = document.getElementById('copyFormatted');
  const copyHTML = document.getElementById('copyHTML');
  const copyCSS = document.getElementById('copyCSS');

  // Clear button
  const clearBtn = document.getElementById('clearBtn');

  // Event: Update output boxes based on markdown input
  markdownInput.addEventListener('input', () => {
    updateOutputs();
  });

  // Clear markdown input and outputs
  clearBtn.addEventListener('click', () => {
    markdownInput.value = '';
    updateOutputs();
  });

  // Toggle between output views
  formattedBtn.addEventListener('click', () => {
    toggleOutput('formatted');
  });
  htmlBtn.addEventListener('click', () => {
    toggleOutput('html');
  });
  cssBtn.addEventListener('click', () => {
    toggleOutput('css');
  });

  // Copy functionality
  copyFormatted.addEventListener('click', () => {
    copyToClipboard(formattedOutput);
  });
  copyHTML.addEventListener('click', () => {
    copyToClipboard(htmlOutput);
  });
  copyCSS.addEventListener('click', () => {
    copyToClipboard(cssOutput);
  });

  // Function to update the outputs
  function updateOutputs() {
    const markdownText = markdownInput.value;
    const html = marked.parse(markdownText);

    formattedOutput.innerHTML = html;
    htmlOutput.value = html;
    // Automatically update CSS in the future if needed
  }

  // Function to toggle between outputs
  function toggleOutput(view) {
    formattedOutput.style.display = view === 'formatted' ? 'block' : 'none';
    htmlOutput.style.display = view === 'html' ? 'block' : 'none';
    cssOutput.style.display = view === 'css' ? 'block' : 'none';
  }

  // Function to copy content
  function copyToClipboard(element) {
    const text = element.innerText || element.value;
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied!');
    });
  }
});