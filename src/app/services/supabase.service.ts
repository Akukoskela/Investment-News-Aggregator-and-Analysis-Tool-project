import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase_client: SupabaseClient;

  constructor() {
    this.supabase_client = createClient(
      'https://zlmaryslxtjmktervpuh.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsbWFyeXNseHRqbWt0ZXJ2cHVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyNDIwODcsImV4cCI6MjAyMjgxODA4N30.F8sA2x4pahe8XJfeMgSnesqMkQ1KhyCQvXlUEJ0Ou-c'
    );
  }

  async getData(table: any) {
    const { data, error } = await this.supabase_client
      .from(table)
      .select()

    if (data) {
      console.log(data)
      return data
    }
    else {
      console.log(error)
      return error
    }
  }

  async getTop5GoodNews(table: any) {
    const { data, error } = await this.supabase_client
      .from(table)
      .select()

    if (data) {
      const sortedByPolarity = data.sort((a, b) => b.polarity - a.polarity);
      // Get the top 5 objects with the highest polarity
      const top5PolarityObjects = sortedByPolarity.slice(0, 5);
      return top5PolarityObjects
    }
    else {
      console.log(error)
      return error
    }
  }

  async getTop5BadNews(table: any) {
    const { data, error } = await this.supabase_client
      .from(table)
      .select()

    if (data) {
      const sortedByPolarity = data.sort((a, b) => a.polarity - b.polarity);
      // Get the top 5 objects with the highest polarity
      const top5PolarityObjects = sortedByPolarity.slice(0, 5);
      return top5PolarityObjects
    }
    else {
      console.log(error)
      return error
    }
  }
}



