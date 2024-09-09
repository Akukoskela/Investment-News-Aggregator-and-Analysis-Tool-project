import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { supabaseKeys } from './supabaseKeys';

const supabase_keys = new supabaseKeys();
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
      return data
    }
    else {
      return error
    }
  }

  async getDataWith2Filters(table: any,columns:string) {
    const { data, error } = await this.supabase_client
      .from(table)
      .select(columns)
    if (data) {
      return data
    }
    else {
      return error
    }
  }

  async getDataWithFilter(table: any, column: any, filter: any,ascending:boolean) {
    const { data, error } = await this.supabase_client
      .from(table)
      .select("*")
      // Filters
      .eq(column, filter)
      .order('date', { ascending: ascending })
    if (data) {
      return data
    }
    else {
      return error
    }
  }

  async sendData(table: any, industry: any, date: any, value: any, volume: any) {
    const { data, error } = await this.supabase_client
      .from(table)
      .insert([
        {
          industry: industry,
          date: date,
          value: value,
          volume: volume
        },
      ])
      .select()
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

  async checkIfDataExists(table: any, column1: any, filter1: any, column2: any, filter2: any) {
    try {
      //console.log('Checking if table: ',table,' has data where column:', column1, ' equals ', filter1, ' and column 2: ', column2, ' equals ', filter2)
      const { data, error } = await this.supabase_client
        .from(table)
        .select("*")
        .eq(column1, filter1) //Equals
        .eq(column2, filter2) //Equals
      if (data?.length! > 0) {
        return true
      }
      if (error) {
        console.log(error)
        return false
      }
      else {
        return false
      }
    }
    catch (e) {
      return false
    }
  }
}