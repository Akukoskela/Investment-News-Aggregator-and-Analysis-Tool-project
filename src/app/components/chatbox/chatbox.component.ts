import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Lisätty CommonModule
import { FormsModule } from '@angular/forms';    // Lisätty FormsModule

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Lisätty nämä imports-osioon
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent {
  userInput: string = '';  // Käyttäjän kirjoittama kysymys
  messages: { user: string, text: string }[] = [];  // Tallennetaan kaikki chat-viestit

  constructor(private http: HttpClient) {}  // Injektoi HttpClient palvelun avulla

  sendMessage() {
    if (this.userInput.trim() === '') return;  // Tarkistaa, että syöte ei ole tyhjä

    // Lisää käyttäjän viesti viestilistaan
    this.messages.push({ user: 'Käyttäjä', text: this.userInput });

    // Lähetä käyttäjän kysymys API:lle ja käsittele vastaus
    this.getAIResponse(this.userInput).then(response => {
      this.messages.push({ user: 'Tekoäly', text: response });
    });

    // Tyhjennä käyttäjän syöte
    this.userInput = '';
  }

  async getAIResponse(userMessage: string): Promise<string> {
    const apiUrl = 'https://api.openai.com/v1/completions';  // OpenAI:n API:n osoite
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_API_KEY`  // Lisää oma API-avaimesi tähän
    };

    const body = {
      model: 'text-davinci-003',  // Tai muu OpenAI:n malli
      prompt: userMessage,
      max_tokens: 100
    };

    try {
      const response: any = await this.http.post(apiUrl, body, { headers }).toPromise();
      return response.choices[0].text.trim();  // Palauttaa tekoälyn tuottaman vastauksen
    } catch (error) {
      console.error('Virhe API-pyynnössä:', error);
      return 'Tapahtui virhe, yritä uudelleen myöhemmin.';
    }
  }
}
