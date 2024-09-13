import {RestClient} from '../lib';
import {formatDataMonthWise, formatDateAndTime} from '../utils';

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
]);
class ReceiptService {
  private __client;
  constructor() {
    this.__client = new RestClient();
  }

  async getArchivedReceipts(pageNumber: number = 0) {
    const result = await this.__client.get(
      `/lbp/mobile-app/rest-service/v1.0/ep/node.json?parameters[type]=receipt&page=${pageNumber}`,
    );
    const decoratedData = formatDataMonthWise(result);
    return decoratedData;
  }

  async getReceipts(pageNumber: number = 0) {
    const result = await this.__client.get(
      `/lbp/mobile-app/rest-service/v1.0/ep/node.json?parameters[type]=receipt&page=${pageNumber}`,
    );
    return result;
  }

  async getReceiptDetails(nid: string) {
    const result = await this.__client.get(
      `/lbp/mobile-app/rest-service/v1.0/ep/node/${nid}.json`,
    );
    const providerInfo = result?.field_address?.und[0];
    let amount = result?.field_amount_gross.und?.[0]?.value;
    let price = result?.field_price_gross.und?.[0]?.value;
    const fileName =
      result?.field_media?.und?.[0]?.filename ||
      result?.field_uploads_prf?.und?.[0]?.filename;
    // eslint-disable-next-line radix
    const date = new Date(parseInt(result?.created) * 1000);
    const image = `https://w3.lbplus.de/sites/all/files/public/${fileName}`;
    if (
      amount === undefined ||
      amount === 'undefined' ||
      amount === 'NaN' ||
      amount === ''
    ) {
      amount = '00';
    }
    if (
      price === undefined ||
      price === 'undefined' ||
      price === 'NaN' ||
      price === ''
    ) {
      price = '00';
    }
    const data = {
      title: result?.title,
      providerName:
        providerInfo?.organisation_name ||
        result?.body?.und?.[0]?.value ||
        result?.title,
      postCode: providerInfo?.postal_code || 'N/A',
      logo: providerInfo?.country,
      status: result?.status,
      amount,
      price,
      image,
      date,
    };
    return data;
  }

  async getServiceCategories() {
    const data = JSON.parse(serviceCategories).map((item: any) => {
      return {title: item.title, id: item.id};
    });
    return data;
  }

  async addReceipt(values) {
    const modifiedBody = {
      title: values?.title,
      type: 'receipt',
      log: 'LifebalanceplusReceipt.upload(): receipt data sent by mobile app!',
      body: {
        und: [
          {
            value: `${values?.providerName}`,
          },
        ],
      },
      field_bank_iban: {
        und: [
          {
            value: values?.iban,
          },
        ],
      },
      field_bank_account_owner: {
        und: [
          {
            value: values?.owner,
          },
        ],
      },
      field_amount_gross: {
        und: [
          {
            value: `${values?.amount}`,
          },
        ],
      },
      field_uploads_prf: {
        und: [
          {
            fid: values?.fid,
          },
        ],
      },
      field_wf_d_booked: {
        und: [
          {
            value: formatDateAndTime(new Date()),
          },
        ],
      },
      field_wf_u_booked: {
        und: [
          {
            value: values?.email,
          },
        ],
      },
      field_submission_type: {
        und: 113,
      },
      field_address: {
        und: [
          {
            organisation_name: values?.providerName,
            postal_code: values?.postCode,
          },
        ],
      },
    };
    const result = await this.__client.post(
      'lbp/mobile-app/rest-service/v1.0/ep/node.json',
      modifiedBody,
    );

    return result;
  }

  async uploadReceiptImage(body) {
    const modifiedBody = {
      title: 'Posted File',
      type: {
        href: 'https://w3.lbplus.de/rest/type/file/image',
      },
      _links: {
        href: 'https://w3.lbplus.de/rest/type/file/image',
      },
      filename: body?.filename,
      filepath: `public://${body?.filename}`,
      file: `${body?.base64}`,
    };

    const result = await this.__client.post(
      '/lbp/mobile-app/rest-service/v1.0/ep/file.json',
      modifiedBody,
    );
    return result;
  }
}
const receiptService = new ReceiptService();
export default receiptService;
