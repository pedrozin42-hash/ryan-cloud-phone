# Ryan Cloud Phone — MVP 0.1

Este pacote contém o primeiro painel web e uma API de status. **Ainda não contém um Android virtual nem transmissão de tela**; os botões retornam HTTP 501 até existir um host Android real.

## Requisitos
- Node.js 18 ou superior
- Uma máquina Linux para a futura etapa Android (idealmente x86_64 com KVM; GPU/virgl ou aceleração gráfica dependerá do host)

## Executar o painel

```bash
npm install
npm start
```

Abra `http://localhost:3000`.

## Arquitetura planejada
- Painel web: HTML/CSS/JS
- API e WebSocket: Node.js + Express + ws
- Host Android: Linux + KVM, a definir após validar a hospedagem
- Controle: ADB restrito ao host; nunca expor a porta ADB diretamente à internet
- Vídeo/controle no navegador: camada WebRTC ou gateway compatível, a integrar

## Segurança obrigatória antes de publicar
1. Adicionar autenticação e autorização por usuário.
2. Usar HTTPS/WSS.
3. Manter ADB em rede privada; não publicar `5555` na internet.
4. Isolar cada instância Android e limitar recursos.
5. Guardar segredos em variáveis de ambiente, nunca no frontend.

## Limitações importantes
- Hospedagem grátis sem cartão não garante CPU, RAM, KVM, GPU ou execução contínua.
- Roblox pode não funcionar em imagens Android x86/ARM virtualizadas ou sem serviços Google/compatibilidade gráfica adequados.
- Este MVP não instala nem executa Roblox; é a base do painel.
