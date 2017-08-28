import axios from 'axios'

const LOCAL_API_URL = 'http://localhost:8080'

const getBaseUrl = () => {
  if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'production') {
    if (process.env.REACT_APP_PRODUCTION_API_URL === undefined) {
      throw new Error('"REACT_APP_PRODUCTION_API_URL environment variable not found"')
    }
    
    return process.env.REACT_APP_PRODUCTION_API_URL
  } else {
    return LOCAL_API_URL
  }
}

class Api {
  constructor() {
    this.baseUrl = getBaseUrl()
    this.http = axios.create({
      baseURL: this.baseUrl
    })
  }
}

export const api = new Api().http
