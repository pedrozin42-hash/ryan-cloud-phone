const express = require('express');
const http = require('http');
const path = require('path');
const { WebSocketServer } = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'web')));

// This is intentionally a safe starter API. It does not claim an Android VM exists yet.
let device = { id: 'android-01', name: 'Ryan Android 01', state: 'not_connected', platform: 'Android (not provisioned)' };

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'Ryan Cloud Phone', version: '0.1.0' }));
app.get('/api/device', (_req, res) => res.json(device));
app.post('/api/device/action', (req, res) => {
  const { action } = req.body || {};
  const allowed = ['start', 'stop', 'restart'];
  if (!allowed.includes(action)) return res.status(400).json({ error: 'Ação inválida.' });
  // Android host integration will be added in the next phase.
  return res.status(501).json({ error: 'Android ainda não conectado. Esta ação será habilitada após configurar o host Linux.' });
});

wss.on('connection', (socket) => {
  socket.send(JSON.stringify({ type: 'status', message: 'Painel conectado. Nenhum Android está provisionado ainda.' }));
});

server.listen(PORT, '0.0.0.0', () => console.log(`Ryan Cloud Phone em http://localhost:${PORT}`));
