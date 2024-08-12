import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit {
  @Output() toggleChatBot = new EventEmitter<void>();
  userInput: string = '';
  chatHistory: Array<{ sender: string; text: string }> = [];
  selectedBookId: string;
  isSending: boolean = false;

  constructor(private service: AppService) {
    this.selectedBookId = localStorage.getItem('selectedBookId') ?? '';
  }
  // Remove the duplicate declaration of selectedBookId

  ngOnInit(): void {
    // Start the chatbot conversation
    // this.initiateChatBot();

  }

  initiateChatBot(): void {
    this.service.initiateChat(this.selectedBookId).subscribe((data) => {
      this.chatHistory.push({ sender: 'bot', text: data.message });
    });
  } 

  sendMessage(): void {
    const message = this.userInput.trim();
    if (!message) return;

    // Append user message to chat history
    this.chatHistory.push({ sender: 'user', text: message });

    // Mock API call
    // setTimeout(() => {
    //   // Mocked response from the API
    //   const mockApiResponse = { reply: `Echo: ${message}` };

    //   // Append chatbot response to chat history
    //   this.chatHistory.push({ sender: 'bot', text: mockApiResponse.reply });

    //   // Clear input field
    //   this.userInput = '';
    // }, 500); // Simulate network delay
this.isSending = true;
this.userInput = '';
    this.service.chat(message, this.selectedBookId).subscribe((data) => {
      this.chatHistory.push({ sender: 'bot', text: data.model_response });
      this.isSending = false;
    });


  }

  closeChatBot(): void {
    this.toggleChatBot.emit();
  }
}
