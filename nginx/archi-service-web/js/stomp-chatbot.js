// stomp-chatbot.js - 최종본
class ChatBot {
  constructor() {
    this.stompClient = null;
    this.isConnected = false;
    this.currentUserId = null;
    this.initElements();
    this.connect();
    this.loadChatHistory();
  }

  initElements() {
    this.chatInput = document.getElementById('chat-input');
    this.sendButton = document.getElementById('send-button');
    this.aiRecommendButton = document.getElementById('ai-recommend-button');
    this.messagesContainer = document.getElementById('chat-messages');
    this.helpBtn = document.getElementById("help-button");
    this.tooltip = document.getElementById("help-tooltip");
    
    // 이벤트 리스너
    this.sendButton.addEventListener('click', () => this.sendMessage());
    this.chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
    this.aiRecommendButton.addEventListener('click', () => this.requestRecommendation());
    this.setupHelpTooltip();
  }

  async loadChatHistory() {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    try {
      // JWT에서 userId 추출 (간단한 방법)
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.currentUserId = payload.userId || payload.sub || 1; // fallback
      console.log('User ID:', this.currentUserId);

      const url = `/api/service/chats/history/${this.currentUserId}?page=0&size=20`;
      console.log('히스토리 API 호출:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      console.log('히스토리 응답:', result);
      
      if (result.resultCode === 200 && result.data && result.data.length > 0) {
        this.messagesContainer.innerHTML = '';
        result.data.forEach(msg => {
          const senderType = msg.sender === 'BOT' ? 'bot' : 'user';
          this.appendMessage(senderType, msg.content, msg.type);
        });
      } else {
        this.appendMessage('bot', '안녕하세요! 궁금한 것이 있으시면 언제든 물어보세요.');
      }
    } catch (error) {
      console.error('채팅 히스토리 로드 실패:', error);
      this.appendMessage('bot', '안녕하세요! 궁금한 것이 있으시면 언제든 물어보세요.');
    }
  }

  setupHelpTooltip() {
    if (this.helpBtn && this.tooltip) {
      this.helpBtn.addEventListener("click", () => {
        this.tooltip.classList.toggle("hidden");
      });

      document.addEventListener("click", (e) => {
        if (!this.helpBtn.contains(e.target) && !this.tooltip.contains(e.target)) {
          this.tooltip.classList.add("hidden");
        }
      });
    }
  }

  connect() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('토큰이 없습니다');
      return;
    }
    
    const socket = new SockJS(`/api/service/ws?token=${token}`);
    this.stompClient = Stomp.over(socket);
    
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    this.stompClient.debug = null; // 디버그 로그 비활성화

    this.stompClient.connect(headers, () => {
      this.isConnected = true;
      console.log('STOMP 연결 성공');
      
      this.stompClient.subscribe('/user/queue/chat', (message) => {
        const data = JSON.parse(message.body);
        // 봇 메시지만 표시 (사용자 메시지는 sendMessage에서 이미 표시됨)
        if (data.sender === 'BOT') {
          this.appendMessage('bot', data.content, data.type);
        }
      });
      
    }, (error) => {
      console.error('STOMP 연결 실패:', error);
      this.isConnected = false;
      setTimeout(() => this.connect(), 5000);
    });
  }

  sendMessage() {
    const message = this.chatInput.value.trim();
    if (!message || !this.isConnected) return;

    this.appendMessage('user', message);
    
    this.stompClient.send('/app/chat/sendMessage', {}, JSON.stringify({
      content: message
    }));

    this.chatInput.value = '';
  }

  requestRecommendation() {
    if (!this.isConnected) return;
    
    this.stompClient.send('/app/chat/sendMessage', {}, JSON.stringify({
      content: 'AI 추천을 요청합니다.'
    }));
    
    this.appendMessage('user', 'AI 추천을 요청했습니다.');
  }

  appendMessage(type, text, messageType = null) {
    const wrapper = document.createElement('div');
    wrapper.className = `flex ${type === 'bot' ? 'justify-start' : 'justify-end'} mb-2`;

    const bubble = document.createElement('div');
    
    // SUGGESTION 타입일 때 특별한 스타일
    if (messageType === 'SUGGESTION') {
      bubble.className = 'max-w-[75%] text-sm px-4 py-3 rounded-lg bg-white border-4 border-gradient shadow-lg transform hover:scale-105 transition-all duration-300';
      bubble.style.borderImage = 'linear-gradient(135deg, #ec4899, #8b5cf6) 1';
      bubble.innerHTML = `
        <div class="flex items-center mb-2">
          <span class="text-lg">✨</span>
          <span class="ml-2 font-bold text-gray-800">AI 추천</span>
        </div>
        <div class="text-gray-800">${text}</div>
      `;
    } else {
      bubble.className = `${type === 'bot' ? 'max-w-[75%]' : 'max-w-[85%]'} text-sm text-gray-800 px-4 py-2 rounded-lg ${
        type === 'bot'
          ? 'border border-pink-500 bg-white'
          : 'border border-gray-300 bg-blue-50'
      }`;
      bubble.textContent = text;
    }

    wrapper.appendChild(bubble);
    this.messagesContainer.appendChild(wrapper);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 라이브러리 로드 대기
  const checkLibraries = () => {
    if (typeof SockJS !== 'undefined' && typeof Stomp !== 'undefined') {
      console.log('라이브러리 로드 완료, ChatBot 초기화');
      new ChatBot();
    } else {
      console.log('라이브러리 로드 대기 중...');
      setTimeout(checkLibraries, 100);
    }
  };
  checkLibraries();
});