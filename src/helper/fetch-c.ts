type TConfig = {
  baseURL: string;
}

class FetchXd {
  get = async <T>(url: string): Promise<{ data: T }> => {
    try {
      const res = await fetch(`${this.config.baseURL}${url}`);
      const resPaser = await res.json();
      return { data: resPaser } as { data: T };
    } catch (error) {
      throw Error(error);
    }
  }

  private config: TConfig = {
    baseURL: '',
  }

  create() {
    return {
      config: this.config,
      get: this.get,
    };
  }
}

const fetchXD = new FetchXd();

export { fetchXD };