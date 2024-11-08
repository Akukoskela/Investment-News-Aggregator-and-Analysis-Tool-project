import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Sisältää *ngFor- ja *ngIf-direktiivit
import { FormsModule } from '@angular/forms';    // Mahdollistaa [(ngModel)]-sitoumuksen

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent {
  userInput: string = '';  // Käyttäjän kirjoittama kysymys
  messages: { user: string, text: string }[] = [];  // Tallentaa kaikki chat-viestit
  isOpen: boolean = false; // Määrittää, onko chatbox auki vai kiinni

  constructor(private http: HttpClient) {}  // HttpClient-injektio API-pyyntöjä varten

  toggleChatbox() {
    this.isOpen = !this.isOpen; // Vaihtaa chat-ikkunan tilan auki/kiinni
  }

  sendMessage() {
    if (this.userInput.trim() === '') return;  // Tarkistaa, ettei syöte ole tyhjä

    // Lisää käyttäjän viesti viestilistaan
    this.messages.push({ user: 'Käyttäjä', text: this.userInput });

    // Lähetä käyttäjän kysymys API:lle ja käsittele vastaus
    this.getAIResponse(this.userInput).then(response => {
      this.messages.push({ user: 'Tekoäly', text: response });

      // Vierittää aina viimeisimmän viestin näkyville
      this.scrollToBottom();
    });

    // Tyhjennä käyttäjän syöte
    this.userInput = '';

    // Vierittää aina viimeisimmän viestin näkyville
    this.scrollToBottom();
  }

  // Funktio, joka vierittää chatin alareunaan aina uusimman viestin kohdalle
  scrollToBottom() {
    setTimeout(() => {
      const chatContent = document.querySelector('.chatbox-content') as HTMLElement;
      if (chatContent) {
        chatContent.scrollTop = chatContent.scrollHeight;
      }
    }, 100);  // Asetetaan pieni viive, jotta vieritys toimii oikein
  }

  async getAIResponse(userMessage: string): Promise<string> {
    const apiUrl = 'https://api.openai.com/v1/completions';  // OpenAI API -osoite
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_API_KEY`  // Lisää oma API-avaimesi tähän
    };

    const body = {
      model: 'text-davinci-003',  // OpenAI:n mallin nimi
      prompt: userMessage,
      max_tokens: 100
    };

    try {
      const response: any = await this.http.post(apiUrl, body, { headers }).toPromise();
      return response.choices[0].text.trim();  // Palauttaa tekoälyn vastauksen
    } catch (error) {
      console.error('Virhe API-pyynnössä:', error);
      return 'Miro on kikkeliministeri.';  // Oletusviesti, jos API-pyyntö epäonnistuu
    }
  }
}
