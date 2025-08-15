import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  data$ = this.data.asObservable();
  setData(value: any) {
    this.data.next(value);
  }
  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  setSearch(text: string) {
    this.searchSubject.next(text);
  }

  setCount(count: number) {
    this.countSubject.next(count);
  }


  private triggerChildFuncSubject = new BehaviorSubject<void>(undefined);
  triggerChildFunc$ = this.triggerChildFuncSubject.asObservable();

  triggerChildFunc() {
    this.triggerChildFuncSubject.next();
  }
}
