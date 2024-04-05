import {Injectable} from '@angular/core';
import {Response} from "@interface/response";
import {Topic} from "@interface/topic";
import {BaseService} from "@service/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class TopicService extends BaseService{
  getAll() {
    return this.http.get<Response<Topic>>(this.baseURL + '/topics');
  }
}
