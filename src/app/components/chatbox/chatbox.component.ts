import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Sisältää *ngFor- ja *ngIf-direktiivit
import { FormsModule } from '@angular/forms';    // Mahdollistaa [(ngModel)]-sitoumuksen
import { lastValueFrom } from 'rxjs';  // Importoi lastValueFrom, koska toPromise on vanhentunut

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

  // Vaihtaa chat-ikkunan tilan auki/kiinni
  toggleChatbox() {
    this.isOpen = !this.isOpen;
  }

  // Lähettää viestin ja käsittelee tekoälyn vastauksen
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

  // API-pyyntö OpenAI:n tekoälymallille
  async getAIResponse(userMessage: string): Promise<string> {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        // Vaihda tämä oikealla OpenAI API-avaimella
    };

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
      max_tokens: 100
    };

    try {
      const response: any = await lastValueFrom(this.http.post(apiUrl, body, { headers }));
      
      // API-vastaus onnistui
      if (response && response.choices && response.choices.length > 0) {
        return response.choices[0].message.content.trim();
      } else {
        console.error('Virhe: Tekoäly ei palannut odotettua vastausta', response);
        return 'Pahoittelen, mutta en voi vastata tällä hetkellä.';
      }
    } catch (error: any) {  // Määritellään virheen tyyppi 'any'
      // Virhetilanteet
      if (error.status === 429) {
        console.error('Liian monta pyyntöä. Odotetaan ennen uusinta pyyntöä...');
        
        // Odotetaan ennen uudelleenlähetystä (esimerkiksi 10 sekuntia)
        await this.delay(10000); // 10 sekuntia (10000 ms)
        
        // Lähetetään pyyntö uudestaan
        return this.getAIResponse(userMessage);
      }

      console.error('Virhe API-pyynnössä:', error);
      return 'Pahoittelen, mutta en voi vastata tällä hetkellä.';
    }
  }

  // Aputoiminto viiveen lisäämiseksi
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
