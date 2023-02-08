import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postProduct(data:any):Observable<any>{
    return this.http.post<any>('https://63bc3614cf99234bfa73a9ce.mockapi.io/api/productList',data)
  }

  getProduct():Observable<any>{
    return this.http.get<any>('https://63bc3614cf99234bfa73a9ce.mockapi.io/api/productList')
  }

  putProduct(data:any,id:number):Observable<any> {
    return this.http.put<any>('https://63bc3614cf99234bfa73a9ce.mockapi.io/api/productList'+id,data)
  }

  deleteProduct(id:number) {
    return this.http.delete<any>('https://63bc3614cf99234bfa73a9ce.mockapi.io/api/productList'+id)
  }
}
