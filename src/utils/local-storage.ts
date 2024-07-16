import {storage} from '../lib';

export class LocalStorage {
  public static _listeners: ((payload: {type: 'delete'})=> void)[] = []
  public static async save(key: string, data: string) {
    try {
      await storage.save({
        key,
        data,
        expires: 1000 * 3600,
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  public static subscribe(fn: (payload: {type: 'delete'})=>void) {
    LocalStorage._listeners.push(fn);
  }
  public static async get(key: string) {
    try {
      const data = await storage.load({
        key,
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          extraFetchOptions: {},
          someFlag: true,
        },
      });
      return {data, isValid: true};
    } catch (err) {
      if (err instanceof Error) {
        console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            return {data: null};
          case 'ExpiredError':
            return {data: '', isValid: false};
        }
      }
    }
  }
  public static async delete(key: string) {
    try {
      await storage.remove({
        key,
      });
      LocalStorage._listeners.forEach(fn => {
        fn({
          type: 'delete'
        });
      })
      return true;
    } catch (err) {
      return false;
    }
  }
}
