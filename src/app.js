let isEnabled = false;

// Tạo hai div đại diện cho đường kẻ dọc và ngang
const verticalLine = document.createElement('div');
verticalLine.id = 'mr4-vertical-line';
const horizontalLine = document.createElement('div');
horizontalLine.id = 'mr4-horizontal-line';

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
  } else if (message.action === 'disable') {
    isEnabled = false;
    // Xóa các đường kẻ nếu tắt
    verticalLine.style.display = 'none';
    horizontalLine.style.display = 'none';
  }
});