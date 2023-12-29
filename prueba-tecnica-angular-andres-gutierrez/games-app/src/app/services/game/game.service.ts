import { GameDetailDto } from '../../models/processes/game/game-detail-dto';
import { GameDto } from '../../models/processes/game/game-dto';
import { HttpService } from '../http/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _base: string = 'game';

  constructor(
    private _http: HttpService
  ) { }


  getAll(): Observable<Array<GameDto>> {
    return this._http.send<Array<GameDto>>('get', `${this._base}s`);
  }

  getById(id: number): Observable<GameDetailDto> {
    return this._http.send<GameDetailDto>('get', `${this._base}?id=${id}`);
  }
}
