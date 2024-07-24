import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent {
  userInput: string = '';
  chatHistory: Array<{ sender: string; text: string }> = [];

  constructor() {}

  sendMessage(): void {
    const message = this.userInput.trim();
    if (!message) return;

    // Append user message to chat history
    this.chatHistory.push({ sender: 'user', text: message });

    // Mock API call
    setTimeout(() => {
      // Mocked response from the API
      const mockApiResponse = { reply: `Echo: ${message}` };

      // Append chatbot response to chat history
      this.chatHistory.push({ sender: 'bot', text: mockApiResponse.reply });

      // Clear input field
      this.userInput = '';
    }, 500); // Simulate network delay
  }
}
