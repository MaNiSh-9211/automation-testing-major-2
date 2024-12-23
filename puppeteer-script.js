
// const puppeteer = require('puppeteer');

// let browser, page;
// let interactions = [];
// let currentURL = '';

// // Utility function to construct robust CSS selectors
// function constructSelector(element) {
//   let selector = element.tagName.toLowerCase();

//   if (element.id) {
//     // Use ID if it exists, as it is usually unique
//     selector += `#${element.id}`;
//   } else if (element.className) {
//     // Use class names if available
//     selector += `.${element.className.split(' ').filter(Boolean).join('.')}`;
//   } else if (element.getAttribute('aria-label')) {
//     // Use aria-label for better semantics
//     selector += `[aria-label="${element.getAttribute('aria-label')}"]`;
//   } else if (element.name) {
//     // Use name attribute if it exists
//     selector += `[name="${element.name}"]`;
//   } else if (element.placeholder) {
//     // Use placeholder as a fallback
//     selector += `[placeholder="${element.placeholder}"]`;
//   }

//   // Traverse up the DOM to create a unique path
//   let parent = element.parentElement;
//   while (parent && parent.tagName.toLowerCase() !== 'html') {
//     const siblingIndex = Array.from(parent.children).indexOf(element) + 1;
//     const parentSelector = parent.tagName.toLowerCase() +
//       (parent.id ? `#${parent.id}` : '') +
//       (parent.className ? `.${parent.className.split(' ').filter(Boolean).join('.')}` : '');

//     selector = `${parentSelector} > ${selector}:nth-child(${siblingIndex})`;
//     element = parent;
//     parent = parent.parentElement;
//   }

//   return selector;
// }

// // Start recording interactions
// async function startRecording() {
//   try {
//     browser = await puppeteer.launch({ headless: false });
//     page = await browser.newPage();
//     interactions = [];

//     // Track the initial URL
//     page.on('framenavigated', (frame) => {
//       if (frame === page.mainFrame()) {
//         currentURL = frame.url();
//         interactions.push({ action: 'navigate', url: currentURL });
//       }
//     });

//     // Record clicks
//     await page.exposeFunction('recordClick', (selector) => {
//       interactions.push({ action: 'click', selector });
//     });

//     // Record typing
//     await page.exposeFunction('recordType', (selector, text) => {
//       interactions.push({ action: 'type', selector, text });
//     });

//     // Record scrolling
//     await page.exposeFunction('recordScroll', (x, y) => {
//       interactions.push({ action: 'scroll', x, y });
//     });

//     // Inject event listeners into the page
//     await page.evaluateOnNewDocument(() => {
//       document.addEventListener('click', (e) => {
//         const selector = window.constructSelector(e.target);
//         window.recordClick(selector);
//       });

//       document.addEventListener('input', (e) => {
//         const selector = window.constructSelector(e.target);
//         window.recordType(selector, e.target.value);
//       });

//       window.addEventListener('scroll', () => {
//         window.recordScroll(window.scrollX, window.scrollY);
//       });

//       window.constructSelector = (element) => {
//         let selector = element.tagName.toLowerCase();

//         if (element.id) {
//           selector += `#${element.id}`;
//         } else if (element.className) {
//           selector += `.${element.className.split(' ').filter(Boolean).join('.')}`;
//         } else if (element.getAttribute('aria-label')) {
//           selector += `[aria-label="${element.getAttribute('aria-label')}"]`;
//         } else if (element.name) {
//           selector += `[name="${element.name}"]`;
//         } else if (element.placeholder) {
//           selector += `[placeholder="${element.placeholder}"]`;
//         }

//         let parent = element.parentElement;
//         while (parent && parent.tagName.toLowerCase() !== 'html') {
//           const siblingIndex = Array.from(parent.children).indexOf(element) + 1;
//           const parentSelector = parent.tagName.toLowerCase() +
//             (parent.id ? `#${parent.id}` : '') +
//             (parent.className ? `.${parent.className.split(' ').filter(Boolean).join('.')}` : '');

//           selector = `${parentSelector} > ${selector}:nth-child(${siblingIndex})`;
//           element = parent;
//           parent = parent.parentElement;
//         }

//         return selector;
//       };
//     });

//     return 'Recording started';
//   } catch (error) {
//     console.error('Error starting recording:', error);
//     throw error;
//   }
// }

// // Stop recording and generate a Puppeteer script
// async function stopRecording() {
//   try {
//     if (browser) {
//       await browser.close();
//     }

//     // Generate Puppeteer script
//     const script = `
// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   // Navigate to the URL
//   await page.goto('${currentURL}');

//   // Replay recorded interactions
//   ${interactions
//     .map((interaction) => {
//       switch (interaction.action) {
//         case 'navigate':
//           return `// Navigated to ${interaction.url}`;
//         case 'click':
//           return `await page.waitForSelector('${interaction.selector}', { visible: true });\n  await page.click('${interaction.selector}');`;
//         case 'type':
//           return `await page.waitForSelector('${interaction.selector}', { visible: true });\n  await page.type('${interaction.selector}', '${interaction.text}');`;
//         case 'scroll':
//           return `await page.evaluate(() => { window.scrollTo(${interaction.x}, ${interaction.y}); });`;
//         default:
//           return '';
//       }
//     })
//     .join('\n  ')}

//   await browser.close();
// })();

//     `;

//     return script.trim();
//   } catch (error) {
//     console.error('Error stopping recording:', error);
//     throw error;
//   }
// }

// module.exports = { startRecording, stopRecording };









// const puppeteer = require('puppeteer');

// let browser, page;
// let interactions = [];

// const startRecording = async () => {
//   try {
//     browser = await puppeteer.launch({ headless: false });
//     page = await browser.newPage();
//     interactions = [];

//     // Track navigation
//     page.on('framenavigated', (frame) => {
//       if (frame === page.mainFrame()) {
//         interactions.push({ action: 'navigate', url: frame.url() });
//       }
//     });

//     // Expose functions for various interactions
//     await page.exposeFunction('recordClick', (selector) => {
//       interactions.push({ action: 'click', selector });
//     });
//     await page.exposeFunction('recordType', (selector, text) => {
//       interactions.push({ action: 'type', selector, text });
//     });
//     await page.exposeFunction('recordScroll', (x, y) => {
//       interactions.push({ action: 'scroll', x, y });
//     });
//     await page.exposeFunction('recordHover', (selector) => {
//       interactions.push({ action: 'hover', selector });
//     });
//     await page.exposeFunction('recordFileUpload', (selector, filePath) => {
//       interactions.push({ action: 'upload', selector, filePath });
//     });
//     await page.exposeFunction('recordCheck', (selector) => {
//       interactions.push({ action: 'check', selector });
//     });
//     await page.exposeFunction('recordUncheck', (selector) => {
//       interactions.push({ action: 'uncheck', selector });
//     });
//     await page.exposeFunction('recordSelect', (selector, value) => {
//       interactions.push({ action: 'select', selector, value });
//     });

//     // Inject listeners into the page
//     await page.evaluateOnNewDocument(() => {
//       const constructSelector = (element) => {
//         let selector = element.tagName.toLowerCase();
//         if (element.id) selector += `#${element.id}`;
//         if (element.className) selector += `.${element.className.split(' ').join('.')}`;
//         return selector;
//       };

//       document.addEventListener('click', (e) => {
//         const selector = constructSelector(e.target);
//         window.recordClick(selector);
//       });

//       document.addEventListener('input', (e) => {
//         const selector = constructSelector(e.target);
//         if (e.target.type === 'file') {
//           window.recordFileUpload(selector, e.target.files[0]?.name);
//         } else {
//           window.recordType(selector, e.target.value);
//         }
//       });

//       document.addEventListener('scroll', () => {
//         window.recordScroll(window.scrollX, window.scrollY);
//       });

//       document.addEventListener('mouseover', (e) => {
//         const selector = constructSelector(e.target);
//         window.recordHover(selector);
//       });

//       document.addEventListener('change', (e) => {
//         const selector = constructSelector(e.target);
//         if (e.target.type === 'checkbox' || e.target.type === 'radio') {
//           if (e.target.checked) {
//             window.recordCheck(selector);
//           } else {
//             window.recordUncheck(selector);
//           }
//         } else if (e.target.tagName === 'SELECT') {
//           window.recordSelect(selector, e.target.value);
//         }
//       });
//     });

//     return 'Recording started';
//   } catch (error) {
//     console.error('Error starting recording:', error);
//     throw error;
//   }
// };

// const stopRecording = async () => {
//   try {
//     if (browser) {
//       await browser.close();
//     }

//     const script = `
// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   // Replay recorded interactions
//   ${interactions
//     .map((interaction) => {
//       switch (interaction.action) {
//         case 'navigate':
//           return `await page.goto('${interaction.url}');`;
//         case 'click':
//           return `await page.waitForSelector('${interaction.selector}', { visible: true });\nawait page.click('${interaction.selector}');`;
//         case 'type':
//           return `await page.waitForSelector('${interaction.selector}', { visible: true });\nawait page.type('${interaction.selector}', '${interaction.text}');`;
//         case 'scroll':
//           return `await page.evaluate(() => { window.scrollTo(${interaction.x}, ${interaction.y}); });`;
//         case 'hover':
//           return `await page.hover('${interaction.selector}');`;
//         case 'upload':
//           return `const inputUploadHandle = await page.$('${interaction.selector}');\nawait inputUploadHandle.uploadFile('${interaction.filePath}');`;
//         case 'check':
//           return `await page.waitForSelector('${interaction.selector}', { visible: true });\nawait page.click('${interaction.selector}'); // Check`;
//         case 'uncheck':
//           return `await page.waitForSelector('${interaction.selector}', { visible: true });\nawait page.click('${interaction.selector}'); // Uncheck`;
//         case 'select':
//           return `await page.select('${interaction.selector}', '${interaction.value}');`;
//         default:
//           return '';
//       }
//     })
//     .join('\n  ')}

//   await browser.close();
// })();
//     `;

//     return script.trim();
//   } catch (error) {
//     console.error('Error stopping recording:', error);
//     throw error;
//   }
// };

// module.exports = { startRecording, stopRecording };




// const puppeteer = require("puppeteer");
// let browser, page, client;

// let interactions = [];
// let currentURL = "";

// // Utility function to construct robust CSS selectors
// function constructSelector(element) {
//   let selector = element.tagName.toLowerCase();

//   if (element.id) {
//     selector += `#${element.id}`;
//   } else if (element.className) {
//     selector += `.${element.className.split(" ").filter(Boolean).join(".")}`;
//   } else if (element.getAttribute("aria-label")) {
//     selector += `[aria-label="${element.getAttribute("aria-label")}"]`;
//   } else if (element.name) {
//     selector += `[name="${element.name}"]`;
//   } else if (element.placeholder) {
//     selector += `[placeholder="${element.placeholder}"]`;
//   }

//   let parent = element.parentElement;
//   while (parent && parent.tagName.toLowerCase() !== "html") {
//     const parentSelector =
//       parent.tagName.toLowerCase() +
//       (parent.id ? `#${parent.id}` : "") +
//       (parent.className
//         ? `.${parent.className.split(" ").filter(Boolean).join(".")}`
//         : "");

//     selector = `${parentSelector} > ${selector}`;
//     parent = parent.parentElement;
//   }

//   return selector;
// }

// async function startRecording() {
//   browser = await puppeteer.launch({ headless: false });
//   page = await browser.newPage();
//   client = await page.target().createCDPSession();

//   interactions = [];

//   // Track URL navigation
//   page.on("framenavigated", (frame) => {
//     if (frame === page.mainFrame()) {
//       currentURL = frame.url();
//       interactions.push({ action: "navigate", url: currentURL });
//     }
//   });

//   // Enable events in CDP
//   await client.send("Runtime.enable");
//   await client.send("DOM.enable");
//   await client.send("Page.enable");

//   // Listen to DOM events
//   await page.exposeFunction("recordClick", (selector) => {
//     interactions.push({ action: "click", selector });
//   });

//   await page.exposeFunction("recordType", (selector, text) => {
//     interactions.push({ action: "type", selector, text });
//   });

//   await page.exposeFunction("recordScroll", (x, y) => {
//     interactions.push({ action: "scroll", x, y });
//   });

//   // Inject event listeners into the page
//   await page.evaluateOnNewDocument(() => {
//     document.addEventListener("click", (e) => {
//       const selector = constructSelector(e.target);
//       window.recordClick(selector);
//     });

//     document.addEventListener("input", (e) => {
//       const selector = constructSelector(e.target);
//       window.recordType(selector, e.target.value);
//     });

//     window.addEventListener("scroll", () => {
//       window.recordScroll(window.scrollX, window.scrollY);
//     });

//     window.constructSelector = (element) => {
//       let selector = element.tagName.toLowerCase();

//       if (element.id) {
//         selector += `#${element.id}`;
//       } else if (element.className) {
//         selector += `.${element.className.split(" ").filter(Boolean).join(".")}`;
//       } else if (element.getAttribute("aria-label")) {
//         selector += `[aria-label="${element.getAttribute("aria-label")}"]`;
//       } else if (element.name) {
//         selector += `[name="${element.name}"]`;
//       } else if (element.placeholder) {
//         selector += `[placeholder="${element.placeholder}"]`;
//       }

//       let parent = element.parentElement;
//       while (parent && parent.tagName.toLowerCase() !== "html") {
//         const parentSelector =
//           parent.tagName.toLowerCase() +
//           (parent.id ? `#${parent.id}` : "") +
//           (parent.className
//             ? `.${parent.className.split(" ").filter(Boolean).join(".")}`
//             : "");

//         selector = `${parentSelector} > ${selector}`;
//         parent = parent.parentElement;
//       }

//       return selector;
//     };
//   });

//   console.log("Recording started...");
// }

// async function stopRecording() {
//   if (browser) await browser.close();

//   const script = `
// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   // Sequentially execute recorded interactions
//   ${interactions
//     .map((interaction) => {
//       switch (interaction.action) {
//         case "navigate":
//           return `await page.goto('${interaction.url}', { waitUntil: 'domcontentloaded' });`;
//         case "click":
//           return `await page.waitForSelector('${interaction.selector}', { visible: true });
//   await page.click('${interaction.selector}');`;
//         case "type":
//           return `await page.waitForSelector('${interaction.selector}', { visible: true });
//   await page.type('${interaction.selector}', '${interaction.text}');`;
//         case "scroll":
//           return `await page.evaluate(() => { window.scrollTo(${interaction.x}, ${interaction.y}); });`;
//         default:
//           return "";
//       }
//     })
//     .join("\n  ")}

//   await browser.close();
// })();
// `;

//   console.log("Recording stopped...");
//   return script.trim();
// }

// module.exports = { startRecording, stopRecording };










// const puppeteer = require('puppeteer');

// let browser, page;
// let interactions = [];
// let currentURL = '';

// // Utility function to construct robust selectors
// function constructSelector(element) {
//   let selector = element.tagName.toLowerCase();

//   if (element.id) {
//     selector += `#${element.id}`;
//   } else if (element.className) {
//     selector += `.${element.className.split(' ').filter(Boolean).join('.')}`;
//   } else if (element.getAttribute('data-testid')) {
//     selector += `[data-testid="${element.getAttribute('data-testid')}"]`;
//   } else if (element.getAttribute('aria-label')) {
//     selector += `[aria-label="${element.getAttribute('aria-label')}"]`;
//   } else if (element.name) {
//     selector += `[name="${element.name}"]`;
//   } else if (element.placeholder) {
//     selector += `[placeholder="${element.placeholder}"]`;
//   } else if (element.innerText) {
//     selector += `:contains("${element.innerText.trim()}")`;
//   }

//   return selector;
// }

// // Utility function to construct XPath as a fallback
// function constructXPath(element) {
//   const idx = (sib, name) =>
//     sib
//       ? 1 + idx(
//           sib.previousElementSibling,
//           name === sib.localName ? name : '*'
//         )
//       : 1;

//   const segs = (el) =>
//     !el || el.nodeType !== 1
//       ? ['']
//       : el.id
//       ? [`id("${el.id}")`]
//       : [
//           ...segs(el.parentNode),
//           `${el.localName.toLowerCase()}[${idx(el, el.localName)}]`,
//         ];

//   return segs(element).join('/');
// }

// // Start recording interactions
// async function startRecording() {
//   try {
//     browser = await puppeteer.launch({ headless: false });
//     page = await browser.newPage();
//     interactions = [];

//     page.on('framenavigated', (frame) => {
//       if (frame === page.mainFrame()) {
//         currentURL = frame.url();
//         interactions.push({ action: 'navigate', url: currentURL });
//       }
//     });

//     await page.exposeFunction('recordInteraction', (action, selector, details) => {
//       interactions.push({ action, selector, ...details });
//     });

//     await page.evaluateOnNewDocument(() => {
//       document.addEventListener('click', (e) => {
//         const selector = constructSelector(e.target);
//         const xpath = constructXPath(e.target);
//         window.recordInteraction('click', selector || xpath, {});
//       });

//       document.addEventListener('input', (e) => {
//         const selector = constructSelector(e.target);
//         const xpath = constructXPath(e.target);
//         window.recordInteraction('type', selector || xpath, { text: e.target.value });
//       });

//       window.addEventListener('scroll', () => {
//         window.recordInteraction('scroll', '', {
//           x: window.scrollX,
//           y: window.scrollY,
//         });
//       });

//       function constructSelector(element) {
//         let selector = element.tagName.toLowerCase();

//         if (element.id) {
//           selector += `#${element.id}`;
//         } else if (element.className) {
//           selector += `.${element.className.split(' ').filter(Boolean).join('.')}`;
//         } else if (element.getAttribute('data-testid')) {
//           selector += `[data-testid="${element.getAttribute('data-testid')}"]`;
//         } else if (element.getAttribute('aria-label')) {
//           selector += `[aria-label="${element.getAttribute('aria-label')}"]`;
//         } else if (element.name) {
//           selector += `[name="${element.name}"]`;
//         } else if (element.placeholder) {
//           selector += `[placeholder="${element.placeholder}"]`;
//         }

//         return selector;
//       }

//       function constructXPath(element) {
//         const idx = (sib, name) =>
//           sib ? 1 + idx(sib.previousElementSibling, name === sib.localName ? name : '*') : 1;

//         const segs = (el) =>
//           !el || el.nodeType !== 1
//             ? ['']
//             : el.id
//             ? [`id("${el.id}")`]
//             : [
//                 ...segs(el.parentNode),
//                 `${el.localName.toLowerCase()}[${idx(el, el.localName)}]`,
//               ];

//         return segs(element).join('/');
//       }
//     });

//     console.log('Recording started');
//   } catch (error) {
//     console.error('Error starting recording:', error);
//   }
// }

// // Stop recording and generate a Puppeteer script
// async function stopRecording() {
//   try {
//     if (browser) {
//       await browser.close();
//     }

//     const script = `
// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   // Navigate to the URL
//   await page.goto('${currentURL}');

//   // Replay recorded interactions
//   ${interactions
//     .map((interaction) => {
//       switch (interaction.action) {
//         case 'navigate':
//           return `// Navigated to ${interaction.url}`;
//         case 'click':
//           return `await page.waitForSelector('${interaction.selector}', { visible: true });\n  await page.click('${interaction.selector}');`;
//         case 'type':
//           return `await page.waitForSelector('${interaction.selector}', { visible: true });\n  await page.type('${interaction.selector}', '${interaction.text}');`;
//         case 'scroll':
//           return `await page.evaluate(() => { window.scrollTo(${interaction.x}, ${interaction.y}); });`;
//         default:
//           return '';
//       }
//     })
//     .join('\n  ')}

//   await browser.close();
// })();
//     `;

//     console.log('Generated Script:\n', script.trim());
//     return script.trim();
//   } catch (error) {
//     console.error('Error stopping recording:', error);
//   }
// }

// module.exports = { startRecording, stopRecording };











// const puppeteer = require('puppeteer');

// let browser, page;
// let interactions = [];
// let currentURL = '';

// // Utility to construct robust selectors
// function constructSelector(element) {
//   let selector = element.tagName.toLowerCase();

//   if (element.id) {
//     selector += `#${element.id}`;
//   } else if (element.className) {
//     selector += `.${element.className.split(' ').filter(Boolean).join('.')}`;
//   } else if (element.getAttribute('data-testid')) {
//     selector += `[data-testid="${element.getAttribute('data-testid')}"]`;
//   } else if (element.getAttribute('aria-label')) {
//     selector += `[aria-label="${element.getAttribute('aria-label')}"]`;
//   } else if (element.name) {
//     selector += `[name="${element.name}"]`;
//   } else if (element.placeholder) {
//     selector += `[placeholder="${element.placeholder}"]`;
//   }

//   return selector;
// }

// // Utility to construct XPath as fallback
// function constructXPath(element) {
//   const idx = (sib, name) =>
//     sib
//       ? 1 + idx(
//           sib.previousElementSibling,
//           name === sib.localName ? name : '*'
//         )
//       : 1;

//   const segs = (el) =>
//     !el || el.nodeType !== 1
//       ? ['']
//       : el.id
//       ? [`id("${el.id}")`]
//       : [
//           ...segs(el.parentNode),
//           `${el.localName.toLowerCase()}[${idx(el, el.localName)}]`,
//         ];

//   return segs(element).join('/');
// }

// // Start recording interactions
// async function startRecording() {
//   try {
//     browser = await puppeteer.launch({ headless: false });
//     page = await browser.newPage();
//     interactions = [];

//     page.on('framenavigated', (frame) => {
//       if (frame === page.mainFrame()) {
//         currentURL = frame.url();
//         interactions.push({ action: 'navigate', url: currentURL });
//       }
//     });

//     await page.exposeFunction('recordInteraction', (action, selector, details) => {
//       interactions.push({ action, selector, ...details });
//     });

//     await page.evaluateOnNewDocument(() => {
//       document.addEventListener('click', (e) => {
//         const selector = constructSelector(e.target);
//         const xpath = constructXPath(e.target);
//         window.recordInteraction('click', selector || xpath, {});
//       });

//       document.addEventListener('input', (e) => {
//         const selector = constructSelector(e.target);
//         const xpath = constructXPath(e.target);
//         window.recordInteraction('type', selector || xpath, { text: e.target.value });
//       });

//       window.addEventListener('scroll', () => {
//         window.recordInteraction('scroll', '', {
//           x: window.scrollX,
//           y: window.scrollY,
//         });
//       });

//       function constructSelector(element) {
//         let selector = element.tagName.toLowerCase();

//         if (element.id) {
//           selector += `#${element.id}`;
//         } else if (element.className) {
//           selector += `.${element.className.split(' ').filter(Boolean).join('.')}`;
//         } else if (element.getAttribute('data-testid')) {
//           selector += `[data-testid="${element.getAttribute('data-testid')}"]`;
//         } else if (element.getAttribute('aria-label')) {
//           selector += `[aria-label="${element.getAttribute('aria-label')}"]`;
//         } else if (element.name) {
//           selector += `[name="${element.name}"]`;
//         } else if (element.placeholder) {
//           selector += `[placeholder="${element.placeholder}"]`;
//         }

//         return selector;
//       }

//       function constructXPath(element) {
//         const idx = (sib, name) =>
//           sib ? 1 + idx(sib.previousElementSibling, name === sib.localName ? name : '*') : 1;

//         const segs = (el) =>
//           !el || el.nodeType !== 1
//             ? ['']
//             : el.id
//             ? [`id("${el.id}")`]
//             : [
//                 ...segs(el.parentNode),
//                 `${el.localName.toLowerCase()}[${idx(el, el.localName)}]`,
//               ];

//         return segs(element).join('/');
//       }
//     });

//     console.log('Recording started');
//   } catch (error) {
//     console.error('Error starting recording:', error);
//   }
// }

// // Stop recording and generate a Puppeteer script
// async function stopRecording() {
//   try {
//     if (browser) {
//       await browser.close();
//     }

//     const script = `
// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   // Navigate to the URL
//   await page.goto('${currentURL}');

//   // Replay recorded interactions
  
//   ${interactions
//     .map((interaction) => {
//       switch (interaction.action) {
//         case 'navigate':
//           return `// Navigated to ${interaction.url}`;
//         case 'click':
//           return `
// await page.waitForSelector('${interaction.selector}', { visible: true }).catch(() => {
//   console.log('Popup or element not found, skipping...');
// });
// await page.click('${interaction.selector}').catch(() => {
//   console.log('Failed to click, skipping...');
// });`;
//         case 'type':
//           return `
// await page.waitForSelector('${interaction.selector}', { visible: true }).catch(() => {
//   console.log('Input element not found, skipping...');
// });
// await page.type('${interaction.selector}', '${interaction.text}').catch(() => {
//   console.log('Failed to type, skipping...');
// });`;
//         case 'scroll':
//           return `
// await page.evaluate(() => {
//   window.scrollTo(${interaction.x}, ${interaction.y});
// });`;
//         default:
//           return '';
//       }
//     })
//     .join('\n  ')}

//   await browser.close();
// })();
//     `;

//     console.log('Generated Script:\n', script.trim());
//     return script.trim();
//   } catch (error) {
//     console.error('Error stopping recording:', error);
//   }
// }

// module.exports = { startRecording, stopRecording };





const puppeteer = require('puppeteer');

let browser, page;
let interactions = [];
let currentURL = '';

// Utility to pause execution
async function pause(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

// Start recording interactions
async function startRecording() {
  try {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    interactions = [];

    page.on('framenavigated', (frame) => {
      if (frame === page.mainFrame()) {
        currentURL = frame.url();
        interactions.push({ action: 'navigate', url: currentURL, time: Date.now() });
      }
    });

    await page.exposeFunction('recordInteraction', (action, selector, details) => {
      interactions.push({ action, selector, ...details, time: Date.now() });
    });

    await page.evaluateOnNewDocument(() => {
      document.addEventListener('click', (e) => {
        const selector = constructSelector(e.target);
        window.recordInteraction('click', selector, {});
      });

      document.addEventListener('input', (e) => {
        const selector = constructSelector(e.target);
        window.recordInteraction('type', selector, { text: e.target.value });
      });

      window.addEventListener('scroll', () => {
        window.recordInteraction('scroll', '', {
          x: window.scrollX,
          y: window.scrollY,
        });
      });

      function constructSelector(element) {
        let selector = element.tagName.toLowerCase();

        if (element.id) {
          selector += `#${element.id}`;
        } else if (element.className) {
          selector += `.${element.className.split(' ').filter(Boolean).join('.')}`;
        } else if (element.name) {
          selector += `[name="${element.name}"]`;
        } else if (element.placeholder) {
          selector += `[placeholder="${element.placeholder}"]`;
        }

        return selector;
      }
    });

    console.log('Recording started');
  } catch (error) {
    console.error('Error starting recording:', error);
  }
}

// Stop recording and generate a Puppeteer script
async function stopRecording() {
  try {
    if (browser) {
      await browser.close();
    }

    const script = `
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Sequentially navigate through recorded URLs
  ${interactions
    .map((interaction, index) => {
      const previousTime = index > 0 ? interactions[index - 1].time : Date.now();
      const delay = Math.max(0, interaction.time - previousTime);
      switch (interaction.action) {
        case 'navigate':
          return `
await page.goto('${interaction.url}');
await pause(${delay});
`;
        case 'click':
          return `
await page.waitForSelector('${interaction.selector}', { visible: true }).catch(() => {
  console.log('Popup or element not found, skipping...');
});
await page.click('${interaction.selector}').catch(() => {
  console.log('Failed to click, skipping...');
});
await pause(${delay});
`;
        case 'type':
          return `
await page.waitForSelector('${interaction.selector}', { visible: true }).catch(() => {
  console.log('Input element not found, skipping...');
});
await page.type('${interaction.selector}', '${interaction.text}').catch(() => {
  console.log('Failed to type, skipping...');
});
await pause(${delay});
`;
        case 'scroll':
          return `
await page.evaluate(() => {
  window.scrollTo(${interaction.x}, ${interaction.y});
});
await pause(${delay});
`;
        default:
          return '';
      }
    })
    .join('  ')}

  await browser.close();

  async function pause(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }
})();
    `;

    console.log('Generated Script:\n', script.trim());
    return script.trim();
  } catch (error) {
    console.error('Error stopping recording:', error);
  }
}

// Export the functions for usage
module.exports = { startRecording, stopRecording };
