// stomp-chatbot.js - 요금제 버튼 추가 버전
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
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.currentUserId = payload.userId || payload.sub || 1;

      const url = `/api/service/chats/history/${this.currentUserId}?page=0&size=20`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      
      if (result.resultCode === 200 && result.data && result.data.length > 0) {
        this.messagesContainer.innerHTML = '';
        result.data.forEach(msg => {
          const senderType = msg.sender === 'BOT' ? 'bot' : 'user';
          this.appendMessage(senderType, msg.content, msg.type, msg.mentionedPlans);
        });
      } else {
        this.appendMessage('bot', '안녕하세요! 궁금한 것이 있으시면 언제든 물어보세요.');
      }
    } catch (error) {
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
      return;
    }
    
    const socket = new SockJS(`/api/service/ws?token=${token}`);
    this.stompClient = Stomp.over(socket);
    
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    this.stompClient.debug = null;

    this.stompClient.connect(headers, () => {
      this.isConnected = true;
      
      this.stompClient.subscribe('/user/queue/chat', (message) => {
        const data = JSON.parse(message.body);
        if (data.sender === 'BOT') {
          this.appendMessage('bot', data.content, data.type, data.mentionedPlans);
        }
      });
      
    }, (error) => {
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

  handlePlanButtonClick(planName) {
    this.searchPlanAndNavigate(planName);
  }

  async searchPlanAndNavigate(planName) {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/service/plans/search?name=' + encodeURIComponent(planName), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const result = await response.json();
      
      if (result.resultCode === 200 && result.data) {
        window.location.href = `/detail.html?type=plan&id=${result.data.planId}`;
      } else {
        this.fallbackToChatQuestion(planName);
      }
    } catch (error) {
      console.error('요금제 검색 실패:', error);
      this.fallbackToChatQuestion(planName);
    }
  }

  fallbackToChatQuestion(planName) {
    const message = `${planName} 요금제에 대해 자세히 알려주세요.`;
    this.appendMessage('user', message);
    
    if (this.isConnected) {
      this.stompClient.send('/app/chat/sendMessage', {}, JSON.stringify({
        content: message,
        planName: planName
      }));
    }
  }

  createPlanButtons(mentionedPlans) {
    if (!mentionedPlans) return null;

    let planNames = [];
    if (typeof mentionedPlans === 'string') {
      planNames = mentionedPlans.split(/[,\n]/).map(name => name.trim()).filter(name => name);
    } else if (Array.isArray(mentionedPlans)) {
      planNames = mentionedPlans;
    } else {
      planNames = [String(mentionedPlans)];
    }

    if (planNames.length === 0) return null;

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'max-w-[75%] flex flex-wrap gap-2 mt-1';

    planNames.forEach((planName) => {
      const button = document.createElement('button');
      button.className = 'px-3 py-2 text-xs bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md';
      
      button.textContent = planName;
      button.addEventListener('click', () => this.handlePlanButtonClick(planName));
      
      buttonsContainer.appendChild(button);
    });

    return buttonsContainer;
  }

  appendMessage(type, text, messageType = null, mentionedPlans = null) {
    const wrapper = document.createElement('div');
    wrapper.className = `flex ${type === 'bot' ? 'justify-start' : 'justify-end'} mb-2`;

    const bubble = document.createElement('div');

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
    
    if (type === 'bot' && mentionedPlans) {
      const planButtons = this.createPlanButtons(mentionedPlans);
      if (planButtons) {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'flex justify-start mb-2';
        buttonWrapper.appendChild(planButtons);
        this.messagesContainer.appendChild(wrapper);
        this.messagesContainer.appendChild(buttonWrapper);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        return;
      }
    }

    this.messagesContainer.appendChild(wrapper);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const checkLibraries = () => {
    if (typeof SockJS !== 'undefined' && typeof Stomp !== 'undefined') {
      new ChatBot();
    } else {
      setTimeout(checkLibraries, 100);
    }
  };
  checkLibraries();
});
