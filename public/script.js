document.addEventListener("DOMContentLoaded", () => {
  const markdownInput = document.getElementById("markdownInput");
  const formattedOutput = document.getElementById("formattedOutput");
  const htmlOutput = document.getElementById("htmlOutput");
  const styledContent = document.getElementById("styledContent");

  // Toggle buttons
  const formattedBtn = document.getElementById("formattedBtn");
  const htmlBtn = document.getElementById("htmlBtn");

  // Copy buttons
  const copyFormatted = document.getElementById("copyFormatted");
  const copyUnformatted = document.getElementById("copyUnformatted");
  const copyHTML = document.getElementById("copyHTML");

  // Clear button
  const clearBtn = document.getElementById("clearBtn");

  // Event: Update output boxes based on markdown input
  markdownInput.addEventListener("input", () => {
    updateOutputs();
  });

  // Clear markdown input and outputs
  clearBtn.addEventListener("click", () => {
    markdownInput.value = "";
    updateOutputs();
  });

  // Toggle between output views
  formattedBtn.addEventListener("click", () => {
    toggleOutput("formatted");
  });
  htmlBtn.addEventListener("click", () => {
    toggleOutput("html");
  });

  // Function to update the outputs
  function updateOutputs() {
    const markdownText = markdownInput.value;
    const html = marked.parse(markdownText);

    styledContent.innerHTML = html;
    htmlOutput.value = html;
  }

  // Function to toggle between outputs
  function toggleOutput(view) {
    formattedOutput.style.display = view === "formatted" ? "block" : "none";
    htmlOutput.style.display = view === "html" ? "block" : "none";
  }

  // Copy functionality
  copyFormatted.addEventListener("click", () => {
    const htmlContent = styledContent.innerHTML; // Get the styled HTML content

    // Create a blob with the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });

    // Create a ClipboardItem with the blob
    const clipboardItem = new ClipboardItem({ 'text/html': blob });

    // Copy the ClipboardItem to the clipboard
    navigator.clipboard.write([clipboardItem]).then(() => {
      showPopover(copyFormatted, 'Copied!');
    }).catch(err => {
      console.error('Failed to copy formatted text:', err);
    });
  });

  copyUnformatted.addEventListener("click", () => {
    copyToClipboard(formattedOutput);
  });
  copyHTML.addEventListener("click", () => {
    copyToClipboard(htmlOutput);
  });

  // Function to copy content
  function copyToClipboard(element) {
    const text = element.innerText || element.value;
    navigator.clipboard.writeText(text).then(() => {
      showPopover(element, "Copied!");
    });
  }

  // Function to show a popover
  function showPopover(element, message) {
    // Create the popover element
    const popover = document.createElement("div");
    popover.innerText = message;
    popover.style.position = "absolute";
    popover.style.backgroundColor = "#3E4855";
    popover.style.color = "#fff";
    popover.style.padding = "5px 10px";
    popover.style.borderRadius = "4px";
    popover.style.top = "50%";
    popover.style.left = "50%";
    popover.style.zIndex = 1000;
    popover.style.transition = "opacity 0.3s ease-in-out";
    popover.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(popover);

    // Make the popover visible
    requestAnimationFrame(() => {
      popover.style.opacity = 1;
    });

    // Remove the popover after 1.3 seconds
    setTimeout(() => {
      popover.style.opacity = 0;
      setTimeout(() => {
        document.body.removeChild(popover);
      }, 300); // Wait for the transition to complete before removing
    }, 800);
  }
});