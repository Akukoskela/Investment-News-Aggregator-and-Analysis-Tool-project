import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
})
export class ChatboxComponent {
  userInput: string = '';
  messages: { user: string, text: string }[] = [];
  isOpen: boolean = false;

  genAI: GoogleGenerativeAI;
  model: any;

  constructor(private http: HttpClient) {
    this.genAI = new GoogleGenerativeAI(environment.API_KEY);

    const generationConfig = {
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ],
      temperature: 0.9,
      top_p: 1,
      top_k: 32,
      maxOutputTokens: 100,
    };

    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-pro', // Käytettävä malli
      ...generationConfig,
    });
  }

  toggleChatbox() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.userInput.trim() === '') return;

    this.messages.push({ user: 'Käyttäjä', text: this.userInput });

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.API_KEY}`,
    };

    const body = {
      model: 'gemini-1.5-flash-latest',
      messages: [{ role: 'user', content: this.userInput }],
      max_tokens: 100,
    };

    this.http.post<{ choices: { message: { content: string } }[] }>(
      environment.API_URL,
      body,
      { headers }
    ).subscribe({
      next: (response) => {
        if (response.choices?.length) {
          const aiResponse = response.choices[0].message.content;
          this.messages.push({ user: 'Tekoäly', text: aiResponse });
        } else {
          this.messages.push({ user: 'Tekoäly', text: 'En ymmärtänyt pyyntöäsi.' });
        }
        this.scrollToBottom();
      },
      error: (err) => {
        console.error('API-virhe:', err);
        this.messages.push({ user: 'Tekoäly', text: 'Tapahtui virhe vastatessa.' });
        this.scrollToBottom();
      },
    });

    this.userInput = '';
    this.scrollToBottom();
  }

  // Asynkroninen metodi GeminiPro-mallin testaukseen
  async TestGeminiPro() {
    const prompt = 'What is the largest number with a name?';
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      console.log(await response.text()); // Tulosta vastaus konsoliin
    } catch (error) {
      console.error('Virhe modelin käytössä:', error);
    }
  }

  // Asynkroninen metodi GeminiProChat-mallin testaukseen
  async TestGeminiProChat() {
    try {
      const chat = this.model.startChat({
        history: [
          {
            role: 'user',
            parts: 'Hi there!',
          },
          {
            role: 'model',
            parts: 'Great to meet you. What would you like to know?',
          },
        ],
        generationConfig: {
          maxOutputTokens: 100,
        },
      });

      const prompt = 'What is the largest number with a name? Brief answer.';
      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      console.log(await response.text()); // Tulosta vastaus konsoliin
    } catch (error) {
      console.error('Virhe GeminiProChat-mallissa:', error);
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatContent = document.querySelector('.chatbox-content') as HTMLElement;
      if (chatContent) {
        chatContent.scrollTop = chatContent.scrollHeight;
      }
    }, 100);
  }
}
