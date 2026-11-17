const stateEl = document.querySelector('#state');
const platformEl = document.querySelector('#platform');
const noticeEl = document.querySelector('#notice');
async function refresh(){
  try {
    const [health, device] = await Promise.all([fetch('/api/health').then(r=>r.json()), fetch('/api/device').then(r=>r.json())]);
    document.querySelector('#connection').textContent = health.ok ? 'Painel online' : 'Indisponível';
    platformEl.textContent = device.platform;
    stateEl.textContent = device.state === 'running' ? 'Ligado' : 'Desconectado';
  } catch { document.querySelector('#connection').textContent = 'Sem conexão'; }
}
document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', async () => {
  noticeEl.textContent = 'Solicitando ação…';
  try {
    const response = await fetch('/api/device/action', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:button.dataset.action})});
    const result = await response.json();
    noticeEl.textContent = result.error || 'Comando enviado.';
  } catch { noticeEl.textContent = 'Não foi possível falar com o servidor.'; }
}));
const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const socket = new WebSocket(`${wsProtocol}//${location.host}/ws`);
socket.addEventListener('message', event => { try { const data=JSON.parse(event.data); if(data.message) noticeEl.textContent=data.message; } catch {} });
refresh();
