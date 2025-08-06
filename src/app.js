let isEnabled = false;

// Tạo hai div đại diện cho đường kẻ dọc và ngang
const verticalLine = document.createElement('div');
verticalLine.id = 'mr4-vertical-line';
const horizontalLine = document.createElement('div');
horizontalLine.id = 'mr4-horizontal-line';

const styleElement = document.createElement('style');
styleElement.type = 'text/css';
const cssRules = `
  .show-crosshair-cursor canvas {
    cursor: none !important;
  }
`;
styleElement.textContent = cssRules;
document.head.appendChild(styleElement);

// Định dạng cho đường kẻ dọc
Object.assign(verticalLine.style, {
  position: 'fixed',
  width: '1px',
  height: '100%',
  backgroundColor: 'green',
  top: '0',
  pointerEvents: 'none',
  zIndex: '9999'
});

// Định dạng cho đường kẻ ngang
Object.assign(horizontalLine.style, {
  position: 'fixed',
  width: '100%',
  height: '1px',
  backgroundColor: 'blue',
  left: '0',
  pointerEvents: 'none',
  zIndex: '9999'
});

// Thêm các đường kẻ vào document
document.body.appendChild(verticalLine);
document.body.appendChild(horizontalLine);

// Theo dõi vị trí chuột và di chuyển các đường kẻ
document.addEventListener('mousemove', (event) => {
  if (isEnabled) {
    verticalLine.style.left = `${event.clientX}px`;
    horizontalLine.style.top = `${event.clientY}px`;
    verticalLine.style.display = 'block';
    horizontalLine.style.display = 'block';
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'enable') {
    isEnabled = true;
    document.body.classList.add('show-crosshair-cursor')
  } else if (message.action === 'disable') {
    isEnabled = false;
    document.body.classList.remove('show-crosshair-cursor')
    // Xóa các đường kẻ nếu tắt
    verticalLine.style.display = 'none';
    horizontalLine.style.display = 'none';
  }
});

const switchImageView = () => {
    const imgContainer = document.getElementsByClassName('lsf-image')
    const imgs = imgContainer[0].getElementsByTagName('img')
    const img = imgs[0]
    if (img.getAttribute('original-src') === null) {
        img.setAttribute('original-src', img.src)
    }
    if (img.getAttribute('original-show') === null) {
        img.setAttribute('original-show', false)
    }
    if (img.getAttribute('original-show') === 'false') {
        img.src = img.getAttribute('original-src').replace('-unsharps', '')
        img.setAttribute('original-show', true)
    } else {
        img.src = img.getAttribute('original-src')
        img.setAttribute('original-show', false)
    }
}

document.addEventListener('keydown', function(event) {
  if (isEnabled && event.key === 'F2') {
    event.preventDefault();
    switchImageView();
  }
});