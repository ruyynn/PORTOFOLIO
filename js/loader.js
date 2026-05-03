const LOADER_MESSAGES = [
  'Initializing recon...',
  'Loading modules...',
  'Bypassing firewall...',
  'Gathering intel...',
  'Establishing connection...',
  'Ready.',
];

document.addEventListener('DOMContentLoaded', () => {
  const loader    = document.getElementById('loader');
  const bar       = document.getElementById('loaderBar');
  const status    = document.getElementById('loaderStatus');
  let progress    = 0;
  let msgIndex    = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 6;
    if (progress > 100) progress = 100;

    bar.style.width = progress + '%';

    const idx = Math.floor((progress / 100) * (LOADER_MESSAGES.length - 1));
    if (idx !== msgIndex) {
      msgIndex = idx;
      status.textContent = LOADER_MESSAGES[msgIndex];
    }

    if (progress >= 100) {
      clearInterval(interval);
      status.textContent = LOADER_MESSAGES[LOADER_MESSAGES.length - 1];
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.add('loaded');
      }, 500);
    }
  }, 120);
});
