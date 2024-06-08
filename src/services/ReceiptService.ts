import {RestClient} from '../lib';

const sampleData =
  '[{ "title": "January", "items": [{ "id": 1, "amount": 32.21, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-01-03T00:00:00", "amount_paid": 18.54 }, { "id": 2, "amount": 91.26, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-01-18T00:00:00", "amount_paid": 44.73 }] }, { "title": "February", "items": [{ "id": 1, "amount": 38.52, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-02-18T00:00:00", "amount_paid": 23.63 }] }, { "title": "March", "items": [{ "id": 1, "amount": 51.93, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-03-26T00:00:00", "amount_paid": 16.34 }, { "id": 2, "amount": 53.25, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-03-12T00:00:00", "amount_paid": 88.75 }, { "id": 3, "amount": 56.51, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-03-21T00:00:00", "amount_paid": 42.13 }] }, { "title": "April", "items": [{ "id": 1, "amount": 20.98, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-04-22T00:00:00", "amount_paid": 41.26 }, { "id": 2, "amount": 33.07, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-04-08T00:00:00", "amount_paid": 30.35 }, { "id": 3, "amount": 56.44, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-04-15T00:00:00", "amount_paid": 83.23 }] }, { "title": "May", "items": [{ "id": 1, "amount": 45.28, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-05-18T00:00:00", "amount_paid": 75.74 }, { "id": 2, "amount": 29.7, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-05-17T00:00:00", "amount_paid": 33.84 }, { "id": 3, "amount": 61.76, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-05-20T00:00:00", "amount_paid": 78.98 }, { "id": 4, "amount": 74.78, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-05-17T00:00:00", "amount_paid": 83.95 }, { "id": 5, "amount": 31.43, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-05-07T00:00:00", "amount_paid": 54.38 }] }]';
const receiptsData = JSON.stringify([{ "title": "Zuletzt verwendet", "items": [{ "id": 1, "amount": 32.21, "company": { "name": "Good Feel GmBH", "logo": "GF" }, "date": "2024-01-03T00:00:00", "amount_paid": 18.54 },
{ "id": 2, "amount": 91.26, "company": { "name": "Good Feel GmBH", "logo": "GF" }, "date": "2024-01-18T00:00:00", "amount_paid": 44.73 },
{ "id": 3, "amount": 91.26, "company": { "name": "Good Feel GmBH", "logo": "GF" }, "date": "2024-01-18T00:00:00", "amount_paid": 44.73 },
{ "id": 4, "amount": 91.26, "company": { "name": "Good Feel GmBH", "logo": "GF" }, "date": "2024-01-18T00:00:00", "amount_paid": 44.73 },
{ "id": 5, "amount": 91.26, "company": { "name": "Good Feel GmBH", "logo": "GF" }, "date": "2024-01-18T00:00:00", "amount_paid": 44.73 },
{ "id": 6, "amount": 91.26, "company": { "name": "Good Feel GmBH", "logo": "GF" }, "date": "2024-01-18T00:00:00", "amount_paid": 44.73 },
]}]);

const serviceCategories = JSON.stringify([
  {id: 1, title: 'Yoga'},
  {id: 2, title: 'Yoga'},
  {id: 3, title: 'Yoga'},
  {id: 4, title: 'Yoga'},
  {id: 5, title: 'Yoga'},
  {id: 6, title: 'Yoga'},
  {id: 7, title: 'Yoga'},
  {id: 8, title: 'Yoga'},
  {id: 9, title: 'Yoga'},
  {id: 10, title: 'Yoga'},
  {id: 11, title: 'Yoga'},
  {id: 12, title: 'Yoga'},
  {id: 13, title: 'Yoga'},
  {id: 14, title: 'Yoga'},
  {id: 15, title: 'Yoga'},
])
class ReceiptService {
  private __client;
  constructor() {
    this.__client = new RestClient();
  }

  async getArchivedReceipts() {
    const data = JSON.parse(sampleData).map((item: any) => {
      return {title: item.title, data: item.items};
    });
    return data;
  }

  async getReceipts(){
    const data = JSON.parse(receiptsData).map((item: any) => {
      return {title: item.title, data: item.items};
    });
    return data;
  }

  async getServiceCategories(){
    const data = JSON.parse(serviceCategories).map((item: any) => {
      return {title: item.title, id: item.id};
    });
    return data;
  }

  async addReceipt(values){
    console.log(values);
    return;
  }
}

export default new ReceiptService();
