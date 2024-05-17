import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { supabaseKeys } from './supabaseKeys';

const supabase_keys= new supabaseKeys();
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase_client: SupabaseClient;

  constructor() {
    this.supabase_client = createClient(
      supabase_keys.supabaseURL,
      supabase_keys.supabaseKey
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



